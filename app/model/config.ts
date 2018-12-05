import * as Sequelize from 'sequelize';

import { Application } from 'egg';

interface IConfigInterface {
    id?: number;
    key: string;
    value: object;
    createdAt?: Date;
    updatedAt?: Date;
}

interface IConfigInstance extends IConfigInterface, Sequelize.Instance<IConfigInterface> {

}

const schema = {
    id: { type: Sequelize.INTEGER, unique: true, autoIncrement: true, primaryKey: true },
    key: { type: Sequelize.STRING, allowNull: false, unique: true },
    value: { type: Sequelize.JSONB, allowNull: false },
};

const schemaOption = {
    indexes: [
        {
            unique: true,
            fields: ['key'],
        },
    ],
};

export default  (app: Application) => {
    const Config = app.model.define<IConfigInstance, IConfigInterface>('Config', schema, schemaOption);
    return Config;
};

export { IConfigInstance, IConfigInterface };
