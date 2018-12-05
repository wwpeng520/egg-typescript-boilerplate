import { Application } from 'egg';

declare module 'egg' {
    export interface Application {
        middlewares: {
            errorHandler: () => Promise<any>;
        };
    }
}
