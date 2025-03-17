"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"
import { Building, ExternalLink, MapPin, Pencil, Plus, School, Search } from "lucide-react"

// Sample colleges data
const colleges = [
  {
    id: "COL001",
    name: "Tech University",
    location: "San Francisco, CA",
    type: "University",
    cutoffMarks: 85,
    programs: ["Computer Science", "Electrical Engineering", "Data Science"],
    description: "A leading institution for technology and engineering education.",
    website: "https://example.com/tech-university",
  },
  {
    id: "COL002",
    name: "Liberal Arts College",
    location: "Boston, MA",
    type: "College",
    cutoffMarks: 80,
    programs: ["English Literature", "History", "Psychology"],
    description: "Focused on providing a well-rounded education in the humanities and social sciences.",
    website: "https://example.com/liberal-arts",
  },
  {
    id: "COL003",
    name: "Business School",
    location: "New York, NY",
    type: "School",
    cutoffMarks: 88,
    programs: ["Business Administration", "Finance", "Marketing"],
    description: "Preparing future business leaders with practical skills and theoretical knowledge.",
    website: "https://example.com/business-school",
  },
  {
    id: "COL004",
    name: "Medical Institute",
    location: "Chicago, IL",
    type: "Institute",
    cutoffMarks: 92,
    programs: ["Medicine", "Nursing", "Pharmacy"],
    description: "Dedicated to excellence in medical education and research.",
    website: "https://example.com/medical-institute",
  },
  {
    id: "COL005",
    name: "Arts Academy",
    location: "Los Angeles, CA",
    type: "Academy",
    cutoffMarks: 75,
    programs: ["Fine Arts", "Music", "Theater"],
    description: "Nurturing creative talent and artistic expression.",
    website: "https://example.com/arts-academy",
  },
  {
    id: "COL006",
    name: "Engineering Institute",
    location: "Austin, TX",
    type: "Institute",
    cutoffMarks: 82,
    programs: ["Mechanical Engineering", "Civil Engineering", "Chemical Engineering"],
    description: "Focused on innovative engineering solutions for real-world problems.",
    website: "https://example.com/engineering-institute",
  },
]

const formSchema = z.object({
  name: z.string().min(2, {
    message: "College name must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  type: z.string({
    required_error: "Please select a college type.",
  }),
  cutoffMarks: z.coerce.number().min(0).max(100, {
    message: "Cutoff marks must be between 0 and 100.",
  }),
  programs: z.string().min(2, {
    message: "Please enter at least one program.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  website: z.string().url({
    message: "Please enter a valid URL.",
  }),
})

export default function CollegesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      type: "",
      cutoffMarks: 75,
      programs: "",
      description: "",
      website: "https://",
    },
  })

  const filteredColleges = colleges.filter(
    (college) =>
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.programs.some((program) => program.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "College added",
      description: `${values.name} has been added to the database.`,
    })
    setIsAddDialogOpen(false)
    form.reset()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Colleges Database</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add College
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New College</DialogTitle>
              <DialogDescription>Add a new college to the database for student recommendations.</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>College Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter college name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="City, State" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="University">University</SelectItem>
                            <SelectItem value="College">College</SelectItem>
                            <SelectItem value="Institute">Institute</SelectItem>
                            <SelectItem value="School">School</SelectItem>
                            <SelectItem value="Academy">Academy</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="cutoffMarks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cutoff Marks (%)</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" max="100" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="programs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Programs Offered</FormLabel>
                      <FormControl>
                        <Input placeholder="Comma-separated list of programs" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Brief description of the college" className="min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Add College</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="search"
          placeholder="Search colleges..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="submit" size="icon" variant="ghost">
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredColleges.map((college) => (
          <Card key={college.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{college.name}</span>
                <Button variant="ghost" size="icon">
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
              </CardTitle>
              <CardDescription className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                {college.location}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <School className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Type:</span>
                  <span className="ml-1">{college.type}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Cutoff:</span>
                  <span className="ml-1">{college.cutoffMarks}%</span>
                </div>
                <div className="text-sm">
                  <div className="font-medium">Programs:</div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {college.programs.map((program) => (
                      <span
                        key={program}
                        className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium"
                      >
                        {program}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">Description:</div>
                  <p className="mt-1 text-muted-foreground">{college.description}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <a href={college.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Website
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {filteredColleges.length === 0 && (
        <div className="flex h-[200px] w-full items-center justify-center rounded-md border border-dashed">
          <div className="flex flex-col items-center text-center">
            <h3 className="mt-4 text-lg font-semibold">No colleges found</h3>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">Try adjusting your search or add a new college.</p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add College
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

