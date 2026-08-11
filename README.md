# `neuropilot-vsls`

This is a companion extension for [NeuroPilot](https://github.com/VSC-NeuroPilot/neuropilot) that allows Neuro/Evil to work together either with themselves or with another human.
This companion extension depends on the [Live Share extension]().

## How it works

~~We're using(?) [our forked version of an old package called `vsls-redux`](https://github.com/VSC-NeuroPilot/vsls-redux), which builds on top of the `vsls`, `redux` and `@reduxjs/toolkit` packages (the latter more colloquially known as "Redux Toolkit", or RTK for short).~~

When the extension starts, the host's copy acts as the server and is considered the source-of-truth. All guests will receive up-to-date cursor information directly from the host. When a new guest joins, the host provides them with the current state of the session. For this reason, the host is required to have NeuroPilot + `neuropilot-vsls`. Guests can choose not to have it, but the experience will not be optimal.

When a connected Neuro performs an action that could change something on the filesystem, all Neuros (and their users) are immediately notified and shown a "remote preview effect", for the sake of not causing conflicts due to modifications. (this is gonna be a little tough to implement)
