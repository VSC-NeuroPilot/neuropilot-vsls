export const serviceName = 'neuropilot-vsls';

export const enum RequestMethods {
    SyncState = 'sync-state',
    HighlightSnippet = 'highlight-snippet',
}

export const enum NotifyEvents {
    GuestJoined = 'guest-joined',
    GuestLeft = 'guest-left',
    SyncPreviewEffect = 'sync-preview-effect',
    DeletePreviewEffect = 'delete-preview-effect',
}
