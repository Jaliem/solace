"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Clock, Video, MessageCircle, Search, Filter } from "lucide-react"

const professionals = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Clinical Psychologist",
    specialties: ["Anxiety", "Depression", "CBT"],
    rating: 4.9,
    reviews: 127,
    experience: "8 years",
    languages: ["English", "Spanish"],
    availability: "Available today",
    price: "$120/session",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Specializing in cognitive behavioral therapy with a focus on anxiety and depression treatment.",
    verified: true,
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    title: "Licensed Therapist",
    specialties: ["Trauma", "PTSD", "Couples Therapy"],
    rating: 4.8,
    reviews: 89,
    experience: "12 years",
    languages: ["English", "Mandarin"],
    availability: "Next available: Tomorrow",
    price: "$100/session",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Expert in trauma-informed therapy and relationship counseling with extensive experience.",
    verified: true,
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    title: "Psychiatrist",
    specialties: ["Bipolar", "Medication Management", "Adult ADHD"],
    rating: 4.7,
    reviews: 156,
    experience: "10 years",
    languages: ["English", "Spanish", "Portuguese"],
    availability: "Available this week",
    price: "$150/session",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Board-certified psychiatrist specializing in mood disorders and medication management.",
    verified: true,
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    title: "Licensed Counselor",
    specialties: ["Addiction", "Family Therapy", "Grief Counseling"],
    rating: 4.6,
    reviews: 73,
    experience: "6 years",
    languages: ["English"],
    availability: "Available today",
    price: "$90/session",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Compassionate counselor with expertise in addiction recovery and family dynamics.",
    verified: true,
  },
]

export default function ProfessionalsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties")
  const [selectedLanguage, setSelectedLanguage] = useState("All Languages")

  const filteredProfessionals = professionals.filter((prof) => {
    const matchesSearch =
      prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prof.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesSpecialty = selectedSpecialty === "All Specialties" || prof.specialties.includes(selectedSpecialty)
    const matchesLanguage = selectedLanguage === "All Languages" || prof.languages.includes(selectedLanguage)

    return matchesSearch && matchesSpecialty && matchesLanguage
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Mental Health Professional</h1>
          <p className="text-gray-600">Connect with licensed psychologists and counselors who understand your needs</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Specialties">All Specialties</SelectItem>
                <SelectItem value="Anxiety">Anxiety</SelectItem>
                <SelectItem value="Depression">Depression</SelectItem>
                <SelectItem value="Trauma">Trauma</SelectItem>
                <SelectItem value="PTSD">PTSD</SelectItem>
                <SelectItem value="CBT">CBT</SelectItem>
                <SelectItem value="Couples Therapy">Couples Therapy</SelectItem>
                <SelectItem value="Addiction">Addiction</SelectItem>
                <SelectItem value="Family Therapy">Family Therapy</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Languages">All Languages</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Spanish">Spanish</SelectItem>
                <SelectItem value="Mandarin">Mandarin</SelectItem>
                <SelectItem value="Portuguese">Portuguese</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="w-full bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredProfessionals.map((professional) => (
            <Card key={professional.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={professional.image || "/placeholder.svg"} alt={professional.name} />
                    <AvatarFallback>
                      {professional.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold">{professional.name}</h3>
                      {professional.verified && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          ✓ Verified
                        </Badge>
                      )}
                    </div>

                    <p className="text-gray-600 mb-2">{professional.title}</p>

                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{professional.rating}</span>
                        <span>({professional.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{professional.experience}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {professional.specialties.map((specialty) => (
                        <Badge key={specialty} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    <p className="text-sm text-gray-600 mb-3">{professional.bio}</p>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <p className="font-medium text-green-600">{professional.availability}</p>
                        <p>{professional.price}</p>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Chat
                        </Button>
                        <Button size="sm" variant="outline">
                          <Video className="h-4 w-4 mr-1" />
                          Video
                        </Button>
                        <Button size="sm">Book Session</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProfessionals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No professionals found matching your criteria.</p>
            <Button
              variant="outline"
              className="mt-4 bg-transparent"
              onClick={() => {
                setSearchTerm("")
                setSelectedSpecialty("All Specialties")
                setSelectedLanguage("All Languages")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
