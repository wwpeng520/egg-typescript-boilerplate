import { Application } from 'egg';

module.exports = (app: Application) => {
    app.beforeStart(async () => {
        await app.model.sync({ force: false });
    });
};
