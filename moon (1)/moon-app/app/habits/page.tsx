"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import HabitItem from "@/components/habit-item"
import AddHabitDialog from "@/components/add-habit-dialog"

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

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: "1",
      name: "Morning meditation",
      startDate: new Date("2023-01-01"),
      endDate: null,
      daysOfWeek: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      reward: "5 stars per week",
      streakDays: 12,
      completedDates: [
        new Date().toISOString().split("T")[0],
        new Date(Date.now() - 86400000).toISOString().split("T")[0],
        new Date(Date.now() - 86400000 * 2).toISOString().split("T")[0],
      ],
    },
    {
      id: "2",
      name: "Read 20 pages",
      startDate: new Date("2023-01-15"),
      endDate: null,
      daysOfWeek: ["Mon", "Wed", "Fri", "Sun"],
      reward: "1 movie night per week",
      streakDays: 5,
      completedDates: [
        new Date().toISOString().split("T")[0],
        new Date(Date.now() - 86400000).toISOString().split("T")[0],
      ],
    },
    {
      id: "3",
      name: "Drink 8 glasses of water",
      startDate: new Date("2023-02-01"),
      endDate: null,
      daysOfWeek: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      reward: "Healthy skin",
      streakDays: 30,
      completedDates: [new Date(Date.now() - 86400000).toISOString().split("T")[0]],
    },
  ])

  const [isAddHabitOpen, setIsAddHabitOpen] = useState(false)

  const toggleHabitCompletion = (id: string) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          const today = new Date().toISOString().split("T")[0]
          const isCompleted = habit.completedDates.includes(today)

          return {
            ...habit,
            completedDates: isCompleted
              ? habit.completedDates.filter((date) => date !== today)
              : [...habit.completedDates, today],
            streakDays: isCompleted ? habit.streakDays - 1 : habit.streakDays + 1,
          }
        }
        return habit
      }),
    )
  }

  const addHabit = (habit: Omit<Habit, "id" | "streakDays" | "completedDates">) => {
    setHabits([
      ...habits,
      {
        ...habit,
        id: Date.now().toString(),
        streakDays: 0,
        completedDates: [],
      },
    ])
    setIsAddHabitOpen(false)
  }

  return (
    <div className="p-4 pt-6">
      <h1 className="text-2xl font-bold mb-6">Habits</h1>

      {/* Habits list */}
      <div className="space-y-4 mb-20">
        {habits.map((habit) => (
          <HabitItem key={habit.id} habit={habit} onToggle={() => toggleHabitCompletion(habit.id)} />
        ))}
      </div>

      {/* Add habit button */}
      <Button
        className="fixed bottom-20 right-4 rounded-full w-14 h-14 shadow-lg"
        onClick={() => setIsAddHabitOpen(true)}
      >
        <Plus size={24} />
      </Button>

      <AddHabitDialog open={isAddHabitOpen} onClose={() => setIsAddHabitOpen(false)} onAdd={addHabit} />
    </div>
  )
}

