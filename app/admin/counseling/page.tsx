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
import { CalendarPlus, Clock, User } from "lucide-react"

// Sample meetings data
const upcomingMeetings = [
  {
    id: "M001",
    studentName: "Alex Johnson",
    studentId: "STU001",
    date: "2025-03-18",
    time: "10:00 AM",
    duration: "30 minutes",
    status: "Confirmed",
  },
  {
    id: "M002",
    studentName: "Michael Chen",
    studentId: "STU003",
    date: "2025-03-18",
    time: "11:30 AM",
    duration: "45 minutes",
    status: "Confirmed",
  },
  {
    id: "M003",
    studentName: "Jessica Patel",
    studentId: "STU006",
    date: "2025-03-19",
    time: "2:00 PM",
    duration: "30 minutes",
    status: "Pending",
  },
]

const pendingRequests = [
  {
    id: "R001",
    studentName: "Samantha Lee",
    studentId: "STU002",
    requestDate: "2025-03-16",
    preferredDate: "2025-03-20",
    preferredTime: "Afternoon",
    notes: "Would like to discuss engineering colleges.",
  },
  {
    id: "R002",
    studentName: "David Kim",
    studentId: "STU005",
    requestDate: "2025-03-17",
    preferredDate: "2025-03-21",
    preferredTime: "Morning",
    notes: "Need guidance on medical school applications.",
  },
  {
    id: "R003",
    studentName: "Ryan Thompson",
    studentId: "STU007",
    requestDate: "2025-03-17",
    preferredDate: "2025-03-22",
    preferredTime: "Evening",
    notes: "Interested in business programs.",
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
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleScheduleMeeting = () => {
    toast({
      title: "Meeting scheduled",
      description: `Counseling session with ${selectedRequest.studentName} has been scheduled.`,
    })
    setIsScheduleDialogOpen(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Counseling</h2>
        <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <CalendarPlus className="mr-2 h-4 w-4" />
              Schedule New Session
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Schedule Counseling Session</DialogTitle>
              <DialogDescription>Create a new counseling session with a student.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Select>
                  <SelectTrigger className="col-span-4">
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Alex Johnson",
                      "Samantha Lee",
                      "Michael Chen",
                      "Emily Rodriguez",
                      "David Kim",
                      "Jessica Patel",
                      "Ryan Thompson",
                      "Olivia Wilson",
                    ].map((name) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="col-span-4">
                  <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
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
                <Textarea className="col-span-4" placeholder="Add notes about the session (optional)" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleScheduleMeeting}>Schedule</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="pending">Pending Requests</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingMeetings.map((meeting) => (
              <Card key={meeting.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{meeting.studentName}</span>
                    <span className="text-sm font-normal text-muted-foreground">{meeting.id}</span>
                  </CardTitle>
                  <CardDescription>Student ID: {meeting.studentId}</CardDescription>
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
                    <div className="mt-2 rounded-md bg-primary/10 px-2 py-1 text-xs font-medium">{meeting.status}</div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                  <Button size="sm">Start Session</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pendingRequests.map((request) => (
              <Card key={request.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{request.studentName}</span>
                    <span className="text-sm font-normal text-muted-foreground">{request.id}</span>
                  </CardTitle>
                  <CardDescription>Student ID: {request.studentId}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Requested: {new Date(request.requestDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <CalendarPlus className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>
                        Preferred: {new Date(request.preferredDate).toLocaleDateString()} ({request.preferredTime})
                      </span>
                    </div>
                    <div className="mt-2 rounded-md bg-muted p-2 text-xs">
                      <p className="font-medium">Notes:</p>
                      <p>{request.notes}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "Request declined",
                        description: `You have declined the counseling request from ${request.studentName}.`,
                      })
                    }}
                  >
                    Decline
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedRequest(request)
                      setIsScheduleDialogOpen(true)
                    }}
                  >
                    Schedule
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Counseling Calendar</CardTitle>
              <CardDescription>View and manage your counseling schedule.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                <div className="space-y-2">
                  <h3 className="font-medium">Sessions on {date?.toLocaleDateString()}</h3>
                  {upcomingMeetings
                    .filter((meeting) => meeting.date === date?.toISOString().split("T")[0])
                    .map((meeting) => (
                      <div key={meeting.id} className="flex items-center justify-between rounded-md border p-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{meeting.time}</span>
                          <span className="font-medium">{meeting.studentName}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
                  {upcomingMeetings.filter((meeting) => meeting.date === date?.toISOString().split("T")[0]).length ===
                    0 && <p className="text-sm text-muted-foreground">No sessions scheduled for this day.</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

