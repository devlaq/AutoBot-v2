import { CommandExecutor, Executor } from "../command";
import Discord from 'discord.js';
import Client from "../client";
import Utils from "../utils";
import { Logger } from "../logger";
import { strikethrough } from "chalk";

@CommandExecutor('help', '/help [command]', '명령어 목록을 출력하거나 [command]의 사용법을 출력합니다.')
class CommandSendEvent implements Executor {
    public tag = 'help.ts';
    execute = (client: Client, message: Discord.Message, args: string[]): void => {
        const embed = Utils.Embed.createEmbed(message.author);
        if(args.length > 0) {
            if(client.commands.has(args[0])) {
                   embed.setTitle(`도움말 - ${args[0]}`);
                
            } else {
                embed.setTitle(`도움말`);
            }
        }
        client.commands.forEach((v, k) => {
            embed.addField(`${v.commandName} - ${v.hideDescription ? '__Description hided__': v.description}${v.indev ? ' - __InDev__' : ''}`, `사용법: ${v.hideUsage ?  '__Usage hided__' : v.usage[0]}\n자세한 사용법은 /help ${v.commandName}을(를) 참조하세요.`);
        })
        message.channel.send(embed);
    }
}

export default CommandSendEvent;