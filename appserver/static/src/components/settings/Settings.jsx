import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
    SettingsContainer,
    DashboardTitle,
    SettingsGrid,
    SettingsSection,
    SectionHeader,
    SectionTitle,
    SectionContent,
    SettingGroup,
    SettingItem,
    SettingLabel,
    SettingControl,
    ToggleSwitch,
    ToggleSlider,
    SelectInput,
    TextInput,
    ActionButton,
    SaveButton,
    SystemStatus,
    StatusItem,
    StatusIcon,
    StatusLabel,
    StatusValue,
    PreferenceCard,
    PreferenceIcon,
    PreferenceContent,
    PreferenceTitle,
    PreferenceDescription,
    SecurityCard,
    SecurityItem,
    SecurityIcon,
    SecurityDetails,
    NotificationSettings,
    NotificationItem,
    NotificationIcon,
    NotificationContent,
    NotificationToggle,
} from './SettingsStyles';

const propTypes = {
    name: PropTypes.string,
    darkMode: PropTypes.bool,
    autoRefresh: PropTypes.bool,
    filters: PropTypes.object,
};

const Settings = ({ name = 'NeoCare360', darkMode = false, autoRefresh = true, filters = {} }) => {
    // Get user and role information from filters
    const user = filters?.user || {
        name: 'demo_user',
        email: 'user@hospital.ke',
        realName: 'Healthcare Professional',
        splunkRoles: ['neocare_hospital_admin'],
        capabilities: ['admin_all_objects'],
        lastLogin: new Date().toISOString(),
    };

    const userRole = filters?.userRole || {
        name: 'Hospital Administrator',
        level: 'executive',
        permissions: ['all'],
        defaultView: 'overview',
        icon: '👔',
        description: 'Full system access and hospital oversight',
    };

    // Theme management - connect to parent theme context
    const [localTheme, setLocalTheme] = useState(darkMode ? 'dark' : 'light');
    const [settings, setSettings] = useState({
        theme: darkMode ? 'dark' : 'light',
        autoTheme: false,
        animations: true,
        reducedMotion: false,
        highContrast: false,
        compactMode: false,
        autoRefresh: autoRefresh,
        refreshInterval: 30,
        defaultView: userRole?.defaultView || 'overview',
        alertSounds: true,
        fontSize: 'medium',
        language: 'en',
        emailNotifications: true,
        desktopNotifications: true,
        smsNotifications: false,
        alertFrequency: 'immediate',
        showAdvanced: false,
    });

    // Update local theme when prop changes
    useEffect(() => {
        setLocalTheme(darkMode ? 'dark' : 'light');
        setSettings((prev) => ({ ...prev, theme: darkMode ? 'dark' : 'light' }));
    }, [darkMode]);

    // RBAC Helper Functions
    const hasPermission = (component) => {
        if (!userRole) return false;
        if (userRole.permissions.includes('all')) return true;
        return userRole.permissions.includes(component);
    };

    const isSystemAdmin = () => {
        return (
            userRole?.name === 'IT Administrator' ||
            userRole?.permissions?.includes('all') ||
            user?.splunkRoles?.includes('neocare_it_admin')
        );
    };

    const canModifySystemSettings = () => {
        return (
            isSystemAdmin() ||
            userRole?.level === 'executive' ||
            user?.splunkRoles?.some((role) => role.includes('admin'))
        );
    };

    const canAccessSecuritySettings = () => {
        return (
            isSystemAdmin() ||
            userRole?.name === 'Hospital Administrator' ||
            user?.splunkRoles?.includes('neocare_hospital_admin')
        );
    };

    const canManageUsers = () => {
        return canAccessSecuritySettings();
    };

    const canViewSystemStatus = () => {
        return (
            isSystemAdmin() || userRole?.level === 'executive' || userRole?.level === 'management'
        );
    };

    const canModifyNotifications = () => {
        return userRole?.level !== 'support' && userRole?.name !== 'Registered Nurse';
    };

    // Settings update with permission checks
    const updateSetting = (key, value) => {
        // Check permissions for sensitive settings
        const systemSettings = ['refreshInterval', 'alertFrequency', 'autoRefresh'];
        if (systemSettings.includes(key) && !canModifySystemSettings()) {
            alert('You do not have permission to modify system-wide settings.');
            return;
        }

        setSettings((prev) => ({ ...prev, [key]: value }));

        // Handle theme toggle - notify parent component
        if (key === 'theme') {
            setLocalTheme(value);
            // Try to call parent theme toggle if available
            if (filters?.toggleTheme && typeof filters.toggleTheme === 'function') {
                filters.toggleTheme();
            }
            // Also update document body class for immediate effect
            document.body.classList.toggle('dark-mode', value === 'dark');
        }

        logUserAction('settings_change', key, { oldValue: settings[key], newValue: value });
    };

    const logUserAction = (action, component, details = {}) => {
        console.log('Settings Action:', {
            user: user?.name,
            role: userRole?.name,
            action,
            component,
            timestamp: new Date().toISOString(),
            details,
        });
    };

    const handleThemeToggle = () => {
        const newTheme = localTheme === 'dark' ? 'light' : 'dark';
        updateSetting('theme', newTheme);
    };

    const getVisibleSections = () => {
        const sections = [];

        // Personal Preferences - available to all users
        sections.push('personal');

        // Theme & Appearance - available to all users
        sections.push('appearance');

        // Notifications - available to most users except basic nurses
        if (canModifyNotifications()) {
            sections.push('notifications');
        }

        // System Settings - admin and executive only
        if (canModifySystemSettings()) {
            sections.push('system');
        }

        // System Status - management and above
        if (canViewSystemStatus()) {
            sections.push('status');
        }

        // Security & Access - admin only
        if (canAccessSecuritySettings()) {
            sections.push('security');
        }

        console.log('👤 Settings Access Debug:', {
            user: user.name,
            role: userRole?.name,
            level: userRole?.level,
            splunkRoles: user.splunkRoles,
            visibleSections: sections,
            permissions: {
                canModifyNotifications: canModifyNotifications(),
                canModifySystemSettings: canModifySystemSettings(),
                canViewSystemStatus: canViewSystemStatus(),
                canAccessSecuritySettings: canAccessSecuritySettings(),
                isSystemAdmin: isSystemAdmin(),
            },
        });

        return sections;
    };

    const getRoleBasedDefaultViews = () => {
        const roleViews = {
            'Hospital Administrator': [
                'overview',
                'clinical-kpis',
                'resource-management',
                'compliance',
                'reports',
            ],
            'Chief Medical Officer': [
                'clinical-kpis',
                'patient-monitoring',
                'icu-command-center',
                'compliance',
            ],
            'Department Head': ['patient-monitoring', 'resource-management', 'clinical-kpis'],
            Physician: ['patient-monitoring', 'icu-command-center', 'clinical-kpis', 'alerts'],
            'ICU Specialist': ['icu-command-center', 'patient-monitoring', 'alerts'],
            'Registered Nurse': ['patient-monitoring', 'alerts'],
            'Clinical Data Analyst': ['clinical-kpis', 'reports', 'patient-throughput'],
            'Compliance Officer': ['compliance', 'reports', 'clinical-kpis'],
            'IT Administrator': ['settings', 'overview', 'reports'],
        };
        return roleViews[userRole?.name] || ['overview'];
    };

    const visibleSections = getVisibleSections();
    const availableDefaultViews = getRoleBasedDefaultViews();

    const renderPersonalSection = () => (
        <SettingsSection key="personal">
            <SectionHeader darkMode={localTheme === 'dark'}>
                <SectionTitle data-icon="👤">Personal Preferences</SectionTitle>
            </SectionHeader>
            <SectionContent>
                <SettingGroup>
                    {/* User Info Display */}
                    <PreferenceCard>
                        <PreferenceIcon>👤</PreferenceIcon>
                        <PreferenceContent>
                            <PreferenceTitle>User Information</PreferenceTitle>
                            <PreferenceDescription>
                                <strong>Name:</strong> {user.realName || user.name}
                                <br />
                                <strong>Email:</strong> {user.email}
                                <br />
                                <strong>Role:</strong> {userRole?.name} ({userRole?.icon})<br />
                                <strong>Access Level:</strong> {userRole?.level}
                                <br />
                                <strong>Splunk Roles:</strong> {user.splunkRoles?.join(', ')}
                            </PreferenceDescription>
                        </PreferenceContent>
                    </PreferenceCard>

                    {/* Default View Setting */}
                    <SettingItem>
                        <SettingLabel>Default Dashboard View</SettingLabel>
                        <SettingControl>
                            <SelectInput
                                value={settings.defaultView}
                                onChange={(e) => updateSetting('defaultView', e.target.value)}
                            >
                                {availableDefaultViews.map((view) => (
                                    <option key={view} value={view}>
                                        {view.charAt(0).toUpperCase() +
                                            view.slice(1).replace('-', ' ')}
                                    </option>
                                ))}
                            </SelectInput>
                        </SettingControl>
                    </SettingItem>

                    {/* Language Setting */}
                    <SettingItem>
                        <SettingLabel>Language</SettingLabel>
                        <SettingControl>
                            <SelectInput
                                value={settings.language}
                                onChange={(e) => updateSetting('language', e.target.value)}
                            >
                                <option value="en">English</option>
                                <option value="sw">Kiswahili</option>
                                <option value="fr">Français</option>
                            </SelectInput>
                        </SettingControl>
                    </SettingItem>

                    {/* Font Size */}
                    <SettingItem>
                        <SettingLabel>Font Size</SettingLabel>
                        <SettingControl>
                            <SelectInput
                                value={settings.fontSize}
                                onChange={(e) => updateSetting('fontSize', e.target.value)}
                            >
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                                <option value="extra-large">Extra Large</option>
                            </SelectInput>
                        </SettingControl>
                    </SettingItem>
                </SettingGroup>
            </SectionContent>
        </SettingsSection>
    );

    const renderAppearanceSection = () => (
        <SettingsSection key="appearance">
            <SectionHeader darkMode={localTheme === 'dark'}>
                <SectionTitle data-icon="🎨">Theme & Appearance</SectionTitle>
            </SectionHeader>
            <SectionContent>
                <SettingGroup>
                    {/* Theme Toggle */}
                    <SettingItem>
                        <SettingLabel>Dark Mode</SettingLabel>
                        <SettingControl>
                            <ToggleSwitch>
                                <input
                                    type="checkbox"
                                    checked={localTheme === 'dark'}
                                    onChange={handleThemeToggle}
                                />
                                <ToggleSlider />
                            </ToggleSwitch>
                        </SettingControl>
                    </SettingItem>

                    {/* Auto Theme */}
                    <SettingItem>
                        <SettingLabel>Auto Theme (Follow System)</SettingLabel>
                        <SettingControl>
                            <ToggleSwitch>
                                <input
                                    type="checkbox"
                                    checked={settings.autoTheme}
                                    onChange={(e) => updateSetting('autoTheme', e.target.checked)}
                                />
                                <ToggleSlider />
                            </ToggleSwitch>
                        </SettingControl>
                    </SettingItem>

                    {/* Animations */}
                    <SettingItem>
                        <SettingLabel>Enable Animations</SettingLabel>
                        <SettingControl>
                            <ToggleSwitch>
                                <input
                                    type="checkbox"
                                    checked={settings.animations}
                                    onChange={(e) => updateSetting('animations', e.target.checked)}
                                />
                                <ToggleSlider />
                            </ToggleSwitch>
                        </SettingControl>
                    </SettingItem>

                    {/* Reduced Motion */}
                    <SettingItem>
                        <SettingLabel>Reduce Motion (Accessibility)</SettingLabel>
                        <SettingControl>
                            <ToggleSwitch>
                                <input
                                    type="checkbox"
                                    checked={settings.reducedMotion}
                                    onChange={(e) =>
                                        updateSetting('reducedMotion', e.target.checked)
                                    }
                                />
                                <ToggleSlider />
                            </ToggleSwitch>
                        </SettingControl>
                    </SettingItem>

                    {/* High Contrast */}
                    <SettingItem>
                        <SettingLabel>High Contrast Mode</SettingLabel>
                        <SettingControl>
                            <ToggleSwitch>
                                <input
                                    type="checkbox"
                                    checked={settings.highContrast}
                                    onChange={(e) =>
                                        updateSetting('highContrast', e.target.checked)
                                    }
                                />
                                <ToggleSlider />
                            </ToggleSwitch>
                        </SettingControl>
                    </SettingItem>

                    {/* Compact Mode */}
                    <SettingItem>
                        <SettingLabel>Compact Display Mode</SettingLabel>
                        <SettingControl>
                            <ToggleSwitch>
                                <input
                                    type="checkbox"
                                    checked={settings.compactMode}
                                    onChange={(e) => updateSetting('compactMode', e.target.checked)}
                                />
                                <ToggleSlider />
                            </ToggleSwitch>
                        </SettingControl>
                    </SettingItem>
                </SettingGroup>
            </SectionContent>
        </SettingsSection>
    );

    const renderNotificationSection = () => (
        <SettingsSection key="notifications">
            <SectionHeader darkMode={localTheme === 'dark'}>
                <SectionTitle data-icon="🔔">Notifications</SectionTitle>
            </SectionHeader>
            <SectionContent>
                <NotificationSettings>
                    <NotificationItem>
                        <NotificationIcon>📧</NotificationIcon>
                        <NotificationContent>
                            <h4>Email Notifications</h4>
                            <p>Receive alerts and updates via email</p>
                        </NotificationContent>
                        <NotificationToggle>
                            <ToggleSwitch>
                                <input
                                    type="checkbox"
                                    checked={settings.emailNotifications}
                                    onChange={(e) =>
                                        updateSetting('emailNotifications', e.target.checked)
                                    }
                                />
                                <ToggleSlider />
                            </ToggleSwitch>
                        </NotificationToggle>
                    </NotificationItem>

                    <NotificationItem>
                        <NotificationIcon>🖥️</NotificationIcon>
                        <NotificationContent>
                            <h4>Desktop Notifications</h4>
                            <p>Show browser notifications for critical alerts</p>
                        </NotificationContent>
                        <NotificationToggle>
                            <ToggleSwitch>
                                <input
                                    type="checkbox"
                                    checked={settings.desktopNotifications}
                                    onChange={(e) =>
                                        updateSetting('desktopNotifications', e.target.checked)
                                    }
                                />
                                <ToggleSlider />
                            </ToggleSwitch>
                        </NotificationToggle>
                    </NotificationItem>

                    <NotificationItem>
                        <NotificationIcon>📱</NotificationIcon>
                        <NotificationContent>
                            <h4>SMS Notifications</h4>
                            <p>Critical alerts sent to your mobile device</p>
                        </NotificationContent>
                        <NotificationToggle>
                            <ToggleSwitch>
                                <input
                                    type="checkbox"
                                    checked={settings.smsNotifications}
                                    onChange={(e) =>
                                        updateSetting('smsNotifications', e.target.checked)
                                    }
                                />
                                <ToggleSlider />
                            </ToggleSwitch>
                        </NotificationToggle>
                    </NotificationItem>

                    <NotificationItem>
                        <NotificationIcon>🔊</NotificationIcon>
                        <NotificationContent>
                            <h4>Alert Sounds</h4>
                            <p>Play audio alerts for critical notifications</p>
                        </NotificationContent>
                        <NotificationToggle>
                            <ToggleSwitch>
                                <input
                                    type="checkbox"
                                    checked={settings.alertSounds}
                                    onChange={(e) => updateSetting('alertSounds', e.target.checked)}
                                />
                                <ToggleSlider />
                            </ToggleSwitch>
                        </NotificationToggle>
                    </NotificationItem>

                    {/* Alert Frequency - only for management+ */}
                    {(userRole?.level === 'management' ||
                        userRole?.level === 'executive' ||
                        isSystemAdmin()) && (
                        <SettingItem>
                            <SettingLabel>Alert Frequency</SettingLabel>
                            <SettingControl>
                                <SelectInput
                                    value={settings.alertFrequency}
                                    onChange={(e) =>
                                        updateSetting('alertFrequency', e.target.value)
                                    }
                                >
                                    <option value="immediate">Immediate</option>
                                    <option value="every-5min">Every 5 Minutes</option>
                                    <option value="every-15min">Every 15 Minutes</option>
                                    <option value="hourly">Hourly</option>
                                </SelectInput>
                            </SettingControl>
                        </SettingItem>
                    )}
                </NotificationSettings>
            </SectionContent>
        </SettingsSection>
    );

    const renderSystemSection = () => (
        <SettingsSection key="system">
            <SectionHeader darkMode={localTheme === 'dark'}>
                <SectionTitle data-icon="⚙️">System Settings</SectionTitle>
            </SectionHeader>
            <SectionContent>
                <SettingGroup>
                    <SettingItem>
                        <SettingLabel>Auto Refresh Data</SettingLabel>
                        <SettingControl>
                            <ToggleSwitch>
                                <input
                                    type="checkbox"
                                    checked={settings.autoRefresh}
                                    onChange={(e) => updateSetting('autoRefresh', e.target.checked)}
                                />
                                <ToggleSlider />
                            </ToggleSwitch>
                        </SettingControl>
                    </SettingItem>

                    <SettingItem>
                        <SettingLabel>Refresh Interval (seconds)</SettingLabel>
                        <SettingControl>
                            <SelectInput
                                value={settings.refreshInterval}
                                onChange={(e) =>
                                    updateSetting('refreshInterval', parseInt(e.target.value))
                                }
                                disabled={!settings.autoRefresh}
                            >
                                <option value={15}>15 seconds</option>
                                <option value={30}>30 seconds</option>
                                <option value={60}>1 minute</option>
                                <option value={300}>5 minutes</option>
                            </SelectInput>
                        </SettingControl>
                    </SettingItem>

                    <SettingItem>
                        <SettingLabel>Show Advanced Features</SettingLabel>
                        <SettingControl>
                            <ToggleSwitch>
                                <input
                                    type="checkbox"
                                    checked={settings.showAdvanced}
                                    onChange={(e) =>
                                        updateSetting('showAdvanced', e.target.checked)
                                    }
                                />
                                <ToggleSlider />
                            </ToggleSwitch>
                        </SettingControl>
                    </SettingItem>
                </SettingGroup>

                <div style={{ marginTop: '24px' }}>
                    <ActionButton
                        primary
                        onClick={() => {
                            if (canModifySystemSettings()) {
                                alert('Settings saved successfully!');
                                logUserAction('settings_save', 'all');
                            } else {
                                alert('You do not have permission to save system settings.');
                            }
                        }}
                    >
                        💾 Save Settings
                    </ActionButton>
                </div>
            </SectionContent>
        </SettingsSection>
    );

    const renderStatusSection = () => (
        <SettingsSection key="status" span={2}>
            <SectionHeader darkMode={localTheme === 'dark'}>
                <SectionTitle data-icon="📊">System Status</SectionTitle>
            </SectionHeader>
            <SectionContent>
                <SystemStatus>
                    <StatusItem status="excellent">
                        <StatusIcon>🟢</StatusIcon>
                        <StatusLabel>NeoCare360 App</StatusLabel>
                        <StatusValue>
                            <div className="status-indicator">
                                <span>Online</span>
                                <div className="status-dot active"></div>
                            </div>
                        </StatusValue>
                    </StatusItem>

                    <StatusItem status="excellent">
                        <StatusIcon>🔗</StatusIcon>
                        <StatusLabel>Splunk Connection</StatusLabel>
                        <StatusValue>
                            <div className="status-indicator">
                                <span>Connected</span>
                                <div className="status-dot active"></div>
                            </div>
                        </StatusValue>
                    </StatusItem>

                    <StatusItem status="excellent">
                        <StatusIcon>👤</StatusIcon>
                        <StatusLabel>User Authentication</StatusLabel>
                        <StatusValue>
                            <div className="status-indicator">
                                <span>Authenticated</span>
                                <div className="status-dot active"></div>
                            </div>
                        </StatusValue>
                    </StatusItem>

                    <StatusItem status="excellent">
                        <StatusIcon>🔐</StatusIcon>
                        <StatusLabel>Role Authorization</StatusLabel>
                        <StatusValue>
                            <div className="status-indicator">
                                <span>Authorized</span>
                                <div className="status-dot active"></div>
                            </div>
                        </StatusValue>
                    </StatusItem>

                    <StatusItem status="excellent">
                        <StatusIcon>📡</StatusIcon>
                        <StatusLabel>Data Refresh</StatusLabel>
                        <StatusValue>
                            <div className="status-indicator">
                                <span>{settings.autoRefresh ? 'Active' : 'Paused'}</span>
                                <div
                                    className={`status-dot ${
                                        settings.autoRefresh ? 'active' : 'inactive'
                                    }`}
                                ></div>
                            </div>
                        </StatusValue>
                    </StatusItem>

                    <StatusItem status="excellent">
                        <StatusIcon>🎨</StatusIcon>
                        <StatusLabel>Theme</StatusLabel>
                        <StatusValue>
                            <span>{localTheme === 'dark' ? '🌙 Dark' : '☀️ Light'}</span>
                        </StatusValue>
                    </StatusItem>
                </SystemStatus>

                {/* Role Information */}
                <div style={{ marginTop: '24px' }}>
                    <PreferenceCard>
                        <PreferenceIcon>🔑</PreferenceIcon>
                        <PreferenceContent>
                            <PreferenceTitle>Current Role Permissions</PreferenceTitle>
                            <PreferenceDescription>
                                <strong>Role:</strong> {userRole?.name}
                                <br />
                                <strong>Access Level:</strong> {userRole?.level}
                                <br />
                                <strong>Can Modify System Settings:</strong>{' '}
                                {canModifySystemSettings() ? '✅ Yes' : '❌ No'}
                                <br />
                                <strong>Can Access Security:</strong>{' '}
                                {canAccessSecuritySettings() ? '✅ Yes' : '❌ No'}
                                <br />
                                <strong>Can Manage Users:</strong>{' '}
                                {canManageUsers() ? '✅ Yes' : '❌ No'}
                            </PreferenceDescription>
                        </PreferenceContent>
                    </PreferenceCard>
                </div>
            </SectionContent>
        </SettingsSection>
    );

    const renderSecuritySection = () => (
        <SettingsSection key="security">
            <SectionHeader darkMode={localTheme === 'dark'}>
                <SectionTitle data-icon="🔐">Security & Access</SectionTitle>
            </SectionHeader>
            <SectionContent>
                <SecurityCard>
                    <SecurityItem>
                        <SecurityIcon>🔑</SecurityIcon>
                        <SecurityDetails>
                            <h4>Role-Based Access Control</h4>
                            <p>Your role: {userRole?.name}</p>
                            <p>Access level: {userRole?.level}</p>
                            <p>Splunk roles: {user.splunkRoles?.join(', ')}</p>
                        </SecurityDetails>
                    </SecurityItem>

                    <SecurityItem>
                        <SecurityIcon>🛡️</SecurityIcon>
                        <SecurityDetails>
                            <h4>Security Status</h4>
                            <p>Account security: ✅ Secure</p>
                            <p>
                                Last login:{' '}
                                {new Date(user.lastLogin || Date.now()).toLocaleString()}
                            </p>
                            <p>Session status: 🟢 Active</p>
                        </SecurityDetails>
                    </SecurityItem>

                    {canManageUsers() && (
                        <SecurityItem>
                            <SecurityIcon>👥</SecurityIcon>
                            <SecurityDetails>
                                <h4>User Management</h4>
                                <p>Manage NeoCare360 user roles and permissions</p>
                                <ActionButton
                                    small
                                    primary
                                    onClick={() => alert('User management panel would open here')}
                                >
                                    Manage Users
                                </ActionButton>
                            </SecurityDetails>
                        </SecurityItem>
                    )}

                    {isSystemAdmin() && (
                        <SecurityItem>
                            <SecurityIcon>🔧</SecurityIcon>
                            <SecurityDetails>
                                <h4>System Administration</h4>
                                <p>Access advanced system configuration and logs</p>
                                <ActionButton
                                    small
                                    onClick={() => alert('System admin panel would open here')}
                                >
                                    Admin Panel
                                </ActionButton>
                            </SecurityDetails>
                        </SecurityItem>
                    )}
                </SecurityCard>
            </SectionContent>
        </SettingsSection>
    );

    return (
        <SettingsContainer darkMode={localTheme === 'dark'}>
            <DashboardTitle>⚙️ Settings - {userRole?.name}</DashboardTitle>

            {/* Role-based Access Summary */}
            <div style={{ marginBottom: '24px' }}>
                <PreferenceCard>
                    <PreferenceIcon>{userRole?.icon || '👤'}</PreferenceIcon>
                    <PreferenceContent>
                        <PreferenceTitle>Your Access Level: {userRole?.name}</PreferenceTitle>
                        <PreferenceDescription>
                            <strong>Level:</strong> {userRole?.level} |
                            <strong> Splunk Roles:</strong> {user.splunkRoles?.join(', ')} |
                            <strong> Available Sections:</strong> {visibleSections.length} of 6
                            <br />
                            {userRole?.description}
                        </PreferenceDescription>
                    </PreferenceContent>
                </PreferenceCard>
            </div>

            <SettingsGrid>
                {visibleSections.includes('personal') && renderPersonalSection()}
                {visibleSections.includes('appearance') && renderAppearanceSection()}
                {visibleSections.includes('notifications') && renderNotificationSection()}
                {visibleSections.includes('system') && renderSystemSection()}
                {visibleSections.includes('status') && renderStatusSection()}
                {visibleSections.includes('security') && renderSecuritySection()}
            </SettingsGrid>
        </SettingsContainer>
    );
};

Settings.propTypes = propTypes;

export default Settings;
