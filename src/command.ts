import Discord from "discord.js";
import Client from "./client";

function CommandExecutor(commandName: string, description: string, ...usage: string[]) {
    return function (constructFN: Function) {
        constructFN.prototype.commandName = commandName;
        constructFN.prototype.description = description;
        constructFN.prototype.usage = usage;
    };
}

function Permission(...permissions: Array<string>) {
    return function (constructFN: Function) {
        constructFN.prototype.permissions = permissions;
    }
}

function InDev(hideDescription=false, hideUsage=false) {
    return function (constructFN: Function) {
        constructFN.prototype.indev = true;
        constructFN.prototype.hideDescription = hideDescription;
        constructFN.prototype.hideUsage = hideUsage;
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
    indev: boolean;
    hideDescription: boolean;
    hideUsage: boolean;
    execute: TExecutor;
}

export { CommandExecutor, InDev, Executor, TExecutor, TCommand };