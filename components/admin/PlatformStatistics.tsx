"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const donationData = [
  { month: 'Jul', amount: 5000 },
  { month: 'Aug', amount: 7000 },
  { month: 'Sep', amount: 6000 },
  { month: 'Oct', amount: 8000 },
  { month: 'Nov', amount: 9000 },
]

const requestData = [
  { name: 'Medical', value: 400 },
  { name: 'Education', value: 300 },
  { name: 'Housing', value: 200 },
  { name: 'Food', value: 100 },
]

const userData = [
  { month: 'Jul', donors: 100, needers: 50 },
  { month: 'Aug', donors: 120, needers: 60 },
  { month: 'Sep', donors: 140, needers: 70 },
  { month: 'Oct', donors: 160, needers: 80 },
  { month: 'Nov', donors: 180, needers: 90 },
]

export function PlatformStatistics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total Donations</CardTitle>
          <CardDescription>Monthly donation amounts</CardDescription>
        </CardHeader>
        <CardContent className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={donationData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Verified Requests</CardTitle>
          <CardDescription>Distribution by category</CardDescription>
        </CardHeader>
        <CardContent className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={requestData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#82ca9d" label />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Active Users</CardTitle>
          <CardDescription>Donors and Needers over time</CardDescription>
        </CardHeader>
        <CardContent className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={userData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Line type="monotone" dataKey="donors" stroke="#8884d8" />
              <Line type="monotone" dataKey="needers" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

