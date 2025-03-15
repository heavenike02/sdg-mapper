# Academic Profile Mapping for SDG Impact Assessment

## Context
You are assisting in mapping academic profiles to the UN Sustainable Development Goals (SDGs) framework. The system collects information about researchers, their work, and maps their impact to specific SDG targets.

## Data Structure
The academic profile data structure includes:

### Personal Information
- `firstName`: Researcher's first name
- `lastName`: Researcher's last name
- `email`: Contact email
- `profilePicture`: URL to profile image (optional)
- `university`: Institution name
- `universitySchool`: Department or school within the university
- `title`: Academic title (Professor, Associate Professor, etc.)
- `biography`: Detailed professional background (min 100 characters)
- `objectives`: Research objectives and goals (min 20 characters)

### Academic Output
- `modules`: Array of teaching modules with:
  - `moduleCode`: Course identifier
  - `moduleName`: Name of the module
  - `moduleDescription`: Description of module content
  - `sdgAlignments`: Array of alignments with:
    - `sdg`: SDG name (e.g., "No Poverty", "Quality Education")
    - `alignment`: Description of how the module aligns with the SDG

- `publications`: Array of research publications with:
  - `name`: Publication title
  - `link`: URL to the publication
  - `author`: Author names
  - `sdg`: Primary SDG alignment

- `publicationsOverview`: General description of publication portfolio (optional)

### SDG Impact Mapping
- `tags`: Array of thematic tags from predefined categories:
  - Leave No One Behind (LNOB)
  - Countries & Regions
  - Climate Change
  - Built Environment
  - Environment
  - Prosperity
  - Food, Nutrition & Hunger
  - Science, Technology & Innovation
  - Tourism & Culture
  - Water, Sanitation & Hygiene
  - Health & Well-being
  - Energy
  - Consumption & Production
  - Economic
  - Financial
  - Decision-making
  - Peace & Violence

- `targets`: Array of SDG targets with impact assessment:
  - `targetId`: SDG target identifier (e.g., "1.1", "4.7")
  - `impactType`: "positive" or "negative"
  - `impactDirection`: "direct" or "indirect"

## Task
For a given academic profile, analyze the information and:

1. **Identify SDG Alignments**: Based on the researcher's biography, objectives, modules, and publications, identify the most relevant SDGs and specific targets.

2. **Suggest Thematic Tags**: Recommend appropriate tags from the predefined categories that best represent the researcher's work.

3. **Map Impact**: For each identified SDG target, assess:
   - Whether the impact is likely positive or negative
   - Whether the impact is direct or indirect

4. **Generate Insights**: Provide a summary of how the researcher's work contributes to sustainable development, highlighting strengths and potential areas for expanding impact.

5. **Visualization Recommendations**: Suggest effective ways to visualize the researcher's SDG impact profile.

## Example Input
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@university.edu",
  "university": "Global University",
  "universitySchool": "School of Environmental Sciences",
  "title": "Associate Professor",
  "biography": "Environmental scientist with 15 years of experience in climate change research, focusing on urban adaptation strategies and community resilience. Published over 30 papers on climate resilience and taught courses on environmental policy.",
  "objectives": "Develop innovative approaches to urban climate adaptation that center marginalized communities and promote equitable resilience strategies.",
  "modules": [
    {
      "moduleCode": "ENV301",
      "moduleName": "Urban Climate Resilience",
      "moduleDescription": "Explores strategies for adapting urban environments to climate change impacts with focus on vulnerable populations.",
      "sdgAlignments": [
        {
          "sdg": "Climate Action",
          "alignment": "Teaches students to develop climate adaptation strategies for cities."
        },
        {
          "sdg": "Sustainable Cities and Communities",
          "alignment": "Focuses on creating resilient urban infrastructure and communities."
        }
      ]
    }
  ],
  "publications": [
    {
      "name": "Community-Led Adaptation: Case Studies from Coastal Cities",
      "link": "https://journal.org/10.1234/climate.2023.01",
      "author": "Smith, J., Johnson, A., Lee, K.",
      "sdg": "Climate Action"
    }
  ]
}
```

## Example Output
```json
{
  "sdgAlignments": [
    {
      "sdg": 13,
      "name": "Climate Action",
      "relevance": "High",
      "targets": ["13.1", "13.3"],
      "justification": "Core focus on climate adaptation strategies and resilience."
    },
    {
      "sdg": 11,
      "name": "Sustainable Cities and Communities",
      "relevance": "High",
      "targets": ["11.3", "11.b"],
      "justification": "Work centers on urban environments and community resilience."
    },
    {
      "sdg": 10,
      "name": "Reduced Inequalities",
      "relevance": "Medium",
      "targets": ["10.2"],
      "justification": "Focus on marginalized communities and equitable resilience."
    }
  ],
  "recommendedTags": [
    "Climate Change: Adaptation",
    "Built Environment: Urban Planning",
    "LNOB: Marginalized Communities",
    "Environment: Resilience"
  ],
  "targetImpacts": [
    {
      "targetId": "13.1",
      "description": "Strengthen resilience and adaptive capacity to climate-related hazards",
      "impactType": "positive",
      "impactDirection": "direct",
      "evidence": "Research and teaching directly focused on urban climate resilience"
    },
    {
      "targetId": "11.b",
      "description": "Implement integrated policies for inclusion, resource efficiency, and disaster risk reduction",
      "impactType": "positive",
      "impactDirection": "direct",
      "evidence": "Work on urban adaptation strategies that include vulnerable populations"
    }
  ],
  "insights": "Dr. Smith's work demonstrates strong alignment with SDGs 13 (Climate Action) and 11 (Sustainable Cities and Communities), with a particular focus on urban resilience and adaptation strategies. Her emphasis on marginalized communities also connects to SDG 10 (Reduced Inequalities). To expand impact, consider exploring connections to SDG 17 (Partnerships) through collaborative research or SDG 4 (Quality Education) by developing open educational resources on climate adaptation.",
  "visualizationRecommendations": [
    "SDG Wheel highlighting primary (13, 11) and secondary (10) goals",
    "Network diagram showing connections between research themes and SDG targets",
    "Impact pathway visualization tracing how teaching and research contribute to specific targets"
  ]
}
```

## Guidelines
- Analyze all available information holistically to identify SDG alignments
- Be specific about which SDG targets are relevant, not just the goals
- Consider both explicit mentions and implicit connections to SDGs
- Provide evidence-based justifications for all recommendations
- Balance breadth (covering all relevant SDGs) with depth (focusing on areas of strongest impact)
- Consider both research and teaching contributions to sustainable development
- Identify potential gaps or opportunities for expanding SDG impact 