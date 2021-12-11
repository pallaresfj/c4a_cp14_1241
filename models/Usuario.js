const { genSalt, hash, compare } = require('bcrypt');
const { Schema, model } = require('mongoose');

const usuarioSchema = new Schema({
    login: {
        type: String, 
        unique: [true, 'El nombre de usuario no está disponible'], 
        required: [true, 'El nombre de usuario es obligatorio'], 
        max: [20,'Nombre de usuario excede la longitud permitida.'] 
    },
    contrasena: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    rol: {
        type: String,
        required: [true, 'El rol del usuario es obligatorio.']
    }
},
{ 
    collection: 'Usuarios'
});

usuarioSchema.pre('save', async function (next) {
    console.log('Encriptando contraseña...');
    const salt = await genSalt(10);
    this.contrasena = await hash(this.contrasena, salt);
    next();
});

usuarioSchema.methods.compararPasswords = async function (passwordTextoPlano) {
    console.log('Comparando contraseñas...');
    return await compare(passwordTextoPlano, this.contrasena)
}

exports.Usuario = model('Usuario', usuarioSchema);