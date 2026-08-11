import { NotifyEvents, RequestMethods, serviceName } from "../consts/rpc";
import { rpc } from "../shared/vsls-client";

const proxy = await rpc?.getSharedService(serviceName);


proxy?.notify(NotifyEvents.NewJoiner, {});

proxy?.request(RequestMethods.StateSync, []);
