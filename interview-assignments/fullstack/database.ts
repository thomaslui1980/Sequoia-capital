import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { UrlObject } from "./entity/urlObject";
import { Console } from "console";

console.log("Will invoke database.");
export class urlDBOperation {
    connection: Connection;
    constructor() {
        createConnection({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "root",
            database: "test",
            entities: [
                __dirname + "/entity/*.js"
            ],
            synchronize: true,
            logging: false
        }).then(async connection => {
            this.connection = connection;
        })
    }

    async saveUrl(full_url: string): Promise<any> {
        try {
            let urlObject = new UrlObject();
            urlObject.fullurl = full_url;
            urlObject.shorturl = '';
            debugger
            let urlInfo: UrlObject = await this.connection.manager.save(urlObject);
            let shortUrl = '';
            if (urlInfo != null) {
                let id = urlInfo.id;
                console.log('UrlObject has been saved and the id is: ' + id + '\n');
                shortUrl = this.id2short(id);
                urlObject.id = id;
                urlObject.shorturl = shortUrl;
                urlInfo = await this.connection.manager.save(urlObject);
            }
            return shortUrl;
        } catch (error) {
            console.log('Error occurred when saving full_url to short_url: ' + error + '\n');
            return "";
        }
    }

    id2short(id: number): string {
        try {
            console.log('The id is: ' + id + 'before transfer.\n');
            let number_as_32 = id.toString(32);
            console.log('The number is : ' + number_as_32 + ' after transfer for id:' + id + '\n');
            return number_as_32;
        } catch (error) {
            console.log('Error occurred when saving id2short: ' + error + '\n');
            return "";
        }
    }

    async getFullUrl(shortUrl: any): Promise<any> {
        try {
            let urlObject = new UrlObject();
            urlObject.shorturl = shortUrl;
            let urlObjectRepository = this.connection.getRepository(UrlObject);
            let urlInfo = await urlObjectRepository.findOne({ shorturl: shortUrl });
            // let urlInfo = await this.connection.manager.findOne(UrlObject, "",{"short_url":shortUrl});
            debugger
            if (urlInfo != null) {
                console.log('Full url has been got ' + urlInfo.fullurl + '\n');
                return urlInfo;
            } else {
                return null;
            }

        } catch (error) {
            console.log('Error occurred when getFullUrl: ' + error + '\n');
            return null;
        }

    }

    async getUrlList(): Promise<any> {
        try {
            let urlObjectRepository = this.connection.getRepository(UrlObject);
            let urlInfo = await urlObjectRepository.find();
            if (urlInfo != null) {
                console.log('Url list has been got' + urlInfo + '\n');
                return urlInfo;
            } else {
                return [];
            }

        } catch (error) {
            console.log('Error occurred when url list: ' + error + '\n');
            return [];
        }
    }
}