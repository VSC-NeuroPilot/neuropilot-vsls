// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Globals } from './globals';
import { Contributions } from '@vsc-neuropilot/api-types';
import { addExampleActions } from './example_actions';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
    // Activate the base extension and get the API
    const neuropilotBaseExtension = vscode.extensions.getExtension('vsc-neuropilot.neuropilot-base')!;
    Globals.api = !neuropilotBaseExtension.isActive ? await neuropilotBaseExtension.activate() : neuropilotBaseExtension.exports;
    
    // Register a companion with the API
    Globals.companion = new Globals.api.Companion({
        name: 'NeuroPilot - VS Live Share support',
        author: 'VSC-NeuroPilot',
        extensionId: context.extension.id,
        docs: 'https://vsc-neuropilot.github.io/docs/vsls',
        contributes: [
            Contributions.ACTIONS_MANAGE,
            Contributions.CONTEXT,
            Contributions.ACTIONS_INJECT,
            Contributions.CURSOR_GET,
            Contributions.ACTIONS_MANAGE_OTHERS,
        ],
    });

    // Add actions
    // Remember to activate your actions in the UI after launching!
    addExampleActions();
}

// This method is called when your extension is deactivated
export function deactivate() {}
