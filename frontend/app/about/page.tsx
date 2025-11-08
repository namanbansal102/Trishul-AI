"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Sparkles, Target, Users, Zap } from "lucide-react"

export default function AboutPage() {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Intelligence",
      description: "Leveraging cutting-edge AI technology to provide intelligent responses and solutions.",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Mission-Driven",
      description: "Committed to making AI accessible and useful for everyone, everywhere.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community First",
      description: "Built with the community in mind, focusing on user experience and feedback.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Optimized for speed and performance, delivering results in real-time.",
    },
  ]

  const team = [
    {
      name: "Vision",
      role: "To democratize AI technology",
      description: "Making advanced AI accessible to everyone through intuitive interfaces.",
    },
    {
      name: "Innovation",
      role: "Pushing boundaries",
      description: "Constantly evolving with the latest AI advancements and technologies.",
    },
    {
      name: "Trust",
      role: "Building with integrity",
      description: "Prioritizing user privacy, security, and transparent AI interactions.",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-fuchsia-500/10 rounded-full mix-blend-normal filter blur-[96px] animate-pulse delay-1000" />
      </div>

      {/* Navbar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 mx-4 mt-6"
      >
        <div className="max-w-7xl mx-auto px-4 backdrop-blur-3xl bg-black/50 rounded-full py-4 flex justify-between items-center border border-white/10">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              href="/chat"
              className="px-4 py-2 bg-white text-black rounded-full text-sm hover:bg-gray-100 transition-colors font-medium"
            >
              Try AI Chat
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.h1
            className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            About Trishul
          </motion.h1>
          <motion.p
            className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            We're building the future of AI-powered conversations, making advanced technology accessible and intuitive
            for everyone.
          </motion.p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-24"
        >
          <div className="backdrop-blur-2xl bg-white/[0.02] rounded-3xl border border-white/[0.05] p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-white/70 text-lg leading-relaxed">
              <p>
                Trishul was born from a simple idea: AI should be accessible, intuitive, and powerful. We believe that
                everyone should have access to cutting-edge AI technology without the complexity.
              </p>
              <p>
                Our platform combines state-of-the-art language models with a beautiful, user-friendly interface that
                makes AI conversations feel natural and engaging. Whether you're a developer, creator, or simply curious
                about AI, Trishul is designed to empower you.
              </p>
              <p>
                We're constantly evolving, learning from our community, and pushing the boundaries of what's possible
                with AI technology. Join us on this journey to make AI work for everyone.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                className="backdrop-blur-2xl bg-white/[0.02] rounded-2xl border border-white/[0.05] p-6 hover:bg-white/[0.04] transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20 transition-colors">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-white/60">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
                className="backdrop-blur-2xl bg-white/[0.02] rounded-2xl border border-white/[0.05] p-6 text-center hover:bg-white/[0.04] transition-all"
              >
                <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">
                  {member.name}
                </h3>
                <p className="text-white/80 font-medium mb-3">{member.role}</p>
                <p className="text-white/60">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="text-center"
        >
          <div className="backdrop-blur-2xl bg-gradient-to-br from-violet-500/10 to-indigo-500/10 rounded-3xl border border-white/[0.1] p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience AI?</h2>
            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already using Trishul to unlock the power of AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/chat"
                className="px-8 py-4 bg-white text-black rounded-full text-lg font-medium hover:bg-gray-100 transition-all hover:scale-105"
              >
                Get Started
              </Link>
              <Link
                href="/"
                className="px-8 py-4 bg-white/10 text-white rounded-full text-lg font-medium hover:bg-white/20 transition-all border border-white/20"
              >
                Learn More
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">© 2025 Trishul. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/" className="text-white/40 hover:text-white/80 transition-colors text-sm">
                Home
              </Link>
              <Link href="/chat" className="text-white/40 hover:text-white/80 transition-colors text-sm">
                AI Chat
              </Link>
              <Link href="/about" className="text-white/40 hover:text-white/80 transition-colors text-sm">
                About
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
