import type { ReactNode } from "react"
import StudentSidebar from "@/components/student-sidebar"

export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <StudentSidebar />
      <main className="flex-1 p-6 md:p-8">{children}</main>
    </div>
  )
}

