"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

type Habit = {
  id: string
  name: string
  startDate: Date
  endDate: Date | null
  daysOfWeek: string[]
  reward: string
  streakDays: number
  completedDates: string[]
}

type AddHabitDialogProps = {
  open: boolean
  onClose: () => void
  onAdd: (habit: Omit<Habit, "id" | "streakDays" | "completedDates">) => void
}

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export default function AddHabitDialog({ open, onClose, onAdd }: AddHabitDialogProps) {
  const [habitName, setHabitName] = useState("")
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0])
  const [endDate, setEndDate] = useState("")
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [habitReward, setHabitReward] = useState("")

  const handleDayToggle = (day: string) => {
    setSelectedDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!habitName.trim() || selectedDays.length === 0) return

    onAdd({
      name: habitName,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
      daysOfWeek: selectedDays,
      reward: habitReward,
    })

    // Reset form
    setHabitName("")
    setStartDate(new Date().toISOString().split("T")[0])
    setEndDate("")
    setSelectedDays([])
    setHabitReward("")
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle>Add New Habit</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="habit-name">Habit Name</Label>
            <Input
              id="habit-name"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              placeholder="Enter habit name"
              required
              className="bg-muted"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-muted"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end-date">End Date (Optional)</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-muted"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Days of Week</Label>
            <div className="flex flex-wrap gap-2">
              {DAYS_OF_WEEK.map((day) => (
                <div key={day} className="flex items-center space-x-2">
                  <Checkbox
                    id={`day-${day}`}
                    checked={selectedDays.includes(day)}
                    onCheckedChange={() => handleDayToggle(day)}
                  />
                  <Label htmlFor={`day-${day}`} className="text-sm cursor-pointer">
                    {day}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="habit-reward">Reward (Optional)</Label>
            <Input
              id="habit-reward"
              value={habitReward}
              onChange={(e) => setHabitReward(e.target.value)}
              placeholder="What's your reward for maintaining this habit?"
              className="bg-muted"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Habit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

