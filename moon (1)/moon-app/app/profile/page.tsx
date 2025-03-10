"use client"

import { useState } from "react"
import Image from "next/image"
import { format } from "date-fns"
import { User, Clock, Moon, Calendar, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

type UserProfile = {
  name: string
  age: number
  joinDate: Date
  avatar: string
  sleepAverage: number // in minutes
  focusTime: number // in minutes
  tasksCompleted: number
  habitsTracked: number
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "Moon User",
    age: 28,
    joinDate: new Date(Date.now() - 86400000 * 30), // 30 days ago
    avatar: "/placeholder.svg?height=200&width=200",
    sleepAverage: 450, // 7.5 hours
    focusTime: 1200, // 20 hours
    tasksCompleted: 42,
    habitsTracked: 5,
  })

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  const [editName, setEditName] = useState(profile.name)
  const [editAge, setEditAge] = useState(profile.age.toString())

  // Format minutes as hours and minutes
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const handleSaveProfile = () => {
    setProfile({
      ...profile,
      name: editName,
      age: Number.parseInt(editAge) || profile.age,
    })
    setIsEditProfileOpen(false)
  }

  return (
    <div className="p-4 pt-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      {/* User info */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-4">
          <Image
            src={profile.avatar || "/placeholder.svg"}
            alt="Profile"
            width={100}
            height={100}
            className="rounded-full"
          />
          <Button
            size="icon"
            variant="secondary"
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full"
            onClick={() => setIsEditProfileOpen(true)}
          >
            <Edit className="w-4 h-4" />
          </Button>
        </div>

        <h2 className="text-xl font-bold">{profile.name}</h2>
        <p className="text-muted-foreground">Age: {profile.age}</p>
        <p className="text-sm text-muted-foreground">Joined {format(profile.joinDate, "MMMM yyyy")}</p>
      </div>

      {/* Stats */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium mb-2">Your Stats</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Moon className="w-4 h-4 mr-2 text-indigo-400" />
              <h3 className="font-medium">Sleep</h3>
            </div>
            <p className="text-2xl font-bold">{formatDuration(profile.sleepAverage)}</p>
            <p className="text-sm text-muted-foreground">Average per night</p>
          </div>

          <div className="bg-card rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Clock className="w-4 h-4 mr-2 text-primary" />
              <h3 className="font-medium">Focus Time</h3>
            </div>
            <p className="text-2xl font-bold">{formatDuration(profile.focusTime)}</p>
            <p className="text-sm text-muted-foreground">Total this month</p>
          </div>

          <div className="bg-card rounded-lg p-4">
            <div className="flex items-center mb-2">
              <User className="w-4 h-4 mr-2 text-success" />
              <h3 className="font-medium">Tasks</h3>
            </div>
            <p className="text-2xl font-bold">{profile.tasksCompleted}</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>

          <div className="bg-card rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Calendar className="w-4 h-4 mr-2 text-yellow-400" />
              <h3 className="font-medium">Habits</h3>
            </div>
            <p className="text-2xl font-bold">{profile.habitsTracked}</p>
            <p className="text-sm text-muted-foreground">Being tracked</p>
          </div>
        </div>
      </div>

      {/* Edit profile dialog */}
      <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
        <DialogContent className="bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="bg-muted"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-age">Age</Label>
              <Input
                id="edit-age"
                type="number"
                value={editAge}
                onChange={(e) => setEditAge(e.target.value)}
                className="bg-muted"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsEditProfileOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSaveProfile}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

