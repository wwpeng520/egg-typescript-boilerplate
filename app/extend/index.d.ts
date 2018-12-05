import { Context } from 'egg';
import * as helper from './helper';

declare module 'egg' {
    export interface IHelper {
        decrypt: helper.decrypt;
        fixFloat2: helper.fixFloat2;
        encrypt: helper.encrypt;
        getRandomNumber: helper.getRandomNumber;
        saltPassword: helper.saltPassword;
        getRandomString: helper.getRandomString;
        verifyPassword: helper.verifyPassword;
    }
}
