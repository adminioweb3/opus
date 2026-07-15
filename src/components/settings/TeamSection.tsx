"use client"

import { useCallback, useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { UserPlus, Mail, Copy, X, Trash2 } from "lucide-react"
import {
  getTeamMembers,
  updateMemberRole,
  removeMember,
  getPendingInvites,
  createInvite,
  revokeInvite,
  TeamMember,
  TeamInvite,
} from "@/lib/api/teamApi"
import { SectionHead, StatusPill, EmptyState } from "./shared"

const ROLES = ["Admin", "Editor", "Viewer"]

const roleTone = (role: string) =>
  role === "Admin" ? "bg-primary/10 text-primary" : role === "Editor" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"

function errMsg(err: unknown, fallback: string) {
  const anyErr = err as { response?: { data?: { message?: string } } }
  return anyErr?.response?.data?.message || fallback
}

export default function TeamSection() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [invites, setInvites] = useState<TeamInvite[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("Editor")
  const [isSendingInvite, setIsSendingInvite] = useState(false)

  const load = useCallback(async () => {
    setIsLoading(true)
    try {
      const [m, i] = await Promise.all([getTeamMembers(), getPendingInvites()])
      setMembers(m)
      setInvites(i)
    } catch (err) {
      console.error(err)
      toast.error("Failed to load team data")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const handleRoleChange = async (userId: string, role: string) => {
    const prev = members
    setMembers((cur) => cur.map((m) => (m.id === userId ? { ...m, role } : m)))
    try {
      await updateMemberRole(userId, role)
      toast.success("Role updated")
    } catch (err) {
      setMembers(prev)
      toast.error(errMsg(err, "Failed to update role"))
    }
  }

  const handleRemove = async (userId: string) => {
    try {
      await removeMember(userId)
      setMembers((cur) => cur.filter((m) => m.id !== userId))
      toast.success("Member removed")
    } catch (err) {
      toast.error(errMsg(err, "Failed to remove member"))
    }
  }

  const sendInvite = async () => {
    if (!inviteEmail.trim()) return
    setIsSendingInvite(true)
    try {
      const invite = await createInvite(inviteEmail.trim(), inviteRole)
      setInviteEmail("")
      await load()
      navigator.clipboard.writeText(invite.inviteLink).catch(() => {})
      toast.success("Invite created — link copied to clipboard (no email delivery yet, share it manually)")
    } catch (err) {
      toast.error(errMsg(err, "Failed to create invite"))
    } finally {
      setIsSendingInvite(false)
    }
  }

  const handleRevoke = async (inviteId: string) => {
    try {
      await revokeInvite(inviteId)
      setInvites((cur) => cur.filter((i) => i.id !== inviteId))
      toast.success("Invite revoked")
    } catch (err) {
      toast.error(errMsg(err, "Failed to revoke invite"))
    }
  }

  const copyInviteLink = (invite: TeamInvite) => {
    const link = `${window.location.origin}/register?email=${encodeURIComponent(invite.email)}`
    navigator.clipboard.writeText(link)
    toast.success("Invite link copied")
  }

  return (
    <div className="space-y-5">
      <Card>
        <CardContent className="pt-6">
          <SectionHead title="Members" sub={isLoading ? "Loading…" : `${members.length} member${members.length === 1 ? "" : "s"} in this organization`} />
          <div className="space-y-2">
            {members.map((m) => (
              <div key={m.id} className="flex items-center justify-between p-3 rounded-lg border border-border/60">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                    {(m.displayName || m.email).charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{m.displayName || m.email}</div>
                    <div className="text-xs text-muted-foreground">{m.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={m.role}
                    onChange={(e) => handleRoleChange(m.id, e.target.value)}
                    className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer ${roleTone(m.role)}`}
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  <Button variant="ghost" size="sm" onClick={() => handleRemove(m.id)}>
                    <Trash2 className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            ))}
            {!isLoading && members.length === 0 && <EmptyState icon={UserPlus} message="No members yet." />}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <SectionHead title="Invite teammates" sub="No email delivery yet — copy the link and share it manually. Whoever signs up with that email joins this organization automatically." />
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="teammate@company.com"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendInvite()}
              className="flex-1"
            />
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
              className="text-sm border border-border rounded-md px-3 bg-background"
            >
              {ROLES.filter((r) => r !== "Admin").map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <Button onClick={sendInvite} disabled={isSendingInvite || !inviteEmail.trim()}>
              <UserPlus className="w-4 h-4 mr-1.5" /> {isSendingInvite ? "Creating…" : "Create invite"}
            </Button>
          </div>
          {invites.length > 0 && (
            <div className="space-y-2">
              {invites.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/40 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground min-w-0">
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{inv.email}</span>
                    <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full shrink-0 ${roleTone(inv.role)}`}>{inv.role}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="ghost" size="sm" onClick={() => copyInviteLink(inv)}><Copy className="w-3.5 h-3.5" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => handleRevoke(inv.id)}><X className="w-3.5 h-3.5" /></Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <SectionHead title="Roles & permissions" sub="What each role can access." />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { role: "Admin", desc: "Full access, including inviting/removing members and changing roles." },
              { role: "Editor", desc: "Create and edit content, run scans, view all dashboards." },
              { role: "Viewer", desc: "Read-only access to dashboards and reports." },
            ].map((r) => (
              <div key={r.role} className="p-3 rounded-lg border border-border/60">
                <div className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2 ${roleTone(r.role)}`}>{r.role}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
