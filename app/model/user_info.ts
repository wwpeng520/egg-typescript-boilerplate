import * as Sequelize from 'sequelize';

import { Application } from 'egg';

interface IUserInfoInterface {
    userId?: number;
    currentCoin?: number;
    totalCoin?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface IUserInfoInstance extends IUserInfoInterface, Sequelize.Instance<IUserInfoInterface> {}

const schema = {
    userId: { type: Sequelize.INTEGER, allowNull: false },
    currentCoin: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
        displayName: '当前积分',
    },
    totalCoin: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
        displayName: '总共积分',
    },
};

const schemaOption = {
    indexes: [
        {
            unique: true,
            fields: ['userId'],
        },
    ],
};

export default (app: Application) => {
    const UserInfo = app.model.define<IUserInfoInstance, IUserInfoInterface>('UserInfo', schema, schemaOption);
    UserInfo.associate = () => {
        app.model.UserInfo.belongsTo(app.model.User, {
            as: 'user',
            foreignKey: 'userId',
        });
    };
    return UserInfo;
};

export { IUserInfoInstance, IUserInfoInterface };
