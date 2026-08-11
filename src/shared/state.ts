import { Position, Uri } from "vscode";

export interface StateFields {
    participants: {
        name: string;
        id: string;
        neuros: { id: string; display: string; }
    }[];
    positions: Record<string, LocationState>;
    neuroSafeRules: {
        unsafePaths: string[];
        safePaths: string[];
        dotFiles: boolean;
    };
    colours: Record<string, string>;
}

export interface LocationState {
    file: Uri;
    cursor: Position | null | undefined;
}

export type State = Partial<StateFields>;

export const currentState: State = {};
