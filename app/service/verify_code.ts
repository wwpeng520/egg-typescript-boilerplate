import { Context } from 'egg';
import * as _ from 'lodash';
import * as moment from 'moment';
import Service from '../core/base_service';
import * as CONSTANTS from '../extend/constants';

export default class VerifyCode extends Service {
    constructor(ctx: Context) {
        super(ctx);
    }

    async verifySMSCode(code: string, phone: string, type: string): Promise<boolean> {
        let verifyCode = await this.app.model.VerifyCode.findOne({
            where: {
                type,
                verifyData: phone,
            },
            order: [['id', 'desc']],
        });

        if (!verifyCode) {
            return false;
        }

        if (verifyCode.code !== code || verifyCode.state !== CONSTANTS.VerifyCodeState.Created) {
            return false;
        }

        if (verifyCode.expiredDate < new Date()) {
            verifyCode.state = CONSTANTS.VerifyCodeState.Expired;
            await verifyCode.save();
            return false;
        }
        verifyCode.state = CONSTANTS.VerifyCodeState.Success;
        await verifyCode.save();
        return true;
    }

    async createSMSCode(phone: string, type: string): Promise<boolean> {
        let code_: number = this.ctx.helper.getRandomNumber(100000, 999999);
        let code = code_.toString();

        await this.app.model.VerifyCode.create({
            code,
            type,
            state: CONSTANTS.VerifyCodeState.Created,
            verifyData: phone,
            expiredDate: moment()
                .add(3, 'days')
                .toDate(),
        });

        return true;
    }

    async createSMSLogin(phone: string, userId: number): Promise<boolean> {
        let code_: number = this.ctx.helper.getRandomNumber(100000, 999999);
        let code = code_.toString();
        await this.app.model.VerifyCode.create({
            code,
            userId,
            type: CONSTANTS.VerifyCodeType.SMSLogin,
            state: CONSTANTS.VerifyCodeState.Created,
            verifyData: phone,
            expiredDate: moment()
                .add(15, 'minutes')
                .toDate(),
        });
        return true;
    }

    async list(phone: string, page = 1, pageSize = 10) {
        const { rows: verifyCodeObjs, count: totalItems } = await this.app.model.VerifyCode.findAndCount({
            where: {
                verifyData: phone,
            },
            limit: pageSize,
            offset: pageSize * (page - 1),
            order: [['id', 'DESC']],
        });

        return {
            totalItems,
            data: verifyCodeObjs,
        };
    }
}
