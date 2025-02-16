export type Tag = { id: string; label: string; section: string };

export const groups: Tag[] = [
  { id: "children", label: "children", section: "groups" },
  { id: "youth", label: "youth", section: "groups" },
  { id: "older-persons", label: "older persons", section: "groups" },
  { id: "indigenous-peoples", label: "indigenous peoples", section: "groups" },
  {
    id: "persons-with-disabilities",
    label: "persons with disabilities",
    section: "groups",
  },
  { id: "migrant-workers", label: "migrant workers", section: "groups" },
  { id: "migration", label: "migration", section: "groups" },
  {
    id: "migrant-remittances",
    label: "migrant remittances",
    section: "groups",
  },
  { id: "vulnerable-people", label: "vulnerable people", section: "groups" },
  {
    id: "marginalized-communities",
    label: "marginalized communities",
    section: "groups",
  },
  { id: "companies", label: "companies", section: "groups" },
];

export const lnobTags: Tag[] = [
  { id: "equity", label: "equity", section: "lnob" },
  {
    id: "equality-inequality",
    label: "equality / inequality",
    section: "lnob",
  },
  { id: "human-rights", label: "human rights", section: "lnob" },
  { id: "inclusive", label: "inclusive", section: "lnob" },
  { id: "gender", label: "gender", section: "lnob" },
  { id: "poor-poverty", label: "poor / poverty", section: "lnob" },
];

export const countriesRegions: Tag[] = [
  {
    id: "developing-least-developed-countries-and-states",
    label: "developing/least developed countries and states",
    section: "countries/regions",
  },
];

export const climateChangeTags: Tag[] = [
  { id: "climate-change", label: "climate change", section: "climate-change" },
  {
    id: "climate-change-mitigation",
    label: "climate change mitigation",
    section: "climate-change",
  },
  {
    id: "climate-change-adaptation",
    label: "climate change adaptation",
    section: "climate-change",
  },
  { id: "sustainability", label: "sustainability", section: "climate-change" },
  { id: "resilience", label: "resilience", section: "climate-change" },
  { id: "disasters", label: "disasters", section: "climate-change" },
  { id: "droughts", label: "droughts", section: "climate-change" },
  { id: "floods", label: "floods", section: "climate-change" },
  {
    id: "desertification",
    label: "desertification",
    section: "climate-change",
  },
  { id: "pollution", label: "pollution", section: "climate-change" },
  { id: "air-quality", label: "air quality", section: "climate-change" },
  {
    id: "hazardous-chemicals",
    label: "hazardous chemicals",
    section: "climate-change",
  },
];

export const builtEnvironmentTags: Tag[] = [
  {
    id: "human-settlement-planning-management",
    label: "human settlement planning and management",
    section: "built-environment",
  },
  {
    id: "infrastructure",
    label: "infrastructure",
    section: "built-environment",
  },
  {
    id: "green-public-spaces",
    label: "green and public spaces",
    section: "built-environment",
  },
  { id: "transport", label: "transport", section: "built-environment" },
  { id: "roads", label: "roads", section: "built-environment" },
  { id: "buildings", label: "buildings", section: "built-environment" },
  {
    id: "safe-secure-working-environments",
    label: "safe and secure working environments",
    section: "built-environment",
  },
  { id: "schools", label: "schools", section: "built-environment" },
  { id: "housing", label: "housing", section: "built-environment" },
  { id: "household", label: "household", section: "built-environment" },
  { id: "land", label: "land", section: "built-environment" },
  { id: "slums", label: "slums", section: "built-environment" },
];

export const environmentTags: Tag[] = [
  { id: "environment", label: "environment", section: "environment" },
  { id: "biodiversity", label: "biodiversity", section: "environment" },
  {
    id: "marine-biodiversity",
    label: "marine biodiversity",
    section: "environment",
  },
  { id: "ecosystems", label: "ecosystems", section: "environment" },
  {
    id: "terrestrial-freshwater-ecosystems",
    label: "terrestrial and freshwater ecosystems",
    section: "environment",
  },
  {
    id: "marine-coastal-ecosystems",
    label: "marine and coastal ecosystems",
    section: "environment",
  },
  { id: "natural-habitats", label: "natural habitats", section: "environment" },
  { id: "mountains", label: "mountains", section: "environment" },
  { id: "forests", label: "forests", section: "environment" },
  { id: "drylands", label: "drylands", section: "environment" },
  { id: "wetlands", label: "wetlands", section: "environment" },
  { id: "oceans-seas", label: "oceans and seas", section: "environment" },
  { id: "marine-resources", label: "marine resources", section: "environment" },
  { id: "fishing", label: "fishing", section: "environment" },
  { id: "aquaculture", label: "aquaculture", section: "environment" },
  { id: "fisheries", label: "fisheries", section: "environment" },
  {
    id: "ocean-acidification",
    label: "ocean acidification",
    section: "environment",
  },
  {
    id: "conservation-restoration",
    label: "conservation / restoration",
    section: "environment",
  },
  {
    id: "environmental-degradation",
    label: "environmental degradation",
    section: "environment",
  },
  {
    id: "natural-resources",
    label: "natural resources",
    section: "environment",
  },
  { id: "natural-heritage", label: "natural heritage", section: "environment" },
  { id: "invasive-species", label: "invasive species", section: "environment" },
  { id: "poaching", label: "poaching", section: "environment" },
];

export const prosperityTags: Tag[] = [
  {
    id: "basic-public-services",
    label: "basic / public services",
    section: "prosperity",
  },
  {
    id: "social-protection",
    label: "social protection",
    section: "prosperity",
  },
  { id: "education", label: "education", section: "prosperity" },
];

export const foodNutritionHungerTags: Tag[] = [
  {
    id: "food-nutrition-hunger",
    label: "food / nutrition / hunger",
    section: "food-nutrition-hunger",
  },
  { id: "food-waste", label: "food waste", section: "food-nutrition-hunger" },
  { id: "agriculture", label: "agriculture", section: "food-nutrition-hunger" },
];

export const scienceTechnologyInnovationTags: Tag[] = [
  {
    id: "science-technology-innovation",
    label: "science, technology and innovation",
    section: "science-technology-innovation",
  },
  {
    id: "research",
    label: "research",
    section: "science-technology-innovation",
  },
  {
    id: "technology",
    label: "technology",
    section: "science-technology-innovation",
  },
  {
    id: "internet-access",
    label: "internet access",
    section: "science-technology-innovation",
  },
  {
    id: "genetic-resources",
    label: "genetic resources",
    section: "science-technology-innovation",
  },
];

export const tourismCultureTags: Tag[] = [
  { id: "tourism", label: "tourism", section: "tourism-culture" },
  { id: "culture", label: "culture", section: "tourism-culture" },
];

export const waterSanitationHygieneTags: Tag[] = [
  {
    id: "water-sanitation-hygiene",
    label: "water / sanitation / hygiene",
    section: "water-sanitation-hygiene",
  },
  {
    id: "water-quality",
    label: "water quality",
    section: "water-sanitation-hygiene",
  },
  {
    id: "water-efficiency",
    label: "water efficiency",
    section: "water-sanitation-hygiene",
  },
  {
    id: "water-scarcity",
    label: "water scarcity",
    section: "water-sanitation-hygiene",
  },
  {
    id: "water-harvesting",
    label: "water harvesting",
    section: "water-sanitation-hygiene",
  },
  {
    id: "desalination",
    label: "desalination",
    section: "water-sanitation-hygiene",
  },
  {
    id: "wastewater-treatment",
    label: "wastewater treatment",
    section: "water-sanitation-hygiene",
  },
  {
    id: "integrated-water-resources-management",
    label: "integrated water resources management",
    section: "water-sanitation-hygiene",
  },
];

export const healthWellBeingTags: Tag[] = [
  {
    id: "health-and-well-being",
    label: "health and well-being",
    section: "health-well-being",
  },
  { id: "health-care", label: "health-care", section: "health-well-being" },
  {
    id: "medicines-vaccines",
    label: "medicines and vaccines",
    section: "health-well-being",
  },
  { id: "mental-health", label: "mental health", section: "health-well-being" },
  {
    id: "communicable-disease",
    label: "communicable disease",
    section: "health-well-being",
  },
  {
    id: "non-communicable-disease",
    label: "non-communicable disease",
    section: "health-well-being",
  },
  {
    id: "sexual-reproductive-health",
    label: "sexual and reproductive health",
    section: "health-well-being",
  },
  {
    id: "substance-abuse",
    label: "substance abuse",
    section: "health-well-being",
  },
  { id: "tobacco", label: "tobacco", section: "health-well-being" },
];

export const energyTags: Tag[] = [
  { id: "energy", label: "energy", section: "energy" },
  { id: "energy-efficiency", label: "energy efficiency", section: "energy" },
  { id: "renewable-energy", label: "renewable energy", section: "energy" },
];

export const consumptionProductionTags: Tag[] = [
  {
    id: "consumption-production",
    label: "consumption and production",
    section: "consumption-production",
  },
  {
    id: "recycling-reuse",
    label: "recycling and reuse",
    section: "consumption-production",
  },
  {
    id: "waste-generation",
    label: "waste generation",
    section: "consumption-production",
  },
  {
    id: "waste-management",
    label: "waste management",
    section: "consumption-production",
  },
];

export const economicTags: Tag[] = [
  { id: "economic", label: "economic", section: "economic" },
  { id: "job-creation", label: "job creation", section: "economic" },
  { id: "entrepreneurship", label: "entrepreneurship", section: "economic" },
  { id: "innovation", label: "innovation", section: "economic" },
  { id: "employment", label: "employment", section: "economic" },
  {
    id: "economic-productivity",
    label: "economic productivity",
    section: "economic",
  },
  {
    id: "economic-diversification",
    label: "economic diversification",
    section: "economic",
  },
  {
    id: "resource-efficiency",
    label: "resource efficiency",
    section: "economic",
  },
  { id: "exports", label: "exports", section: "economic" },
  {
    id: "remove-trade-barriers",
    label: "remove trade barriers for least developed countries",
    section: "economic",
  },
  {
    id: "national-debt-sustainability",
    label: "national debt sustainability",
    section: "economic",
  },
  {
    id: "global-macroeconomic-stability",
    label: "enhance global macroeconomic stability",
    section: "economic",
  },
];

export const financialTags: Tag[] = [
  { id: "financial", label: "financial", section: "financial" },
  {
    id: "banking-insurance-financial-services",
    label: "banking / insurance / financial services",
    section: "financial",
  },
  {
    id: "global-financial-markets",
    label:
      "global financial markets and institutions: improved regulation and monitoring",
    section: "financial",
  },
  {
    id: "global-economic-institutions",
    label: "global international economic and financial institutions",
    section: "financial",
  },
  {
    id: "foreign-direct-investment",
    label: "foreign direct investment",
    section: "financial",
  },
  { id: "investment", label: "investment", section: "financial" },
  { id: "microfinance", label: "microfinance", section: "financial" },
  { id: "livelihoods", label: "livelihoods", section: "financial" },
  {
    id: "small-scale-producers",
    label: "small-scale producers",
    section: "financial",
  },
  {
    id: "msme",
    label: "micro-, small-, medium-sized enterprises",
    section: "financial",
  },
  { id: "forced-labour", label: "forced labour", section: "financial" },
  { id: "labour-rights", label: "labour rights", section: "financial" },
  { id: "modern-slavery", label: "modern slavery", section: "financial" },
  { id: "human-trafficking", label: "human trafficking", section: "financial" },
  { id: "industry", label: "industry", section: "financial" },
  { id: "affordable-credit", label: "affordable credit", section: "financial" },
  {
    id: "value-chains-markets",
    label: "value chains and markets",
    section: "financial",
  },
  {
    id: "industrial-diversification",
    label: "industrial diversification",
    section: "financial",
  },
  {
    id: "value-addition-commodities",
    label: "value addition to commodities",
    section: "financial",
  },
  { id: "tax", label: "tax", section: "financial" },
  { id: "subsidies", label: "subsidies", section: "financial" },
  { id: "aid-for-trade", label: "aid for trade", section: "financial" },
];

export const decisionMakingTags: Tag[] = [
  {
    id: "decision-making",
    label: "decision-making",
    section: "decision-making",
  },
  {
    id: "global-governance",
    label: "global governance",
    section: "decision-making",
  },
  {
    id: "development-assistance",
    label: "development assistance",
    section: "decision-making",
  },
  { id: "policy", label: "policy", section: "decision-making" },
  {
    id: "strategies-plans-programmes",
    label: "strategies / plans / programmes",
    section: "decision-making",
  },
  {
    id: "non-discriminatory-laws-policies",
    label: "non-discriminatory laws and policies",
    section: "decision-making",
  },
  { id: "partnerships", label: "partnerships", section: "decision-making" },
  {
    id: "transboundary-cooperation",
    label: "transboundary, regional, national cooperation",
    section: "decision-making",
  },
  { id: "participation", label: "participation", section: "decision-making" },
  {
    id: "capacity-building",
    label: "capacity building",
    section: "decision-making",
  },
  {
    id: "technical-assistance",
    label: "technical assistance",
    section: "decision-making",
  },
  {
    id: "skills-training",
    label: "skills training",
    section: "decision-making",
  },
  {
    id: "awareness-raising",
    label: "awareness raising",
    section: "decision-making",
  },
  {
    id: "risk-management",
    label: "risk management",
    section: "decision-making",
  },
  {
    id: "public-procurement-practices",
    label: "public procurement practices",
    section: "decision-making",
  },
  {
    id: "investment-promotion-regimes",
    label: "national investment promotion regimes",
    section: "decision-making",
  },
  {
    id: "multilateral-trading-system",
    label: "promote a multilateral trading system",
    section: "decision-making",
  },
  {
    id: "data-quality",
    label: "high-quality, timely and reliable data",
    section: "decision-making",
  },
  {
    id: "progress-measurements",
    label: "develop measurements of progress",
    section: "decision-making",
  },
];

export const peaceViolenceTags: Tag[] = [
  {
    id: "peace-violence",
    label: "peace / violence",
    section: "peace-violence",
  },
  { id: "justice", label: "justice", section: "peace-violence" },
  { id: "safety", label: "safety", section: "peace-violence" },
  { id: "violence", label: "violence", section: "peace-violence" },
  { id: "crime", label: "crime", section: "peace-violence" },
  {
    id: "illicit-arms-flows",
    label: "illicit and financial arms flows",
    section: "peace-violence",
  },
  {
    id: "corruption-bribery",
    label: "corruption and bribery",
    section: "peace-violence",
  },
  {
    id: "transparent-institutions",
    label: "effective, accountable and transparent institutions",
    section: "peace-violence",
  },
  { id: "terrorism", label: "terrorism", section: "peace-violence" },
  {
    id: "legal-identity",
    label: "provide legal identity",
    section: "peace-violence",
  },
  {
    id: "access-to-information",
    label: "provide access to information and protect freedoms",
    section: "peace-violence",
  },
];
