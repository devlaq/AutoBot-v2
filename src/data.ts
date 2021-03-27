import fs from 'fs';
import { Level, Logger } from './logger';

namespace Data {
    export abstract class BaseDataManager<K> {

        public static dataPath = './src/data/'

        protected data: Map<string, K> = new Map();
        protected path: string;

        public constructor(path: string) {
            this.path = BaseDataManager.dataPath + path;
        }

        public get(id: string): K | undefined {
            return this.data.get(id);
        }

        public has(id: string): boolean {
            return this.data.has(id);
        }

        public set(id: string, value: K) {
            this.data.set(id, value);
        }

        public getData(): Map<string, K> {
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
                    JSON.parse(data.toString(), (k, v) => {
                        
                    });
                })
            })

            
        }

        public saveData() {
            
        }

    }

    class ChannelData {
        public id: string;
        public tags: string[];
    }
}

export default Data;