"use client"

import { useState } from "react"
import { Bell, Moon, Eye, HelpCircle, LogOut, Clock } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: true,
    privacy: false,
    reminders: true,
    sleepReminders: true,
    focusReminders: false,
  })

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    })
  }

  return (
    <div className="p-4 pt-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="space-y-6">
        {/* General settings */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium">General</h2>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="w-5 h-5 mr-3 text-primary" />
              <Label htmlFor="notifications" className="cursor-pointer">
                Notifications
              </Label>
            </div>
            <Switch
              id="notifications"
              checked={settings.notifications}
              onCheckedChange={() => toggleSetting("notifications")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Moon className="w-5 h-5 mr-3 text-primary" />
              <Label htmlFor="dark-mode" className="cursor-pointer">
                Dark Mode
              </Label>
            </div>
            <Switch id="dark-mode" checked={settings.darkMode} onCheckedChange={() => toggleSetting("darkMode")} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Eye className="w-5 h-5 mr-3 text-primary" />
              <Label htmlFor="privacy" className="cursor-pointer">
                Privacy Mode
              </Label>
            </div>
            <Switch id="privacy" checked={settings.privacy} onCheckedChange={() => toggleSetting("privacy")} />
          </div>
        </div>

        {/* Reminders */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Reminders</h2>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="w-5 h-5 mr-3 text-primary" />
              <Label htmlFor="reminders" className="cursor-pointer">
                Daily Reminders
              </Label>
            </div>
            <Switch id="reminders" checked={settings.reminders} onCheckedChange={() => toggleSetting("reminders")} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Moon className="w-5 h-5 mr-3 text-primary" />
              <Label htmlFor="sleep-reminders" className="cursor-pointer">
                Sleep Reminders
              </Label>
            </div>
            <Switch
              id="sleep-reminders"
              checked={settings.sleepReminders}
              onCheckedChange={() => toggleSetting("sleepReminders")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-3 text-primary" />
              <Label htmlFor="focus-reminders" className="cursor-pointer">
                Focus Reminders
              </Label>
            </div>
            <Switch
              id="focus-reminders"
              checked={settings.focusReminders}
              onCheckedChange={() => toggleSetting("focusReminders")}
            />
          </div>
        </div>

        {/* Help & Support */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="help">
            <AccordionTrigger className="text-lg font-medium">
              <div className="flex items-center">
                <HelpCircle className="w-5 h-5 mr-3 text-primary" />
                Help & Support
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pl-8">
                <Button variant="link" className="p-0 h-auto">
                  FAQ
                </Button>
                <Button variant="link" className="p-0 h-auto">
                  Contact Support
                </Button>
                <Button variant="link" className="p-0 h-auto">
                  Privacy Policy
                </Button>
                <Button variant="link" className="p-0 h-auto">
                  Terms of Service
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Account */}
        <div className="pt-4">
          <Button variant="destructive" className="w-full">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}

