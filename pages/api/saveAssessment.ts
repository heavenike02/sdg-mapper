import { NextApiRequest, NextApiResponse } from "next";
import { saveAssessment } from "@/actions/data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const assessmentData = req.body;
      // Logic to save assessment data
      const assessmentId = await saveAssessment(assessmentData);
      res.status(200).json({ id: assessmentId });
    } catch (error) {
      res.status(500).json({ error: "Failed to save assessment" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
