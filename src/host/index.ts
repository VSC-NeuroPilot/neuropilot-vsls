import { serviceName } from "../consts/rpc";
import { currentState } from "../shared/state";
import { rpc } from "../shared/vsls-client";

const service = await rpc?.shareService(serviceName);

service?.onRequest('state-sync', () => {
    return currentState;
});

rpc?.onDidChangePeers((e) => {
    if (e.removed.length > 0) {
        const removed = e.removed.filter((v) => currentState.participants?.find((p) => p.id));
    };
});
