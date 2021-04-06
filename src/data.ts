import fs from 'fs';
import { Level, Logger } from './logger';

namespace Data {
    export abstract class BaseDataManager<K> {

        public static dataPath = './src/data/'

        protected data: Array<K>;
        protected path: string;

        public constructor(path: string) {
            this.path = BaseDataManager.dataPath + path;
        }
        
        public getData(): Array<K> {
            return this.data;
        }

        public getPath(): string {
            return this.path;
        }
    }
    
    export class ChannelDataManager extends BaseDataManager<ChannelData> {

        public tag = 'data.ts/ChannelDataManager';

        public loadData() {
            fs.stat(this.path, (err) => {
                if(err) return;
                
                fs.readFile(this.path, (err, data) => {
                    const r = JSON.parse(data.toString());
                    console.log(r);
                    console.log(Object.keys(r['asdf']['tags']));
                })
            })
        }

        public saveData() {
            fs.stat(this.path, (err) => {
                if(err) return;

            })
        }

    }

    interface ChannelData {
        id: string;
        tags: string[];
    }

    export class UserDataManager extends BaseDataManager<UserData> {

        public tag = 'data.ts/UserDataManager';

        public loadData() {
            fs.stat(this.path, (err) => {
                if(err) return;
                
                fs.readFile(this.path, (err, data) => {
                    JSON.parse(data.toString(), (k, v) => {
                        
                    });
                })
            })

            
        }

        public saveData() {
            
        }

    }

    class UserData {
        public id: string;
        public permissions: string[];
        public verified: boolean;
    }
}

export default Data;