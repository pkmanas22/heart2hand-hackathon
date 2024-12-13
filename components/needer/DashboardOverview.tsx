import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DashboardOverview() {
  const stats = [
    { title: "Total Requests Created", value: 42 },
    { title: "Verified Requests", value: 28 },
    { title: "Pending Requests", value: 10 },
    { title: "Rejected Requests", value: 4 },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
