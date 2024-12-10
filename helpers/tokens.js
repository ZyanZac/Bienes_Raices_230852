import jwt from 'jsonwebtoken'

const generateJWT=data=>jwt.sign({id:data.id, name:data.name}, process.env.JWT_SECRET, {expiresIn: '1d'})

//Ningún token va a ser igual a otro. Date.now() es la fecha, y por cada segundo que pase, lo convierte a cadena.
const generateID = () => Date.now().toString(32) + Math.random().toString(32).substring(2);
//const generateID = () => + Math.random().toString(32).subString(2) + Date.now().toString(32)

export {
    generateID, generateJWT
}