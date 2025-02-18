"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { useAssessment } from "@/lib/assessment-context";
import { getRecommendedTargets } from "@/lib/sdg-mapping";
import { CheckCircle } from "lucide-react";


export default function SummaryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const formData = JSON.parse(searchParams?.get("formData") || "{}");

  const {
    selectedTags,
    targetImpacts,
    enabledTargets,
    isSubmitted,
    setIsSubmitted,
  } = useAssessment();

  useEffect(() => {
    if (selectedTags.length === 0 || enabledTargets.size === 0) {
      router.push("/assessment/tags");
    }
  }, [selectedTags, enabledTargets, router]);

  const handleSubmit = async () => {
    try {
      const assessmentData = {
        ...formData,
        tags: selectedTags,
        targets: Array.from(enabledTargets).map((targetId) => ({
          targetId,
          ...targetImpacts[targetId],
        })),
        // Add additional fields required by saveAssessment
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        university: formData.university,
        universitySchool: formData.universitySchool,
        title: formData.title,
        objectives: formData.objectives,
        modules: formData.modules,
       
        publications: formData.publications,
      };

      console.log("Submitting assessment data:", assessmentData);

      const response = await fetch('/api/saveAssessment', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assessmentData),
      });

      if (!response.ok) {
        throw new Error("Failed to save assessment");
      }

      const { id: assessmentId } = await response.json();
      console.log("Assessment saved with ID:", assessmentId);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting assessment:", error);
      alert("Failed to submit assessment. Please try again.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted p-4 flex items-center justify-center">
        <Card className="max-w-2xl w-full">
          <CardContent className="pt-6 text-center">
            <div className="mb-4 flex justify-center">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">
              Assessment Submitted Successfully!
            </h2>
            <p className="text-muted-foreground mb-6">
              Your impact assessment has been recorded. Thank you for your
              contribution.
            </p>
            <Button
              onClick={() => router.push("/")}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const recommendedTargets = getRecommendedTargets(selectedTags);
  const selectedTargets = recommendedTargets.filter((target) =>
    enabledTargets.has(target.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Assessment Summary
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Review your selections before submitting
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Selected Tags</h3>
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-primary/10 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Selected SDG Targets</h3>
            <div className="space-y-4">
              {selectedTargets.map((target) => (
                <Card key={target.id} className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="font-bold">{target.id}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{target.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {target.description}
                      </p>
                      <div className="mt-2 text-sm">
                        <span className="mr-4">
                          Impact:{" "}
                          {targetImpacts[target.id]?.impactType || "positive"}
                        </span>
                        <span>
                          Direction:{" "}
                          {targetImpacts[target.id]?.impactDirection ||
                            "direct"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-6">
            <Button variant="outline" onClick={() => router.back()}>
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Submit Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
