import * as vsls from 'vsls';

export let rpc = await vsls.getApi();

/**
 * Reloads the RPC client attached to {@link rpc the RPC variable}.
 */
export async function reloadRPC() {
    rpc = await vsls.getApi();
}
