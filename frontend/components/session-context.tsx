"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface SessionData {
  sessionId: string
  userId: string
  walletPublicKey: string
  walletPrivateKey: string
}

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: number
}

interface SessionContextType {
  sessionData: SessionData | null
  setSessionData: (data: SessionData) => void
  clearSessionData: () => void
  isSessionReady: boolean
  chatHistory: ChatMessage[]
  addChatMessage: (message: ChatMessage) => void
  clearChatHistory: () => void
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [sessionData, setSessionDataState] = useState<SessionData | null>(null)
  const [isSessionReady, setIsSessionReady] = useState(false)
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])

  useEffect(() => {
    const storedSession = localStorage.getItem("sessionData")
    if (storedSession) {
      try {
        setSessionDataState(JSON.parse(storedSession))
      } catch (error) {
        console.error("Failed to parse stored session:", error)
      }
    }

    const storedChatHistory = localStorage.getItem("chatHistory")
    if (storedChatHistory) {
      try {
        setChatHistory(JSON.parse(storedChatHistory))
      } catch (error) {
        console.error("Failed to parse stored chat history:", error)
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

  const addChatMessage = (message: ChatMessage) => {
    setChatHistory((prevHistory) => {
      const updatedHistory = [...prevHistory, message]
      localStorage.setItem("chatHistory", JSON.stringify(updatedHistory))
      return updatedHistory
    })
  }

  const clearChatHistory = () => {
    setChatHistory([])
    localStorage.removeItem("chatHistory")
  }

  return (
    <SessionContext.Provider
      value={{
        sessionData,
        setSessionData,
        clearSessionData,
        isSessionReady,
        chatHistory,
        addChatMessage,
        clearChatHistory,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider")
  }
  return context
}
