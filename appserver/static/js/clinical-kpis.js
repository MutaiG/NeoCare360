// NeoCare360 Clinical KPIs Module
define([], function () {
    'use strict';

    console.log('Loading NeoCare360 Clinical KPIs module...');

    return {
        init: function (containerId, config) {
            console.log('Clinical KPIs init called for container:', containerId);

            const initializeWhenReady = () => {
                if (window.NeoCare360 && window.NeoCare360.initClinicalKPIs) {
                    console.log('Initializing NeoCare360 Clinical KPIs...');
                    return window.NeoCare360.initClinicalKPIs(containerId, config);
                } else {
                    console.log('NeoCare360 not ready, retrying in 100ms...');
                    setTimeout(initializeWhenReady, 100);
                }
            };

            initializeWhenReady();
        },
    };
});
