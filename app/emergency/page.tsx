import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, MessageCircle, MapPin, Clock, AlertTriangle, Heart } from "lucide-react"

export default function EmergencyPage() {
  return (
    <div className="min-h-screen bg-red-50">
      {/* Emergency Header */}
      <div className="bg-red-600 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <AlertTriangle className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Emergency Mental Health Support</h1>
          <p className="text-xl text-red-100">If you're in crisis, help is available 24/7</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Crisis Hotlines */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Crisis Hotlines</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-red-200 bg-white">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Phone className="h-8 w-8 text-red-600" />
                  <div>
                    <CardTitle className="text-red-600">National Suicide Prevention Lifeline</CardTitle>
                    <CardDescription>24/7 crisis support</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600 mb-2">988</div>
                    <p className="text-gray-600">Call or text anytime</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-red-600 hover:bg-red-700">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                    <Button variant="outline" className="flex-1 border-red-600 text-red-600 bg-transparent">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Text
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-white">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="h-8 w-8 text-blue-600" />
                  <div>
                    <CardTitle className="text-blue-600">Crisis Text Line</CardTitle>
                    <CardDescription>Text-based crisis support</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">Text HOME to 741741</div>
                    <p className="text-gray-600">Free, confidential support</p>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Start Text Conversation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Immediate Actions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">If You're in Immediate Danger</h2>
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Phone className="h-12 w-12 text-red-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-red-600 mb-2">Call 911</h3>
                  <p className="text-sm text-gray-700">For immediate emergency response</p>
                </div>
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-blue-600 mb-2">Go to ER</h3>
                  <p className="text-sm text-gray-700">Visit your nearest emergency room</p>
                </div>
                <div className="text-center">
                  <Heart className="h-12 w-12 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-green-600 mb-2">Call a Friend</h3>
                  <p className="text-sm text-gray-700">Reach out to someone you trust</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Additional Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Support Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">SAMHSA National Helpline</CardTitle>
                <CardDescription>Treatment referral service</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold">1-800-662-4357</p>
                  <Badge variant="outline">
                    <Clock className="h-3 w-3 mr-1" />
                    24/7
                  </Badge>
                  <p className="text-sm text-gray-600">Free, confidential treatment referrals</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Veterans Crisis Line</CardTitle>
                <CardDescription>Support for veterans</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold">1-800-273-8255</p>
                  <Badge variant="outline">
                    <Clock className="h-3 w-3 mr-1" />
                    24/7
                  </Badge>
                  <p className="text-sm text-gray-600">Press 1 for veterans support</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">LGBT National Hotline</CardTitle>
                <CardDescription>LGBTQ+ support</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold">1-888-843-4564</p>
                  <Badge variant="outline">
                    <Clock className="h-3 w-3 mr-1" />
                    Daily 4PM-12AM ET
                  </Badge>
                  <p className="text-sm text-gray-600">Peer support and resources</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Safety Planning */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Create a Safety Plan</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="font-semibold">A safety plan can help you stay safe during a crisis. Include:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="font-semibold text-blue-600">1.</span>
                    <span>Warning signs that a crisis may be developing</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="font-semibold text-blue-600">2.</span>
                    <span>Coping strategies you can use on your own</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="font-semibold text-blue-600">3.</span>
                    <span>People and social settings that provide distraction</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="font-semibold text-blue-600">4.</span>
                    <span>People you can ask for help</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="font-semibold text-blue-600">5.</span>
                    <span>Professional contacts and agencies</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="font-semibold text-blue-600">6.</span>
                    <span>Making your environment safe</span>
                  </li>
                </ul>
                <Button className="mt-4">Download Safety Plan Template</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Warning Signs */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Warning Signs to Watch For</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-yellow-800">Emotional Signs</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm text-yellow-800">
                  <li>• Overwhelming sadness or hopelessness</li>
                  <li>• Intense anxiety or panic</li>
                  <li>• Feeling trapped or in unbearable pain</li>
                  <li>• Mood swings or irritability</li>
                  <li>• Feeling like a burden to others</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-800">Behavioral Signs</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm text-orange-800">
                  <li>• Withdrawing from friends and family</li>
                  <li>• Giving away possessions</li>
                  <li>• Increased use of alcohol or drugs</li>
                  <li>• Reckless behavior</li>
                  <li>• Talking about death or suicide</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
