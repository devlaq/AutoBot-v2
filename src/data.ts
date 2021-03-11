import Modifier from "./modifier";
import Discord from 'discord.js';

class Data {
    public static GuildData = class {
        
        public id: string;
        public name: string;
        public modfiers: Array<Modifier>

        public static datas: Discord.Collection<string, typeof Data.GuildData>

        public static get(id: string): (typeof Data.GuildData) | undefined {
            return this.datas.get(id);
        }

        

    }
}

export default Data;