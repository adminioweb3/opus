"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { updateProfile } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useAuthStore } from "@/lib/stores/auth-store"
import { SectionHead } from "./shared"

export default function ProfileSection() {
  const { user, setAuthData, token } = useAuthStore()
  const currentName = user ? ("name" in user ? user.name : user.displayName) ?? "" : ""
  const currentEmail = user?.email ?? ""
  const [name, setName] = useState(currentName)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name })
        setAuthData(auth.currentUser, token)
      } else if (user) {
        // Demo/mock session — no real Firebase user to update, just update local state.
        setAuthData({ ...user, name } as typeof user, token)
      } else {
        toast.error("Not signed in")
        return
      }
      toast.success("Profile updated")
    } catch (err) {
      console.error(err)
      toast.error("Failed to update profile")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-5">
      <Card>
        <CardContent className="pt-6">
          <SectionHead title="Your profile" sub="Personal details for your account." />
          <div className="grid gap-4 max-w-md">
            <div>
              <Label>Full name</Label>
              <Input className="mt-1.5" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label>Email</Label>
              <Input className="mt-1.5" value={currentEmail} disabled />
            </div>
            <Button className="w-fit" onClick={handleSave} disabled={isSaving || !name.trim()}>
              {isSaving ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
