import * as Sequelize from 'sequelize';

import { Application } from 'egg';

interface IVideoShareInterface {
    id?: number;
    userId?: number;
    category: string;
    author: string;
    title: string;
    description: string;
    duration: number;
    cover: string;
    video: string;
    stars: number;
    scans: number;
    collections: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface IVideoShareInstance extends IVideoShareInterface, Sequelize.Instance<IVideoShareInterface> {}

const schema = {
    id: { type: Sequelize.INTEGER, unique: true, autoIncrement: true, primaryKey: true },
    userId: { type: Sequelize.INTEGER, allowNull: true },
    category: { type: Sequelize.STRING, allowNull: true, displayName: '分类' },
    author: { type: Sequelize.STRING, allowNull: true },
    title: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.STRING, allowNull: true },
    duration: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0, displayName: '视频时长' },
    cover: { type: Sequelize.STRING, allowNull: true },
    video: { type: Sequelize.STRING, allowNull: false },
    stars: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0, displayName: '点赞数' },
    scans: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0, displayName: '浏览数' },
    collections: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0, displayName: '收藏数' },
};

const schemaOption = {
    indexes: [
        {
            unique: false,
            fields: ['title'],
        },
        {
            unique: false,
            fields: ['userId'],
        },
    ],
};

export default (app: Application) => {
    const VideoShare = app.model.define<IVideoShareInstance, IVideoShareInterface>('VideoShare', schema, schemaOption);
    return VideoShare;
};

export { IVideoShareInstance, IVideoShareInterface };
