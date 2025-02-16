"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Check, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { SDGTarget, getRecommendedTargets } from "@/lib/sdg-mapping";
import { useAssessment } from "@/lib/assessment-context";

interface SDGCardProps {
  target: SDGTarget;
  onChange: (targetId: string, updates: { impactType: string; impactDirection: string }) => void;
  isEnabled: boolean;
  onToggle: () => void;
}

const SDGCard = ({ target, onChange, isEnabled, onToggle }: SDGCardProps) => {
  const [impactType, setImpactType] = useState("positive");
  const [impactDirection, setImpactDirection] = useState("direct");

  const handleImpactTypeChange = (value: string) => {
    setImpactType(value);
    onChange(target.id, { impactType: value, impactDirection });
  };

  const handleImpactDirectionChange = (value: string) => {
    setImpactDirection(value);
    onChange(target.id, { impactType, impactDirection: value });
  };

  return (
    <Card className={`relative ${isEnabled ? 'border-primary' : 'border-muted'}`}>
      <Button variant="ghost" size="sm" className="absolute top-2 right-2" onClick={onToggle}>
        <Check className={`h-4 w-4 ${isEnabled ? 'text-primary' : 'text-muted-foreground'}`} />
      </Button>
      <CardContent className="pt-8 pb-4">
  <div className="flex gap-4 items-center">
    {/* Fixed square size for target.id */}
    <div className="w-20 h-20 bg-primary/10 rounded-lg flex items-center justify-center">
      <span className="text-xl font-bold">{target.id}</span>
    </div>
    <div className="flex-1">
      <h3 className="font-semibold">{target.title}</h3>
      <p className="text-sm text-muted-foreground">{target.description}</p>
    </div>
  </div>

        <div className="mt-4 space-y-4">
          <div>
            <Label>Impact Type</Label>
            <RadioGroup
              value={impactType}
              onValueChange={handleImpactTypeChange}
              className="flex gap-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="positive" id={`positive-${target.id}`} />
                <Label htmlFor={`positive-${target.id}`}>Positive Impact</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="negative" id={`negative-${target.id}`} />
                <Label htmlFor={`negative-${target.id}`}>Negative Impact</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label>Impact Direction</Label>
            <RadioGroup
              value={impactDirection}
              onValueChange={handleImpactDirectionChange}
              className="flex gap-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="direct" id={`direct-${target.id}`} />
                <Label htmlFor={`direct-${target.id}`}>Direct Impact</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="indirect" id={`indirect-${target.id}`} />
                <Label htmlFor={`indirect-${target.id}`}>Indirect Impact</Label>
              </div>
            </RadioGroup>
          </div>

          <Collapsible>
            <CollapsibleTrigger className="flex items-center text-sm text-muted-foreground hover:text-foreground">
              <ChevronDown className="h-4 w-4 mr-1" />
              Example Actions ({target.exampleActions.length})
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                {target.exampleActions.map((action, index) => (
                  <li key={index}>{action}</li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardContent>
    </Card>
  );
};

export default function SDGPage() {
  const router = useRouter();
  const {
    selectedTags,
    targetImpacts,
    setTargetImpacts,
    enabledTargets,
    setEnabledTargets,
  } = useAssessment();

  useEffect(() => {
    if (selectedTags.length === 0) {
      router.push("/assessment/tags");
    }
  }, [selectedTags, router]);

  const recommendedTargets = getRecommendedTargets(selectedTags);

  const handleTargetToggle = (targetId: string) => {
    const nextEnabledTargets = new Set(enabledTargets);
    if (nextEnabledTargets.has(targetId)) {
      nextEnabledTargets.delete(targetId);
    } else {
      nextEnabledTargets.add(targetId);
    }
    setEnabledTargets(nextEnabledTargets);
  };

  const handleTargetChange = (
    targetId: string,
    updates: { impactType: string; impactDirection: string }
  ) => {
    const newTargetImpacts = {
      ...targetImpacts,
      [targetId]: updates,
    };
    setTargetImpacts(newTargetImpacts);
  };

  const handleSubmit = () => {
    if (enabledTargets.size === 0) {
      alert("Please select at least one SDG target");
      return;
    }
    router.push("/assessment/summary");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">SDG Target Mapping</CardTitle>
          <p className="text-muted-foreground mt-2">
            Review recommended SDG targets based on your selected tags and specify their impacts
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {recommendedTargets.map(target => (
              <SDGCard
                key={target.id}
                target={target}
                onChange={handleTargetChange}
                isEnabled={enabledTargets.has(target.id)}
                onToggle={() => handleTargetToggle(target.id)}
              />
            ))}
          </div>

          <div className="flex justify-between items-center mt-8">
            <Button variant="outline" onClick={() => router.back()}>
              Back
            </Button>
            <Button onClick={handleSubmit} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Complete Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
