import type { NeuroPilotAPI, CompanionAPI } from "@vsc-neuropilot/api-types";
import { createVSLS } from "@vsc-neuropilot/vsls-redux";

export class Globals {
    static api: NeuroPilotAPI;
    static companion: CompanionAPI;
    static vslsStore = createVSLS(); // unliklely we are going to use this
}
