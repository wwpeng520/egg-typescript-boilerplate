import { Application, Context } from 'egg';
import * as jwt from 'jsonwebtoken';

module.exports = (app: Application) => {
    class Model {
        ctx: Context;
        constructor(ctx) {
            this.ctx = ctx;
        }

        getClient(clientId, clientSecret) {
            this.ctx.logger.info('getClient', clientId, clientSecret);
            let clients = app.config.oAuth2Server.clients;
            for (let client of clients) {
                if (clientId === client['clientId'] && clientSecret === client['clientSecret']) {
                    return client;
                }
            }
            return;
        }

        async getUser(username: string, password: string) {
            this.ctx.logger.info('getUser', username, password);
            if (password.startsWith('sms_verify_code_')) {
                let verifyCode = password.substring('sms_verify_code_'.length);
                this.ctx.logger.info(`verifyCode ${verifyCode}`);
                let userId = await this.ctx.service.user.getUserIdByVerifyCode(username, verifyCode);
                if (userId) {
                    return { userId };
                }
                return false;
            } else {
                let userId = await this.ctx.service.user.getUserIdByPassword(username, password);
                if (userId) {
                    return { userId };
                }
                return false;
            }
        }

        getAccessToken(bearerToken) {
            try {
                const decoded: any = jwt.verify(bearerToken, this.ctx.app.config.jwt.secret);

                // let accessTokenExpiresAt = new Date(decoded.exp * 1000);
                // if(moment(accessTokenExpiresAt).isBefore(moment())){
                //     return false;
                // }
                let userId = decoded.weifentuId ? decoded.weifentuId : decoded.userId;

                return {
                    accessToken: bearerToken,
                    accessTokenExpiresAt: new Date(decoded.exp * 1000),
                    scope: decoded.scope,
                    client: { id: decoded.clientId },
                    user: { id: userId },
                };
            } catch (err) {
                this.ctx.logger.info('error', err);
                return false;
            }
        }

        generateAccessToken(client, user, scope) {
            this.ctx.logger.info('generateAccessToken', client, user, scope);
            const accessToken = jwt.sign(
                {
                    userId: user['userId'],
                    scope,
                    clientId: client['clientId'],
                },
                this.ctx.app.config.jwt.secret,
                {
                    expiresIn: `${client['accessTokenLifetime']}d`,
                },
            );
            return accessToken;
        }

        generateRefreshToken(client, user, scope) {
            this.ctx.logger.info('generateRefreshToken', client, user, scope);
            const refreshToken = jwt.sign(
                {
                    userId: user['userId'],
                    clientId: client['clientId'],
                },
                this.ctx.app.config.jwt.secret,
                {
                    expiresIn: `${client['refreshTokenLifetime']}d`,
                },
            );
            return refreshToken;
        }

        async saveToken(token, client, user) {
            this.ctx.logger.info('saveAuthorizationCode', token, client, user);
            const _token = Object.assign({}, token, { user }, { client });
            return _token;
        }
    }

    return Model;
};
