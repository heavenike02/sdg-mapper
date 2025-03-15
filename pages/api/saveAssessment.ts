import { NextApiRequest, NextApiResponse } from "next";
import { saveAssessment } from "@/actions/data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const assessmentData = req.body;
      
      // Validate the request body
      if (!assessmentData) {
        return res.status(400).json({ error: "Missing request body" });
      }

      // Validate required fields
      const requiredFields = ['firstName', 'lastName', 'email', 'targets'];
      const missingFields = requiredFields.filter(field => !assessmentData[field]);
      
      if (missingFields.length > 0) {
        return res.status(400).json({ 
          error: `Missing required fields: ${missingFields.join(', ')}` 
        });
      }

      // Validate targets structure
      if (!Array.isArray(assessmentData.targets)) {
        return res.status(400).json({ 
          error: "Targets must be an array" 
        });
      }

      for (const target of assessmentData.targets) {
        if (!target.targetId || !target.impactType || !target.impactDirection) {
          return res.status(400).json({ 
            error: `Invalid target structure: ${JSON.stringify(target)}` 
          });
        }
      }

      // Log the request data
      console.log('Saving assessment data:', JSON.stringify(assessmentData, null, 2));

      // Save the assessment
      const assessmentId = await saveAssessment(assessmentData);
      
      // Log success
      console.log('Assessment saved successfully with ID:', assessmentId);
      
      res.status(200).json({ id: assessmentId });
    } catch (error) {
      console.error('Error in saveAssessment API:', error);
      
      // Send a more detailed error response
      res.status(500).json({ 
        error: "Failed to save assessment",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
