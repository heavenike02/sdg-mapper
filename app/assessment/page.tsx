"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HelpCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { ProfilePictureUpload } from "@/components/profile-picture-upload";
import { useUpload } from '@/lib/hooks/use-upload'

// Define SDG options for the dropdown
const sdgOptions = [
  "No Poverty",
  "Zero Hunger",
  "Good Health and Well-being",
  "Quality Education",
  "Gender Equality",
  "Clean Water and Sanitation",
  "Affordable and Clean Energy",
  "Decent Work and Economic Growth",
  "Industry, Innovation, and Infrastructure",
  "Reduced Inequalities",
  "Sustainable Cities and Communities",
  "Responsible Consumption and Production",
  "Climate Action",
  "Life Below Water",
  "Life on Land",
  "Peace, Justice and Strong Institutions",
  "Partnerships for the Goals",
];

// Title options for the formal title field
const titleOptions = [
  "Professor", 
  "Associate Professor", 
  "Assistant Professor", 
  "Lecturer", 
  "Postdoctoral Researcher", 
  "PhD Candidate", 
  "Dr.", 
  "Other"
];

// Cleaned Zod schema with only the used fields
const formSchema = z.object({
  profilePicture: z.string().optional(),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  university: z.string().min(2, "University must be at least 2 characters"),
  universitySchool: z
    .string()
    .min(2, "University school must be at least 2 characters"),
  title: z.string().min(2, "Title is required"),
  biography: z.string().min(100, "Biography must be at least 100 characters"),
  objectives: z.string().min(20, "Objectives must be at least 20 characters"),
  // Publications overview - single field for all publications
  publicationsOverview: z.string().optional(),
  // Publications array
  publications: z.array(
    z.object({
      name: z.string().min(2, "Publication name must be at least 2 characters"),
      link: z.string().url("Must be a valid URL"),
      author: z.string().min(2, "Author names must be at least 2 characters"),
      sdg: z.string().min(1, "SDG selection is required"),
    })
  ).optional(),
  // Field for listing modules and their SDG focus
  modules: z
    .array(
      z.object({
        moduleCode: z
          .string()
          .min(2, "Module code must be at least 2 characters"),
        moduleName: z
          .string()
          .min(2, "Module name must be at least 2 characters"),
        moduleDescription: z
          .string()
          .min(10, "Module description must be at least 10 characters"),
        sdgAlignments: z.array(
          z.object({
            sdg: z.string().min(1, "SDG selection is required"),
            alignment: z.string().min(10, "Alignment description is required"),
          })
        ).min(1, "At least one SDG alignment is required"),
      })
    )
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function AssessmentForm() {
  const router = useRouter();
  const [openPopover, setOpenPopover] = useState<string | null>(null);
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { upload, isUploading, error: uploadError } = useUpload();

  const handlePopoverOpen = (id: string) => {
    setOpenPopover(id);
  };

  const handlePopoverClose = () => {
    setOpenPopover(null);
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profilePicture: "",
      firstName: "",
      lastName: "",
      email: "",
      university: "",
      universitySchool: "",
      title: "",
      biography: "",
      objectives: "",
      modules: [],
      publicationsOverview: "",
      publications: [],
    },
  });

  // Use field array for dynamic module/SDG entries
  const { fields: moduleFields, append: appendModule, remove: removeModule } = useFieldArray({
    control: form.control,
    name: "modules",
  });

  // Use field array for publications
  const { fields: publicationFields, append: appendPublication, remove: removePublication } = useFieldArray({
    control: form.control,
    name: "publications",
  });

  async function onSubmit(values: FormValues) {
    try {
      setIsSubmitting(true);
      
      // Upload profile picture if selected
      if (profilePictureFile) {
        const result = await upload(profilePictureFile);
        if (result?.url) {
          values.profilePicture = result.url;
        }
      }

      console.log(values);
      // Pass form data to the tags page
      const query = new URLSearchParams({
        formData: JSON.stringify(values),
      }).toString();
      router.push(`/assessment/tags?${query}`);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Researcher Profile Submission
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Profile Picture and Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-[240px,1fr] gap-8 items-start border rounded-lg p-6">
                {/* Profile Picture */}
                <FormField
                  control={form.control}
                  name="profilePicture"
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <div className="flex flex-col items-center">
                        <FormLabel className="mb-6 text-center text-sm font-medium">Profile Picture</FormLabel>
                        <FormControl>
                          <ProfilePictureUpload
                            defaultImage={field.value}
                            onFileChange={setProfilePictureFile}
                          />
                        </FormControl>
                        {uploadError && (
                          <p className="text-xs text-destructive mt-2">{uploadError}</p>
                        )}
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Basic Info */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                    <Popover open={openPopover === 'personalInfo'}>
                      <PopoverTrigger asChild>
                        <HelpCircle 
                          className="h-4 w-4 cursor-pointer text-muted-foreground"
                          onMouseEnter={() => handlePopoverOpen('personalInfo')}
                          onMouseLeave={handlePopoverClose}
                        />
                      </PopoverTrigger>
                      <PopoverContent 
                        className="w-80"
                        onMouseEnter={() => handlePopoverOpen('personalInfo')}
                        onMouseLeave={handlePopoverClose}
                      >
                        <p>Please provide your basic contact information as you'd like it to appear on your profile.</p>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2">
                            <FormLabel>Your First Name</FormLabel>
                            <Popover open={openPopover === 'firstName'}>
                              <PopoverTrigger asChild>
                                <HelpCircle 
                                  className="h-4 w-4 cursor-pointer text-muted-foreground"
                                  onMouseEnter={() => handlePopoverOpen('firstName')}
                                  onMouseLeave={handlePopoverClose}
                                />
                              </PopoverTrigger>
                              <PopoverContent 
                                className="w-80"
                                onMouseEnter={() => handlePopoverOpen('firstName')}
                                onMouseLeave={handlePopoverClose}
                              >
                                <p>Enter your full legal name as you'd like it to appear on your profile.</p>
                              </PopoverContent>
                            </Popover>
                          </div>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2">
                            <FormLabel>Your Last Name</FormLabel>
                            <Popover open={openPopover === 'lastName'}>
                              <PopoverTrigger asChild>
                                <HelpCircle 
                                  className="h-4 w-4 cursor-pointer text-muted-foreground"
                                  onMouseEnter={() => handlePopoverOpen('lastName')}
                                  onMouseLeave={handlePopoverClose}
                                />
                              </PopoverTrigger>
                              <PopoverContent 
                                className="w-80"
                                onMouseEnter={() => handlePopoverOpen('lastName')}
                                onMouseLeave={handlePopoverClose}
                              >
                                <p>Enter your last name as you'd like it to appear on your profile.</p>
                              </PopoverContent>
                            </Popover>
                          </div>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormLabel>Your Contact Email</FormLabel>
                          <Popover open={openPopover === 'email'}>
                            <PopoverTrigger asChild>
                              <HelpCircle 
                                className="h-4 w-4 cursor-pointer text-muted-foreground"
                                onMouseEnter={() => handlePopoverOpen('email')}
                                onMouseLeave={handlePopoverClose}
                              />
                            </PopoverTrigger>
                            <PopoverContent 
                              className="w-80"
                              onMouseEnter={() => handlePopoverOpen('email')}
                              onMouseLeave={handlePopoverClose}
                            >
                              <p>Enter the email address where you can be contacted regarding academic matters.</p>
                            </PopoverContent>
                          </Popover>
                        </div>
                        <FormControl>
                          <Input placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* University Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="university"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormLabel>Affiliated University</FormLabel>
                        <Popover open={openPopover === 'university'}>
                          <PopoverTrigger asChild>
                            <HelpCircle 
                              className="h-4 w-4 cursor-pointer text-muted-foreground"
                              onMouseEnter={() => handlePopoverOpen('university')}
                              onMouseLeave={handlePopoverClose}
                            />
                          </PopoverTrigger>
                          <PopoverContent 
                            className="w-80"
                            onMouseEnter={() => handlePopoverOpen('university')}
                            onMouseLeave={handlePopoverClose}
                          >
                            <p>Specify the university you are affiliated with.</p>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <FormControl>
                        <Input placeholder="University Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="universitySchool"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormLabel>Department/School</FormLabel>
                        <Popover open={openPopover === 'universitySchool'}>
                          <PopoverTrigger asChild>
                            <HelpCircle 
                              className="h-4 w-4 cursor-pointer text-muted-foreground"
                              onMouseEnter={() => handlePopoverOpen('universitySchool')}
                              onMouseLeave={handlePopoverClose}
                            />
                          </PopoverTrigger>
                          <PopoverContent 
                            className="w-80"
                            onMouseEnter={() => handlePopoverOpen('universitySchool')}
                            onMouseLeave={handlePopoverClose}
                          >
                            <p>Enter the department or faculty you belong to.</p>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <FormControl>
                        <Input placeholder="School/Department" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Formal Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormLabel>Academic/Professional Title</FormLabel>
                      <Popover open={openPopover === 'title'}>
                        <PopoverTrigger asChild>
                          <HelpCircle 
                            className="h-4 w-4 cursor-pointer text-muted-foreground"
                            onMouseEnter={() => handlePopoverOpen('title')}
                            onMouseLeave={handlePopoverClose}
                          />
                        </PopoverTrigger>
                        <PopoverContent 
                          className="w-80"
                          onMouseEnter={() => handlePopoverOpen('title')}
                          onMouseLeave={handlePopoverClose}
                        >
                          <p>Select your current academic or professional title (e.g., Lecturer, Professor, Researcher).</p>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Title" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {titleOptions.map((option) => (
                          <SelectItem key={option} value={option.toLowerCase()}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Biography */}
              <div className="border rounded-lg p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg font-semibold">Biography</h3>
                  <Popover open={openPopover === 'biography'}>
                    <PopoverTrigger asChild>
                      <HelpCircle 
                        className="h-4 w-4 cursor-pointer text-muted-foreground"
                        onMouseEnter={() => handlePopoverOpen('biography')}
                        onMouseLeave={handlePopoverClose}
                      />
                    </PopoverTrigger>
                    <PopoverContent 
                      className="w-80"
                      onMouseEnter={() => handlePopoverOpen('biography')}
                      onMouseLeave={handlePopoverClose}
                    >
                      <p>Write a professional biography in third person that describes your academic background, research interests, and achievements.</p>
                      <p className="text-sm text-muted-foreground mt-2">Example: "Dr. Jane Smith is a Professor of Environmental Science at..."</p>
                    </PopoverContent>
                  </Popover>
                </div>
                
                <FormField
                  control={form.control}
                  name="biography"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea 
                          placeholder="Write your professional biography in third person..."
                          className="min-h-[200px] resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Aims and Objectives */}
              <FormField
                control={form.control}
                name="objectives"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormLabel>Summary of Research & Objectives</FormLabel>
                      <Popover open={openPopover === 'objectives'}>
                        <PopoverTrigger asChild>
                          <HelpCircle 
                            className="h-4 w-4 cursor-pointer text-muted-foreground"
                            onMouseEnter={() => handlePopoverOpen('objectives')}
                            onMouseLeave={handlePopoverClose}
                          />
                        </PopoverTrigger>
                        <PopoverContent 
                          className="w-80"
                          onMouseEnter={() => handlePopoverOpen('objectives')}
                          onMouseLeave={handlePopoverClose}
                        >
                          <p>Provide a short summary of your research focus, academic contributions, and objectives.</p>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your research interests, focus areas, and academic objectives..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Modules and SDGs Section */}
              <div className="border rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-2">Module Details</h3>
                <p className="text-sm text-muted-foreground mb-4">Enter the basic information about your university module</p>
                
                {moduleFields.map((moduleField, moduleIndex) => (
                  <div key={moduleField.id} className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Module {moduleIndex + 1}</h4>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeModule(moduleIndex)}
                      >
                        Remove
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      <FormField
                        control={form.control}
                        name={`modules.${moduleIndex}.moduleCode`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Module Code</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., BUS101" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`modules.${moduleIndex}.moduleName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Module Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Introduction to Sustainable Business" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name={`modules.${moduleIndex}.moduleDescription`}
                      render={({ field }) => (
                        <FormItem className="mb-6">
                          <FormLabel>Module Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Briefly describe the module content and learning objectives..." 
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="border rounded-lg p-4 mt-4">
                      <h4 className="font-medium mb-2">SDG Alignments</h4>
                      <p className="text-sm text-muted-foreground mb-4">Indicate which Sustainable Development Goals your module addresses and how</p>
                      
                      {/* Use a nested field array for SDG alignments */}
                      <FormField
                        control={form.control}
                        name={`modules.${moduleIndex}.sdgAlignments`}
                        render={({ field }) => {
                          // Create a nested field array for SDG alignments
                          const { fields: sdgFields, append: appendSdg, remove: removeSdg } = useFieldArray({
                            control: form.control,
                            name: `modules.${moduleIndex}.sdgAlignments`,
                          });
                          
                          return (
                            <div>
                              {sdgFields.map((sdgField, sdgIndex) => (
                                <div key={sdgField.id} className="border rounded-lg p-4 mb-4">
                                  <div className="flex justify-between items-center mb-2">
                                    <h5 className="font-medium">Sustainable Development Goal</h5>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => removeSdg(sdgIndex)}
                                    >
                                      <span className="sr-only">Remove</span>
                                      <span className="h-4 w-4">×</span>
                                    </Button>
                                  </div>
                                  
                                  <FormField
                                    control={form.control}
                                    name={`modules.${moduleIndex}.sdgAlignments.${sdgIndex}.sdg`}
                                    render={({ field }) => (
                                      <FormItem className="mb-4">
                                        <Select
                                          onValueChange={field.onChange}
                                          defaultValue={field.value}
                                        >
                                          <FormControl>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select an SDG" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            {sdgOptions.map((sdg, idx) => (
                                              <SelectItem key={sdg} value={sdg}>
                                                {`${idx + 1}. ${sdg}`}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  
                                  <FormField
                                    control={form.control}
                                    name={`modules.${moduleIndex}.sdgAlignments.${sdgIndex}.alignment`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>How does your module align with this SDG?</FormLabel>
                                        <FormControl>
                                          <Textarea 
                                            placeholder="Describe specific content, activities, or assessments that address this SDG..." 
                                            className="min-h-[100px]"
                                            {...field} 
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              ))}
                              
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => appendSdg({ sdg: "", alignment: "" })}
                                className="mt-2"
                              >
                                Add SDG Alignment
                              </Button>
                            </div>
                          );
                        }}
                      />
                    </div>
                  </div>
                ))}
                
                <Button
                  type="button"
                  onClick={() => appendModule({ 
                    moduleCode: "", 
                    moduleName: "", 
                    moduleDescription: "", 
                    sdgAlignments: [{ sdg: "", alignment: "" }] 
                  })}
                  className="mt-2"
                >
                  Add Module
                </Button>
              </div>

              {/* Publications Section */}
              <div className="border rounded-lg p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg font-semibold">Publications</h3>
                  <Popover open={openPopover === 'publications'}>
                    <PopoverTrigger asChild>
                      <HelpCircle 
                        className="h-4 w-4 cursor-pointer text-muted-foreground"
                        onMouseEnter={() => handlePopoverOpen('publications')}
                        onMouseLeave={handlePopoverClose}
                      />
                    </PopoverTrigger>
                    <PopoverContent 
                      className="w-80"
                      onMouseEnter={() => handlePopoverOpen('publications')}
                      onMouseLeave={handlePopoverClose}
                    >
                      <p>Enter your publications overview and individual publication details.</p>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Publications Overview */}
                <div className="mb-6">
                  <FormField
                    control={form.control}
                    name="publicationsOverview"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormLabel>Publications Overview</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <HelpCircle className="h-4 w-4 cursor-pointer text-muted-foreground" />
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                              <p>Provide a general overview of your publications and research focus. This text will appear on your profile before the list of publications.</p>
                            </PopoverContent>
                          </Popover>
                        </div>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your overall publication work and research focus..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Individual Publications */}
                <div className="space-y-6">
                  <h4 className="font-medium text-sm text-muted-foreground">Individual Publications</h4>
                  
                  {publicationFields.map((pubField, pubIndex) => (
                    <div key={pubField.id} className="flex flex-col gap-2 mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`publications.${pubIndex}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Publication Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter publication name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`publications.${pubIndex}.link`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Publication Link</FormLabel>
                              <FormControl>
                                <Input placeholder="https://..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`publications.${pubIndex}.author`}
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center gap-2">
                                <FormLabel>Authors</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <HelpCircle className="h-4 w-4 cursor-pointer text-muted-foreground" />
                                  </PopoverTrigger>
                                  <PopoverContent className="w-80">
                                    <p>For multiple authors, separate names with a dash (-)</p>
                                    <p className="text-sm text-muted-foreground mt-1">Example: John Doe - Jane Smith - Alex Johnson</p>
                                  </PopoverContent>
                                </Popover>
                              </div>
                              <FormControl>
                                <Input placeholder="Enter author names (separate with -)" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`publications.${pubIndex}.sdg`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>SDG</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select an SDG" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {sdgOptions.map((sdg, index) => (
                                    <SelectItem key={index + 1} value={String(index + 1)}>
                                      {`SDG ${index + 1}: ${sdg}`}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removePublication(pubIndex)}
                        className="self-end"
                      >
                        Remove Publication
                      </Button>
                      <Separator className="my-2" />
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => appendPublication({ name: "", link: "", author: "", sdg: "" })}
                    className="mt-2"
                  >
                    Add Publication
                  </Button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button 
                  type="submit" 
                  size="lg"
                  disabled={isSubmitting || isUploading}
                >
                  {isSubmitting || isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Next: Add Research Tags"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
