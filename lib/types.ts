export enum RedirectStatus {
    SUCCESS = 'SUCCESS',
    WARNING = 'WARNING',
    FAILURE = 'FAILURE'
}

export interface RedirectResult {
    sourceUrl: string;
    targetUrl: string;
    redirectedUrl: string;
    statusCode: number;
    status: RedirectStatus;
    message: string;
    needsUpdate: boolean;
}