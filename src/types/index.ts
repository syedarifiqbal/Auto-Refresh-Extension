export interface RefreshSettings {
  minInterval: number;
  maxInterval: number;
  enabled: boolean;
}

export interface DomainRule {
  domain: string;
  minInterval: number;
  maxInterval: number;
  enabled: boolean;
  createdAt: number;
}

export interface TabState {
  tabId: number;
  domain: string;
  nextRefreshTime: number;
  isActive: boolean;
  lastRefreshTime: number | null;
}

export interface SafetySettings {
  pauseOnTyping: boolean;
  pauseWhenHidden: boolean;
  maxRefreshesPerHour: number;
}

export interface RefreshStats {
  domain: string;
  refreshCount: number;
  windowStart: number;
}

export interface StorageSchema {
  rules: Record<string, DomainRule>;
  globalSettings: RefreshSettings;
  safetySettings: SafetySettings;
  isPaused: boolean;
}

export const DEFAULT_SETTINGS: RefreshSettings = {
  minInterval: 30,
  maxInterval: 120,
  enabled: false
};

export const DEFAULT_SAFETY_SETTINGS: SafetySettings = {
  pauseOnTyping: true,
  pauseWhenHidden: false,
  maxRefreshesPerHour: 60
};
