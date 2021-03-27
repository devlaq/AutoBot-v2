import { level } from "chalk";

class Logger {

    public static log(tag: string = '!', message: string | any, level: Level = Level.Info, format: Format = Format.Default) {
        if(typeof message != 'string' && message.toString != undefined) message = message.toString();
        let formattedString = this.format(tag, message, level, format);
        console.log(formattedString);
    }

    public static format(tag: string = '!', message: string, level: Level = Level.Info, format: Format): string {
        let r;
        const date = new Date();
        r = this.replace(format, '{yyyy}', `${date.getFullYear()}`);
        r = this.replace(r, '{MM}', `0${date.getMonth()}`.slice(-2));
        r = this.replace(r, '{dd}', `0${date.getDay()}`.slice(-2));
        r = this.replace(r, '{hh}', `0${date.getHours()}`.slice(-2));
        r = this.replace(r, '{mm}', `0${date.getMinutes()}`.slice(-2));
        r = this.replace(r, '{dd}', `0${date.getSeconds()}`.slice(-2));
        r = this.replace(r, '{ss}', `0${date.getSeconds()}`.slice(-2));
        if(tag) r = this.replace(r, '{tag}', `${tag}`);
        else r = this.replace(r, '{tag}', '!')
        r = this.replace(r, '{level}', `${level}`);
        r = this.replace(r, '{message}', `${message}`);
        return r;
    }

    public static replace(m: string, t: string, r: string): string {
        return m.replace(t, r);
    }

}

enum Level {
    Info = 'Info',
    Debug = 'Debug',
    Warn = 'Warn',
    Error = 'Error'
}

enum Format {
    Default = '[{MM}/{dd} {hh}:{mm}:{ss}] [{tag}] [{level}] > {message}',
    NoTag = '[{MM}/{dd} {hh}:{mm}:{ss}] [{level}] > {message}',
    NoDate = '[{hh}:{mm}:{ss}] [{tag}] [{level}] > {message}',
    NoDateNoTag =  '[{hh}:{mm}:{ss}] [{level}] > {message}'
}

export { Logger, Level };