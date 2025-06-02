"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Calendar, Users, UserCheck, Menu, X, Stethoscope } from "lucide-react"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const menuItems = [
  { id: "dashboard", label: "Painel Gerencial", icon: LayoutDashboard },
  { id: "agenda", label: "Agenda", icon: Calendar },
  { id: "patients", label: "Pacientes", icon: Users },
  { id: "doctors", label: "Médicos", icon: UserCheck },
]

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 h-full w-72 bg-slate-800 text-white transform transition-transform duration-300 z-40 lg:relative lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">MedCenter</h1>
              <p className="text-sm text-slate-400">Clínica Bim</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 text-left",
                  activeSection === item.id
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "text-slate-300 hover:text-white hover:bg-slate-700",
                )}
                onClick={() => {
                  onSectionChange(item.id)
                  setIsOpen(false)
                }}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-slate-700 rounded-lg p-4">
            <p className="text-sm text-slate-300">Sistema de Gestão Médica</p>
            <p className="text-xs text-slate-400">by Davi Gouveia - 2025</p>
          </div>
        </div>
      </div>
    </>
  )
}
