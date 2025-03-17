"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
  zipCode: z.string().min(5, {
    message: "Zip code must be at least 5 characters.",
  }),
  bio: z.string().max(500, {
    message: "Bio must not be longer than 500 characters.",
  }),
})

const academicFormSchema = z.object({
  school: z.string().min(2, {
    message: "School name must be at least 2 characters.",
  }),
  grade: z.string({
    required_error: "Please select a grade.",
  }),
  gpa: z.coerce.number().min(0).max(4, {
    message: "GPA must be between 0 and 4.",
  }),
  mathMarks: z.coerce.number().min(0).max(100, {
    message: "Marks must be between 0 and 100.",
  }),
  scienceMarks: z.coerce.number().min(0).max(100, {
    message: "Marks must be between 0 and 100.",
  }),
  englishMarks: z.coerce.number().min(0).max(100, {
    message: "Marks must be between 0 and 100.",
  }),
  socialStudiesMarks: z.coerce.number().min(0).max(100, {
    message: "Marks must be between 0 and 100.",
  }),
  interests: z.string().min(2, {
    message: "Please enter at least one interest.",
  }),
})

const preferencesFormSchema = z.object({
  preferredPrograms: z.string().min(2, {
    message: "Please enter at least one preferred program.",
  }),
  preferredLocations: z.string().min(2, {
    message: "Please enter at least one preferred location.",
  }),
  collegeType: z.string({
    required_error: "Please select a college type.",
  }),
  budgetRange: z.string({
    required_error: "Please select a budget range.",
  }),
  additionalNotes: z.string().max(500, {
    message: "Notes must not be longer than 500 characters.",
  }),
})

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Alex Johnson",
      email: "alex.j@example.com",
      phone: "1234567890",
      address: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      bio: "I'm a high school student interested in computer science and engineering.",
    },
  })

  const academicForm = useForm<z.infer<typeof academicFormSchema>>({
    resolver: zodResolver(academicFormSchema),
    defaultValues: {
      school: "Lincoln High School",
      grade: "12",
      gpa: 3.8,
      mathMarks: 92,
      scienceMarks: 88,
      englishMarks: 85,
      socialStudiesMarks: 78,
      interests: "Computer Science, Robotics, Mathematics",
    },
  })

  const preferencesForm = useForm<z.infer<typeof preferencesFormSchema>>({
    resolver: zodResolver(preferencesFormSchema),
    defaultValues: {
      preferredPrograms: "Computer Science, Software Engineering, Data Science",
      preferredLocations: "California, New York, Texas",
      collegeType: "University",
      budgetRange: "medium",
      additionalNotes: "Looking for schools with strong internship programs and research opportunities.",
    },
  })

  function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
    setIsLoading(true)
    setTimeout(() => {
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated.",
      })
      setIsLoading(false)
    }, 1000)
  }

  function onAcademicSubmit(values: z.infer<typeof academicFormSchema>) {
    setIsLoading(true)
    setTimeout(() => {
      toast({
        title: "Academic information updated",
        description: "Your academic information has been updated.",
      })
      setIsLoading(false)
    }, 1000)
  }

  function onPreferencesSubmit(values: z.infer<typeof preferencesFormSchema>) {
    setIsLoading(true)
    setTimeout(() => {
      toast({
        title: "Preferences updated",
        description: "Your college preferences have been updated.",
      })
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
        <p className="text-muted-foreground">Manage your personal information and preferences.</p>
      </div>
      <Separator />
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="academic">Academic Details</TabsTrigger>
          <TabsTrigger value="preferences">College Preferences</TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and contact information.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Your address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Your city" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="Your state" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Zip Code</FormLabel>
                          <FormControl>
                            <Input placeholder="Your zip code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={profileForm.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell us a little about yourself" className="resize-none" {...field} />
                        </FormControl>
                        <FormDescription>
                          Brief description about yourself. This helps counselors understand your background.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <CardFooter className="px-0">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="academic">
          <Card>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
              <CardDescription>Update your academic details and marks.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...academicForm}>
                <form onSubmit={academicForm.handleSubmit(onAcademicSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={academicForm.control}
                      name="school"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>School Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your school name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={academicForm.control}
                      name="grade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Grade/Year</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select grade" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="9">9th Grade</SelectItem>
                              <SelectItem value="10">10th Grade</SelectItem>
                              <SelectItem value="11">11th Grade</SelectItem>
                              <SelectItem value="12">12th Grade</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={academicForm.control}
                      name="gpa"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GPA</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.1" min="0" max="4" placeholder="Your GPA" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Subject Marks</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <FormField
                        control={academicForm.control}
                        name="mathMarks"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mathematics</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" max="100" placeholder="Marks out of 100" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={academicForm.control}
                        name="scienceMarks"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Science</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" max="100" placeholder="Marks out of 100" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={academicForm.control}
                        name="englishMarks"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>English</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" max="100" placeholder="Marks out of 100" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={academicForm.control}
                        name="socialStudiesMarks"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Social Studies</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" max="100" placeholder="Marks out of 100" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <FormField
                    control={academicForm.control}
                    name="interests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Academic Interests</FormLabel>
                        <FormControl>
                          <Input placeholder="Comma-separated list of interests" {...field} />
                        </FormControl>
                        <FormDescription>List your academic interests and subjects you enjoy.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <CardFooter className="px-0">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>College Preferences</CardTitle>
              <CardDescription>Set your preferences for college recommendations.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...preferencesForm}>
                <form onSubmit={preferencesForm.handleSubmit(onPreferencesSubmit)} className="space-y-4">
                  <FormField
                    control={preferencesForm.control}
                    name="preferredPrograms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Programs/Majors</FormLabel>
                        <FormControl>
                          <Input placeholder="Comma-separated list of programs" {...field} />
                        </FormControl>
                        <FormDescription>List the programs or majors you're interested in studying.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={preferencesForm.control}
                    name="preferredLocations"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Locations</FormLabel>
                        <FormControl>
                          <Input placeholder="Comma-separated list of locations" {...field} />
                        </FormControl>
                        <FormDescription>
                          List the cities, states, or regions where you'd like to study.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={preferencesForm.control}
                      name="collegeType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>College Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select college type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="University">University</SelectItem>
                              <SelectItem value="College">College</SelectItem>
                              <SelectItem value="Institute">Institute</SelectItem>
                              <SelectItem value="Community College">Community College</SelectItem>
                              <SelectItem value="Any">Any</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={preferencesForm.control}
                      name="budgetRange"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Budget Range</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select budget range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="low">Low (Under $15,000/year)</SelectItem>
                              <SelectItem value="medium">Medium ($15,000-$30,000/year)</SelectItem>
                              <SelectItem value="high">High ($30,000-$50,000/year)</SelectItem>
                              <SelectItem value="very-high">Very High (Over $50,000/year)</SelectItem>
                              <SelectItem value="any">Any</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={preferencesForm.control}
                    name="additionalNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any additional preferences or requirements"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Any other preferences or requirements for your college search.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <CardFooter className="px-0">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

