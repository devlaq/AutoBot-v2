import { Collection, Message } from "discord.js";
import { Level, Logger } from "../logger";
import Client from "../client";
import fs from 'fs';
import { EventHandler, Listener } from "../event";

@EventHandler('message')
class CommandSendEvent implements Listener {
    public tag = 'command.ts';
    execute = async (client: Client, args: any[]): Promise<void> => {
        const message: Message = args[0];
        if(!message.content.startsWith(client.commandPrefix)) return;
        const cargs = message.content.slice(client.commandPrefix.length).trim().split(/ +/);
        const command = cargs.shift()?.toLocaleLowerCase() || '';
        
        if(!client.commands.has(command)) {
            message.reply('없는 명령어다!! 개발자는 빨리 이 메시지를 수정해라!!!');
            return;
        }

        try {
            const c = client.commands.get(command);
            if(!c) return;
            await c.execute(client, message, cargs);
        } catch(err) {
            Logger.log(this.tag, '명령어를 하던 중에 에러가 발생해씀!!!!!!!!!!!!', Level.Error);
        }
    }
}

export default CommandSendEvent;