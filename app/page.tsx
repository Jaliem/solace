import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Calendar, BookOpen, Shield, Users, Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import { MoodTracker } from "@/components/mood-tracker"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">🌟 Trusted by 10,000+ users</Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Mental Health,
            <span className="text-blue-600"> Our Priority</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Connect with licensed psychologists and counselors, track your emotional well-being, and access personalized
            self-care tools—all in one secure platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/professionals">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
                Find a Professional
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="text-center">
              <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <CardTitle>Book Session</CardTitle>
              <CardDescription>Schedule with licensed professionals</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="text-center">
              <MessageCircle className="h-12 w-12 text-green-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <CardTitle>Chat Support</CardTitle>
              <CardDescription>Instant messaging with counselors</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="text-center">
              <Heart className="h-12 w-12 text-pink-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <CardTitle>Self-Assessment</CardTitle>
              <CardDescription>Track your mental health progress</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="text-center">
              <BookOpen className="h-12 w-12 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <CardTitle>Resources</CardTitle>
              <CardDescription>Articles, guides, and tools</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Mood Tracker Preview */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">How are you feeling today?</h2>
          <MoodTracker />
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose MindCare?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
              <p className="text-gray-600">
                End-to-end encryption ensures your conversations and data remain completely confidential.
              </p>
            </div>
            <div className="text-center">
              <Users className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Licensed Professionals</h3>
              <p className="text-gray-600">
                Connect with verified, licensed psychologists and counselors specialized in various areas.
              </p>
            </div>
            <div className="text-center">
              <Star className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Personalized Care</h3>
              <p className="text-gray-600">
                AI-powered matching and personalized treatment plans tailored to your unique needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to prioritize your mental health?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands who have found support and healing through our platform.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6" />
                <span className="text-xl font-bold">MindCare</span>
              </div>
              <p className="text-gray-400">Supporting mental health and well-being for everyone.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/professionals" className="hover:text-white">
                    Find Professionals
                  </Link>
                </li>
                <li>
                  <Link href="/chat" className="hover:text-white">
                    Chat Support
                  </Link>
                </li>
                <li>
                  <Link href="/assessment" className="hover:text-white">
                    Self-Assessment
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="hover:text-white">
                    Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/emergency" className="hover:text-white text-red-400">
                    Emergency Help
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Emergency</h4>
              <p className="text-red-400 font-medium">Crisis Hotline: 988</p>
              <p className="text-gray-400 text-sm mt-2">Available 24/7 for immediate support</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MindCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
