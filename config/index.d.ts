import { EggAppConfig } from 'egg';

declare module 'egg' {
    interface IConfig {
        client: {
            id: number;
            clientId: string;
            clientSecret: string;
            redirectUris: any[];
            refreshTokenLifetime: number;
            accessTokenLifetime: number;
            grants: string[];
        };

        oAuth2Server: {
            debug: boolean;
            grants: string[];
            clients: Client[];
        };

        jwt: {
            secret: string;
        };

        sms: {
            sign_name: string;
            accessKey: string;
            accessKeyId: string;
            templateCode: object;
        };
    }

    export type LocalConfig = EggAppConfig & IConfig;

    export interface Controller {
        config: LocalConfig;
    }

    export interface Service {
        config: LocalConfig;
    }

    export interface Application {
        validator: {
            validate: (rule: object | string, obj: object) => object | void;
            addRule: (ruleName: string, rule: objetc | RegExp) => void;
        };
        config: LocalConfig;
    }
}
