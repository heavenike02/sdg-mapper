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
import { useRouter } from "next/navigation";

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
const titleOptions = ["Professor", "Lecturer", "Dr.", "Other"];

// Cleaned Zod schema with only the used fields
const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  university: z.string().min(2, "University must be at least 2 characters"),
  universitySchool: z
    .string()
    .min(2, "University school must be at least 2 characters"),
  title: z.string().min(2, "Title is required"),
  objectives: z.string().min(20, "Objectives must be at least 20 characters"),
  // Field for listing modules and their SDG focus
  modules: z
    .array(
      z.object({
        moduleName: z
          .string()
          .min(2, "Module name must be at least 2 characters"),
        sdg: z.string().min(1, "SDG selection is required"),
      })
    )
    .optional(),
  // File upload for profile picture (processing to be implemented as needed)
  profilePicture: z.any().optional(),
  // Publications link (ORCID/Google Scholar) with URL validation
  publications: z.string().url("Must be a valid URL").optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function AssessmentForm() {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      university: "",
      universitySchool: "",
      title: "",
      objectives: "",
      modules: [],
      profilePicture: undefined,
      publications: undefined,
    },
  });

  // Use field array for dynamic module/SDG entries
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "modules",
  });

  function onSubmit(values: FormValues) {
    console.log(values);
    // Pass form data to the tags page instead of summary
    const query = new URLSearchParams({
      formData: JSON.stringify(values),
    }).toString();
    router.push(`/assessment/tags?${query}`); // Updated to navigate to tags page
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Project Assessment Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
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
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Contact & University Info */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="university"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>University</FormLabel>
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
                      <FormLabel>University School</FormLabel>
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
                    <FormLabel>Title</FormLabel>
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

              {/* Aims and Objectives */}
              <FormField
                control={form.control}
                name="objectives"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aims and Objectives</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="List the main aims and objectives..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Modules and SDGs Section */}
              <div>
                <FormLabel className="mb-2 block">Current Modules</FormLabel>
                {fields.map((moduleField, index) => (
                  <div
                    key={moduleField.id}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 items-end"
                  >
                    <FormField
                      control={form.control}
                      name={`modules.${index}.moduleName` as const}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Module Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Module Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`modules.${index}.sdg` as const}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SDG Focus</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select SDG" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {sdgOptions.map((sdg) => (
                                <SelectItem key={sdg} value={sdg}>
                                  {sdg}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      variant="destructive"
                      onClick={() => remove(index)}
                      className="mt-2"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => append({ moduleName: "", sdg: "" })}
                >
                  Add Module
                </Button>
              </div>

              {/* Profile Picture Upload */}
              <FormField
                control={form.control}
                name="profilePicture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Publications Link */}
              <FormField
                control={form.control}
                name="publications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Publications (ORCID/Google Scholar)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://orcid.org/..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button type="submit" size="lg">
                  Continue to Tags
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
