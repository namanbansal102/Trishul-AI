"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface SessionData {
  sessionId: string
  userId: string
  walletPublicKey: string
  walletPrivateKey: string
}

interface SessionContextType {
  sessionData: SessionData | null
  setSessionData: (data: SessionData) => void
  clearSessionData: () => void
  isSessionReady: boolean
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [sessionData, setSessionDataState] = useState<SessionData | null>(null)
  const [isSessionReady, setIsSessionReady] = useState(false)

  useEffect(() => {
    const storedSession = localStorage.getItem("sessionData")
    if (storedSession) {
      try {
        setSessionDataState(JSON.parse(storedSession))
      } catch (error) {
        console.error("Failed to parse stored session:", error)
      }
    }
    setIsSessionReady(true)
  }, [])

  const setSessionData = (data: SessionData) => {
    setSessionDataState(data)
    localStorage.setItem("sessionData", JSON.stringify(data))
  }

  const clearSessionData = () => {
    setSessionDataState(null)
    localStorage.removeItem("sessionData")
  }

  return (
    <SessionContext.Provider value={{ sessionData, setSessionData, clearSessionData, isSessionReady }}>
      {children}
    </SessionContext.Provider>
  )
}

export { SessionProvider, useSession } from "@/components/session-context"
