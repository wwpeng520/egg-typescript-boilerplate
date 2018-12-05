import { Context } from 'egg';
import Service from '../core/base_service';

export default class VideoShareService extends Service {
    constructor(ctx: Context) {
        super(ctx);
    }

    async get(id: number) {
        const { ctx } = this;
        let data = await this.app.model.VideoShare.findOne({
            where: { id },
        });
        if (!data) {
            ctx.throw(404, '无该条数据！');
        }
        return data;
    }

    async list(lastId: number, count = 10, userId?: number) {
        let pageCount = count;
        let whereOptions = {};
        if (lastId > 0) {
            whereOptions = Object.assign(whereOptions, {
                id: {
                    $lt: lastId,
                },
            });
        }
        if (userId) {
            whereOptions = Object.assign(whereOptions, {
                userId,
            });
        }

        const result = await this.app.model.VideoShare.findAll({
            where: whereOptions,
            limit: pageCount,
            order: [['id', 'desc']],
            attributes: [
                'id',
                'author',
                'title',
                'duration',
                'cover',
                'stars',
                'scans',
                'collections',
                'createdAt',
                'updatedAt',
            ],
        });

        this.app.logger.info(`result length ${result.length}`);
        let nextUrl;
        if (result.length < pageCount) {
            nextUrl = null;
        } else {
            let newLastId = result[result.length - 1].id;
            nextUrl = `/video_share?last_id=${newLastId}`;
        }
        return {
            data: result,
            links: {
                next: nextUrl,
            },
        };
    }
}
