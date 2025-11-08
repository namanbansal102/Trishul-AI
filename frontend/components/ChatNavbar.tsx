"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { WalletConnectButton } from "./WalletConnectButton"

export function ChatNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 mx-4 mt-6"
      >
        <div className="max-w-7xl mx-auto px-4 backdrop-blur-3xl bg-black/50 rounded-full py-4 flex justify-between items-center border border-white/10">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M20 5L5 20L20 35L35 20L20 5Z" stroke="white" strokeWidth="2" />
              </svg>
            </Link>
            <div className="hidden md:flex items-center space-x-6 ml-8">
              <Link
                href="/"
                className="px-4 py-2 bg-white text-black hover:bg-gray-100 rounded-full text-sm transition-colors font-medium"
              >
                Home
              </Link>
              <Link href="/chat" className="px-4 py-2 text-white hover:text-gray-300 transition-colors">
                AI Chat
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/about" className="hidden md:block px-4 py-2 text-white hover:text-gray-300 transition-colors">
              About
            </Link>
            <WalletConnectButton />
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-[100] bg-black/95 backdrop-blur-lg"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6 text-lg">
              <button className="absolute top-6 right-6 p-2" onClick={() => setMobileMenuOpen(false)}>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <Link
                href="/"
                className="px-6 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/chat"
                className="px-6 py-3 text-white hover:text-gray-300 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                AI Chat
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 text-white hover:text-gray-300 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <div onClick={() => setMobileMenuOpen(false)}>
                <WalletConnectButton />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
