"use client"

import { motion } from "framer-motion"
import { Download, ArrowRight } from "lucide-react"

const topics = [
  "Policy Research",
  "Data Analytics",
  "State Planning",
  "Governance",
  "Federal Equity",
  "Public Policy",
]

export function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-20 relative overflow-hidden">
      {/* Background gradient accent */}
      <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col gap-8">
          {/* Open to
