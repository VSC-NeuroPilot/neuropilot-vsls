import * as vscode from 'vscode';
import { Globals } from './globals';
import { RCEContext, RCEHandlerReturns } from '@vsc-neuropilot/api-types';
import { defineAction } from '@vsc-neuropilot/api-types/utils';
import z from 'zod';

const CATEGORY_EXAMPLE = 'Template Example';

// Example action. This is only here for demonstration purposes, and should not be removed by the time the extension is published.
export const exampleActions = {
    hello: defineAction({
        name: 'hello',
        // ${userName} is a special placeholder that will be replaced with the name of the operator (e.g. Vedal).
        // Can also be used in schema descriptions.
        description: 'Show a "Hello World" message to ${userName}.',
        category: CATEGORY_EXAMPLE,
        // The schema is used to validate the input data, so you can use the fields in later functions without type checking.
        schema: z.object({
            name: z.string()
        }),
        contextSetupHook: [
            async (context) => {
                // Use storage to avoid fetching a value multiple times across different lifecycle stages
                context.storage.ownName = Globals.api.config.nameOfAPI.value;
            },
        ],
        cancelEvents: [
            () => new Globals.companion.actionUtils.CancelEvent({
                events: [
                    [
                        vscode.workspace.onDidChangeConfiguration,
                        (data: vscode.ConfigurationChangeEvent) => {
                            return data.affectsConfiguration('neuropilot.' + Globals.api.config.nameOfAPI.settingID);
                        },
                    ]
                ]
            }),
        ],
        validators: {
            sync: [
                (context) => {
                    const ownName = context.storage.ownName as string;
                    
                    if (context.data.params.name === ownName) {
                        return Globals.api.utils.actionValidation.retry(
                            'You cannot greet yourself.',
                            'Attempted to greet own name.',
                        );
                    }
                    return Globals.api.utils.actionValidation.success();
                },
            ],
        },
        promptGenerator: (context) => `greet ${context.data.params.name}.`,
        handler: helloHandler,
    }),
};

export function addExampleActions() {
    Globals.companion.addActions([
        exampleActions.hello,
    ]);
}

function helloHandler(context: RCEContext<{ name: string; }>): RCEHandlerReturns {
    // Get the "name" property from the JSON object that Neuro returned.
    // You don't need to type check here, as the object is validated against the schema before it is passed to the handler.
    const name: string = context.data.params!.name;

    // Get the name previously saved to storage in the context setup hook
    const ownName = context.storage.ownName as string;

    vscode.window.showInformationMessage(`Hello, ${name}!`);

    return Globals.api.utils.actionHandler.success(
        `You have greeted ${name}.`,    // What Neuro will see (via context)
        `${ownName} greeted ${name}.`,  // What the user will see (via history)
    );
}

