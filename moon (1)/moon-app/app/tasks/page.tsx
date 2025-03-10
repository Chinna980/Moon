"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import TaskItem from "@/components/task-item"
import AddTaskDialog from "@/components/add-task-dialog"

type Task = {
  id: string
  name: string
  date: Date
  time: string
  description: string
  reward: string
  completed: boolean
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      name: "Complete Moon App design",
      date: new Date(),
      time: "14:00",
      description: "Finish the UI design for all screens",
      reward: "30 mins break",
      completed: false,
    },
    {
      id: "2",
      name: "Meditation session",
      date: new Date(),
      time: "08:00",
      description: "Morning meditation for focus",
      reward: "Coffee break",
      completed: true,
    },
    {
      id: "3",
      name: "Read book chapter",
      date: new Date(Date.now() + 86400000), // tomorrow
      time: "20:00",
      description: 'Chapter 5 of "Atomic Habits"',
      reward: "Episode of favorite show",
      completed: false,
    },
  ])

  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const addTask = (task: Omit<Task, "id">) => {
    setTasks([...tasks, { ...task, id: Date.now().toString() }])
    setIsAddTaskOpen(false)
  }

  // Generate dates for the next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return date
  })

  return (
    <div className="p-4 pt-6">
      <h1 className="text-2xl font-bold mb-6">Tasks</h1>

      {/* Date selector */}
      <div className="flex overflow-x-auto pb-2 mb-6 -mx-4 px-4">
        {dates.map((date, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center mr-4 p-2 rounded-full w-12 h-12 flex-shrink-0 ${
              index === 0 ? "bg-primary text-primary-foreground" : "bg-card"
            }`}
          >
            <span className="text-xs">{format(date, "EEE")}</span>
            <span className="font-bold">{format(date, "d")}</span>
          </div>
        ))}
      </div>

      {/* Tasks list */}
      <div className="space-y-3 mb-20">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={() => toggleTaskCompletion(task.id)} />
        ))}
      </div>

      {/* Add task button */}
      <Button
        className="fixed bottom-20 right-4 rounded-full w-14 h-14 shadow-lg"
        onClick={() => setIsAddTaskOpen(true)}
      >
        <Plus className="w-6 h-6" />
      </Button>

      <AddTaskDialog open={isAddTaskOpen} onClose={() => setIsAddTaskOpen(false)} onAdd={addTask} />
    </div>
  )
}

