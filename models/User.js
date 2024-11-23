import {DataTypes} from 'sequelize';
import db from '../db/config.js'

//DataTypes y Squelize son lo mismo
//tbb-tabla base, tbc-tabla catálogo consultar datos, tbb-tabla derivada muchos a muchos, tb no tiene relación con ninguna
//Se asigna automáticamente el id incremental
const User=db.define('tb_users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }, 
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    //JWT
    token: DataTypes.STRING,
    confirmado: DataTypes.BOOLEAN
});

export default User;





