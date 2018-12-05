import * as Sequelize from 'sequelize';

import { Application } from 'egg';

interface IUserInterface {
    id?: number;
    username?: string;
    password?: string;
    encrypted?: string;
    phone?: string;
    email?: string;
    name?: string;
    gender?: string;
    avatar?: string;
    role?: string;
    lastIP?: string;
    region?: string;
    status?: number;
    lastLogin?: Date;
    lastVersion?: string;
    deviceInfo?: object;
    isStaff?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface IUserInstance extends IUserInterface, Sequelize.Instance<IUserInterface> {}

const schema = {
    id: { type: Sequelize.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
    username: { type: Sequelize.STRING, unique: true, allowNull: false },
    region: { type: Sequelize.STRING, allowNull: true, displayName: '地区' },
    phone: { type: Sequelize.STRING, unique: true, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: true },
    name: { type: Sequelize.STRING, allowNull: true },
    password: { type: Sequelize.STRING, allowNull: false },
    encrypted: { type: Sequelize.STRING, allowNull: false },
    gender: { type: Sequelize.STRING, allowNull: true },
    avatar: { type: Sequelize.STRING, allowNull: true },
    role: { type: Sequelize.STRING, allowNull: true },
    status: { type: Sequelize.INTEGER, allowNull: false },
    lastIP: { type: Sequelize.STRING, allowNull: true },
    lastVersion: { type: Sequelize.STRING, allowNull: true },
    deviceInfo: { type: Sequelize.JSONB, allowNull: true },
    lastLogin: { type: Sequelize.DATE, allowNull: true },
    isStaff: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, displayName: '是否员工' },
};

const schemaOption = {
    indexes: [
        {
            unique: true,
            fields: ['username'],
        },
        {
            unique: true,
            fields: ['phone'],
        },
        {
            unique: false,
            fields: ['name'],
        },
    ],
};

export default (app: Application) => {
    const User = app.model.define<IUserInstance, IUserInterface>('User', schema, schemaOption);
    return User;
};

export { IUserInstance, IUserInterface };
