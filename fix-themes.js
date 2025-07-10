const fs = require('fs');
const path = require('path');

// List of files that need fixing
const filesToFix = [
    'appserver/static/src/components/resource-management/ResourceManagementStyles.js',
    'appserver/static/src/components/reports/ReportsStyles.js',
    'appserver/static/src/components/settings/SettingsStyles.js',
    'appserver/static/src/components/alerts/AlertsStyles.js',
    'appserver/static/src/components/patient-throughput/PatientThroughputStyles.js',
];

filesToFix.forEach((filePath) => {
    try {
        console.log(`Fixing: ${filePath}`);
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace(
            "import { variables, mixins } from '@splunk/themes';",
            "import { variables, mixins } from '../../themes/simpleTheme';"
        );
        fs.writeFileSync(filePath, content);
        console.log(`✅ Fixed: ${filePath}`);
    } catch (error) {
        console.log(`❌ Error fixing ${filePath}:`, error.message);
    }
});

console.log('Theme import fix completed!');
