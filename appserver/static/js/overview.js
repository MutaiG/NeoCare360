// NeoCare360 Overview Module
// This file is loaded by Splunk XML views to initialize React components

define([], function () {
    'use strict';

    console.log('Loading NeoCare360 Overview module...');

    // The actual initialization is handled by the main index.js bundle
    // This file exists to satisfy the require() call in XML views

    return {
        init: function (containerId, config) {
            console.log('Overview.init called for container:', containerId);

            // Wait for the main NeoCare360 object to be available
            const initializeWhenReady = () => {
                if (window.NeoCare360 && window.NeoCare360.initOverview) {
                    console.log('Initializing NeoCare360 Overview...');
                    return window.NeoCare360.initOverview(containerId, config);
                } else {
                    console.log('NeoCare360 not ready, retrying in 100ms...');
                    setTimeout(initializeWhenReady, 100);
                }
            };

            initializeWhenReady();
        },
    };
});
