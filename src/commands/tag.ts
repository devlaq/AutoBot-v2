import { CommandExecutor, Executor } from "../command";
import Discord from 'discord.js';
import Client from "../client";
import Utils from "../utils";
import { Logger } from "../logger";

@CommandExecutor('tag', '/tag [tag] [value]', '사용 가능한 tag를 확인 하거나 현재 채널의 tag를 value로 설정합니다.')
class CommandSendEvent implements Executor {
    public tag = 'tag.ts';
    execute = (client: Client, message: Discord.Message, args: string[]): void => {
        const embed = Utils.Embed.createEmbed('Tag', message.author, '개발중인 기능입니다!', 'RED');
    }
}

export default CommandSendEvent;