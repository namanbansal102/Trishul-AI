"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { XIcon } from "lucide-react"
import { useSession } from "./session-context"

interface SessionModalProps {
  isOpen: boolean
  onClose: () => void
  // optional callback receives the created sessionId and userId (when available)
  onSessionCreated?: (sessionId?: string, userId?: string) => void
}

export function SessionModal({ isOpen, onClose, onSessionCreated }: SessionModalProps) {
  const { setSessionData } = useSession()
  const [sessionId, setSessionId] = useState("")
  const [walletPublicKey, setWalletPublicKey] = useState("")
  const [walletPrivateKey, setWalletPrivateKey] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPrivateKey, setShowPrivateKey] = useState(false)

  const generateRandomUserId = () => {
    return `user_${Math.random().toString(36).substr(2, 9)}`
  }

  // Call server API to create a session. If it fails, fall back to a local session id.
  const handleCreateSession = async () => {
    setError("")

    // Validate inputs
    if (!sessionId.trim()) {
      setError("Session ID is required")
      return
    }
    if (!walletPublicKey.trim()) {
      setError("Wallet Public Key is required")
      return
    }
    if (!walletPrivateKey.trim()) {
      setError("Wallet Private Key is required")
      return
    }

    setIsLoading(true)

    // generate a userId to send to server (server may return its own id)
    const newUserId = generateRandomUserId()

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 8000)

      const resp = await fetch("/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          appName: "ai-chat",
          userId: newUserId,
          state: {
            walletPublicKey: walletPublicKey.trim(),
          },
          events: [],
        }),
      })

      clearTimeout(timeoutId)

      if (!resp.ok) {
        // try to read server error for debugging, but fall through to fallback below
        let serverErr = `HTTP error ${resp.status}`
        try {
          const errJson = await resp.json()
          serverErr = errJson?.error || serverErr
        } catch (_) {}
        throw new Error(serverErr)
      }

      const serverSession = await resp.json()
      const finalSessionId = serverSession?.id || sessionId.trim()
      const finalUserId = serverSession?.userId || newUserId

      const sessionData = {
        sessionId: finalSessionId,
        userId: finalUserId,
        walletPublicKey: walletPublicKey.trim(),
        walletPrivateKey: walletPrivateKey.trim(),
      }

      // Update shared context and persist
      setSessionData(sessionData)
      localStorage.setItem("sessionId", finalSessionId)
      localStorage.setItem("userId", finalUserId)
      localStorage.setItem("appName", "ai-chat")

      // cleanup and notify parent
      setSessionId("")
      setWalletPublicKey("")
      setWalletPrivateKey("")
      onSessionCreated?.(finalSessionId, finalUserId)
      onClose()
    } catch (err) {
      console.error("Failed to create session via API, falling back locally:", err)

      // Fallback local session id
      try {
        const fallbackId = sessionId.trim() || `local_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
        const finalUserId = newUserId

        const sessionData = {
          sessionId: fallbackId,
          userId: finalUserId,
          walletPublicKey: walletPublicKey.trim(),
          walletPrivateKey: walletPrivateKey.trim(),
        }

        setSessionData(sessionData)
        localStorage.setItem("sessionId", fallbackId)
        localStorage.setItem("userId", finalUserId)
        localStorage.setItem("appName", "ai-chat")

        setSessionId("")
        setWalletPublicKey("")
        setWalletPrivateKey("")
        onSessionCreated?.(fallbackId, finalUserId)
        onClose()

        setError("Could not reach server — created a local session.")
      } catch (fallbackError) {
        console.error("Fallback session failure:", fallbackError)
        setError("Failed to create session. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCreateSession()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-2xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">Create Session</h2>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-200 transition-colors">
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-400 mb-6">
              Enter your wallet details and session information to get started — this will attempt to create a session on the server, and fall back to a local session if the server is unavailable.
            </p>

            <div className="space-y-4 mb-6">
              {/* Session ID Input */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Session ID</label>
                <input
                  type="text"
                  value={sessionId}
                  onChange={(e) => setSessionId(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter session ID (optional)"
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
                />
              </div>

              {/* Wallet Public Key Input */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Wallet Public Key</label>
                <input
                  type="text"
                  value={walletPublicKey}
                  onChange={(e) => setWalletPublicKey(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter wallet public key"
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
                />
              </div>

              {/* Wallet Private Key Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-slate-300">Wallet Private Key</label>
                  <button
                    type="button"
                    onClick={() => setShowPrivateKey(!showPrivateKey)}
                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {showPrivateKey ? "Hide" : "Show"}
                  </button>
                </div>
                <input
                  type={showPrivateKey ? "text" : "password"}
                  value={walletPrivateKey}
                  onChange={(e) => setWalletPrivateKey(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter wallet private key"
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
                />
              </div>

              {error && (
                <motion.div
                  className="px-4 py-2 rounded-lg bg-red-900/30 border border-red-700 text-red-300 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateSession}
                disabled={isLoading}
                className="flex-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating..." : "Create Session"}
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-700">
              <p className="text-xs text-slate-500">
                Your wallet information will be stored locally and used only for this session. A random User ID will be
                generated automatically.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
