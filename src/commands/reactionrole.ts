import { CommandExecutor, Executor, InDev } from "../command";
import Discord from 'discord.js';
import Client from "../client";
import Utils from "../utils";

@CommandExecutor('reactionrole', '/reactionrole <add|remove> [emoticon] [roleId]', '반응 역할 지급을 추가/제거합니다.')
@InDev(true, true)
class CommandSendEvent implements Executor {
    public tag = 'reactionrole.ts';
    execute = (client: Client, message: Discord.Message, args: string[]): void => {
        
    }
}

export default CommandSendEvent;