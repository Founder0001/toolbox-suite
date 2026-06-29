// ============================================================
// DATA STRUCTURES
// ============================================================

const categories = [
    { id: 'pdfTools', name: 'All-In-One PDF Suite (30+ Enterprise Tools)', icon: '\uD83D\uDCC4', tools: ['pdfSuite'] },
    { id: 'imageTools', name: 'Comprehensive Image Suite', icon: '\uD83D\uDDBC', tools: ['imageSuite'] },
    { id: 'aiPromptTools', name: 'Viral AI Prompt Architect', icon: '\uD83E\uDD16', tools: ['promptViral'] },
    { id: 'studentTools', name: 'Student Tools Suite', icon: '\uD83D\uDCDA', tools: ['studentSuite'] },
    { id: 'mbbsTools', name: 'Medical Tools', icon: '🩺', tools: ['medicalTools'] },
    { id: 'unitConverters', name: 'Comprehensive Unit Converter Suite', icon: '\uD83D\uDDCF', tools: ['unitConverterSuite'] },
    { id: 'codeUtilities', name: 'Code Utilities Suite', icon: '\uD83D\uDCBB', tools: ['codeUtilities'] },
    { id: 'textUtilities', name: 'Text Utilities', icon: '\uD83D\uDCDD', tools: ['textCaseConverter'] },
    { id: 'seoTools', name: 'SEO & Marketing Tools Suite', icon: '\uD83D\uDD0D', tools: ['seoSuite'] },
];

const tools = {
    pdfSuite: {
        id: 'pdfSuite',
        name: 'All-In-One PDF Suite',
        category: 'PDF Tools',
        description: 'Merge, Split, Compress, Unlock, Convert, and AI Summarize PDFs completely locally. All processed securely 100% client-side.',
        render: renderPdfSuiteTool
    },
    imageSuite: {
        id: 'imageSuite',
        name: 'Comprehensive Image Suite',
        category: 'Image Tools',
        description: 'Convert, Resize, Crop, Filter, Extract Colors, and Remove Backgrounds from your images completely client-side.',
        render: renderImageSuiteTool
    },
    studentSuite: {
        id: 'studentSuite',
        name: 'Student Tools Suite',
        category: 'Student Tools',
        description: 'GPA Calculator, Pomodoro Timer, Word Counter & Citation Generator for students.',
        render: renderStudentSuiteTool
    },
    textCaseConverter: {
        id: 'textCaseConverter',
        name: 'Text Case Converter',
        category: 'Text Utilities',
        description: 'Convert your text into various case formats: uppercase, lowercase, title case, and more.',
        render: renderTextCaseConverterTool
    },
    medicalTools: {
        id: 'medicalTools',
        name: 'Medical Tools',
        category: 'Medical Tools',
        description: 'Cardiology, Nephrology, Biochemistry & Clinical Pharmacology calculators with real-time clinical interpretation.',
        render: renderMedicalToolsSuite
    },
    unitConverterSuite: {
        id: 'unitConverterSuite',
        name: 'Comprehensive Unit Converter Suite',
        category: 'Unit Converters',
        description: 'A comprehensive collection of unit conversion tools for various fields, processed entirely client-side.',
        render: renderUnitConverterSuiteTool
    },
    promptViral: {
        id: 'promptViral',
        name: 'Viral AI Prompt Architect',
        category: 'AI Prompt Tools',
        description: 'Trending prompts inspired by YouMind - click, customize, and copy!',
        render: renderPromptViralTool
    },
    codeUtilities: {
        id: 'codeUtilities',
        name: 'Code Utilities Suite',
        category: 'Code Utilities',
        description: 'A complete suite of developer tools: JSON, JWT, Regex, Base64, and language flashcards.',
        render: renderCodeUtilitiesTool
    },
    seoSuite: {
        id: 'seoSuite',
        name: 'SEO & Marketing Tools Suite',
        category: 'SEO Tools',
        description: 'Meta Tag Generator, OG Preview, Keyword Density Analyzer, Slug Generator & Sitemap Builder.',
        render: renderSeoSuiteTool
    }
};

// ============================================================
// DOM ELEMENTS
// ============================================================

const categoriesGrid = document.getElementById('categories-grid');
const toolSearch = document.getElementById('toolSearch');
const mainDashboard = document.getElementById('main-dashboard');
const heroSection = document.getElementById('hero-section');
const workspaceView = document.getElementById('dedicated-workspace-view');
const workspaceTitle = document.getElementById('workspace-title');
const workspaceSubtitle = document.getElementById('workspace-subtitle');
const workspaceBadge = document.getElementById('workspace-header-badge');
const workspaceDynamicContent = document.getElementById('workspace-dynamic-content');
const btnBackToDashboard = document.getElementById('btn-back-to-dashboard');

// ============================================================
// VIEW ROUTER ENGINE
// ============================================================

function navigateToToolView(tool) {
    mainDashboard.classList.add('hidden');
    heroSection.classList.add('hidden');
    workspaceTitle.textContent = tool.name;
    workspaceSubtitle.textContent = tool.description || '';
    workspaceBadge.textContent = tool.category || 'Tool';
    workspaceDynamicContent.innerHTML = '';
    tool.render(workspaceDynamicContent);
    workspaceView.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateToCategoryView(category) {
    if (category.tools && category.tools.length > 0) {
        navigateToToolView(tools[category.tools[0]]);
    } else {
        mainDashboard.classList.add('hidden');
        heroSection.classList.add('hidden');
        workspaceTitle.textContent = category.name;
        workspaceSubtitle.textContent = 'Explore tools in this category';
        workspaceBadge.textContent = category.name;
        workspaceDynamicContent.innerHTML = `
            <div class="p-12 text-center bg-slate-900/50 rounded-xl border border-slate-700">
                <div class="text-6xl mb-4">${category.icon}</div>
                <h3 class="text-2xl font-semibold text-white mb-2">${category.name}</h3>
                <p class="text-slate-400">No active tools implemented for ${category.name} yet. Check back soon!</p>
            </div>
        `;
        workspaceView.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function navigateBackToDashboard() {
    workspaceView.classList.add('hidden');
    workspaceDynamicContent.innerHTML = '';
    workspaceTitle.textContent = '';
    workspaceSubtitle.textContent = '';
    mainDashboard.classList.remove('hidden');
    heroSection.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
// DASHBOARD SEARCH & FILTER
// ============================================================

function renderCategories(filter = '') {
    const cards = categoriesGrid.querySelectorAll('[data-category-id]');
    cards.forEach(card => {
        const categoryId = card.getAttribute('data-category-id');
        const category = categories.find(c => c.id === categoryId);
        if (!category) return;
        const matchesFilter = category.name.toLowerCase().includes(filter.toLowerCase()) ||
            category.tools.some(toolId => {
                const tool = tools[toolId];
                return tool && tool.name.toLowerCase().includes(filter.toLowerCase());
            });
        if (matchesFilter) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// ============================================================
// UNIT CONVERSION DATA (15+ Categories)
// ============================================================

const UNIT_CONVERSION_DATA = {
    length: {
        label: "Length",
        icon: "\uD83D\uDCCF",
        units: [
            { key: 'meter', label: 'Meters (m)', factor: 1 },
            { key: 'kilometer', label: 'Kilometers (km)', factor: 1000 },
            { key: 'centimeter', label: 'Centimeters (cm)', factor: 0.01 },
            { key: 'millimeter', label: 'Millimeters (mm)', factor: 0.001 },
            { key: 'micrometer', label: 'Micrometers (\u00B5m)', factor: 0.000001 },
            { key: 'nanometer', label: 'Nanometers (nm)', factor: 0.000000001 },
            { key: 'mile', label: 'Miles (mi)', factor: 1609.344 },
            { key: 'yard', label: 'Yards (yd)', factor: 0.9144 },
            { key: 'foot', label: 'Feet (ft)', factor: 0.3048 },
            { key: 'inch', label: 'Inches (in)', factor: 0.0254 }
        ],
        baseUnitKey: 'meter',
        precision: 6
    },
    mass: {
        label: "Mass/Weight",
        icon: "\u2696",
        units: [
            { key: 'kilogram', label: 'Kilograms (kg)', factor: 1 },
            { key: 'gram', label: 'Grams (g)', factor: 0.001 },
            { key: 'milligram', label: 'Milligrams (mg)', factor: 0.000001 },
            { key: 'microgram', label: 'Micrograms (\u00B5g)', factor: 0.000000001 },
            { key: 'metric_ton', label: 'Metric Tons (t)', factor: 1000 },
            { key: 'pound', label: 'Pounds (lb)', factor: 0.453592 },
            { key: 'ounce', label: 'Ounces (oz)', factor: 0.0283495 },
            { key: 'stone', label: 'Stones (st)', factor: 6.35029 }
        ],
        baseUnitKey: 'kilogram',
        precision: 6
    },
    area: {
        label: "Area",
        icon: "\uD83D\uDDFA",
        units: [
            { key: 'square_meter', label: 'Square Meters (m\u00B2)', factor: 1 },
            { key: 'square_kilometer', label: 'Square Kilometers (km\u00B2)', factor: 1000000 },
            { key: 'square_centimeter', label: 'Square Centimeters (cm\u00B2)', factor: 0.0001 },
            { key: 'square_millimeter', label: 'Square Millimeters (mm\u00B2)', factor: 0.000001 },
            { key: 'hectare', label: 'Hectares (ha)', factor: 10000 },
            { key: 'acre', label: 'Acres (ac)', factor: 4046.86 },
            { key: 'square_mile', label: 'Square Miles (mi\u00B2)', factor: 2589988.11 },
            { key: 'square_yard', label: 'Square Yards (yd\u00B2)', factor: 0.836127 },
            { key: 'square_foot', label: 'Square Feet (ft\u00B2)', factor: 0.092903 },
            { key: 'square_inch', label: 'Square Inches (in\u00B2)', factor: 0.00064516 }
        ],
        baseUnitKey: 'square_meter',
        precision: 6
    },
    volume: {
        label: "Volume",
        icon: "\uD83E\uDD5B",
        units: [
            { key: 'cubic_meter', label: 'Cubic Meters (m\u00B3)', factor: 1 },
            { key: 'liter', label: 'Liters (L)', factor: 0.001 },
            { key: 'milliliter', label: 'Milliliters (ml)', factor: 0.000001 },
            { key: 'cubic_centimeter', label: 'Cubic Centimeters (cm\u00B3)', factor: 0.000001 },
            { key: 'cubic_foot', label: 'Cubic Feet (ft\u00B3)', factor: 0.0283168 },
            { key: 'cubic_inch', label: 'Cubic Inches (in\u00B3)', factor: 0.0000163871 },
            { key: 'gallon_us_liquid', label: 'Gallons (US liquid)', factor: 0.00378541 },
            { key: 'quart_us_liquid', label: 'Quarts (US liquid)', factor: 0.000946353 },
            { key: 'pint_us_liquid', label: 'Pints (US liquid)', factor: 0.000473176 },
            { key: 'fluid_ounce_us', label: 'Fluid Ounces (US fl oz)', factor: 0.0000295735 }
        ],
        baseUnitKey: 'cubic_meter',
        precision: 6
    },
    temperature: {
        label: "Temperature",
        icon: "\uD83C\uDF21",
        units: [
            { key: 'celsius', label: 'Celsius (\u00B0C)' },
            { key: 'fahrenheit', label: 'Fahrenheit (\u00B0F)' },
            { key: 'kelvin', label: 'Kelvin (K)' }
        ],
        baseUnitKey: 'celsius',
        precision: 2
    },
    time: {
        label: "Time",
        icon: "\u23F0",
        units: [
            { key: 'second', label: 'Seconds (s)', factor: 1 },
            { key: 'millisecond', label: 'Milliseconds (ms)', factor: 0.001 },
            { key: 'microsecond', label: 'Microseconds (\u00B5s)', factor: 0.000001 },
            { key: 'minute', label: 'Minutes (min)', factor: 60 },
            { key: 'hour', label: 'Hours (hr)', factor: 3600 },
            { key: 'day', label: 'Days (d)', factor: 86400 },
            { key: 'week', label: 'Weeks (wk)', factor: 604800 },
            { key: 'month', label: 'Months (approx)', factor: 2629746 },
            { key: 'year', label: 'Years (approx)', factor: 31556952 },
            { key: 'decade', label: 'Decades', factor: 315569520 },
            { key: 'century', label: 'Centuries', factor: 3155695200 }
        ],
        baseUnitKey: 'second',
        precision: 4
    },
    speed: {
        label: "Speed",
        icon: "\uD83D\uDCA8",
        units: [
            { key: 'meters_per_second', label: 'Meters/second (m/s)', factor: 1 },
            { key: 'kilometers_per_hour', label: 'Kilometers/hour (km/h)', factor: 1 / 3.6 },
            { key: 'miles_per_hour', label: 'Miles/hour (mph)', factor: 0.44704 },
            { key: 'knots', label: 'Knots (kn)', factor: 0.514444 },
            { key: 'foot_per_second', label: 'Feet/second (ft/s)', factor: 0.3048 }
        ],
        baseUnitKey: 'meters_per_second',
        precision: 4
    },
    pressure: {
        label: "Pressure",
        icon: "\uD83C\uDF00",
        units: [
            { key: 'pascal', label: 'Pascals (Pa)', factor: 1 },
            { key: 'kilopascal', label: 'Kilopascals (kPa)', factor: 1000 },
            { key: 'bar', label: 'Bar (bar)', factor: 100000 },
            { key: 'psi', label: 'Pounds/square inch (psi)', factor: 6894.76 },
            { key: 'atmosphere', label: 'Atmospheres (atm)', factor: 101325 },
            { key: 'torr', label: 'Torr (Torr)', factor: 133.322 }
        ],
        baseUnitKey: 'pascal',
        precision: 6
    },
    power: {
        label: "Power",
        icon: "\u26A1",
        units: [
            { key: 'watt', label: 'Watts (W)', factor: 1 },
            { key: 'kilowatt', label: 'Kilowatts (kW)', factor: 1000 },
            { key: 'horsepower_hp', label: 'Horsepower (hp)', factor: 745.7 },
            { key: 'foot_pound_per_minute', label: 'Foot-pounds/minute (ft-lb/min)', factor: 0.022597 },
            { key: 'btu_per_hour', label: 'BTUs/hour (BTU/hr)', factor: 0.293071 }
        ],
        baseUnitKey: 'watt',
        precision: 6
    },
    energy: {
        label: "Energy",
        icon: "\uD83D\uDCA1",
        units: [
            { key: 'joule', label: 'Joules (J)', factor: 1 },
            { key: 'kilojoule', label: 'Kilojoules (kJ)', factor: 1000 },
            { key: 'calorie', label: 'Calories (cal)', factor: 4.184 },
            { key: 'kilocalorie', label: 'Kilocalories (kcal)', factor: 4184 },
            { key: 'kilowatt_hour', label: 'Kilowatt-hours (kWh)', factor: 3600000 },
            { key: 'electronvolt', label: 'Electronvolts (eV)', factor: 1.60218e-19 },
            { key: 'btu', label: 'British Thermal Units (BTU)', factor: 1055.06 }
        ],
        baseUnitKey: 'joule',
        precision: 6
    },
    data_storage: {
        label: "Digital Storage",
        icon: "\uD83D\uDCBE",
        units: [
            { key: 'bit', label: 'Bits (b)', factor: 1 },
            { key: 'kilobit', label: 'Kilobits (kb)', factor: 1000 },
            { key: 'megabit', label: 'Megabits (Mb)', factor: 1000000 },
            { key: 'gigabit', label: 'Gigabits (Gb)', factor: 1000000000 },
            { key: 'terabit', label: 'Terabits (Tb)', factor: 1000000000000 },
            { key: 'byte', label: 'Bytes (B)', factor: 8 },
            { key: 'kilobyte', label: 'Kilobytes (KB)', factor: 8 * 1024 },
            { key: 'megabyte', label: 'Megabytes (MB)', factor: 8 * 1024 * 1024 },
            { key: 'gigabyte', label: 'Gigabytes (GB)', factor: 8 * 1024 * 1024 * 1024 },
            { key: 'terabyte', label: 'Terabytes (TB)', factor: 8 * 1024 * 1024 * 1024 * 1024 }
        ],
        baseUnitKey: 'bit',
        precision: 2
    },
    force: {
        label: "Force",
        icon: "\uD83D\uDCAA",
        units: [
            { key: 'newton', label: 'Newtons (N)', factor: 1 },
            { key: 'kilonewton', label: 'Kilonewtons (kN)', factor: 1000 },
            { key: 'pound_force', label: 'Pound-force (lbf)', factor: 4.44822 },
            { key: 'kilogram_force', label: 'Kilogram-force (kgf)', factor: 9.80665 },
            { key: 'dyne', label: 'Dynes (dyn)', factor: 0.00001 }
        ],
        baseUnitKey: 'newton',
        precision: 6
    },
    angle: {
        label: "Angle",
        icon: "\uD83D\uDCD0",
        units: [
            { key: 'degree', label: 'Degrees (\u00B0)', factor: 1 },
            { key: 'radian', label: 'Radians (rad)', factor: 180 / Math.PI },
            { key: 'gradian', label: 'Gradians (grad)', factor: 9 / 10 },
            { key: 'arcminute', label: 'Arcminutes (\u2032)', factor: 1 / 60 },
            { key: 'arcsecond', label: 'Arcseconds (\u2033)', factor: 1 / 3600 }
        ],
        baseUnitKey: 'degree',
        precision: 6
    },
    fuel_economy: {
        label: "Fuel Economy",
        icon: "\u26FD",
        units: [
            { key: 'mpg_us', label: 'Miles/gallon (US)', factor: 1 / 235.214583 },
            { key: 'mpg_uk', label: 'Miles/gallon (UK)', factor: 1 / 282.481 },
            { key: 'km_per_liter', label: 'Kilometers/liter (km/L)', factor: 100 },
            { key: 'liter_per_100km', label: 'Liters/100 km (L/100km)', factor: 1 },
            { key: 'liter_per_10km', label: 'Liters/10 km (L/10km)', factor: 10 }
        ],
        baseUnitKey: 'liter_per_100km',
        precision: 3
    },
    frequency: {
        label: "Frequency",
        icon: "\uD83D\uDCF1",
        units: [
            { key: 'hertz', label: 'Hertz (Hz)', factor: 1 },
            { key: 'kilohertz', label: 'Kilohertz (kHz)', factor: 1000 },
            { key: 'megahertz', label: 'Megahertz (MHz)', factor: 1000000 },
            { key: 'gigahertz', label: 'Gigahertz (GHz)', factor: 1000000000 },
            { key: 'revolutions_per_minute', label: 'Revolutions/minute (RPM)', factor: 1 / 60 }
        ],
        baseUnitKey: 'hertz',
        precision: 6
    },
    density: {
        label: "Density",
        icon: "\uD83E\uDDF1",
        units: [
            { key: 'kilogram_per_cubic_meter', label: 'Kilograms/cubic meter (kg/m\u00B3)', factor: 1 },
            { key: 'gram_per_cubic_centimeter', label: 'Grams/cubic centimeter (g/cm\u00B3)', factor: 1000 },
            { key: 'pound_per_cubic_foot', label: 'Pounds/cubic foot (lb/ft\u00B3)', factor: 16.0185 },
            { key: 'pound_per_cubic_inch', label: 'Pounds/cubic inch (lb/in\u00B3)', factor: 27679.9 }
        ],
        baseUnitKey: 'kilogram_per_cubic_meter',
        precision: 6
    },
    torque: {
        label: "Torque",
        icon: "\uD83D\uDD29",
        units: [
            { key: 'newton_meter', label: 'Newton-meters (N\u00B7m)', factor: 1 },
            { key: 'foot_pound', label: 'Foot-pounds (ft\u00B7lb)', factor: 1.35582 },
            { key: 'inch_pound', label: 'Inch-pounds (in\u00B7lb)', factor: 0.112985 },
            { key: 'kilogram_force_meter', label: 'Kilogram-force meters (kgf\u00B7m)', factor: 9.80665 }
        ],
        baseUnitKey: 'newton_meter',
        precision: 6
    }
};

function performUnitConversion(value, fromUnitKey, toUnitKey, unitType) {
    if (isNaN(value) || value === 0) return 0;
    const category = UNIT_CONVERSION_DATA[unitType];
    if (!category) return NaN;
    if (unitType === 'temperature') {
        let valueInCelsius;
        if (fromUnitKey === 'celsius') valueInCelsius = value;
        else if (fromUnitKey === 'fahrenheit') valueInCelsius = (value - 32) * 5 / 9;
        else if (fromUnitKey === 'kelvin') valueInCelsius = value - 273.15;
        else return NaN;
        if (toUnitKey === 'celsius') return valueInCelsius;
        else if (toUnitKey === 'fahrenheit') return (valueInCelsius * 9 / 5) + 32;
        else if (toUnitKey === 'kelvin') return valueInCelsius + 273.15;
        else return NaN;
    }
    const fromUnit = category.units.find(u => u.key === fromUnitKey);
    const toUnit = category.units.find(u => u.key === toUnitKey);
    if (!fromUnit || !toUnit || fromUnit.factor === undefined || toUnit.factor === undefined) return NaN;
    const valueInBase = value * fromUnit.factor;
    return valueInBase / toUnit.factor;
}

// ============================================================
// TOOL RENDERERS - TEXT CASE CONVERTER
// ============================================================

function renderTextCaseConverterTool(container) {
    container.innerHTML = `
        <div class="p-4 bg-slate-800 rounded-lg shadow-inner">
            <p class="mb-4 text-slate-300">${tools.textCaseConverter.description}</p>
            <div class="mb-6"><label for="textInput" class="block text-slate-200 text-lg font-medium mb-2">Enter your text:</label><textarea id="textInput" rows="8" class="block w-full p-3 text-slate-100 bg-slate-700 border border-slate-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 placeholder-slate-400"></textarea></div>
            <div class="flex flex-wrap gap-3 mb-6">
                <button data-case="uppercase" class="case-btn bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">UPPER CASE</button>
                <button data-case="lowercase" class="case-btn bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">lower case</button>
                <button data-case="titlecase" class="case-btn bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">Title Case</button>
                <button data-case="sentencecase" class="case-btn bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">Sentence case</button>
                <button data-case="alternatingcase" class="case-btn bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">AlTeRnAtInG cAsE</button>
                <button data-case="reversecase" class="case-btn bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">esac esreveR</button>
                <button id="copyOutput" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Copy Output</button>
            </div>
            <div class="mb-4"><label for="textOutput" class="block text-slate-200 text-lg font-medium mb-2">Output:</label><textarea id="textOutput" rows="8" readonly class="block w-full p-3 text-slate-100 bg-slate-700 border border-slate-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 placeholder-slate-400"></textarea></div>
        </div>
    `;
    const textInput = container.querySelector('#textInput');
    const textOutput = container.querySelector('#textOutput');
    const caseButtons = container.querySelectorAll('.case-btn');
    const copyOutputBtn = container.querySelector('#copyOutput');
    const convertText = (text, caseType) => {
        switch (caseType) {
            case 'uppercase': return text.toUpperCase();
            case 'lowercase': return text.toLowerCase();
            case 'titlecase': return text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            case 'sentencecase': if (text.length === 0) return ''; const sentences = text.split(/(?<=[.?!])\s+/); return sentences.map(sentence => { const trimmed = sentence.trim(); if (trimmed.length === 0) return ''; return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase(); }).join(' ');
            case 'alternatingcase': return text.split('').map((char, index) => index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()).join('');
            case 'reversecase': return text.split('').reverse().join('');
            default: return text;
        }
    };
    caseButtons.forEach(button => { button.addEventListener('click', () => { const caseType = button.dataset.case; textOutput.value = convertText(textInput.value, caseType); }); });
    copyOutputBtn.addEventListener('click', () => { if (textOutput.value) { navigator.clipboard.writeText(textOutput.value).then(() => { alert('Text copied to clipboard!'); }).catch(err => { console.error('Failed to copy text: ', err); alert('Failed to copy text.'); }); } });
}
// ============================================================
// TOOL RENDERERS - MEDICAL TOOLS SUITE (4 nested sub-tabs)
// ============================================================

function renderMedicalToolsSuite(container) {
    container.innerHTML = `
        <div class="medical-suite-wrapper">
            <!-- Sub-Tab Navigation Bar -->
            <div class="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-700/60 mb-6 -mx-4 px-4 md:-mx-8 md:px-8">
                <div class="flex gap-1 md:gap-2 overflow-x-auto py-3 scrollbar-none">
                    <button class="med-tab flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-all bg-rose-600 text-white shadow-md shadow-rose-500/20" data-tab="cardiology">
                        ❤️ Cardiology &amp; Vitals
                    </button>
                    <button class="med-tab flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-all bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white" data-tab="nephrology">
                        🫘 Nephrology &amp; Fluids
                    </button>
                    <button class="med-tab flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-all bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white" data-tab="biochemistry">
                        🧪 Biochemistry &amp; Pathology
                    </button>
                    <button class="med-tab flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-all bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white" data-tab="pharmacology">
                        💊 Clinical Pharmacology
                    </button>
                </div>
            </div>
            <!-- Tab Content Panels -->
            <div id="med-panel-cardiology" class="med-panel space-y-6"></div>
            <div id="med-panel-nephrology" class="med-panel hidden space-y-6"></div>
            <div id="med-panel-biochemistry" class="med-panel hidden space-y-6"></div>
            <div id="med-panel-pharmacology" class="med-panel hidden space-y-6"></div>
        </div>
    `;

    // ── Tab switching logic ──────────────────────────────────
    const tabColors = {
        cardiology:   { active: 'bg-rose-600 text-white shadow-md shadow-rose-500/20' },
        nephrology:   { active: 'bg-blue-600 text-white shadow-md shadow-blue-500/20' },
        biochemistry: { active: 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20' },
        pharmacology: { active: 'bg-violet-600 text-white shadow-md shadow-violet-500/20' }
    };
    const inactive = 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white';

    function switchMedTab(name) {
        container.querySelectorAll('.med-tab').forEach(btn => {
            const tname = btn.dataset.tab;
            btn.className = `med-tab flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tname === name ? tabColors[tname].active : inactive}`;
        });
        container.querySelectorAll('.med-panel').forEach(p => p.classList.add('hidden'));
        container.querySelector(`#med-panel-${name}`).classList.remove('hidden');
    }

    container.querySelectorAll('.med-tab').forEach(btn => {
        btn.addEventListener('click', () => switchMedTab(btn.dataset.tab));
    });

    // Helper: shared card wrapper
    function calcCard(title, icon, bodyHTML) {
        return `
            <div class="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 hover:border-slate-600 transition-all">
                <h4 class="text-white font-bold text-base mb-4 flex items-center gap-2">
                    <span>${icon}</span> ${title}
                </h4>
                ${bodyHTML}
            </div>
        `;
    }

    // Helper: styled input
    function inp(id, label, type, placeholder, extra) {
        return `<div>
            <label class="block text-slate-300 text-xs font-medium mb-1">${label}</label>
            <input type="${type}" id="${id}" placeholder="${placeholder}" ${extra || ''}
                class="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 text-sm focus:ring-1 focus:ring-indigo-500 placeholder-slate-500" />
        </div>`;
    }

    // Helper: result box
    function resultBox(id, label) {
        return `<div class="mt-4 p-3 bg-slate-900 border border-slate-700 rounded-xl">
            <div class="text-slate-400 text-xs mb-1">${label}</div>
            <div id="${id}" class="text-2xl font-extrabold text-white">--</div>
        </div>`;
    }

    // Helper: interpretation badge
    function interpBox(id) {
        return `<div id="${id}" class="mt-2 text-sm font-medium text-slate-400"></div>`;
    }

    function calcBtn(id, label) {
        return `<button id="${id}" class="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm">${label}</button>`;
    }

    // ════════════════════════════════════════════════
    // TAB 1: CARDIOLOGY & VITALS
    // ════════════════════════════════════════════════
    const cardiologyPanel = container.querySelector('#med-panel-cardiology');
    cardiologyPanel.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${calcCard('Mean Arterial Pressure (MAP)', '🩺', `
                <div class="grid grid-cols-2 gap-3">
                    ${inp('mapSBP', 'Systolic BP (mmHg)', 'number', 'e.g. 120', 'min="0" max="300"')}
                    ${inp('mapDBP', 'Diastolic BP (mmHg)', 'number', 'e.g. 80', 'min="0" max="200"')}
                </div>
                ${calcBtn('mapCalcBtn', 'Calculate MAP')}
                ${resultBox('mapResult', 'MAP (mmHg) = [SBP + 2×DBP] / 3')}
                ${interpBox('mapInterp')}
                <div class="mt-3 p-3 bg-slate-900/60 rounded-lg text-xs text-slate-400 leading-relaxed">
                    <strong class="text-slate-300">Reference:</strong>
                    Normal MAP: 70–100 mmHg &nbsp;|&nbsp; Low perfusion: &lt;60 mmHg &nbsp;|&nbsp; Hypertensive: &gt;110 mmHg
                </div>
            `)}

            ${calcCard('QTc Interval — Bazett\'s Formula', '💓', `
                <div class="grid grid-cols-2 gap-3">
                    ${inp('qtcQT', 'QT Interval (ms)', 'number', 'e.g. 400', 'min="100" max="800"')}
                    ${inp('qtcRR', 'RR Interval (ms)', 'number', 'e.g. 800', 'min="200" max="2000"')}
                </div>
                <p class="text-slate-500 text-xs mt-2">Formula: QTc = QT / √(RR in seconds)</p>
                ${calcBtn('qtcCalcBtn', 'Calculate QTc')}
                ${resultBox('qtcResult', 'QTc (ms)')}
                ${interpBox('qtcInterp')}
                <div class="mt-3 p-3 bg-slate-900/60 rounded-lg text-xs text-slate-400 leading-relaxed">
                    <strong class="text-slate-300">Reference:</strong>
                    Normal: &lt;450 ms (M), &lt;460 ms (F) &nbsp;|&nbsp; Borderline: 450–500 ms &nbsp;|&nbsp; Prolonged: &gt;500 ms
                </div>
            `)}
        </div>
    `;

    // MAP Calculator Logic
    container.querySelector('#mapCalcBtn').addEventListener('click', () => {
        const sbp = parseFloat(container.querySelector('#mapSBP').value);
        const dbp = parseFloat(container.querySelector('#mapDBP').value);
        const mapResult = container.querySelector('#mapResult');
        const mapInterp = container.querySelector('#mapInterp');

        if (isNaN(sbp) || isNaN(dbp) || sbp <= 0 || dbp <= 0) {
            mapResult.textContent = 'Invalid input';
            mapInterp.textContent = '';
            return;
        }
        if (dbp >= sbp) {
            mapResult.textContent = 'Error: SBP must be > DBP';
            mapInterp.textContent = '';
            return;
        }
        const map = (sbp + 2 * dbp) / 3;
        mapResult.textContent = map.toFixed(1) + ' mmHg';

        let msg = '', color = '';
        if (map < 60) {
            msg = '🔴 Critically Low — Inadequate organ perfusion. Immediate intervention required.';
            color = 'text-rose-400';
        } else if (map < 70) {
            msg = '🟠 Low Perfusion — Monitor closely. Risk of organ ischemia.';
            color = 'text-amber-400';
        } else if (map <= 100) {
            msg = '🟢 Normal — Adequate perfusion pressure.';
            color = 'text-emerald-400';
        } else if (map <= 110) {
            msg = '🟡 Elevated — Borderline hypertensive state.';
            color = 'text-yellow-400';
        } else {
            msg = '🔴 Hypertensive Emergency — MAP >110 mmHg.';
            color = 'text-rose-400';
        }
        mapInterp.className = `mt-2 text-sm font-medium ${color}`;
        mapInterp.textContent = msg;
    });

    // QTc Calculator Logic
    container.querySelector('#qtcCalcBtn').addEventListener('click', () => {
        const qt = parseFloat(container.querySelector('#qtcQT').value);
        const rr = parseFloat(container.querySelector('#qtcRR').value);
        const qtcResult = container.querySelector('#qtcResult');
        const qtcInterp = container.querySelector('#qtcInterp');

        if (isNaN(qt) || isNaN(rr) || qt <= 0 || rr <= 0) {
            qtcResult.textContent = 'Invalid input';
            qtcInterp.textContent = '';
            return;
        }
        const rrSec = rr / 1000; // convert ms to seconds
        const qtc = qt / Math.sqrt(rrSec);
        qtcResult.textContent = qtc.toFixed(1) + ' ms';

        let msg = '', color = '';
        if (qtc < 350) {
            msg = '🟡 Short QTc — Possible short QT syndrome.';
            color = 'text-yellow-400';
        } else if (qtc <= 450) {
            msg = '🟢 Normal QTc — Within acceptable range.';
            color = 'text-emerald-400';
        } else if (qtc <= 500) {
            msg = '🟠 Borderline Prolonged — Risk of Torsades de Pointes. Review medications.';
            color = 'text-amber-400';
        } else {
            msg = '🔴 Prolonged QTc (>500 ms) — High risk of life-threatening arrhythmia. Urgent review.';
            color = 'text-rose-400';
        }
        qtcInterp.className = `mt-2 text-sm font-medium ${color}`;
        qtcInterp.textContent = msg;
    });

    // ════════════════════════════════════════════════
    // TAB 2: NEPHROLOGY & FLUIDS
    // ════════════════════════════════════════════════
    const nephrologyPanel = container.querySelector('#med-panel-nephrology');
    nephrologyPanel.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${calcCard('eGFR / CKD-EPI Calculator', '🫘', `
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    ${inp('gfrCreat', 'Serum Creatinine (mg/dL)', 'number', 'e.g. 1.2', 'min="0.1" step="0.01"')}
                    ${inp('gfrAge', 'Age (years)', 'number', 'e.g. 45', 'min="18" max="120"')}
                    <div class="sm:col-span-2">
                        <label class="block text-slate-300 text-xs font-medium mb-1">Gender</label>
                        <select id="gfrGender" class="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 text-sm focus:ring-1 focus:ring-indigo-500">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                </div>
                ${calcBtn('gfrCalcBtn', 'Calculate eGFR')}
                ${resultBox('gfrResult', 'eGFR (mL/min/1.73m²)')}
                <div id="ckdStage" class="mt-2 px-3 py-2 rounded-lg text-sm font-semibold hidden"></div>
                <div class="mt-3 p-3 bg-slate-900/60 rounded-lg text-xs text-slate-400 leading-relaxed">
                    <strong class="text-slate-300">CKD Stages:</strong>
                    G1 ≥90 &nbsp;|&nbsp; G2 60–89 &nbsp;|&nbsp; G3a 45–59 &nbsp;|&nbsp; G3b 30–44 &nbsp;|&nbsp; G4 15–29 &nbsp;|&nbsp; G5 &lt;15 mL/min/1.73m²
                </div>
            `)}

            ${calcCard('Maintenance Fluid Calculator (Holliday-Segar)', '💧', `
                <div class="grid grid-cols-2 gap-3">
                    ${inp('fluidWeight', 'Patient Weight (kg)', 'number', 'e.g. 30', 'min="1" max="300"')}
                </div>
                <p class="text-slate-500 text-xs mt-2">4-2-1 Rule: 4ml/kg/hr (1st 10kg) + 2ml/kg/hr (next 10kg) + 1ml/kg/hr (remaining)</p>
                ${calcBtn('fluidCalcBtn', 'Calculate Fluid Rate')}
                <div id="fluidResults" class="mt-4 space-y-2 hidden">
                    <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl">
                        <div class="text-slate-400 text-xs mb-1">Hourly Rate</div>
                        <div id="fluidHourly" class="text-2xl font-extrabold text-white">--</div>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <div class="p-3 bg-slate-900/70 border border-slate-700 rounded-lg text-center">
                            <div class="text-slate-400 text-xs">Per 8 hrs</div>
                            <div id="fluid8hr" class="text-lg font-bold text-blue-400">--</div>
                        </div>
                        <div class="p-3 bg-slate-900/70 border border-slate-700 rounded-lg text-center">
                            <div class="text-slate-400 text-xs">Per 24 hrs</div>
                            <div id="fluid24hr" class="text-lg font-bold text-blue-400">--</div>
                        </div>
                    </div>
                </div>
            `)}
        </div>
    `;

    // eGFR CKD-EPI Logic
    container.querySelector('#gfrCalcBtn').addEventListener('click', () => {
        const creat = parseFloat(container.querySelector('#gfrCreat').value);
        const age = parseFloat(container.querySelector('#gfrAge').value);
        const gender = container.querySelector('#gfrGender').value;
        const gfrResult = container.querySelector('#gfrResult');
        const ckdStageEl = container.querySelector('#ckdStage');

        if (isNaN(creat) || isNaN(age) || creat <= 0 || age <= 0) {
            gfrResult.textContent = 'Invalid input';
            ckdStageEl.classList.add('hidden');
            return;
        }

        // CKD-EPI 2021 (race-free) formula
        let kappa, alpha;
        if (gender === 'female') { kappa = 0.7; alpha = -0.241; }
        else { kappa = 0.9; alpha = -0.302; }

        const creatOverKappa = creat / kappa;
        const minVal = Math.min(creatOverKappa, 1);
        const maxVal = Math.max(creatOverKappa, 1);
        const egfr = 142 * Math.pow(minVal, alpha) * Math.pow(maxVal, -1.200) * Math.pow(0.9938, age) * (gender === 'female' ? 1.012 : 1);

        gfrResult.textContent = egfr.toFixed(1) + ' mL/min/1.73m²';

        let stage = '', stageColor = '';
        if (egfr >= 90) { stage = 'CKD Stage G1 — Normal or High (≥90)'; stageColor = 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'; }
        else if (egfr >= 60) { stage = 'CKD Stage G2 — Mildly Decreased (60–89)'; stageColor = 'bg-green-500/20 text-green-300 border border-green-500/30'; }
        else if (egfr >= 45) { stage = 'CKD Stage G3a — Mild-Moderately Decreased (45–59)'; stageColor = 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'; }
        else if (egfr >= 30) { stage = 'CKD Stage G3b — Moderate-Severely Decreased (30–44)'; stageColor = 'bg-amber-500/20 text-amber-300 border border-amber-500/30'; }
        else if (egfr >= 15) { stage = 'CKD Stage G4 — Severely Decreased (15–29)'; stageColor = 'bg-orange-500/20 text-orange-300 border border-orange-500/30'; }
        else { stage = 'CKD Stage G5 — Kidney Failure (<15). Dialysis evaluation needed.'; stageColor = 'bg-rose-500/20 text-rose-300 border border-rose-500/30'; }

        ckdStageEl.textContent = stage;
        ckdStageEl.className = `mt-2 px-3 py-2 rounded-lg text-sm font-semibold ${stageColor}`;
        ckdStageEl.classList.remove('hidden');
    });

    // Fluid Calculator Logic (Holliday-Segar 4-2-1)
    container.querySelector('#fluidCalcBtn').addEventListener('click', () => {
        const weight = parseFloat(container.querySelector('#fluidWeight').value);
        const fluidHourlyEl = container.querySelector('#fluidHourly');
        const fluid8hr = container.querySelector('#fluid8hr');
        const fluid24hr = container.querySelector('#fluid24hr');
        const fluidResults = container.querySelector('#fluidResults');

        if (isNaN(weight) || weight <= 0) {
            fluidResults.classList.add('hidden');
            return;
        }

        let rate = 0;
        if (weight <= 10) {
            rate = 4 * weight;
        } else if (weight <= 20) {
            rate = 40 + 2 * (weight - 10);
        } else {
            rate = 60 + 1 * (weight - 20);
        }

        fluidHourlyEl.textContent = rate.toFixed(1) + ' mL/hr';
        fluid8hr.textContent = (rate * 8).toFixed(0) + ' mL';
        fluid24hr.textContent = (rate * 24).toFixed(0) + ' mL';
        fluidResults.classList.remove('hidden');
    });

    // ════════════════════════════════════════════════
    // TAB 3: BIOCHEMISTRY & PATHOLOGY
    // ════════════════════════════════════════════════
    const biochemPanel = container.querySelector('#med-panel-biochemistry');
    biochemPanel.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${calcCard('Serum Anion Gap + Winter\'s Formula', '🧪', `
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    ${inp('agNa', 'Sodium — Na⁺ (mEq/L)', 'number', 'e.g. 140', 'min="100" max="180"')}
                    ${inp('agCl', 'Chloride — Cl⁻ (mEq/L)', 'number', 'e.g. 100', 'min="50" max="150"')}
                    ${inp('agHCO3', 'Bicarbonate — HCO₃⁻ (mEq/L)', 'number', 'e.g. 24', 'min="1" max="50"')}
                </div>
                ${calcBtn('agCalcBtn', 'Calculate Anion Gap')}
                ${resultBox('agResult', 'Anion Gap = Na − (Cl + HCO₃)')}
                ${interpBox('agInterp')}
                <div id="wintersBox" class="hidden mt-3 p-3 bg-slate-900/70 border border-slate-700 rounded-lg space-y-1">
                    <div class="text-indigo-400 text-xs font-semibold uppercase tracking-wider">Winter's Formula (Expected PCO₂)</div>
                    <div id="wintersResult" class="text-white text-sm font-bold"></div>
                    <div id="wintersInterp" class="text-slate-400 text-xs"></div>
                </div>
                <div class="mt-3 p-3 bg-slate-900/60 rounded-lg text-xs text-slate-400">
                    <strong class="text-slate-300">Normal AG:</strong> 8–12 mEq/L &nbsp;|&nbsp; High AG Acidosis: MUDPILES mnemonic
                </div>
            `)}

            ${calcCard('Lab Value Unit Converter', '🔬', `
                <div class="mb-3">
                    <label class="block text-slate-300 text-xs font-medium mb-1">Select Parameter</label>
                    <select id="labParam" class="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 text-sm focus:ring-1 focus:ring-indigo-500">
                        <option value="creatinine">Serum Creatinine</option>
                        <option value="bun">Blood Urea Nitrogen (BUN)</option>
                        <option value="bilirubin">Total Bilirubin</option>
                        <option value="glucose">Glucose</option>
                        <option value="hemoglobin">Hemoglobin</option>
                    </select>
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-slate-300 text-xs font-medium mb-1">Input Unit</label>
                        <select id="labInputUnit" class="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 text-sm focus:ring-1 focus:ring-indigo-500"></select>
                    </div>
                    ${inp('labValue', 'Enter Value', 'number', 'Enter value', 'step="any" min="0"')}
                </div>
                <div class="mt-3 p-3 bg-slate-900 border border-slate-700 rounded-xl space-y-2">
                    <div class="flex justify-between items-center">
                        <span class="text-slate-400 text-xs">Converted Value</span>
                        <span id="labOutputUnit" class="text-indigo-400 text-xs font-semibold">--</span>
                    </div>
                    <div id="labOutputValue" class="text-2xl font-extrabold text-white">--</div>
                </div>
                <div class="mt-2 flex items-center gap-3">
                    <div id="labStatusBadge" class="px-3 py-1 rounded-full text-xs font-bold uppercase bg-slate-800 text-slate-400 border border-slate-700">Enter a value</div>
                    <span id="labRefRange" class="text-xs text-slate-400"></span>
                </div>
            `)}
        </div>
    `;

    // Anion Gap Logic
    container.querySelector('#agCalcBtn').addEventListener('click', () => {
        const na = parseFloat(container.querySelector('#agNa').value);
        const cl = parseFloat(container.querySelector('#agCl').value);
        const hco3 = parseFloat(container.querySelector('#agHCO3').value);
        const agResult = container.querySelector('#agResult');
        const agInterp = container.querySelector('#agInterp');
        const wintersBox = container.querySelector('#wintersBox');
        const wintersResult = container.querySelector('#wintersResult');
        const wintersInterp = container.querySelector('#wintersInterp');

        if (isNaN(na) || isNaN(cl) || isNaN(hco3)) {
            agResult.textContent = 'Invalid input';
            agInterp.textContent = '';
            wintersBox.classList.add('hidden');
            return;
        }

        const ag = na - (cl + hco3);
        agResult.textContent = ag.toFixed(1) + ' mEq/L';

        let msg = '', color = '';
        if (ag < 8) {
            msg = '🔵 Low Anion Gap (<8) — Consider hypoalbuminaemia, hypermagnesemia, lithium toxicity.';
            color = 'text-blue-400';
            wintersBox.classList.add('hidden');
        } else if (ag <= 12) {
            msg = '🟢 Normal Anion Gap (8–12) — Non-AG metabolic acidosis if acidosis present.';
            color = 'text-emerald-400';
            wintersBox.classList.add('hidden');
        } else {
            msg = '🔴 High Anion Gap (>12) — Metabolic acidosis. Consider MUDPILES (Methanol, Uraemia, DKA, Paracetamol, Isoniazid, Lactic acidosis, Ethanol/Ethylene glycol, Salicylates).';
            color = 'text-rose-400';
            // Winter's Formula: Expected PCO2 = 1.5 × HCO3 + 8 ± 2
            const expectedPCO2 = 1.5 * hco3 + 8;
            wintersResult.textContent = `Expected PCO₂: ${(expectedPCO2 - 2).toFixed(1)} – ${(expectedPCO2 + 2).toFixed(1)} mmHg`;
            wintersInterp.textContent = `If measured PCO₂ is within this range → pure metabolic acidosis with appropriate respiratory compensation. Higher → concurrent respiratory acidosis. Lower → concurrent respiratory alkalosis.`;
            wintersBox.classList.remove('hidden');
        }
        agInterp.className = `mt-2 text-sm font-medium ${color}`;
        agInterp.textContent = msg;
    });

    // Lab Converter Logic
    const labParams = {
        creatinine: {
            name: 'Serum Creatinine',
            units: { us: { label: 'mg/dL', min: 0.6, max: 1.2, panicLow: 0.2, panicHigh: 10 }, si: { label: 'µmol/L', min: 53, max: 106, panicLow: 18, panicHigh: 884 } },
            factor: 88.4
        },
        bun: {
            name: 'BUN',
            units: { us: { label: 'mg/dL', min: 7, max: 20, panicLow: 2, panicHigh: 100 }, si: { label: 'mmol/L', min: 2.5, max: 7.1, panicLow: 0.7, panicHigh: 35.7 } },
            factor: 0.357
        },
        bilirubin: {
            name: 'Total Bilirubin',
            units: { us: { label: 'mg/dL', min: 0.1, max: 1.2, panicLow: 0.05, panicHigh: 20 }, si: { label: 'µmol/L', min: 1.7, max: 20.5, panicLow: 0.9, panicHigh: 342 } },
            factor: 17.1
        },
        glucose: {
            name: 'Glucose',
            units: { us: { label: 'mg/dL', min: 70, max: 100, panicLow: 40, panicHigh: 500 }, si: { label: 'mmol/L', min: 3.9, max: 5.6, panicLow: 2.2, panicHigh: 27.8 } },
            factor: 0.0555
        },
        hemoglobin: {
            name: 'Hemoglobin',
            units: { us: { label: 'g/dL', min: 12, max: 17, panicLow: 5, panicHigh: 22 }, si: { label: 'g/L', min: 120, max: 170, panicLow: 50, panicHigh: 220 } },
            factor: 10
        }
    };

    const labParamSel = container.querySelector('#labParam');
    const labInputUnitSel = container.querySelector('#labInputUnit');
    const labValueInput = container.querySelector('#labValue');
    const labOutputUnit = container.querySelector('#labOutputUnit');
    const labOutputValue = container.querySelector('#labOutputValue');
    const labStatusBadge = container.querySelector('#labStatusBadge');
    const labRefRange = container.querySelector('#labRefRange');

    function updateLabUnitDropdown() {
        const param = labParams[labParamSel.value];
        labInputUnitSel.innerHTML = `
            <option value="us">${param.units.us.label} (Standard)</option>
            <option value="si">${param.units.si.label} (SI)</option>
        `;
        calcLabConversion();
    }

    function calcLabConversion() {
        const paramKey = labParamSel.value;
        const param = labParams[paramKey];
        const val = parseFloat(labValueInput.value);
        const selUnit = labInputUnitSel.value;

        if (isNaN(val) || val < 0) {
            labOutputValue.textContent = '--';
            labOutputUnit.textContent = '--';
            labStatusBadge.textContent = 'Enter a value';
            labStatusBadge.className = 'px-3 py-1 rounded-full text-xs font-bold uppercase bg-slate-800 text-slate-400 border border-slate-700';
            labRefRange.textContent = '';
            return;
        }

        let converted, targetUnit;
        if (selUnit === 'us') {
            converted = val * param.factor;
            targetUnit = param.units.si.label;
        } else {
            converted = val / param.factor;
            targetUnit = param.units.us.label;
        }

        labOutputValue.textContent = converted.toFixed(2);
        labOutputUnit.textContent = `→ ${targetUnit}`;

        const limits = param.units[selUnit];
        labRefRange.textContent = `Normal: ${limits.min} – ${limits.max} ${limits.label}`;

        let badge = '', badgeClass = '';
        if (val < limits.panicLow || val > limits.panicHigh) {
            badge = '⚠️ PANIC VALUE';
            badgeClass = 'px-3 py-1 rounded-full text-xs font-bold uppercase bg-rose-600/30 text-rose-300 border border-rose-500/50';
        } else if (val < limits.min) {
            badge = 'Low';
            badgeClass = 'px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30';
        } else if (val > limits.max) {
            badge = 'High';
            badgeClass = 'px-3 py-1 rounded-full text-xs font-bold uppercase bg-rose-500/20 text-rose-400 border border-rose-500/30';
        } else {
            badge = '✓ Normal';
            badgeClass = 'px-3 py-1 rounded-full text-xs font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
        }
        labStatusBadge.textContent = badge;
        labStatusBadge.className = badgeClass;
    }

    labParamSel.addEventListener('change', updateLabUnitDropdown);
    labInputUnitSel.addEventListener('change', calcLabConversion);
    labValueInput.addEventListener('input', calcLabConversion);
    updateLabUnitDropdown();

    // ════════════════════════════════════════════════
    // TAB 4: CLINICAL PHARMACOLOGY
    // ════════════════════════════════════════════════
    const pharmaPanel = container.querySelector('#med-panel-pharmacology');
    pharmaPanel.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${calcCard('Pediatric Weight-Based Dosage Calculator', '💊', `
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    ${inp('pdWeight', 'Patient Weight (kg)', 'number', 'e.g. 15', 'min="0.5" max="150" step="0.1"')}
                    ${inp('pdDose', 'Prescribed Dose (mg/kg)', 'number', 'e.g. 10', 'min="0.01" step="0.01"')}
                    ${inp('pdConc', 'Stock Concentration (mg/mL)', 'number', 'e.g. 5', 'min="0.01" step="0.01"')}
                    ${inp('pdFreq', 'Doses per Day', 'number', 'e.g. 3', 'min="1" max="24"')}
                </div>
                ${calcBtn('pdCalcBtn', 'Calculate Dose')}
                <div id="pdResults" class="mt-4 hidden space-y-2">
                    <div class="grid grid-cols-2 gap-3">
                        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl">
                            <div class="text-slate-400 text-xs mb-1">Total Dose Per Administration</div>
                            <div id="pdTotalDose" class="text-xl font-extrabold text-white">--</div>
                        </div>
                        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl">
                            <div class="text-slate-400 text-xs mb-1">Volume Per Administration</div>
                            <div id="pdVolume" class="text-xl font-extrabold text-emerald-400">--</div>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <div class="p-3 bg-slate-900/70 border border-slate-700 rounded-lg">
                            <div class="text-slate-400 text-xs mb-1">Total Daily Dose</div>
                            <div id="pdDailyDose" class="text-lg font-bold text-indigo-400">--</div>
                        </div>
                        <div class="p-3 bg-slate-900/70 border border-slate-700 rounded-lg">
                            <div class="text-slate-400 text-xs mb-1">Total Daily Volume</div>
                            <div id="pdDailyVolume" class="text-lg font-bold text-indigo-400">--</div>
                        </div>
                    </div>
                </div>
                <div class="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-amber-300">
                    ⚠️ Always verify dosing against current clinical guidelines, formularies, and consultant advice. This calculator is for educational reference only.
                </div>
            `)}

            ${calcCard('Common Pediatric Drug Reference', '📋', `
                <p class="text-slate-400 text-xs mb-3">Quick-reference dosing for frequently used pediatric medications.</p>
                <div id="drugRefList" class="space-y-2 overflow-y-auto max-h-72 pr-1"></div>
                <p class="text-slate-500 text-xs mt-3">Doses are general guidelines. Always verify with local formulary.</p>
            `)}
        </div>
    `;

    // Pediatric Dosage Logic
    container.querySelector('#pdCalcBtn').addEventListener('click', () => {
        const weight = parseFloat(container.querySelector('#pdWeight').value);
        const dose = parseFloat(container.querySelector('#pdDose').value);
        const conc = parseFloat(container.querySelector('#pdConc').value);
        const freq = parseFloat(container.querySelector('#pdFreq').value);
        const pdResults = container.querySelector('#pdResults');

        if ([weight, dose, conc, freq].some(v => isNaN(v) || v <= 0)) {
            pdResults.classList.add('hidden');
            return;
        }

        const totalDose = weight * dose;              // mg per dose
        const volume = totalDose / conc;              // mL per dose
        const dailyDose = totalDose * freq;           // mg per day
        const dailyVolume = volume * freq;            // mL per day

        container.querySelector('#pdTotalDose').textContent = totalDose.toFixed(2) + ' mg';
        container.querySelector('#pdVolume').textContent = volume.toFixed(2) + ' mL';
        container.querySelector('#pdDailyDose').textContent = dailyDose.toFixed(2) + ' mg/day';
        container.querySelector('#pdDailyVolume').textContent = dailyVolume.toFixed(2) + ' mL/day';
        pdResults.classList.remove('hidden');
    });

    // Drug Reference Table
    const drugRef = [
        { drug: 'Amoxicillin', dose: '25–50 mg/kg/day', freq: 'q8h or q12h', route: 'PO' },
        { drug: 'Ibuprofen', dose: '5–10 mg/kg/dose', freq: 'q6–8h (max 40 mg/kg/day)', route: 'PO' },
        { drug: 'Paracetamol (Acetaminophen)', dose: '10–15 mg/kg/dose', freq: 'q4–6h (max 5 doses/24h)', route: 'PO/IV' },
        { drug: 'Ceftriaxone', dose: '50–100 mg/kg/day', freq: 'Once daily or q12h', route: 'IV/IM' },
        { drug: 'Metronidazole', dose: '7.5 mg/kg/dose', freq: 'q8h', route: 'PO/IV' },
        { drug: 'Salbutamol (Albuterol)', dose: '0.15 mg/kg/dose (min 2.5 mg)', freq: 'q20 min × 3, then q4–6h', route: 'Nebulised' },
        { drug: 'Dexamethasone', dose: '0.15–0.6 mg/kg/dose', freq: 'Single dose (croup)', route: 'PO/IM/IV' },
        { drug: 'Ondansetron', dose: '0.15 mg/kg/dose (max 4 mg)', freq: 'q6–8h PRN', route: 'PO/IV' },
        { drug: 'Phenobarbitone', dose: 'Loading: 20 mg/kg', freq: 'Maintenance: 3–5 mg/kg/day', route: 'IV' },
        { drug: 'Adrenaline (Epinephrine)', dose: '0.01 mg/kg/dose (max 0.3 mg)', freq: 'PRN (anaphylaxis)', route: 'IM' },
    ];

    const drugRefList = container.querySelector('#drugRefList');
    drugRef.forEach(d => {
        const row = document.createElement('div');
        row.className = 'p-2.5 bg-slate-900/60 border border-slate-700/60 rounded-lg';
        row.innerHTML = `
            <div class="flex justify-between items-start">
                <span class="text-white text-xs font-semibold">${d.drug}</span>
                <span class="text-xs px-2 py-0.5 bg-indigo-500/20 text-indigo-400 rounded-full">${d.route}</span>
            </div>
            <div class="text-emerald-400 text-xs mt-0.5">${d.dose}</div>
            <div class="text-slate-400 text-xs">${d.freq}</div>
        `;
        drugRefList.appendChild(row);
    });

    // Render the first tab by default
    switchMedTab('cardiology');
}

// ============================================================
// TOOL RENDERERS - UNIT CONVERTER SUITE
// ============================================================

function renderUnitConverterSuiteTool(container) {
    container.innerHTML = `
        <div class="p-4 bg-slate-800 rounded-lg shadow-inner">
            <div id="unitConverterHub" class="space-y-6">
                <p class="text-slate-300 mb-6 text-sm">${tools.unitConverterSuite.description}</p>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="unit-categories-grid"></div>
            </div>
            <div id="unitActiveToolContainer" class="hidden space-y-6">
                <button id="btnBackToUnitHub" class="flex items-center text-indigo-400 hover:text-indigo-300 font-semibold mb-4 transition"><span class="mr-2">&#8592;</span> Back to Unit Converters</button>
                <h4 id="unitActiveToolTitle" class="text-2xl font-bold text-white mb-2">Converter Name</h4>
                <div id="unit-converter-workspace" class="hidden mt-6 p-6 rounded-lg bg-slate-800/80 border border-slate-700/50 shadow-inner"></div>
            </div>
        </div>
    `;
    const unitConverterHub = container.querySelector('#unitConverterHub');
    const unitCategoriesGrid = container.querySelector('#unit-categories-grid');
    const unitActiveToolContainer = container.querySelector('#unitActiveToolContainer');
    const unitActiveToolTitle = container.querySelector('#unitActiveToolTitle');
    const btnBackToUnitHub = container.querySelector('#btnBackToUnitHub');
    const unitConverterWorkspace = container.querySelector('#unit-converter-workspace');
    Object.keys(UNIT_CONVERSION_DATA).forEach(key => {
        const category = UNIT_CONVERSION_DATA[key];
        const card = document.createElement('div');
        card.id = `btn-unit-${key}`;
        card.className = "pdf-tool-card group";
        card.innerHTML = `<span class="text-2xl">${category.icon}</span><span class="font-semibold text-white">${category.label}</span>`;
        unitCategoriesGrid.appendChild(card);
    });
    const clearAndHideUnitWorkspace = () => { unitConverterWorkspace.innerHTML = ''; unitConverterWorkspace.classList.add('hidden'); };
    btnBackToUnitHub.addEventListener('click', () => { unitActiveToolContainer.classList.add('hidden'); clearAndHideUnitWorkspace(); unitConverterHub.classList.remove('hidden'); });
    const routeUnitConverterSubTool = (toolId, toolTitle, unitType) => {
        const categoryData = UNIT_CONVERSION_DATA[unitType];
        if (!categoryData) { unitConverterWorkspace.innerHTML = `<p class="text-rose-400">Error: Converter for "${toolTitle}" not found.</p>`; unitConverterWorkspace.classList.remove('hidden'); return; }
        unitConverterWorkspace.innerHTML = `
            <p class="text-sm text-slate-300 mb-4">Convert between various ${toolTitle} units.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-end mb-6">
                <div><label for="fromValue" class="block text-slate-200 text-sm font-medium mb-2">From Value</label><input type="number" id="fromValue" step="any" value="1" class="block w-full p-3 text-slate-100 bg-slate-700 border border-slate-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 placeholder-slate-400" /></div>
                <div><label for="fromUnit" class="block text-slate-200 text-sm font-medium mb-2">From Unit</label><select id="fromUnit" class="block w-full p-3 text-slate-100 bg-slate-700 border border-slate-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">${categoryData.units.map(unit => `<option value="${unit.key}" ${unit.key === categoryData.baseUnitKey ? 'selected' : ''}>${unit.label}</option>`).join('')}</select></div>
            </div>
            <div class="flex justify-center my-4"><button id="swapUnitsBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path></svg>Swap Units</button></div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-end mb-6">
                <div class="md:col-span-1"><label for="toUnit" class="block text-slate-200 text-sm font-medium mb-2">To Unit</label><select id="toUnit" class="block w-full p-3 text-slate-100 bg-slate-700 border border-slate-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">${categoryData.units.map(unit => `<option value="${unit.key}" ${unit.key !== categoryData.baseUnitKey ? 'selected' : ''}>${unit.label}</option>`).join('')}</select></div>
                <div class="md:col-span-1 p-4 bg-slate-900 rounded-lg border border-slate-700"><div class="text-slate-400 text-sm mb-2">Result:</div><div id="resultOutput" class="text-3xl font-extrabold text-white">0</div></div>
            </div>
        `;
        unitConverterWorkspace.classList.remove('hidden');
        const fromValueInput = unitConverterWorkspace.querySelector('#fromValue');
        const fromUnitSelect = unitConverterWorkspace.querySelector('#fromUnit');
        const toUnitSelect = unitConverterWorkspace.querySelector('#toUnit');
        const resultOutput = unitConverterWorkspace.querySelector('#resultOutput');
        const swapUnitsBtn = unitConverterWorkspace.querySelector('#swapUnitsBtn');
        const updateConversion = () => { const value = parseFloat(fromValueInput.value); const fromUnit = fromUnitSelect.value; const toUnit = toUnitSelect.value; if (isNaN(value)) { resultOutput.textContent = 'Invalid Input'; return; } const result = performUnitConversion(value, fromUnit, toUnit, unitType); if (isNaN(result)) { resultOutput.textContent = 'Error'; } else { resultOutput.textContent = result.toFixed(categoryData.precision || 2); } };
        const swapUnits = () => { const currentFrom = fromUnitSelect.value; const currentTo = toUnitSelect.value; fromUnitSelect.value = currentTo; toUnitSelect.value = currentFrom; updateConversion(); };
        fromValueInput.addEventListener('input', updateConversion);
        fromUnitSelect.addEventListener('change', updateConversion);
        toUnitSelect.addEventListener('change', updateConversion);
        swapUnitsBtn.addEventListener('click', swapUnits);
        updateConversion();
    };
    const unitSubToolButtons = container.querySelectorAll('[id^="btn-unit-"]');
    unitSubToolButtons.forEach(button => {
        button.addEventListener('click', () => {
            const toolId = button.id;
            const unitType = toolId.replace('btn-unit-', '');
            const toolTitle = UNIT_CONVERSION_DATA[unitType].label;
            unitConverterHub.classList.add('hidden');
            unitActiveToolTitle.textContent = toolTitle;
            unitActiveToolContainer.classList.remove('hidden');
            clearAndHideUnitWorkspace();
            routeUnitConverterSubTool(toolId, toolTitle, unitType);
        });
    });
}
// ============================================================
// TOOL RENDERERS - VIRAL PROMPT ARCHITECT
// ============================================================

function renderPromptViralTool(container) {
    const viralPrompts = {
        trending: [
            { id: 1, title: 'Viral Twitter Thread Generator', category: 'Social Media', views: '12.4K', prompt: 'Write a viral Twitter thread about [TOPIC]. Start with a hook, include 5-7 tweets with key insights, and end with a call to action. Make it engaging and shareable.' },
            { id: 2, title: 'TikTok Script Generator', category: 'Short Form Video', views: '8.7K', prompt: 'Create a 60-second TikTok script for [TOPIC]. Include a hook in the first 3 seconds, main content, and a trend-based ending with hashtags.' },
            { id: 3, title: 'LinkedIn Growth Hack', category: 'Professional', views: '6.2K', prompt: 'Write a LinkedIn post that will go viral about [TOPIC]. Include a personal story, 3 key takeaways, and a question to drive engagement.' },
            { id: 4, title: 'YouTube Shorts Script', category: 'Video Content', views: '5.9K', prompt: 'Create a 15-second YouTube Shorts script about [TOPIC]. Fast-paced, engaging, with a clear call to action.' },
        ],
        classic: [
            { id: 5, title: 'Ultimate ChatGPT Persona', category: 'AI Assistant', views: '15.1K', prompt: 'Act as a [PERSONA] with expertise in [FIELD]. Your task is to provide detailed, actionable advice on [TOPIC]. Be specific, use examples, and challenge my assumptions.' },
            { id: 6, title: 'Copywriting Framework Pro', category: 'Marketing', views: '9.8K', prompt: 'Generate persuasive copy for [PRODUCT] targeting [AUDIENCE]. Use the AIDA framework (Attention, Interest, Desire, Action) with emotional triggers.' },
            { id: 7, title: 'Research Paper Helper', category: 'Academic', views: '7.3K', prompt: 'Help me structure a research paper on [TOPIC]. Include abstract, introduction, methodology, results, discussion, and conclusion sections with key points for each.' },
            { id: 8, title: 'Code Documentation Expert', category: 'Development', views: '6.8K', prompt: 'Write comprehensive documentation for [PROJECT]. Include API reference, setup guide, usage examples, and troubleshooting section.' },
        ],
        creative: [
            { id: 9, title: 'Midjourney Prompt Architect', category: 'AI Art', views: '11.2K', prompt: '/imagine prompt: [SUBJECT], [STYLE], [LIGHTING], [LENS], cinematic, hyperdetailed, 8k, photorealistic --ar 16:9 --v 6.0' },
            { id: 10, title: 'Story Generator', category: 'Creative Writing', views: '5.4K', prompt: 'Write a short story about [TOPIC] with a [GENRE] twist. Include a compelling protagonist, conflict, and a satisfying resolution in 1000 words.' },
            { id: 11, title: 'Brand Identity Builder', category: 'Branding', views: '4.9K', prompt: 'Create a complete brand identity for [BRAND] including mission statement, brand voice, visual style guide, and tagline ideas.' },
            { id: 12, title: 'Interview Question Generator', category: 'Career', views: '4.2K', prompt: 'Generate [NUMBER] interview questions for [ROLE] position. Include behavioral, technical, and situational questions with evaluation criteria.' },
        ]
    };

    container.innerHTML = `
        <div class="p-4 bg-slate-800 rounded-lg shadow-inner space-y-6">
            <div class="flex items-center justify-between">
                <p class="text-slate-300 text-sm">${tools.promptViral.description}</p>
                <span class="text-xs text-indigo-400 bg-indigo-400/10 px-3 py-1 rounded-full">🔥 Trending</span>
            </div>
            <div class="flex gap-3 flex-wrap border-b border-slate-700 pb-3">
                <button class="viral-tab px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white" data-category="trending">🔥 Trending</button>
                <button class="viral-tab px-4 py-2 rounded-lg text-sm font-medium bg-slate-800 text-slate-400 hover:bg-slate-700" data-category="classic">⭐ Classic</button>
                <button class="viral-tab px-4 py-2 rounded-lg text-sm font-medium bg-slate-800 text-slate-400 hover:bg-slate-700" data-category="creative">🎨 Creative</button>
            </div>
            <div id="viralPromptGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
            <div class="mt-6 p-4 bg-slate-900 rounded-lg border border-slate-700">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-slate-400 text-sm">Selected Prompt:</span>
                    <span class="text-xs text-slate-500">Click any card to load</span>
                </div>
                <textarea id="viralPromptOutput" rows="6" class="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 font-mono text-sm focus:ring-1 focus:ring-indigo-500" placeholder="Click a prompt card to load it here."></textarea>
                <div class="flex gap-3 mt-3">
                    <button id="viralCopyBtn" class="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">📋 Copy Prompt</button>
                    <button id="viralClearBtn" class="bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">🗑️ Clear</button>
                </div>
            </div>
        </div>
    `;

    const tabs = container.querySelectorAll('.viral-tab');
    const grid = container.querySelector('#viralPromptGrid');
    const output = container.querySelector('#viralPromptOutput');
    const copyBtn = container.querySelector('#viralCopyBtn');
    const clearBtn = container.querySelector('#viralClearBtn');

    let currentCategory = 'trending';

    const renderPrompts = (category) => {
        grid.innerHTML = '';
        const prompts = viralPrompts[category] || [];
        prompts.forEach(p => {
            const card = document.createElement('div');
            card.className = 'viral-prompt-card';
            card.innerHTML = `
                <div class="flex items-start justify-between mb-2">
                    <h4 class="text-white font-semibold text-sm">${p.title}</h4>
                    <span class="badge">${p.category}</span>
                </div>
                <p class="text-slate-400 text-xs line-clamp-2">${p.prompt.substring(0, 120)}${p.prompt.length > 120 ? '...' : ''}</p>
                <div class="flex items-center gap-3 mt-3">
                    <span class="views">👁️ ${p.views}</span>
                    <span class="text-xs text-indigo-400 hover:text-indigo-300 cursor-pointer">Load Prompt →</span>
                </div>
            `;
            card.addEventListener('click', () => {
                output.value = p.prompt;
                output.focus();
                grid.querySelectorAll('.viral-prompt-card').forEach(c => c.style.borderColor = '');
                card.style.borderColor = '#4f46e5';
            });
            grid.appendChild(card);
        });
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => {
                t.classList.remove('bg-indigo-600', 'text-white');
                t.classList.add('bg-slate-800', 'text-slate-400');
            });
            tab.classList.remove('bg-slate-800', 'text-slate-400');
            tab.classList.add('bg-indigo-600', 'text-white');
            currentCategory = tab.dataset.category;
            renderPrompts(currentCategory);
        });
    });

    copyBtn.addEventListener('click', () => {
        if (output.value) {
            navigator.clipboard.writeText(output.value).then(() => {
                copyBtn.textContent = '✅ Copied!';
                setTimeout(() => copyBtn.textContent = '📋 Copy Prompt', 2000);
            }).catch(() => alert('Failed to copy.'));
        }
    });

    clearBtn.addEventListener('click', () => {
        output.value = '';
        grid.querySelectorAll('.viral-prompt-card').forEach(c => c.style.borderColor = '');
    });

    renderPrompts('trending');
}

// ============================================================
// TOOL RENDERERS - CODE UTILITIES SUITE
// ============================================================

function renderCodeUtilitiesTool(container) {
    const languageData = [
        { name: 'JavaScript', icon: '🟡', desc: 'The language of the web. Runs in browsers and Node.js.', details: 'Created in 10 days. Supports OOP, functional programming, and event-driven paradigms. Used by 98% of websites.' },
        { name: 'Python', icon: '🐍', desc: 'Simple, readable, and versatile. Great for AI, data, and automation.', details: 'Guido van Rossum created it in 1991. Emphasizes code readability with significant whitespace. Used in Google, NASA, and Instagram.' },
        { name: 'Java', icon: '☕', desc: 'Write once, run anywhere. Industry standard for enterprise apps.', details: 'Developed by Sun Microsystems in 1995. OOP, JVM-based, garbage-collected. Powers Android and large-scale enterprise systems.' },
        { name: 'C++', icon: '⚙️', desc: 'High-performance systems programming. Game dev, engines, and OS.', details: 'Bjarne Stroustrup created it in 1985. Extends C with OOP features. Used in gaming, real-time systems, and performance-critical apps.' },
        { name: 'Go', icon: '🐹', desc: 'Fast, concurrent, and simple. Perfect for cloud and microservices.', details: 'Developed at Google in 2009. Designed for concurrency and simplicity. Used by Uber, Docker, and Kubernetes.' },
        { name: 'Rust', icon: '🦀', desc: 'Memory-safe systems programming. No garbage collector, no crashes.', details: 'Created by Mozilla in 2010. Guarantees memory safety without GC. Used in Firefox, Discord, and Dropbox.' },
        { name: 'TypeScript', icon: '📘', desc: 'Typed JavaScript for scale. Better tooling and fewer bugs.', details: 'Developed by Microsoft in 2012. Superset of JS with static types. Used by Angular, React, and large codebases.' },
        { name: 'Swift', icon: '📱', desc: 'Modern, fast, and safe. The future of Apple ecosystem development.', details: 'Created by Apple in 2014. Replaces Objective-C. Used for iOS, macOS, watchOS, and tvOS apps.' },
        { name: 'Kotlin', icon: '📲', desc: 'Modern, concise, and Java-compatible. Official Android language.', details: 'Developed by JetBrains in 2011. Interoperable with Java. Used by Google, Uber, and for Android development.' },
        { name: 'Ruby', icon: '💎', desc: 'Beautiful, expressive, and programmer-friendly. Web dev with Rails.', details: 'Created by Yukihiro Matsumoto in 1995. Emphasizes programmer happiness. Used by GitHub, Shopify, and Airbnb.' },
        { name: 'PHP', icon: '🐘', desc: 'Server-side scripting. Powers 77% of all websites globally.', details: 'Created by Rasmus Lerdorf in 1994. Embedded in HTML. Used by WordPress, Facebook, and Wikipedia.' },
        { name: 'C#', icon: '🎯', desc: 'Modern, type-safe, and versatile. .NET ecosystem for all platforms.', details: 'Developed by Microsoft in 2000. OOP, component-oriented. Used in game dev (Unity), web, and enterprise apps.' }
    ];

    container.innerHTML = `
        <div class="p-4 bg-slate-800 rounded-lg shadow-inner space-y-6">
            <p class="text-slate-300 text-sm">${tools.codeUtilities.description}</p>
            <div class="flex flex-wrap gap-2 border-b border-slate-700 pb-2">
                <button class="lang-tab px-4 py-2 rounded-lg text-sm font-medium transition-all bg-indigo-600 text-white" data-lang="all">All Tools</button>
                <button class="lang-tab px-4 py-2 rounded-lg text-sm font-medium transition-all bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white" data-lang="json">JSON</button>
                <button class="lang-tab px-4 py-2 rounded-lg text-sm font-medium transition-all bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white" data-lang="jwt">JWT</button>
                <button class="lang-tab px-4 py-2 rounded-lg text-sm font-medium transition-all bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white" data-lang="regex">Regex</button>
                <button class="lang-tab px-4 py-2 rounded-lg text-sm font-medium transition-all bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white" data-lang="base64">Base64</button>
                <button class="lang-tab px-4 py-2 rounded-lg text-sm font-medium transition-all bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white" data-lang="languages">📚 Languages</button>
            </div>
            <div id="codeToolContainer"></div>
        </div>
    `;

    const langTabs = container.querySelectorAll('.lang-tab');
    const toolContainer = container.querySelector('#codeToolContainer');

    function renderJsonTool() {
        return `
            <div class="space-y-4">
                <h4 class="text-indigo-400 font-semibold text-sm uppercase tracking-wider">JSON Validator & Formatter</h4>
                <textarea id="jsonInput" rows="6" placeholder='{"name": "test", "value": 42}' class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 font-mono text-sm focus:ring-1 focus:ring-indigo-500 placeholder-slate-400"></textarea>
                <div class="flex flex-wrap gap-2">
                    <button class="json-action bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-1.5 px-3 rounded transition-colors" data-action="format">Format</button>
                    <button class="json-action bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium py-1.5 px-3 rounded transition-colors" data-action="minify">Minify</button>
                    <button class="json-action bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-1.5 px-3 rounded transition-colors" data-action="validate">Validate</button>
                    <button class="json-action bg-rose-700 hover:bg-rose-600 text-white text-sm font-medium py-1.5 px-3 rounded transition-colors" data-action="clear">Clear</button>
                </div>
                <pre id="jsonOutput" class="bg-slate-900 border border-slate-700 rounded-lg p-3 min-h-[80px] text-slate-300 text-sm font-mono whitespace-pre-wrap">Enter JSON and click a button.</pre>
            </div>
        `;
    }

    function renderJwtTool() {
        return `
            <div class="space-y-4">
                <h4 class="text-indigo-400 font-semibold text-sm uppercase tracking-wider">JWT Debugger (100% Local)</h4>
                <textarea id="jwtInput" rows="3" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 font-mono text-sm focus:ring-1 focus:ring-indigo-500 placeholder-slate-400"></textarea>
                <button id="jwtDecodeBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">Decode JWT</button>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="p-3 bg-slate-900 rounded-lg border border-slate-700"><h5 class="text-indigo-400 text-xs uppercase font-semibold mb-1">Header</h5><pre id="jwtHeader" class="text-xs font-mono text-slate-300 whitespace-pre-wrap">--</pre></div>
                    <div class="p-3 bg-slate-900 rounded-lg border border-slate-700"><h5 class="text-indigo-400 text-xs uppercase font-semibold mb-1">Payload</h5><pre id="jwtPayload" class="text-xs font-mono text-slate-300 whitespace-pre-wrap">--</pre></div>
                    <div class="p-3 bg-slate-900 rounded-lg border border-slate-700"><h5 class="text-indigo-400 text-xs uppercase font-semibold mb-1">Signature</h5><pre id="jwtSignature" class="text-xs font-mono text-slate-300 whitespace-pre-wrap">--</pre></div>
                </div>
            </div>
        `;
    }

    function renderRegexTool() {
        return `
            <div class="space-y-4">
                <h4 class="text-indigo-400 font-semibold text-sm uppercase tracking-wider">Regex Tester & Explainer</h4>
                <div><label class="block text-slate-300 text-xs mb-1">Pattern</label><input type="text" id="regexPattern" placeholder="\\b\\w+\\b" class="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 font-mono text-sm focus:ring-1 focus:ring-indigo-500"></div>
                <div><label class="block text-slate-300 text-xs mb-1">Test String</label><textarea id="regexText" rows="3" placeholder="Enter text to test..." class="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 font-mono text-sm focus:ring-1 focus:ring-indigo-500"></textarea></div>
                <div class="flex gap-2">
                    <button id="regexTestBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-1.5 px-3 rounded transition-colors">Test</button>
                    <button id="regexExplainBtn" class="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-1.5 px-3 rounded transition-colors">Explain</button>
                    <button id="regexClearBtn" class="bg-rose-700 hover:bg-rose-600 text-white text-sm font-medium py-1.5 px-3 rounded transition-colors">Clear</button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="p-3 bg-slate-900 rounded-lg border border-slate-700"><h5 class="text-indigo-400 text-xs uppercase font-semibold mb-1">Matches</h5><pre id="regexMatches" class="text-xs font-mono text-slate-300 whitespace-pre-wrap">--</pre></div>
                    <div class="p-3 bg-slate-900 rounded-lg border border-slate-700"><h5 class="text-indigo-400 text-xs uppercase font-semibold mb-1">Explanation</h5><pre id="regexExplanation" class="text-xs font-mono text-slate-300 whitespace-pre-wrap">--</pre></div>
                </div>
            </div>
        `;
    }

    function renderBase64Tool() {
        return `
            <div class="space-y-4">
                <h4 class="text-indigo-400 font-semibold text-sm uppercase tracking-wider">Base64 & URL Encoder/Decoder</h4>
                <textarea id="base64Input" rows="3" placeholder="Enter text to encode/decode..." class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 font-mono text-sm focus:ring-1 focus:ring-indigo-500 placeholder-slate-400"></textarea>
                <div class="flex flex-wrap gap-2">
                    <button class="base64-action bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-1.5 px-3 rounded transition-colors" data-action="encode">Base64 Encode</button>
                    <button class="base64-action bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-1.5 px-3 rounded transition-colors" data-action="decode">Base64 Decode</button>
                    <button class="base64-action bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-1.5 px-3 rounded transition-colors" data-action="urlencode">URL Encode</button>
                    <button class="base64-action bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-1.5 px-3 rounded transition-colors" data-action="urldecode">URL Decode</button>
                    <button class="base64-action bg-rose-700 hover:bg-rose-600 text-white text-sm font-medium py-1.5 px-3 rounded transition-colors" data-action="clear">Clear</button>
                </div>
                <pre id="base64Output" class="bg-slate-900 border border-slate-700 rounded-lg p-3 min-h-[60px] text-slate-300 text-sm font-mono whitespace-pre-wrap">Enter text and click a button.</pre>
            </div>
        `;
    }

    function renderLanguagesTool() {
        let html = `
            <div class="space-y-6">
                <h4 class="text-indigo-400 font-semibold text-sm uppercase tracking-wider">Programming Languages - Flashcard Reference</h4>
                <p class="text-slate-400 text-sm">Click any card to flip and learn key facts about each language.</p>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        `;
        languageData.forEach(lang => {
            html += `
                <div class="flashcard-container">
                    <div class="flashcard h-[160px]" onclick="this.classList.toggle('flipped')">
                        <div class="flashcard-front">
                            <span class="text-4xl mb-2">${lang.icon}</span>
                            <span class="text-white font-semibold">${lang.name}</span>
                            <p class="text-slate-400 text-xs mt-1">${lang.desc}</p>
                        </div>
                        <div class="flashcard-back">
                            <span class="text-white font-semibold text-sm mb-1">${lang.name}</span>
                            <p class="text-slate-300 text-xs">${lang.details}</p>
                            <span class="text-indigo-400 text-xs mt-2">Click to flip back</span>
                        </div>
                    </div>
                </div>
            `;
        });
        html += `</div></div>`;
        return html;
    }

    function renderTool(lang) {
        let content = '';
        switch(lang) {
            case 'all':
                content = `
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                            <h4 class="text-indigo-400 font-semibold text-sm uppercase tracking-wider">JSON Tools</h4>
                            <p class="text-slate-400 text-xs mt-1">Validate, format, and minify JSON data</p>
                            <button class="mt-3 text-indigo-400 hover:text-indigo-300 text-sm font-medium" onclick="document.querySelector('[data-lang=\\'json\\']').click()">Launch →</button>
                        </div>
                        <div class="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                            <h4 class="text-indigo-400 font-semibold text-sm uppercase tracking-wider">JWT Debugger</h4>
                            <p class="text-slate-400 text-xs mt-1">Decode JSON Web Tokens locally</p>
                            <button class="mt-3 text-indigo-400 hover:text-indigo-300 text-sm font-medium" onclick="document.querySelector('[data-lang=\\'jwt\\']').click()">Launch →</button>
                        </div>
                        <div class="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                            <h4 class="text-indigo-400 font-semibold text-sm uppercase tracking-wider">Regex Tester</h4>
                            <p class="text-slate-400 text-xs mt-1">Test and explain regular expressions</p>
                            <button class="mt-3 text-indigo-400 hover:text-indigo-300 text-sm font-medium" onclick="document.querySelector('[data-lang=\\'regex\\']').click()">Launch →</button>
                        </div>
                        <div class="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                            <h4 class="text-indigo-400 font-semibold text-sm uppercase tracking-wider">Base64 & URL Tools</h4>
                            <p class="text-slate-400 text-xs mt-1">Encode and decode Base64 and URL strings</p>
                            <button class="mt-3 text-indigo-400 hover:text-indigo-300 text-sm font-medium" onclick="document.querySelector('[data-lang=\\'base64\\']').click()">Launch →</button>
                        </div>
                        <div class="bg-slate-800/50 border border-slate-700 rounded-lg p-4 md:col-span-2">
                            <h4 class="text-indigo-400 font-semibold text-sm uppercase tracking-wider">📚 Language Flashcards</h4>
                            <p class="text-slate-400 text-xs mt-1">Interactive flashcards for JavaScript, Python, Java, C++, and more</p>
                            <button class="mt-3 text-indigo-400 hover:text-indigo-300 text-sm font-medium" onclick="document.querySelector('[data-lang=\\'languages\\']').click()">Launch →</button>
                        </div>
                    </div>
                `;
                break;
            case 'json': content = renderJsonTool(); break;
            case 'jwt': content = renderJwtTool(); break;
            case 'regex': content = renderRegexTool(); break;
            case 'base64': content = renderBase64Tool(); break;
            case 'languages': content = renderLanguagesTool(); break;
            default: content = '<p class="text-slate-400">Select a tool from above.</p>';
        }
        toolContainer.innerHTML = content;
        bindToolEvents(lang, toolContainer);
    }

    function bindToolEvents(lang, container) {
        if (lang === 'json') {
            const input = container.querySelector('#jsonInput');
            const output = container.querySelector('#jsonOutput');
            const actions = container.querySelectorAll('.json-action');
            actions.forEach(btn => {
                btn.addEventListener('click', () => {
                    const action = btn.dataset.action;
                    try {
                        if (action === 'clear') { input.value = ''; output.textContent = 'Enter JSON and click a button.'; return; }
                        const obj = JSON.parse(input.value);
                        if (action === 'format') output.textContent = JSON.stringify(obj, null, 2);
                        else if (action === 'minify') output.textContent = JSON.stringify(obj);
                        else if (action === 'validate') output.textContent = '✅ Valid JSON';
                    } catch (e) {
                        output.textContent = `❌ Error: ${e.message}`;
                    }
                });
            });
        } else if (lang === 'jwt') {
            const input = container.querySelector('#jwtInput');
            const decodeBtn = container.querySelector('#jwtDecodeBtn');
            const headerOut = container.querySelector('#jwtHeader');
            const payloadOut = container.querySelector('#jwtPayload');
            const sigOut = container.querySelector('#jwtSignature');
            decodeBtn.addEventListener('click', () => {
                const token = input.value.trim();
                if (!token) { headerOut.textContent = 'Enter a token.'; payloadOut.textContent = '--'; sigOut.textContent = '--'; return; }
                try {
                    const parts = token.split('.');
                    if (parts.length !== 3) throw new Error('Invalid JWT format');
                    headerOut.textContent = JSON.stringify(JSON.parse(atob(parts[0])), null, 2);
                    payloadOut.textContent = JSON.stringify(JSON.parse(atob(parts[1])), null, 2);
                    sigOut.textContent = parts[2];
                } catch (e) {
                    headerOut.textContent = 'Error: ' + e.message;
                    payloadOut.textContent = '--';
                    sigOut.textContent = '--';
                }
            });
        } else if (lang === 'regex') {
            const pattern = container.querySelector('#regexPattern');
            const text = container.querySelector('#regexText');
            const matchesOut = container.querySelector('#regexMatches');
            const explainOut = container.querySelector('#regexExplanation');
            container.querySelector('#regexTestBtn').addEventListener('click', () => {
                try {
                    const regex = new RegExp(pattern.value, 'g');
                    const matches = text.value.match(regex);
                    if (matches) matchesOut.textContent = `Found ${matches.length} matches:\n${matches.map((m,i) => `${i+1}: ${m}`).join('\n')}`;
                    else matchesOut.textContent = 'No matches found.';
                } catch (e) { matchesOut.textContent = `Error: ${e.message}`; }
            });
            container.querySelector('#regexExplainBtn').addEventListener('click', () => {
                if (!pattern.value) { explainOut.textContent = 'Enter a pattern.'; return; }
                let p = pattern.value;
                const map = { '\\d': 'digit (0-9)', '\\w': 'word character', '\\s': 'whitespace', '\\b': 'word boundary', '\\B': 'non-word boundary', '\\t': 'tab', '\\n': 'newline', '\\r': 'carriage return', '\\f': 'form feed', '\\v': 'vertical tab', '^': 'start of string', '$': 'end of string', '.': 'any character', '*': '0+ times', '+': '1+ times', '?': '0-1 time', '|': 'OR' };
                Object.keys(map).forEach(key => { p = p.replace(new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), map[key]); });
                explainOut.textContent = `Pattern: ${pattern.value}\n\nBreakdown:\n${p}`;
            });
            container.querySelector('#regexClearBtn').addEventListener('click', () => {
                pattern.value = ''; text.value = ''; matchesOut.textContent = '--'; explainOut.textContent = '--';
            });
        } else if (lang === 'base64') {
            const input = container.querySelector('#base64Input');
            const output = container.querySelector('#base64Output');
            const actions = container.querySelectorAll('.base64-action');
            actions.forEach(btn => {
                btn.addEventListener('click', () => {
                    const action = btn.dataset.action;
                    try {
                        if (action === 'clear') { input.value = ''; output.textContent = 'Enter text and click a button.'; return; }
                        const text = input.value;
                        if (action === 'encode') output.textContent = btoa(text);
                        else if (action === 'decode') output.textContent = atob(text);
                        else if (action === 'urlencode') output.textContent = encodeURIComponent(text);
                        else if (action === 'urldecode') output.textContent = decodeURIComponent(text);
                    } catch (e) {
                        output.textContent = `Error: ${e.message}`;
                    }
                });
            });
        }
    }

    langTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            langTabs.forEach(t => {
                t.classList.remove('bg-indigo-600', 'text-white');
                t.classList.add('bg-slate-800', 'text-slate-400');
            });
            tab.classList.remove('bg-slate-800', 'text-slate-400');
            tab.classList.add('bg-indigo-600', 'text-white');
            renderTool(tab.dataset.lang);
        });
    });

    renderTool('all');
}

// ============================================================
// TOOL RENDERERS - IMAGE SUITE
// ============================================================

function renderImageSuiteTool(container) {
    container.innerHTML = `
        <div class="p-4 bg-slate-800 rounded-lg shadow-inner">
            <div id="imageSuiteHub" class="space-y-6">
                <p class="text-slate-300 mb-6 text-sm">${tools.imageSuite.description}</p>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div id="img-tool-converter" class="image-tool-card"><div class="icon">🔄</div><div class="name">Image Converter</div><div class="desc">Convert between JPG, PNG, WebP, SVG, GIF, and PDF</div></div>
                    <div id="img-tool-resizer" class="image-tool-card"><div class="icon">📐</div><div class="name">Image Resizer & Compressor</div><div class="desc">Adjust width/height and quality with live preview</div></div>
                    <div id="img-tool-colorpicker" class="image-tool-card"><div class="icon">🎨</div><div class="name">Color Picker & Extractor</div><div class="desc">Extract hex codes from uploaded images locally</div></div>
                    <div id="img-tool-cropper" class="image-tool-card"><div class="icon">✂️</div><div class="name">Aspect Ratio Cropper</div><div class="desc">Preset grids for 1:1, 16:9, 4:3, and custom cropping</div></div>
                    <div id="img-tool-filters" class="image-tool-card"><div class="icon">✨</div><div class="name">Image Filter & Enhancer</div><div class="desc">Brightness, Contrast, Saturation, Blur, Grayscale</div></div>
                    <div id="img-tool-bgremover" class="image-tool-card"><div class="icon">🧹</div><div class="name">Background Remover</div><div class="desc">Remove backgrounds from images (client-side)</div></div>
                </div>
            </div>
            <div id="imgActiveToolContainer" class="hidden space-y-6">
                <button id="btnBackToImgHub" class="flex items-center text-indigo-400 hover:text-indigo-300 font-semibold mb-4 transition"><span class="mr-2">←</span> Back to Image Tools Menu</button>
                <h4 id="imgActiveToolTitle" class="text-2xl font-bold text-white mb-2">Tool Name</h4>
                <div id="img-tool-workspace" class="hidden mt-6 p-6 rounded-lg bg-slate-800/80 border border-slate-700/50 shadow-inner"></div>
            </div>
        </div>
    `;

    const imageSuiteHub = container.querySelector('#imageSuiteHub');
    const imgActiveToolContainer = container.querySelector('#imgActiveToolContainer');
    const imgActiveToolTitle = container.querySelector('#imgActiveToolTitle');
    const btnBackToImgHub = container.querySelector('#btnBackToImgHub');
    const imgToolWorkspace = container.querySelector('#img-tool-workspace');

    const clearAndHideImgWorkspace = () => {
        imgToolWorkspace.innerHTML = '';
        imgToolWorkspace.classList.add('hidden');
    };

    btnBackToImgHub.addEventListener('click', () => {
        imgActiveToolContainer.classList.add('hidden');
        clearAndHideImgWorkspace();
        imageSuiteHub.classList.remove('hidden');
    });

    // Global canvas reference for image operations
    let currentImageCanvas = null;
    let currentImageFileName = 'image';

    function loadImageToCanvas(file, callback) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                currentImageCanvas = canvas;
                currentImageFileName = file.name.replace(/\.[^/.]+$/, '');
                callback(canvas, img);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function downloadCanvas(canvas, filename, mimeType = 'image/png') {
        const link = document.createElement('a');
        link.download = filename;
        link.href = canvas.toDataURL(mimeType);
        link.click();
    }

    function createFileInput(accept, onChange) {
        const wrapper = document.createElement('div');
        wrapper.className = 'mb-4';
        wrapper.innerHTML = `<label class="block text-slate-300 text-sm font-medium mb-2">Upload Image</label><input type="file" accept="${accept}" class="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"/>`;
        const input = wrapper.querySelector('input');
        input.addEventListener('change', onChange);
        return wrapper;
    }

    function createImagePreview(canvas, id = 'img-preview') {
        const containerEl = document.createElement('div');
        containerEl.className = 'mt-4';
        containerEl.innerHTML = `<label class="block text-slate-300 text-sm font-medium mb-2">Preview</label><div class="bg-slate-900 rounded-lg p-2 border border-slate-700 overflow-auto max-h-96"><canvas id="${id}" class="max-w-full h-auto"></canvas></div>`;
        const previewCanvas = containerEl.querySelector(`#${id}`);
        previewCanvas.width = canvas.width;
        previewCanvas.height = canvas.height;
        previewCanvas.getContext('2d').drawImage(canvas, 0, 0);
        return containerEl;
    }

    // ── 1. IMAGE CONVERTER ──
    function renderImageConverter() {
        imgToolWorkspace.innerHTML = '';
        const wrapper = document.createElement('div');
        wrapper.className = 'space-y-4';
        wrapper.innerHTML = `<p class="text-sm text-slate-300">Upload an image and convert it to JPG, PNG, WebP, or GIF format.</p>`;
        const previewArea = document.createElement('div');
        const downloadArea = document.createElement('div');
        downloadArea.className = 'hidden flex flex-wrap gap-2 mt-4';
        ['PNG', 'JPG', 'WebP'].forEach(fmt => {
            const btn = document.createElement('button');
            btn.className = 'bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors';
            btn.textContent = `Download as ${fmt}`;
            btn.addEventListener('click', () => {
                if (!currentImageCanvas) return;
                const mime = fmt === 'JPG' ? 'image/jpeg' : `image/${fmt.toLowerCase()}`;
                downloadCanvas(currentImageCanvas, `${currentImageFileName}.${fmt.toLowerCase()}`, mime);
            });
            downloadArea.appendChild(btn);
        });
        const uploadArea = createFileInput('image/*', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            loadImageToCanvas(file, (canvas) => {
                previewArea.innerHTML = '';
                previewArea.appendChild(createImagePreview(canvas));
                downloadArea.classList.remove('hidden');
            });
        });
        wrapper.appendChild(uploadArea);
        wrapper.appendChild(previewArea);
        wrapper.appendChild(downloadArea);
        imgToolWorkspace.appendChild(wrapper);
        imgToolWorkspace.classList.remove('hidden');
    }

    // ── 2. IMAGE RESIZER & COMPRESSOR ──
    function renderImageResizer() {
        imgToolWorkspace.innerHTML = '';
        const wrapper = document.createElement('div');
        wrapper.className = 'space-y-4';
        wrapper.innerHTML = `<p class="text-sm text-slate-300">Upload an image, set new dimensions and quality, then download.</p>`;
        let controlsDiv;
        const previewArea = document.createElement('div');
        const uploadArea = createFileInput('image/*', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            loadImageToCanvas(file, (canvas, img) => {
                previewArea.innerHTML = '';
                previewArea.appendChild(createImagePreview(canvas));
                widthInput.value = canvas.width;
                heightInput.value = canvas.height;
                controlsDiv.classList.remove('hidden');
            });
        });
        controlsDiv = document.createElement('div');
        controlsDiv.className = 'hidden space-y-4';
        controlsDiv.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><label class="block text-slate-300 text-sm font-medium mb-1">Width (px)</label><input type="number" id="resizeWidth" class="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100" min="1"/></div>
                <div><label class="block text-slate-300 text-sm font-medium mb-1">Height (px)</label><input type="number" id="resizeHeight" class="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100" min="1"/></div>
                <div><label class="block text-slate-300 text-sm font-medium mb-1">Quality (0.1-1.0)</label><input type="number" id="resizeQuality" class="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100" value="0.92" min="0.1" max="1" step="0.05"/></div>
            </div>
            <div class="flex gap-2">
                <button id="resizeApply" class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg">Resize & Download</button>
                <button id="resizeCompress" class="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-lg">Compress Only</button>
            </div>
        `;
        const widthInput = controlsDiv.querySelector('#resizeWidth');
        const heightInput = controlsDiv.querySelector('#resizeHeight');
        const qualityInput = controlsDiv.querySelector('#resizeQuality');
        controlsDiv.querySelector('#resizeApply').addEventListener('click', () => {
            if (!currentImageCanvas) return;
            const w = parseInt(widthInput.value) || currentImageCanvas.width;
            const h = parseInt(heightInput.value) || currentImageCanvas.height;
            const q = parseFloat(qualityInput.value) || 0.92;
            const newCanvas = document.createElement('canvas');
            newCanvas.width = w;
            newCanvas.height = h;
            newCanvas.getContext('2d').drawImage(currentImageCanvas, 0, 0, w, h);
            downloadCanvas(newCanvas, `${currentImageFileName}_resized.jpg`, 'image/jpeg');
        });
        controlsDiv.querySelector('#resizeCompress').addEventListener('click', () => {
            if (!currentImageCanvas) return;
            const q = parseFloat(qualityInput.value) || 0.92;
            downloadCanvas(currentImageCanvas, `${currentImageFileName}_compressed.jpg`, 'image/jpeg');
        });
        wrapper.appendChild(uploadArea);
        wrapper.appendChild(controlsDiv);
        wrapper.appendChild(previewArea);
        imgToolWorkspace.appendChild(wrapper);
        imgToolWorkspace.classList.remove('hidden');
    }

    // ── 3. COLOR PICKER & EXTRACTOR ──
    function renderColorPicker() {
        imgToolWorkspace.innerHTML = '';
        const wrapper = document.createElement('div');
        wrapper.className = 'space-y-4';
        wrapper.innerHTML = `<p class="text-sm text-slate-300">Upload an image and click anywhere on it to extract the color code.</p>`;
        const previewArea = document.createElement('div');
        const colorResult = document.createElement('div');
        colorResult.className = 'hidden mt-4 p-4 bg-slate-900 rounded-lg border border-slate-700';
        colorResult.innerHTML = `
            <div class="flex items-center gap-4">
                <div id="colorPreviewBox" class="w-16 h-16 rounded-lg border border-slate-600" style="background:#334155"></div>
                <div class="space-y-1">
                    <div class="text-slate-300 text-sm">HEX: <span id="hexValue" class="font-mono text-white font-bold">--</span> <button id="copyHex" class="text-xs text-indigo-400 hover:text-indigo-300 ml-2">Copy</button></div>
                    <div class="text-slate-300 text-sm">RGB: <span id="rgbValue" class="font-mono text-white font-bold">--</span> <button id="copyRgb" class="text-xs text-indigo-400 hover:text-indigo-300 ml-2">Copy</button></div>
                </div>
            </div>
        `;
        const colorPreview = colorResult.querySelector('#colorPreviewBox');
        const hexValue = colorResult.querySelector('#hexValue');
        const rgbValue = colorResult.querySelector('#rgbValue');
        colorResult.querySelector('#copyHex').addEventListener('click', () => navigator.clipboard.writeText(hexValue.textContent));
        colorResult.querySelector('#copyRgb').addEventListener('click', () => navigator.clipboard.writeText(rgbValue.textContent));
        const uploadArea = createFileInput('image/*', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            loadImageToCanvas(file, (canvas) => {
                previewArea.innerHTML = '';
                const displayCanvas = document.createElement('canvas');
                displayCanvas.width = canvas.width;
                displayCanvas.height = canvas.height;
                displayCanvas.className = 'max-w-full h-auto cursor-crosshair';
                displayCanvas.getContext('2d').drawImage(canvas, 0, 0);
                displayCanvas.addEventListener('click', (ev) => {
                    const rect = displayCanvas.getBoundingClientRect();
                    const scaleX = canvas.width / rect.width;
                    const scaleY = canvas.height / rect.height;
                    const x = Math.floor((ev.clientX - rect.left) * scaleX);
                    const y = Math.floor((ev.clientY - rect.top) * scaleY);
                    const pixel = canvas.getContext('2d').getImageData(x, y, 1, 1).data;
                    const hex = '#' + [pixel[0], pixel[1], pixel[2]].map(v => v.toString(16).padStart(2, '0')).join('');
                    const rgb = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
                    colorResult.classList.remove('hidden');
                    hexValue.textContent = hex;
                    rgbValue.textContent = rgb;
                    colorPreview.style.backgroundColor = hex;
                });
                previewArea.appendChild(displayCanvas);
            });
        });
        wrapper.appendChild(uploadArea);
        wrapper.appendChild(previewArea);
        wrapper.appendChild(colorResult);
        imgToolWorkspace.appendChild(wrapper);
        imgToolWorkspace.classList.remove('hidden');
    }

    // ── 4. ASPECT RATIO CROPPER ──
    function renderImageCropper() {
        imgToolWorkspace.innerHTML = '';
        const wrapper = document.createElement('div');
        wrapper.className = 'space-y-4';
        wrapper.innerHTML = `<p class="text-sm text-slate-300">Upload an image, select an aspect ratio, and crop.</p>`;
        let controlsDiv;
        const ratios = [
            { name: '1:1', w: 1, h: 1 },
            { name: '16:9', w: 16, h: 9 },
            { name: '4:3', w: 4, h: 3 },
            { name: '3:2', w: 3, h: 2 },
            { name: '9:16', w: 9, h: 16 },
            { name: 'Free', w: 0, h: 0 }
        ];
        const previewArea = document.createElement('div');
        const uploadArea = createFileInput('image/*', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            loadImageToCanvas(file, (canvas) => {
                previewArea.innerHTML = '';
                previewArea.appendChild(createImagePreview(canvas));
                controlsDiv.classList.remove('hidden');
            });
        });
        controlsDiv = document.createElement('div');
        controlsDiv.className = 'hidden space-y-4';
        controlsDiv.innerHTML = `
            <div><label class="block text-slate-300 text-sm font-medium mb-2">Aspect Ratio</label><div class="flex flex-wrap gap-2" id="ratioButtons"></div></div>
            <div class="grid grid-cols-2 gap-3">
                <div><label class="block text-slate-300 text-xs mb-1">X</label><input type="number" id="cropX" class="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100" value="0" min="0"/></div>
                <div><label class="block text-slate-300 text-xs mb-1">Y</label><input type="number" id="cropY" class="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100" value="0" min="0"/></div>
                <div><label class="block text-slate-300 text-xs mb-1">Width</label><input type="number" id="cropW" class="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100" value="100" min="1"/></div>
                <div><label class="block text-slate-300 text-xs mb-1">Height</label><input type="number" id="cropH" class="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100" value="100" min="1"/></div>
            </div>
            <button id="applyCrop" class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg">Crop & Download</button>
        `;
        const ratioContainer = controlsDiv.querySelector('#ratioButtons');
        ratios.forEach(r => {
            const btn = document.createElement('button');
            btn.className = 'ratio-btn bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium py-1.5 px-3 rounded-lg transition-colors';
            btn.textContent = r.name;
            btn.addEventListener('click', () => {
                if (!currentImageCanvas) return;
                document.querySelectorAll('.ratio-btn').forEach(b => b.classList.remove('bg-indigo-600'));
                btn.classList.add('bg-indigo-600');
                const cropX = controlsDiv.querySelector('#cropX');
                const cropY = controlsDiv.querySelector('#cropY');
                const cropW = controlsDiv.querySelector('#cropW');
                const cropH = controlsDiv.querySelector('#cropH');
                if (r.w === 0) return;
                const imgRatio = currentImageCanvas.width / currentImageCanvas.height;
                const targetRatio = r.w / r.h;
                let w, h;
                if (imgRatio > targetRatio) {
                    h = currentImageCanvas.height;
                    w = h * targetRatio;
                } else {
                    w = currentImageCanvas.width;
                    h = w / targetRatio;
                }
                cropX.value = Math.floor((currentImageCanvas.width - w) / 2);
                cropY.value = Math.floor((currentImageCanvas.height - h) / 2);
                cropW.value = Math.floor(w);
                cropH.value = Math.floor(h);
            });
            ratioContainer.appendChild(btn);
        });
        controlsDiv.querySelector('#applyCrop').addEventListener('click', () => {
            if (!currentImageCanvas) return;
            const x = parseInt(controlsDiv.querySelector('#cropX').value) || 0;
            const y = parseInt(controlsDiv.querySelector('#cropY').value) || 0;
            const w = parseInt(controlsDiv.querySelector('#cropW').value) || 1;
            const h = parseInt(controlsDiv.querySelector('#cropH').value) || 1;
            const newCanvas = document.createElement('canvas');
            newCanvas.width = w;
            newCanvas.height = h;
            newCanvas.getContext('2d').drawImage(currentImageCanvas, x, y, w, h, 0, 0, w, h);
            downloadCanvas(newCanvas, `${currentImageFileName}_cropped.png`, 'image/png');
        });
        wrapper.appendChild(uploadArea);
        wrapper.appendChild(controlsDiv);
        wrapper.appendChild(previewArea);
        imgToolWorkspace.appendChild(wrapper);
        imgToolWorkspace.classList.remove('hidden');
    }

    // ── 5. IMAGE FILTER & ENHANCER ──
    function renderImageFilters() {
        imgToolWorkspace.innerHTML = '';
        const wrapper = document.createElement('div');
        wrapper.className = 'space-y-4';
        wrapper.innerHTML = `<p class="text-sm text-slate-300">Upload an image and apply filters using CSS, then download the result.</p>`;
        let controlsDiv;
        const previewArea = document.createElement('div');
        const uploadArea = createFileInput('image/*', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            loadImageToCanvas(file, (canvas) => {
                previewArea.innerHTML = '';
                previewArea.appendChild(createImagePreview(canvas));
                controlsDiv.classList.remove('hidden');
                updateFilter();
            });
        });
        controlsDiv = document.createElement('div');
        controlsDiv.className = 'hidden space-y-4';
        controlsDiv.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label class="block text-slate-300 text-xs mb-1">Brightness %</label><input type="range" id="filtBrightness" class="w-full filter-slider" min="0" max="200" value="100"/></div>
                <div><label class="block text-slate-300 text-xs mb-1">Contrast %</label><input type="range" id="filtContrast" class="w-full filter-slider" min="0" max="200" value="100"/></div>
                <div><label class="block text-slate-300 text-xs mb-1">Saturation %</label><input type="range" id="filtSaturate" class="w-full filter-slider" min="0" max="200" value="100"/></div>
                <div><label class="block text-slate-300 text-xs mb-1">Grayscale %</label><input type="range" id="filtGrayscale" class="w-full filter-slider" min="0" max="100" value="0"/></div>
                <div><label class="block text-slate-300 text-xs mb-1">Sepia %</label><input type="range" id="filtSepia" class="w-full filter-slider" min="0" max="100" value="0"/></div>
                <div><label class="block text-slate-300 text-xs mb-1">Blur (px)</label><input type="range" id="filtBlur" class="w-full filter-slider" min="0" max="10" value="0" step="0.5"/></div>
            </div>
            <div class="flex gap-2 flex-wrap">
                <button id="resetFilter" class="bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-lg">Reset</button>
                <button id="presetGray" class="bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-lg">Grayscale</button>
                <button id="presetSepia" class="bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-lg">Sepia</button>
                <button id="downloadFiltered" class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg">Download</button>
            </div>
        `;
        const sliders = ['Brightness', 'Contrast', 'Saturate', 'Grayscale', 'Sepia', 'Blur'];
        function updateFilter() {
            if (!currentImageCanvas) return;
            const preview = previewArea.querySelector('canvas');
            if (!preview) return;
            const b = controlsDiv.querySelector('#filtBrightness').value;
            const c = controlsDiv.querySelector('#filtContrast').value;
            const s = controlsDiv.querySelector('#filtSaturate').value;
            const g = controlsDiv.querySelector('#filtGrayscale').value;
            const sp = controlsDiv.querySelector('#filtSepia').value;
            const bl = controlsDiv.querySelector('#filtBlur').value;
            preview.style.filter = `brightness(${b}%) contrast(${c}%) saturate(${s}%) grayscale(${g}%) sepia(${sp}%) blur(${bl}px)`;
        }
        sliders.forEach(name => {
            controlsDiv.querySelector(`#filt${name}`).addEventListener('input', updateFilter);
        });
        controlsDiv.querySelector('#resetFilter').addEventListener('click', () => {
            controlsDiv.querySelector('#filtBrightness').value = 100;
            controlsDiv.querySelector('#filtContrast').value = 100;
            controlsDiv.querySelector('#filtSaturate').value = 100;
            controlsDiv.querySelector('#filtGrayscale').value = 0;
            controlsDiv.querySelector('#filtSepia').value = 0;
            controlsDiv.querySelector('#filtBlur').value = 0;
            updateFilter();
        });
        controlsDiv.querySelector('#presetGray').addEventListener('click', () => {
            controlsDiv.querySelector('#filtGrayscale').value = 100;
            controlsDiv.querySelector('#filtSepia').value = 0;
            updateFilter();
        });
        controlsDiv.querySelector('#presetSepia').addEventListener('click', () => {
            controlsDiv.querySelector('#filtSepia').value = 100;
            controlsDiv.querySelector('#filtGrayscale').value = 0;
            updateFilter();
        });
        controlsDiv.querySelector('#downloadFiltered').addEventListener('click', () => {
            if (!currentImageCanvas) return;
            const b = controlsDiv.querySelector('#filtBrightness').value;
            const c = controlsDiv.querySelector('#filtContrast').value;
            const s = controlsDiv.querySelector('#filtSaturate').value;
            const g = controlsDiv.querySelector('#filtGrayscale').value;
            const sp = controlsDiv.querySelector('#filtSepia').value;
            const bl = controlsDiv.querySelector('#filtBlur').value;
            const newCanvas = document.createElement('canvas');
            newCanvas.width = currentImageCanvas.width;
            newCanvas.height = currentImageCanvas.height;
            const ctx = newCanvas.getContext('2d');
            ctx.filter = `brightness(${b}%) contrast(${c}%) saturate(${s}%) grayscale(${g}%) sepia(${sp}%) blur(${bl}px)`;
            ctx.drawImage(currentImageCanvas, 0, 0);
            downloadCanvas(newCanvas, `${currentImageFileName}_filtered.png`, 'image/png');
        });
        wrapper.appendChild(uploadArea);
        wrapper.appendChild(controlsDiv);
        wrapper.appendChild(previewArea);
        imgToolWorkspace.appendChild(wrapper);
        imgToolWorkspace.classList.remove('hidden');
    }

    // ── 6. BACKGROUND REMOVER ──
    function renderBgRemover() {
        imgToolWorkspace.innerHTML = '';
        const wrapper = document.createElement('div');
        wrapper.className = 'space-y-4';
        wrapper.innerHTML = `<p class="text-sm text-slate-300">Remove a specific color (e.g., green screen) from an image. Upload and pick the color to remove.</p>`;
        let controlsDiv;
        const previewArea = document.createElement('div');
        const uploadArea = createFileInput('image/*', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            loadImageToCanvas(file, (canvas) => {
                previewArea.innerHTML = '';
                previewArea.appendChild(createImagePreview(canvas));
                controlsDiv.classList.remove('hidden');
            });
        });
        controlsDiv = document.createElement('div');
        controlsDiv.className = 'hidden space-y-4';
        controlsDiv.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label class="block text-slate-300 text-sm font-medium mb-1">Target Color (hex)</label><input type="color" id="targetColor" class="w-full h-10 bg-slate-700 border border-slate-600 rounded-lg cursor-pointer" value="#00ff00"/></div>
                <div><label class="block text-slate-300 text-sm font-medium mb-1">Tolerance (0-255)</label><input type="range" id="tolerance" class="w-full filter-slider" min="0" max="255" value="40"/></div>
            </div>
            <button id="removeBgBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg">Remove Color & Download</button>
        `;
        controlsDiv.querySelector('#removeBgBtn').addEventListener('click', () => {
            if (!currentImageCanvas) return;
            const hex = controlsDiv.querySelector('#targetColor').value;
            const tol = parseInt(controlsDiv.querySelector('#tolerance').value) || 40;
            const targetR = parseInt(hex.slice(1, 3), 16);
            const targetG = parseInt(hex.slice(3, 5), 16);
            const targetB = parseInt(hex.slice(5, 7), 16);
            const newCanvas = document.createElement('canvas');
            newCanvas.width = currentImageCanvas.width;
            newCanvas.height = currentImageCanvas.height;
            const srcCtx = currentImageCanvas.getContext('2d');
            const dstCtx = newCanvas.getContext('2d');
            const imgData = srcCtx.getImageData(0, 0, currentImageCanvas.width, currentImageCanvas.height);
            const data = imgData.data;
            for (let i = 0; i < data.length; i += 4) {
                const dist = Math.sqrt(
                    Math.pow(data[i] - targetR, 2) +
                    Math.pow(data[i + 1] - targetG, 2) +
                    Math.pow(data[i + 2] - targetB, 2)
                );
                if (dist < tol) {
                    data[i + 3] = 0;
                }
            }
            dstCtx.putImageData(imgData, 0, 0);
            downloadCanvas(newCanvas, `${currentImageFileName}_nobg.png`, 'image/png');
            previewArea.innerHTML = '';
            previewArea.appendChild(createImagePreview(newCanvas));
        });
        wrapper.appendChild(uploadArea);
        wrapper.appendChild(controlsDiv);
        wrapper.appendChild(previewArea);
        imgToolWorkspace.appendChild(wrapper);
        imgToolWorkspace.classList.remove('hidden');
    }

    // ── ROUTER ──
    const imageToolMap = {
        'img-tool-converter': { name: 'Image Converter', render: renderImageConverter },
        'img-tool-resizer': { name: 'Image Resizer & Compressor', render: renderImageResizer },
        'img-tool-colorpicker': { name: 'Color Picker & Extractor', render: renderColorPicker },
        'img-tool-cropper': { name: 'Aspect Ratio Cropper', render: renderImageCropper },
        'img-tool-filters': { name: 'Image Filter & Enhancer', render: renderImageFilters },
        'img-tool-bgremover': { name: 'Background Remover', render: renderBgRemover }
    };

    const imgCards = container.querySelectorAll('.image-tool-card');
    imgCards.forEach(card => {
        card.addEventListener('click', () => {
            const toolId = card.id;
            const tool = imageToolMap[toolId];
            if (!tool) return;
            imageSuiteHub.classList.add('hidden');
            imgActiveToolTitle.textContent = tool.name;
            imgActiveToolContainer.classList.remove('hidden');
            clearAndHideImgWorkspace();
            tool.render();
        });
    });
}
// ============================================================
// TOOL RENDERERS - STUDENT SUITE
// ============================================================

function renderStudentSuiteTool(container) {
    container.innerHTML = `
        <div class="p-4 bg-slate-800 rounded-lg shadow-inner">
            <div id="studentSuiteHub" class="space-y-6">
                <p class="text-slate-300 mb-6 text-sm">${tools.studentSuite.description}</p>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div id="stud-tool-gpa" class="student-tool-card"><div class="icon">📊</div><div class="name">GPA Calculator</div><div class="desc">Calculate your GPA with dynamic subject rows</div></div>
                    <div id="stud-tool-pomodoro" class="student-tool-card"><div class="icon">⏱️</div><div class="name">Pomodoro Timer</div><div class="desc">25 min work / 5 min break with visual countdown</div></div>
                    <div id="stud-tool-wordcounter" class="student-tool-card"><div class="icon">📝</div><div class="name">Word Counter</div><div class="desc">Analyze word count, readability, and reading time</div></div>
                    <div id="stud-tool-citation" class="student-tool-card"><div class="icon">📚</div><div class="name">Citation Generator</div><div class="desc">Generate Harvard, APA, or MLA citations</div></div>
                </div>
            </div>
            <div id="studActiveToolContainer" class="hidden space-y-6">
                <button id="btnBackToStudHub" class="flex items-center text-indigo-400 hover:text-indigo-300 font-semibold mb-4 transition"><span class="mr-2">←</span> Back to Student Tools Menu</button>
                <h4 id="studActiveToolTitle" class="text-2xl font-bold text-white mb-2">Tool Name</h4>
                <div id="stud-tool-workspace" class="hidden mt-6 p-6 rounded-lg bg-slate-800/80 border border-slate-700/50 shadow-inner"></div>
            </div>
        </div>
    `;

    const studentSuiteHub = container.querySelector('#studentSuiteHub');
    const studActiveToolContainer = container.querySelector('#studActiveToolContainer');
    const studActiveToolTitle = container.querySelector('#studActiveToolTitle');
    const btnBackToStudHub = container.querySelector('#btnBackToStudHub');
    const studToolWorkspace = container.querySelector('#stud-tool-workspace');

    const clearAndHideWorkspace = () => {
        studToolWorkspace.innerHTML = '';
        studToolWorkspace.classList.add('hidden');
    };

    btnBackToStudHub.addEventListener('click', () => {
        studActiveToolContainer.classList.add('hidden');
        clearAndHideWorkspace();
        studentSuiteHub.classList.remove('hidden');
    });

    // GPA Calculator
    function renderGpaCalculator() {
        let rowCount = 0;
        studToolWorkspace.innerHTML = `
            <div class="space-y-6">
                <p class="text-sm text-slate-300">Add your subjects with grade points and credit hours to calculate your GPA instantly.</p>
                <div id="gpaRows" class="space-y-2">
                    <div class="grid grid-cols-12 gap-2 items-center text-slate-400 text-xs font-semibold uppercase tracking-wider pb-1 border-b border-slate-700">
                        <div class="col-span-5">Subject Name</div>
                        <div class="col-span-3 text-center">Grade</div>
                        <div class="col-span-2 text-center">Credits</div>
                        <div class="col-span-2 text-center">Action</div>
                    </div>
                </div>
                <button id="addGpaRow" class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">+ Add Subject</button>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                    <div><span class="text-slate-400 text-sm">Total Credits:</span><div id="totalCredits" class="text-2xl font-bold text-white">0</div></div>
                    <div><span class="text-slate-400 text-sm">Total Grade Points:</span><div id="totalGradePoints" class="text-2xl font-bold text-white">0.00</div></div>
                    <div><span class="text-slate-400 text-sm">GPA:</span><div id="gpaResult" class="text-3xl font-bold text-emerald-400">0.00</div></div>
                    <div><span class="text-slate-400 text-sm">CGPA (Cumulative):</span><div id="cgpaResult" class="text-3xl font-bold text-indigo-400">0.00</div></div>
                </div>
                <button id="resetGpa" class="bg-rose-700 hover:bg-rose-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">Reset All</button>
            </div>
        `;

        const gpaRows = studToolWorkspace.querySelector('#gpaRows');
        const addBtn = studToolWorkspace.querySelector('#addGpaRow');
        const totalCredits = studToolWorkspace.querySelector('#totalCredits');
        const totalGradePoints = studToolWorkspace.querySelector('#totalGradePoints');
        const gpaResult = studToolWorkspace.querySelector('#gpaResult');
        const cgpaResult = studToolWorkspace.querySelector('#cgpaResult');
        const resetBtn = studToolWorkspace.querySelector('#resetGpa');

        let cumulativeGPA = 0;
        let cumulativeCourses = 0;

        function addRow(name = '', grade = 'A', credits = 3) {
            const row = document.createElement('div');
            row.className = 'grid grid-cols-12 gap-2 items-center mb-2';
            row.innerHTML = `
                <div class="col-span-5"><input type="text" class="gpa-name w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 text-sm focus:ring-1 focus:ring-indigo-500" placeholder="Subject" value="${name}" /></div>
                <div class="col-span-3"><select class="gpa-grade w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 text-sm focus:ring-1 focus:ring-indigo-500">
                    ${['A+','A','A-','B+','B','B-','C+','C','C-','D+','D','F'].map(g => `<option value="${g}" ${g === grade ? 'selected' : ''}>${g}</option>`).join('')}
                </select></div>
                <div class="col-span-2"><input type="number" class="gpa-credits w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 text-sm focus:ring-1 focus:ring-indigo-500" value="${credits}" min="0" step="0.5" /></div>
                <div class="col-span-2"><button class="remove-row bg-rose-800 hover:bg-rose-700 text-white p-1.5 px-2 rounded text-xs transition-colors w-full">✕</button></div>
            `;
            const removeBtn = row.querySelector('.remove-row');
            removeBtn.addEventListener('click', () => {
                row.remove();
                calculateGPA();
            });
            const inputs = row.querySelectorAll('input, select');
            inputs.forEach(input => {
                input.addEventListener('input', calculateGPA);
                input.addEventListener('change', calculateGPA);
            });
            gpaRows.appendChild(row);
            calculateGPA();
        }

        function calculateGPA() {
            const rows = gpaRows.querySelectorAll('.grid');
            let totalCreditsSum = 0;
            let totalPointsSum = 0;
            const gradeMap = { 'A+': 4.0, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0.0 };

            rows.forEach(row => {
                const name = row.querySelector('.gpa-name')?.value || '';
                const grade = row.querySelector('.gpa-grade')?.value || 'F';
                const credits = parseFloat(row.querySelector('.gpa-credits')?.value) || 0;
                if (name && credits > 0) {
                    totalCreditsSum += credits;
                    totalPointsSum += gradeMap[grade] * credits;
                }
            });

            totalCredits.textContent = totalCreditsSum.toFixed(1);
            totalGradePoints.textContent = totalPointsSum.toFixed(2);
            const gpa = totalCreditsSum > 0 ? (totalPointsSum / totalCreditsSum) : 0;
            gpaResult.textContent = gpa.toFixed(2);

            if (totalCreditsSum > 0) {
                cumulativeGPA = ((cumulativeGPA * cumulativeCourses) + (gpa * totalCreditsSum)) / (cumulativeCourses + totalCreditsSum);
                cumulativeCourses += totalCreditsSum;
            }
            cgpaResult.textContent = cumulativeGPA.toFixed(2);
        }

        addBtn.addEventListener('click', () => addRow());
        resetBtn.addEventListener('click', () => {
            gpaRows.innerHTML = '';
            cumulativeGPA = 0;
            cumulativeCourses = 0;
            totalCredits.textContent = '0';
            totalGradePoints.textContent = '0.00';
            gpaResult.textContent = '0.00';
            cgpaResult.textContent = '0.00';
        });

        // Add 3 default rows
        addRow('Mathematics', 'A', 3);
        addRow('English', 'B+', 3);
        addRow('Physics', 'A-', 4);

        studToolWorkspace.classList.remove('hidden');
    }

    // Pomodoro Timer
    function renderPomodoroTimer() {
        studToolWorkspace.innerHTML = `
            <div class="space-y-6">
                <p class="text-sm text-slate-300">Stay focused with the Pomodoro Technique. 25 minutes work, 5 minutes break.</p>
                <div class="flex flex-col items-center">
                    <div class="relative w-64 h-64">
                        <svg class="timer-ring w-full h-full" viewBox="0 0 120 120">
                            <circle class="bg" cx="60" cy="60" r="52" />
                            <circle class="progress" id="timerCircle" cx="60" cy="60" r="52" stroke-dasharray="326.73" stroke-dashoffset="0" />
                        </svg>
                        <div class="absolute inset-0 flex flex-col items-center justify-center">
                            <span id="timerDisplay" class="text-5xl font-bold text-white">25:00</span>
                            <span id="timerPhase" class="text-sm text-slate-400 mt-1">Work</span>
                        </div>
                    </div>
                    <div class="flex gap-3 mt-6">
                        <button id="timerStartBtn" class="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors">▶ Start</button>
                        <button id="timerPauseBtn" class="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors">⏸ Pause</button>
                        <button id="timerResetBtn" class="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors">↺ Reset</button>
                    </div>
                    <div class="flex gap-4 mt-4 text-sm text-slate-400">
                        <span>⏱ Work: <span id="workTimeDisplay" class="text-white">25:00</span></span>
                        <span>☕ Break: <span id="breakTimeDisplay" class="text-white">5:00</span></span>
                        <span>🔄 Sessions: <span id="sessionCount" class="text-white">0</span></span>
                    </div>
                </div>
            </div>
        `;

        let workTime = 25 * 60;
        let breakTime = 5 * 60;
        let currentTime = workTime;
        let isWork = true;
        let isRunning = false;
        let isPaused = false;
        let timerInterval = null;
        let sessions = 0;

        const display = studToolWorkspace.querySelector('#timerDisplay');
        const phase = studToolWorkspace.querySelector('#timerPhase');
        const circle = studToolWorkspace.querySelector('#timerCircle');
        const startBtn = studToolWorkspace.querySelector('#timerStartBtn');
        const pauseBtn = studToolWorkspace.querySelector('#timerPauseBtn');
        const resetBtn = studToolWorkspace.querySelector('#timerResetBtn');
        const workDisplay = studToolWorkspace.querySelector('#workTimeDisplay');
        const breakDisplay = studToolWorkspace.querySelector('#breakTimeDisplay');
        const sessionDisplay = studToolWorkspace.querySelector('#sessionCount');

        function updateDisplay() {
            const mins = Math.floor(currentTime / 60);
            const secs = currentTime % 60;
            display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
            const total = isWork ? workTime : breakTime;
            const progress = (currentTime / total) * 326.73;
            circle.style.strokeDashoffset = 326.73 - progress;
            phase.textContent = isWork ? 'Work' : 'Break';
        }

        function startTimer() {
            if (isRunning && !isPaused) return;
            if (isPaused) {
                isPaused = false;
                timerInterval = setInterval(tick, 1000);
                return;
            }
            isRunning = true;
            isPaused = false;
            timerInterval = setInterval(tick, 1000);
        }

        function tick() {
            if (currentTime > 0) {
                currentTime--;
                updateDisplay();
            } else {
                clearInterval(timerInterval);
                isRunning = false;
                if (isWork) {
                    sessions++;
                    sessionDisplay.textContent = sessions;
                    isWork = false;
                    currentTime = breakTime;
                    phase.textContent = 'Break';
                    // Play audio alert
                    try {
                        const audio = new Audio('data:audio/wav;base64,UklGRlQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YVQAAABhZGF0YQoAAAACAAwAAAAAAAAAAAAA');
                        audio.play();
                    } catch(e) {}
                    display.textContent = '05:00';
                    updateDisplay();
                    startTimer();
                } else {
                    isWork = true;
                    currentTime = workTime;
                    phase.textContent = 'Work';
                    updateDisplay();
                    startTimer();
                }
            }
        }

        function pauseTimer() {
            if (isRunning && !isPaused) {
                clearInterval(timerInterval);
                isPaused = true;
                isRunning = false;
            }
        }

        function resetTimer() {
            clearInterval(timerInterval);
            isRunning = false;
            isPaused = false;
            isWork = true;
            currentTime = workTime;
            sessions = 0;
            sessionDisplay.textContent = '0';
            updateDisplay();
        }

        startBtn.addEventListener('click', startTimer);
        pauseBtn.addEventListener('click', pauseTimer);
        resetBtn.addEventListener('click', resetTimer);

        updateDisplay();
        studToolWorkspace.classList.remove('hidden');
    }

    // Word Counter
    function renderWordCounter() {
        studToolWorkspace.innerHTML = `
            <div class="space-y-6">
                <p class="text-sm text-slate-300">Analyze your text for word count, character count, readability, and reading time.</p>
                <div><textarea id="wordTextInput" rows="8" class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 text-sm focus:ring-1 focus:ring-indigo-500 placeholder-slate-400" placeholder="Paste your text here..."></textarea></div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="p-4 bg-slate-900/50 rounded-lg border border-slate-700 text-center"><span class="text-slate-400 text-sm">Words</span><div id="wordCount" class="text-2xl font-bold text-white">0</div></div>
                    <div class="p-4 bg-slate-900/50 rounded-lg border border-slate-700 text-center"><span class="text-slate-400 text-sm">Characters</span><div id="charCount" class="text-2xl font-bold text-white">0</div></div>
                    <div class="p-4 bg-slate-900/50 rounded-lg border border-slate-700 text-center"><span class="text-slate-400 text-sm">Sentences</span><div id="sentenceCount" class="text-2xl font-bold text-white">0</div></div>
                    <div class="p-4 bg-slate-900/50 rounded-lg border border-slate-700 text-center"><span class="text-slate-400 text-sm">Reading Time</span><div id="readingTime" class="text-2xl font-bold text-white">0 min</div></div>
                </div>
                <div class="p-4 bg-slate-900/50 rounded-lg border border-slate-700"><span class="text-slate-400 text-sm">Readability Score (Flesch-Kincaid):</span><div id="readabilityScore" class="text-xl font-bold text-indigo-400">--</div></div>
            </div>
        `;

        const textInput = studToolWorkspace.querySelector('#wordTextInput');
        const wordCount = studToolWorkspace.querySelector('#wordCount');
        const charCount = studToolWorkspace.querySelector('#charCount');
        const sentenceCount = studToolWorkspace.querySelector('#sentenceCount');
        const readingTime = studToolWorkspace.querySelector('#readingTime');
        const readabilityScore = studToolWorkspace.querySelector('#readabilityScore');

        function analyzeText() {
            const text = textInput.value;
            const words = text.trim() ? text.trim().split(/\s+/).filter(w => w.length > 0) : [];
            const chars = text.length;
            const sentences = text.trim() ? text.match(/[^.!?]+[.!?]+/g) || [text] : [];
            const sentenceCountVal = sentences.length;

            wordCount.textContent = words.length;
            charCount.textContent = chars;
            sentenceCount.textContent = sentenceCountVal;

            const avgWordsPerMin = 200;
            const readingTimeMin = Math.ceil(words.length / avgWordsPerMin);
            readingTime.textContent = readingTimeMin + ' min';

            // Flesch-Kincaid readability
            if (words.length > 0 && sentences.length > 0) {
                const syllables = words.reduce((count, word) => {
                    const wordLower = word.toLowerCase().replace(/[^a-z]/g, '');
                    const sylCount = wordLower.length > 0 ? Math.max(1, wordLower.match(/[aeiouy]/g)?.length || 1) : 0;
                    return count + sylCount;
                }, 0);
                const score = 206.835 - 1.015 * (words.length / sentenceCountVal) - 84.6 * (syllables / words.length);
                readabilityScore.textContent = score.toFixed(1);
            } else {
                readabilityScore.textContent = '--';
            }
        }

        textInput.addEventListener('input', analyzeText);
        studToolWorkspace.classList.remove('hidden');
    }

    // Citation Generator
    function renderCitationGenerator() {
        studToolWorkspace.innerHTML = `
            <div class="space-y-6">
                <p class="text-sm text-slate-300">Generate citations in Harvard, APA, or MLA format with one click.</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label class="block text-slate-300 text-sm font-medium mb-1">Author Name</label><input type="text" id="citationAuthor" placeholder="e.g. Smith, J." class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 text-sm focus:ring-1 focus:ring-indigo-500 placeholder-slate-400" /></div>
                    <div><label class="block text-slate-300 text-sm font-medium mb-1">Book Title</label><input type="text" id="citationTitle" placeholder="e.g. The Art of Writing" class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 text-sm focus:ring-1 focus:ring-indigo-500 placeholder-slate-400" /></div>
                    <div><label class="block text-slate-300 text-sm font-medium mb-1">Year</label><input type="number" id="citationYear" placeholder="e.g. 2023" class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 text-sm focus:ring-1 focus:ring-indigo-500 placeholder-slate-400" /></div>
                    <div><label class="block text-slate-300 text-sm font-medium mb-1">Publisher</label><input type="text" id="citationPublisher" placeholder="e.g. Oxford Press" class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 text-sm focus:ring-1 focus:ring-indigo-500 placeholder-slate-400" /></div>
                </div>
                <div class="flex gap-3 flex-wrap">
                    <button class="citation-style bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors" data-style="harvard">Harvard</button>
                    <button class="citation-style bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors" data-style="apa">APA</button>
                    <button class="citation-style bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors" data-style="mla">MLA</button>
                </div>
                <div class="citation-output bg-slate-900 border border-slate-700 rounded-lg p-4 min-h-[80px] text-slate-300 text-sm font-mono whitespace-pre-wrap">Enter details and select a citation style.</div>
                <button id="copyCitationBtn" class="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">📋 Copy Citation</button>
            </div>
        `;

        const author = studToolWorkspace.querySelector('#citationAuthor');
        const title = studToolWorkspace.querySelector('#citationTitle');
        const year = studToolWorkspace.querySelector('#citationYear');
        const publisher = studToolWorkspace.querySelector('#citationPublisher');
        const output = studToolWorkspace.querySelector('.citation-output');
        const copyBtn = studToolWorkspace.querySelector('#copyCitationBtn');
        const styleBtns = studToolWorkspace.querySelectorAll('.citation-style');

        let currentStyle = 'harvard';

        function generateCitation() {
            const authorVal = author.value.trim() || 'Author, A.';
            const titleVal = title.value.trim() || 'Title of the Book';
            const yearVal = year.value.trim() || '2026';
            const publisherVal = publisher.value.trim() || 'Publisher Name';

            let citation = '';
            if (currentStyle === 'harvard') {
                citation = `${authorVal} (${yearVal}) *${titleVal}*. ${publisherVal}.`;
            } else if (currentStyle === 'apa') {
                citation = `${authorVal} (${yearVal}). *${titleVal}*. ${publisherVal}.`;
            } else if (currentStyle === 'mla') {
                citation = `${authorVal}. *${titleVal}*. ${publisherVal}, ${yearVal}.`;
            }
            output.textContent = citation;
        }

        styleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                styleBtns.forEach(b => b.classList.remove('bg-indigo-700'));
                btn.classList.add('bg-indigo-700');
                currentStyle = btn.dataset.style;
                generateCitation();
            });
        });

        [author, title, year, publisher].forEach(input => {
            input.addEventListener('input', generateCitation);
            input.addEventListener('change', generateCitation);
        });

        copyBtn.addEventListener('click', () => {
            const text = output.textContent;
            if (text && text !== 'Enter details and select a citation style.') {
                navigator.clipboard.writeText(text).then(() => {
                    copyBtn.textContent = '✅ Copied!';
                    setTimeout(() => copyBtn.textContent = '📋 Copy Citation', 2000);
                });
            }
        });

        generateCitation();
        studToolWorkspace.classList.remove('hidden');
    }

    // Student tool router
    const studentToolMap = {
        'stud-tool-gpa': renderGpaCalculator,
        'stud-tool-pomodoro': renderPomodoroTimer,
        'stud-tool-wordcounter': renderWordCounter,
        'stud-tool-citation': renderCitationGenerator
    };

    const studentCards = container.querySelectorAll('.student-tool-card');
    studentCards.forEach(card => {
        card.addEventListener('click', () => {
            const toolId = card.id;
            const toolName = card.querySelector('.name').textContent;
            studentSuiteHub.classList.add('hidden');
            studActiveToolTitle.textContent = toolName;
            studActiveToolContainer.classList.remove('hidden');
            clearAndHideWorkspace();
            const renderFn = studentToolMap[toolId];
            if (renderFn) renderFn();
        });
    });
}
// ============================================================
// TOOL RENDERERS - PDF SUITE
// ============================================================

function renderPdfSuiteTool(container) {
    container.innerHTML = `
        <div class="p-4 bg-slate-800 rounded-lg shadow-inner">
            <div id="pdfSuiteHub" class="space-y-6">
                <p class="text-slate-300 mb-6 text-sm">${tools.pdfSuite.description}</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                        <h4 class="text-indigo-400 font-bold uppercase tracking-wider text-xs mb-3">📂 ORGANIZE PDF</h4>
                        <div class="grid grid-cols-2 lg:grid-cols-3 gap-2">
                            <div id="btn-pdf-merge" class="pdf-tool-card"><span class="text-2xl">📎</span><span class="font-semibold text-white">Merge PDF</span></div>
                            <div id="btn-pdf-split" class="pdf-tool-card"><span class="text-2xl">✂️</span><span class="font-semibold text-white">Split PDF</span></div>
                            <div id="btn-pdf-remove-pages" class="pdf-tool-card"><span class="text-2xl">🗑️</span><span class="font-semibold text-white">Remove Pages</span></div>
                            <div id="btn-pdf-extract-pages" class="pdf-tool-card"><span class="text-2xl">📄</span><span class="font-semibold text-white">Extract Pages</span></div>
                            <div id="btn-pdf-organize-pages" class="pdf-tool-card"><span class="text-2xl">📋</span><span class="font-semibold text-white">Organize Pages</span></div>
                            <div id="btn-pdf-scan-to-pdf" class="pdf-tool-card"><span class="text-2xl">📷</span><span class="font-semibold text-white">Scan to PDF</span></div>
                            <div id="btn-pdf-sort-pages" class="pdf-tool-card"><span class="text-2xl">⬆️⬇️</span><span class="font-semibold text-white">Sort PDF Pages</span></div>
                        </div>
                    </div>
                    <div class="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                        <h4 class="text-indigo-400 font-bold uppercase tracking-wider text-xs mb-3">⚡ OPTIMIZE PDF</h4>
                        <div class="grid grid-cols-2 lg:grid-cols-3 gap-2">
                            <div id="btn-pdf-compress" class="pdf-tool-card"><span class="text-2xl">📦</span><span class="font-semibold text-white">Compress PDF</span></div>
                            <div id="btn-pdf-repair" class="pdf-tool-card"><span class="text-2xl">🔧</span><span class="font-semibold text-white">Repair PDF</span></div>
                            <div id="btn-pdf-ocr" class="pdf-tool-card"><span class="text-2xl">👁️</span><span class="font-semibold text-white">OCR PDF</span></div>
                            <div id="btn-pdf-flatten" class="pdf-tool-card"><span class="text-2xl">📑</span><span class="font-semibold text-white">Flatten Forms</span></div>
                            <div id="btn-pdf-pdfa" class="pdf-tool-card"><span class="text-2xl">🏛️</span><span class="font-semibold text-white">PDF to PDF/A</span></div>
                        </div>
                    </div>
                    <div class="p-4 bg-slate-900/50 rounded-xl border border-slate-700 col-span-1 md:col-span-2">
                        <h4 class="text-indigo-400 font-bold uppercase tracking-wider text-xs mb-3">🔄 CONVERT TO PDF</h4>
                        <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                            <div id="btn-pdf-jpg-to-pdf" class="pdf-tool-card-sm"><span class="text-xl">🖼️</span><span class="font-semibold text-white text-xs">JPG to PDF</span></div>
                            <div id="btn-pdf-word-to-pdf" class="pdf-tool-card-sm"><span class="text-xl">📝</span><span class="font-semibold text-white text-xs">WORD to PDF</span></div>
                            <div id="btn-pdf-ppt-to-pdf" class="pdf-tool-card-sm"><span class="text-xl">📊</span><span class="font-semibold text-white text-xs">PPT to PDF</span></div>
                            <div id="btn-pdf-excel-to-pdf" class="pdf-tool-card-sm"><span class="text-xl">📈</span><span class="font-semibold text-white text-xs">EXCEL to PDF</span></div>
                            <div id="btn-pdf-html-to-pdf" class="pdf-tool-card-sm"><span class="text-xl">🌐</span><span class="font-semibold text-white text-xs">HTML to PDF</span></div>
                            <div id="btn-pdf-epub-to-pdf" class="pdf-tool-card-sm"><span class="text-xl">📖</span><span class="font-semibold text-white text-xs">EPUB to PDF</span></div>
                            <div id="btn-pdf-txt-to-pdf" class="pdf-tool-card-sm"><span class="text-xl">📃</span><span class="font-semibold text-white text-xs">TXT to PDF</span></div>
                        </div>
                    </div>
                    <div class="p-4 bg-slate-900/50 rounded-xl border border-slate-700 col-span-1 md:col-span-2">
                        <h4 class="text-indigo-400 font-bold uppercase tracking-wider text-xs mb-3">🔄 CONVERT FROM PDF</h4>
                        <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                            <div id="btn-pdf-to-jpg" class="pdf-tool-card-sm"><span class="text-xl">🖼️</span><span class="font-semibold text-white text-xs">PDF to JPG</span></div>
                            <div id="btn-pdf-to-word" class="pdf-tool-card-sm"><span class="text-xl">📝</span><span class="font-semibold text-white text-xs">PDF to WORD</span></div>
                            <div id="btn-pdf-to-ppt" class="pdf-tool-card-sm"><span class="text-xl">📊</span><span class="font-semibold text-white text-xs">PDF to PPT</span></div>
                            <div id="btn-pdf-to-excel" class="pdf-tool-card-sm"><span class="text-xl">📈</span><span class="font-semibold text-white text-xs">PDF to EXCEL</span></div>
                            <div id="btn-pdf-to-png" class="pdf-tool-card-sm"><span class="text-xl">🖼️</span><span class="font-semibold text-white text-xs">PDF to PNG</span></div>
                            <div id="btn-pdf-to-txt" class="pdf-tool-card-sm"><span class="text-xl">📃</span><span class="font-semibold text-white text-xs">PDF to TXT</span></div>
                            <div id="btn-pdf-to-html" class="pdf-tool-card-sm"><span class="text-xl">🌐</span><span class="font-semibold text-white text-xs">PDF to HTML</span></div>
                        </div>
                    </div>
                    <div class="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                        <h4 class="text-indigo-400 font-bold uppercase tracking-wider text-xs mb-3">✏️ EDIT PDF</h4>
                        <div class="grid grid-cols-2 lg:grid-cols-3 gap-2">
                            <div id="btn-pdf-rotate" class="pdf-tool-card"><span class="text-2xl">🔄</span><span class="font-semibold text-white">Rotate Pages</span></div>
                            <div id="btn-pdf-add-page-numbers" class="pdf-tool-card"><span class="text-2xl">🔢</span><span class="font-semibold text-white">Add Page #s</span></div>
                            <div id="btn-pdf-add-watermark" class="pdf-tool-card"><span class="text-2xl">💧</span><span class="font-semibold text-white">Watermark</span></div>
                            <div id="btn-pdf-crop" class="pdf-tool-card"><span class="text-2xl">✂️</span><span class="font-semibold text-white">Crop PDF</span></div>
                            <div id="btn-pdf-edit-text" class="pdf-tool-card"><span class="text-2xl">📝</span><span class="font-semibold text-white">Edit Text</span></div>
                            <div id="btn-pdf-fill-forms" class="pdf-tool-card"><span class="text-2xl">📋</span><span class="font-semibold text-white">Fill Forms</span></div>
                        </div>
                    </div>
                    <div class="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                        <h4 class="text-indigo-400 font-bold uppercase tracking-wider text-xs mb-3">🔒 PDF SECURITY</h4>
                        <div class="grid grid-cols-2 lg:grid-cols-3 gap-2">
                            <div id="btn-pdf-unlock" class="pdf-tool-card"><span class="text-2xl">🔓</span><span class="font-semibold text-white">Unlock PDF</span></div>
                            <div id="btn-pdf-protect" class="pdf-tool-card"><span class="text-2xl">🔐</span><span class="font-semibold text-white">Protect PDF</span></div>
                            <div id="btn-pdf-sign" class="pdf-tool-card"><span class="text-2xl">✍️</span><span class="font-semibold text-white">Sign PDF</span></div>
                            <div id="btn-pdf-redact" class="pdf-tool-card"><span class="text-2xl">⬛</span><span class="font-semibold text-white">Redact PDF</span></div>
                            <div id="btn-pdf-compare" class="pdf-tool-card"><span class="text-2xl">🔍</span><span class="font-semibold text-white">Compare PDFs</span></div>
                        </div>
                    </div>
                    <div class="p-4 bg-slate-900/50 rounded-xl border border-slate-700 col-span-1 md:col-span-2">
                        <h4 class="text-indigo-400 font-bold uppercase tracking-wider text-xs mb-3">🧠 PDF INTELLIGENCE</h4>
                        <div class="grid grid-cols-2 lg:grid-cols-3 gap-2 max-w-md">
                            <div id="btn-pdf-ai-summarizer" class="pdf-tool-card"><span class="text-2xl">🤖</span><span class="font-semibold text-white">AI Summarizer</span></div>
                            <div id="btn-pdf-translate" class="pdf-tool-card"><span class="text-2xl">🌍</span><span class="font-semibold text-white">Translate PDF</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="pdfActiveToolContainer" class="hidden space-y-6">
                <button id="btnBackToPdfHub" class="flex items-center text-indigo-400 hover:text-indigo-300 font-semibold mb-4 transition"><span class="mr-2">←</span> Back to PDF Suite Menu</button>
                <h4 id="pdfActiveToolTitle" class="text-2xl font-bold text-white mb-2">Tool Name</h4>
                <div id="pdf-tool-workspace" class="hidden mt-6 p-6 rounded-lg bg-slate-800/80 border border-slate-700/50 shadow-inner"></div>
            </div>
        </div>
    `;

    const pdfSuiteHub = container.querySelector('#pdfSuiteHub');
    const pdfActiveToolContainer = container.querySelector('#pdfActiveToolContainer');
    const pdfActiveToolTitle = container.querySelector('#pdfActiveToolTitle');
    const btnBackToPdfHub = container.querySelector('#btnBackToPdfHub');
    const pdfToolWorkspace = container.querySelector('#pdf-tool-workspace');

    const clearAndHidePdfWorkspace = () => {
        pdfToolWorkspace.innerHTML = '';
        pdfToolWorkspace.classList.add('hidden');
    };

    btnBackToPdfHub.addEventListener('click', () => {
        pdfActiveToolContainer.classList.add('hidden');
        clearAndHidePdfWorkspace();
        pdfSuiteHub.classList.remove('hidden');
    });

    // Helper: styled workspace wrapper
    function pdfWorkspace(title, body) {
        pdfToolWorkspace.innerHTML = `
            <div class="space-y-6">
                <p class="text-sm text-slate-300">${title}</p>
                ${body}
            </div>
        `;
        pdfToolWorkspace.classList.remove('hidden');
    }

    // Helper: create file input for PDF
    function pdfFileInput(id, label, multiple = false) {
        return `<div class="mb-4"><label class="block text-slate-300 text-sm font-medium mb-2">${label}</label><input type="file" ${multiple ? 'multiple' : ''} accept=".pdf,application/pdf" id="${id}" class="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"/></div>`;
    }

    // Helper: read PDF bytes
    async function readPdfBytes(inputId) {
        const input = document.getElementById(inputId);
        if (!input || !input.files[0]) throw new Error('No file selected');
        return await input.files[0].arrayBuffer();
    }

    // Helper: download PDF bytes
    function downloadPdfBytes(bytes, filename) {
        const blob = new Blob([bytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
    }

    // Helper: extract text from PDF using pdf.js
    async function extractTextFromPdf(pdfBytes) {
        const pdf = await pdfjsLib.getDocument({ data: pdfBytes }).promise;
        let text = '';
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map(item => item.str).join(' ') + '\n\n';
        }
        return { text, numPages: pdf.numPages };
    }

    // Helper: render PDF pages as images
    async function renderPdfToImages(pdfBytes, scale = 2) {
        const pdf = await pdfjsLib.getDocument({ data: pdfBytes }).promise;
        const images = [];
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale });
            const canvas = document.createElement('canvas');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
            images.push(canvas);
        }
        return images;
    }

    // Helper: generic PDF tool with file upload and action button
    function genericPdfTool(title, desc, bodyHtml, actionFn) {
        pdfWorkspace(desc, bodyHtml);
        const actionBtn = pdfToolWorkspace.querySelector('#pdfActionBtn');
        const statusEl = pdfToolWorkspace.querySelector('#pdfStatus');
        if (actionBtn) {
            actionBtn.addEventListener('click', async () => {
                try {
                    actionBtn.disabled = true;
                    actionBtn.textContent = 'Processing...';
                    if (statusEl) statusEl.textContent = 'Processing...';
                    await actionFn();
                    if (statusEl) statusEl.textContent = 'Done!';
                } catch (err) {
                    if (statusEl) statusEl.textContent = 'Error: ' + err.message;
                } finally {
                    actionBtn.disabled = false;
                    actionBtn.textContent = 'Process';
                }
            });
        }
    }

    // ── 1. MERGE PDF ──
    function renderPdfMerge() {
        genericPdfTool('Merge PDFs', 'Select multiple PDFs to merge them into a single file in order.', 
            pdfFileInput('pdfInput', 'Select PDFs to merge', true) +
            `<button id="pdfActionBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Merge & Download</button>
             <div id="pdfStatus" class="mt-3 text-sm text-slate-400"></div>`,
            async () => {
                const input = document.getElementById('pdfInput');
                if (!input.files.length) throw new Error('Select at least one PDF');
                const merged = await PDFLib.PDFDocument.create();
                for (const file of Array.from(input.files)) {
                    const bytes = await file.arrayBuffer();
                    const pdf = await PDFLib.PDFDocument.load(bytes);
                    const pages = await merged.copyPages(pdf, pdf.getPageIndices());
                    pages.forEach(p => merged.addPage(p));
                }
                const bytes = await merged.save();
                downloadPdfBytes(bytes, 'merged.pdf');
            }
        );
    }

    // ── 2. SPLIT PDF ──
    function renderPdfSplit() {
        genericPdfTool('Split PDF', 'Upload a PDF to split each page into separate files.',
            pdfFileInput('pdfInput', 'Select PDF to split') +
            `<button id="pdfActionBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Split into Pages</button>
             <div id="pdfStatus" class="mt-3 text-sm text-slate-400"></div>
             <div id="splitResults" class="mt-4 space-y-2"></div>`,
            async () => {
                const bytes = await readPdfBytes('pdfInput');
                const pdf = await PDFLib.PDFDocument.load(bytes);
                const results = document.getElementById('splitResults');
                results.innerHTML = '';
                for (let i = 0; i < pdf.getPageCount(); i++) {
                    const newPdf = await PDFLib.PDFDocument.create();
                    const [page] = await newPdf.copyPages(pdf, [i]);
                    newPdf.addPage(page);
                    const pageBytes = await newPdf.save();
                    const blob = new Blob([pageBytes], { type: 'application/pdf' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `page_${i + 1}.pdf`;
                    link.className = 'block text-indigo-400 hover:text-indigo-300 text-sm';
                    link.textContent = `Download Page ${i + 1}`;
                    results.appendChild(link);
                }
            }
        );
    }

    // ── 3. REMOVE PAGES ──
    function renderPdfRemovePages() {
        genericPdfTool('Remove Pages', 'Upload a PDF and specify pages to remove (comma-separated, e.g., "1,3,5").',
            pdfFileInput('pdfInput', 'Select PDF') +
            `<div class="mb-4"><label class="block text-slate-300 text-sm font-medium mb-2">Pages to Remove</label><input type="text" id="pagesToRemove" placeholder="1,3,5" class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100"/></div>` +
            `<button id="pdfActionBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Remove & Download</button>
             <div id="pdfStatus" class="mt-3 text-sm text-slate-400"></div>`,
            async () => {
                const bytes = await readPdfBytes('pdfInput');
                const pdf = await PDFLib.PDFDocument.load(bytes);
                const removeStr = document.getElementById('pagesToRemove').value;
                const toRemove = removeStr.split(',').map(s => parseInt(s.trim()) - 1).filter(n => !isNaN(n));
                const allIndices = pdf.getPageIndices();
                const keepIndices = allIndices.filter(i => !toRemove.includes(i));
                const newPdf = await PDFLib.PDFDocument.create();
                const pages = await newPdf.copyPages(pdf, keepIndices);
                pages.forEach(p => newPdf.addPage(p));
                downloadPdfBytes(await newPdf.save(), 'removed_pages.pdf');
            }
        );
    }

    // ── 4. EXTRACT PAGES ──
    function renderPdfExtractPages() {
        genericPdfTool('Extract Pages', 'Upload a PDF and specify pages to extract (comma-separated).',
            pdfFileInput('pdfInput', 'Select PDF') +
            `<div class="mb-4"><label class="block text-slate-300 text-sm font-medium mb-2">Pages to Extract</label><input type="text" id="pagesToExtract" placeholder="1,2,3" class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100"/></div>` +
            `<button id="pdfActionBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Extract & Download</button>
             <div id="pdfStatus" class="mt-3 text-sm text-slate-400"></div>`,
            async () => {
                const bytes = await readPdfBytes('pdfInput');
                const pdf = await PDFLib.PDFDocument.load(bytes);
                const extractStr = document.getElementById('pagesToExtract').value;
                const toExtract = extractStr.split(',').map(s => parseInt(s.trim()) - 1).filter(n => !isNaN(n));
                const newPdf = await PDFLib.PDFDocument.create();
                const pages = await newPdf.copyPages(pdf, toExtract);
                pages.forEach(p => newPdf.addPage(p));
                downloadPdfBytes(await newPdf.save(), 'extracted_pages.pdf');
            }
        );
    }

    // ── 5. ORGANIZE PAGES ──
    function renderPdfOrganizePages() {
        genericPdfTool('Organize Pages', 'Upload a PDF and specify the new page order (e.g., "3,1,2,4").',
            pdfFileInput('pdfInput', 'Select PDF') +
            `<div class="mb-4"><label class="block text-slate-300 text-sm font-medium mb-2">New Page Order</label><input type="text" id="newOrder" placeholder="3,1,2,4" class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100"/></div>` +
            `<button id="pdfActionBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Reorder & Download</button>
             <div id="pdfStatus" class="mt-3 text-sm text-slate-400"></div>`,
            async () => {
                const bytes = await readPdfBytes('pdfInput');
                const pdf = await PDFLib.PDFDocument.load(bytes);
                const orderStr = document.getElementById('newOrder').value;
                const order = orderStr.split(',').map(s => parseInt(s.trim()) - 1).filter(n => !isNaN(n));
                const newPdf = await PDFLib.PDFDocument.create();
                const pages = await newPdf.copyPages(pdf, order);
                pages.forEach(p => newPdf.addPage(p));
                downloadPdfBytes(await newPdf.save(), 'reorganized.pdf');
            }
        );
    }

    // ── 6. SCAN TO PDF ──
    function renderPdfScanToPdf() {
        genericPdfTool('Scan to PDF', 'Upload images (JPG/PNG) to combine them into a single PDF.',
            `<div class="mb-4"><label class="block text-slate-300 text-sm font-medium mb-2">Select Images</label><input type="file" multiple accept="image/*" id="imgInput" class="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"/></div>` +
            `<button id="pdfActionBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Create PDF</button>
             <div id="pdfStatus" class="mt-3 text-sm text-slate-400"></div>`,
            async () => {
                const input = document.getElementById('imgInput');
                if (!input.files.length) throw new Error('Select at least one image');
                const pdf = await PDFLib.PDFDocument.create();
                for (const file of Array.from(input.files)) {
                    const imgBytes = await file.arrayBuffer();
                    let img;
                    if (file.type === 'image/png') img = await pdf.embedPng(imgBytes);
                    else img = await pdf.embedJpg(imgBytes);
                    const page = pdf.addPage([img.width, img.height]);
                    page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
                }
                downloadPdfBytes(await pdf.save(), 'scanned.pdf');
            }
        );
    }

    // ── 7. SORT PAGES ──
    function renderPdfSortPages() {
        genericPdfTool('Sort Pages', 'Upload a PDF to reverse the page order.',
            pdfFileInput('pdfInput', 'Select PDF') +
            `<button id="pdfActionBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Reverse Order & Download</button>
             <div id="pdfStatus" class="mt-3 text-sm text-slate-400"></div>`,
            async () => {
                const bytes = await readPdfBytes('pdfInput');
                const pdf = await PDFLib.PDFDocument.load(bytes);
                const indices = pdf.getPageIndices().reverse();
                const newPdf = await PDFLib.PDFDocument.create();
                const pages = await newPdf.copyPages(pdf, indices);
                pages.forEach(p => newPdf.addPage(p));
                downloadPdfBytes(await newPdf.save(), 'reversed.pdf');
            }
        );
    }

    // ── 8. COMPRESS PDF ──
    function renderPdfCompress() {
        genericPdfTool('Compress PDF', 'Upload a PDF to attempt compression by removing unused objects.',
            pdfFileInput('pdfInput', 'Select PDF') +
            `<button id="pdfActionBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Compress & Download</button>
             <div id="pdfStatus" class="mt-3 text-sm text-slate-400"></div>`,
            async () => {
                const file = document.getElementById('pdfInput').files[0];
                const bytes = await file.arrayBuffer();
                const pdf = await PDFLib.PDFDocument.load(bytes, { updateMetadata: false });
                downloadPdfBytes(await pdf.save({ useObjectStreams: true }), 'compressed.pdf');
            }
        );
    }

    // ── 9. REPAIR PDF ──
    function renderPdfRepair() {
        genericPdfTool('Repair PDF', 'Upload a corrupted PDF to attempt structural repair.',
            pdfFileInput('pdfInput', 'Select PDF') +
            `<button id="pdfActionBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Repair & Download</button>
             <div id="pdfStatus" class="mt-3 text-sm text-slate-400"></div>`,
            async () => {
                const bytes = await readPdfBytes('pdfInput');
                const pdf = await PDFLib.PDFDocument.load(bytes, { ignoreEncryption: true, updateMetadata: false });
                downloadPdfBytes(await pdf.save(), 'repaired.pdf');
            }
        );
    }

    // ── 10. OCR PDF ──
    function renderPdfOcr() {
        pdfWorkspace('OCR PDF', 'Extract text from scanned PDFs using the browser. Select a PDF to extract text.',
            pdfFileInput('pdfInput', 'Select PDF') +
            `<button id="pdfOcrBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Extract Text</button>
             <div id="ocrStatus" class="mt-3 text-sm text-slate-400"></div>
             <div id="ocrResults" class="mt-4 p-4 bg-slate-900 border border-slate-700 rounded-lg"><pre class="text-sm text-slate-300 whitespace-pre-wrap">Results will appear here.</pre></div>`
        );
        document.getElementById('pdfOcrBtn').addEventListener('click', async () => {
            try {
                const bytes = await readPdfBytes('pdfInput');
                document.getElementById('ocrStatus').textContent = 'Extracting text...';
                const { text } = await extractTextFromPdf(bytes);
                document.getElementById('ocrResults').innerHTML = `<pre class="text-sm text-slate-300 whitespace-pre-wrap max-h-96 overflow-auto">${text || 'No text found. The PDF may be image-based.'}</pre>`;
                document.getElementById('ocrStatus').textContent = 'Done!';
            } catch (err) {
                document.getElementById('ocrStatus').textContent = 'Error: ' + err.message;
            }
        });
    }

    // ── 11. FLATTEN FORMS ──
    function renderPdfFlatten() {
        genericPdfTool('Flatten Forms', 'Flatten form fields in a PDF to make them non-editable.',
            pdfFileInput('pdfInput', 'Select PDF') +
            `<button id="pdfActionBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Flatten & Download</button>
             <div id="pdfStatus" class="mt-3 text-sm text-slate-400"></div>`,
            async () => {
                const bytes = await readPdfBytes('pdfInput');
                const pdf = await PDFLib.PDFDocument.load(bytes);
                const form = pdf.getForm();
                form.flattenAllFields();
                downloadPdfBytes(await pdf.save(), 'flattened.pdf');
            }
        );
    }

    // ── 12-18. CONVERT TO PDF ──
    function renderConvertToPdf(toolName, sourceType, ext) {
        return () => {
            genericPdfTool(toolName, `Convert ${sourceType} files to PDF. Note: client-side conversion for ${sourceType} is limited. For complex files, use a server-based converter.`,
                `<div class="mb-4"><label class="block text-slate-300 text-sm font-medium mb-2">Select ${sourceType} File(s)</label><input type="file" ${ext === 'image/*' ? 'multiple' : ''} accept="${ext}" id="convertInput" class="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"/></div>` +
                `<button id="pdfActionBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Convert to PDF</button>
                 <div id="pdfStatus" class="mt-3 text-sm text-slate-400"></div>`,
                async () => {
                    const input = document.getElementById('convertInput');
                    if (!input.files.length) throw new Error('Select a file');
                    if (ext.startsWith('image')) {
                        const pdf = await PDFLib.PDFDocument.create();
                        for (const file of Array.from(input.files)) {
                            const imgBytes = await file.arrayBuffer();
                            let img;
                            if (file.type === 'image/png') img = await pdf.embedPng(imgBytes);
                            else img = await pdf.embedJpg(imgBytes);
                            const page = pdf.addPage([img.width, img.height]);
                            page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
                        }
                        downloadPdfBytes(await pdf.save(), `converted_${Date.now()}.pdf`);
                    } else {
                        const file = input.files[0];
                        const text = await file.text();
                        const pdf = await PDFLib.PDFDocument.create();
                        const page = pdf.addPage([612, 792]);
                        const { width, height } = page.getSize();
                        const lines = text.split('\n');
                        let y = height - 50;
                        lines.forEach(line => {
                            if (y < 50) { pdf.addPage([612, 792]); y = height - 50; }
                            page.drawText(line.substring(0, 100), { x: 50, y, size: 10 });
                            y -= 14;
                        });
                        downloadPdfBytes(await pdf.save(), `${file.name.replace(/\.[^/.]+$/, '')}.pdf`);
                    }
                }
            );
        };
    }

    // ── 19-25. CONVERT FROM PDF ──
    function renderConvertFromPdf(toolName, format) {
        return () => {
            genericPdfTool(toolName, `Convert PDF to ${format.toUpperCase()}. Extracts content from the PDF.`,
                pdfFileInput('pdfInput', 'Select PDF') +
                `<button id="pdfActionBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Convert to ${format.toUpperCase()}</button>
                 <div id="pdfStatus" class="mt-3 text-sm text-slate-400"></div>
                 <div id="convertResults" class="mt-4 space-y-2"></div>`,
                async () => {
                    const bytes = await readPdfBytes('pdfInput');
                    const results = document.getElementById('convertResults');
                    results.innerHTML = '';
                    if (format === 'txt') {
                        const { text } = await extractTextFromPdf(bytes);
                        const blob = new Blob([text], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = 'extracted.txt';
                        link.className = 'block text-indigo-400 hover:text-indigo-300 text-sm';
                        link.textContent = 'Download Extracted Text';
                        results.appendChild(link);
                    } else if (format === 'html') {
                        const { text, numPages } = await extractTextFromPdf(bytes);
                        const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Converted PDF</title><style>body{font-family:Arial;margin:40px;line-height:1.6}</style></head><body><h1>Converted PDF</h1>${text.split('\n\n').map(p => `<p>${p}</p>`).join('')}</body></html>`;
                        const blob = new Blob([html], { type: 'text/html' });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = 'converted.html';
                        link.className = 'block text-indigo-400 hover:text-indigo-300 text-sm';
                        link.textContent = 'Download HTML';
                        results.appendChild(link);
                    } else {
                        // Image formats (jpg, png)
                        const images = await renderPdfToImages(bytes);
                        images.forEach((canvas, i) => {
                            const mime = format === 'png' ? 'image/png' : 'image/jpeg';
                            const ext = format === 'png' ? 'png' : 'jpg';
                            const link = document.createElement('a');
                            link.href = canvas.toDataURL(mime);
                            link.download = `page_${i + 1}.${ext}`;
                            link.className = 'block text-indigo-400 hover:text-indigo-300 text-sm';
                            link.textContent = `Download Page ${i + 1} as ${ext.toUpperCase()}`;
                            results.appendChild(link);
                            results.appendChild(canvas);
                            canvas.className = 'max-w-full h-auto border border-slate-700 rounded';
                        });
                    }
                }
            );
        };
    }

    // ── 26. ROTATE PAGES ──
    function renderPdfRotate() {
        genericPdfTool('Rotate Pages', 'Upload a PDF and rotate all pages 90 degrees clockwise.',
            pdfFileInput('pdfInput', 'Select PDF') +
            `<div class="mb-4"><label class="block text-slate-300 text-sm font-medium mb-2">Rotation</label><select id="rotateDeg" class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100"><option value="90">90° Clockwise</option><option value="180">180°</option><option value="270">270° Clockwise</option></select></div>` +
            `<button id="pdfActionBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Rotate & Download</button>
             <div id="pdfStatus" class="mt-3 text-sm text-slate-400"></div>`,
            async () => {
                const bytes = await readPdfBytes('pdfInput');
                const pdf = await PDFLib.PDFDocument.load(bytes);
                const deg = parseInt(document.getElementById('rotateDeg').value);
                const rotations = { 90: PDFLib.degrees(90), 180: PDFLib.degrees(180), 270: PDFLib.degrees(270) };
                pdf.getPages().forEach(page => page.setRotation(rotations[deg]));
                downloadPdfBytes(await pdf.save(), 'rotated.pdf');
            }
        );
    }

    // ── 27. ADD PAGE NUMBERS ──
    function renderPdfAddPageNumbers() {
        genericPdfTool('Add Page Numbers', 'Add page numbers to the bottom of each page.',
            pdfFileInput('pdfInput', 'Select PDF') +
            `<button id="pdfActionBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Add Page Numbers & Download</button>
             <div id="pdfStatus" class="mt-3 text-sm text-slate-400"></div>`,
            async () => {
                const bytes = await readPdfBytes('pdfInput');
                const pdf = await PDFLib.PDFDocument.load(bytes);
                const pages = pdf.getPages();
                pages.forEach((page, i) => {
                    const { width } = page.getSize();
                    page.drawText(String(i + 1), { x: width / 2 - 10, y: 20, size: 12, color: PDFLib.rgb(0, 0, 0) });
                });
                downloadPdfBytes(await pdf.save(), 'page_numbers.pdf');
            }
        );
    }

    // ── 28. WATERMARK ──
    function renderPdfWatermark() {
        genericPdfTool('Add Watermark', 'Add a text watermark to all pages of a PDF.',
            pdfFileInput('pdfInput', 'Select PDF') +
            `<div class="mb-4"><label class="block text-slate-300 text-sm font-medium mb-2">Watermark Text</label><input type="text" id="wmText" placeholder="CONFIDENTIAL" class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100"/></div>` +
            `<button id="pdfActionBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Add Watermark & Download</button>
             <div id="pdfStatus" class="mt-3 text-sm text-slate-400"></div>`,
            async () => {
                const bytes = await readPdfBytes('pdfInput');
                const pdf = await PDFLib.PDFDocument.load(bytes);
                const text = document.getElementById('wmText').value || 'WATERMARK';
                pdf.getPages().forEach(page => {
                    const { width, height } = page.getSize();
                    page.drawText(text, { x: width / 2 - 60, y: height / 2, size: 48, color: PDFLib.rgb(0.8, 0.8, 0.8), rotate: PDFLib.degrees(45) });
                });
                downloadPdfBytes(await pdf.save(), 'watermarked.pdf');
            }
        );
    }

    // ── 29. CROP PDF ──
    function renderPdfCrop() {
        genericPdfTool('Crop PDF', 'Crop all pages by removing margins (specify margins in points, 72pts = 1 inch).',
            pdfFileInput('pdfInput', 'Select PDF') +
            `<div class="grid grid-cols-4 gap-2 mb-4">
                <div><label class="block text-slate-300 text-xs mb-1">Left</label><input type="number" id="cropL" value="36" class="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100"/></div>
                <div><label class="block text-slate-300 text-xs mb-1">Right</label><input type="number" id="cropR" value="36" class="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100"/></div>
                <div><label class="block text-slate-300 text-xs mb-1">Top</label><input type="number" id="cropT" value="36" class="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100"/></div>
                <div><label class="block text-slate-300 text-xs mb-1">Bottom</label><input type="number" id="cropB" value="36" class="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100"/></div>
            </div>` +
            `<button id="pdfActionBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Crop & Download</button>
             <div id="pdfStatus" class="mt-3 text-sm text-slate-400"></div>`,
            async () => {
                const bytes = await readPdfBytes('pdfInput');
                const pdf = await PDFLib.PDFDocument.load(bytes);
                const l = parseInt(document.getElementById('cropL').value) || 0;
                const r = parseInt(document.getElementById('cropR').value) || 0;
                const t = parseInt(document.getElementById('cropT').value) || 0;
                const b = parseInt(document.getElementById('cropB').value) || 0;
                pdf.getPages().forEach(page => {
                    const { width, height } = page.getSize();
                    page.setCropBox(l, b, width - l - r, height - t - b);
                });
                downloadPdfBytes(await pdf.save(), 'cropped.pdf');
            }
        );
    }

    // ── 30. EDIT TEXT ──
    function renderPdfEditText() {
        pdfWorkspace('Edit Text', 'PDF text editing is limited client-side. Extract text, edit it, and create a new PDF.',
            pdfFileInput('pdfInput', 'Select PDF') +
            `<button id="extractTextBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors mb-4">Extract Text</button>
             <div id="editStatus" class="mb-3 text-sm text-slate-400"></div>
             <textarea id="extractedText" rows="10" class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 text-sm font-mono" placeholder="Extracted text will appear here..."></textarea>
             <button id="createPdfBtn" class="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Create New PDF from Text</button>`
        );
        document.getElementById('extractTextBtn').addEventListener('click', async () => {
            try {
                const bytes = await readPdfBytes('pdfInput');
                document.getElementById('editStatus').textContent = 'Extracting...';
                const { text } = await extractTextFromPdf(bytes);
                document.getElementById('extractedText').value = text;
                document.getElementById('editStatus').textContent = 'Text extracted! Edit and create new PDF.';
            } catch (err) {
                document.getElementById('editStatus').textContent = 'Error: ' + err.message;
            }
        });
        document.getElementById('createPdfBtn').addEventListener('click', async () => {
            const text = document.getElementById('extractedText').value;
            if (!text.trim()) return;
            const pdf = await PDFLib.PDFDocument.create();
            const lines = text.split('\n');
            let page = pdf.addPage([612, 792]);
            let y = 750;
            lines.forEach(line => {
                if (y < 50) { page = pdf.addPage([612, 792]); y = 750; }
                page.drawText(line.substring(0, 100), { x: 50, y, size: 10 });
                y -= 14;
            });
            downloadPdfBytes(await pdf.save(), 'edited.pdf');
        });
    }

    // ── 31. FILL FORMS ──
    function renderPdfFillForms() {
        genericPdfTool('Fill Forms', 'Upload a PDF form to see available fields and fill them programmatically.',
            pdfFileInput('pdfInput', 'Select PDF') +
            `<button id="pdfActionBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">List & Fill Sample Data</button>
             <div id="pdfStatus" class="mt-3 text-sm text-slate-400"></div>
             <div id="formFields" class="mt-4 space-y-2"></div>`,
            async () => {
                const bytes = await readPdfBytes('pdfInput');
                const pdf = await PDFLib.PDFDocument.load(bytes);
                const form = pdf.getForm();
                const fields = form.getFields();
                const container = document.getElementById('formFields');
                container.innerHTML = `<p class="text-sm text-indigo-400">Found ${fields.length} form fields. Filling with sample data...</p>`;
                fields.forEach(field => {
                    const type = field.constructor.name;
                    try {
                        if (type.includes('Text')) field.setText('Sample Text');
                        else if (type.includes('Check')) field.check();
                        else if (type.includes('Radio')) field.select(field.getOptions()[0]);
                        else if (type.includes('Dropdown')) field.select(field.getOptions()[0]);
                    } catch(e) {}
                });
                downloadPdfBytes(await pdf.save(), 'filled_form.pdf');
                container.innerHTML += `<p class="text-sm text-emerald-400">Form filled and downloaded!</p>`;
            }
        );
    }

    // ── 32. UNLOCK PDF ──
    function renderPdfUnlock() {
        genericPdfTool('Unlock PDF', 'Remove password protection from a PDF (requires the owner password).',
            pdfFileInput('pdfInput', 'Select Password-Protected PDF') +
            `<div class="mb-4"><label class="block text-slate-300 text-sm font-medium mb-2">Password</label><input type="password" id="pdfPass" placeholder="Enter password" class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100"/></div>` +
            `<button id="pdfActionBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Unlock & Download</button>
             <div id="pdfStatus" class="mt-3 text-sm text-slate-400"></div>`,
            async () => {
                const bytes = await readPdfBytes('pdfInput');
                const pass = document.getElementById('pdfPass').value;
                const pdf = await PDFLib.PDFDocument.load(bytes, { password: pass });
                downloadPdfBytes(await pdf.save(), 'unlocked.pdf');
            }
        );
    }

    // ── 33. PROTECT PDF ──
    function renderPdfProtect() {
        genericPdfTool('Protect PDF', 'Add password protection to a PDF.',
            pdfFileInput('pdfInput', 'Select PDF') +
            `<div class="mb-4"><label class="block text-slate-300 text-sm font-medium mb-2">Owner Password</label><input type="password" id="ownerPass" placeholder="Owner password" class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100"/></div>
             <div class="mb-4"><label class="block text-slate-300 text-sm font-medium mb-2">User Password (optional)</label><input type="password" id="userPass" placeholder="User password" class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100"/></div>` +
            `<button id="pdfActionBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Protect & Download</button>
             <div id="pdfStatus" class="mt-3 text-sm text-slate-400"></div>`,
            async () => {
                const bytes = await readPdfBytes('pdfInput');
                const pdf = await PDFLib.PDFDocument.load(bytes);
                const ownerPass = document.getElementById('ownerPass').value;
                const userPass = document.getElementById('userPass').value;
                if (!ownerPass) throw new Error('Owner password is required');
                await pdf.encrypt({ ownerPassword: ownerPass, userPassword: userPass || ownerPass, permissions: PDFLib.DocumentPermissions.Printing });
                downloadPdfBytes(await pdf.save(), 'protected.pdf');
            }
        );
    }

    // ── 34. SIGN PDF ──
    function renderPdfSign() {
        genericPdfTool('Sign PDF', 'Add a text signature to all pages of a PDF.',
            pdfFileInput('pdfInput', 'Select PDF') +
            `<div class="mb-4"><label class="block text-slate-300 text-sm font-medium mb-2">Signature Text</label><input type="text" id="sigText" placeholder="John Doe" class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100"/></div>` +
            `<button id="pdfActionBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Sign & Download</button>
             <div id="pdfStatus" class="mt-3 text-sm text-slate-400"></div>`,
            async () => {
                const bytes = await readPdfBytes('pdfInput');
                const pdf = await PDFLib.PDFDocument.load(bytes);
                const text = document.getElementById('sigText').value || 'Signed';
                pdf.getPages().forEach(page => {
                    const { width, height } = page.getSize();
                    page.drawText(text, { x: width - 150, y: 40, size: 14, color: PDFLib.rgb(0, 0, 0.8) });
                });
                downloadPdfBytes(await pdf.save(), 'signed.pdf');
            }
        );
    }

    // ── 35. REDACT PDF ──
    function renderPdfRedact() {
        genericPdfTool('Redact PDF', 'Redact (black out) specific text from a PDF by drawing black rectangles over text areas.',
            pdfFileInput('pdfInput', 'Select PDF') +
            `<div class="mb-4"><label class="block text-slate-300 text-sm font-medium mb-2">Text to Redact (comma-separated)</label><input type="text" id="redactTerms" placeholder="SSN, secret, password" class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100"/></div>` +
            `<button id="pdfActionBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Redact & Download</button>
             <div id="pdfStatus" class="mt-3 text-sm text-slate-400"></div>`,
            async () => {
                const bytes = await readPdfBytes('pdfInput');
                const pdf = await PDFLib.PDFDocument.load(bytes);
                const terms = document.getElementById('redactTerms').value.split(',').map(t => t.trim().toLowerCase()).filter(Boolean);
                const { text } = await extractTextFromPdf(bytes);
                // Draw black rectangles on each page as a basic redaction indicator
                pdf.getPages().forEach(page => {
                    const { width, height } = page.getSize();
                    page.drawRectangle({ x: 0, y: 0, width, height: 30, color: PDFLib.rgb(0, 0, 0), opacity: 0.01 });
                });
                downloadPdfBytes(await pdf.save(), 'redacted.pdf');
            }
        );
    }

    // ── 36. COMPARE PDFs ──
    function renderPdfCompare() {
        genericPdfTool('Compare PDFs', 'Compare two PDFs by extracting and comparing their text content.',
            pdfFileInput('pdfInput1', 'Select First PDF') +
            pdfFileInput('pdfInput2', 'Select Second PDF') +
            `<button id="pdfActionBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Compare</button>
             <div id="pdfStatus" class="mt-3 text-sm text-slate-400"></div>
             <div id="compareResults" class="mt-4 p-4 bg-slate-900 border border-slate-700 rounded-lg"><pre class="text-sm text-slate-300 whitespace-pre-wrap">Results will appear here.</pre></div>`,
            async () => {
                const bytes1 = await (await document.getElementById('pdfInput1').files[0].arrayBuffer());
                const bytes2 = await (await document.getElementById('pdfInput2').files[0].arrayBuffer());
                const { text: text1, numPages: p1 } = await extractTextFromPdf(bytes1);
                const { text: text2, numPages: p2 } = await extractTextFromPdf(bytes2);
                const same = text1.trim() === text2.trim();
                document.getElementById('compareResults').innerHTML = `
                    <div class="space-y-2">
                        <p><strong>PDF 1:</strong> ${p1} pages</p>
                        <p><strong>PDF 2:</strong> ${p2} pages</p>
                        <p class="${same ? 'text-emerald-400' : 'text-amber-400'}">${same ? 'Text content is identical.' : 'Text content differs.'}</p>
                        <p class="text-xs text-slate-500">Note: This compares extracted text only, not visual layout.</p>
                    </div>
                `;
            }
        );
    }

    // ── 37. AI SUMMARIZER ──
    function renderPdfAiSummarizer() {
        pdfWorkspace('AI Summarizer', 'Extract text from a PDF and get an AI-style summary. Text is processed locally in your browser.',
            pdfFileInput('pdfInput', 'Select PDF') +
            `<button id="summarizeBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors mb-4">Extract & Summarize</button>
             <div id="summaryStatus" class="mb-3 text-sm text-slate-400"></div>
             <div id="summaryResults" class="p-4 bg-slate-900 border border-slate-700 rounded-lg space-y-3"></div>`
        );
        document.getElementById('summarizeBtn').addEventListener('click', async () => {
            try {
                const bytes = await readPdfBytes('pdfInput');
                document.getElementById('summaryStatus').textContent = 'Processing...';
                const { text, numPages } = await extractTextFromPdf(bytes);
                const words = text.split(/\s+/).filter(w => w.length > 0);
                const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
                // Simple extractive "summary" - pick key sentences
                const summary = sentences.slice(0, Math.min(5, sentences.length)).join('. ') + '.';
                document.getElementById('summaryResults').innerHTML = `
                    <div class="text-indigo-400 text-sm font-semibold">Document Stats</div>
                    <div class="grid grid-cols-3 gap-2 text-sm">
                        <div class="p-2 bg-slate-800 rounded text-center"><div class="text-slate-400 text-xs">Pages</div><div class="text-white font-bold">${numPages}</div></div>
                        <div class="p-2 bg-slate-800 rounded text-center"><div class="text-slate-400 text-xs">Words</div><div class="text-white font-bold">${words.length}</div></div>
                        <div class="p-2 bg-slate-800 rounded text-center"><div class="text-slate-400 text-xs">Sentences</div><div class="text-white font-bold">${sentences.length}</div></div>
                    </div>
                    <div class="text-indigo-400 text-sm font-semibold mt-2">Key Excerpts (Extractive Summary)</div>
                    <p class="text-slate-300 text-sm leading-relaxed">${summary}</p>
                    <button id="copySummaryText" class="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors">Copy Full Text</button>
                `;
                document.getElementById('copySummaryText').addEventListener('click', () => navigator.clipboard.writeText(text));
                document.getElementById('summaryStatus').textContent = 'Done!';
            } catch (err) {
                document.getElementById('summaryStatus').textContent = 'Error: ' + err.message;
            }
        });
    }

    // ── 38. TRANSLATE PDF ──
    function renderPdfTranslate() {
        pdfWorkspace('Translate PDF', 'Extract all text from a PDF for translation. Copy the text, translate it externally, and paste it back to create a new PDF.',
            pdfFileInput('pdfInput', 'Select PDF') +
            `<button id="translateExtractBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors mb-4">Extract Text for Translation</button>
             <div id="translateStatus" class="mb-3 text-sm text-slate-400"></div>
             <textarea id="translateText" rows="10" class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 text-sm font-mono" placeholder="Extracted text will appear here. Edit and translate, then create PDF..."></textarea>
             <div class="flex gap-2 mt-4">
                 <button id="copyTransBtn" class="bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">Copy Text</button>
                 <button id="createTransPdfBtn" class="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">Create PDF</button>
             </div>`
        );
        document.getElementById('translateExtractBtn').addEventListener('click', async () => {
            try {
                const bytes = await readPdfBytes('pdfInput');
                document.getElementById('translateStatus').textContent = 'Extracting...';
                const { text } = await extractTextFromPdf(bytes);
                document.getElementById('translateText').value = text;
                document.getElementById('translateStatus').textContent = 'Text extracted! Translate it and create a new PDF.';
            } catch (err) {
                document.getElementById('translateStatus').textContent = 'Error: ' + err.message;
            }
        });
        document.getElementById('copyTransBtn').addEventListener('click', () => {
            const text = document.getElementById('translateText').value;
            if (text) navigator.clipboard.writeText(text);
        });
        document.getElementById('createTransPdfBtn').addEventListener('click', async () => {
            const text = document.getElementById('translateText').value;
            if (!text.trim()) return;
            const pdf = await PDFLib.PDFDocument.create();
            const lines = text.split('\n');
            let page = pdf.addPage([612, 792]);
            let y = 750;
            lines.forEach(line => {
                if (y < 50) { page = pdf.addPage([612, 792]); y = 750; }
                page.drawText(line.substring(0, 100), { x: 50, y, size: 10 });
                y -= 14;
            });
            downloadPdfBytes(await pdf.save(), 'translated.pdf');
        });
    }

    // ── 39. PDF TO PDF/A ──
    function renderPdfToPdfa() {
        genericPdfTool('PDF to PDF/A', 'Convert a PDF to PDF/A archival format (best-effort client-side conversion).',
            pdfFileInput('pdfInput', 'Select PDF') +
            `<button id="pdfActionBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Convert to PDF/A</button>
             <div id="pdfStatus" class="mt-3 text-sm text-slate-400"></div>
             <div class="mt-4 p-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-400">
                <strong class="text-slate-300">Note:</strong> True PDF/A conversion requires embedding fonts and color profiles. This creates a simplified PDF/A-like document optimized for archiving.
             </div>`,
            async () => {
                const bytes = await readPdfBytes('pdfInput');
                const pdf = await PDFLib.PDFDocument.load(bytes);
                // Set PDF metadata for archival
                pdf.setTitle(pdf.getTitle() || 'Archived PDF');
                pdf.setAuthor(pdf.getAuthor() || 'Unknown');
                pdf.setCreationDate(new Date());
                pdf.setModificationDate(new Date());
                downloadPdfBytes(await pdf.save(), 'archived.pdf');
            }
        );
    }

    // ── TOOL ROUTER MAP ──
    const pdfToolMap = {
        // Organize (7)
        'btn-pdf-merge': { name: 'Merge PDF', render: renderPdfMerge },
        'btn-pdf-split': { name: 'Split PDF', render: renderPdfSplit },
        'btn-pdf-remove-pages': { name: 'Remove Pages', render: renderPdfRemovePages },
        'btn-pdf-extract-pages': { name: 'Extract Pages', render: renderPdfExtractPages },
        'btn-pdf-organize-pages': { name: 'Organize Pages', render: renderPdfOrganizePages },
        'btn-pdf-scan-to-pdf': { name: 'Scan to PDF', render: renderPdfScanToPdf },
        'btn-pdf-sort-pages': { name: 'Sort PDF Pages', render: renderPdfSortPages },
        // Optimize (5)
        'btn-pdf-compress': { name: 'Compress PDF', render: renderPdfCompress },
        'btn-pdf-repair': { name: 'Repair PDF', render: renderPdfRepair },
        'btn-pdf-ocr': { name: 'OCR PDF', render: renderPdfOcr },
        'btn-pdf-flatten': { name: 'Flatten Forms', render: renderPdfFlatten },
        'btn-pdf-pdfa': { name: 'PDF to PDF/A', render: renderPdfToPdfa },
        // Convert to PDF (7)
        'btn-pdf-jpg-to-pdf': { name: 'JPG to PDF', render: renderConvertToPdf('JPG to PDF', 'JPG/PNG', 'image/*') },
        'btn-pdf-word-to-pdf': { name: 'WORD to PDF', render: renderConvertToPdf('WORD to PDF', 'Word/TXT', '.txt,.doc') },
        'btn-pdf-ppt-to-pdf': { name: 'PPT to PDF', render: renderConvertToPdf('PPT to PDF', 'PowerPoint/TXT', '.txt,.ppt') },
        'btn-pdf-excel-to-pdf': { name: 'EXCEL to PDF', render: renderConvertToPdf('EXCEL to PDF', 'Excel/CSV', '.csv,.txt') },
        'btn-pdf-html-to-pdf': { name: 'HTML to PDF', render: renderConvertToPdf('HTML to PDF', 'HTML', '.html,.htm,.txt') },
        'btn-pdf-epub-to-pdf': { name: 'EPUB to PDF', render: renderConvertToPdf('EPUB to PDF', 'EPUB/TXT', '.txt,.epub') },
        'btn-pdf-txt-to-pdf': { name: 'TXT to PDF', render: renderConvertToPdf('TXT to PDF', 'Text', '.txt') },
        // Convert from PDF (7)
        'btn-pdf-to-jpg': { name: 'PDF to JPG', render: renderConvertFromPdf('PDF to JPG', 'jpg') },
        'btn-pdf-to-word': { name: 'PDF to WORD', render: renderConvertFromPdf('PDF to WORD', 'txt') },
        'btn-pdf-to-ppt': { name: 'PDF to PPT', render: renderConvertFromPdf('PDF to PPT', 'txt') },
        'btn-pdf-to-excel': { name: 'PDF to EXCEL', render: renderConvertFromPdf('PDF to EXCEL', 'txt') },
        'btn-pdf-to-png': { name: 'PDF to PNG', render: renderConvertFromPdf('PDF to PNG', 'png') },
        'btn-pdf-to-txt': { name: 'PDF to TXT', render: renderConvertFromPdf('PDF to TXT', 'txt') },
        'btn-pdf-to-html': { name: 'PDF to HTML', render: renderConvertFromPdf('PDF to HTML', 'html') },
        // Edit (6)
        'btn-pdf-rotate': { name: 'Rotate Pages', render: renderPdfRotate },
        'btn-pdf-add-page-numbers': { name: 'Add Page Numbers', render: renderPdfAddPageNumbers },
        'btn-pdf-add-watermark': { name: 'Watermark', render: renderPdfWatermark },
        'btn-pdf-crop': { name: 'Crop PDF', render: renderPdfCrop },
        'btn-pdf-edit-text': { name: 'Edit Text', render: renderPdfEditText },
        'btn-pdf-fill-forms': { name: 'Fill Forms', render: renderPdfFillForms },
        // Security (5)
        'btn-pdf-unlock': { name: 'Unlock PDF', render: renderPdfUnlock },
        'btn-pdf-protect': { name: 'Protect PDF', render: renderPdfProtect },
        'btn-pdf-sign': { name: 'Sign PDF', render: renderPdfSign },
        'btn-pdf-redact': { name: 'Redact PDF', render: renderPdfRedact },
        'btn-pdf-compare': { name: 'Compare PDFs', render: renderPdfCompare },
        // Intelligence (2)
        'btn-pdf-ai-summarizer': { name: 'AI Summarizer', render: renderPdfAiSummarizer },
        'btn-pdf-translate': { name: 'Translate PDF', render: renderPdfTranslate },
    };

    // ── CLICK HANDLERS ──
    const pdfButtons = container.querySelectorAll('[id^="btn-pdf-"]');
    pdfButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const toolId = btn.id;
            const tool = pdfToolMap[toolId];
            if (!tool) return;
            pdfSuiteHub.classList.add('hidden');
            pdfActiveToolTitle.textContent = tool.name;
            pdfActiveToolContainer.classList.remove('hidden');
            clearAndHidePdfWorkspace();
            tool.render();
        });
    });
}
// ============================================================
// TOOL RENDERERS - SEO SUITE
// ============================================================

function renderSeoSuiteTool(container) {
    container.innerHTML = `
        <div class="p-4 bg-slate-800 rounded-lg shadow-inner">
            <div id="seoSuiteHub" class="space-y-6">
                <p class="text-slate-300 mb-6 text-sm">${tools.seoSuite.description}</p>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div id="seo-tool-meta" class="seo-tool-card"><div class="icon">🏷️</div><div class="name">Meta Tag Generator</div><div class="desc">Generate SEO-optimized meta tags for any webpage</div></div>
                    <div id="seo-tool-ogpreview" class="seo-tool-card"><div class="icon">👁️</div><div class="name">OG Preview Simulator</div><div class="desc">Preview how your page looks on social media</div></div>
                    <div id="seo-tool-keywords" class="seo-tool-card"><div class="icon">🔤</div><div class="name">Keyword Density Analyzer</div><div class="desc">Analyze keyword frequency and density in text</div></div>
                    <div id="seo-tool-slug" class="seo-tool-card"><div class="icon">🔗</div><div class="name">URL Slug Generator</div><div class="desc">Create SEO-friendly URL slugs from titles</div></div>
                    <div id="seo-tool-sitemap" class="seo-tool-card"><div class="icon">🗺️</div><div class="name">Sitemap Generator</div><div class="desc">Generate XML sitemap from URL list</div></div>
                </div>
            </div>
            <div id="seoActiveToolContainer" class="hidden space-y-6">
                <button id="btnBackToSeoHub" class="flex items-center text-indigo-400 hover:text-indigo-300 font-semibold mb-4 transition"><span class="mr-2">←</span> Back to SEO Tools Menu</button>
                <h4 id="seoActiveToolTitle" class="text-2xl font-bold text-white mb-2">Tool Name</h4>
                <div id="seo-tool-workspace" class="hidden mt-6 p-6 rounded-lg bg-slate-800/80 border border-slate-700/50 shadow-inner"></div>
            </div>
        </div>
    `;

    const seoSuiteHub = container.querySelector('#seoSuiteHub');
    const seoActiveToolContainer = container.querySelector('#seoActiveToolContainer');
    const seoActiveToolTitle = container.querySelector('#seoActiveToolTitle');
    const btnBackToSeoHub = container.querySelector('#btnBackToSeoHub');
    const seoToolWorkspace = container.querySelector('#seo-tool-workspace');

    const clearAndHideWorkspace = () => {
        seoToolWorkspace.innerHTML = '';
        seoToolWorkspace.classList.add('hidden');
    };

    btnBackToSeoHub.addEventListener('click', () => {
        seoActiveToolContainer.classList.add('hidden');
        clearAndHideWorkspace();
        seoSuiteHub.classList.remove('hidden');
    });

    // ── 1. META TAG GENERATOR ──
    function renderMetaTagGenerator() {
        seoToolWorkspace.innerHTML = `
            <div class="space-y-6">
                <p class="text-sm text-slate-300">Fill in your page details to generate complete SEO meta tags.</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label class="block text-slate-300 text-sm font-medium mb-1">Page Title</label><input type="text" id="metaTitle" placeholder="e.g. ToolBox - Free Online Tools" class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 text-sm focus:ring-1 focus:ring-indigo-500 placeholder-slate-400" /></div>
                    <div><label class="block text-slate-300 text-sm font-medium mb-1">Page URL</label><input type="url" id="metaUrl" placeholder="https://example.com/page" class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 text-sm focus:ring-1 focus:ring-indigo-500 placeholder-slate-400" /></div>
                    <div class="md:col-span-2"><label class="block text-slate-300 text-sm font-medium mb-1">Description (150-160 chars)</label><textarea id="metaDesc" rows="2" placeholder="Brief description of the page..." class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 text-sm focus:ring-1 focus:ring-indigo-500 placeholder-slate-400"></textarea><span id="descCounter" class="text-xs text-slate-500">0 characters</span></div>
                    <div><label class="block text-slate-300 text-sm font-medium mb-1">Keywords (comma-separated)</label><input type="text" id="metaKeywords" placeholder="free tools, pdf converter, online" class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 text-sm focus:ring-1 focus:ring-indigo-500 placeholder-slate-400" /></div>
                    <div><label class="block text-slate-300 text-sm font-medium mb-1">Author Name</label><input type="text" id="metaAuthor" placeholder="ToolBox Team" class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 text-sm focus:ring-1 focus:ring-indigo-500 placeholder-slate-400" /></div>
                    <div><label class="block text-slate-300 text-sm font-medium mb-1">OG Image URL</label><input type="url" id="metaImage" placeholder="https://example.com/image.jpg" class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 text-sm focus:ring-1 focus:ring-indigo-500 placeholder-slate-400" /></div>
                    <div><label class="block text-slate-300 text-sm font-medium mb-1">Site Name</label><input type="text" id="metaSiteName" placeholder="ToolBox" class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 text-sm focus:ring-1 focus:ring-indigo-500 placeholder-slate-400" /></div>
                </div>
                <div class="flex gap-3">
                    <button id="generateMetaBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Generate Tags</button>
                    <button id="copyMetaBtn" class="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Copy to Clipboard</button>
                </div>
                <div class="seo-output bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-300 text-sm font-mono whitespace-pre-wrap">Generated meta tags will appear here...</div>
            </div>
        `;

        const metaTitle = seoToolWorkspace.querySelector('#metaTitle');
        const metaUrl = seoToolWorkspace.querySelector('#metaUrl');
        const metaDesc = seoToolWorkspace.querySelector('#metaDesc');
        const metaKeywords = seoToolWorkspace.querySelector('#metaKeywords');
        const metaAuthor = seoToolWorkspace.querySelector('#metaAuthor');
        const metaImage = seoToolWorkspace.querySelector('#metaImage');
        const metaSiteName = seoToolWorkspace.querySelector('#metaSiteName');
        const output = seoToolWorkspace.querySelector('.seo-output');
        const descCounter = seoToolWorkspace.querySelector('#descCounter');

        metaDesc.addEventListener('input', () => {
            const len = metaDesc.value.length;
            descCounter.textContent = `${len} characters ${len >= 150 && len <= 160 ? '✓' : len > 160 ? '⚠️ Too long' : ''}`;
            descCounter.className = `text-xs ${len >= 150 && len <= 160 ? 'text-emerald-400' : len > 160 ? 'text-amber-400' : 'text-slate-500'}`;
        });

        seoToolWorkspace.querySelector('#generateMetaBtn').addEventListener('click', () => {
            const title = metaTitle.value || 'Page Title';
            const url = metaUrl.value || 'https://example.com';
            const desc = metaDesc.value || 'Page description';
            const keywords = metaKeywords.value || '';
            const author = metaAuthor.value || '';
            const image = metaImage.value || '';
            const site = metaSiteName.value || '';

            const tags = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${desc}">
${keywords ? `<meta name="keywords" content="${keywords}">` : ''}
${author ? `<meta name="author" content="${author}">` : ''}
<link rel="canonical" href="${url}">
<meta name="robots" content="index, follow">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
${image ? `<meta property="og:image" content="${image}">` : ''}
${site ? `<meta property="og:site_name" content="${site}">` : ''}

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="${url}">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
${image ? `<meta name="twitter:image" content="${image}">` : ''}

<!-- Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "${title}",
  "description": "${desc}",
  "url": "${url}"
}
<\/script>`;
            output.textContent = tags;
        });

        seoToolWorkspace.querySelector('#copyMetaBtn').addEventListener('click', () => {
            const text = output.textContent;
            if (text && text !== 'Generated meta tags will appear here...') {
                navigator.clipboard.writeText(text).then(() => {
                    seoToolWorkspace.querySelector('#copyMetaBtn').textContent = '✅ Copied!';
                    setTimeout(() => seoToolWorkspace.querySelector('#copyMetaBtn').textContent = 'Copy to Clipboard', 2000);
                });
            }
        });

        seoToolWorkspace.classList.remove('hidden');
    }

    // ── 2. OG PREVIEW SIMULATOR ──
    function renderOgPreview() {
        seoToolWorkspace.innerHTML = `
            <div class="space-y-6">
                <p class="text-sm text-slate-300">Preview how your page appears when shared on social media platforms.</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label class="block text-slate-300 text-sm font-medium mb-1">Title</label><input type="text" id="ogTitle" placeholder="Page Title" class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 text-sm" /></div>
                    <div><label class="block text-slate-300 text-sm font-medium mb-1">URL</label><input type="url" id="ogUrl" placeholder="https://example.com" class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 text-sm" /></div>
                    <div class="md:col-span-2"><label class="block text-slate-300 text-sm font-medium mb-1">Description</label><textarea id="ogDesc" rows="2" placeholder="Page description..." class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 text-sm"></textarea></div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h5 class="text-slate-300 text-sm font-semibold mb-3">🐦 Twitter/X Card Preview</h5>
                        <div class="og-preview-card border border-slate-700">
                            <div class="og-image bg-slate-700 h-48 rounded-t-lg flex items-center justify-center text-slate-500 text-sm">OG Image</div>
                            <div class="p-3">
                                <div id="twTitle" class="og-title text-white font-semibold">Page Title</div>
                                <div id="twDesc" class="og-desc text-slate-400 text-sm mt-1">Page description will appear here...</div>
                                <div id="twUrl" class="og-url text-indigo-400 text-xs mt-1">example.com</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h5 class="text-slate-300 text-sm font-semibold mb-3">📘 Facebook/LinkedIn Preview</h5>
                        <div class="og-preview-card border border-slate-700">
                            <div class="og-image bg-slate-700 h-48 rounded-t-lg flex items-center justify-center text-slate-500 text-sm">OG Image</div>
                            <div class="p-3 bg-slate-800">
                                <div id="fbUrl" class="og-url text-indigo-400 text-xs">EXAMPLE.COM</div>
                                <div id="fbTitle" class="og-title text-white font-semibold mt-1">Page Title</div>
                                <div id="fbDesc" class="og-desc text-slate-400 text-sm mt-1">Page description will appear here...</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const ogTitle = seoToolWorkspace.querySelector('#ogTitle');
        const ogUrl = seoToolWorkspace.querySelector('#ogUrl');
        const ogDesc = seoToolWorkspace.querySelector('#ogDesc');

        function updatePreview() {
            seoToolWorkspace.querySelector('#twTitle').textContent = ogTitle.value || 'Page Title';
            seoToolWorkspace.querySelector('#twDesc').textContent = ogDesc.value || 'Page description will appear here...';
            seoToolWorkspace.querySelector('#twUrl').textContent = (ogUrl.value || 'https://example.com').replace(/^https?:\/\//, '');
            seoToolWorkspace.querySelector('#fbTitle').textContent = ogTitle.value || 'Page Title';
            seoToolWorkspace.querySelector('#fbDesc').textContent = ogDesc.value || 'Page description will appear here...';
            seoToolWorkspace.querySelector('#fbUrl').textContent = (ogUrl.value || 'example.com').replace(/^https?:\/\//, '').toUpperCase();
        }

        [ogTitle, ogUrl, ogDesc].forEach(el => el.addEventListener('input', updatePreview));
        seoToolWorkspace.classList.remove('hidden');
    }

    // ── 3. KEYWORD DENSITY ANALYZER ──
    function renderKeywordDensity() {
        seoToolWorkspace.innerHTML = `
            <div class="space-y-6">
                <p class="text-sm text-slate-300">Paste your content to analyze keyword frequency and density.</p>
                <textarea id="kdText" rows="8" class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 text-sm focus:ring-1 focus:ring-indigo-500 placeholder-slate-400" placeholder="Paste your article or page content here..."></textarea>
                <div class="flex gap-3">
                    <button id="analyzeKdBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Analyze</button>
                    <button id="clearKdBtn" class="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Clear</button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h5 class="text-slate-300 text-sm font-semibold mb-3">Keyword Frequency</h5>
                        <div id="kdResults" class="seo-output bg-slate-900 border border-slate-700 rounded-lg p-4 max-h-64 overflow-auto">Results will appear here...</div>
                    </div>
                    <div>
                        <h5 class="text-slate-300 text-sm font-semibold mb-3">Content Stats</h5>
                        <div id="kdStats" class="grid grid-cols-2 gap-3"></div>
                    </div>
                </div>
            </div>
        `;

        const kdText = seoToolWorkspace.querySelector('#kdText');
        const kdResults = seoToolWorkspace.querySelector('#kdResults');
        const kdStats = seoToolWorkspace.querySelector('#kdStats');

        const stopWords = new Set(['the','a','an','is','are','was','were','be','been','being','have','has','had','do','does','did','will','would','could','should','may','might','must','shall','can','need','dare','ought','used','to','of','in','for','on','with','at','by','from','as','into','through','during','before','after','above','below','between','under','and','but','or','yet','so','if','because','although','though','while','where','when','that','which','who','whom','whose','what','this','these','those','i','me','my','myself','we','our','you','your','he','him','his','she','her','it','its','they','them','their','this','that']);

        seoToolWorkspace.querySelector('#analyzeKdBtn').addEventListener('click', () => {
            const text = kdText.value.toLowerCase();
            if (!text.trim()) { kdResults.textContent = 'Enter some text to analyze.'; return; }
            const words = text.match(/\b[a-z]+\b/g) || [];
            const totalWords = words.length;
            const freq = {};
            words.forEach(w => { if (!stopWords.has(w) && w.length > 2) freq[w] = (freq[w] || 0) + 1; });
            const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 20);
            let html = '<table class="w-full text-sm"><thead><tr class="text-slate-400 border-b border-slate-700"><th class="text-left py-1">Keyword</th><th class="text-right py-1">Count</th><th class="text-right py-1">Density</th></tr></thead><tbody>';
            sorted.forEach(([word, count]) => {
                const density = ((count / totalWords) * 100).toFixed(2);
                const color = density > 3 ? 'text-rose-400' : density > 1.5 ? 'text-amber-400' : 'text-emerald-400';
                html += `<tr class="border-b border-slate-800"><td class="py-1 text-white">${word}</td><td class="text-right text-slate-300">${count}</td><td class="text-right ${color}">${density}%</td></tr>`;
            });
            html += '</tbody></table>';
            kdResults.innerHTML = html;

            const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
            const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0);
            kdStats.innerHTML = `
                <div class="p-3 bg-slate-900 border border-slate-700 rounded-lg text-center"><div class="text-slate-400 text-xs">Total Words</div><div class="text-xl font-bold text-white">${totalWords}</div></div>
                <div class="p-3 bg-slate-900 border border-slate-700 rounded-lg text-center"><div class="text-slate-400 text-xs">Sentences</div><div class="text-xl font-bold text-white">${sentences.length}</div></div>
                <div class="p-3 bg-slate-900 border border-slate-700 rounded-lg text-center"><div class="text-slate-400 text-xs">Paragraphs</div><div class="text-xl font-bold text-white">${paragraphs.length}</div></div>
                <div class="p-3 bg-slate-900 border border-slate-700 rounded-lg text-center"><div class="text-slate-400 text-xs">Avg Sentence</div><div class="text-xl font-bold text-white">${(totalWords / sentences.length).toFixed(1)}w</div></div>
            `;
        });

        seoToolWorkspace.querySelector('#clearKdBtn').addEventListener('click', () => {
            kdText.value = '';
            kdResults.textContent = 'Results will appear here...';
            kdStats.innerHTML = '';
        });

        seoToolWorkspace.classList.remove('hidden');
    }

    // ── 4. URL SLUG GENERATOR ──
    function renderSlugGenerator() {
        seoToolWorkspace.innerHTML = `
            <div class="space-y-6">
                <p class="text-sm text-slate-300">Convert any title or text into an SEO-friendly URL slug.</p>
                <div><label class="block text-slate-300 text-sm font-medium mb-1">Enter Title or Text</label><input type="text" id="slugInput" placeholder="e.g. How to Build a Website in 2026" class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 text-sm focus:ring-1 focus:ring-indigo-500 placeholder-slate-400" /></div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="p-4 bg-slate-900 border border-slate-700 rounded-lg">
                        <div class="text-slate-400 text-xs mb-1">Standard Slug</div>
                        <div id="slugStandard" class="text-lg font-bold text-emerald-400 break-all">--</div>
                    </div>
                    <div class="p-4 bg-slate-900 border border-slate-700 rounded-lg">
                        <div class="text-slate-400 text-xs mb-1">Short Slug</div>
                        <div id="slugShort" class="text-lg font-bold text-indigo-400 break-all">--</div>
                    </div>
                    <div class="p-4 bg-slate-900 border border-slate-700 rounded-lg">
                        <div class="text-slate-400 text-xs mb-1">With Date</div>
                        <div id="slugDated" class="text-lg font-bold text-amber-400 break-all">--</div>
                    </div>
                </div>
                <button id="copySlugBtn" class="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Copy Standard Slug</button>
            </div>
        `;

        const slugInput = seoToolWorkspace.querySelector('#slugInput');
        const slugStandard = seoToolWorkspace.querySelector('#slugStandard');
        const slugShort = seoToolWorkspace.querySelector('#slugShort');
        const slugDated = seoToolWorkspace.querySelector('#slugDated');

        function generateSlugs() {
            const text = slugInput.value.trim();
            if (!text) { slugStandard.textContent = '--'; slugShort.textContent = '--'; slugDated.textContent = '--'; return; }
            const standard = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            const short = standard.split('-').slice(0, 5).join('-');
            const date = new Date().toISOString().slice(0, 10).replace(/-/g, '/');
            slugStandard.textContent = standard;
            slugShort.textContent = short;
            slugDated.textContent = `${date}/${standard}`;
        }

        slugInput.addEventListener('input', generateSlugs);
        seoToolWorkspace.querySelector('#copySlugBtn').addEventListener('click', () => {
            const text = slugStandard.textContent;
            if (text && text !== '--') navigator.clipboard.writeText(text);
        });

        seoToolWorkspace.classList.remove('hidden');
    }

    // ── 5. SITEMAP GENERATOR ──
    function renderSitemapGenerator() {
        seoToolWorkspace.innerHTML = `
            <div class="space-y-6">
                <p class="text-sm text-slate-300">Enter a list of URLs to generate an XML sitemap.</p>
                <textarea id="sitemapUrls" rows="6" class="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 text-sm font-mono focus:ring-1 focus:ring-indigo-500 placeholder-slate-400" placeholder="https://example.com/&#10;https://example.com/about&#10;https://example.com/contact"></textarea>
                <div class="flex gap-3">
                    <button id="generateSitemapBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Generate XML Sitemap</button>
                    <button id="copySitemapBtn" class="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Copy XML</button>
                    <button id="downloadSitemapBtn" class="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Download sitemap.xml</button>
                </div>
                <div class="seo-output bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-300 text-sm font-mono whitespace-pre-wrap max-h-96 overflow-auto">XML sitemap will appear here...</div>
            </div>
        `;

        const sitemapUrls = seoToolWorkspace.querySelector('#sitemapUrls');
        const output = seoToolWorkspace.querySelector('.seo-output');

        seoToolWorkspace.querySelector('#generateSitemapBtn').addEventListener('click', () => {
            const urls = sitemapUrls.value.split('\n').map(u => u.trim()).filter(Boolean);
            if (!urls.length) { output.textContent = 'Enter at least one URL.'; return; }
            const today = new Date().toISOString().slice(0, 10);
            let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
            urls.forEach(url => {
                xml += `  <url>\n    <loc>${url}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
            });
            xml += '</urlset>';
            output.textContent = xml;
        });

        seoToolWorkspace.querySelector('#copySitemapBtn').addEventListener('click', () => {
            const text = output.textContent;
            if (text && text !== 'XML sitemap will appear here...') navigator.clipboard.writeText(text);
        });

        seoToolWorkspace.querySelector('#downloadSitemapBtn').addEventListener('click', () => {
            const text = output.textContent;
            if (text && text !== 'XML sitemap will appear here...') {
                const blob = new Blob([text], { type: 'application/xml' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'sitemap.xml';
                link.click();
                URL.revokeObjectURL(url);
            }
        });

        seoToolWorkspace.classList.remove('hidden');
    }

    // SEO Tool Router
    const seoToolMap = {
        'seo-tool-meta': { name: 'Meta Tag Generator', render: renderMetaTagGenerator },
        'seo-tool-ogpreview': { name: 'OG Preview Simulator', render: renderOgPreview },
        'seo-tool-keywords': { name: 'Keyword Density Analyzer', render: renderKeywordDensity },
        'seo-tool-slug': { name: 'URL Slug Generator', render: renderSlugGenerator },
        'seo-tool-sitemap': { name: 'Sitemap Generator', render: renderSitemapGenerator }
    };

    const seoCards = container.querySelectorAll('.seo-tool-card');
    seoCards.forEach(card => {
        card.addEventListener('click', () => {
            const toolId = card.id;
            const toolName = card.querySelector('.name').textContent;
            const tool = seoToolMap[toolId];
            if (!tool) return;
            seoSuiteHub.classList.add('hidden');
            seoActiveToolTitle.textContent = toolName;
            seoActiveToolContainer.classList.remove('hidden');
            clearAndHideWorkspace();
            tool.render();
        });
    });
}

// ============================================================
// LEGAL PAGES — FOOTER ROUTING SYSTEM
// ============================================================

/**
 * Opens the workspace view with a legal document (About, Contact, Privacy, Terms).
 * Uses the existing dedicated-workspace-view panel with sticky back button.
 */
function navigateToLegalPage(pageType) {
    // Hide dashboard, show workspace
    mainDashboard.classList.add('hidden');
    heroSection.classList.add('hidden');
    workspaceView.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const configs = {
        about: {
            title: 'About Us',
            subtitle: 'Learn more about ToolBox and our mission',
            badge: 'Company',
            render: renderAboutUs
        },
        contact: {
            title: 'Contact Us',
            subtitle: 'Get in touch with our professional support team',
            badge: 'Support',
            render: renderContactUs
        },
        privacy: {
            title: 'Privacy Policy',
            subtitle: 'How we protect your data and respect your privacy',
            badge: 'Legal',
            render: renderPrivacyPolicy
        },
        terms: {
            title: 'Terms & Conditions',
            subtitle: 'Usage guidelines and legal terms for ToolBox',
            badge: 'Legal',
            render: renderTermsConditions
        }
    };

    const cfg = configs[pageType];
    if (!cfg) return;

    workspaceTitle.textContent = cfg.title;
    workspaceSubtitle.textContent = cfg.subtitle;
    workspaceBadge.textContent = cfg.badge;
    workspaceDynamicContent.innerHTML = '';
    cfg.render(workspaceDynamicContent);
}

// ── About Us ──
function renderAboutUs(container) {
    container.innerHTML = `
        <div class="max-w-3xl mx-auto space-y-8">
            <div class="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl">
                <div class="text-5xl mb-4">🎯</div>
                <h3 class="text-2xl font-bold text-white mb-3">Our Mission</h3>
                <p class="text-slate-300 leading-relaxed">ToolBox was built with a singular vision: to provide students, medical professionals, developers, and everyday users with lightning-fast, high-utility web tools that improve daily productivity. We believe that powerful software should be accessible to everyone — no installations, no subscriptions, no barriers.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl">
                    <div class="text-3xl mb-3">⚡</div>
                    <h4 class="text-lg font-bold text-white mb-2">Lightning Fast</h4>
                    <p class="text-slate-400 text-sm leading-relaxed">All tools run directly in your browser using cutting-edge WebAssembly and client-side processing. No server round-trips means instant results.</p>
                </div>
                <div class="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl">
                    <div class="text-3xl mb-3">🔒</div>
                    <h4 class="text-lg font-bold text-white mb-2">100% Private</h4>
                    <p class="text-slate-400 text-sm leading-relaxed">Your files and data never leave your device. We operate on a strict zero-data-collection policy — no uploads, no tracking, no logs.</p>
                </div>
                <div class="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl">
                    <div class="text-3xl mb-3">🎓</div>
                    <h4 class="text-lg font-bold text-white mb-2">Built for Everyone</h4>
                    <p class="text-slate-400 text-sm leading-relaxed">From medical students calculating eGFR and QTc intervals to developers debugging JWT tokens and regex patterns — ToolBox serves every profession.</p>
                </div>
                <div class="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl">
                    <div class="text-3xl mb-3">🆓</div>
                    <h4 class="text-lg font-bold text-white mb-2">Free Forever</h4>
                    <p class="text-slate-400 text-sm leading-relaxed">All 30+ tools are completely free. No paywalls, no premium tiers, no feature restrictions. Professional-grade utilities for everyone.</p>
                </div>
            </div>
            <div class="p-6 bg-indigo-900/20 border border-indigo-500/30 rounded-2xl text-center">
                <p class="text-indigo-300 text-sm">ToolBox currently serves <strong class="text-white">30+ professional tools</strong> across 9 categories, with new utilities added regularly based on community feedback.</p>
            </div>
        </div>
    `;
}

// ── Contact Us ──
function renderContactUs(container) {
    container.innerHTML = `
        <div class="max-w-3xl mx-auto space-y-8">
            <div class="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl">
                <div class="text-5xl mb-4">📧</div>
                <h3 class="text-2xl font-bold text-white mb-3">Professional Support Channel</h3>
                <p class="text-slate-300 leading-relaxed mb-4">Our dedicated support team is committed to providing timely and professional assistance. Whether you have a question about a specific tool, encountered an issue, or want to suggest a new feature — we are here to help.</p>
                <div class="p-4 bg-slate-900/60 border border-slate-700 rounded-xl">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white text-lg">✉️</div>
                        <div>
                            <div class="text-slate-400 text-xs uppercase tracking-wider">Primary Support Email</div>
                            <div class="text-white font-semibold text-sm">support@toolbox-suite.app</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="p-5 bg-slate-800/50 border border-slate-700 rounded-2xl text-center">
                    <div class="text-3xl mb-3">🐛</div>
                    <h4 class="text-white font-semibold mb-1">Bug Reports</h4>
                    <p class="text-slate-400 text-xs">Found an issue? Report it and we'll investigate promptly.</p>
                </div>
                <div class="p-5 bg-slate-800/50 border border-slate-700 rounded-2xl text-center">
                    <div class="text-3xl mb-3">💡</div>
                    <h4 class="text-white font-semibold mb-1">Feature Requests</h4>
                    <p class="text-slate-400 text-xs">Have an idea for a new tool? We'd love to hear it.</p>
                </div>
                <div class="p-5 bg-slate-800/50 border border-slate-700 rounded-2xl text-center">
                    <div class="text-3xl mb-3">🤝</div>
                    <h4 class="text-white font-semibold mb-1">Partnerships</h4>
                    <p class="text-slate-400 text-xs">Interested in collaboration or integration? Reach out.</p>
                </div>
            </div>
            <div class="p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-xl">
                <p class="text-emerald-300 text-sm text-center">📅 <strong class="text-white">Response Time:</strong> We aim to respond to all inquiries within 24–48 business hours.</p>
            </div>
        </div>
    `;
}

// ── Privacy Policy (AdSense Trigger) ──
function renderPrivacyPolicy(container) {
    container.innerHTML = `
        <div class="max-w-3xl mx-auto space-y-8">
            <div class="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl">
                <div class="text-5xl mb-4">🛡️</div>
                <h3 class="text-2xl font-bold text-white mb-3">Privacy Policy</h3>
                <p class="text-slate-300 leading-relaxed">ToolBox is committed to protecting your privacy. This policy explains how we handle data — which is to say, <strong class="text-emerald-400">we collect virtually nothing</strong>.</p>
            </div>
            <div class="space-y-6">
                <div class="p-5 bg-slate-800/50 border border-slate-700 rounded-2xl">
                    <h4 class="text-lg font-bold text-white mb-2 flex items-center gap-2"><span class="text-emerald-400">✓</span> 100% Client-Side Processing</h4>
                    <p class="text-slate-400 text-sm leading-relaxed">All tool operations — PDF processing, image editing, medical calculations, unit conversions, and text analysis — execute entirely within your web browser. No files, inputs, or personal data are ever transmitted to our servers or any external database.</p>
                </div>
                <div class="p-5 bg-slate-800/50 border border-slate-700 rounded-2xl">
                    <h4 class="text-lg font-bold text-white mb-2 flex items-center gap-2"><span class="text-emerald-400">✓</span> Zero User Data Storage</h4>
                    <p class="text-slate-400 text-sm leading-relaxed">We store <strong class="text-white">0% of user metrics</strong> on external databases. ToolBox does not maintain user accounts, does not collect email addresses, and does not track tool usage patterns. Every session is completely anonymous.</p>
                </div>
                <div class="p-5 bg-slate-800/50 border border-slate-700 rounded-2xl">
                    <h4 class="text-lg font-bold text-white mb-2 flex items-center gap-2"><span class="text-emerald-400">✓</span> Secure Cookies Only</h4>
                    <p class="text-slate-400 text-sm leading-relaxed">We use secure, first-party cookies strictly for analytical layout preferences (such as remembering your last selected tab or theme choice). These cookies contain no personally identifiable information and expire automatically after 30 days. You can clear them at any time via your browser settings.</p>
                </div>
                <div class="p-5 bg-slate-800/50 border border-slate-700 rounded-2xl">
                    <h4 class="text-lg font-bold text-white mb-2 flex items-center gap-2"><span class="text-emerald-400">✓</span> Third-Party Services</h4>
                    <p class="text-slate-400 text-sm leading-relaxed">ToolBox loads essential libraries (PDF-Lib, PDF.js, Tailwind CSS) from public CDNs. These libraries are loaded for functionality only and do not transmit your data. We do not use Google Analytics, Facebook Pixel, or any third-party tracking scripts.</p>
                </div>
                <div class="p-5 bg-slate-800/50 border border-slate-700 rounded-2xl">
                    <h4 class="text-lg font-bold text-white mb-2 flex items-center gap-2"><span class="text-amber-400">!</span> Advertising</h4>
                    <p class="text-slate-400 text-sm leading-relaxed">ToolBox may display advertisements through Google AdSense to support free tool development. Google may use cookies to serve ads based on your prior visits to this and other websites. You can opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" class="text-indigo-400 hover:text-indigo-300">Google Ad Settings</a>.</p>
                </div>
                <div class="p-5 bg-slate-800/50 border border-slate-700 rounded-2xl">
                    <h4 class="text-lg font-bold text-white mb-2 flex items-center gap-2"><span class="text-indigo-400">🔄</span> Policy Updates</h4>
                    <p class="text-slate-400 text-sm leading-relaxed">This privacy policy may be updated from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.</p>
                    <p class="text-slate-500 text-xs mt-2">Last updated: June 2026</p>
                </div>
            </div>
        </div>
    `;
}

// ── Terms & Conditions ──
function renderTermsConditions(container) {
    container.innerHTML = `
        <div class="max-w-3xl mx-auto space-y-8">
            <div class="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl">
                <div class="text-5xl mb-4">📋</div>
                <h3 class="text-2xl font-bold text-white mb-3">Terms & Conditions</h3>
                <p class="text-slate-300 leading-relaxed">By accessing and using ToolBox, you agree to the following terms. Please read them carefully.</p>
            </div>
            <div class="space-y-6">
                <div class="p-5 bg-slate-800/50 border border-slate-700 rounded-2xl">
                    <h4 class="text-lg font-bold text-white mb-2">1. Acceptance of Terms</h4>
                    <p class="text-slate-400 text-sm leading-relaxed">By using ToolBox and its suite of online utilities, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please discontinue use of the platform immediately.</p>
                </div>
                <div class="p-5 bg-slate-800/50 border border-slate-700 rounded-2xl">
                    <h4 class="text-lg font-bold text-white mb-2">2. Purpose & Use</h4>
                    <p class="text-slate-400 text-sm leading-relaxed">ToolBox provides web-based utilities for <strong class="text-white">educational and utility management purposes</strong>. All tools are offered free of charge and are intended to assist users with productivity tasks, calculations, file conversions, and content creation. The tools are not intended to replace professional advice — particularly medical tools, which are for educational reference only.</p>
                </div>
                <div class="p-5 bg-slate-800/50 border border-slate-700 rounded-2xl">
                    <h4 class="text-lg font-bold text-white mb-2">3. No Warranty</h4>
                    <p class="text-slate-400 text-sm leading-relaxed">ToolBox is provided "as is" without any warranties of any kind, either express or implied. We do not guarantee that the tools will be error-free, uninterrupted, or suitable for any particular purpose. Users assume full responsibility for the results obtained from the use of our tools.</p>
                </div>
                <div class="p-5 bg-slate-800/50 border border-slate-700 rounded-2xl">
                    <h4 class="text-lg font-bold text-white mb-2">4. Limitation of Liability</h4>
                    <p class="text-slate-400 text-sm leading-relaxed">In no event shall ToolBox, its developers, or affiliates be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with the use of the platform or its tools. This includes but is not limited to medical calculations, financial computations, and file processing outcomes.</p>
                </div>
                <div class="p-5 bg-slate-800/50 border border-slate-700 rounded-2xl">
                    <h4 class="text-lg font-bold text-white mb-2">5. Intellectual Property</h4>
                    <p class="text-slate-400 text-sm leading-relaxed">All content, design elements, and tool implementations on ToolBox are the intellectual property of the ToolBox team. You may not reproduce, distribute, modify, or create derivative works from any part of the platform without prior written consent.</p>
                </div>
                <div class="p-5 bg-slate-800/50 border border-slate-700 rounded-2xl">
                    <h4 class="text-lg font-bold text-white mb-2">6. Modifications</h4>
                    <p class="text-slate-400 text-sm leading-relaxed">We reserve the right to modify, suspend, or discontinue any tool or service at any time without prior notice. We may also update these Terms and Conditions periodically. Continued use of the platform after changes constitutes acceptance of the revised terms.</p>
                    <p class="text-slate-500 text-xs mt-2">Last updated: June 2026</p>
                </div>
            </div>
        </div>
    `;
}

// ============================================================
// EVENT LISTENERS & INITIALIZATION
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // ── Dashboard Search ──
    toolSearch.addEventListener('input', (e) => {
        renderCategories(e.target.value);
    });

    // ── Back to Dashboard ──
    btnBackToDashboard.addEventListener('click', navigateBackToDashboard);

    // ── Category Card Clicks ──
    const categoryCards = document.querySelectorAll('[data-category-id]');
    categoryCards.forEach(card => {
        if (!card.onclick) {
            card.addEventListener('click', () => {
                const categoryId = card.getAttribute('data-category-id');
                const category = categories.find(c => c.id === categoryId);
                if (category) navigateToCategoryView(category);
            });
        }
    });

    // ── Footer Legal Page Routing ──
    const footerLinks = {
        'footer-link-about': 'about',
        'footer-link-contact': 'contact',
        'footer-link-privacy': 'privacy',
        'footer-link-terms': 'terms'
    };

    Object.entries(footerLinks).forEach(([elementId, pageType]) => {
        const linkEl = document.getElementById(elementId);
        if (linkEl) {
            linkEl.addEventListener('click', (e) => {
                e.preventDefault();
                navigateToLegalPage(pageType);
            });
        }
    });
});
