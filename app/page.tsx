"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from "react"

export default function AuthComponent() {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSignIn = async () => {
    setIsLoading(true)
    await signIn()
    setIsLoading(false)
  }
  
  const handleSignOut = async () => {
    setIsLoading(true)
    await signOut()
    setIsLoading(false)
  }
  
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-32 w-full">
        <div className="animate-pulse flex space-x-2">
          <div className="h-3 w-3 bg-indigo-500 rounded-full"></div>
          <div className="h-3 w-3 bg-indigo-500 rounded-full"></div>
          <div className="h-3 w-3 bg-indigo-500 rounded-full"></div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="px-8 py-10">
        {session?.user ? (
          <div className="text-center">
            <div className="h-24 w-24 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto mb-4 flex items-center justify-center">
              {session.user.image ? (
                <img 
                  src={session.user.image} 
                  alt="Profile" 
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-white">
                  {session.user.name?.charAt(0) || session.user.email?.charAt(0)}
                </span>
              )}
            </div>
            
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              {session.user.name || "Welcome back!"}
            </h2>
            
            <p className="text-sm text-gray-500 mb-6">
              {session.user.email}
            </p>
            
            <button
              onClick={handleSignOut}
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-medium rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 disabled:opacity-70"
            >
              {isLoading ? "Signing out..." : "Sign out"}
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="h-24 w-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mb-6 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome
            </h2>
            
            <p className="text-sm text-gray-500 mb-8">
              Please sign in to access your account
            </p>
            
            <button
              onClick={handleSignIn}
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-70"
            >
              {isLoading ? "Signing in..." : "Sign in with your account"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}