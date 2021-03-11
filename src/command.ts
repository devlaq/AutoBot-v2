import Discord from "discord.js";
import Client from "./client";

function CommandExecutor(commandName: string, usage: string, description: string) {
    return function (constructFN: Function) {
        constructFN.prototype.commandName = commandName;
        constructFN.prototype.usage = usage;
        constructFN.prototype.description = description;
    };
}

function Permission(...permissions: Array<string>) {
    return function (constructFN: Function) {
        constructFN.prototype.permissions = permissions;
    }
}

interface Executor {
    execute(client: Client, message: Discord.Message, args: string[]): void;
}

type TExecutor = (client: Client, message: Discord.Message, args: string[]) => void;

type TCommand = {
    commandName: string;
    usage: string;
    description: string;
    execute: TExecutor;
}

export { CommandExecutor, Executor, TExecutor, TCommand };