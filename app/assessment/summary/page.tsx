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
          impactType: targetImpacts[targetId]?.impactType || 'positive',
          impactDirection: targetImpacts[targetId]?.impactDirection || 'direct',
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
            Review your information before submitting
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{formData.firstName} {formData.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{formData.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">University</p>
                <p className="font-medium">{formData.university}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Department/School</p>
                <p className="font-medium">{formData.universitySchool}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Title</p>
                <p className="font-medium">{formData.title}</p>
              </div>
            </div>
          </div>
          
          {/* Biography */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Biography</h3>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="whitespace-pre-wrap">{formData.biography}</p>
            </div>
          </div>
          
          {/* Research Objectives */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Research & Objectives</h3>
            <p className="whitespace-pre-wrap">{formData.objectives}</p>
          </div>
          
          {/* Modules */}
          {formData.modules && formData.modules.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Teaching Modules</h3>
              <div className="space-y-4">
                {formData.modules.map((module: {
                  moduleCode: string;
                  moduleName: string;
                  moduleDescription: string;
                  sdgAlignments: {
                    sdg: string;
                    alignment: string;
                  }[]
                }, index: number) => (
                  <Card key={index} className="p-4">
                    <div className="space-y-3">
                      <div className="flex flex-col md:flex-row md:justify-between">
                        <div className="font-medium text-lg">{module.moduleName}</div>
                        <div className="text-sm text-muted-foreground">Code: {module.moduleCode}</div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Description</p>
                        <p>{module.moduleDescription}</p>
                      </div>
                      {module.sdgAlignments && module.sdgAlignments.length > 0 && (
                        <div>
                          <p className="text-sm text-muted-foreground mt-2">SDG Alignments</p>
                          <div className="space-y-2 mt-1">
                            {module.sdgAlignments.map((alignment: { sdg: string; alignment: string }, idx: number) => (
                              <div key={idx} className="border rounded-lg p-3">
                                <p className="font-medium">{alignment.sdg}</p>
                                <p className="text-sm mt-1">{alignment.alignment}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {/* Publications */}
          {(formData.publications?.length > 0 || formData.publicationsOverview) && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Publications</h3>
              
              {/* Publications Overview */}
              {formData.publicationsOverview && (
                <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                  <p className="whitespace-pre-wrap">{formData.publicationsOverview}</p>
                </div>
              )}

              {/* Publications List */}
              {formData.publications?.length > 0 && (
                <div className="space-y-2">
                  {formData.publications.map((pub: {
                    name: string;
                    link: string;
                    author: string;
                    sdg: string;
                  }, index: number) => (
                    <div key={index} className="flex flex-col gap-2 border rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{pub.name}</h4>
                        <span className="text-sm bg-primary/10 px-2 py-1 rounded-full">
                          SDG {pub.sdg}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        By {pub.author.split('-').map(author => author.trim()).join(' • ')}
                      </p>
                      <a 
                        href={pub.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm text-blue-600 hover:underline"
                      >
                        View Publication
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Selected Tags */}
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

          {/* Selected SDG Targets */}
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
