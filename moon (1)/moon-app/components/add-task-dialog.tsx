"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

type Task = {
  id: string
  name: string
  date: Date
  time: string
  description: string
  reward: string
  completed: boolean
}

type AddTaskDialogProps = {
  open: boolean
  onClose: () => void
  onAdd: (task: Omit<Task, "id">) => void
}

export default function AddTaskDialog({ open, onClose, onAdd }: AddTaskDialogProps) {
  const [taskName, setTaskName] = useState("")
  const [taskDate, setTaskDate] = useState(new Date().toISOString().split("T")[0])
  const [taskTime, setTaskTime] = useState("")
  const [taskDescription, setTaskDescription] = useState("")
  const [taskReward, setTaskReward] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!taskName.trim()) return

    onAdd({
      name: taskName,
      date: new Date(taskDate),
      time: taskTime,
      description: taskDescription,
      reward: taskReward,
      completed: false,
    })

    // Reset form
    setTaskName("")
    setTaskDate(new Date().toISOString().split("T")[0])
    setTaskTime("")
    setTaskDescription("")
    setTaskReward("")
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="task-name">Task Name</Label>
            <Input
              id="task-name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter task name"
              required
              className="bg-muted"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="task-date">Date</Label>
              <Input
                id="task-date"
                type="date"
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                className="bg-muted"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="task-time">Time</Label>
              <Input
                id="task-time"
                type="time"
                value={taskTime}
                onChange={(e) => setTaskTime(e.target.value)}
                className="bg-muted"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="task-description">Description (Optional)</Label>
            <Textarea
              id="task-description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Add details about your task"
              className="bg-muted"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="task-reward">Reward (Optional)</Label>
            <Input
              id="task-reward"
              value={taskReward}
              onChange={(e) => setTaskReward(e.target.value)}
              placeholder="What's your reward for completing this?"
              className="bg-muted"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

