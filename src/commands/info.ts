import { CommandExecutor, Executor } from "../command";
import Discord from 'discord.js';
import Client from "../client";
import Utils from "../utils";

@CommandExecutor('info', '/info', '봇 정보, 제작자, 깃허브 등을 표시합니다.')
class CommandSendEvent implements Executor {
    public tag = 'ping.ts';
    execute = (client: Client, message: Discord.Message, args: string[]): void => {
        const embed = Utils.Embed.createEmbed('정보', message.author, undefined, undefined, undefined, undefined, );
        embed.addFields([
            { name: '봇 개발자', value: '검은 색#6610' },
            { name: '봇 깃허브', value: 'https://github.com/worldisblack/AutoBot-v2' }
        ])
        message.channel.send(embed);
        
    }
}

export default CommandSendEvent;