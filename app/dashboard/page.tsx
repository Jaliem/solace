"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, MessageCircle, BookOpen, Heart, TrendingUp, Clock, Plus } from "lucide-react"
import { MoodTracker } from "@/components/mood-tracker"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, Sarah!</h1>
              <p className="text-gray-600">How are you feeling today?</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Heart className="h-3 w-3 mr-1" />
                Streak: 7 days
              </Badge>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Quick Session
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Book Session</CardTitle>
                        <CardDescription>Schedule with a professional</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <MessageCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Start Chat</CardTitle>
                        <CardDescription>Connect with a counselor</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Heart className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Self-Assessment</CardTitle>
                        <CardDescription>Check your mental health</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <BookOpen className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Resources</CardTitle>
                        <CardDescription>Articles and guides</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            </section>

            {/* Mood Tracker */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Daily Check-in</h2>
              <MoodTracker />
            </section>

            {/* Recent Activity */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <div className="flex-1">
                        <p className="font-medium">Session with Dr. Johnson</p>
                        <p className="text-sm text-gray-600">Yesterday, 2:00 PM</p>
                      </div>
                      <Badge variant="secondary">Completed</Badge>
                    </div>

                    <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                      <Heart className="h-5 w-5 text-green-600" />
                      <div className="flex-1">
                        <p className="font-medium">Anxiety Assessment</p>
                        <p className="text-sm text-gray-600">3 days ago</p>
                      </div>
                      <Badge variant="secondary">Score: 12/21</Badge>
                    </div>

                    <div className="flex items-center space-x-4 p-3 bg-purple-50 rounded-lg">
                      <MessageCircle className="h-5 w-5 text-purple-600" />
                      <div className="flex-1">
                        <p className="font-medium">Chat with Sarah M.</p>
                        <p className="text-sm text-gray-600">1 week ago</p>
                      </div>
                      <Badge variant="secondary">45 min</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Your Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Weekly Goal</span>
                    <span>5/7 days</span>
                  </div>
                  <Progress value={71} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Mood Tracking</span>
                    <span>12/14 days</span>
                  </div>
                  <Progress value={86} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Sessions Completed</span>
                    <span>3/4</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Upcoming</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">DJ</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Dr. Johnson</p>
                        <p className="text-xs text-gray-600">Tomorrow, 3:00 PM</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-green-600">SM</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Sarah Miller</p>
                        <p className="text-xs text-gray-600">Friday, 1:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  View All Appointments
                </Button>
              </CardContent>
            </Card>

            {/* Recommended Articles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Recommended</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <h4 className="font-medium text-sm mb-1">Managing Anxiety in Daily Life</h4>
                    <p className="text-xs text-gray-600">5 min read</p>
                  </div>

                  <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <h4 className="font-medium text-sm mb-1">Sleep and Mental Health</h4>
                    <p className="text-xs text-gray-600">7 min read</p>
                  </div>

                  <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <h4 className="font-medium text-sm mb-1">Building Healthy Habits</h4>
                    <p className="text-xs text-gray-600">4 min read</p>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  Browse All Articles
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
