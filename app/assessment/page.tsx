"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Heart, Brain, Zap, TrendingUp, ArrowLeft, ArrowRight } from "lucide-react"

const assessments = [
  {
    id: "phq9",
    title: "Depression Assessment (PHQ-9)",
    description: "Evaluate symptoms of depression over the past two weeks",
    duration: "5-7 minutes",
    icon: Heart,
    color: "bg-red-100 text-red-600",
  },
  {
    id: "gad7",
    title: "Anxiety Assessment (GAD-7)",
    description: "Measure anxiety levels and related symptoms",
    duration: "3-5 minutes",
    icon: Brain,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "stress",
    title: "Stress Level Assessment",
    description: "Identify your current stress levels and triggers",
    duration: "4-6 minutes",
    icon: Zap,
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: "wellbeing",
    title: "Overall Well-being Check",
    description: "Comprehensive assessment of your mental health",
    duration: "8-10 minutes",
    icon: TrendingUp,
    color: "bg-green-100 text-green-600",
  },
]

const phq9Questions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself or that you are a failure",
  "Trouble concentrating on things",
  "Moving or speaking slowly, or being fidgety/restless",
  "Thoughts that you would be better off dead or hurting yourself",
]

const responseOptions = [
  { value: "0", label: "Not at all" },
  { value: "1", label: "Several days" },
  { value: "2", label: "More than half the days" },
  { value: "3", label: "Nearly every day" },
]

export default function AssessmentPage() {
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)

  const handleAssessmentSelect = (assessmentId: string) => {
    setSelectedAssessment(assessmentId)
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
  }

  const handleAnswerChange = (questionIndex: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: value }))
  }

  const handleNext = () => {
    if (currentQuestion < phq9Questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const calculateScore = () => {
    return Object.values(answers).reduce((sum, value) => sum + Number.parseInt(value || "0"), 0)
  }

  const getScoreInterpretation = (score: number) => {
    if (score <= 4) return { level: "Minimal", color: "text-green-600", description: "Minimal depression symptoms" }
    if (score <= 9) return { level: "Mild", color: "text-yellow-600", description: "Mild depression symptoms" }
    if (score <= 14) return { level: "Moderate", color: "text-orange-600", description: "Moderate depression symptoms" }
    if (score <= 19)
      return { level: "Moderately Severe", color: "text-red-600", description: "Moderately severe depression symptoms" }
    return { level: "Severe", color: "text-red-800", description: "Severe depression symptoms" }
  }

  if (showResults) {
    const score = calculateScore()
    const interpretation = getScoreInterpretation(score)

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Assessment Results</CardTitle>
              <CardDescription>PHQ-9 Depression Assessment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{score}/27</div>
                <Badge className={`${interpretation.color} bg-opacity-10 text-lg px-4 py-2`}>
                  {interpretation.level}
                </Badge>
                <p className="text-gray-600 mt-2">{interpretation.description}</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Recommendations:</h3>
                <div className="space-y-2">
                  {score > 9 && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm">
                        Consider speaking with a mental health professional for further evaluation and support.
                      </p>
                    </div>
                  )}
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm">Continue regular mood tracking and self-care practices.</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm">Explore our resources section for coping strategies and wellness tips.</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button onClick={() => setSelectedAssessment(null)} variant="outline" className="flex-1">
                  Take Another Assessment
                </Button>
                <Button className="flex-1">Book Session with Professional</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (selectedAssessment) {
    const progress = ((currentQuestion + 1) / phq9Questions.length) * 100

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="mb-6">
            <Button variant="ghost" onClick={() => setSelectedAssessment(null)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Assessments
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <CardTitle>Depression Assessment (PHQ-9)</CardTitle>
                <Badge variant="outline">
                  {currentQuestion + 1} of {phq9Questions.length}
                </Badge>
              </div>
              <Progress value={progress} className="h-2" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">
                  Over the last 2 weeks, how often have you been bothered by:
                </h3>
                <p className="text-xl font-medium text-gray-900 mb-6">{phq9Questions[currentQuestion]}</p>
              </div>

              <RadioGroup
                value={answers[currentQuestion] || ""}
                onValueChange={(value) => handleAnswerChange(currentQuestion, value)}
              >
                {responseOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button onClick={handleNext} disabled={!answers[currentQuestion]}>
                  {currentQuestion === phq9Questions.length - 1 ? "View Results" : "Next"}
                  {currentQuestion < phq9Questions.length - 1 && <ArrowRight className="h-4 w-4 ml-2" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Mental Health Assessments</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take scientifically-validated assessments to better understand your mental health and get personalized
            recommendations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {assessments.map((assessment) => {
            const IconComponent = assessment.icon
            return (
              <Card
                key={assessment.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleAssessmentSelect(assessment.id)}
              >
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${assessment.color}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{assessment.title}</CardTitle>
                      <CardDescription className="mt-1">{assessment.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{assessment.duration}</Badge>
                    <Button>Start Assessment</Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 max-w-2xl mx-auto">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-blue-900 mb-2">Important Note</h3>
              <p className="text-blue-800 text-sm">
                These assessments are screening tools and not diagnostic instruments. Results should be discussed with a
                qualified mental health professional for proper evaluation and treatment planning.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
