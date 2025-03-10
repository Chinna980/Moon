"use client"

import { format } from "date-fns"
import { Check, Clock, Gift } from "lucide-react"

type Task = {
  id: string
  name: string
  date: Date
  time: string
  description: string
  reward: string
  completed: boolean
}

type TaskItemProps = {
  task: Task
  onToggle: () => void
}

export default function TaskItem({ task, onToggle }: TaskItemProps) {
  return (
    <div className="task-item rounded-lg p-4">
      <div className="flex items-start">
        <button
          onClick={onToggle}
          className={`flex-shrink-0 w-6 h-6 rounded-md border ${
            task.completed ? "bg-primary border-primary" : "border-muted-foreground"
          } flex items-center justify-center mr-3 mt-1`}
        >
          {task.completed && <Check className="w-4 h-4 text-primary-foreground" />}
        </button>

        <div className="flex-1">
          <h3 className={`font-medium text-lg ${task.completed ? "line-through text-muted-foreground" : ""}`}>
            {task.name}
          </h3>

          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <span className="mr-3">{format(task.date, "MMM d")}</span>
            <Clock className="w-3.5 h-3.5 mr-1" />
            <span>{task.time}</span>
          </div>

          {task.description && <p className="text-sm mt-2 text-muted-foreground">{task.description}</p>}

          {task.reward && (
            <div className="flex items-center mt-2 text-sm text-secondary">
              <Gift className="w-3.5 h-3.5 mr-1" />
              <span>{task.reward}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

