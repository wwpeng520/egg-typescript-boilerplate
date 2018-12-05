import { Application } from 'egg';
import * as Sequelize from 'sequelize';

interface IVerifyCodeInterface {
    id?: number;
    code?: string;
    userId?: number;
    type?: string;
    state: number;
    verifyData?: string;
    expiredDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

interface IVerifyCodeInstance extends IVerifyCodeInterface, Sequelize.Instance<IVerifyCodeInterface> {}

let schema = {
    id: { type: Sequelize.INTEGER, unique: true, primaryKey: true, autoIncrement: true },
    code: { type: Sequelize.STRING, allowNull: false, unique: true },
    userId: { type: Sequelize.INTEGER, allowNull: true },
    type: { type: Sequelize.STRING, allowNull: false },
    state: { type: Sequelize.INTEGER, allowNull: false },
    verifyData: { type: Sequelize.STRING, allowNull: true },
    expiredDate: { type: Sequelize.DATE, allowNull: true },
};

let schemaOption = {

};

export default (app: Application) => {
    let VerifyCode = app.model.define<IVerifyCodeInstance, IVerifyCodeInterface>('VerifyCode', schema, schemaOption);
    return VerifyCode;
};

export { IVerifyCodeInstance, IVerifyCodeInterface };
