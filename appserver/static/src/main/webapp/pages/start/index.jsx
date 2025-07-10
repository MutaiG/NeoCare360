import React from 'react';
import layout from '@splunk/react-page';
import { getUserTheme } from '@splunk/splunk-utils/themes';

import NeoCare360App from './NeoCare360App';
import { GlobalStyles } from './StartStyles';

getUserTheme()
    .then((theme) => {
        layout(
            <>
                <GlobalStyles />
                <NeoCare360App />
            </>,
            {
                theme,
            },
        );
    })
    .catch((e) => {
        const errorEl = document.createElement('span');
        errorEl.innerHTML = e;
        document.body.appendChild(errorEl);
    });
