/**
 * solutions.js - Interactive Side-Tabbed Engineering Showcase & Live Sheet 2 Integration
 * Echaar Equipments Pvt. Ltd.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Comprehensive Solutions & Divisions Data Model
  const SOLUTIONS_CATALOG = {
    hydro: {
      id: 'hydro',
      title: 'Hydro Energy',
      category: 'DIVISIONS • CLEAN ENERGY',
      imgSrc: '../homepage%20images/Hydro%20Energy.png',
      scope: 'Echaar has been strategic alliance with renowned manufacturer across the globe for Hydro Turbine.\\n\\nIt caters variety range of products for Hydro energy with specialized service offered as per requirements of this industry.',
      components: [
        'Francis & Kaplan Turbine Components',
        'Runner Center Guides & Deflectors',
        'Cavitation-Resistant Seal Supports',
        'High-Pressure Axial Valves',
        'Stay Ring & Spiral Casing Flanges',
        'Wicket Gate Linkages & Bushings'
      ],
      materials: 'Martensitic Stainless Steel (13/4 Cr-Ni, 16/5 Cr-Ni), Forged Carbon Steel (ASTM A105 / A350 LF2), Cavitation-resistant weld overlays.',
      capacities: 'Single-piece components up to 40+ MT, vertical turning diameter up to 5,500 mm, boring travel up to 12,000 mm.',
      testing: 'Ultrasonic Testing (UT Level II/III), Magnetic Particle Inspection (MPI), Liquid Penetrant (LPT), Dynamic Balancing, Hydrostatic Proof Testing.',
      clients: ['Alstom', 'GE Renewable Energy', 'Voith Hydro']
    },
    wind: {
      id: 'wind',
      title: 'Windmill Energy',
      category: 'DIVISIONS • WIND POWER',
      imgSrc: '../homepage%20images/Windmill%20Energy.webp',
      scope: 'Actively supporting the global wind power sector since its inception, Echaar manufactures mission-critical structural and drivetrain assemblies for onshore and offshore wind turbine platforms up to 5.0+ MW. Our heavy castings and weldments endure extreme sub-zero cyclic fatigue, shock gust loads, and corrosive maritime atmospheres.',
      components: [
        'Main Bearing Housings (Multi-MW)',
        'Rotor Hub Structural Assemblies',
        'Heavy Generator Bedplates',
        'Pitch & Yaw Ring Housings',
        'Torque Arm & Gearbox Adaptors',
        'Tower Flange Ring Weldments'
      ],
      materials: 'Sub-Zero Impact Ductile Iron (EN-GJS-400-18U-LT, EN-GJS-350-22-LT), High-Tensile Structural Steel (S355NL / S355ML).',
      capacities: 'Multi-axis CNC portal milling for hub castings up to 5 MW, bearing bore concentricity within strict micron tolerances.',
      testing: 'Sub-zero Charpy V-notch impact testing (-40°C), CMM geometrical verification, 100% UT on structural joints.',
      clients: ['Suzlon Energy', 'GE Renewable Energy']
    },
    oilgas: {
      id: 'oilgas',
      title: 'Oil & Gas',
      category: 'DIVISIONS • OFFSHORE & SUBSEA',
      imgSrc: '../homepage%20images/Oil%20and%20Gas.png',
      scope: 'Rapidly established expertise in manufacturing and exporting high-pressure oil and gas equipment, severe-service valves, and subsea wellhead components. Engineered to comply with API 6A, API 6D, and NACE MR0175 sour service standards, delivering zero-leakage reliability under deepwater pressures.',
      components: [
        'Severe-Duty Valve Bodies & Bonnets',
        'High-Pressure Wellhead Flanges',
        'Subsea Rotary Actuator Housings',
        'Choke & Kill Manifold Blocks',
        'Bellows-Sealed Cryogenic Assemblies',
        'API Tubing Heads & Spools'
      ],
      materials: 'Forged Alloy Steel (ASTM A182 F22/F91), Super Duplex Stainless Steel (2507 / UNS S32750), Inconel 625/718 cladding, Stellite seat hardfacing.',
      capacities: 'Pressure ratings up to ANSI Class 4500 and API 15,000 PSI service, valve bodies up to 48 inches nominal bore.',
      testing: 'High-pressure hydrostatic proof testing, Helium leak detection, Positive Material Identification (PMI), Dye Penetrant Testing.',
      clients: ['Godrej & Boyce', 'Larsen & Toubro', 'Global Flow Control OEMs']
    },
    rolling: {
      id: 'rolling',
      title: 'Cold Rolling Mills',
      category: 'DIVISIONS • STEEL & METALLURGY',
      imgSrc: '../homepage%20images/Cold%20Rolling%20Mill.png',
      scope: 'Comprehensive manufacturing of complete equipment and heavy components for cold rolling mills and continuous processing lines. We engineer 2-High, 4-High, and 6-High mill housing stands, work roll chocks, back-up roll chocks, coiler mandrels, and strip guiding systems with uncompromising rigidity.',
      components: [
        'Mill Housing Stand Weldments (up to 40 MT)',
        'Work Roll & Back-Up Roll Chocks',
        'Coiler & Tension Reel Mandrels',
        'Entry/Exit Strip Guide Assemblies',
        'Hydraulic AGC Cylinder Blocks',
        'Pinion Stands & Drive Spindles'
      ],
      materials: 'Heavy Cast Steel (GS-20Mn5), Forged 42CrMo4 alloy steel roll chocks, stress-relieved high-yield structural fabrications.',
      capacities: 'Single-piece mill stands up to 40+ MT, dual column bore alignment within 25 microns across full housing height.',
      testing: 'In-situ Laser Tracker alignment, 100% Ultrasonic Testing on thick sections, surface roughness testing.',
      clients: ['Danieli', 'CMI Industry', 'Fata Group']
    },
    valves: {
      id: 'valves',
      title: 'Valves',
      category: 'DIVISIONS • FLOW CONTROL',
      imgSrc: '../homepage%20images/Valve.png',
      scope: 'Supplying high-performance industrial valves and critical pressure components including gate valves, bellows-sealed valves, globe valves, and custom actuator bodies. Designed for critical services in oil refineries, chemical plants, thermal power stations, and cryogenic gas handling.',
      components: [
        'Bellows-Sealed Gate & Globe Valves',
        'Cryogenic Extended Bonnet Valves',
        'Forged High-Pressure Valve Bodies',
        'Precision Lapped Wedge Discs',
        'Heavy Valve Actuator Housings',
        'High-Pressure Flanged Stems'
      ],
      materials: 'Austenitic Stainless Steel (CF8M, CF3M), Chrome-Moly Alloys (WC6, WC9, C12A), Monel, Hastelloy, Stellite overlays.',
      capacities: 'Bore sizes from 1/2" up to 36", pressure ratings Class 150 to Class 2500, extreme temperature service from -196°C to +650°C.',
      testing: 'API 598 pressure testing, fugitive emission testing (ISO 15848), Radiographic / Ultrasonic Testing.',
      clients: ['Godrej Process Equipment', 'L&T Valves', 'Global Energy Facilities']
    },
    construction: {
      id: 'construction',
      title: 'Construction Equipments',
      category: 'DIVISIONS • HEAVY EARTHMOVING',
      imgSrc: '../homepage%20images/Construction%20machineries.png',
      scope: 'Manufacturing high-precision, heavy-duty components for construction and earthmoving equipment operating under high-pressure hydraulic dynamics. Our deep-hole drilled manifold blocks, swing bearing brackets, and rotary actuator housings endure heavy continuous impact.',
      components: [
        'Deep-Hole Hydraulic Manifolds',
        'Rotary Actuator Housings',
        'Boom Pivot Brackets & Swing Bearings',
        'Heavy Chassis Frame Weldments',
        'High-Pressure Cylinder End-Caps',
        'Trunnion Mount Forgings'
      ],
      materials: 'High-strength structural steel plates (Hardox / Weldox equivalents), Forged ASTM A105N manifold blocks, Ductile Cast Iron.',
      capacities: 'Deep-hole gun drilling up to 1,500 mm depth, high-pressure forged blocks up to 8 MT, proof pressure tested up to 450 bar.',
      testing: '100% Boroscopic internal channel cleanliness inspection (ISO 4406), hydrostatic proof testing, magnetic particle testing.',
      clients: ['Heavy Equipment Builders', 'Mining Machinery Manufacturers']
    },
    printing: {
      id: 'printing',
      title: 'Printing Machines',
      category: 'DIVISIONS • PRINTING & CONVERTING',
      imgSrc: '../homepage%20images/High-Tech%20Printing%20Press%20Production%20Floor.webp',
      scope: 'Echaar manufactures state-of-the-art Central Impression Flexographic Printing Presses (CI Flexo) ensuring superior print registration, high dimensional accuracy, and world-class mechanical stability. We build massive double-walled impression drums, precision frame side-walls, and enclosed doctor blade systems.',
      components: [
        'Central Impression Cylinder Drums',
        'Rigid Cast Side-Frame Walls',
        'Enclosed Doctor Blade Chambers',
        'Precision Sleeve Mandrels',
        'Automated Register Adjusters',
        'High-Speed Web Chill Rolls'
      ],
      materials: 'High-grade Meehanite Cast Iron with high vibration dampening, forged alloy steel central shafts, ceramic / hard chrome surfaces.',
      capacities: 'Web widths from 800 mm to 1,600 mm, 8 to 10 color configurations, central cylinder runout tolerance below 5 microns.',
      testing: 'Dynamic balancing to ISO 1940 G1.0, laser interferometry measurement, vibration spectrum analysis.',
      clients: ['Manroland Goss', 'Manugraph Technologies', 'Packaging Converters']
    },
    ciflexo: {
      id: 'ciflexo',
      title: 'CI Flexopress',
      category: 'PRODUCTS • ADVANCED MACHINERY',
      imgSrc: '../homepage%20images/Golden-Hour%20Heavy%20Equipment%20Showcase.png',
      scope: 'Echaar\'s flagship turnkey CI Flexographic Printing Press line engineered for flexible packaging converters demanding superior print quality, ultra-fast sleeve changeovers, and continuous production speeds up to 400+ m/min. Features direct-drive servo motors and robust vibration-free cast frames.',
      components: [
        'Double-Wall CI Drum Structure',
        'Direct-Drive Servo Print Decks',
        'Pneumatic Carbon Fiber Doctor Blades',
        'Motorized 3D Register Adjustment',
        'High-Velocity Dual Drying Tunnels',
        'Cantilever Sleeve Changeover System'
      ],
      materials: 'Precision ground Meehanite cast drum, thermally stabilized side walls, hard-anodized aluminum and carbon-fiber rollers.',
      capacities: 'Speeds up to 400+ m/min, repeat lengths from 320 mm to 850 mm, solvent and water-based ink compatibility.',
      testing: 'Full factory operational acceptance testing (FAT), web tension calibration, infrared thermal imaging.',
      clients: ['Global Flexible Packaging Converters', 'Film Extrusion Plants']
    },
    flexointelligent: {
      id: 'flexointelligent',
      title: 'Flexointelligent',
      category: 'PRODUCTS • SMART AUTOMATION',
      imgSrc: '../homepage%20images/Precision%20Engineering.png',
      scope: 'Next-generation intelligent automation and industrial telemetry suite built by Echaar to optimize printing and machining operations. Featuring real-time AI optical register alignment, automated pressure calibration, predictive vibration monitoring, and cloud-linked OEE tracking.',
      components: [
        'Smart HMI Industrial Touch Console',
        'Closed-Loop Optical Register Cameras',
        'Predictive Vibration Telemetry Sensors',
        'Cloud Production Analytics Gateway',
        'Automated Wash-Up System Modules',
        'Motorized Kiss-Touch Impression Control'
      ],
      materials: 'IP65 washdown-rated stainless enclosures, hardened optical sensor brackets, high-speed fiber-optic bus interfaces.',
      capacities: 'Real-time closed-loop feedback at sub-millisecond response time, cloud telemetry recording for OEE tracking.',
      testing: 'CE conformity testing, EMC industrial electromagnetic compliance, 100% automated loop testing.',
      clients: ['Modern Automated Converters', 'Technocrat Print Facilities']
    }
  };

  // 2. Pre-parsed Baseline Data directly extracted from Google Sheet 2 (gid=1550103869)
  // Ensures immediate, lag-free rendering even before network fetch returns
  const SHEET2_BASELINE = {
  "hydro": [
    {
      "division": "Precision Manufacturing Division",
      "group": "Hydro Energy",
      "name": "Axial Valve",
      "rawUrl": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing"
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Hydro Energy",
      "name": "Deflector",
      "rawUrl": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing"
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Hydro Energy",
      "name": "Intricate Machining of Seal Support",
      "rawUrl": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing"
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Hydro Energy",
      "name": "Runner Center Guide",
      "rawUrl": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing"
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Hydro Energy",
      "name": "Runner Guide Plate",
      "rawUrl": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing"
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Hydro Energy",
      "name": "Seal Support",
      "rawUrl": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing"
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Hydro Energy",
      "name": "Seal Support",
      "rawUrl": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing"
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Hydro Energy",
      "name": "Wicket Gate",
      "rawUrl": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing"
    }
  ],
  "wind": [
    {
      "division": "Precision Manufacturing Division",
      "group": "Windmill Energy",
      "name": "90 Degree Cable Guide Assembly",
      "rawUrl": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing"
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Windmill Energy",
      "name": "Aluminium Platforms",
      "rawUrl": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing"
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Windmill Energy",
      "name": "Aluminium Platforms",
      "rawUrl": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing"
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Windmill Energy",
      "name": "Distance Plate",
      "rawUrl": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing"
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Windmill Energy",
      "name": "Handrail Main Bearing Assembly",
      "rawUrl": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing"
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Windmill Energy",
      "name": "Hoisting Eye",
      "rawUrl": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing"
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Windmill Energy",
      "name": "Hub Entry Ladder Assembly",
      "rawUrl": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing"
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Windmill Energy",
      "name": "Integrated-Sensor-Holder",
      "rawUrl": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing"
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Windmill Energy",
      "name": "Lock Plate",
      "rawUrl": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing"
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Windmill Energy",
      "name": "Locknut",
      "rawUrl": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing"
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Windmill Energy",
      "name": "Nacelle Entry Ladder",
      "rawUrl": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing"
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Windmill Energy",
      "name": "Oil Collecting Tray",
      "rawUrl": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing"
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Windmill Energy",
      "name": "Reinforcement Plate",
      "rawUrl": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing"
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Windmill Energy",
      "name": "Rotor Lock Assembly",
      "rawUrl": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing"
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Windmill Energy",
      "name": "Rotor Lock Disc",
      "rawUrl": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing"
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Windmill Energy",
      "name": "Rotor Lock Disc Assembly",
      "rawUrl": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing"
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Windmill Energy",
      "name": "Spider Shaft",
      "rawUrl": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing"
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Windmill Energy",
      "name": "Yaw Assembly",
      "rawUrl": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing"
    }
  ],
  "oilgas": [
    {
      "division": "Precision Manufacturing Division",
      "group": "Oil & Gas",
      "name": "Bonnet",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Oil & Gas",
      "name": "Bonnets",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Oil & Gas",
      "name": "Crank Shaft",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Oil & Gas",
      "name": "Other Components for Oil Field",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Oil & Gas",
      "name": "Pinion",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Oil & Gas",
      "name": "Pinions",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Oil & Gas",
      "name": "Shafts",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Oil & Gas",
      "name": "Studded Tee for Oil Field",
      "rawUrl": ""
    }
  ],
  "rolling": [
    {
      "division": "Precision Manufacturing Division",
      "group": "Cold Rolling Mills",
      "name": "Backup Roll Chock",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Cold Rolling Mills",
      "name": "Breaker Roll",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Cold Rolling Mills",
      "name": "Hydraulic Shear Assembly",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Cold Rolling Mills",
      "name": "Metallic Tip Assembly",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Cold Rolling Mills",
      "name": "Outboard Support Assembly",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Cold Rolling Mills",
      "name": "Segments",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Cold Rolling Mills",
      "name": "Snubber Roll Assembly",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Cold Rolling Mills",
      "name": "Work Roll Chock",
      "rawUrl": ""
    }
  ],
  "valves": [
    {
      "division": "Precision Manufacturing Division",
      "group": "Valves",
      "name": "Actuator",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Valves",
      "name": "Ball Valve",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Valves",
      "name": "Ball Valve",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Valves",
      "name": "Ball Valve",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Valves",
      "name": "Butterfly Gate Valve",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Valves",
      "name": "Butterfly Gate Valve",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Valves",
      "name": "Butterfly Gate Valve",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Valves",
      "name": "Butterfly Gate Valve",
      "rawUrl": ""
    }
  ],
  "construction": [
    {
      "division": "Precision Manufacturing Division",
      "group": "Construction Equipments",
      "name": "Flinger(Back Side)",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Construction Equipments",
      "name": "Flinger(front Side)",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Construction Equipments",
      "name": "Housing For Rotary Actuator",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Construction Equipments",
      "name": "Housing For Rotary Actuator",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Construction Equipments",
      "name": "Housing for Rotary Actuators",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Construction Equipments",
      "name": "Housing for Rotary Actuators",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Construction Equipments",
      "name": "Hub Cap Adaptor",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Construction Equipments",
      "name": "Internal Seal Ring",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Construction Equipments",
      "name": "Manifold",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Construction Equipments",
      "name": "Manifold",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Construction Equipments",
      "name": "Manifold",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Construction Equipments",
      "name": "Retaining Ring",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Construction Equipments",
      "name": "Rings",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Construction Equipments",
      "name": "Thrust Ring",
      "rawUrl": ""
    }
  ],
  "printing": [
    {
      "division": "Precision Manufacturing Division",
      "group": "Printing Machines",
      "name": "Auto paster Wall",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Printing Machines",
      "name": "Chrome Roller",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Printing Machines",
      "name": "Dampening Roller",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Printing Machines",
      "name": "Plate Cylinders",
      "rawUrl": ""
    },
    {
      "division": "Precision Manufacturing Division",
      "group": "Printing Machines",
      "name": "Swivel Arm Assembly copy",
      "rawUrl": ""
    }
  ],
  "ciflexo": [
    {
      "division": "Converting Machinery Division",
      "group": "Ci Flexopress",
      "name": "Ci Flexopress",
      "rawUrl": ""
    },
    {
      "division": "Converting Machinery Division",
      "group": "FlexoDelight",
      "name": "FlexoDelight",
      "rawUrl": ""
    },
    {
      "division": "Converting Machinery Division",
      "group": "Flexomaster",
      "name": "Flexomaster",
      "rawUrl": ""
    }
  ],
  "flexointelligent": [
    {
      "division": "Converting Machinery Division",
      "group": "Flexointelligent",
      "name": "Flexointelligent",
      "rawUrl": ""
    }
  ]
};

  // Live mutable catalog of parts per division
  let liveSheetCatalog = JSON.parse(JSON.stringify(SHEET2_BASELINE));

  // 3. Fallback Images for Divisions
  const DIVISION_FALLBACK_IMAGES = {
    hydro: '../homepage%20images/Hydro%20Energy.png',
    wind: '../homepage%20images/Windmill%20Energy.webp',
    oilgas: '../homepage%20images/Oil%20and%20Gas.png',
    rolling: '../homepage%20images/Cold%20Rolling%20Mill.png',
    valves: '../homepage%20images/Valve.png',
    construction: '../homepage%20images/Construction%20machineries.png',
    printing: '../homepage%20images/High-Tech%20Printing%20Press%20Production%20Floor.webp',
    ciflexo: '../homepage%20images/Golden-Hour%20Heavy%20Equipment%20Showcase.png',
    flexointelligent: '../homepage%20images/Precision%20Engineering.png'
  };

  /**
   * Convert Google Drive or web URLs to high-speed CDN image URLs
   */
  const resolvePartImageUrl = (rawUrl, divisionKey) => {
    if (rawUrl && typeof rawUrl === 'string' && rawUrl.trim().length > 0) {
      const trimmed = rawUrl.trim();

      // Google Drive link /file/d/FILE_ID/
      const fileDMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (fileDMatch) {
        return `https://lh3.googleusercontent.com/d/${fileDMatch[1]}`;
      }

      // Google Drive link ?id=FILE_ID
      const idMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      if (idMatch) {
        return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
      }

      if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
        return trimmed;
      }
    }

    return DIVISION_FALLBACK_IMAGES[divisionKey] || '../homepage%20images/Echaar%20Equipments.png';
  };

  // 4. DOM Elements for the Side-Tabbed Showcase
  const sidebarButtons = document.querySelectorAll('.sidebar-tab-btn');
  const displayImg = document.getElementById('displayImg');
  const displayTitle = document.getElementById('displayTitle');
  const displayCategory = document.getElementById('displayCategory');
  const displayScope = document.getElementById('displayScope');
  const displayPartsGrid = document.getElementById('displayPartsGrid');
  const sheetStatusBadge = document.getElementById('sheetStatusBadge');
  const btnProposalRfq = document.getElementById('btnProposalRfq');

  // Lightbox elements
  const partLightbox = document.getElementById('partLightbox');
  const partLightboxClose = document.getElementById('partLightboxClose');
  const partLightboxImg = document.getElementById('partLightboxImg');
  const partLightboxTitle = document.getElementById('partLightboxTitle');

  // Currently active key
  let currentKey = 'hydro';

  const escapeHtml = (str) => {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  /**
   * Render the Part Cards Grid for the selected division
   * Each card displays: Part Image and Part Name only
   */
  const renderPartsGrid = (divisionKey) => {
    if (!displayPartsGrid) return;

    const parts = liveSheetCatalog[divisionKey] || [];
    if (parts.length === 0) {
      displayPartsGrid.innerHTML = `<div class="parts-empty-state">No components registered yet for this division.</div>`;
      return;
    }

    const fallbackImg = DIVISION_FALLBACK_IMAGES[divisionKey] || '../homepage%20images/Echaar%20Equipments.png';

    displayPartsGrid.innerHTML = parts.map((part) => {
      const imgUrl = resolvePartImageUrl(part.rawUrl, divisionKey);
      const name = part.name || part.group || 'Precision Component';

      return `
        <div class="part-item-card" data-part-name="${escapeHtml(name)}" data-part-img="${imgUrl}" tabindex="0" role="button" aria-label="View ${escapeHtml(name)}">
          <div class="part-thumb-wrap">
            <img 
              src="${imgUrl}" 
              alt="${escapeHtml(name)}" 
              loading="lazy" 
              onerror="this.onerror=null; this.src='${fallbackImg}';" 
            />
          </div>
          <div class="part-name-title">${escapeHtml(name)}</div>
        </div>
      `;
    }).join('');

    // Attach click listeners to open lightbox preview
    displayPartsGrid.querySelectorAll('.part-item-card').forEach(card => {
      card.addEventListener('click', () => {
        const name = card.getAttribute('data-part-name');
        const img = card.getAttribute('data-part-img');
        openLightbox(name, img);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const name = card.getAttribute('data-part-name');
          const img = card.getAttribute('data-part-img');
          openLightbox(name, img);
        }
      });
    });
  };

  /**
   * Lightbox Preview Controls
   */
  const openLightbox = (title, imgSrc) => {
    if (!partLightbox) return;
    if (partLightboxTitle) partLightboxTitle.textContent = title;
    if (partLightboxImg) {
      partLightboxImg.src = imgSrc;
      partLightboxImg.alt = title;
    }
    partLightbox.classList.add('is-open');
    partLightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!partLightbox) return;
    partLightbox.classList.remove('is-open');
    partLightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (partLightboxClose) partLightboxClose.addEventListener('click', closeLightbox);
  if (partLightbox) {
    partLightbox.addEventListener('click', (e) => {
      if (e.target === partLightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && partLightbox && partLightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });

  /**
   * Render Active Showcase Panel
   */
  const updateShowcase = (key) => {
    const data = SOLUTIONS_CATALOG[key];
    if (!data) return;

    currentKey = key;

    // Update Sidebar active state
    sidebarButtons.forEach(btn => {
      const match = btn.getAttribute('data-solution-id') === key;
      btn.classList.toggle('active', match);
      btn.setAttribute('aria-selected', match ? 'true' : 'false');
    });

    // Update Top Hero Box
    if (displayImg) {
      displayImg.src = data.imgSrc;
      displayImg.alt = `${data.title} - Echaar Equipments`;
    }
    if (displayTitle) {
      displayTitle.textContent = data.title;
    }
    if (displayCategory) {
      displayCategory.textContent = data.category;
    }

    // Update Scope Text
    if (displayScope) {
      displayScope.textContent = data.scope;
    }


    // Update Parts & Components Gallery (Live Fetched from Sheet 2)
    renderPartsGrid(key);


    // Update RFQ button target title
    if (btnProposalRfq) {
      btnProposalRfq.setAttribute('data-solution-title', data.title);
    }
  };

  // Attach Sidebar Click Handlers
  sidebarButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-solution-id');
      updateShowcase(targetId);
    });
  });

  /**
   * 5. Live Google Sheet 2 Fetcher & Synchronization
   * Sheet 2 GID: 1550103869
   */
  const normalizeSheetGroupKey = (groupName) => {
    if (!groupName) return '';
    const g = groupName.toLowerCase().trim();
    if (g.includes('hydro')) return 'hydro';
    if (g.includes('wind')) return 'wind';
    if (g.includes('oil')) return 'oilgas';
    if (g.includes('rolling')) return 'rolling';
    if (g.includes('valve')) return 'valves';
    if (g.includes('construction')) return 'construction';
    if (g.includes('printing')) return 'printing';
    if (g.includes('ci flexo') || g.includes('delight') || g.includes('master')) return 'ciflexo';
    if (g.includes('intelligent')) return 'flexointelligent';
    return g;
  };

  const parseGvizData = (data) => {
    if (!data || !data.table || !Array.isArray(data.table.rows)) return null;

    const freshCatalog = {
      hydro: [],
      wind: [],
      oilgas: [],
      rolling: [],
      valves: [],
      construction: [],
      printing: [],
      ciflexo: [],
      flexointelligent: []
    };

    // Row 0 is header (URL, Group Tittle, Group , Tittle)
    data.table.rows.slice(1).forEach(r => {
      if (!r.c) return;
      const rawUrl = r.c[0] && r.c[0].v ? String(r.c[0].v).trim() : '';
      const groupDivision = r.c[1] && r.c[1].v ? String(r.c[1].v).trim() : '';
      const groupName = r.c[2] && r.c[2].v ? String(r.c[2].v).trim() : '';
      const partTitle = r.c[3] && r.c[3].v ? String(r.c[3].v).trim() : (groupName || '');

      if (!groupName && !partTitle) return;

      const key = normalizeSheetGroupKey(groupName);
      if (freshCatalog[key]) {
        freshCatalog[key].push({
          division: groupDivision,
          group: groupName,
          name: partTitle,
          rawUrl: rawUrl
        });
      }
    });

    return freshCatalog;
  };

  const fetchLiveSheet2 = async () => {
    const sheetGvizUrl = 'https://docs.google.com/spreadsheets/d/11fGoU7WbGkKBaFy4hjnu2LpKTdgPFhW1eOxXWXkU658/gviz/tq?tqx=out:json&gid=1550103869';

    try {
      const response = await fetch(sheetGvizUrl);
      if (!response.ok) throw new Error(`Network response not ok: ${response.status}`);

      const text = await response.text();
      const jsonStart = text.indexOf('{');
      const jsonEnd = text.lastIndexOf('}');

      if (jsonStart !== -1 && jsonEnd !== -1) {
        const json = JSON.parse(text.substring(jsonStart, jsonEnd + 1));
        const parsed = parseGvizData(json);

        if (parsed) {
          liveSheetCatalog = parsed;
          // Re-render currently active tab with freshly synchronized data
          renderPartsGrid(currentKey);
        }
      }
    } catch (err) {
      console.info('Operating on robust pre-parsed baseline:', err.message);
    }
  };

  // Trigger Live Sync in Background
  fetchLiveSheet2();

  // 6. RFQ / Proposal Modal Management
  const rfqModal = document.getElementById('rfqModal');
  const rfqModalClose = document.getElementById('rfqModalClose');
  const rfqForm = document.getElementById('rfqForm');
  const rfqSolutionSelect = document.getElementById('rfqSolutionSelect');

  const openRfqModal = (solutionTitle = '') => {
    if (!rfqModal) return;

    if (rfqSolutionSelect && solutionTitle) {
      for (let i = 0; i < rfqSolutionSelect.options.length; i++) {
        if (rfqSolutionSelect.options[i].text.toLowerCase().includes(solutionTitle.toLowerCase())) {
          rfqSolutionSelect.selectedIndex = i;
          break;
        }
      }
    }

    rfqModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeRfqModal = () => {
    if (!rfqModal) return;
    rfqModal.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  if (rfqModalClose) rfqModalClose.addEventListener('click', closeRfqModal);
  if (rfqModal) {
    rfqModal.addEventListener('click', (e) => {
      if (e.target === rfqModal) closeRfqModal();
    });
  }

  // Trigger RFQ modal from buttons
  document.querySelectorAll('.btn-proposal-rfq, #openRfqFromHero, #openRfqFromCta').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentData = SOLUTIONS_CATALOG[currentKey];
      const title = btn.getAttribute('data-solution-title') || (currentData ? currentData.title : '');
      openRfqModal(title);
    });
  });

  // RFQ Form Submission to mailto
  if (rfqForm) {
    rfqForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('rfqName')?.value || '';
      const company = document.getElementById('rfqCompany')?.value || '';
      const email = document.getElementById('rfqEmail')?.value || '';
      const weight = document.getElementById('rfqWeight')?.value || '';
      const solution = rfqSolutionSelect?.value || 'General Heavy Machining Inquiry';
      const message = document.getElementById('rfqMessage')?.value || '';

      const subject = encodeURIComponent(`RFQ Technical Inquiry: ${solution} - ${company}`);
      const body = encodeURIComponent(
        `Echaar Equipments Pvt. Ltd. - Engineering Inquiry\n\n` +
        `Solution / Division: ${solution}\n` +
        `Name: ${name}\n` +
        `Company: ${company}\n` +
        `Email: ${email}\n` +
        `Est. Dimensions / Weight: ${weight || 'Not specified'}\n\n` +
        `Project Scope & Requirements:\n${message}\n\n` +
        `---\nSubmitted via Echaar Solutions Portal`
      );

      window.location.href = `mailto:sales@echaar.com?subject=${subject}&body=${body}`;
      closeRfqModal();
    });
  }

  // 7. Initial Render of Default Division (Hydro Energy)
  updateShowcase('hydro');
});
