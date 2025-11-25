import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

const Subscriber = sequelize.define('Subscriber', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    subscribed_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'subscribers',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

const findByEmail = (email) => Subscriber.findOne({ where: { email } });

const create = (email) => Subscriber.create({ email, subscribed_at: new Date() });

const findAll = () => Subscriber.findAll();

export { Subscriber, findByEmail, create, findAll };