'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { UserRole, PanelWidths, SystemStatus } from '@/types'

interface AppContextType {
  userRole: UserRole
  setUserRole: (role: UserRole) => void
  isSidebarCollapsed: boolean
  setIsSidebarCollapsed: (collapsed: boolean) => void
  panelWidths: PanelWidths
  setPanelWidths: (widths: PanelWidths) => void
  systemStatus: SystemStatus
  setSystemStatus: (status: SystemStatus) => void
  handleError: (error: Error) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole>('viewer')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [panelWidths, setPanelWidths] = useState<PanelWidths>({
    left: 256, // 16rem
    right: 320, // 20rem
  })
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    status: 'running',
    progress: 100,
  })

  // Persist scroll position
  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem(
        'scrollPosition',
        JSON.stringify({
          x: window.scrollX,
          y: window.scrollY,
        })
      )
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Restore scroll position
  useEffect(() => {
    const savedPosition = sessionStorage.getItem('scrollPosition')
    if (savedPosition) {
      const { x, y } = JSON.parse(savedPosition)
      window.scrollTo(x, y)
    }
  }, [])

  const handleError = (error: Error) => {
    console.error(error)
    // Here we would integrate with react-hot-toast for notifications
  }

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        panelWidths,
        setPanelWidths,
        systemStatus,
        setSystemStatus,
        handleError,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
} 