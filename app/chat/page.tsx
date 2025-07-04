"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Phone, Video, MoreVertical, Paperclip, Smile } from "lucide-react"

interface Message {
  id: number
  sender: "user" | "counselor"
  content: string
  timestamp: string
  type: "text" | "image" | "file"
}

const initialMessages: Message[] = [
  {
    id: 1,
    sender: "counselor",
    content: "Hello! I'm Dr. Sarah Johnson. Thank you for reaching out today. How are you feeling right now?",
    timestamp: "10:30 AM",
    type: "text",
  },
  {
    id: 2,
    sender: "user",
    content: "Hi Dr. Johnson. I've been feeling quite anxious lately, especially about work and my relationships.",
    timestamp: "10:32 AM",
    type: "text",
  },
  {
    id: 3,
    sender: "counselor",
    content:
      "I understand that anxiety can be overwhelming. Can you tell me more about what specifically is causing you the most stress at work?",
    timestamp: "10:35 AM",
    type: "text",
  },
  {
    id: 4,
    sender: "user",
    content:
      "It's mainly the pressure to meet deadlines and the fear of making mistakes. I keep worrying about what my colleagues think of my work.",
    timestamp: "10:37 AM",
    type: "text",
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: messages.length + 1,
        sender: "user",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "text",
      }

      setMessages((prev) => [...prev, userMessage])
      setNewMessage("")
      setIsTyping(true)

      // Simulate counselor response
      setTimeout(() => {
        const counselorResponse: Message = {
          id: messages.length + 2,
          sender: "counselor",
          content:
            "That sounds really challenging. It's completely normal to feel anxious about work performance. Let's explore some coping strategies that might help you manage these feelings.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          type: "text",
        }
        setMessages((prev) => [...prev, counselorResponse])
        setIsTyping(false)
      }, 2000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        <div className="flex h-screen">
          {/* Chat List Sidebar */}
          <div className="w-80 bg-white border-r">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Messages</h2>
            </div>

            <div className="overflow-y-auto">
              {/* Active Chat */}
              <div className="p-4 bg-blue-50 border-l-4 border-blue-500">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">Dr. Sarah Johnson</h3>
                      <Badge className="bg-green-100 text-green-800 text-xs">Online</Badge>
                    </div>
                    <p className="text-sm text-gray-600 truncate">That sounds really challenging...</p>
                  </div>
                </div>
              </div>

              {/* Other Chats */}
              <div className="p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>MC</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">Dr. Michael Chen</h3>
                      <Badge variant="secondary" className="text-xs">
                        Offline
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 truncate">Thank you for sharing that with me...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="bg-white border-b p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">Dr. Sarah Johnson</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600">Online</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                      message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    {message.sender === "counselor" && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={`rounded-lg p-3 ${
                        message.sender === "user" ? "bg-blue-600 text-white" : "bg-white border"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div className="bg-white border rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white border-t p-4">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pr-10"
                  />
                  <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <span>End-to-end encrypted</span>
                <span>Press Enter to send</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
