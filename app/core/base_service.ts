import { Service } from 'egg';

export default class BaseService extends Service {
    validate(createRule, userData) {
        let invalid = this.app.validator.validate(createRule, userData);
        if (invalid) {
            this.ctx.logger.info('invalid', JSON.stringify(invalid));
            this.ctx.throw(400);
        }
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
