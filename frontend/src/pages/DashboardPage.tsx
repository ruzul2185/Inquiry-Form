import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

type ApiResponse = {
  success: boolean;
  data: { month: string; total: number }[];
};

const chartConfig = {
  // fill this with whatever your ChartContainer expects
};

export default function MonthlyTotalsRecharts() {
  const [data, setData] = useState<ApiResponse["data"]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(import.meta.env.VITE_DASHBOARD_ENDPOINT); // Replace with your API URL
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const json: ApiResponse = await res.json();
        if (json.success) {
          setData(json.data);
        } else {
          setError("API returned unsuccessful response");
        }
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (data.length === 0) return <p>No data to display</p>;

  return (
    <ChartContainer config={chartConfig} className="h-64 max-w-2xl mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 30 }} // increased bottom margin for label
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            label={{ value: "Months", position: "bottom", offset: 0, dy: 10 }}
          />
          <YAxis />
          <Tooltip
            content={({ active, payload, label }) =>
              active && payload && payload.length ? (
                <ChartTooltipContent
                  label={label as string}
                  payload={payload}
                />
              ) : null
            }
          />
          <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
