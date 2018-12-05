import * as Sequelize from 'sequelize';
import { IConfigInstance, IConfigInterface } from './config';
import { IUserInstance, IUserInterface } from './user';
import { IUserInfoInstance, IUserInfoInterface } from './user_info';
import { IVerifyCodeInstance, IVerifyCodeInterface } from './verify_code';
import { IVideoShareInstance, IVideoShareInterface } from './video_share';

declare module 'egg' {
    interface Models {
        Config: Sequelize.Model<IConfigInstance, IConfigInterface>;
        User: Sequelize.Model<IUserInstance, IUserInterface>;
        UserInfo: Sequelize.Model<IUserInfoInstance, IUserInfoInterface>;
        VerifyCode: Sequelize.Model<IVerifyCodeInstance, IVerifyCodeInterface>;
        VideoShare: Sequelize.Model<IVideoShareInstance, IVideoShareInterface>;
    }

    export interface Application {
        Sequelize: Sequelize;
        model: Sequelize.Sequelize & Models;
    }

    // export interface Context {
    //     model: Sequelize.Sequelize & Models;
    // }
}

declare module 'sequelize' {
    interface Model<TInstance, TAttributes> {
        associate: () => any;
    }
}
