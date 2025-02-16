"use client";

import React, { createContext, useContext, useState } from "react";
import { SDGTarget } from "./sdg-mapping";

interface AssessmentState {
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  targetImpacts: {
    [key: string]: { impactType: string; impactDirection: string };
  };
  setTargetImpacts: (impacts: {
    [key: string]: { impactType: string; impactDirection: string };
  }) => void;
  enabledTargets: Set<string>;
  setEnabledTargets: (targets: Set<string>) => void;
  isSubmitted: boolean;
  setIsSubmitted: (submitted: boolean) => void;
}

const AssessmentContext = createContext<AssessmentState | undefined>(undefined);

export function AssessmentProvider({ children }: { children: React.ReactNode }) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [targetImpacts, setTargetImpacts] = useState<{
    [key: string]: { impactType: string; impactDirection: string };
  }>({});
  const [enabledTargets, setEnabledTargets] = useState<Set<string>>(new Set());
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <AssessmentContext.Provider
      value={{
        selectedTags,
        setSelectedTags,
        targetImpacts,
        setTargetImpacts,
        enabledTargets,
        setEnabledTargets,
        isSubmitted,
        setIsSubmitted,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error("useAssessment must be used within an AssessmentProvider");
  }
  return context;
}