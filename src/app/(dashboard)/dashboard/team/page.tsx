"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MOCK_USERS, type MockUser } from "@/lib/mock-data/users"
import { useAuthStore } from "@/lib/stores/auth-store"
import { usePermission } from "@/components/auth/PermissionGate"
import { formatDate } from "@/lib/utils"
import { Plus, UserPlus, Trash2, Shield, Mail, Clock } from "lucide-react"
import type { UserRole } from "@/lib/utils"

const roleColors: Record<UserRole, string> = {
  superadmin: "bg-red-100 text-red-700",
  owner: "bg-amber-100 text-amber-700",
  admin: "bg-blue-100 text-blue-700",
  manager: "bg-violet-100 text-violet-700",
  analyst: "bg-emerald-100 text-emerald-700",
  viewer: "bg-neutral-100 text-neutral-700",
}

export default function TeamPage() {
  const [members, setMembers] = useState<MockUser[]>(MOCK_USERS)
  const [showInvite, setShowInvite] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState<UserRole>("analyst")
  const { user } = useAuthStore()
  const canInvite = usePermission("team.invite")
  const canRemove = usePermission("team.remove")
  const canChangeRole = usePermission("team.changeRole")

  const handleInvite = () => {
    if (!inviteEmail.trim()) return
    const newMember: MockUser = {
      id: `usr_${Date.now()}`,
      email: inviteEmail,
      name: inviteEmail.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
      avatar: inviteEmail.slice(0, 2).toUpperCase(),
      role: inviteRole,
      title: "Team Member",
      department: "General",
      lastActive: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      isVerified: false,
      twoFactorEnabled: false,
    }
    setMembers([...members, newMember])
    setInviteEmail("")
    setShowInvite(false)
  }

  const removeMember = (id: string) => {
    setMembers(members.filter(m => m.id !== id))
  }

  const changeRole = (id: string, newRole: UserRole) => {
    setMembers(members.map(m => m.id === id ? { ...m, role: newRole } : m))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Team Management</h2>
          <p className="text-muted-foreground">Manage team members and their roles.</p>
        </div>
        {canInvite && (
          <Button onClick={() => setShowInvite(true)}>
            <UserPlus className="w-4 h-4 mr-2" /> Invite Member
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="pt-6"><div className="text-xs text-muted-foreground mb-1">Total Members</div><div className="text-2xl font-bold">{members.length}</div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="text-xs text-muted-foreground mb-1">Admins</div><div className="text-2xl font-bold">{members.filter(m => m.role === "admin" || m.role === "owner").length}</div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="text-xs text-muted-foreground mb-1">Active Today</div><div className="text-2xl font-bold">{members.filter(m => Date.now() - new Date(m.lastActive).getTime() < 86400000).length}</div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="text-xs text-muted-foreground mb-1">2FA Enabled</div><div className="text-2xl font-bold">{members.filter(m => m.twoFactorEnabled).length}/{members.length}</div></CardContent></Card>
      </div>

      {/* Invite Modal */}
      {showInvite && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Input type="email" placeholder="colleague@company.com" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} className="flex-1" />
              <select value={inviteRole} onChange={e => setInviteRole(e.target.value as UserRole)} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="analyst">Analyst</option>
                <option value="viewer">Viewer</option>
              </select>
              <Button onClick={handleInvite}>Send Invite</Button>
              <Button variant="outline" onClick={() => setShowInvite(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Members Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Member</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Role</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground hidden md:table-cell">Department</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground hidden lg:table-cell">Last Active</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground hidden lg:table-cell">Security</th>
                  <th className="text-right p-4 text-xs font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map(member => (
                  <tr key={member.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                          {member.avatar}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{member.name}</div>
                          <div className="text-xs text-muted-foreground">{member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      {canChangeRole && member.role !== "owner" ? (
                        <select
                          value={member.role}
                          onChange={e => changeRole(member.id, e.target.value as UserRole)}
                          className={`text-xs font-medium px-2.5 py-1 rounded-full border-0 ${roleColors[member.role]}`}
                        >
                          <option value="admin">Admin</option>
                          <option value="manager">Manager</option>
                          <option value="analyst">Analyst</option>
                          <option value="viewer">Viewer</option>
                        </select>
                      ) : (
                        <Badge className={`${roleColors[member.role]} border-0 text-xs capitalize`}>{member.role}</Badge>
                      )}
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="text-sm text-muted-foreground">{member.department}</span>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <span className="text-sm text-muted-foreground">{formatDate(member.lastActive, "relative")}</span>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        {member.twoFactorEnabled && <Badge variant="outline" className="text-xs"><Shield className="w-3 h-3 mr-1" /> 2FA</Badge>}
                        {member.isVerified && <Badge variant="outline" className="text-xs text-emerald-600"><Mail className="w-3 h-3 mr-1" /> Verified</Badge>}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      {canRemove && member.role !== "owner" && member.id !== user?.id && (
                        <Button variant="ghost" size="sm" onClick={() => removeMember(member.id)}>
                          <Trash2 className="w-4 h-4 text-muted-foreground" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
