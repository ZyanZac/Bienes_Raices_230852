import {DataTypes} from 'sequelize';
import db from '../config/db.js'

//DataTypes y Squelize son lo mismo
const Usuario=db.define('usuarios', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: DataTypes.STRING,
    confirmado: DataTypes.BOOLEAN
});

export default Usuario;



