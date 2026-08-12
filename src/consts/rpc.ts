export const serviceName = 'neuropilot-vsls';

export const enum RequestMethods {
    SyncState = 'sync-state',
    HighlightSnippet = 'highlight-snippet',
}

export const enum NotifyEvents {
    GuestJoined = 'guest-joined',
    GuestLeft = 'guest-left',
    PreviewEffectSync = 'preview-effect-sync',
    PreviewEffectRemove = 'preview-effect-remove',
    CursorMoved = 'cursor-moved',
}
