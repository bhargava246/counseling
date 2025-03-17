import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarClock, GraduationCap, School } from "lucide-react"
import Link from "next/link"

export default function StudentDashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Student Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button>
              <CalendarClock className="mr-2 h-4 w-4" />
              Book Counseling
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">75%</div>
              <Progress value={75} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">Complete your profile to get better college matches</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">College Matches</CardTitle>
              <School className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Based on your academic profile</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
              <CalendarClock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Next session on March 18, 2025</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Academic Score</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">Overall academic performance</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="recommendations" className="space-y-4">
          <TabsList>
            <TabsTrigger value="recommendations">College Recommendations</TabsTrigger>
            <TabsTrigger value="sessions">Counseling Sessions</TabsTrigger>
          </TabsList>
          <TabsContent value="recommendations" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Tech University",
                  location: "San Francisco, CA",
                  match: 95,
                  programs: ["Computer Science", "Data Science"],
                  cutoff: 85,
                },
                {
                  name: "Engineering Institute",
                  location: "Austin, TX",
                  match: 92,
                  programs: ["Mechanical Engineering", "Civil Engineering"],
                  cutoff: 82,
                },
                {
                  name: "Business School",
                  location: "New York, NY",
                  match: 88,
                  programs: ["Business Administration", "Finance"],
                  cutoff: 88,
                },
                {
                  name: "Liberal Arts College",
                  location: "Boston, MA",
                  match: 82,
                  programs: ["Psychology", "English Literature"],
                  cutoff: 80,
                },
                {
                  name: "Medical Institute",
                  location: "Chicago, IL",
                  match: 78,
                  programs: ["Medicine", "Nursing"],
                  cutoff: 92,
                },
                {
                  name: "Arts Academy",
                  location: "Los Angeles, CA",
                  match: 75,
                  programs: ["Fine Arts", "Music"],
                  cutoff: 75,
                },
              ].map((college, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{college.name}</CardTitle>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {college.match}%
                      </span>
                    </div>
                    <CardDescription>{college.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">Programs: </span>
                        {college.programs.join(", ")}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Cutoff: </span>
                        {college.cutoff}%
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Match Score: </span>
                        <div className="mt-1">
                          <Progress value={college.match} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="flex justify-center">
              <Link href="/student/colleges">
                <Button variant="outline">View All Recommendations</Button>
              </Link>
            </div>
          </TabsContent>
          <TabsContent value="sessions" className="space-y-4">
            <div className="rounded-md border">
              <div className="p-4">
                <h3 className="text-lg font-medium">Upcoming Sessions</h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between rounded-md border p-4">
                    <div>
                      <h4 className="font-medium">College Selection Counseling</h4>
                      <p className="text-sm text-muted-foreground">March 18, 2025 at 10:00 AM</p>
                      <p className="text-sm text-muted-foreground">Duration: 30 minutes</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                      <Button size="sm">Join</Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t p-4">
                <h3 className="text-lg font-medium">Past Sessions</h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between rounded-md border p-4">
                    <div>
                      <h4 className="font-medium">Initial Assessment</h4>
                      <p className="text-sm text-muted-foreground">March 10, 2025 at 2:00 PM</p>
                      <p className="text-sm text-muted-foreground">Duration: 45 minutes</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Notes
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Link href="/student/counseling">
                <Button>Book New Session</Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

