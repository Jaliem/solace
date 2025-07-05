"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Phone,
  Calendar,
  Star,
  TrendingUp,
  DollarSign,
  Camera,
  Edit3,
  Save,
  Bell,
  Award,
  Users,
  MessageCircle,
  Video,
  FileText,
  Settings,
  CheckCircle,
  AlertCircle,
  Plus,
  X,
  Eye,
  Download,
} from "lucide-react"

interface ProfessionalData {
  id: string
  firstName: string
  lastName: string
  title: string
  email: string
  phone: string
  bio: string
  specialties: string[]
  languages: string[]
  experience: string
  education: string
  licenseNumber: string
  licenseState: string
  licenseExpiry: string
  hourlyRate: number
  rating: number
  totalReviews: number
  totalSessions: number
  acceptingNewClients: boolean
  verified: boolean
  profileImage?: string
  availability: {
    monday: { enabled: boolean; slots: string[] }
    tuesday: { enabled: boolean; slots: string[] }
    wednesday: { enabled: boolean; slots: string[] }
    thursday: { enabled: boolean; slots: string[] }
    friday: { enabled: boolean; slots: string[] }
    saturday: { enabled: boolean; slots: string[] }
    sunday: { enabled: boolean; slots: string[] }
  }
}

interface Review {
  id: string
  clientName: string
  rating: number
  comment: string
  date: string
  sessionType: string
}

interface Session {
  id: string
  clientName: string
  date: string
  time: string
  duration: number
  type: "video" | "audio" | "chat"
  status: "scheduled" | "completed" | "cancelled" | "no-show"
  notes?: string
}

export default function ProfessionalProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const [professionalData, setProfessionalData] = useState<ProfessionalData>({
    id: "prof-1",
    firstName: "Dr. Sarah",
    lastName: "Johnson",
    title: "Clinical Psychologist",
    email: "dr.sarah.johnson@solace.com",
    phone: "+1 (555) 123-4567",
    bio: "I am a licensed clinical psychologist with over 8 years of experience helping individuals overcome anxiety, depression, and trauma. I specialize in cognitive behavioral therapy (CBT) and have a passion for helping people develop healthy coping strategies and achieve their mental health goals.",
    specialties: ["Anxiety Disorders", "Depression", "Trauma & PTSD", "CBT"],
    languages: ["English", "Spanish"],
    experience: "8 years",
    education: "Ph.D. in Clinical Psychology, Stanford University, 2016",
    licenseNumber: "PSY12345",
    licenseState: "California",
    licenseExpiry: "2025-12-31",
    hourlyRate: 150,
    rating: 4.9,
    totalReviews: 127,
    totalSessions: 342,
    acceptingNewClients: true,
    verified: true,
    profileImage: "/placeholder.svg?height=120&width=120",
    availability: {
      monday: { enabled: true, slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
      tuesday: { enabled: true, slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
      wednesday: { enabled: true, slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
      thursday: { enabled: true, slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
      friday: { enabled: true, slots: ["09:00", "10:00", "11:00", "14:00", "15:00"] },
      saturday: { enabled: false, slots: [] },
      sunday: { enabled: false, slots: [] },
    },
  })

  const [reviews] = useState<Review[]>([
    {
      id: "1",
      clientName: "Anonymous Client",
      rating: 5,
      comment:
        "Dr. Johnson has been incredibly helpful in my journey with anxiety. Her approach is both professional and compassionate.",
      date: "2024-01-15",
      sessionType: "Individual Therapy",
    },
    {
      id: "2",
      clientName: "Anonymous Client",
      rating: 5,
      comment:
        "Excellent therapist! She helped me develop coping strategies that have made a real difference in my daily life.",
      date: "2024-01-10",
      sessionType: "CBT Session",
    },
    {
      id: "3",
      clientName: "Anonymous Client",
      rating: 4,
      comment: "Very knowledgeable and patient. I appreciate her evidence-based approach to therapy.",
      date: "2024-01-05",
      sessionType: "Individual Therapy",
    },
  ])

  const [upcomingSessions] = useState<Session[]>([
    {
      id: "1",
      clientName: "Client A",
      date: "2024-01-22",
      time: "10:00",
      duration: 50,
      type: "video",
      status: "scheduled",
    },
    {
      id: "2",
      clientName: "Client B",
      date: "2024-01-22",
      time: "14:00",
      duration: 50,
      type: "video",
      status: "scheduled",
    },
    {
      id: "3",
      clientName: "Client C",
      date: "2024-01-23",
      time: "09:00",
      duration: 50,
      type: "audio",
      status: "scheduled",
    },
  ])

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    clientMessages: true,
    platformUpdates: true,
    marketingEmails: false,
    autoAcceptBookings: false,
    requireDeposit: true,
    cancellationPolicy: "24-hours",
    sessionBuffer: "15-minutes",
  })

  const handleSave = () => {
    // Here you would save to database
    setIsEditing(false)
    // Show success message
  }

  const handleInputChange = (field: string, value: any) => {
    setProfessionalData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePreferenceChange = (field: string, value: boolean | string) => {
    setPreferences((prev) => ({ ...prev, [field]: value }))
  }

  const getSessionTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "audio":
        return <Phone className="h-4 w-4" />
      case "chat":
        return <MessageCircle className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "no-show":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    let completed = 0
    const total = 10

    if (professionalData.bio) completed++
    if (professionalData.specialties.length > 0) completed++
    if (professionalData.languages.length > 0) completed++
    if (professionalData.education) completed++
    if (professionalData.experience) completed++
    if (professionalData.hourlyRate > 0) completed++
    if (professionalData.profileImage) completed++
    if (professionalData.licenseNumber) completed++
    if (Object.values(professionalData.availability).some((day) => day.enabled)) completed++
    if (professionalData.phone && professionalData.email) completed++

    return Math.round((completed / total) * 100)
  }

  const profileCompletion = calculateProfileCompletion()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={professionalData.profileImage || "/placeholder.svg"} alt="Profile" />
                  <AvatarFallback className="text-lg">
                    {professionalData.firstName[0]}
                    {professionalData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0" variant="secondary">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {professionalData.firstName} {professionalData.lastName}
                  </h1>
                  {professionalData.verified && (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-lg text-gray-600 mb-2">{professionalData.title}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>
                      {professionalData.rating} ({professionalData.totalReviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{professionalData.totalSessions} sessions completed</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-4 w-4" />
                    <span>${professionalData.hourlyRate}/hour</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant={professionalData.acceptingNewClients ? "default" : "secondary"}>
                {professionalData.acceptingNewClients ? "Accepting New Clients" : "Not Accepting New Clients"}
              </Badge>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Profile Completion Alert */}
        {profileCompletion < 100 && (
          <Alert className="mb-6 border-orange-200 bg-orange-50">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              Your profile is {profileCompletion}% complete. Complete your profile to attract more clients and improve
              your visibility.
              <Progress value={profileCompletion} className="mt-2 h-2" />
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Stats Cards */}
              <div className="lg:col-span-2 grid md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium opacity-90">This Month</CardTitle>
                      <Calendar className="h-4 w-4 opacity-80" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-sm opacity-80">Sessions completed</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium opacity-90">Revenue</CardTitle>
                      <DollarSign className="h-4 w-4 opacity-80" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$3,600</div>
                    <p className="text-sm opacity-80">This month</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium opacity-90">Rating</CardTitle>
                      <Star className="h-4 w-4 opacity-80" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{professionalData.rating}</div>
                    <p className="text-sm opacity-80">Average rating</p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>Quick Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Block Time Slot
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Create Note Template
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Client Data
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Bell className="h-4 w-4 mr-2" />
                    Send Announcement
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Professional Information */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Professional Information</CardTitle>
                  <CardDescription>Your credentials and specializations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="bio">Professional Bio</Label>
                        <Textarea
                          id="bio"
                          value={professionalData.bio}
                          onChange={(e) => handleInputChange("bio", e.target.value)}
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                        <Input
                          id="hourlyRate"
                          type="number"
                          value={professionalData.hourlyRate}
                          onChange={(e) => handleInputChange("hourlyRate", Number(e.target.value))}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Bio</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{professionalData.bio}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Experience</h4>
                          <p className="text-gray-600">{professionalData.experience}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Hourly Rate</h4>
                          <p className="text-gray-600">${professionalData.hourlyRate}/hour</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Education</h4>
                        <p className="text-gray-600 text-sm">{professionalData.education}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Specialties</h4>
                        <div className="flex flex-wrap gap-2">
                          {professionalData.specialties.map((specialty) => (
                            <Badge key={specialty} variant="secondary">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Languages</h4>
                        <div className="flex flex-wrap gap-2">
                          {professionalData.languages.map((language) => (
                            <Badge key={language} variant="outline">
                              {language}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>License Information</CardTitle>
                  <CardDescription>Professional licensing details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">License Number</h4>
                      <p className="text-gray-600">{professionalData.licenseNumber}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">License State</h4>
                      <p className="text-gray-600">{professionalData.licenseState}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Expiry Date</h4>
                    <p className="text-gray-600">{new Date(professionalData.licenseExpiry).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-green-800 font-medium">License Verified</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Sessions */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Upcoming Sessions</CardTitle>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingSessions.slice(0, 3).map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">{getSessionTypeIcon(session.type)}</div>
                        <div>
                          <p className="font-medium">{session.clientName}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(session.date).toLocaleDateString()} at {session.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(session.status)}>{session.status}</Badge>
                        <span className="text-sm text-gray-500">{session.duration} min</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Availability</CardTitle>
                <CardDescription>Manage your weekly schedule and availability</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(professionalData.availability).map(([day, dayData]) => (
                    <div key={day} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Switch
                            checked={dayData.enabled}
                            onCheckedChange={(checked) => {
                              const newAvailability = {
                                ...professionalData.availability,
                                [day]: { ...dayData, enabled: checked },
                              }
                              handleInputChange("availability", newAvailability)
                            }}
                          />
                          <Label className="capitalize font-medium">{day}</Label>
                        </div>
                        {dayData.enabled && (
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Slot
                          </Button>
                        )}
                      </div>
                      {dayData.enabled && (
                        <div className="ml-6 flex flex-wrap gap-2">
                          {dayData.slots.map((slot, index) => (
                            <Badge key={index} variant="outline" className="flex items-center space-x-1">
                              <span>{slot}</span>
                              <button
                                onClick={() => {
                                  const newSlots = dayData.slots.filter((_, i) => i !== index)
                                  const newAvailability = {
                                    ...professionalData.availability,
                                    [day]: { ...dayData, slots: newSlots },
                                  }
                                  handleInputChange("availability", newAvailability)
                                }}
                                className="ml-1 hover:text-red-600"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Client Management</CardTitle>
                <CardDescription>Manage your current and past clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">No client data available</p>
                  <p>Client information will appear here once you start seeing patients.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Client Reviews</CardTitle>
                    <CardDescription>
                      {professionalData.totalReviews} reviews • {professionalData.rating} average rating
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-2xl font-bold">{professionalData.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{review.clientName}</span>
                          <Badge variant="outline">{review.sessionType}</Badge>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">{review.comment}</p>
                      <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5" />
                    <span>Notification Preferences</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-600">Receive updates via email</p>
                    </div>
                    <Switch
                      checked={preferences.emailNotifications}
                      onCheckedChange={(checked) => handlePreferenceChange("emailNotifications", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-gray-600">Text message alerts</p>
                    </div>
                    <Switch
                      checked={preferences.smsNotifications}
                      onCheckedChange={(checked) => handlePreferenceChange("smsNotifications", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Appointment Reminders</Label>
                      <p className="text-sm text-gray-600">Reminders for upcoming sessions</p>
                    </div>
                    <Switch
                      checked={preferences.appointmentReminders}
                      onCheckedChange={(checked) => handlePreferenceChange("appointmentReminders", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Client Messages</Label>
                      <p className="text-sm text-gray-600">Notifications for client messages</p>
                    </div>
                    <Switch
                      checked={preferences.clientMessages}
                      onCheckedChange={(checked) => handlePreferenceChange("clientMessages", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>Practice Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-Accept Bookings</Label>
                      <p className="text-sm text-gray-600">Automatically accept new bookings</p>
                    </div>
                    <Switch
                      checked={preferences.autoAcceptBookings}
                      onCheckedChange={(checked) => handlePreferenceChange("autoAcceptBookings", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Require Deposit</Label>
                      <p className="text-sm text-gray-600">Require payment before sessions</p>
                    </div>
                    <Switch
                      checked={preferences.requireDeposit}
                      onCheckedChange={(checked) => handlePreferenceChange("requireDeposit", checked)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Cancellation Policy</Label>
                    <Select
                      value={preferences.cancellationPolicy}
                      onValueChange={(value) => handlePreferenceChange("cancellationPolicy", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24-hours">24 hours notice</SelectItem>
                        <SelectItem value="48-hours">48 hours notice</SelectItem>
                        <SelectItem value="72-hours">72 hours notice</SelectItem>
                        <SelectItem value="1-week">1 week notice</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Session Buffer Time</Label>
                    <Select
                      value={preferences.sessionBuffer}
                      onValueChange={(value) => handlePreferenceChange("sessionBuffer", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-minutes">No buffer</SelectItem>
                        <SelectItem value="15-minutes">15 minutes</SelectItem>
                        <SelectItem value="30-minutes">30 minutes</SelectItem>
                        <SelectItem value="60-minutes">60 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Performance Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Session Completion Rate</span>
                    <span className="text-blue-600 font-bold">96%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Client Retention Rate</span>
                    <span className="text-green-600 font-bold">89%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium">Average Session Rating</span>
                    <span className="text-purple-600 font-bold">4.9/5</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="font-medium">Response Time</span>
                    <span className="text-orange-600 font-bold">&lt; 2 hours</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5" />
                    <span>Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <Award className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="font-medium text-yellow-800">Top Rated Professional</p>
                      <p className="text-sm text-yellow-600">Maintained 4.8+ rating for 6 months</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">Consistent Professional</p>
                      <p className="text-sm text-green-600">100% session attendance this month</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-800">Client Favorite</p>
                      <p className="text-sm text-blue-600">95% client retention rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
