"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, Save, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type JournalEntry = {
  id: string
  date: Date
  content: string
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: "1",
      date: new Date(),
      content:
        "Today I started using the Moon app to track my productivity. I'm excited to see how it helps me organize my tasks and build better habits.",
    },
    {
      id: "2",
      date: new Date(Date.now() - 86400000), // yesterday
      content:
        "Had a productive day at work. Completed the presentation for tomorrow's meeting and went for a 30-minute walk during lunch break.",
    },
  ])

  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [currentEntry, setCurrentEntry] = useState("")

  // Find entry for selected date or create a new one
  const findOrCreateEntry = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd")
    const existingEntry = entries.find((entry) => format(entry.date, "yyyy-MM-dd") === dateString)

    if (existingEntry) {
      setCurrentEntry(existingEntry.content)
    } else {
      setCurrentEntry("")
    }

    setSelectedDate(date)
  }

  // Save current entry
  const saveEntry = () => {
    if (!currentEntry.trim()) return

    const dateString = format(selectedDate, "yyyy-MM-dd")
    const existingEntryIndex = entries.findIndex((entry) => format(entry.date, "yyyy-MM-dd") === dateString)

    if (existingEntryIndex >= 0) {
      // Update existing entry
      const updatedEntries = [...entries]
      updatedEntries[existingEntryIndex] = {
        ...updatedEntries[existingEntryIndex],
        content: currentEntry,
      }
      setEntries(updatedEntries)
    } else {
      // Create new entry
      setEntries([
        ...entries,
        {
          id: Date.now().toString(),
          date: selectedDate,
          content: currentEntry,
        },
      ])
    }
  }

  // Navigate to previous/next day
  const navigateDay = (direction: "prev" | "next") => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1))
    findOrCreateEntry(newDate)
  }

  // Check if selected date has an entry
  const hasEntryForDate = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd")
    return entries.some((entry) => format(entry.date, "yyyy-MM-dd") === dateString)
  }

  return (
    <div className="p-4 pt-6">
      <h1 className="text-2xl font-bold mb-6">Journal</h1>

      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" size="icon" onClick={() => navigateDay("prev")}>
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              <span>{format(selectedDate, "MMMM d, yyyy")}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-card" align="center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && findOrCreateEntry(date)}
              modifiers={{
                hasEntry: (date) => hasEntryForDate(date),
              }}
              modifiersClassNames={{
                hasEntry: "bg-primary/20",
              }}
            />
          </PopoverContent>
        </Popover>

        <Button variant="outline" size="icon" onClick={() => navigateDay("next")}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <Textarea
        value={currentEntry}
        onChange={(e) => setCurrentEntry(e.target.value)}
        placeholder="Write your thoughts for today..."
        className="min-h-[300px] bg-muted/50 resize-none mb-4"
      />

      <Button className="w-full flex items-center gap-2" onClick={saveEntry} disabled={!currentEntry.trim()}>
        <Save className="w-4 h-4" />
        <span>Save Entry</span>
      </Button>
    </div>
  )
}

