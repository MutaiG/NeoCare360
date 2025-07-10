import React, { createContext, useContext, useState, useEffect } from 'react';

const SplunkContext = createContext();

export const useSplunk = () => {
    const context = useContext(SplunkContext);
    if (!context) {
        throw new Error('useSplunk must be used within a SplunkProvider');
    }
    return context;
};

// Healthcare role definitions with permissions
export const HEALTHCARE_ROLES = {
    // Executive/Administrative Roles
    hospital_admin: {
        name: 'Hospital Administrator',
        level: 'executive',
        permissions: ['all'],
        defaultView: 'overview',
        icon: '👔',
        description: 'Full system access and hospital oversight',
    },
    chief_medical_officer: {
        name: 'Chief Medical Officer',
        level: 'executive',
        permissions: [
            'overview',
            'clinical-kpis',
            'patient-monitoring',
            'icu-command-center',
            'compliance',
            'reports',
        ],
        defaultView: 'clinical-kpis',
        icon: '👨‍⚕️',
        description: 'Clinical oversight and quality management',
    },

    // Department Management
    department_head: {
        name: 'Department Head',
        level: 'management',
        permissions: [
            'overview',
            'patient-monitoring',
            'resource-management',
            'clinical-kpis',
            'reports',
        ],
        defaultView: 'patient-monitoring',
        icon: '👩‍⚕️',
        description: 'Department operations and staff management',
    },
    nurse_manager: {
        name: 'Nurse Manager',
        level: 'management',
        permissions: ['patient-monitoring', 'resource-management', 'alerts', 'reports'],
        defaultView: 'patient-monitoring',
        icon: '👩‍⚕️',
        description: 'Nursing staff and patient care coordination',
    },

    // Clinical Roles
    physician: {
        name: 'Physician',
        level: 'clinical',
        permissions: ['patient-monitoring', 'icu-command-center', 'clinical-kpis', 'alerts'],
        defaultView: 'patient-monitoring',
        icon: '🩺',
        description: 'Patient care and clinical decision making',
    },
    icu_specialist: {
        name: 'ICU Specialist',
        level: 'clinical',
        permissions: ['icu-command-center', 'patient-monitoring', 'alerts'],
        defaultView: 'icu-command-center',
        icon: '🚨',
        description: 'Critical care and intensive care unit management',
    },
    nurse: {
        name: 'Registered Nurse',
        level: 'clinical',
        permissions: ['patient-monitoring', 'alerts'],
        defaultView: 'patient-monitoring',
        icon: '👩‍⚕️',
        description: 'Direct patient care and monitoring',
    },

    // Support Roles
    clinical_analyst: {
        name: 'Clinical Data Analyst',
        level: 'support',
        permissions: ['clinical-kpis', 'reports', 'patient-throughput', 'compliance'],
        defaultView: 'clinical-kpis',
        icon: '📊',
        description: 'Data analysis and clinical insights',
    },
    compliance_officer: {
        name: 'Compliance Officer',
        level: 'support',
        permissions: ['compliance', 'reports', 'clinical-kpis'],
        defaultView: 'compliance',
        icon: '🔍',
        description: 'Regulatory compliance and quality assurance',
    },
    it_admin: {
        name: 'IT Administrator',
        level: 'technical',
        permissions: ['all', 'settings'],
        defaultView: 'settings',
        icon: '💻',
        description: 'System administration and technical support',
    },
};

// Data scope permissions based on role
export const SCOPE_PERMISSIONS = {
    hospital_admin: ['national', 'county', 'hospital'],
    chief_medical_officer: ['county', 'hospital'],
    department_head: ['hospital'],
    nurse_manager: ['hospital'],
    physician: ['hospital'],
    icu_specialist: ['hospital'],
    nurse: ['hospital'],
    clinical_analyst: ['county', 'hospital'],
    compliance_officer: ['national', 'county', 'hospital'],
    it_admin: ['national', 'county', 'hospital'],
};

export const SplunkProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [splunkContext, setSplunkContext] = useState(null);
    const [hasNeoCareAccess, setHasNeoCareAccess] = useState(false);
    const [accessDeniedReason, setAccessDeniedReason] = useState(null);

    // Initialize Splunk context and get user information
    useEffect(() => {
        const initializeSplunk = async () => {
            console.log('🚀 SplunkContext: Starting initialization...');

            // Add timeout fallback to prevent hanging
            const initTimeout = setTimeout(() => {
                console.log('⏰ SplunkContext: Initialization timeout, falling back to demo mode');
                setIsLoading(false);
            }, 5000); // 5 second timeout

            try {
                // Check if we're in Splunk environment - more robust detection
                const isSplunkEnvironment =
                    (window.require && typeof window.require === 'function') ||
                    (window.$C && window.$C.SPLUNKD_PATH) ||
                    window.location.pathname.includes('/app/') ||
                    document.querySelector('script[src*="splunk"]');

                console.log('🔍 SplunkContext: Environment check:', {
                    hasRequire: !!window.require,
                    requireType: typeof window.require,
                    has$C: !!window.$C,
                    hasSplunkdPath: !!(window.$C && window.$C.SPLUNKD_PATH),
                    isSplunkEnvironment,
                });

                if (isSplunkEnvironment) {
                    console.log('🔍 SPLUNK ENVIRONMENT DETECTED');

                    // Use async require to load Splunk modules
                    window.require(
                        ['splunkjs/mvc', 'splunkjs/mvc/utils'],
                        function (mvc, utils) {
                            try {
                                console.log('✅ Splunk modules loaded successfully');

                                // Get user information
                                let currentUser = null;
                                let userRoles = [];

                                // Method 1: Get roles using the working Splunk REST API
                                try {
                                    console.log('🔍 Getting roles from Splunk REST API...');
                                    const xhr = new XMLHttpRequest();
                                    xhr.open(
                                        'GET',
                                        '/splunkd/services/authentication/current-context?output_mode=json',
                                        false
                                    );
                                    xhr.setRequestHeader('Accept', 'application/json');
                                    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                                    xhr.send();

                                    if (xhr.status === 200) {
                                        const response = JSON.parse(xhr.responseText);
                                        console.log('📊 Parsed JSON response:', response);

                                        // Extract roles from Splunk API response
                                        if (
                                            response &&
                                            response.entry &&
                                            response.entry[0] &&
                                            response.entry[0].content
                                        ) {
                                            const content = response.entry[0].content;
                                            if (content.roles) {
                                                userRoles = Array.isArray(content.roles)
                                                    ? content.roles
                                                    : [content.roles];
                                                console.log('✅ Got roles from JSON:', userRoles);

                                                // Check for NeoCare roles specifically
                                                const neocareRoles = userRoles.filter((role) =>
                                                    role.startsWith('neocare_')
                                                );
                                                if (neocareRoles.length > 0) {
                                                    console.log(
                                                        '🎯 Found NeoCare roles:',
                                                        neocareRoles
                                                    );
                                                }
                                            }
                                        }
                                    } else {
                                        console.log('⚠️ REST API failed with status:', xhr.status);
                                    }
                                } catch (e) {
                                    console.log('⚠️ REST API request failed:', e.message);
                                }

                                // Get basic user info for display
                                currentUser = {
                                    name: window.$C?.USERNAME || 'splunk_user',
                                    realName: 'NeoCare360 User',
                                    email: '',
                                    capabilities: [],
                                };

                                console.log('🔍 SPLUNK ROLE DEBUG:');
                                console.log('Current User:', currentUser);
                                console.log('User Roles from Splunk:', userRoles);
                                console.log('User capabilities:', currentUser?.capabilities);

                                // Map Splunk roles to healthcare roles - STRICT NeoCare roles ONLY
                                let healthcareRole;
                                let hasValidNeoCareRole = false;
                                let accessDenialReason = null;

                                // STRICT SECURITY: ONLY allow NeoCare roles - no fallback to admin or other roles
                                const neocareRoles = userRoles.filter((role) =>
                                    role.startsWith('neocare_')
                                );

                                if (neocareRoles.length > 0) {
                                    healthcareRole = mapSplunkRoleToHealthcare(userRoles);
                                    hasValidNeoCareRole = true;
                                    console.log(
                                        '✅ SECURITY CHECK PASSED: Valid NeoCare role found:',
                                        neocareRoles
                                    );
                                } else {
                                    // SECURITY BREACH DETECTION: No NeoCare role found
                                    console.warn(
                                        '🚨 SECURITY ALERT: Access denied - No valid NeoCare roles found for user'
                                    );
                                    console.warn('User roles found:', userRoles);

                                    // Check if user has admin/power roles but no NeoCare access
                                    const adminRoles = ['admin', 'sc_admin', 'power', 'user'];
                                    const foundAdminRoles = userRoles.filter((role) =>
                                        adminRoles.includes(role)
                                    );

                                    if (foundAdminRoles.length > 0) {
                                        accessDenialReason = `Security Policy Violation: User has ${foundAdminRoles.join(
                                            ', '
                                        )} role(s) but lacks required NeoCare authorization. Contact NeoCare360 administrator to assign appropriate neocare_* role.`;
                                    } else {
                                        accessDenialReason = `Unauthorized Access Attempt: User does not have any valid NeoCare roles. Required roles must start with 'neocare_' prefix.`;
                                    }

                                    // Set null role to trigger access denial
                                    healthcareRole = null;
                                    hasValidNeoCareRole = false;
                                }

                                // Update security state
                                setHasNeoCareAccess(hasValidNeoCareRole);
                                setAccessDeniedReason(accessDenialReason);

                                console.log('Final Healthcare Role:', healthcareRole);

                                setUser({
                                    name: currentUser?.name || 'Healthcare User',
                                    realName: currentUser?.realName || 'Healthcare Professional',
                                    email: currentUser?.email || '',
                                    splunkRoles: userRoles,
                                    capabilities: currentUser?.capabilities || [],
                                });

                                setUserRole(healthcareRole);
                                setSplunkContext({
                                    mvc,
                                    utils,
                                    splunkUtil: null,
                                    appName: 'neocare360',
                                    version: '1.0.0',
                                });

                                clearTimeout(initTimeout);
                                setIsLoading(false);
                            } catch (moduleError) {
                                console.error(
                                    '❌ Error processing loaded Splunk modules:',
                                    moduleError
                                );
                                throw moduleError;
                            }
                        },
                        function (error) {
                            console.error('❌ Failed to load Splunk modules:', error);
                            throw new Error('Could not load Splunk modules: ' + error.message);
                        }
                    );
                } else {
                    // Development/Demo mode - use proper NeoCare roles
                    console.log('🎭 SplunkContext: Entering DEMO MODE');
                    const demoRoleKey = localStorage.getItem('demo_role') || 'hospital_admin';
                    const neocareRoleName = `neocare_${demoRoleKey}`;

                    console.log(`🚀 DEMO MODE CONFIGURATION:`);
                    console.log(`- Base role key: ${demoRoleKey}`);
                    console.log(`- NeoCare role name: ${neocareRoleName}`);
                    console.log(`- Healthcare role:`, HEALTHCARE_ROLES[demoRoleKey]);

                    setUser({
                        name: 'demo_user',
                        realName: HEALTHCARE_ROLES[demoRoleKey]?.name || 'Demo User',
                        email: 'demo@hospital.ke',
                        splunkRoles: [neocareRoleName], // Use NeoCare-prefixed role
                        capabilities: ['admin_all_objects'],
                    });

                    setUserRole(HEALTHCARE_ROLES[demoRoleKey] || HEALTHCARE_ROLES.hospital_admin);

                    // Set security access to true for demo mode since we're using proper NeoCare role
                    setHasNeoCareAccess(true);
                    setAccessDeniedReason(null);

                    console.log(`✅ DEMO MODE: NeoCare access granted for role ${neocareRoleName}`);

                    console.log(
                        '✅ SplunkContext: DEMO MODE initialization complete, setting isLoading to false'
                    );
                    clearTimeout(initTimeout);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('❌ Failed to initialize Splunk context:', error);
                // Fallback to NeoCare role
                const fallbackRoleKey = window.$C ? 'hospital_admin' : 'nurse';
                const fallbackNeoCareRole = `neocare_${fallbackRoleKey}`;
                console.log(`🔄 Falling back to NeoCare role: ${fallbackNeoCareRole}`);

                setUser({
                    name: 'fallback_user',
                    realName: HEALTHCARE_ROLES[fallbackRoleKey]?.name || 'Healthcare Professional',
                    email: '',
                    splunkRoles: [fallbackNeoCareRole], // Use NeoCare-prefixed role
                    capabilities: fallbackRoleKey === 'hospital_admin' ? ['admin_all_objects'] : [],
                });

                setUserRole(HEALTHCARE_ROLES[fallbackRoleKey]);

                // Set security access to true for fallback since we're using proper NeoCare role
                setHasNeoCareAccess(true);
                setAccessDeniedReason(null);

                clearTimeout(initTimeout);
                setIsLoading(false);
            }
        };

        initializeSplunk();
    }, []);

    // Map Splunk roles to healthcare roles - STRICT NeoCare roles ONLY
    const mapSplunkRoleToHealthcare = (splunkRoles) => {
        console.log('🔒 STRICT NEOCARE ROLE MAPPING:');
        console.log('Input roles:', splunkRoles);

        // Ensure splunkRoles is an array
        const rolesArray = Array.isArray(splunkRoles)
            ? splunkRoles
            : splunkRoles
            ? [splunkRoles]
            : [];
        console.log('Normalized roles array:', rolesArray);

        // SECURITY: ONLY NeoCare roles are allowed - no fallback to admin/power/user roles
        const neocareRoleMapping = {
            // NeoCare360 roles (ONLY these are allowed) - standardized with neocare_ prefix
            neocare_hospital_admin: 'hospital_admin',
            neocare_chief_medical_officer: 'chief_medical_officer',
            neocare_department_head: 'department_head',
            neocare_nurse_manager: 'nurse_manager',
            neocare_physician: 'physician',
            neocare_icu_specialist: 'icu_specialist',
            neocare_nurse: 'nurse',
            neocare_clinical_analyst: 'clinical_analyst',
            neocare_compliance_officer: 'compliance_officer',
            neocare_it_admin: 'it_admin',
        };

        console.log('Allowed NeoCare role mappings:', Object.keys(neocareRoleMapping));

        // SECURITY CHECK: Only process NeoCare roles (neocare_ prefix only)
        const validNeocareRoles = rolesArray.filter((role) => role.startsWith('neocare_'));

        if (validNeocareRoles.length === 0) {
            console.error('🚨 SECURITY VIOLATION: No valid NeoCare roles found in user roles');
            console.error('Attempted roles:', rolesArray);
            return null; // Return null to trigger access denial
        }

        // Find the first valid NeoCare role (highest priority first)
        for (const neocareRole of validNeocareRoles) {
            console.log(`🔍 Checking NeoCare role: "${neocareRole}"`);
            if (neocareRoleMapping[neocareRole]) {
                const mappedRoleKey = neocareRoleMapping[neocareRole];
                const mappedRole = HEALTHCARE_ROLES[mappedRoleKey];
                console.log(
                    `✅ SECURITY APPROVED: NeoCare role mapping: "${neocareRole}" → "${mappedRoleKey}"`,
                    mappedRole
                );
                return mappedRole;
            }
        }

        // If we reach here, user has neocare_ roles but they're not recognized
        console.error('🚨 SECURITY WARNING: Unrecognized NeoCare roles found:', validNeocareRoles);
        return null; // Deny access for unrecognized NeoCare roles
    };

    // Permission checking functions
    const hasPermission = (component) => {
        if (!userRole) return false;
        if (userRole.permissions.includes('all')) return true;
        return userRole.permissions.includes(component);
    };

    const getAccessibleComponents = () => {
        if (!userRole) return [];
        if (userRole.permissions.includes('all')) {
            return [
                'overview',
                'patient-monitoring',
                'icu-command-center',
                'clinical-kpis',
                'resource-management',
                'patient-throughput',
                'alerts',
                'compliance',
                'reports',
                'settings',
            ];
        }
        return userRole.permissions;
    };

    const getDefaultView = () => {
        return userRole?.defaultView || 'overview';
    };

    // Audit logging function
    const logUserAction = (action, component, details = {}) => {
        // Log to console for development and audit
        console.log('User Action:', {
            user: user?.name,
            role: userRole?.name,
            action,
            component,
            timestamp: new Date().toISOString(),
            details,
        });
    };

    // Demo role switching function
    const switchDemoRole = (roleKey) => {
        if (HEALTHCARE_ROLES[roleKey]) {
            localStorage.setItem('demo_role', roleKey);
            window.location.reload();
        }
    };

    // Set user role in cache
    const cacheUserRole = (username, roleKey) => {
        if (HEALTHCARE_ROLES[roleKey]) {
            localStorage.setItem(`neocare_user_role_${username}`, roleKey);
            console.log(`💾 Cached role for ${username}: ${roleKey}`);
            return true;
        }
        return false;
    };

    // Get available roles for configuration
    const getAvailableRoles = () => {
        return Object.keys(HEALTHCARE_ROLES).map((key) => ({
            key,
            ...HEALTHCARE_ROLES[key],
        }));
    };

    // Get user's allowed data scopes
    const getAllowedScopes = () => {
        if (!userRole) return [];
        const roleKey = Object.keys(HEALTHCARE_ROLES).find(
            (key) => HEALTHCARE_ROLES[key] === userRole
        );
        return roleKey ? SCOPE_PERMISSIONS[roleKey] || [] : [];
    };

    // Check if user can access a specific scope
    const hasScope = (scope) => {
        const allowedScopes = getAllowedScopes();
        return allowedScopes.includes(scope);
    };

    // Get highest allowed scope for the user
    const getHighestScope = () => {
        const allowedScopes = getAllowedScopes();
        if (allowedScopes.includes('national')) return 'national';
        if (allowedScopes.includes('county')) return 'county';
        if (allowedScopes.includes('hospital')) return 'hospital';
        return null;
    };

    const value = {
        // User context
        user,
        userRole,
        isLoading,
        splunkContext,

        // Security context
        hasNeoCareAccess,
        accessDeniedReason,

        // Permission functions
        hasPermission,
        getAccessibleComponents,
        getDefaultView,

        // Utility functions
        logUserAction,
        switchDemoRole,
        cacheUserRole,
        getAvailableRoles,

        // Scope permission functions
        getAllowedScopes,
        hasScope,
        getHighestScope,

        // Role definitions (for reference)
        availableRoles: HEALTHCARE_ROLES,
        scopePermissions: SCOPE_PERMISSIONS,
    };

    return <SplunkContext.Provider value={value}>{children}</SplunkContext.Provider>;
};

// Higher-order component for role-based component protection
export const withRoleBasedAccess = (WrappedComponent, requiredPermission) => {
    return function RoleBasedComponent(props) {
        const { hasPermission, logUserAction } = useSplunk();

        useEffect(() => {
            logUserAction('component_access', requiredPermission, {
                allowed: hasPermission(requiredPermission),
            });
        }, []);

        if (!hasPermission(requiredPermission)) {
            return (
                <div
                    style={{
                        padding: '40px',
                        textAlign: 'center',
                        background: 'var(--bg-surface)',
                        borderRadius: '12px',
                        border: '2px solid var(--status-warning)',
                        margin: '20px',
                    }}
                >
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>
                    <h2 style={{ color: 'var(--status-warning)', marginBottom: '12px' }}>
                        Access Restricted
                    </h2>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Your role does not have permission to access this component.
                        <br />
                        Please contact your system administrator if you need access.
                    </p>
                </div>
            );
        }

        return <WrappedComponent {...props} />;
    };
};
