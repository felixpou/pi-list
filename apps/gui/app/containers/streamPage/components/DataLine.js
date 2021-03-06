import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    units: PropTypes.string,
    labelWidth: PropTypes.number,
    valueWidth: PropTypes.number,
};
const defaultProps = {
    label: '',
    value: '',
    units: null,
    labelWidth: 6,
    valueWidth: 6,
};

const renderValue = ({ value, units }) => units
    ? <div style={{ display: 'flex'}}>
        <div className="lst-stream-info-value">{value}</div>
        <div className="lst-stream-info-units">{units}</div>
    </div>
    : <div className="lst-stream-info-value">{value}</div>;

const DataLine = props => (
    <div className="row col-xs-12 lst-no-padding">
        <div className={`lst-stream-info-label col-xs-${props.labelWidth}`}>
            <span>{props.label}</span>
        </div>
        <div className={`col-xs-${props.valueWidth}`}>
            {renderValue(props)}
        </div>
    </div>
);

DataLine.propTypes = propTypes;
DataLine.defaultProps = defaultProps;

export default DataLine;
