import { Application } from 'egg';

export default (app: Application) => {
    const { controller, router } = app;

    router.get('/', controller.home.index);

    router.get('/video_share/:id', app.oAuth2Server.authenticate(), controller.videoShare.get);
    router.get('/video_share', controller.videoShare.list);
};
