// import * as crypto from "crypto";
import * as bcrypt from 'bcrypt';
const crypto = require('crypto');

const algorithm = 'aes-128-cbc';
const iv = 'sfe023f_9fd&fwfl';
const password = 'sfe023f_9fd&fwfl'
    .split('')
    .reverse()
    .join('');

export function getRandomString(length: number) {
    let e,
        b = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
        c = '';
    for (let i = 0; length > i; i += 1) {
        e = Math.random() * b.length;
        e = Math.floor(e);
        c += b.charAt(e);
    }
    return c;
}

export function fixFloat2(num: number): number {
    return Math.round(num * 100) / 100;
}

export function getRandomNumber(low: number, high: number): number {
    return Math.floor(Math.random() * (high - low) + low);
}

export function saltPassword(pwd: string, saltRounds = 10): string {
    let salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(pwd, salt);
}

export function verifyPassword(pwd: string, encryptPassword: string) {
    return bcrypt.compareSync(pwd, encryptPassword);
}

export function encrypt(text: string): string {
    let cipherEncoding = 'base64'; // hex, base64

    let cipher = crypto.createCipheriv(algorithm, password, iv);
    return cipher.update(text, 'utf8', 'base64') + cipher.final(cipherEncoding);
}

export function decrypt(text: string): string {
    let clearEncoding = 'utf8';
    let cipherEncoding = 'base64'; // hex, base64

    let cipherChunks = ['', text];
    let decipher = crypto.createDecipher(algorithm, password);
    let plainChunks: any = [];
    for (let i = 0; i < cipherChunks.length; i++) {
        plainChunks.push(decipher.update(cipherChunks[i], cipherEncoding, clearEncoding));
    }
    plainChunks.push(decipher.final(clearEncoding));
    return plainChunks.join('');
}
