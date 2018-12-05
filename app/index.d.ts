import { Application } from 'egg';

declare module 'egg' {
    export interface Application {
        oAuth2Server: any;
        channel: any;
    }
}