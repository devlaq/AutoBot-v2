import { CommandExecutor, Executor } from "../command";
import Discord from 'discord.js';
import Client from "../client";
import Utils from "../utils";

@CommandExecutor('ping', '/ping', 'API, 요청 레이턴시를 출력합니다.')
class CommandSendEvent implements Executor {
    public tag = 'ping.ts';
    execute = (client: Client, message: Discord.Message, args: string[]): void => {
        const embed = Utils.Embed.createEmbed('레이턴시', message.author, undefined, undefined, undefined, undefined, );
        message.channel.send(embed).then((m) => {
            embed.addFields(
                { name: 'API 레이턴시', value: `${Utils.Ping.apiLatency(client.client)}` },
                { name: `메시지 레이턴시`, value: `${Utils.Ping.messageLaytency(message)}` }
            )
            m.edit(embed);
        });
        
    }
}

export default CommandSendEvent;