import { Context } from 'egg';
import Service from '../core/base_service';

export default class UserInfoService extends Service {
    constructor(ctx: Context) {
        super(ctx);
    }

    async create(userId: number) {
        let userinfo = await this.app.model.UserInfo.create({
            userId,
            currentCoin: 100,
            totalCoin: 100,
        });
        return userinfo;
    }

    async get(userId: number) {
        const userInfo = await this.app.model.UserInfo.findOne({
            where: { userId },
        });
        if (!userInfo) {
            const userinfoCreated = await this.app.model.UserInfo.create({
                userId,
                currentCoin: 100,
                totalCoin: 100,
            });
            return userinfoCreated;
        }
        return userInfo;
    }
}
