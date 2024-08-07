import path from 'path';
import * as vscode from 'vscode';

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "commenter" is now active!');

    // Register the command to create a file
    const initFunction = vscode.commands.registerCommand('commenter.init', async () => {
        // Get the workspace folder
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showInformationMessage('No workspace folder found.');
            return;
        }

        // Define the file path and content
        const filePath = path.join(workspaceFolder.uri.fsPath, 'newfile.md');
        const fileUri = vscode.Uri.file(filePath);
        const fileContent = 'Hello, world!'; // Use a string directly for text content

        try {
            // Write the file
            await vscode.workspace.fs.writeFile(fileUri, Buffer.from(fileContent));
            vscode.window.showInformationMessage('File created successfully.');
        } catch (error) {
            vscode.window.showErrorMessage('Failed to create file: ' + (error as Error).message);
        }
    });

    context.subscriptions.push(initFunction);

    // Register another command
    const disposable = vscode.commands.registerCommand('commenter.CommentCurrentFile', () => {
        vscode.window.showInformationMessage('Hello World from Commenter!');

        // Placeholder for additional functionality
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
