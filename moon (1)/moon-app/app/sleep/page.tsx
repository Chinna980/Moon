"use client"

import { useState } from "react"
import { format, differenceInMinutes } from "date-fns"
import { Moon, Sun, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

type SleepEntry = {
  id: string
  date: Date
  sleepTime: string
  wakeTime: string
  duration: number // in minutes
  quality: number // 1-5
  notes: string
}

export default function SleepPage() {
  const [sleepEntries, setSleepEntries] = useState<SleepEntry[]>([
    {
      id: "1",
      date: new Date(Date.now() - 86400000), // yesterday
      sleepTime: "23:00",
      wakeTime: "07:00",
      duration: 480, // 8 hours
      quality: 4,
      notes: "Slept well, but woke up once during the night.",
    },
    {
      id: "2",
      date: new Date(Date.now() - 86400000 * 2), // 2 days ago
      sleepTime: "23:30",
      wakeTime: "07:30",
      duration: 480, // 8 hours
      quality: 3,
      notes: "Had trouble falling asleep.",
    },
    {
      id: "3",
      date: new Date(Date.now() - 86400000 * 3), // 3 days ago
      sleepTime: "22:45",
      wakeTime: "06:45",
      duration: 480, // 8 hours
      quality: 5,
      notes: "Great sleep, felt refreshed.",
    },
  ])

  const [isAddSleepOpen, setIsAddSleepOpen] = useState(false)
  const [entryDate, setEntryDate] = useState(new Date().toISOString().split("T")[0])
  const [sleepTime, setSleepTime] = useState("")
  const [wakeTime, setWakeTime] = useState("")
  const [sleepQuality, setSleepQuality] = useState<number>(3)
  const [sleepNotes, setSleepNotes] = useState("")

  // Calculate average sleep duration for the past week
  const calculateAverageSleep = () => {
    if (sleepEntries.length === 0) return 0

    const totalDuration = sleepEntries.reduce((sum, entry) => sum + entry.duration, 0)
    return Math.round(totalDuration / sleepEntries.length)
  }

  // Format minutes as hours and minutes
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  // Calculate sleep duration from sleep and wake times
  const calculateDuration = (sleepTime: string, wakeTime: string) => {
    if (!sleepTime || !wakeTime) return 0

    const [sleepHour, sleepMinute] = sleepTime.split(":").map(Number)
    const [wakeHour, wakeMinute] = wakeTime.split(":").map(Number)

    const sleepDate = new Date()
    sleepDate.setHours(sleepHour, sleepMinute, 0)

    const wakeDate = new Date()
    wakeDate.setHours(wakeHour, wakeMinute, 0)

    // If wake time is earlier than sleep time, assume it's the next day
    if (wakeDate < sleepDate) {
      wakeDate.setDate(wakeDate.getDate() + 1)
    }

    return differenceInMinutes(wakeDate, sleepDate)
  }

  const handleAddSleep = () => {
    if (!entryDate || !sleepTime || !wakeTime) return

    const duration = calculateDuration(sleepTime, wakeTime)

    setSleepEntries([
      ...sleepEntries,
      {
        id: Date.now().toString(),
        date: new Date(entryDate),
        sleepTime,
        wakeTime,
        duration,
        quality: sleepQuality,
        notes: sleepNotes,
      },
    ])

    // Reset form
    setEntryDate(new Date().toISOString().split("T")[0])
    setSleepTime("")
    setWakeTime("")
    setSleepQuality(3)
    setSleepNotes("")
    setIsAddSleepOpen(false)
  }

  return (
    <div className="p-4 pt-6">
      <h1 className="text-2xl font-bold mb-6">Sleep Tracker</h1>

      {/* Sleep stats */}
      <div className="bg-card rounded-lg p-4 mb-6">
        <h2 className="text-lg font-medium mb-4">Sleep Stats</h2>

        <div className="flex justify-between items-center mb-2">
          <span className="text-muted-foreground">Average sleep:</span>
          <span className="font-medium">{formatDuration(calculateAverageSleep())}</span>
        </div>

        <div className="flex justify-between items-center mb-2">
          <span className="text-muted-foreground">Last night:</span>
          <span className="font-medium">
            {sleepEntries.length > 0 ? formatDuration(sleepEntries[0].duration) : "No data"}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Sleep quality:</span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                className={`w-4 h-4 rounded-full mx-0.5 ${
                  sleepEntries.length > 0 && star <= sleepEntries[0].quality ? "bg-yellow-400" : "bg-muted"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Sleep log */}
      <h2 className="text-lg font-medium mb-4">Sleep Log</h2>

      <div className="space-y-4 mb-20">
        {sleepEntries.map((entry) => (
          <div key={entry.id} className="task-item rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="font-medium">{format(entry.date, "EEEE, MMM d")}</span>
              <span className="text-sm text-muted-foreground">{formatDuration(entry.duration)}</span>
            </div>

            <div className="flex items-center mb-2">
              <div className="flex items-center mr-4">
                <Moon className="w-4 h-4 mr-1 text-indigo-400" />
                <span>{entry.sleepTime}</span>
              </div>

              <div className="flex items-center">
                <Sun className="w-4 h-4 mr-1 text-yellow-400" />
                <span>{entry.wakeTime}</span>
              </div>
            </div>

            {entry.notes && <p className="text-sm text-muted-foreground">{entry.notes}</p>}

            <div className="flex mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <div
                  key={star}
                  className={`w-3 h-3 rounded-full mr-1 ${star <= entry.quality ? "bg-yellow-400" : "bg-muted"}`}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add sleep button */}
      <Button
        className="fixed bottom-20 right-4 rounded-full w-14 h-14 shadow-lg"
        onClick={() => setIsAddSleepOpen(true)}
      >
        <Plus className="w-6 h-6" />
      </Button>

      {/* Add sleep dialog */}
      <Dialog open={isAddSleepOpen} onOpenChange={setIsAddSleepOpen}>
        <DialogContent className="bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle>Log Sleep</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="entry-date">Date</Label>
              <Input
                id="entry-date"
                type="date"
                value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
                className="bg-muted"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sleep-time">Sleep Time</Label>
                <div className="flex items-center">
                  <Moon className="w-4 h-4 mr-2 text-indigo-400" />
                  <Input
                    id="sleep-time"
                    type="time"
                    value={sleepTime}
                    onChange={(e) => setSleepTime(e.target.value)}
                    className="bg-muted"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="wake-time">Wake Time</Label>
                <div className="flex items-center">
                  <Sun className="w-4 h-4 mr-2 text-yellow-400" />
                  <Input
                    id="wake-time"
                    type="time"
                    value={wakeTime}
                    onChange={(e) => setWakeTime(e.target.value)}
                    className="bg-muted"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Sleep Quality</Label>
              <div className="flex justify-between">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Button
                    key={rating}
                    type="button"
                    variant="outline"
                    className={`w-10 h-10 p-0 ${rating <= sleepQuality ? "bg-yellow-400/20 border-yellow-400" : ""}`}
                    onClick={() => setSleepQuality(rating)}
                  >
                    {rating}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sleep-notes">Notes (Optional)</Label>
              <Textarea
                id="sleep-notes"
                value={sleepNotes}
                onChange={(e) => setSleepNotes(e.target.value)}
                placeholder="How did you sleep?"
                className="bg-muted"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsAddSleepOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleAddSleep}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

