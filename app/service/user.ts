import { Context } from 'egg';
import * as moment from 'moment';
import Service from '../core/base_service';

export default class User extends Service {
    constructor(ctx: Context) {
        super(ctx);
    }

    async create(username: string, password: string, phone: string) {
        let userCreated = await this.app.model.User.create({
            username,
            password: this.ctx.helper.saltPassword(password),
            encrypted: this.ctx.helper.encrypt(password),
            phone,
            name: phone,
            avatar: '',
            status: 1,
            lastLogin: moment().toDate(),
        });
        await this.service.userInfo.create(userCreated.id as number);
        return userCreated;
    }

    async profile(userId: number) {
        let info = await this.service.userInfo.get(userId);
        let user = await this.app.model.User.findOne({
            where: {
                id: userId,
            },
            attributes: [
                'username',
                'name',
                'email',
                'gender',
                'phone',
                'avatar',
                'region',
                'createdAt',
                'updatedAt',
                'id',
            ],
        });
        if (!user) {
            return this.ctx.throw(400, `user not exists ${userId}`);
        }
        return {
            userId: user.id,
            username: user.username,
            phone: user.phone,
            email: user.email,
            name: user.name,
            gender: user.gender,
            avatar: user.avatar,
            status: user.status,
            region: user.region,
            totalCoin: info.totalCoin,
            currentCoin: info.currentCoin,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }

    async isPhoneRegisted(phone: string): Promise<boolean> {
        let count = await this.app.model.User.count({
            where: { phone },
        });
        if (count > 0) {
            return true;
        }
        return false;
    }

    async getPhoneById(id: number) {
        let user = await this.app.model.User.findOne({
            where: { id },
            attributes: ['phone'],
        });
        if (user && user.phone) {
            return user.phone;
        }
        return null;
    }

    async patchInfo(userId: number, avatar?: string, name?: string, gender?: string, region?: string) {
        let userInfo = await this.app.model.User.findOne({
            where: {
                id: userId,
            },
        });
        if (!userInfo) {
            return this.ctx.throw(404, '未找到用户信息！');
        }
        userInfo.avatar = avatar ? avatar : userInfo.avatar;
        userInfo.name = name ? name : userInfo.name;
        userInfo.gender = gender ? gender : userInfo.gender;
        userInfo.region = region ? region : userInfo.region;
        await userInfo.save();
        return true;
    }

    async patchPhone(userId: number, verifyCode: string, newPhone: string) {
        let isRegistered = await this.isPhoneRegisted(newPhone);
        if (isRegistered) {
            return this.ctx.throw(400, '该手机号已注册！');
        }
        let isCodeLegal = await this.service.verifyCode.verifySMSCode(verifyCode, newPhone, 'patch_phone');
        if (!isCodeLegal) {
            return this.ctx.throw(400, '验证码不正确！');
        }

        let userInfo = await this.app.model.User.findOne({
            where: {
                id: userId,
            },
        });
        if (!userInfo) {
            return this.ctx.throw(404, '未找到用户信息！');
        }
        if (userInfo.name === userInfo.phone) {
            userInfo.name = newPhone;
        }
        userInfo.phone = newPhone;
        userInfo.username = newPhone;
        await userInfo.save();
        return true;
    }

    async getUserIdByVerifyCode(phone: string, verifyCode: string) {
        let verifyCodeInstance = await this.app.model.VerifyCode.findOne({
            where: {
                verifyData: phone,
                code: verifyCode,
            },
        });
        if (verifyCodeInstance) {
            if (verifyCodeInstance.state === -1 && verifyCodeInstance.expiredDate > moment().toDate()) {
                verifyCodeInstance.state = 1;
                await verifyCodeInstance.save();
                return verifyCodeInstance.userId;
            } else if (verifyCodeInstance.expiredDate < moment().toDate()) {
                verifyCodeInstance.state = -2;
                await verifyCodeInstance.save();
            }
        }
    }

    async getUserIdByPassword(username: string, password: string) {
        let user = await this.app.model.User.findOne({
            where: { username },
            attributes: ['id', 'password'],
        });
        if (!user) {
            return null;
        }
        if (this.ctx.helper.verifyPassword(password, user.password)) {
            return user.id;
        } else {
            return null;
        }
    }

    async updatePassword(userId: number, password: string) {
        await this.app.model.User.update(
            {
                password: this.ctx.helper.saltPassword(password),
                encrypted: this.ctx.helper.encrypt(password),
            },
            {
                where: {
                    id: userId,
                },
            },
        );
    }
}
