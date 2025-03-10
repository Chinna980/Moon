"use client"

import { Check, Calendar, Award, Star } from "lucide-react"

type Habit = {
  id: string
  name: string
  startDate: Date
  endDate: Date | null
  daysOfWeek: string[]
  reward: string
  streakDays: number
  completedDates: string[] // ISO date strings
}

type HabitItemProps = {
  habit: Habit
  onToggle: () => void
}

export default function HabitItem({ habit, onToggle }: HabitItemProps) {
  const today = new Date().toISOString().split("T")[0]
  const isCompletedToday = habit.completedDates.includes(today)

  // Generate last 7 days for the habit tracker
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    return date.toISOString().split("T")[0]
  }).reverse()

  return (
    <div className="task-item rounded-lg p-4">
      <div className="flex items-start">
        <button
          onClick={onToggle}
          className={`flex-shrink-0 w-6 h-6 rounded-md border ${
            isCompletedToday ? "bg-success border-success" : "border-muted-foreground"
          } flex items-center justify-center mr-3 mt-1`}
        >
          {isCompletedToday && <Check className="w-4 h-4 text-primary-foreground" />}
        </button>

        <div className="flex-1">
          <h3 className="font-medium text-lg">{habit.name}</h3>

          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <Calendar className="w-3.5 h-3.5 mr-1" />
            <span>{habit.daysOfWeek.join(", ")}</span>
          </div>

          {/* Streak counter */}
          <div className="flex items-center mt-2">
            <div className="flex items-center text-yellow-400 mr-3">
              <Star className="w-3.5 h-3.5 mr-1 fill-yellow-400" />
              <span className="text-sm font-medium">{habit.streakDays} day streak</span>
            </div>

            {habit.reward && (
              <div className="flex items-center text-sm text-secondary">
                <Award className="w-3.5 h-3.5 mr-1" />
                <span>{habit.reward}</span>
              </div>
            )}
          </div>

          {/* Last 7 days tracker */}
          <div className="flex items-center justify-between mt-3">
            {last7Days.map((date) => {
              const isCompleted = habit.completedDates.includes(date)
              const dayOfMonth = new Date(date).getDate()

              return (
                <div key={date} className="flex flex-col items-center">
                  <div className="text-xs text-muted-foreground mb-1">{dayOfMonth}</div>
                  <div className={`w-4 h-4 rounded-full ${isCompleted ? "bg-success" : "bg-error/30"}`}></div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

