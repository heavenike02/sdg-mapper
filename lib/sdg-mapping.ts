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
  "children": ["1.2", "4.1", "4.2"],
  "youth": ["4.4", "8.6", "8.b"],
  "older persons": ["1.3", "3.8", "10.2"],
  "indigenous peoples": ["2.3", "4.5", "10.2"],
  "persons with disabilities": ["4.5", "8.5", "10.2"],
  "migrant workers": ["8.8", "10.7"],
  "migration": ["10.7", "16.9"],
  "migrant remittances": ["10.c"],
  "vulnerable people": ["1.4", "1.5", "11.5"],
  "marginalized communities": ["1.4", "10.2", "11.1"],
  "companies": ["8.2", "8.3", "9.2"],
  "equity": ["1.4", "4.5", "10.3"],
  "equality / inequality": ["5.1", "10.2", "10.3"],
  "human rights": ["5.1", "8.7", "16.3"],
  "inclusive": ["4.5", "8.5", "10.2"],
  "gender": ["4.3", "5.1", "5.5"],
  "poor / poverty": ["1.1", "1.2", "1.4"]
};

export const sdgTargets: { [key: string]: SDGTarget } = {
  "1.1": {
    id: "1.1",
    title: "Eradicate Extreme Poverty",
    description: "By 2030, eradicate extreme poverty for all people everywhere, currently measured as people living on less than $1.25 a day",
    exampleActions: [
      "Implement poverty reduction programs",
      "Provide direct financial assistance",
      "Create sustainable job opportunities"
    ]
  },
  "1.2": {
    id: "1.2",
    title: "Reduce Poverty by Half",
    description: "By 2030, reduce at least by half the proportion of men, women and children of all ages living in poverty in all its dimensions according to national definitions",
    exampleActions: [
      "Develop targeted poverty reduction strategies",
      "Implement social protection systems",
      "Improve access to basic services"
    ]
  },
  "1.3": {
    id: "1.3",
    title: "Social Protection Systems",
    description: "Implement nationally appropriate social protection systems and measures for all, including floors, and by 2030 achieve substantial coverage of the poor and the vulnerable",
    exampleActions: [
      "Establish social security programs",
      "Provide healthcare coverage",
      "Implement pension systems"
    ]
  },
  "1.4": {
    id: "1.4",
    title: "Equal Rights to Resources",
    description: "By 2030, ensure that all men and women, in particular the poor and the vulnerable, have equal rights to economic resources",
    exampleActions: [
      "Secure land rights",
      "Provide access to financial services",
      "Ensure access to basic services"
    ]
  },
  "1.5": {
    id: "1.5",
    title: "Build Resilience",
    description: "By 2030, build the resilience of the poor and those in vulnerable situations and reduce their exposure to climate-related extreme events",
    exampleActions: [
      "Develop early warning systems",
      "Implement disaster risk reduction strategies",
      "Create climate adaptation programs"
    ]
  },
  "2.3": {
    id: "2.3",
    title: "Small-scale Food Producers",
    description: "By 2030, double the agricultural productivity and incomes of small-scale food producers",
    exampleActions: [
      "Provide access to land and resources",
      "Improve agricultural techniques",
      "Facilitate market access"
    ]
  },
  "3.8": {
    id: "3.8",
    title: "Universal Health Coverage",
    description: "Achieve universal health coverage, including financial risk protection and access to quality healthcare services",
    exampleActions: [
      "Expand healthcare coverage",
      "Improve healthcare infrastructure",
      "Reduce out-of-pocket expenses"
    ]
  },
  "4.1": {
    id: "4.1",
    title: "Free Primary and Secondary Education",
    description: "By 2030, ensure that all girls and boys complete free, equitable and quality primary and secondary education",
    exampleActions: [
      "Eliminate school fees",
      "Improve educational infrastructure",
      "Provide learning materials"
    ]
  },
  "4.2": {
    id: "4.2",
    title: "Early Childhood Development",
    description: "By 2030, ensure that all girls and boys have access to quality early childhood development, care and pre-primary education",
    exampleActions: [
      "Establish early childhood centers",
      "Train early childhood educators",
      "Develop age-appropriate curricula"
    ]
  },
  "4.3": {
    id: "4.3",
    title: "Technical and Higher Education",
    description: "By 2030, ensure equal access for all women and men to affordable and quality technical, vocational and tertiary education",
    exampleActions: [
      "Provide scholarships",
      "Develop vocational training programs",
      "Improve higher education access"
    ]
  },
  "4.4": {
    id: "4.4",
    title: "Relevant Skills for Employment",
    description: "By 2030, substantially increase the number of youth and adults who have relevant skills for employment, decent jobs and entrepreneurship",
    exampleActions: [
      "Provide skills training",
      "Develop entrepreneurship programs",
      "Create job placement services"
    ]
  },
  "4.5": {
    id: "4.5",
    title: "Equal Access to Education",
    description: "By 2030, eliminate gender disparities in education and ensure equal access to all levels of education for the vulnerable",
    exampleActions: [
      "Remove barriers to education",
      "Provide targeted support",
      "Implement inclusive policies"
    ]
  },
  "5.1": {
    id: "5.1",
    title: "End Discrimination Against Women",
    description: "End all forms of discrimination against all women and girls everywhere",
    exampleActions: [
      "Reform discriminatory laws",
      "Promote gender equality",
      "Raise awareness"
    ]
  },
  "5.5": {
    id: "5.5",
    title: "Women's Leadership",
    description: "Ensure women's full and effective participation and equal opportunities for leadership at all levels of decision-making",
    exampleActions: [
      "Promote women in leadership",
      "Implement quotas",
      "Provide leadership training"
    ]
  },
  "8.2": {
    id: "8.2",
    title: "Economic Productivity",
    description: "Achieve higher levels of economic productivity through diversification, technological upgrading and innovation",
    exampleActions: [
      "Invest in technology",
      "Support innovation",
      "Improve efficiency"
    ]
  },
  "8.3": {
    id: "8.3",
    title: "Development-oriented Policies",
    description: "Promote development-oriented policies that support productive activities, decent job creation, entrepreneurship, creativity and innovation",
    exampleActions: [
      "Support small businesses",
      "Facilitate access to finance",
      "Reduce regulatory barriers"
    ]
  },
  "8.5": {
    id: "8.5",
    title: "Full Employment",
    description: "By 2030, achieve full and productive employment and decent work for all women and men, including for young people and persons with disabilities",
    exampleActions: [
      "Create job opportunities",
      "Ensure equal pay",
      "Improve working conditions"
    ]
  },
  "8.6": {
    id: "8.6",
    title: "Youth Employment",
    description: "By 2020, substantially reduce the proportion of youth not in employment, education or training",
    exampleActions: [
      "Provide youth training",
      "Create apprenticeships",
      "Support youth entrepreneurship"
    ]
  },
  "8.7": {
    id: "8.7",
    title: "End Modern Slavery",
    description: "Take immediate and effective measures to eradicate forced labour, end modern slavery and human trafficking",
    exampleActions: [
      "Strengthen labor laws",
      "Combat trafficking",
      "Protect vulnerable workers"
    ]
  },
  "8.8": {
    id: "8.8",
    title: "Labor Rights",
    description: "Protect labour rights and promote safe and secure working environments for all workers, including migrant workers",
    exampleActions: [
      "Improve workplace safety",
      "Protect worker rights",
      "Support labor unions"
    ]
  },
  "8.b": {
    id: "8.b",
    title: "Youth Employment Strategy",
    description: "By 2020, develop and operationalize a global strategy for youth employment",
    exampleActions: [
      "Develop employment strategies",
      "Create youth programs",
      "Provide career guidance"
    ]
  },
  "9.2": {
    id: "9.2",
    title: "Sustainable Industrialization",
    description: "Promote inclusive and sustainable industrialization and significantly raise industry's share of employment",
    exampleActions: [
      "Support manufacturing",
      "Promote clean industry",
      "Create industrial jobs"
    ]
  },
  "10.2": {
    id: "10.2",
    title: "Social Inclusion",
    description: "By 2030, empower and promote the social, economic and political inclusion of all",
    exampleActions: [
      "Promote inclusive policies",
      "Support marginalized groups",
      "Ensure equal opportunities"
    ]
  },
  "10.3": {
    id: "10.3",
    title: "Equal Opportunities",
    description: "Ensure equal opportunity and reduce inequalities of outcome, including by eliminating discriminatory laws, policies and practices",
    exampleActions: [
      "Reform discriminatory laws",
      "Implement fair policies",
      "Promote equality"
    ]
  },
  "10.7": {
    id: "10.7",
    title: "Migration and Mobility",
    description: "Facilitate orderly, safe, regular and responsible migration and mobility of people",
    exampleActions: [
      "Improve migration policies",
      "Protect migrant rights",
      "Support integration"
    ]
  },
  "10.c": {
    id: "10.c",
    title: "Remittance Costs",
    description: "By 2030, reduce to less than 3 per cent the transaction costs of migrant remittances and eliminate remittance corridors with costs higher than 5 per cent",
    exampleActions: [
      "Reduce transfer fees",
      "Improve financial services",
      "Support digital transfers"
    ]
  },
  "11.1": {
    id: "11.1",
    title: "Safe Housing",
    description: "By 2030, ensure access for all to adequate, safe and affordable housing and basic services",
    exampleActions: [
      "Develop affordable housing",
      "Upgrade slums",
      "Improve basic services"
    ]
  },
  "11.5": {
    id: "11.5",
    title: "Disaster Resilience",
    description: "By 2030, significantly reduce the number of deaths and the number of people affected by disasters",
    exampleActions: [
      "Improve infrastructure",
      "Develop warning systems",
      "Create evacuation plans"
    ]
  },
  "16.3": {
    id: "16.3",
    title: "Rule of Law",
    description: "Promote the rule of law at the national and international levels and ensure equal access to justice for all",
    exampleActions: [
      "Strengthen legal systems",
      "Ensure fair trials",
      "Improve access to justice"
    ]
  },
  "16.9": {
    id: "16.9",
    title: "Legal Identity",
    description: "By 2030, provide legal identity for all, including birth registration",
    exampleActions: [
      "Improve registration systems",
      "Provide documentation",
      "Support identity programs"
    ]
  }
};

export function getRecommendedTargets(selectedTags: string[]): SDGTarget[] {
  const targetIds = new Set<string>();
  
  selectedTags.forEach(tag => {
    const mappedTargets = tagToSDGMapping[tag] || [];
    mappedTargets.forEach(targetId => targetIds.add(targetId));
  });

  return Array.from(targetIds)
    .map(id => sdgTargets[id])
    .filter(target => target !== undefined);
}