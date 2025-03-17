import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample students data
const students = [
  {
    id: "STU001",
    name: "Alex Johnson",
    email: "alex.j@example.com",
    marks: 92,
    lastActive: "2 hours ago",
    avatar: "AJ",
  },
  {
    id: "STU002",
    name: "Samantha Lee",
    email: "sam.lee@example.com",
    marks: 88,
    lastActive: "1 day ago",
    avatar: "SL",
  },
  {
    id: "STU003",
    name: "Michael Chen",
    email: "m.chen@example.com",
    marks: 76,
    lastActive: "3 hours ago",
    avatar: "MC",
  },
  {
    id: "STU005",
    name: "David Kim",
    email: "d.kim@example.com",
    marks: 82,
    lastActive: "Just now",
    avatar: "DK",
  },
  {
    id: "STU007",
    name: "Ryan Thompson",
    email: "r.thompson@example.com",
    marks: 85,
    lastActive: "2 days ago",
    avatar: "RT",
  },
]

export function RecentStudents() {
  return (
    <div className="space-y-8">
      {students.map((student) => (
        <div key={student.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={student.name} />
            <AvatarFallback>{student.avatar}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{student.name}</p>
            <p className="text-sm text-muted-foreground">{student.email}</p>
          </div>
          <div className="ml-auto font-medium">
            <span className="text-sm text-muted-foreground">Marks: </span>
            {student.marks}%
          </div>
        </div>
      ))}
    </div>
  )
}

