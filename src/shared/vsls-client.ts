import * as vsls from 'vsls';

export let rpc = await vsls.getApi();

export async function reloadRPC() {
    rpc = await vsls.getApi();
}
