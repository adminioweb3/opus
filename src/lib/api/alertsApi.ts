import apiClient from '../apiClient';

export type AlertNotificationSeverity = 'Info' | 'Medium' | 'High' | 'Good' | 'Critical';

export interface AlertNotification {
  id: string;
  organizationId: string;
  dedupKey: string;
  type: string;
  title: string;
  message: string;
  severity: AlertNotificationSeverity;
  source: string;
  actionUrl: string;
  evidenceJson: string;
  isRead: boolean;
  createdAt: string;
  deliveredAt: string | null;
  deliveryStatus: string;
}

export async function getAlerts(limit = 50, unreadOnly = false): Promise<AlertNotification[]> {
  const response = await apiClient.get<AlertNotification[]>('/Alerts', {
    params: { limit, unreadOnly },
  });
  return response.data;
}

export async function markAlertRead(id: string): Promise<void> {
  await apiClient.post(`/Alerts/${id}/read`);
}

export async function markAllAlertsRead(): Promise<void> {
  await apiClient.post('/Alerts/read-all');
}
