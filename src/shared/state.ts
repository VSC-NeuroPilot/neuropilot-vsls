import { Position, Range, Uri } from "vscode";

export interface StateFields {
    /**
     * Current Neuro participants in the session
     */
    participants: {
        name: string;
        id: string;
        neuros: { id: string; display: string; }[]
    }[];
    /**
     * A dictionary of all current positions
     */
    positions: Record<string, LocationState>;
    /**
     * Any Neuro-safe rules set by the session host
     */
    neuroSafeRules: {
        unsafePaths: string[];
        safePaths: string[];
        dotFiles: boolean;
    };
    /**
     * Colours assigned to each Neuro
     */
    colours: Record<string, string>;
    /**
     * Any highlights currently set by everyone.
     * @todo Make this into a better type somehow?
     */
    highlights: Map<Uri, (HighlightedBy & { range: Range })[]>;
}

interface HighlightedBy {
    /**
     * Was it higlighted by the user or the connected Neuro?
     */
    type: "user" | "neuro"
    /**
     * The ID of the highlighter.
     */
    id: string;
}

export interface LocationState {
    /**
     * The file that the cursor is located in.
     */
    file: Uri;
    /**
     * The current cursor position.
     * It usually shouldn't be `null` or `undefined`, but it should be accounted for just in case.
     */
    cursor: Position | null | undefined;
}

export type State = Partial<StateFields>;

/**
 * Current saved state.
 */
export const currentState: State = {};
