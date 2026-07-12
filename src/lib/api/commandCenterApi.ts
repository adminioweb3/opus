import apiClient from '../apiClient';

export interface CommandCenterKpi {
  label: string;
  val: number;
  suffix: string;
  delta: number;
  spark: number[];
}

export interface CommandCenterBreakdownCard {
  name: string;
  cur: number;
  prev: number;
  insight: string;
}

export interface CommandCenterActionItem {
  source: string;
  title: string;
  detail: string;
  severity: string;
  link: string;
}

export interface CommandCenterAlert {
  title: string;
  message: string;
  severity: string;
}

export interface CommandCenterResponse {
  hasData: boolean;
  lastScanDate: string;
  kpis: CommandCenterKpi[];
  breakdown: CommandCenterBreakdownCard[];
  actionItems: CommandCenterActionItem[];
  alerts: CommandCenterAlert[];
  insights: string[];
}

export async function getCommandCenter(organizationId: string, range: '7D' | '30D' | '90D'): Promise<CommandCenterResponse> {
  const response = await apiClient.get<CommandCenterResponse>('/Dashboard/command-center', {
    params: { organizationId, range },
  });
  return response.data;
}
