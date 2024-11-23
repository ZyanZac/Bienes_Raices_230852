import Sequelize from 'sequelize';
import dotenv from 'dotenv'
dotenv.config({path: '.env'})

const db=new Sequelize(process.env.BD_NOMBRE, process.env.BD_USER, process.env.BD_PASS /*?? ''*/,{ //'bienesraices_node_mvc', 'root', '1234'
    host: process.env.BD_HOST, //'localhost'
    port: 3307, //puerto del mysql
    dialect: 'mysql',
    define: {
        timestamp: true
    },
    pool: {
        max: 5,
        min: 0, 
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: false
});

export default db;