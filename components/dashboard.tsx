"use client"

import { MetricsCard } from "./metrics-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, TrendingUp, UserPlus, DollarSign, Clock } from "lucide-react"
import { useMedicalData } from "@/hooks/use-medical-data"

export function Dashboard() {
  const { getDashboardMetrics } = useMedicalData()
  const metrics = getDashboardMetrics()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Painel Gerencial</h1>
        <p className="text-slate-600">Visão geral da clínica</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricsCard
          title="Consultas Hoje"
          value={metrics.todayAppointments}
          description="consultas agendadas"
          icon={Calendar}
          trend={{ value: 12, isPositive: true }}
        />

        <MetricsCard
          title="Consultas da Semana"
          value={metrics.weekAppointments}
          description="esta semana"
          icon={Users}
          trend={{ value: 5, isPositive: true }}
        />

        <MetricsCard
          title="Taxa de Ocupação"
          value={`${metrics.occupancyRate}%`}
          description="dos horários"
          icon={TrendingUp}
          trend={{ value: 7, isPositive: true }}
        />

        <MetricsCard
          title="Novos Pacientes"
          value={metrics.newPatients}
          description="este mês"
          icon={UserPlus}
          trend={{ value: 20, isPositive: true }}
        />

        <MetricsCard
          title="Faturamento"
          value={`R$ ${metrics.revenue.toLocaleString()}`}
          description="este mês"
          icon={DollarSign}
          trend={{ value: 15, isPositive: true }}
        />

        <MetricsCard
          title="Pendentes"
          value={metrics.pendingAppointments}
          description="aguardando confirmação"
          icon={Clock}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Consultas por Especialidade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Cardiologia", value: 35, color: "bg-orange-500" },
                { name: "Dermatologia", value: 25, color: "bg-blue-500" },
                { name: "Pediatria", value: 20, color: "bg-green-500" },
                { name: "Ortopedia", value: 20, color: "bg-purple-500" },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="flex-1 text-sm">{item.name}</span>
                  <span className="text-sm font-medium">{item.value}%</span>
                  <div className="w-20 bg-slate-200 rounded-full h-2">
                    <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Faturamento Semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { day: "Segunda", value: 4200 },
                { day: "Terça", value: 3800 },
                { day: "Quarta", value: 4500 },
                { day: "Quinta", value: 5000 },
                { day: "Sexta", value: 5300 },
                { day: "Sábado", value: 2500 },
              ].map((item) => (
                <div key={item.day} className="flex items-center gap-3">
                  <span className="w-16 text-sm">{item.day}</span>
                  <div className="flex-1 bg-slate-200 rounded-full h-3">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-orange-500 to-blue-500"
                      style={{ width: `${(item.value / 5300) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">R$ {item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Convênio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Unimed", count: 45, percentage: 34 },
                { name: "Amil", count: 32, percentage: 24 },
                { name: "SulAmérica", count: 18, percentage: 14 },
                { name: "Bradesco", count: 12, percentage: 9 },
                { name: "Particular", count: 25, percentage: 19 },
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <span className="text-sm">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600">{item.count} pacientes</span>
                    <span className="text-sm font-medium">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Nova consulta agendada", patient: "Maria Silva", time: "2 min atrás" },
                { action: "Consulta confirmada", patient: "João Santos", time: "5 min atrás" },
                { action: "Novo paciente cadastrado", patient: "Ana Costa", time: "10 min atrás" },
                { action: "Consulta concluída", patient: "Carlos Lima", time: "15 min atrás" },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.action}</p>
                    <p className="text-xs text-slate-600">
                      {item.patient} • {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
