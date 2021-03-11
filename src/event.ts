import Discord from "discord.js";
import Client from "./client";

function EventHandler<K extends keyof Discord.ClientEvents>(eventType: K) {
    return function (constructFN: Function) {
        constructFN.prototype.eventType = eventType;
    };
}

interface Listener {
    execute(client: Client, args: any[]): void;
}

type TListener = (client: Client, args: any[]) => void;

export { EventHandler, Listener, TListener };