const { Usuario } = require("../models/Usuario");
const { sign } = require("jsonwebtoken");

const getTokenPair = async (user) => {
    const accessToken = await sign(
      {
        user: { _id: user._id, rol: user.rol, user: user.login },
      },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '1d' }
    );
  
    const refreshToken = await sign(
      { user: { _id: user._id, user: user.login } },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );
  
    return { refreshToken, accessToken };
};

const validarUsuario = async (loginData) => {
    const usr = await Usuario.findOne({ login: loginData.username });
    
    if (!usr) throw new Error('Nombre de usuario o contraseña incorrecta.');
    
    console.log('Validando login...');
    const passwordMatch = await usr.compararPasswords(loginData.password);
    
    if (!passwordMatch) throw new Error('Nombre de usuario o contraseña incorrecta.');

    return await getTokenPair(usr);
}

exports.validarUsuario = validarUsuario;
exports.getTokenPair = getTokenPair;