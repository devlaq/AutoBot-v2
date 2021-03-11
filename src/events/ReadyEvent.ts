import { Logger } from "../logger";
import Client from "../client";
import { EventHandler, Listener } from "../event";

@EventHandler('ready')
class ReadyEvent implements Listener {
    public tag = 'ready.ts';
    execute = async (client: Client, args: any[]): Promise<void> => {
        Logger.log(this.tag, 'Bot ready');
        
        var a = false;
        await setInterval(() => {
            if(a) client.client.user?.setActivity({type:'PLAYING', name:'/help'});
            else client.client.user?.setActivity({type:'PLAYING', name:`${client.client.guilds.cache.size}개 서버에서 사용 중!`});
            a = !a;
        }, 2500)
    }
}

export default ReadyEvent;