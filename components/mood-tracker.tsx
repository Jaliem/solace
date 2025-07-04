"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

const moods = [
  { emoji: "😢", label: "Very Sad", value: 1, color: "bg-red-100 text-red-800" },
  { emoji: "😔", label: "Sad", value: 2, color: "bg-orange-100 text-orange-800" },
  { emoji: "😐", label: "Neutral", value: 3, color: "bg-gray-100 text-gray-800" },
  { emoji: "🙂", label: "Good", value: 4, color: "bg-blue-100 text-blue-800" },
  { emoji: "😊", label: "Great", value: 5, color: "bg-green-100 text-green-800" },
]

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [note, setNote] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (selectedMood) {
      // Here you would typically save to database
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  if (submitted) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="text-center py-8">
          <div className="text-4xl mb-4">✅</div>
          <h3 className="text-lg font-semibold text-green-600 mb-2">Mood Logged!</h3>
          <p className="text-gray-600">Thank you for tracking your mood today.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Daily Mood Check-in</CardTitle>
        <CardDescription>How are you feeling right now?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-5 gap-2">
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                selectedMood === mood.value ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="text-2xl mb-1">{mood.emoji}</div>
              <div className="text-xs text-gray-600">{mood.label}</div>
            </button>
          ))}
        </div>

        {selectedMood && (
          <div className="space-y-4">
            <Badge className={moods.find((m) => m.value === selectedMood)?.color}>
              Feeling {moods.find((m) => m.value === selectedMood)?.label}
            </Badge>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Add a note (optional)</label>
              <Textarea
                placeholder="What's on your mind today?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="resize-none"
                rows={3}
              />
            </div>
          </div>
        )}

        <Button onClick={handleSubmit} disabled={!selectedMood} className="w-full">
          Log Mood
        </Button>
      </CardContent>
    </Card>
  )
}
