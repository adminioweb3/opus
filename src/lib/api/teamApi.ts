import apiClient from '../apiClient';

export interface TeamMember {
  id: string;
  displayName: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface TeamInvite {
  id: string;
  email: string;
  role: string;
  token: string;
  createdAt: string;
  expiresAt: string;
}

export interface CreateInviteResult {
  id: string;
  email: string;
  role: string;
  expiresAt: string;
  inviteLink: string;
}

export const getTeamMembers = async (): Promise<TeamMember[]> => {
  const response = await apiClient.get<TeamMember[]>('/Team/members');
  return response.data;
};

export const updateMemberRole = async (userId: string, role: string): Promise<void> => {
  await apiClient.put(`/Team/members/${userId}/role`, { role });
};

export const removeMember = async (userId: string): Promise<void> => {
  await apiClient.delete(`/Team/members/${userId}`);
};

export const getPendingInvites = async (): Promise<TeamInvite[]> => {
  const response = await apiClient.get<TeamInvite[]>('/Team/invites');
  return response.data;
};

export const createInvite = async (email: string, role: string): Promise<CreateInviteResult> => {
  const response = await apiClient.post<CreateInviteResult>('/Team/invites', { email, role });
  return response.data;
};

export const revokeInvite = async (inviteId: string): Promise<void> => {
  await apiClient.delete(`/Team/invites/${inviteId}`);
};
