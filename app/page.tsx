"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Dashboard } from "@/components/dashboard"
import { Agenda } from "@/components/agenda"
import { Patients } from "@/components/patients"
import { Doctors } from "@/components/doctors"

export default function MedCenterApp() {
  const [activeSection, setActiveSection] = useState("dashboard")

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />
      case "agenda":
        return <Agenda />
      case "patients":
        return <Patients />
      case "doctors":
        return <Doctors />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      <main className="flex-1 lg:ml-0 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">{renderContent()}</div>
      </main>
    </div>
  )
}
