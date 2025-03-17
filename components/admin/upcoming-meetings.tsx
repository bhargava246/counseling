import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

// Sample meetings data
const meetings = [
  {
    id: "M001",
    studentName: "Alex Johnson",
    studentId: "STU001",
    date: "2025-03-18",
    time: "10:00 AM",
    duration: "30 minutes",
    status: "Confirmed",
    avatar: "AJ",
  },
  {
    id: "M002",
    studentName: "Michael Chen",
    studentId: "STU003",
    date: "2025-03-18",
    time: "11:30 AM",
    duration: "45 minutes",
    status: "Confirmed",
    avatar: "MC",
  },
  {
    id: "M003",
    studentName: "Jessica Patel",
    studentId: "STU006",
    date: "2025-03-19",
    time: "2:00 PM",
    duration: "30 minutes",
    status: "Pending",
    avatar: "JP",
  },
  {
    id: "M004",
    studentName: "Samantha Lee",
    studentId: "STU002",
    date: "2025-03-20",
    time: "9:30 AM",
    duration: "30 minutes",
    status: "Pending",
    avatar: "SL",
  },
  {
    id: "M005",
    studentName: "David Kim",
    studentId: "STU005",
    date: "2025-03-21",
    time: "10:00 AM",
    duration: "45 minutes",
    status: "Pending",
    avatar: "DK",
  },
]

export function UpcomingMeetings() {
  return (
    <div className="space-y-4">
      {meetings.map((meeting) => (
        <div key={meeting.id} className="flex items-center justify-between rounded-md border p-4">
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={meeting.studentName} />
              <AvatarFallback>{meeting.avatar}</AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <p className="text-sm font-medium">{meeting.studentName}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>{new Date(meeting.date).toLocaleDateString()}</span>
                <span className="mx-1">•</span>
                <span>{meeting.time}</span>
                <span className="mx-1">•</span>
                <span>{meeting.duration}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium">{meeting.status}</div>
            <Button size="sm">View</Button>
          </div>
        </div>
      ))}
    </div>
  )
}

