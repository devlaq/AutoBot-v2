import Discord from 'discord.js';

class Utils {
    static Embed = class {
        public static createEmbed(title?: any, author?: Discord.User, description?: any, color?: Discord.ColorResolvable, url?: string, timestamp?: number | Date, imageUrl?: string, thumbnailUrl?: string): Discord.MessageEmbed {
            let embed = new Discord.MessageEmbed();
            if(title) embed = embed.setTitle(title);
            if(description) embed = embed.setDescription(description);
            if(color) embed = embed.setColor(color);
            if(url) embed = embed.setURL(url);
            if(timestamp) embed = embed.setTimestamp(timestamp);
            if(author) embed = embed.setFooter(`requestBy ${author.tag}`, `${author.avatarURL()}`);
            if(imageUrl) embed = embed.setImage(imageUrl);
            if(thumbnailUrl) embed = embed.setThumbnail(thumbnailUrl);
            return embed;
        }
    }

    static Color = class {
        
        public static randomizeColor() {

        }

    }

    static Ping = class {

        public static messageLaytency(message: Discord.Message): number {
            return Date.now() - message.createdTimestamp;
        }

        public static apiLatency(client: Discord.Client): number {
            return client.ws.ping;
        }

    }
}

export default Utils;