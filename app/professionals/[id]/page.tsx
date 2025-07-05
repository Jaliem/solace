"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Clock, Video, MessageCircle, MapPin, Calendar, CheckCircle } from "lucide-react"
import { Professional } from "@/types/professional"

export default function ProfessionalProfilePage() {
  const { id } = useParams<{ id: string }>()
  const [professional, setProfessional] = useState<Professional | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      const fetchProfessional = async () => {
        try {
          const docRef = doc(db, "professionals", id)
          const docSnap = await getDoc(docRef)

          if (docSnap.exists()) {
            setProfessional({ id: docSnap.id, ...docSnap.data() } as Professional)
          } else {
            setError("Professional not found.")
          }
        } catch (err) {
          console.error("Error fetching professional:", err)
          setError("Failed to load professional details.")
        } finally {
          setLoading(false)
        }
      }

      fetchProfessional()
    }
  }, [id])

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>
  }

  if (!professional) {
    return null
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={professional.image || "/placeholder.svg"} alt={`${professional.firstName} ${professional.lastName}`} />
                  <AvatarFallback>{professional.firstName && professional.lastName ? `${professional.firstName[0]}${professional.lastName[0]}` : ""}</AvatarFallback>
                </Avatar>
                <h1 className="text-2xl font-bold">{`${professional.firstName} ${professional.lastName}`}</h1>
                <p className="text-gray-600">{professional.title}</p>
                {professional.verified && (
                  <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Verified Professional
                  </Badge>
                )}
                <div className="flex items-center space-x-2 mt-2 text-sm text-gray-600">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{professional.rating} ({professional.reviews} reviews)</span>
                </div>
                <Button className="mt-4 w-full">Book a Session</Button>
                <Button variant="outline" className="mt-2 w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send a Message
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{professional.experience} of experience</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{professional.location || "Online"}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Next availability: Tomorrow</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap">{professional.bio}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Specialties</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {professional.specialties.map((specialty) => (
                  <Badge key={specialty} variant="outline">{specialty}</Badge>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Languages</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {professional.languages.map((language) => (
                  <Badge key={language} variant="outline">{language}</Badge>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Session Options</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Video className="h-5 w-5 mr-2 text-blue-500" />
                  <span>Video Call</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-green-500" />
                  <span>Chat</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
