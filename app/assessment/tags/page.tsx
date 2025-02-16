"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { Users, Leaf, TrendingUp, Handshake } from "lucide-react";
import { useAssessment } from "@/lib/assessment-context";

interface TagSectionProps {
  title: string;
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

const TagSection = ({ title, tags, selectedTags, onTagToggle }: TagSectionProps) => (
  <div className="space-y-3">
    <h3 className="text-lg font-semibold">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Button
          key={tag}
          variant={selectedTags.includes(tag) ? "default" : "outline"}
          onClick={() => onTagToggle(tag)}
          className="rounded-full"
        >
          {tag}
        </Button>
      ))}
    </div>
  </div>
);

const groups = [
  "children",
  "youth",
  "older persons",
  "indigenous peoples",
  "persons with disabilities",
  "migrant workers",
  "migration",
  "migrant remittances",
  "vulnerable people",
  "marginalized communities",
  "companies",
];

const lnobTags = [
  "equity",
  "equality / inequality",
  "human rights",
  "inclusive",
  "gender",
  "poor / poverty",
];

const categories = [
  { icon: Users, label: "People" },
  { icon: Leaf, label: "Planet" },
  { icon: TrendingUp, label: "Prosperity" },
  { icon: Handshake, label: "Peace & Partnerships" },
];

export default function TagsPage() {
  const router = useRouter();
  const { selectedTags, setSelectedTags } = useAssessment();

  const handleTagToggle = (tag: string) => {
    setSelectedTags(
      selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag]
    );
  };

  const handleContinue = () => {
    if (selectedTags.length === 0) {
      alert("Please select at least one tag");
      return;
    }
    router.push("/assessment/sdg");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center space-x-8 mb-6">
            {categories.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center space-y-2"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
          <CardTitle className="text-2xl font-bold">Select Impact Tags</CardTitle>
          <p className="text-muted-foreground mt-2">
            Choose tags that best describe your project&apos;s focus areas and impact
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          <TagSection
            title="Groups"
            tags={groups}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
          />
          
          <Separator />
          
          <TagSection
            title="Leave No One Behind"
            tags={lnobTags}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
          />

          <div className="flex justify-between items-center pt-6">
            <Button
              variant="outline"
              onClick={() => router.back()}
            >
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