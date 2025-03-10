"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function WelcomePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate splash screen delay
    const timer = setTimeout(() => {
      setLoading(false)
      // Redirect to tasks page after splash screen
      setTimeout(() => {
        router.push("/tasks")
      }, 1000)
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="relative w-32 h-32 mb-6 animate-float">
        <Image
          src="/placeholder.svg?height=128&width=128"
          alt="Moon"
          width={128}
          height={128}
          className="rounded-full animate-glow"
        />
        <div className="absolute inset-0 moon-gradient rounded-full"></div>
      </div>

      <h1 className="handwritten text-5xl mb-8 text-white animate-glow">Moon</h1>

      {loading ? (
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-white/50 animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-white/50 animate-pulse delay-150"></div>
          <div className="w-3 h-3 rounded-full bg-white/50 animate-pulse delay-300"></div>
        </div>
      ) : (
        <p className="text-white/70 animate-fade-in">Your productivity companion</p>
      )}
    </div>
  )
}

