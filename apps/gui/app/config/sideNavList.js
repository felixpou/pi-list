import routeNames from './routeNames';

export default {
    top: [
        {
            link: routeNames.PCAPS,
            icon: 'dvr',
            labelTag: 'navigation.pcaps',
            exact: false
        },
        {
            link: routeNames.CAPTURE,
            icon: 'fiber_manual_record',
            labelTag: 'navigation.capture',
            exact: false,
            liveOnly: true
        },
        // {
        //     link: routeNames.LIVE,
        //     icon: 'settings_input_antenna',
        //     labelTag: 'navigation.live_streams',
        //     exact: false,
        //     liveOnly: true
        // },
        // {
        //     link: routeNames.NETWORK,
        //     icon: 'wifi_tethering',
        //     labelTag: 'navigation.network',
        //     exact: true,
        //     liveOnly: true
        // },
        {
            link: routeNames.SETTINGS,
            icon: 'settings',
            labelTag: 'navigation.settings',
            exact: false,
            liveOnly: false
        },
    ],
    bottom: [
    ]
};
