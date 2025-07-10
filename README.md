# NeoCare360 - Clinical Intelligence Hub

🏥 A comprehensive healthcare intelligence platform built for Splunk that provides real-time monitoring and analytics for healthcare facilities.

## Overview

NeoCare360 is a modern healthcare dashboard application that integrates with Splunk to provide healthcare professionals with real-time insights, monitoring capabilities, and analytics for hospital operations. The platform supports role-based access control and offers multiple specialized views for different healthcare scenarios.

## Features

### 🏠 Dashboard Overview

-   Real-time hospital metrics and KPIs
-   Bed occupancy and capacity management
-   Live activity feeds and alerts
-   Hospital-wide performance indicators

### 🛏️ Patient Monitoring

-   Real-time patient vital signs tracking
-   Alert management and escalation
-   Patient diagnosis categorization
-   Live feeds of patient status changes

### 🚨 ICU Command Center

-   Critical care unit monitoring
-   Emergency protocol management
-   Device utilization tracking
-   Real-time ICU metrics and alerts

### 📊 Clinical KPIs

-   Performance metrics and trends
-   Quality indicators and compliance
-   Case findings and outcomes
-   Clinical analytics and reporting

### 📦 Resource Management

-   Hospital resource allocation
-   Equipment and supply tracking
-   Staff management and scheduling
-   Resource utilization analytics

### 🚑 Patient Throughput

-   Patient flow optimization
-   Admission and discharge tracking
-   Throughput bottleneck identification
-   Flow metrics and analytics

### 🔔 Alerts & Anomalies

-   Real-time alert management
-   Anomaly detection and analysis
-   Alert escalation and response
-   Historical alert analytics

### 🔍 Compliance & Audit

-   Regulatory compliance monitoring
-   Audit trail management
-   Documentation tracking
-   Compliance scoring and reporting

### 📁 Reports & Analytics

-   Custom report generation
-   Data export capabilities
-   Historical analytics
-   Performance reporting

### ⚙️ Settings

-   User preference management
-   System configuration
-   Integration settings
-   Theme and display options

## Technical Architecture

### Frontend Technologies

-   **React 18** - Modern React with hooks and functional components
-   **Styled Components** - CSS-in-JS styling solution
-   **Webpack 5** - Module bundling and dev server
-   **Babel** - JavaScript transpilation
-   **Axios** - HTTP client for API communication

### Splunk Integration

-   **Splunk SDK** - Native integration with Splunk platform
-   **Real-time Data** - Live data streaming from Splunk indexes
-   **Role-based Access** - Integration with Splunk user roles and permissions
-   **Custom Searches** - Dynamic search queries based on user selections

### Supported User Roles

-   🏥 **Hospital Administrator** - Full access to all modules
-   👩‍⚕️ **Clinician** - Access to patient care modules
-   👨‍💼 **Department Head** - Departmental analytics and management
-   📊 **Analyst** - Analytics and reporting focused access
-   🔧 **IT Support** - System administration and technical support

## Installation

### Prerequisites

-   Node.js 16+ and npm/yarn
-   Splunk Enterprise 8.0+ or Splunk Cloud
-   Modern web browser with JavaScript enabled

### Setup Instructions

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd neocare360
    ```

2. **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Configure Splunk integration**

    - Update Splunk connection settings in configuration files
    - Ensure proper user roles are configured in Splunk
    - Verify data access permissions

4. **Development server**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

5. **Build for production**

    ```bash
    npm run build
    # or
    yarn build
    ```

6. **Deploy to Splunk**
    ```bash
    ./build-splunk-app.sh
    ```

## Project Structure

```
neocare360/
├── appserver/                    # Splunk app server files
│   └── static/                   # Static web assets
│       ├── build/                # Production build output
│       ├── demo/                 # Demo and standalone files
│       └── src/                  # Source code
│           ├── components/       # React components
│           │   ├── alerts/       # Alerts & Anomalies module
│           │   ├── clinical-kpis/# Clinical KPIs module
│           │   ├── compliance/   # Compliance & Audit module
│           │   ├── icu-command-center/ # ICU Command Center
│           │   ├── overview/     # Dashboard Overview
│           │   ├── patient-monitoring/ # Patient Monitoring
│           │   ├── patient-throughput/ # Patient Throughput
│           │   ├── reports/      # Reports & Analytics
│           │   ├── resource-management/ # Resource Management
│           │   └── settings/     # Settings module
│           ├── contexts/         # React contexts (Theme, Splunk)
│           ├── data/             # Mock data and utilities
│           ├── main/webapp/      # Main application structure
│           ├── services/         # API services and utilities
│           ├── themes/           # Theme configuration
│           └── index.js          # Application entry point
├── default/                      # Splunk app configuration
├── metadata/                     # Splunk metadata
├── static/                       # Additional static files
├── build-splunk-app.sh          # Build script for Splunk deployment
├── package.json                 # Node.js dependencies and scripts
├── webpack.config.js            # Webpack configuration
└── README.md                    # This file
```

## Configuration

### Environment Variables

-   Configure Splunk connection settings
-   Set up data source endpoints
-   Configure authentication parameters

### Splunk App Configuration

-   Update `app.conf` for Splunk app metadata
-   Configure user role permissions
-   Set up data input configurations

### Theme Configuration

The application supports both light and dark themes with customizable:

-   Color schemes
-   Typography settings
-   Layout preferences
-   Component styling

## Data Sources

### Supported Data Types

-   **Patient Data** - Demographics, vital signs, medical records
-   **Hospital Operations** - Bed management, staff schedules, resource allocation
-   **Clinical Metrics** - KPIs, quality indicators, performance metrics
-   **Financial Data** - Billing, costs, revenue analytics
-   **Compliance Data** - Audit logs, regulatory compliance metrics

### Data Integration

-   Real-time streaming from Splunk indexes
-   RESTful API endpoints for data access
-   Scheduled data refreshes
-   Custom search queries and filters

## Development

### Getting Started

1. Follow installation instructions above
2. Start the development server: `npm run dev`
3. Open http://localhost:8080 in your browser
4. Make changes to source files - the app will auto-reload

### Available Scripts

-   `npm run dev` - Start development server
-   `npm run build` - Build for production
-   `npm run lint` - Run code linting
-   `npm run test` - Run test suite (if configured)

### Code Style

-   Use functional React components with hooks
-   Follow ESLint configuration
-   Use styled-components for styling
-   Implement proper error handling
-   Write comprehensive prop validation

## Security

### Authentication

-   Integration with Splunk user authentication
-   Role-based access control (RBAC)
-   Secure API communication
-   Session management

### Data Protection

-   Encrypted data transmission
-   Secure API endpoints
-   User permission validation
-   Audit logging for sensitive operations

## Performance

### Optimization Features

-   Code splitting and lazy loading
-   Efficient data caching
-   Optimized re-rendering
-   Responsive design for all devices
-   Progressive loading for large datasets

## Browser Support

-   Chrome 80+
-   Firefox 75+
-   Safari 13+
-   Edge 80+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary software. All rights reserved.

## Support

For technical support and questions:

-   Check the documentation
-   Review common issues and solutions
-   Contact the development team
-   Submit bug reports with detailed information

## Changelog

### Version 1.0.0

-   Initial release with core healthcare modules
-   Splunk integration and role-based access
-   Real-time monitoring capabilities
-   Comprehensive reporting features

---

**NeoCare360** - Transforming healthcare through intelligent data visualization and real-time monitoring.
