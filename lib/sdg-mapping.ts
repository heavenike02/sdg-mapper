

// Import SDG targets from the JSON file.
// The JSON file is assumed to export an array of objects.
import rawSDGTargets from "C:/dev/project/sdg-targets.json";

// SDG target mapping data
export interface SDGTarget {
  id: string;
  title: string;
  description: string;
  exampleActions: string[];
}

export interface TagToSDGMapping {
  [key: string]: string[];
}


export const tagToSDGMapping: TagToSDGMapping = {
  // Groups tags
  "children": ["1.2", "4.1", "4.2"],
  "youth": ["4.4", "8.6", "8.b"],
  "older-persons": ["1.3", "3.8", "10.2"],
  "indigenous-peoples": ["2.3", "4.5", "10.2"],
  "persons-with-disabilities": ["4.5", "8.5", "10.2"],
  "migrant-workers": ["8.8", "10.7"],
  "migration": ["10.7", "16.9"],
  "migrant-remittances": ["10.c"],
  "vulnerable-people": ["1.4", "1.5", "11.5"],
  "marginalized-communities": ["1.4", "10.2", "11.1"],
  "companies": ["8.2", "8.3", "9.2"],

  // LNOB tags
  "equity": ["1.4", "4.5", "10.3"],
  "equality-inequality": ["5.1", "10.2", "10.3"],
  "human-rights": ["5.1", "8.7", "16.3"],
  "inclusive": ["4.5", "8.5", "10.2"],
  "gender": ["4.3", "5.1", "5.5"],
  "poor-poverty": ["1.1", "1.2", "1.4"],

  // Countries / Regions
  "developing-least-developed-countries-and-states": ["10.7", "17.1", "17.2"],

  // Climate Change tags
  "climate-change": ["13.1", "13.2", "13.3"],
  "climate-change-mitigation": ["13.a"],
  "climate-change-adaptation": ["13.b"],
  "sustainability": ["12.2", "12.3"],
  "resilience": ["11.6", "13.1"],
  "disasters": ["11.5"],
  "droughts": ["6.4"],
  "floods": ["6.3"],
  "desertification": ["15.3"],
  "pollution": ["3.9", "12.4"],
  "air-quality": ["3.9"],
  "hazardous-chemicals": ["3.9"],

  // Built Environment tags
  "human-settlement-planning-management": ["11.3"],
  "infrastructure": ["9.1"],
  "green-public-spaces": ["11.7"],
  "transport": ["11.2"],
  "roads": ["11.2"],
  "buildings": ["9.4"],
  "safe-secure-working-environments": ["8.5"],
  "schools": ["4.1"],
  "housing": ["11.1"],
  "household": ["7.1"],
  "land": ["15.4"],
  "slums": ["11.1"],

  // Environment tags
  "environment": ["13.2"],
  "biodiversity": ["15.5"],
  "marine-biodiversity": ["14.2"],
  "ecosystems": ["15.1"],
  "terrestrial-freshwater-ecosystems": ["15.1"],
  "marine-coastal-ecosystems": ["14.2"],
  "natural-habitats": ["15.1"],
  "mountains": ["15.4"],
  "forests": ["15.2"],
  "drylands": ["15.3"],
  "wetlands": ["15.1"],
  "oceans-seas": ["14.5"],
  "marine-resources": ["14.7"],
  "fishing": ["14.b"],
  "aquaculture": ["14.7"],
  "fisheries": ["14.b"],
  "ocean-acidification": ["14.3"],
  "conservation-restoration": ["15.5"],
  "environmental-degradation": ["12.4"],
  "natural-resources": ["12.2"],
  "natural-heritage": ["15.1"],
  "invasive-species": ["15.8"],
  "poaching": ["15.7"],

  // Prosperity tags
  "basic-public-services": ["1.4", "3.8"],
  "social-protection": ["1.3", "1.4"],
  "education": ["4.1", "4.2"],

  // Food / Nutrition / Hunger tags
  "food-nutrition-hunger": ["2.1", "2.2"],
  "food-waste": ["12.3"],
  "agriculture": ["2.3", "2.4"],

  // Science, Technology & Innovation tags
  "science-technology-innovation": ["9.5", "17.6"],
  "research": ["9.5"],
  "technology": ["9.5"],
  "internet-access": ["9.c"],
  "genetic-resources": ["15.6"],

  // Tourism & Culture tags
  "tourism": ["8.9"],
  "culture": ["11.a"],

  // Water / Sanitation / Hygiene tags
  "water-sanitation-hygiene": ["6.1", "6.2"],
  "water-quality": ["6.3"],
  "water-efficiency": ["6.4"],
  "water-scarcity": ["6.4"],
  "water-harvesting": ["6.a"],
  "desalination": ["7.1"],
  "wastewater-treatment": ["6.6"],
  "integrated-water-resources-management": ["6.5"],

  // Health & Well-Being tags
  "health-and-well-being": ["3.8"],
  "health-care": ["3.8"],
  "medicines-vaccines": ["3.8"],
  "mental-health": ["3.4"],
  "communicable-disease": ["3.3"],
  "non-communicable-disease": ["3.4"],
  "sexual-reproductive-health": ["3.7"],
  "substance-abuse": ["3.5"],
  "tobacco": ["3.a"],

  // Energy tags
  "energy": ["7.1"],
  "energy-efficiency": ["7.3"],
  "renewable-energy": ["7.2"],

  // Consumption & Production tags
  "consumption-production": ["12.1"],
  "recycling-reuse": ["12.5"],
  "waste-generation": ["12.5"],
  "waste-management": ["12.4"],

  // Economic tags
  "economic": ["8.2"],
  "job-creation": ["8.5"],
  "entrepreneurship": ["8.3"],
  "innovation": ["9.5"],
  "employment": ["8.5"],
  "economic-productivity": ["8.2"],
  "economic-diversification": ["8.2"],
  "resource-efficiency": ["12.2"],
  "exports": ["8.8"],
  "remove-trade-barriers": ["10.3"],
  "national-debt-sustainability": ["10.6"],
  "global-macroeconomic-stability": ["10.6"],

  // Financial tags
  "financial": ["17.1"],
  "banking-insurance-financial-services": ["17.1"],
  "global-financial-markets": ["17.5"],
  "global-economic-institutions": ["17.6"],
  "foreign-direct-investment": ["8.8"],
  "investment": ["8.8"],
  "microfinance": ["10.a"],
  "livelihoods": ["1.4"],
  "small-scale-producers": ["2.3"],
  "msme": ["8.8"],
  "forced-labour": ["8.7"],
  "labour-rights": ["8.7"],
  "modern-slavery": ["8.7"],
  "human-trafficking": ["8.7"],
  "industry": ["9.2"],
  "affordable-credit": ["8.8"],
  "value-chains-markets": ["8.9"],
  "industrial-diversification": ["9.2"],
  "value-addition-commodities": ["8.9"],
  "tax": ["10.5"],
  "subsidies": ["10.5"],
  "aid-for-trade": ["8.a"],

  // Decision-Making tags
  "decision-making": ["16.7"],
  "global-governance": ["16.8"],
  "development-assistance": ["17.2"],
  "policy": ["17.14"],
  "strategies-plans-programmes": ["17.13"],
  "non-discriminatory-laws-policies": ["16.5"],
  "partnerships": ["17.16"],
  "transboundary-cooperation": ["17.6"],
  "participation": ["16.7"],
  "capacity-building": ["17.6"],
  "technical-assistance": ["17.6"],
  "skills-training": ["17.6"],
  "awareness-raising": ["17.18"],
  "risk-management": ["16.4"],
  "public-procurement-practices": ["12.7"],
  "investment-promotion-regimes": ["17.5"],
  "multilateral-trading-system": ["17.1"],
  "data-quality": ["17.18"],
  "progress-measurements": ["17.19"],

  // Peace & Violence tags
  "peace-violence": ["16.1"],
  "justice": ["16.3"],
  "safety": ["16.1"],
  "violence": ["16.1"],
  "crime": ["16.4"],
  "illicit-arms-flows": ["16.4"],
  "corruption-bribery": ["16.5"],
  "transparent-institutions": ["16.6"],
  "terrorism": ["16.4"],
  "legal-identity": ["16.9"],
  "access-to-information": ["16.1"]
};
// Define the shape of the raw JSON data.
interface RawSDGTarget {
  goal: number;
  target: number;
  description: string;
}

// Transform the raw JSON array into a dictionary of SDGTarget.
// We assume the JSON is an array of objects following the RawSDGTarget interface.
export const sdgTargets: { [key: string]: SDGTarget } = (rawSDGTargets as RawSDGTarget[]).reduce((acc, item) => {
  // Convert the numeric target to a string.
  // You may need additional formatting if necessary.
  const id = String(item.target);
  acc[id] = {
    id,
    title: `Goal ${item.goal} - Target ${item.target}`,
    description: item.description,
    exampleActions: [] // default empty array; update as needed
  };
  return acc;
}, {} as { [key: string]: SDGTarget });

export function getRecommendedTargets(selectedTags: string[]): SDGTarget[] {
  const targetIds = new Set<string>();

  selectedTags.forEach(tag => {
    const mappedTargets = tagToSDGMapping[tag] || [];
    mappedTargets.forEach(targetId => targetIds.add(targetId));
  });

  return Array.from(targetIds)
    .map(id => sdgTargets[id])
    .filter((target): target is SDGTarget => target !== undefined);
}
