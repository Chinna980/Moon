"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function TimerPage() {
  // Pomodoro timer is 25 minutes (1500 seconds)
  const POMODORO_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;

  const [timeLeft, setTimeLeft] = useState(POMODORO_TIME);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [completedSessions, setCompletedSessions] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer logic
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      handleTimerComplete();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isActive, timeLeft]);

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const resetTimer = () => {
    pauseTimer();
    setTimeLeft(isBreak ? BREAK_TIME : POMODORO_TIME);
  };

  const handleTimerComplete = () => {
    pauseTimer();

    // Play notification sound
    try {
      const audio = new Audio("/notification.mp3");
      audio.play().catch((e) => console.log("Audio play failed:", e));
    } catch (error) {
      console.log("Audio play error:", error);
    }

    // If it was a pomodoro session, increment completed sessions
    if (!isBreak) {
      setCompletedSessions((prev) => prev + 1);
    }

    // Toggle between pomodoro and break
    setIsBreak((prev) => !prev);
    setTimeLeft(!isBreak ? BREAK_TIME : POMODORO_TIME);
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Calculate progress for the circular timer
  const calculateProgress = () => {
    const total = isBreak ? BREAK_TIME : POMODORO_TIME;
    const progress = (total - timeLeft) / total;
    const circumference = 2 * Math.PI * 45; // radius is 45
    return circumference * progress;
  };

  return (
    <div className="p-4 pt-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Pomodoro Timer</h1>

      <div className="mb-4 text-center">
        <div className="text-lg font-medium">
          {isBreak ? "Break Time" : "Focus Time"}
        </div>
        <div className="text-sm text-muted-foreground">
          {isBreak ? "Take a short break" : "Stay focused on your task"}
        </div>
      </div>

      {/* Circular timer */}
      <div className="relative w-64 h-64 mb-6">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="transparent"
            stroke="hsl(var(--muted))"
            strokeWidth="5"
          />

          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="transparent"
            stroke={isBreak ? "hsl(var(--secondary))" : "hsl(var(--primary))"}
            strokeWidth="5"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={2 * Math.PI * 45 - calculateProgress()}
            className="circular-progress"
          />
        </svg>

        {/* Timer display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl font-bold">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Timer controls */}
      <div className="flex gap-4 mb-8">
        <Button
          className={`w-16 h-16 rounded-full ${isBreak ? "bg-secondary hover:bg-secondary/90" : ""}`}
          onClick={isActive ? pauseTimer : startTimer}
        >
          {isActive ? <Pause color="#ffffff" /> : <Play color="#ffffff" />}
        </Button>

        <Button className="w-16 h-16 rounded-full" onClick={resetTimer}>
          <RotateCcw color="white" />
        </Button>
      </div>

      {/* Only show task details during focus time */}
      {!isBreak && (
        <div className="w-full max-w-md space-y-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="task-name">What are you working on?</Label>
            <Input
              id="task-name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Task name"
              className="bg-muted"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="task-description">Notes (optional)</Label>
            <Textarea
              id="task-description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Add details about your task"
              className="bg-muted"
              rows={3}
            />
          </div>
        </div>
      )}

      {/* Session counter */}
      <div className="flex items-center gap-2 text-muted-foreground">
        <Check className="w-4 h-4 text-success" />
        <span>{completedSessions} pomodoro sessions completed today</span>
      </div>
    </div>
  );
}
