import { serviceName } from "../consts/rpc";
import { currentState } from "../shared/state";
import { rpc } from "../shared/vsls-client";

export async function setupHost() {
    const service = await rpc?.shareService(serviceName);

    // setup service listeners
    service?.onRequest('state-sync', () => {
        return currentState;
    });

    // setup session listeners
    rpc?.onDidChangePeers((e) => {
        if (e.removed.length > 0) {
            const removed = e.removed.filter((v) => currentState.participants?.find((p) => p.id));
        };
    });
    return service;
}