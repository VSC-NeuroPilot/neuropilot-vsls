import { NotifyEvents, RequestMethods, serviceName } from "../consts/rpc";
import { rpc } from "../shared/vsls-client";

export async function setupProxy() {
    const proxy = await rpc?.getSharedService(serviceName);

    // inform host
    proxy?.notify(NotifyEvents.GuestJoined, {});
    const syncState = await proxy?.request(RequestMethods.SyncState, []);

    // setup listeners
    proxy?.onNotify(NotifyEvents.GuestJoined, (a) => {});

    // return proxy object
    return proxy;
}
