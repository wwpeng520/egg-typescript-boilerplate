import { Controller } from 'egg';

export default class BaseController extends Controller {
    get userId(): number {
        return this.ctx.state.oauth.token.user.id;
    }

    validate(createRule, userData) {
        let invalid = this.app.validator.validate(createRule, userData);
        if (invalid) {
            this.ctx.logger.info('invalid', JSON.stringify(invalid));
            this.ctx.throw(400);
        }
    }

    returnText(text) {
        this.ctx.body = text;
        this.ctx.status = 200;
    }

    returnData(data) {
        this.ctx.body = data;
        this.ctx.status = 200;
    }

    returnCreated(data) {
        this.ctx.body = data;
        this.ctx.status = 201;
    }

    // notFound(msg) {
    //   msg = msg || 'not found';
    //   this.ctx.throw(404, msg);
    // }
}
