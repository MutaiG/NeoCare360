// NeoCare360 Patient Monitoring Module
define([], function () {
    'use strict';

    console.log('Loading NeoCare360 Patient Monitoring module...');

    return {
        init: function (containerId, config) {
            console.log('Patient Monitoring init called for container:', containerId);

            const initializeWhenReady = () => {
                if (window.NeoCare360 && window.NeoCare360.initPatientMonitoring) {
                    console.log('Initializing NeoCare360 Patient Monitoring...');
                    return window.NeoCare360.initPatientMonitoring(containerId, config);
                } else {
                    console.log('NeoCare360 not ready, retrying in 100ms...');
                    setTimeout(initializeWhenReady, 100);
                }
            };

            initializeWhenReady();
        },
    };
});
