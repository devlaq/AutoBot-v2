import Discord, { ChannelData, User } from 'discord.js';
import fs from 'fs';
import { Level, Logger } from './logger';
import { TCommand, TExecutor } from './command';
import { TListener } from './event';
import Data from './data';

class Client {

    public static instance: Client;

    public client: Discord.Client;
    public tag = 'client.ts';

    public commands: Discord.Collection<string, TCommand>;
    public commandPrefix = '/';

    public developers: string[];

    public constructor(token: string) {
        Client.instance = this;
        this.client = new Discord.Client();
        this.commands = new Discord.Collection();

        new Data.ChannelDataManager('channelData.json').loadData();

        this.handleEvents();
        this.loadCommands();
        this.login();

        const { developers } = require('../config.json');
        this.developers = developers;
    }

    private login() {
        const { token } = require('../config.json');
        this.client.login(token);
    }

    private handleEvents() {
        const EventDir = './src/events';
        const eventFiles = fs.readdirSync(EventDir).filter((file) =>
            file.endsWith('.ts')
        );

        let ms = Date.now();
        let i = 0;
        let skipped = 0;
        for (const file of eventFiles) {
            try {
                const event = require(`./events/${file}`).default;
                const { eventType, execute } = new event();
                this.client.on(eventType, (...args) => execute(this, args));
                i++;
            } catch(err) {
                Logger.log(this.tag, `Error while loading ${file}, skipping`);
                Logger.log(this.tag, err);
                skipped++;
            }
            
        }
        ms = Date.now() - ms;
        if(skipped != 0) Logger.log(this.tag, `Loaded ${i} events (${`0000${ms}`.slice(-4)}ms) (skipped ${skipped})`);
        else Logger.log(this.tag, `Loaded ${i} events (${`0000${ms}`.slice(-4)}ms)`);
    }

    private loadCommands() {
        const CommandDir = './src/commands';
        const commandFiles = fs.readdirSync(CommandDir).filter((file) =>
            file.endsWith('.ts')
        );

        let ms = Date.now();
        let i = 0;
        let skipped = 0;
        for (const file of commandFiles) {
            try {
                const command = require(`./commands/${file}`).default;
                const c: TCommand = new command();
                if (typeof c.commandName == 'string') {
                    this.commands.set(c.commandName, c);
                    i++;
                }
            } catch(err) {
                Logger.log(this.tag, `Can\`t load command ${file}, skipping`);
                Logger.log(this.tag, err);
                skipped++;
            }
        }
        ms = Date.now() - ms;
        if(skipped != 0) Logger.log(this.tag, `Loaded ${i} commands (${`0000${ms}`.slice(-4)}ms) (skipped ${skipped})`);
        else Logger.log(this.tag, `Loaded ${i} commands (${`0000${ms}`.slice(-4)}ms)`);
    }

}

export default Client;
