"use server";
import { neon } from "@neondatabase/serverless";



export async function saveAssessment(assessmentData: {
  tags: string[];
  targets: any[];
  firstName: string;
  lastName: string;
  email: string;
  university: string;
  universitySchool: string;
  title: string;
  objectives: string;
  modules: { moduleName: string; sdg: string }[];
  profilePicture?: any;
  publications?: string;
}) {

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined");
}
  // Create a Neon SQL client using the connection URL from environment variables.
  const sql = neon(databaseUrl);

  // Execute the insert statement with parameterized values.
  const result = await sql`
    INSERT INTO assessments (
      tags,
      targets,
      first_name,
      last_name,
      email,
      university,
      university_school,
      title,
      objectives,
      modules,
      profile_picture,
      publications
    )
    VALUES (
      ${assessmentData.tags},
      ${JSON.stringify(assessmentData.targets)},
      ${assessmentData.firstName},
      ${assessmentData.lastName},
      ${assessmentData.email},
      ${assessmentData.university},
      ${assessmentData.universitySchool},
      ${assessmentData.title},
      ${assessmentData.objectives},
      ${JSON.stringify(assessmentData.modules)},
      ${assessmentData.profilePicture},
      ${assessmentData.publications}
    )
    RETURNING id;
  `;

  // Assuming `result` is an array of rows, return the inserted record's id.
  return result[0];
}
