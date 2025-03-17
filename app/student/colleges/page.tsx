"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Building, ExternalLink, Filter, MapPin, School, Search, Star } from "lucide-react"

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
    matchScore: 95,
    saved: true,
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
    matchScore: 82,
    saved: false,
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
    matchScore: 88,
    saved: true,
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
    matchScore: 78,
    saved: false,
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
    matchScore: 75,
    saved: false,
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
    matchScore: 92,
    saved: true,
  },
]

export default function CollegesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [minMatchScore, setMinMatchScore] = useState(70)
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [savedColleges, setSavedColleges] = useState<string[]>(
    colleges.filter((college) => college.saved).map((college) => college.id),
  )

  const toggleSaved = (collegeId: string) => {
    if (savedColleges.includes(collegeId)) {
      setSavedColleges(savedColleges.filter((id) => id !== collegeId))
    } else {
      setSavedColleges([...savedColleges, collegeId])
    }
  }

  const filteredColleges = colleges
    .filter(
      (college) =>
        college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.programs.some((program) => program.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    .filter((college) => college.matchScore >= minMatchScore)
    .filter((college) => selectedTypes.length === 0 || selectedTypes.includes(college.type))

  const savedFilteredColleges = filteredColleges.filter((college) => savedColleges.includes(college.id))

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">College Recommendations</h2>
        <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Filter Colleges</DialogTitle>
              <DialogDescription>Adjust filters to refine your college recommendations.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Minimum Match Score</h3>
                <div className="flex items-center space-x-2">
                  <Slider
                    defaultValue={[minMatchScore]}
                    max={100}
                    min={0}
                    step={5}
                    onValueChange={(value) => setMinMatchScore(value[0])}
                  />
                  <span className="w-12 rounded-md border border-input px-2 py-0.5 text-center text-sm">
                    {minMatchScore}%
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">College Type</h3>
                <div className="grid grid-cols-2 gap-2">
                  {["University", "College", "Institute", "School", "Academy"].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`type-${type}`}
                        checked={selectedTypes.includes(type)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedTypes([...selectedTypes, type])
                          } else {
                            setSelectedTypes(selectedTypes.filter((t) => t !== type))
                          }
                        }}
                      />
                      <Label htmlFor={`type-${type}`}>{type}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  setMinMatchScore(70)
                  setSelectedTypes([])
                }}
              >
                Reset
              </Button>
              <Button onClick={() => setIsFilterDialogOpen(false)}>Apply Filters</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Recommendations</TabsTrigger>
          <TabsTrigger value="saved">Saved Colleges</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredColleges.map((college) => (
              <Card key={college.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{college.name}</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleSaved(college.id)}
                      className={savedColleges.includes(college.id) ? "text-yellow-500" : ""}
                    >
                      <Star className="h-5 w-5" fill={savedColleges.includes(college.id) ? "currentColor" : "none"} />
                      <span className="sr-only">{savedColleges.includes(college.id) ? "Unsave" : "Save"}</span>
                    </Button>
                  </div>
                  <CardDescription className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    {college.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Match Score:</span>
                      <Badge className="bg-primary">{college.matchScore}%</Badge>
                    </div>
                    <Progress value={college.matchScore} className="h-2" />
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
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Request Info
                  </Button>
                  <Button size="sm" asChild>
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
                <p className="mb-4 mt-2 text-sm text-muted-foreground">Try adjusting your search or filters.</p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setMinMatchScore(70)
                    setSelectedTypes([])
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
        <TabsContent value="saved" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {savedFilteredColleges.map((college) => (
              <Card key={college.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{college.name}</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleSaved(college.id)}
                      className="text-yellow-500"
                    >
                      <Star className="h-5 w-5" fill="currentColor" />
                      <span className="sr-only">Unsave</span>
                    </Button>
                  </div>
                  <CardDescription className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    {college.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Match Score:</span>
                      <Badge className="bg-primary">{college.matchScore}%</Badge>
                    </div>
                    <Progress value={college.matchScore} className="h-2" />
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
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Request Info
                  </Button>
                  <Button size="sm" asChild>
                    <a href={college.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit Website
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          {savedFilteredColleges.length === 0 && (
            <div className="flex h-[200px] w-full items-center justify-center rounded-md border border-dashed">
              <div className="flex flex-col items-center text-center">
                <h3 className="mt-4 text-lg font-semibold">No saved colleges</h3>
                <p className="mb-4 mt-2 text-sm text-muted-foreground">Save colleges by clicking the star icon.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    const tabsList = document.querySelector('[role="tablist"]')
                    if (tabsList) {
                      const allTab = tabsList.querySelector('[value="all"]')
                      if (allTab instanceof HTMLElement) {
                        allTab.click()
                      }
                    }
                  }}
                >
                  View All Recommendations
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

