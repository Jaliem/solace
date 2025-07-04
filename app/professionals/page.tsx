"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Clock, Video, MessageCircle, Search, Filter } from "lucide-react"
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function ProfessionalsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties")
  const [selectedLanguage, setSelectedLanguage] = useState("All Languages")
  const [professionals, setProfessionals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "professionals"));
        const professionalsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProfessionals(professionalsList);
      } catch (err) {
        console.error("Error fetching professionals:", err);
        setError("Failed to load professionals. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionals();
  }, []);

  const filteredProfessionals = professionals.filter((prof) => {
    const matchesSearch =
      (prof.name && prof.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (prof.specialties && prof.specialties.some((s: string) => s && s.toLowerCase().includes(searchTerm.toLowerCase())))
    const matchesSpecialty = selectedSpecialty === "All Specialties" || (prof.specialties && prof.specialties.includes(selectedSpecialty))
    const matchesLanguage = selectedLanguage === "All Languages" || (prof.languages && prof.languages.includes(selectedLanguage))

    return matchesSearch && matchesSpecialty && matchesLanguage
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>Loading professionals...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

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
                        ? professional.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        : ""}
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
                        <p className="font-medium text-green-600">
                          {professional.availability
                            ? Object.entries(professional.availability)
                                .filter(([, available]) => available)
                                .map(([day]) => day.charAt(0).toUpperCase() + day.slice(1))
                                .join(", ")
                            : "N/A"}
                        </p>
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
