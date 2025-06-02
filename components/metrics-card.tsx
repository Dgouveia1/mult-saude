import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricsCardProps {
  title: string
  value: string | number
  description: string
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function MetricsCard({ title, value, description, icon: Icon, trend, className }: MetricsCardProps) {
  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-blue-500" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-600">{title}</CardTitle>
        <Icon className="h-5 w-5 text-orange-500" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-slate-900 mb-1">{value}</div>
        <p className="text-sm text-slate-600 mb-2">{description}</p>
        {trend && (
          <div
            className={cn(
              "text-xs px-2 py-1 rounded-full inline-flex items-center gap-1",
              trend.isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700",
            )}
          >
            <span>{trend.isPositive ? "↗" : "↘"}</span>
            {Math.abs(trend.value)}% vs período anterior
          </div>
        )}
      </CardContent>
    </Card>
  )
}
