"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { CalendarPlus, Clock, MessageSquare } from "lucide-react"

// Sample meetings data
const upcomingMeetings = [
  {
    id: "M001",
    counselorName: "Dr. Sarah Johnson",
    date: "2025-03-18",
    time: "10:00 AM",
    duration: "30 minutes",
    status: "Confirmed",
    topic: "College Selection Counseling",
  },
]

const pastMeetings = [
  {
    id: "M002",
    counselorName: "Dr. Sarah Johnson",
    date: "2025-03-10",
    time: "2:00 PM",
    duration: "45 minutes",
    status: "Completed",
    topic: "Initial Assessment",
    notes: "Discussed academic strengths and interests. Recommended focusing on computer science programs.",
  },
]

// Sample time slots
const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
]

export default function CounselingPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isBookDialogOpen, setIsBookDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleBookMeeting = () => {
    toast({
      title: "Meeting requested",
      description: "Your counseling session request has been submitted.",
    })
    setIsBookDialogOpen(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Counseling Sessions</h2>
        <Dialog open={isBookDialogOpen} onOpenChange={setIsBookDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <CalendarPlus className="mr-2 h-4 w-4" />
              Book New Session
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Book Counseling Session</DialogTitle>
              <DialogDescription>Schedule a new counseling session with an advisor.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Select>
                  <SelectTrigger className="col-span-4">
                    <SelectValue placeholder="Select topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="college-selection">College Selection</SelectItem>
                    <SelectItem value="program-guidance">Program Guidance</SelectItem>
                    <SelectItem value="application-help">Application Help</SelectItem>
                    <SelectItem value="career-planning">Career Planning</SelectItem>
                    <SelectItem value="general-advice">General Advice</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="col-span-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    disabled={(date) => {
                      // Disable past dates and weekends
                      const now = new Date()
                      now.setHours(0, 0, 0, 0)
                      return date < now || date.getDay() === 0 || date.getDay() === 6
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Select>
                  <SelectTrigger className="col-span-4">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Select>
                  <SelectTrigger className="col-span-4">
                    <SelectValue placeholder="Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Textarea className="col-span-4" placeholder="Add notes about what you'd like to discuss" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsBookDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleBookMeeting}>Request Session</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="past">Past Sessions</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4">
          {upcomingMeetings.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {upcomingMeetings.map((meeting) => (
                <Card key={meeting.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{meeting.topic}</span>
                      <span className="text-sm font-normal text-muted-foreground">{meeting.id}</span>
                    </CardTitle>
                    <CardDescription>With: {meeting.counselorName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center">
                        <CalendarPlus className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{new Date(meeting.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>
                          {meeting.time} ({meeting.duration})
                        </span>
                      </div>
                      <div className="mt-2 rounded-md bg-primary/10 px-2 py-1 text-xs font-medium">
                        {meeting.status}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                    <Button size="sm">Join Session</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex h-[200px] w-full items-center justify-center rounded-md border border-dashed">
              <div className="flex flex-col items-center text-center">
                <h3 className="mt-4 text-lg font-semibold">No upcoming sessions</h3>
                <p className="mb-4 mt-2 text-sm text-muted-foreground">
                  You don't have any upcoming counseling sessions scheduled.
                </p>
                <Button onClick={() => setIsBookDialogOpen(true)}>Book New Session</Button>
              </div>
            </div>
          )}
        </TabsContent>
        <TabsContent value="past" className="space-y-4">
          {pastMeetings.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pastMeetings.map((meeting) => (
                <Card key={meeting.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{meeting.topic}</span>
                      <span className="text-sm font-normal text-muted-foreground">{meeting.id}</span>
                    </CardTitle>
                    <CardDescription>With: {meeting.counselorName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center">
                        <CalendarPlus className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{new Date(meeting.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>
                          {meeting.time} ({meeting.duration})
                        </span>
                      </div>
                      <div className="mt-2 rounded-md bg-muted p-2 text-xs">
                        <p className="font-medium">Session Notes:</p>
                        <p>{meeting.notes}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" className="w-full">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Send Feedback
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex h-[200px] w-full items-center justify-center rounded-md border border-dashed">
              <div className="flex flex-col items-center text-center">
                <h3 className="mt-4 text-lg font-semibold">No past sessions</h3>
                <p className="mb-4 mt-2 text-sm text-muted-foreground">You haven't had any counseling sessions yet.</p>
                <Button onClick={() => setIsBookDialogOpen(true)}>Book Your First Session</Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

