"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

// Sample data for the chart
const data = [
  {
    name: "Jan",
    "Counseling Sessions": 20,
    "College Placements": 5,
  },
  {
    name: "Feb",
    "Counseling Sessions": 25,
    "College Placements": 8,
  },
  {
    name: "Mar",
    "Counseling Sessions": 30,
    "College Placements": 12,
  },
  {
    name: "Apr",
    "Counseling Sessions": 35,
    "College Placements": 15,
  },
  {
    name: "May",
    "Counseling Sessions": 40,
    "College Placements": 20,
  },
  {
    name: "Jun",
    "Counseling Sessions": 45,
    "College Placements": 25,
  },
  {
    name: "Jul",
    "Counseling Sessions": 50,
    "College Placements": 30,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Counseling Sessions" fill="#8884d8" />
        <Bar dataKey="College Placements" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}

