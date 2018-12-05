import { EggAppConfig, PowerPartial } from 'egg';
import { APP_NAME } from './../app/extend/constants';

export default () => {
    const config: PowerPartial<EggAppConfig> = {};

    config.sequelize = {
        dialect: 'postgres',
        database: 'weapp',
        host: 'localhost',
        port: 5455,
        username: 'weapp',
        password: 'sxxxfb6DDnQaapNxxxxxxFVpXrt2F',
        define: {
            underscored: false,
        },
    };

    config.jwt = {
        secret: 'xYxxxxxxxfUd4xxxxxUvo',
    };

    config.sms = {
        sign_name: APP_NAME,
        accessKey: 'xxxxxxxxxxxxx',
        accessKeyId: 'LTxxxxx5Sxxxx',
    };

    return config;
};
