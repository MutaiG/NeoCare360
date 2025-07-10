// NeoCare360 ICU Command Center Module
define([], function () {
    'use strict';

    console.log('Loading NeoCare360 ICU Command Center module...');

    return {
        init: function (containerId, config) {
            console.log('ICU Command Center init called for container:', containerId);

            const initializeWhenReady = () => {
                if (window.NeoCare360 && window.NeoCare360.initICUCommandCenter) {
                    console.log('Initializing NeoCare360 ICU Command Center...');
                    return window.NeoCare360.initICUCommandCenter(containerId, config);
                } else {
                    console.log('NeoCare360 not ready, retrying in 100ms...');
                    setTimeout(initializeWhenReady, 100);
                }
            };

            initializeWhenReady();
        },
    };
});
