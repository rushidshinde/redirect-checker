export enum RedirectStatus {
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  FAILURE = 'FAILURE'
}

export interface RedirectEntry {
  sourceUrl: string;
  targetUrl: string;
  redirectedUrl: string;
  statusCode: number;
  status: 'SUCCESS' | 'WARNING' | 'FAILURE';
  message: string;
  needsUpdate: boolean;
}

export interface RedirectEntryTransformed {
  source_url: string;
  target_url: string;
  redirected_url: string;
  status_code: number;
  status: string;
  message: string;
  needs_update: boolean;
}

export interface RedirectResult {
  title: string;
  redirects: RedirectEntryTransformed[];
}

export interface StatsDisplayObj {
  total: number;
  success: number;
  failure: number;
  warning: number;
}