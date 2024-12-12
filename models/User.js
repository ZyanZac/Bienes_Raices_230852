import {DataTypes} from 'sequelize';
import db from '../db/config.js'
import bcrypt from 'bcrypt'

//DataTypes y Squelize son lo mismo
//tbb-tabla base, tbc-tabla catálogo consultar datos, tbb-tabla derivada muchos a muchos, tb no tiene relación con ninguna
//Se asigna automáticamente el id incremental
const User=db.define('tb_users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
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
}, {
    hooks: {
        beforeCreate: async function(user) {
            // Solo hashear si la contraseña no está ya hasheada
            if (!user.password.startsWith('$2b$')) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
        beforeUpdate: async function(user) {
            // Solo hashear si la contraseña cambió y no está ya hasheada
            if (user.changed('password') && user.password && !user.password.startsWith('$2b$')) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    }
});

//Método personalizado
User.prototype.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

export default User;






