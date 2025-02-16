"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

import {
  groups,
  lnobTags,
  countriesRegions,
  climateChangeTags,
  builtEnvironmentTags,
  environmentTags,
  prosperityTags,
  foodNutritionHungerTags,
  scienceTechnologyInnovationTags,
  tourismCultureTags,
  waterSanitationHygieneTags,
  healthWellBeingTags,
  energyTags,
  consumptionProductionTags,
  economicTags,
  financialTags,
  decisionMakingTags,
  peaceViolenceTags,
} from "@/components/tags";

import { useAssessment } from "@/lib/assessment-context";

// Define the Tag type if not already imported
export type Tag = { id: string; label: string; section: string };

interface TagSectionProps {
  title: string;
  tags: Tag[]; // Updated to expect an array of Tag objects
  selectedTags: string[];
  onTagToggle: (tagId: string) => void;
}

const TagSection = ({
  title,
  tags,
  selectedTags,
  onTagToggle,
}: TagSectionProps) => (
  <div className="space-y-3">
    <h3 className="text-lg font-semibold">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Button
          key={tag.id}
          variant={selectedTags.includes(tag.id) ? "default" : "outline"}
          onClick={() => onTagToggle(tag.id)}
          className="rounded-full"
        >
          {tag.label}
        </Button>
      ))}
    </div>
  </div>
);

export default function TagsPage() {
  const router = useRouter();
  const { selectedTags, setSelectedTags } = useAssessment();

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(
      selectedTags.includes(tagId)
        ? selectedTags.filter((t) => t !== tagId)
        : [...selectedTags, tagId]
    );
  };

  const handleContinue = () => {
    if (selectedTags.length === 0) {
      alert("Please select at least one tag");
      return;
    }
    router.push("/assessment/sdg");
  };

  // Create an array of all tag sections you want to display
  const tagSections = [
    { title: "Groups", tags: groups },
    { title: "Leave No One Behind", tags: lnobTags },
    { title: "Countries / Regions", tags: countriesRegions },
    { title: "Climate Change", tags: climateChangeTags },
    { title: "Built Environment", tags: builtEnvironmentTags },
    { title: "Environment", tags: environmentTags },
    { title: "Prosperity", tags: prosperityTags },
    { title: "Food / Nutrition / Hunger", tags: foodNutritionHungerTags },
    { title: "Science, Technology & Innovation", tags: scienceTechnologyInnovationTags },
    { title: "Tourism & Culture", tags: tourismCultureTags },
    { title: "Water, Sanitation & Hygiene", tags: waterSanitationHygieneTags },
    { title: "Health & Well Being", tags: healthWellBeingTags },
    { title: "Energy", tags: energyTags },
    { title: "Consumption & Production", tags: consumptionProductionTags },
    { title: "Economic", tags: economicTags },
    { title: "Financial", tags: financialTags },
    { title: "Decision Making", tags: decisionMakingTags },
    { title: "Peace & Violence", tags: peaceViolenceTags },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center space-x-8 mb-6"></div>
          <CardTitle className="text-2xl font-bold">
            Select Impact Tags
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Choose tags that best describe your project&apos;s focus areas and impact
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          {tagSections.map((section, index) => (
            <div key={section.title}>
              <TagSection
                title={section.title}
                tags={section.tags}
                selectedTags={selectedTags}
                onTagToggle={handleTagToggle}
              />
              {/* Add a separator between sections, except after the last one */}
              {index !== tagSections.length - 1 && <Separator className="mb-2 mt-2"/>}
            </div>
          ))}

          <div className="flex justify-between items-center pt-6">
            <Button variant="outline" onClick={() => router.back()}>
              Back
            </Button>
            <Button
              onClick={handleContinue}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Continue to SDG Mapping
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
