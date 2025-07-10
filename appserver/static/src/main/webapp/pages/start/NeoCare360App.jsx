import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ThemeProvider } from "styled-components";
import Overview from "../../../../components/overview/Overview";
import PatientMonitoring from "../../../../components/patient-monitoring/PatientMonitoring";
import IcuCommandCenter from "../../../../components/icu-command-center/IcuCommandCenter";
import ClinicalKpIs from "../../../../components/clinical-kpis/ClinicalKpIs";
import ResourceManagement from "../../../../components/resource-management/ResourceManagement";
import PatientThroughput from "../../../../components/patient-throughput/PatientThroughput";
import Alerts from "../../../../components/alerts/Alerts";
import Compliance from "../../../../components/compliance/Compliance";
import Reports from "../../../../components/reports/Reports";
import Settings from "../../../../components/settings/Settings";

import {
  ThemeProvider as NeoCareThemeProvider,
  useTheme,
} from "../../../../contexts/ThemeContext";
import { SplunkProvider, useSplunk } from "../../../../contexts/SplunkContext";
import SecurityBarrier from "../../../../components/SecurityBarrier";

import {
  getCounties,
  getSubcountiesByCounty,
  getHospitalsBySubcounty,
  getAllHospitalsByCounty,
  getAllHospitals,
  generateCountyAggregatedMetrics,
  generateHospitalMetrics,
} from "../../../../data/kenyaHealthcareData";

// Import production API service for real data
import { productionApi } from "../../../../services/ProductionApiService";

import {
  AppContainer,
  Header,
  HeaderTitle,
  HeaderActions,
  MainContent,
  Sidebar,
  SidebarToggle,
  SidebarHeader,
  SidebarTitle,
  NavigationList,
  NavigationItem,
  NavigationIcon,
  NavigationLabel,
  ContentArea,
  FilterBar,
  FilterSelect,
  ThemeToggle,
} from "./StartStyles";

const allNavigationItems = [
  { id: "overview", label: "Dashboard Overview", icon: "🏠" },
  { id: "patient-monitoring", label: "Patient Monitoring", icon: "🛏️" },
  { id: "icu-command-center", label: "ICU Command Center", icon: "🚨" },
  { id: "clinical-kpis", label: "Clinical KPIs", icon: "📊" },
  { id: "resource-management", label: "Resource Management", icon: "📦" },
  { id: "patient-throughput", label: "Patient Throughput", icon: "🚑" },
  { id: "alerts", label: "Alerts & Anomalies", icon: "🔔" },
  { id: "compliance", label: "Compliance & Audit", icon: "🔍" },
  { id: "reports", label: "Reports & Analytics", icon: "📁" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

const NeoCare360AppContent = ({ initialConfig = {} }) => {
  const { darkMode, toggleTheme, settings, updateSetting } = useTheme();
  const {
    user,
    userRole,
    hasPermission,
    getAccessibleComponents,
    getDefaultView,
    logUserAction,
    isLoading,
    hasNeoCareAccess,
    accessDeniedReason,
    getAllowedScopes,
    hasScope,
    getHighestScope,
  } = useSplunk();

  // Core state management - use role-based default view
  const [activeSection, setActiveSection] = useState(() => {
    return (
      initialConfig.initialView ||
      getDefaultView() ||
      settings.defaultView ||
      "overview"
    );
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Hierarchical filter state
  const [selectedCounty, setSelectedCounty] = useState("all");
  const [selectedSubcounty, setSelectedSubcounty] = useState("all");
  const [selectedHospital, setSelectedHospital] = useState("all");
  const [dateRange, setDateRange] = useState("7d");

  // Auto-refresh state from settings
  const autoRefresh = settings.autoRefresh;
  const [lastUpdateTime, setLastUpdateTime] = useState(() =>
    new Date().toLocaleTimeString()
  );

  // Real API data state
  const [apiData, setApiData] = useState({
    overview: null,
    patientMonitoring: null,
    icuCommandCenter: null,
    clinicalKpis: null,
    resourceManagement: null,
    alerts: null,
    loading: false,
    error: null,
  });

  // ICU-specific state removed - ICU component manages its own data

  // Fetch real API data based on active section
  const fetchApiData = useCallback(
    async (section) => {
      if (!section) return;

      setApiData((prev) => ({ ...prev, loading: true, error: null }));

      try {
        let data = null;
        const filters = {
          hospital_id: selectedHospital !== "all" ? selectedHospital : null,
          county_id: selectedCounty !== "all" ? selectedCounty : null,
          timeframe: dateRange,
        };

        switch (section) {
          case "overview":
            data = await productionApi.getOverviewDashboard(filters);
            setApiData((prev) => ({ ...prev, overview: data, loading: false }));
            break;
          case "patient-monitoring":
            data = await productionApi.getPatientMonitoring(filters);
            setApiData((prev) => ({
              ...prev,
              patientMonitoring: data,
              loading: false,
            }));
            break;
          case "icu-command-center":
            data = await productionApi.getICUCommandCenter(filters);
            setApiData((prev) => ({
              ...prev,
              icuCommandCenter: data,
              loading: false,
            }));
            break;
          case "clinical-kpis":
            data = await productionApi.getClinicalKPIs(filters);
            setApiData((prev) => ({
              ...prev,
              clinicalKpis: data,
              loading: false,
            }));
            break;
          case "resource-management":
            const [beds, staff, supplies] = await Promise.all([
              productionApi.getBedResources(filters),
              productionApi.getStaffResources(filters),
              productionApi.getSupplyResources(filters),
            ]);
            setApiData((prev) => ({
              ...prev,
              resourceManagement: { beds, staff, supplies },
              loading: false,
            }));
            break;
          case "alerts":
            data = await productionApi.getCriticalAlerts(filters);
            setApiData((prev) => ({ ...prev, alerts: data, loading: false }));
            break;
          default:
            setApiData((prev) => ({ ...prev, loading: false }));
            break;
        }
      } catch (error) {
        console.error(`Error fetching ${section} data:`, error);
        setApiData((prev) => ({
          ...prev,
          loading: false,
          error: `Failed to load ${section} data: ${error.message}`,
        }));
      }
    },
    [selectedHospital, selectedCounty, dateRange]
  );

  // Fetch data when active section or filters change
  useEffect(() => {
    if (settings.useRealData) {
      fetchApiData(activeSection);
    }
  }, [activeSection, fetchApiData, settings.useRealData]);

  // Filter navigation items based on user permissions
  const navigationItems = useMemo(() => {
    if (!userRole) return [];
    return allNavigationItems.filter((item) => hasPermission(item.id));
  }, [userRole, hasPermission]);

  // Data filtering helpers
  const counties = useMemo(() => getCounties(), []);

  const subcounties = useMemo(() => {
    if (selectedCounty === "all") return [];
    return getSubcountiesByCounty(selectedCounty);
  }, [selectedCounty]);

  const hospitals = useMemo(() => {
    if (selectedCounty === "all") {
      return getAllHospitals();
    } else if (selectedSubcounty === "all") {
      return getAllHospitalsByCounty(selectedCounty);
    } else {
      return getHospitalsBySubcounty(selectedCounty, selectedSubcounty);
    }
  }, [selectedCounty, selectedSubcounty]);

  // Healthcare metrics based on current filters
  const healthcareMetrics = useMemo(() => {
    if (selectedHospital !== "all") {
      // Single hospital metrics
      const hospital = hospitals.find((h) => h.id === selectedHospital);
      return hospital ? generateHospitalMetrics(hospital) : null;
    } else if (selectedCounty !== "all") {
      // County aggregated metrics
      return generateCountyAggregatedMetrics(selectedCounty);
    } else {
      // All Kenya metrics (aggregated from all counties)
      const allCounties = counties.map((county) =>
        generateCountyAggregatedMetrics(county.id)
      );
      return {
        scope: "national",
        totalHospitals: allCounties.reduce(
          (sum, c) => sum + c.totalHospitals,
          0
        ),
        totalBeds: allCounties.reduce((sum, c) => sum + c.totalBeds, 0),
        totalOccupiedBeds: allCounties.reduce(
          (sum, c) => sum + c.totalOccupiedBeds,
          0
        ),
        avgOccupancyRate: Math.round(
          allCounties.reduce((sum, c) => sum + c.avgOccupancyRate, 0) /
            allCounties.length
        ),
        totalEmergencyVisits24h: allCounties.reduce(
          (sum, c) => sum + c.totalEmergencyVisits24h,
          0
        ),
        totalAdmissions24h: allCounties.reduce(
          (sum, c) => sum + c.totalAdmissions24h,
          0
        ),
        totalDischarges24h: allCounties.reduce(
          (sum, c) => sum + c.totalDischarges24h,
          0
        ),
        totalStaffOnDuty: allCounties.reduce(
          (sum, c) => sum + c.totalStaffOnDuty,
          0
        ),
        totalCriticalPatients: allCounties.reduce(
          (sum, c) => sum + c.totalCriticalPatients,
          0
        ),
        avgWaitTime: Math.round(
          allCounties.reduce((sum, c) => sum + c.avgWaitTime, 0) /
            allCounties.length
        ),
        avgPatientSatisfaction: Math.round(
          allCounties.reduce((sum, c) => sum + c.avgPatientSatisfaction, 0) /
            allCounties.length
        ),
        countyMetrics: allCounties,
      };
    }
  }, [
    selectedCounty,
    selectedSubcounty,
    selectedHospital,
    counties,
    hospitals,
  ]);

  // Update timestamp periodically if auto-refresh is enabled
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setLastUpdateTime(new Date().toLocaleTimeString());
    }, (settings.refreshInterval || 30) * 1000);

    return () => clearInterval(interval);
  }, [autoRefresh, settings.refreshInterval]);

  // Reset dependent filters when parent changes
  useEffect(() => {
    setSelectedSubcounty("all");
    setSelectedHospital("all");
  }, [selectedCounty]);

  useEffect(() => {
    setSelectedHospital("all");
  }, [selectedSubcounty]);

  // Memoized filter context to prevent unnecessary re-renders
  const filterContext = useMemo(
    () => ({
      // Geographic filters
      county: selectedCounty,
      subcounty: selectedSubcounty,
      hospital: selectedHospital,

      // Temporal filters
      dateRange: dateRange,

      // UI state
      darkMode: darkMode,
      autoRefresh: autoRefresh,
      lastUpdateTime: lastUpdateTime,

      // Data context
      availableCounties: counties,
      availableSubcounties: subcounties,
      availableHospitals: hospitals,
      healthcareMetrics: healthcareMetrics,

      // User and Role information for RBAC
      user: user,
      userRole: userRole,

      // Theme toggle function for Settings
      toggleTheme: toggleTheme,

      // Helper functions
      getCurrentScope: () => {
        if (selectedHospital !== "all") return "hospital";
        if (selectedSubcounty !== "all") return "subcounty";
        if (selectedCounty !== "all") return "county";
        return "national";
      },

      getCurrentLocationName: () => {
        if (selectedHospital !== "all") {
          const hospital = hospitals.find((h) => h.id === selectedHospital);
          return hospital ? hospital.name : "Unknown Hospital";
        }
        if (selectedSubcounty !== "all") {
          const subcounty = subcounties.find((s) => s.id === selectedSubcounty);
          return subcounty ? subcounty.name : "Unknown Sub-county";
        }
        if (selectedCounty !== "all") {
          const county = counties.find((c) => c.id === selectedCounty);
          return county ? county.name : "Unknown County";
        }
        return "Kenya National";
      },
    }),
    [
      selectedCounty,
      selectedSubcounty,
      selectedHospital,
      dateRange,
      darkMode,
      autoRefresh,
      lastUpdateTime,
      counties,
      subcounties,
      hospitals,
      healthcareMetrics,
      user,
      userRole,
      toggleTheme,
    ]
  );

  // Stable component props
  const componentProps = useMemo(
    () => ({
      darkMode: darkMode,
      autoRefresh: autoRefresh,
      filters: filterContext,
    }),
    [darkMode, autoRefresh, filterContext]
  );

  // Event handlers
  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  const handleNavigationClick = (sectionId) => {
    // Check permission before navigation
    if (!hasPermission(sectionId)) {
      console.warn(
        `Access denied to ${sectionId} for user role ${userRole?.name}`
      );
      return;
    }

    setActiveSection(sectionId);

    // Log user action for audit trail
    logUserAction("navigation", sectionId, {
      from: activeSection,
      location: filterContext?.getCurrentLocationName?.(),
    });

    // Google Analytics tracking (if available)
    if (typeof window.gtag === "function") {
      window.gtag("event", "navigation", {
        section: sectionId,
        user_role: userRole?.name,
        location: filterContext?.getCurrentLocationName?.(),
        timestamp: new Date().toISOString(),
      });
    }
  };

  const resetFilters = () => {
    setSelectedCounty("all");
    setSelectedSubcounty("all");
    setSelectedHospital("all");
    setDateRange("7d");
  };

  const handleCountyChange = (countyId) => {
    setSelectedCounty(countyId);
  };

  const handleSubcountyChange = (subcountyId) => {
    setSelectedSubcounty(subcountyId);
  };

  const handleHospitalChange = (hospitalId) => {
    setSelectedHospital(hospitalId);
  };

  // Data validation utility
  const validateHealthcareMetrics = (metrics) => {
    if (!metrics || typeof metrics !== "object") return false;

    const requiredFields = ["totalBeds", "occupiedBeds"];
    const hasRequiredFields = requiredFields.some(
      (field) => metrics[field] !== undefined && metrics[field] !== null
    );

    return hasRequiredFields;
  };

  // System status based on data availability and errors
  const getSystemStatus = () => {
    if (
      !validateHealthcareMetrics(healthcareMetrics) &&
      currentScope !== "national"
    ) {
      return { status: "warning", message: "Limited data available" };
    }
    if (counties.length === 0) {
      return { status: "error", message: "No location data" };
    }
    return { status: "operational", message: "All systems operational" };
  };

  const systemStatus = getSystemStatus();

  // Component renderer with error boundaries and loading states
  const renderActiveComponent = () => {
    const commonProps = {
      ...componentProps,
      name: `NeoCare360 ${activeSection}`,
    };

    // Add loading state for components that depend on healthcare metrics
    if (
      !healthcareMetrics &&
      currentScope !== "national" &&
      selectedCounty !== "all"
    ) {
      return (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            background: darkMode ? "#1a1a1a" : "#f8f9fa",
            borderRadius: "12px",
            margin: "20px",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔄</div>
          <h3 style={{ color: darkMode ? "#fff" : "#333" }}>
            Loading Healthcare Data...
          </h3>
          <p style={{ color: darkMode ? "#ccc" : "#666" }}>
            Fetching metrics for {filterContext.getCurrentLocationName()}
          </p>
        </div>
      );
    }

    try {
      // Enhanced props with API data
      const getApiDataKey = (section) => {
        const mapping = {
          overview: "overview",
          "patient-monitoring": "patientMonitoring",
          "icu-command-center": "icuCommandCenter",
          "clinical-kpis": "clinicalKpis",
          "resource-management": "resourceManagement",
          "patient-throughput": "patientThroughput",
          alerts: "alerts",
          compliance: "compliance",
          reports: "reports",
          settings: "settings",
        };
        return mapping[section] || section.replace("-", "");
      };

      const enhancedProps = {
        ...commonProps,
        apiData: apiData[getApiDataKey(activeSection)],
        loading: apiData.loading,
        error: apiData.error,
        onRefresh: () => fetchApiData(activeSection),
        useRealData: settings.useRealData || false,
      };

      switch (activeSection) {
        case "overview":
          return <Overview {...enhancedProps} name="NeoCare360 Dashboard" />;
        case "patient-monitoring":
          return (
            <PatientMonitoring
              {...enhancedProps}
              name="NeoCare360 Patient Monitoring"
            />
          );
        case "icu-command-center":
          return (
            <IcuCommandCenter
              {...enhancedProps}
              name="NeoCare360 ICU Command Center"
            />
          );
        case "clinical-kpis":
          return (
            <ClinicalKpIs {...enhancedProps} name="NeoCare360 Clinical KPIs" />
          );
        case "resource-management":
          return (
            <ResourceManagement
              {...enhancedProps}
              name="NeoCare360 Resource Management"
            />
          );
        case "patient-throughput":
          return (
            <PatientThroughput
              {...enhancedProps}
              name="NeoCare360 Patient Throughput"
            />
          );
        case "alerts":
          return (
            <Alerts {...enhancedProps} name="NeoCare360 Alerts & Anomalies" />
          );
        case "compliance":
          return (
            <Compliance
              {...enhancedProps}
              name="NeoCare360 Compliance & Audit"
            />
          );
        case "reports":
          return <Reports {...enhancedProps} name="NeoCare360 Reports" />;
        case "settings":
          return <Settings {...enhancedProps} name="NeoCare360 Settings" />;
        default:
          return <Overview {...enhancedProps} name="NeoCare360 Dashboard" />;
      }
    } catch (error) {
      console.error(`Error rendering ${activeSection} component:`, error);

      // Log error details for debugging
      if (typeof window.gtag === "function") {
        window.gtag("event", "component_error", {
          component: activeSection,
          error_message: error.message,
          location: filterContext.getCurrentLocationName(),
        });
      }

      return (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            background: darkMode ? "#2c1810" : "#fff5f5",
            border: `2px solid ${darkMode ? "#d68910" : "#e53e3e"}`,
            borderRadius: "12px",
            margin: "20px",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>⚠️</div>
          <h2
            style={{
              color: darkMode ? "#f56565" : "#e53e3e",
              marginBottom: "12px",
            }}
          >
            Component Error
          </h2>
          <p
            style={{
              color: darkMode ? "#fed7d7" : "#742a2a",
              marginBottom: "8px",
            }}
          >
            There was an error loading the <strong>{activeSection}</strong>{" "}
            section.
          </p>
          <p
            style={{
              color: darkMode ? "#cbd5e0" : "#4a5568",
              fontSize: "14px",
              marginBottom: "20px",
            }}
          >
            Error: {error.message}
          </p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => setActiveSection("overview")}
              style={{
                padding: "8px 16px",
                backgroundColor: darkMode ? "#4a5568" : "#e2e8f0",
                color: darkMode ? "#fff" : "#2d3748",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              🏠 Go to Dashboard
            </button>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: "8px 16px",
                backgroundColor: darkMode ? "#d68910" : "#3182ce",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              🔄 Refresh Page
            </button>
          </div>
        </div>
      );
    }
  };

  const theme = { darkMode };

  // Show loading state while Splunk context initializes
  if (isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <AppContainer darkMode={darkMode}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div style={{ fontSize: "64px" }}>🏥</div>
            <h2 style={{ color: "var(--text-primary)" }}>
              Initializing NeoCare360
            </h2>
            <p style={{ color: "var(--text-secondary)" }}>
              Connecting to Splunk and validating user permissions...
            </p>
            <div
              className="healthcare-loading"
              style={{
                width: "200px",
                height: "4px",
                background: "var(--bg-surface-secondary)",
                borderRadius: "2px",
                overflow: "hidden",
              }}
            ></div>
          </div>
        </AppContainer>
      </ThemeProvider>
    );
  }

  // SECURITY BARRIER: Check for valid NeoCare access before rendering app
  if (!hasNeoCareAccess || !userRole) {
    console.warn(
      "🚨 SECURITY: Blocking access due to insufficient NeoCare permissions"
    );
    try {
      return (
        <SecurityBarrier
          user={user}
          accessDeniedReason={accessDeniedReason}
          userRoles={user?.splunkRoles || []}
          darkMode={darkMode}
        />
      );
    } catch (securityError) {
      console.error("Error rendering security barrier:", securityError);
      return (
        <ThemeProvider theme={theme}>
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              background: darkMode ? "#1a1a1a" : "#fff",
              color: darkMode ? "#fff" : "#333",
            }}
          >
            <h1>🔒 Access Denied</h1>
            <p>
              You do not have the required NeoCare role to access this
              application.
            </p>
            <p>Contact your administrator to assign a proper neocare_* role.</p>
          </div>
        </ThemeProvider>
      );
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <AppContainer darkMode={darkMode}>
        <Header>
          <HeaderTitle>🏥 NeoCare360 - Clinical Intelligence Hub</HeaderTitle>
          <HeaderActions>
            {/* User Role Indicator */}
            {userRole && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "8px 12px",
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                <span>{userRole.icon}</span>
                <span>{userRole.name}</span>
              </div>
            )}
            <ThemeToggle
              onClick={() => {
                const newValue = !settings.useRealData;
                updateSetting("useRealData", newValue);
                if (newValue) {
                  fetchApiData(activeSection);
                }
              }}
              style={{
                background: settings.useRealData
                  ? "linear-gradient(135deg, #4CAF50, #45a049)"
                  : "linear-gradient(135deg, #ff9800, #f57c00)",
                marginRight: "8px",
              }}
              title={`Currently using ${
                settings.useRealData ? "real" : "demo"
              } data`}
            >
              {settings.useRealData ? "📊 Real Data" : "🎭 Demo Data"}
            </ThemeToggle>
            <ThemeToggle onClick={toggleTheme}>
              {darkMode ? "🌞" : "🌙"} {darkMode ? "Light Mode" : "Dark Mode"}
            </ThemeToggle>
          </HeaderActions>
        </Header>

        <MainContent>
          <Sidebar collapsed={sidebarCollapsed}>
            <SidebarHeader collapsed={sidebarCollapsed}>
              {!sidebarCollapsed && <SidebarTitle>🏥 NeoCare360</SidebarTitle>}
              <SidebarToggle onClick={toggleSidebar}>
                {sidebarCollapsed ? "☰" : "✕"}
              </SidebarToggle>
            </SidebarHeader>
            <NavigationList>
              {navigationItems.map((item) => (
                <NavigationItem
                  key={item.id}
                  active={activeSection === item.id}
                  onClick={() => handleNavigationClick(item.id)}
                  style={{
                    cursor: "pointer",
                    pointerEvents: "auto",
                    userSelect: "none",
                  }}
                >
                  <NavigationIcon
                    title={item.label}
                    active={activeSection === item.id}
                  >
                    {item.icon}
                  </NavigationIcon>
                  {!sidebarCollapsed && (
                    <NavigationLabel>{item.label}</NavigationLabel>
                  )}
                </NavigationItem>
              ))}
            </NavigationList>
          </Sidebar>

          <ContentArea theme={{ darkMode }}>
            <FilterBar>
              {/* County filter - only show if user has national or county scope */}
              {hasScope("national") && (
                <div className="filter-group">
                  <label>🇰🇪 County:</label>
                  <FilterSelect
                    value={selectedCounty}
                    onChange={(e) => handleCountyChange(e.target.value)}
                  >
                    <option value="all">All Counties</option>
                    {counties.map((county) => (
                      <option key={county.id} value={county.id}>
                        {county.name}
                      </option>
                    ))}
                  </FilterSelect>
                </div>
              )}

              {/* Subcounty filter - only show if user has county scope and county is selected */}
              {hasScope("county") && selectedCounty !== "all" && (
                <div className="filter-group">
                  <label>📍 Sub-county:</label>
                  <FilterSelect
                    value={selectedSubcounty}
                    onChange={(e) => handleSubcountyChange(e.target.value)}
                  >
                    <option value="all">All Sub-counties</option>
                    {subcounties.map((subcounty) => (
                      <option key={subcounty.id} value={subcounty.id}>
                        {subcounty.name}
                      </option>
                    ))}
                  </FilterSelect>
                </div>
              )}

              {/* Hospital filter - show for all roles that have hospital scope */}
              {hasScope("hospital") && (
                <div className="filter-group">
                  <label>🏥 Hospital:</label>
                  <FilterSelect
                    value={selectedHospital}
                    onChange={(e) => handleHospitalChange(e.target.value)}
                  >
                    <option value="all">
                      {hasScope("national")
                        ? "All Hospitals"
                        : "Select Hospital"}
                    </option>
                    {hospitals.map((hospital) => (
                      <option key={hospital.id} value={hospital.id}>
                        {hospital.name}
                      </option>
                    ))}
                  </FilterSelect>
                </div>
              )}

              {/* Data scope indicator */}
              <div className="filter-group scope-indicator">
                <label>📊 Data Scope:</label>
                <div
                  className="scope-badge"
                  title={`Your role "${
                    userRole?.name
                  }" allows access to: ${getAllowedScopes().join(
                    ", "
                  )} level data`}
                >
                  {getHighestScope() === "national" && "🌍 National"}
                  {getHighestScope() === "county" && "🏘️ County"}
                  {getHighestScope() === "hospital" && "🏥 Hospital"}
                </div>
              </div>

              <div className="filter-group">
                <label>📅 Date Range:</label>
                <FilterSelect
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="1h">Last Hour</option>
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                  <option value="90d">Last 90 Days</option>
                  <option value="1y">Last Year</option>
                </FilterSelect>
              </div>

              <div className="filter-actions">
                <button
                  className="filter-reset"
                  onClick={resetFilters}
                  title="Reset all filters"
                >
                  🔄 Reset
                </button>
                <button
                  className="filter-export"
                  onClick={() => {
                    const data = {
                      section: activeSection,
                      filters: filterContext,
                      metrics: healthcareMetrics,
                      timestamp: new Date().toISOString(),
                    };
                    const blob = new Blob([JSON.stringify(data, null, 2)], {
                      type: "application/json",
                    });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `neocare-data-${filterContext.getCurrentScope()}-${Date.now()}.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  title="Export current data"
                >
                  📤 Export Data
                </button>
              </div>
            </FilterBar>

            {renderActiveComponent()}
          </ContentArea>
        </MainContent>
      </AppContainer>
    </ThemeProvider>
  );
};

const NeoCare360App = ({ initialConfig = {} }) => {
  return (
    <NeoCareThemeProvider>
      <SplunkProvider>
        <NeoCare360AppContent initialConfig={initialConfig} />
      </SplunkProvider>
    </NeoCareThemeProvider>
  );
};

export default NeoCare360App;
