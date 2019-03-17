const _ = require('lodash');
const influxDbManager = require('../managers/influx-db');
const Stream = require('../models/stream');
const constants = require('../enums/analysis');

// Definitions
const validation = {
    rtp: {
        delta_rtp_ts_vs_nt_ticks_min: -45000,
        delta_rtp_ts_vs_nt_ticks_max: 2
    }
}

function appendError(stream, value) {
    const errors = _.get(stream, 'error_list', []);
    errors.push(value);
    _.set(stream, 'error_list', errors);
    return stream;
}

// Sets:
// - analyses.rtp.result to compliant or not_compliant
// - if not compliant, adds and error to analyses.errors
function validateRtp(stream) {
    const { min, max, avg } = _.get(stream, 'analyses.rtp.details.delta_rtp_ts_vs_nt_ticks');

    if (min < validation.rtp.delta_rtp_ts_vs_nt_ticks_min
        || max > validation.rtp.delta_rtp_ts_vs_nt_ticks_max) {
        _.set(stream, 'analyses.rtp.result', constants.outcome.not_compliant);
        stream = appendError(stream, {
            id: constants.errors.invalid_delta_rtp_ts_vs_nt
        });
    } else {
        _.set(stream, 'analyses.rtp.result', constants.outcome.compliant);
    }

    return stream;
}

// Returns one promise that resolves to an object with the updated analysis.
function doRtpAnalysis(pcapId, stream) {
    return influxDbManager.getDeltaRtpVsNtTicksMinMax(pcapId, stream.id)
        .then((value) => {
            const { min, max, avg } = value[0];
            _.set(stream, 'analyses.rtp.details.delta_rtp_ts_vs_nt_ticks', { min, max, avg });
            return stream;
        });
}

// Returns one promise, which result is undefined.
function doVideoStreamAnalysis(pcapId, stream) {
    return doRtpAnalysis(pcapId, stream)
        .then(validateRtp)
        .then(info => Stream.findOneAndUpdate({ id: stream.id }, info, { new: true }));
}

// Returns one array with a promise for each stream. The result of the promise is undefined.
function doVideoAnalysis(pcapId, streams) {
    const promises = streams.map(stream => doVideoStreamAnalysis(pcapId, stream));
    return Promise.all(promises);
}

module.exports = {
    doVideoAnalysis
};
