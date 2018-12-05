import { Context } from 'egg';
import Controller from '../core/base_controller';

export default class VideoShareController extends Controller {
    constructor(ctx: Context) {
        super(ctx);
    }

    async get() {
        const { ctx } = this;
        const id = parseInt(ctx.params.id, 10) || -1;

        const result = await ctx.service.videoShare.get(id);
        return this.returnData(result);
    }

    async list() {
        const { ctx } = this;
        const lastId = parseInt(ctx.query.last_id, 10) || -1;
        const count = parseInt(ctx.query.count, 10) || 10;
        const result = await ctx.service.videoShare.list(lastId, count);
        return this.returnData(result);
    }
}
