import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
    const config = {} as PowerPartial<EggAppConfig>;

    // override config from framework / plugin
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1543893880769_1408';

    config.view = {
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.tpl': 'nunjucks',
        },
    };

    // add your egg config in here
    config.middleware = [];

    // add your special config in here
    const bizConfig = {
        sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
    };

    config.oAuth2Server = {
        debug: false,
        grants: ['password'],
        clients: [
            {
                id: 1,
                clientId: 'appp',
                clientSecret: 'BiWddsss3batkKUddsdddCUTuEBF6yEphXrcwcywVvZALvsBrVJwpXQRTbs',
                redirectUris: [],
                refreshTokenLifetime: 365,
                accessTokenLifetime: 30,
                grants: ['password'],
            },
        ],
    };

    // the return config will combines to EggAppConfig
    return {
        ...config,
        ...bizConfig,
    };
};
