// Comprehensive Kenya Healthcare System Data
// Based on real counties, sub-counties, and major hospitals in Kenya

export const COUNTRY_DATA = {
    name: 'Kenya',
    counties: [
        {
            id: 'nairobi',
            name: 'Nairobi County',
            population: 4397073,
            area: '696 km²',
            subcounties: [
                {
                    id: 'westlands',
                    name: 'Westlands',
                    population: 247728,
                    hospitals: [
                        {
                            id: 'aga-khan-hospital',
                            name: 'Aga Khan University Hospital',
                            type: 'Private',
                            level: 'Level 6',
                            beds: 254,
                            specialties: ['Cardiology', 'Oncology', 'Neurology', 'Pediatrics'],
                            coordinates: { lat: -1.2697, lng: 36.8077 },
                        },
                        {
                            id: 'nairobi-hospital',
                            name: 'The Nairobi Hospital',
                            type: 'Private',
                            level: 'Level 6',
                            beds: 350,
                            specialties: ['Surgery', 'Internal Medicine', 'Obstetrics', 'ICU'],
                            coordinates: { lat: -1.2924, lng: 36.8074 },
                        },
                    ],
                },
                {
                    id: 'starehe',
                    name: 'Starehe',
                    population: 209227,
                    hospitals: [
                        {
                            id: 'kenyatta-national-hospital',
                            name: 'Kenyatta National Hospital',
                            type: 'Public',
                            level: 'Level 6',
                            beds: 1800,
                            specialties: [
                                'All Specialties',
                                'Emergency',
                                'Trauma',
                                'Teaching Hospital',
                            ],
                            coordinates: { lat: -1.3018, lng: 36.8074 },
                        },
                        {
                            id: 'mbagathi-hospital',
                            name: 'Mbagathi District Hospital',
                            type: 'Public',
                            level: 'Level 4',
                            beds: 200,
                            specialties: ['General Medicine', 'Surgery', 'Pediatrics', 'Maternity'],
                            coordinates: { lat: -1.3098, lng: 36.7821 },
                        },
                    ],
                },
                {
                    id: 'kasarani',
                    name: 'Kasarani',
                    population: 780656,
                    hospitals: [
                        {
                            id: 'uhai-neema-hospital',
                            name: 'Uhai Neema Hospital',
                            type: 'Private',
                            level: 'Level 4',
                            beds: 120,
                            specialties: ['General Medicine', 'Surgery', 'Maternity', 'Pediatrics'],
                            coordinates: { lat: -1.2195, lng: 36.8968 },
                        },
                    ],
                },
            ],
        },
        {
            id: 'mombasa',
            name: 'Mombasa County',
            population: 1208333,
            area: '294.7 km²',
            subcounties: [
                {
                    id: 'mvita',
                    name: 'Mvita',
                    population: 138315,
                    hospitals: [
                        {
                            id: 'coast-general-hospital',
                            name: 'Coast General Teaching & Referral Hospital',
                            type: 'Public',
                            level: 'Level 6',
                            beds: 650,
                            specialties: ['All Specialties', 'Emergency', 'Oncology', 'Cardiology'],
                            coordinates: { lat: -4.0619, lng: 39.6682 },
                        },
                        {
                            id: 'aga-khan-mombasa',
                            name: 'Aga Khan Hospital Mombasa',
                            type: 'Private',
                            level: 'Level 5',
                            beds: 120,
                            specialties: [
                                'Internal Medicine',
                                'Surgery',
                                'Pediatrics',
                                'Maternity',
                            ],
                            coordinates: { lat: -4.0435, lng: 39.6682 },
                        },
                    ],
                },
                {
                    id: 'nyali',
                    name: 'Nyali',
                    population: 227842,
                    hospitals: [
                        {
                            id: 'pandya-memorial-hospital',
                            name: 'Pandya Memorial Hospital',
                            type: 'Private',
                            level: 'Level 4',
                            beds: 85,
                            specialties: ['General Medicine', 'Surgery', 'Obstetrics', 'Emergency'],
                            coordinates: { lat: -4.0126, lng: 39.7056 },
                        },
                    ],
                },
            ],
        },
        {
            id: 'kisumu',
            name: 'Kisumu County',
            population: 1155574,
            area: '2085.9 km²',
            subcounties: [
                {
                    id: 'kisumu-east',
                    name: 'Kisumu East',
                    population: 372409,
                    hospitals: [
                        {
                            id: 'jaramogi-oginga-odinga',
                            name: 'Jaramogi Oginga Odinga Teaching & Referral Hospital',
                            type: 'Public',
                            level: 'Level 6',
                            beds: 441,
                            specialties: ['All Specialties', 'Research', 'Teaching', 'Emergency'],
                            coordinates: { lat: -0.0917, lng: 34.768 },
                        },
                        {
                            id: 'aga-khan-kisumu',
                            name: 'Aga Khan Hospital Kisumu',
                            type: 'Private',
                            level: 'Level 4',
                            beds: 62,
                            specialties: ['General Medicine', 'Surgery', 'Pediatrics', 'Maternity'],
                            coordinates: { lat: -0.0917, lng: 34.768 },
                        },
                    ],
                },
                {
                    id: 'kisumu-west',
                    name: 'Kisumu West',
                    population: 194390,
                    hospitals: [
                        {
                            id: 'new-nyanza-hospital',
                            name: 'New Nyanza Provincial General Hospital',
                            type: 'Public',
                            level: 'Level 5',
                            beds: 300,
                            specialties: [
                                'General Medicine',
                                'Surgery',
                                'Pediatrics',
                                'Obstetrics',
                            ],
                            coordinates: { lat: -0.1002, lng: 34.7617 },
                        },
                    ],
                },
            ],
        },
        {
            id: 'nakuru',
            name: 'Nakuru County',
            population: 2162202,
            area: '7496.5 km²',
            subcounties: [
                {
                    id: 'nakuru-town-east',
                    name: 'Nakuru Town East',
                    population: 163927,
                    hospitals: [
                        {
                            id: 'nakuru-level-5-hospital',
                            name: 'Nakuru Level 5 Hospital',
                            type: 'Public',
                            level: 'Level 5',
                            beds: 320,
                            specialties: ['General Medicine', 'Surgery', 'Pediatrics', 'Emergency'],
                            coordinates: { lat: -0.3031, lng: 36.08 },
                        },
                        {
                            id: 'war-memorial-hospital',
                            name: 'War Memorial Hospital',
                            type: 'Private',
                            level: 'Level 4',
                            beds: 150,
                            specialties: ['General Medicine', 'Surgery', 'Maternity', 'Pediatrics'],
                            coordinates: { lat: -0.3031, lng: 36.08 },
                        },
                    ],
                },
                {
                    id: 'nakuru-town-west',
                    name: 'Nakuru Town West',
                    population: 254845,
                    hospitals: [
                        {
                            id: 'rift-valley-hospital',
                            name: 'Rift Valley Provincial General Hospital',
                            type: 'Public',
                            level: 'Level 5',
                            beds: 280,
                            specialties: ['General Medicine', 'Surgery', 'Obstetrics', 'Emergency'],
                            coordinates: { lat: -0.2827, lng: 36.0664 },
                        },
                    ],
                },
            ],
        },
        {
            id: 'uasin-gishu',
            name: 'Uasin Gishu County',
            population: 1163186,
            area: '3345.2 km²',
            subcounties: [
                {
                    id: 'eldoret-east',
                    name: 'Eldoret East',
                    population: 289380,
                    hospitals: [
                        {
                            id: 'moi-teaching-hospital',
                            name: 'Moi Teaching & Referral Hospital',
                            type: 'Public',
                            level: 'Level 6',
                            beds: 900,
                            specialties: ['All Specialties', 'Teaching', 'Research', 'Trauma'],
                            coordinates: { lat: 0.5143, lng: 35.2699 },
                        },
                        {
                            id: 'eldoret-hospital',
                            name: 'Eldoret Hospital',
                            type: 'Private',
                            level: 'Level 4',
                            beds: 200,
                            specialties: ['General Medicine', 'Surgery', 'Pediatrics', 'Maternity'],
                            coordinates: { lat: 0.5143, lng: 35.2699 },
                        },
                    ],
                },
                {
                    id: 'eldoret-west',
                    name: 'Eldoret West',
                    population: 194690,
                    hospitals: [
                        {
                            id: 'mediheal-hospital',
                            name: 'Mediheal Hospital',
                            type: 'Private',
                            level: 'Level 4',
                            beds: 120,
                            specialties: ['General Medicine', 'Surgery', 'ICU', 'Emergency'],
                            coordinates: { lat: 0.5201, lng: 35.2817 },
                        },
                    ],
                },
            ],
        },
        {
            id: 'kiambu',
            name: 'Kiambu County',
            population: 2417735,
            area: '2449.2 km²',
            subcounties: [
                {
                    id: 'thika-town',
                    name: 'Thika Town',
                    population: 279429,
                    hospitals: [
                        {
                            id: 'thika-level-5-hospital',
                            name: 'Thika Level 5 Hospital',
                            type: 'Public',
                            level: 'Level 5',
                            beds: 350,
                            specialties: ['General Medicine', 'Surgery', 'Pediatrics', 'Maternity'],
                            coordinates: { lat: -1.0332, lng: 37.0692 },
                        },
                    ],
                },
                {
                    id: 'kikuyu',
                    name: 'Kikuyu',
                    population: 261359,
                    hospitals: [
                        {
                            id: 'kikuyu-hospital',
                            name: 'Kikuyu Hospital',
                            type: 'Private',
                            level: 'Level 4',
                            beds: 120,
                            specialties: ['General Medicine', 'Surgery', 'Maternity', 'Pediatrics'],
                            coordinates: { lat: -1.2456, lng: 36.6636 },
                        },
                    ],
                },
            ],
        },
    ],
};

// Helper functions for filtering and data manipulation
export const getCounties = () => {
    return COUNTRY_DATA.counties.map((county) => ({
        id: county.id,
        name: county.name,
        population: county.population,
        area: county.area,
    }));
};

export const getSubcountiesByCounty = (countyId) => {
    const county = COUNTRY_DATA.counties.find((c) => c.id === countyId);
    return county
        ? county.subcounties.map((sub) => ({
              id: sub.id,
              name: sub.name,
              population: sub.population,
              countyId: countyId,
          }))
        : [];
};

export const getHospitalsBySubcounty = (countyId, subcountyId) => {
    const county = COUNTRY_DATA.counties.find((c) => c.id === countyId);
    if (!county) return [];

    const subcounty = county.subcounties.find((s) => s.id === subcountyId);
    return subcounty
        ? subcounty.hospitals.map((hospital) => ({
              ...hospital,
              countyId: countyId,
              subcountyId: subcountyId,
          }))
        : [];
};

export const getAllHospitalsByCounty = (countyId) => {
    const county = COUNTRY_DATA.counties.find((c) => c.id === countyId);
    if (!county) return [];

    let allHospitals = [];
    county.subcounties.forEach((subcounty) => {
        const hospitals = subcounty.hospitals.map((hospital) => ({
            ...hospital,
            countyId: countyId,
            subcountyId: subcounty.id,
            subcountyName: subcounty.name,
        }));
        allHospitals = allHospitals.concat(hospitals);
    });
    return allHospitals;
};

export const getAllHospitals = () => {
    let allHospitals = [];
    COUNTRY_DATA.counties.forEach((county) => {
        county.subcounties.forEach((subcounty) => {
            const hospitals = subcounty.hospitals.map((hospital) => ({
                ...hospital,
                countyId: county.id,
                countyName: county.name,
                subcountyId: subcounty.id,
                subcountyName: subcounty.name,
            }));
            allHospitals = allHospitals.concat(hospitals);
        });
    });
    return allHospitals;
};

export const getHospitalById = (hospitalId) => {
    const allHospitals = getAllHospitals();
    return allHospitals.find((h) => h.id === hospitalId);
};

export const getCountyById = (countyId) => {
    return COUNTRY_DATA.counties.find((c) => c.id === countyId);
};

export const getSubcountyById = (countyId, subcountyId) => {
    const county = getCountyById(countyId);
    return county ? county.subcounties.find((s) => s.id === subcountyId) : null;
};

// Generate realistic healthcare metrics based on hospital data
export const generateHospitalMetrics = (hospital) => {
    const baseOccupancy = Math.random() * 0.3 + 0.6; // 60-90% occupancy
    const currentOccupancy = Math.floor(hospital.beds * baseOccupancy);

    return {
        hospitalId: hospital.id,
        hospitalName: hospital.name,
        totalBeds: hospital.beds,
        occupiedBeds: currentOccupancy,
        availableBeds: hospital.beds - currentOccupancy,
        occupancyRate: Math.round((currentOccupancy / hospital.beds) * 100),
        icuBeds: Math.floor(hospital.beds * 0.1), // 10% ICU beds
        emergencyVisits24h: Math.floor(Math.random() * 50) + 20,
        admissions24h: Math.floor(Math.random() * 30) + 10,
        discharges24h: Math.floor(Math.random() * 25) + 8,
        staffOnDuty: Math.floor(hospital.beds * 0.8), // Staff to bed ratio
        criticalPatients: Math.floor(Math.random() * 10) + 2,
        avgWaitTime: Math.floor(Math.random() * 60) + 15, // 15-75 minutes
        patientSatisfaction: Math.floor(Math.random() * 20) + 80, // 80-100%
    };
};

export const generateCountyAggregatedMetrics = (countyId) => {
    const hospitals = getAllHospitalsByCounty(countyId);
    const metrics = hospitals.map(generateHospitalMetrics);

    return {
        countyId,
        totalHospitals: hospitals.length,
        totalBeds: metrics.reduce((sum, m) => sum + m.totalBeds, 0),
        totalOccupiedBeds: metrics.reduce((sum, m) => sum + m.occupiedBeds, 0),
        avgOccupancyRate: Math.round(
            metrics.reduce((sum, m) => sum + m.occupancyRate, 0) / metrics.length
        ),
        totalEmergencyVisits24h: metrics.reduce((sum, m) => sum + m.emergencyVisits24h, 0),
        totalAdmissions24h: metrics.reduce((sum, m) => sum + m.admissions24h, 0),
        totalDischarges24h: metrics.reduce((sum, m) => sum + m.discharges24h, 0),
        totalStaffOnDuty: metrics.reduce((sum, m) => sum + m.staffOnDuty, 0),
        totalCriticalPatients: metrics.reduce((sum, m) => sum + m.criticalPatients, 0),
        avgWaitTime: Math.round(
            metrics.reduce((sum, m) => sum + m.avgWaitTime, 0) / metrics.length
        ),
        avgPatientSatisfaction: Math.round(
            metrics.reduce((sum, m) => sum + m.patientSatisfaction, 0) / metrics.length
        ),
        hospitalMetrics: metrics,
    };
};
