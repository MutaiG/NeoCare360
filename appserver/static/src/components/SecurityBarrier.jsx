import React from 'react';
import styled from 'styled-components';

const SecurityContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: ${(props) =>
        props.darkMode
            ? 'linear-gradient(135deg, #1a1a1a 0%, #2d1810 50%, #1a1a1a 100%)'
            : 'linear-gradient(135deg, #f8f9fa 0%, #fff5f5 50%, #f8f9fa 100%)'};
    color: ${(props) => (props.darkMode ? '#ffffff' : '#333333')};
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

const SecurityCard = styled.div`
    background: ${(props) =>
        props.darkMode ? 'rgba(45, 24, 16, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
    border: 3px solid ${(props) => (props.darkMode ? '#d68910' : '#e53e3e')};
    border-radius: 16px;
    padding: 40px;
    max-width: 600px;
    text-align: center;
    box-shadow: ${(props) =>
        props.darkMode ? '0 20px 40px rgba(0, 0, 0, 0.5)' : '0 20px 40px rgba(0, 0, 0, 0.1)'};
    backdrop-filter: blur(10px);
`;

const SecurityIcon = styled.div`
    font-size: 80px;
    margin-bottom: 24px;
    animation: pulse 2s infinite;

    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }
`;

const SecurityTitle = styled.h1`
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 16px;
    color: ${(props) => (props.darkMode ? '#f56565' : '#e53e3e')};
`;

const SecuritySubtitle = styled.h2`
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 24px;
    color: ${(props) => (props.darkMode ? '#fed7d7' : '#742a2a')};
`;

const SecurityMessage = styled.p`
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 16px;
    color: ${(props) => (props.darkMode ? '#cbd5e0' : '#4a5568')};
`;

const SecurityDetails = styled.div`
    background: ${(props) => (props.darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 245, 245, 0.8)')};
    border-radius: 8px;
    padding: 20px;
    margin: 24px 0;
    text-align: left;
`;

const SecurityDetailItem = styled.div`
    margin-bottom: 12px;
    font-size: 14px;

    strong {
        color: ${(props) => (props.darkMode ? '#f56565' : '#e53e3e')};
    }
`;

const ContactInfo = styled.div`
    background: ${(props) =>
        props.darkMode ? 'rgba(54, 54, 54, 0.8)' : 'rgba(237, 242, 247, 0.8)'};
    border-radius: 8px;
    padding: 16px;
    margin-top: 24px;
    font-size: 14px;

    strong {
        color: ${(props) => (props.darkMode ? '#63b3ed' : '#3182ce')};
    }
`;

const SecurityBarrier = ({ user, accessDeniedReason, userRoles = [], darkMode = false }) => {
    const currentTime = new Date().toLocaleString();

    // Generate a security incident ID for tracking
    const securityIncidentId = `SEC-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)
        .toUpperCase()}`;

    // Safely format user roles
    const safeUserRoles = Array.isArray(userRoles) ? userRoles : [];
    const userName = user?.name || user?.username || 'unknown_user';
    const safeAccessReason = accessDeniedReason || 'Missing required NeoCare authorization';

    // Log security incident with proper formatting and safety checks
    const securityIncident = {
        incidentId: securityIncidentId,
        timestamp: currentTime,
        user: userName,
        attemptedAccess: 'NeoCare360 Clinical Intelligence Hub',
        userRoles: safeUserRoles,
        reason: safeAccessReason,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
        ip: 'determined_by_splunk',
    };

    console.error('🚨 SECURITY INCIDENT:');
    console.error('Incident ID:', securityIncident.incidentId);
    console.error('User:', securityIncident.user);
    console.error('User Roles:', safeUserRoles.join(', ') || 'none');
    console.error('Reason:', safeAccessReason);
    console.error('Timestamp:', securityIncident.timestamp);

    // Only stringify if the object is valid
    try {
        console.error('Full Details:', JSON.stringify(securityIncident, null, 2));
    } catch (err) {
        console.error('Could not stringify security incident details:', err.message);
        console.error('Raw incident data:', securityIncident);
    }

    return (
        <SecurityContainer darkMode={darkMode}>
            <SecurityCard darkMode={darkMode}>
                <SecurityIcon>🔒</SecurityIcon>

                <SecurityTitle darkMode={darkMode}>Access Denied</SecurityTitle>

                <SecuritySubtitle darkMode={darkMode}>
                    Unauthorized Access to NeoCare360
                </SecuritySubtitle>

                <SecurityMessage darkMode={darkMode}>
                    Your current user account does not have the required authorization to access the
                    NeoCare360 Clinical Intelligence Hub. This application is restricted to
                    healthcare professionals with designated NeoCare roles only.
                </SecurityMessage>

                <SecurityDetails darkMode={darkMode}>
                    <SecurityDetailItem darkMode={darkMode}>
                        <strong>Security Incident ID:</strong> {securityIncidentId}
                    </SecurityDetailItem>
                    <SecurityDetailItem darkMode={darkMode}>
                        <strong>User:</strong> {userName}
                    </SecurityDetailItem>
                    <SecurityDetailItem darkMode={darkMode}>
                        <strong>Current Roles:</strong>{' '}
                        {safeUserRoles.length > 0 ? safeUserRoles.join(', ') : 'No roles assigned'}
                    </SecurityDetailItem>
                    <SecurityDetailItem darkMode={darkMode}>
                        <strong>Timestamp:</strong> {currentTime}
                    </SecurityDetailItem>
                    <SecurityDetailItem darkMode={darkMode}>
                        <strong>Reason:</strong> {safeAccessReason}
                    </SecurityDetailItem>
                </SecurityDetails>

                <SecurityMessage darkMode={darkMode} style={{ fontWeight: '600' }}>
                    Required: Valid NeoCare role (neocare_hospital_admin, neocare_physician,
                    neocare_nurse, etc.)
                </SecurityMessage>

                <SecurityMessage darkMode={darkMode}>
                    <strong>Available NeoCare Roles:</strong>
                    <br />
                    • neocare_hospital_admin - Hospital Administration
                    <br />
                    • neocare_chief_medical_officer - Chief Medical Officer
                    <br />
                    • neocare_physician - Physician Access
                    <br />
                    • neocare_nurse - Nursing Staff Access
                    <br />
                    • neocare_icu_specialist - ICU Specialist Access
                    <br />
                    • neocare_clinical_analyst - Clinical Analytics
                    <br />
                    • neocare_compliance_officer - Compliance & Audit
                    <br />• neocare_it_admin - Technical Administration
                </SecurityMessage>

                <ContactInfo darkMode={darkMode}>
                    <strong>Need Access?</strong>
                    <br />
                    Contact your NeoCare360 system administrator or IT department to request the
                    appropriate NeoCare role assignment. Provide them with the Security Incident ID
                    above for reference.
                </ContactInfo>

                <SecurityMessage
                    darkMode={darkMode}
                    style={{
                        fontSize: '12px',
                        marginTop: '20px',
                        opacity: 0.7,
                        fontStyle: 'italic',
                    }}
                >
                    This access attempt has been logged for security purposes. Unauthorized access
                    attempts are monitored and reported.
                </SecurityMessage>
            </SecurityCard>
        </SecurityContainer>
    );
};

export default SecurityBarrier;
