import { Collection, Message } from "discord.js";
import { Level, Logger } from "../logger";
import Client from "../client";
import fs from 'fs';
import { EventHandler, Listener } from "../event";
import Utils from "../utils";

@EventHandler('message')
class CommandSendEvent implements Listener {
    public tag = 'command.ts';
    execute = async (client: Client, args: any[]): Promise<void> => {
        const message: Message = args[0];
        if(!message.content.startsWith(client.commandPrefix)) return;
        const cargs = message.content.slice(client.commandPrefix.length).trim().split(/ +/);
        const command = cargs.shift()?.toLocaleLowerCase() || '';
        
        if(!client.commands.has(command)) {
            return;
        }

        Logger.log(this.tag, `${message.author.id} issued command '${command}'`);

        

        try {
            const c = client.commands.get(command);
            if(!c) return;
            if(c.indev && !client.developers.includes(message.author.id)) {
                const embed = Utils.Embed.createEmbed('엑세스 거부 - InDev 명령어', message.author, '개발중인 명령어입니다.\n개발자만 사용할 수 있습니다.');
                message.channel.send(embed);
                Logger.log(this.tag, '  Access Denied: InDev Command');
            }
            await c.execute(client, message, cargs);
        } catch(err) {
            Logger.log(this.tag, `> Error: ${err}`, Level.Error);
            Logger.log(this.tag, err, Level.Error);
        }
    }
}

export default CommandSendEvent;