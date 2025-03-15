import "server-only";
import { neon } from "@neondatabase/serverless";

interface Target {
  targetId: string;
  impactType: string;
  impactDirection: string;
}

export async function saveAssessment(assessmentData: {
  tags: string[];
  targets: Target[];
  profilePicture?: string;
  firstName: string;
  lastName: string;
  email: string;
  university: string;
  universitySchool: string;
  title: string;
  biography: string;
  objectives: string;
  publicationsOverview?: string;
  modules: {
    moduleCode: string;
    moduleName: string;
    moduleDescription: string;
    sdgAlignments: {
      sdg: string;
      alignment: string;
    }[];
  }[];
  publications: {
    name: string;
    link: string;
    author: string;
    sdg: string;
  }[];
}) {
  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL is not defined");
    }

    const sql = neon(databaseUrl);

    // Validate required fields
    if (!assessmentData.firstName || !assessmentData.lastName || !assessmentData.email) {
      throw new Error("Missing required fields");
    }

    // Ensure targets are properly formatted
    const formattedTargets = assessmentData.targets.map(target => {
      if (!target.targetId || !target.impactType || !target.impactDirection) {
        console.error('Invalid target:', target);
        throw new Error(`Invalid target data structure: ${JSON.stringify(target)}`);
      }
      return {
        targetId: target.targetId,
        impactType: target.impactType,
        impactDirection: target.impactDirection
      };
    });

    // Log the data being sent to the database
    console.log('Formatted targets:', JSON.stringify(formattedTargets, null, 2));

    // Execute the insert statement with parameterized values
    const result = await sql`
      INSERT INTO assessments (
        tags,
        targets,
        profile_picture,
        first_name,
        last_name,
        email,
        university,
        university_school,
        title,
        biography,
        objectives,
        publications_overview,
        modules,
        publications
      )
      VALUES (
        ${assessmentData.tags || []},
        ${JSON.stringify(formattedTargets)}::jsonb,
        ${assessmentData.profilePicture || null},
        ${assessmentData.firstName},
        ${assessmentData.lastName},
        ${assessmentData.email},
        ${assessmentData.university || ''},
        ${assessmentData.universitySchool || ''},
        ${assessmentData.title || ''},
        ${assessmentData.biography || ''},
        ${assessmentData.objectives || ''},
        ${assessmentData.publicationsOverview || null},
        ${JSON.stringify(assessmentData.modules || [])}::jsonb,
        ${JSON.stringify(assessmentData.publications || [])}::jsonb
      )
      RETURNING id;
    `;

    if (!result || result.length === 0) {
      throw new Error("Failed to insert assessment data");
    }

    return result[0];
  } catch (error) {
    // Log the error details
    console.error('Error saving assessment:', error);
    console.error('Assessment data:', JSON.stringify(assessmentData, null, 2));
    
    // Rethrow with a more specific message
    throw new Error(`Failed to save assessment: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
