import Discord from 'discord.js';

namespace Utils {
    export class Embed {
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

    export class Color {
        
        public static randomizeColor() {

        }

    }

    export class Ping {

        public static messageLaytency(message: Discord.Message): number {
            return Date.now() - message.createdTimestamp;
        }

        public static apiLatency(client: Discord.Client): number {
            return client.ws.ping;
        }

    }
}

export default Utils;