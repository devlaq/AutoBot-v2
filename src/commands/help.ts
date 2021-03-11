import { CommandExecutor, Executor } from "../command";
import Discord from 'discord.js';
import Client from "../client";
import Utils from "../utils";
import { Logger } from "../logger";

@CommandExecutor('help', '/help [command]', '명령어 목록을 출력하거나 [command]의 사용법을 출력합니다.')
class CommandSendEvent implements Executor {
    public tag = 'help.ts';
    execute = (client: Client, message: Discord.Message, args: string[]): void => {
        const embed = Utils.Embed.createEmbed('도움말', message.author);
        client.commands.forEach((v, k) => {
            embed.addField(`${v.commandName} - ${v.usage}`, `사용법: ${v.description}`);
        })
        message.channel.send(embed);
    }
}

export default CommandSendEvent;