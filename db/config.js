import Sequelize from 'sequelize';
import dotenv from 'dotenv'
dotenv.config({path: '.env'})

const db=new Sequelize(process.env.BD_NAME, process.env.BD_USER, process.env.BD_PASSWORD /*?? ''*/,{ 
    host: process.env.BD_DOMAIN, //misitio.com
    port: process.env.BD_PORT,//puerto del mysql
    dialect: 'mysql',
    define: {
        timestamp: true
    },
    pool: {
        max: 5,
        min: 0, 
        acquire: 30000, //Tiempo en milisegundos, 30 segundos que intenta hacer peticiones. Si no contesta, hay error
        idle: 10000 //Tiempo de inactividad, lo manda a dormir, prioridad baja.
    },
    operatorsAliases: false //Quita los alias
});

export default db;