import { Context } from 'egg';
import Controller from '../core/base_controller';
import * as CONSTANTS from '../extend/constants';

export default class UserController extends Controller {
    constructor(ctx: Context) {
        super(ctx);
    }

    async create() {
        const { ctx } = this;
        const smsRegisterRule = {
            verify_code: {
                required: true,
                type: 'string',
            },
            phone: {
                required: true,
                type: 'string',
            },
            password: {
                required: true,
                type: 'string',
            },
        };
        this.validate(smsRegisterRule, ctx.request.body);

        let phone: string = ctx.request.body['phone'];
        let verifyCode: string = ctx.request.body['verify_code'];
        let password: string = ctx.request.body['password'];

        let isRegisted = await this.service.user.isPhoneRegisted(phone);
        if (isRegisted) {
            return this.ctx.throw(400, '用户已注册！');
        }
        let isCodeLegal = await this.service.verifyCode.verifySMSCode(
            verifyCode,
            phone,
            CONSTANTS.VerifyCodeType.SMSRegister,
        );
        if (!isCodeLegal) {
            return this.ctx.throw(400, '验证码不正确');
        }
        let userCreated = await this.service.user.create(phone, password, phone);

        ctx.runInBackground(async () => {
            await this.service.userInfo.create(userCreated.id as number);
        });
        return this.returnCreated({ result: true });
    }
}
