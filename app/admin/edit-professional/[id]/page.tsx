"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Clock,
  DollarSign,
  Upload,
  Plus,
  X,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Save,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast";

// Using a simplified interface for the form, you can expand it as needed
interface FormData {
  firstName: string
  lastName: string
  email: string
  title: string
  specialties: string[]
  bio: string
  hourlyRate: string
  verified: boolean
  acceptingNewClients: boolean
}

const specialtyOptions = [
  "Anxiety Disorders",
  "Depression",
  "Trauma & PTSD",
  "Relationship Counseling",
  "Family Therapy",
  "Addiction & Substance Abuse",
  "Eating Disorders",
  "Bipolar Disorder",
  "OCD",
  "ADHD",
  "Grief & Loss",
  "Stress Management",
  "Cognitive Behavioral Therapy (CBT)",
  "Dialectical Behavior Therapy (DBT)",
  "EMDR",
  "Mindfulness-Based Therapy",
  "Child & Adolescent Therapy",
  "Geriatric Psychology",
  "LGBTQ+ Counseling",
  "Career Counseling",
]

export default function EditProfessionalPage() {
  const { user } = useAuth()
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { toast } = useToast();

  const [formData, setFormData] = useState<Partial<FormData>>({})
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [error, setError] = useState<string | null>(null)
  const [newSpecialty, setNewSpecialty] = useState("")

  useEffect(() => {
    if (id) {
      const fetchProfessional = async () => {
        try {
          const docRef = doc(db, "professionals", id)
          const docSnap = await getDoc(docRef)

          if (docSnap.exists()) {
            setFormData(docSnap.data() as FormData)
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

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addSpecialty = (specialty: string) => {
    if (specialty && !formData.specialties?.includes(specialty)) {
      setFormData((prev) => ({
        ...prev,
        specialties: [...(prev.specialties || []), specialty],
      }))
    }
  }

  const removeSpecialty = (specialty: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties?.filter((s) => s !== specialty),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    if (!user || !id) {
      setError("Authentication or ID is missing.")
      setIsSubmitting(false)
      return
    }

    const idToken = await user.getIdToken();

    try {
      const response = await fetch("/api/admin/check-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.message || "You do not have permission to perform this action.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
      toast({
        title: "Error",
        description: "Failed to verify admin status.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const professionalRef = doc(db, "professionals", id)
      await updateDoc(professionalRef, formData)
      setSubmitStatus("success")
    } catch (error: any) {
      console.error("Error updating professional:", error)
      setError(error.message || "Failed to update professional.")
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="ml-2">Loading professional data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <p>{error}</p>
        <Link href="/admin/dashboard" className="ml-4">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>
    )
  }

  if (submitStatus === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-6">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Update Successful!</h2>
            <p className="text-gray-600 mb-6">The professional's details have been updated.</p>
            <div className="flex space-x-3">
              <Link href="/admin/dashboard" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  Back to Dashboard
                </Button>
              </Link>
              <Link href={`/professionals/${id}`} className="flex-1">
                <Button className="w-full">View Profile</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Professional</h1>
                <p className="text-gray-600">
                  Editing details for {formData.firstName} {formData.lastName}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName || ''}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName || ''}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title || ''}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Professional Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio || ''}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  rows={5}
                />
              </div>
              <div className="space-y-4">
                <Label>Specialties</Label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {(formData.specialties || []).map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="flex items-center space-x-1">
                      <span>{specialty}</span>
                      <button
                        type="button"
                        onClick={() => removeSpecialty(specialty)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <Select onValueChange={(value) => addSpecialty(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Add specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialtyOptions.map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Hourly Rate (USD)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  value={formData.hourlyRate || ''}
                  onChange={(e) => handleInputChange("hourlyRate", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="verified"
                  checked={formData.verified || false}
                  onCheckedChange={(checked) => handleInputChange("verified", checked)}
                />
                <Label htmlFor="verified">Verified Professional</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceptingNewClients"
                  checked={formData.acceptingNewClients || false}
                  onCheckedChange={(checked) => handleInputChange("acceptingNewClients", checked)}
                />
                <Label htmlFor="acceptingNewClients">Accepting New Clients</Label>
              </div>
            </CardContent>
          </Card>

          {submitStatus === "error" && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
