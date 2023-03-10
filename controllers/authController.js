const createError = require("http-errors");
const User = require("../database/models/User");
const errorResponse = require("../helpers/errorResponse");
const generateJWT = require("../helpers/generateJWT");
const generateTokenRandom = require("../helpers/generateTokenRandom");
const { confirmRegister, forgotPassword } = require("../helpers/sendMails");

module.exports = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if ([name, email, password].includes("" || null)) {
        throw createError(400, "Todos los campos son obligatorios");
      }

      let user = await User.findOne({
        email,
      });

      if (user) {
        throw createError(400, "El email ya se encuentra registrado");
      }

      const token = generateTokenRandom();

      user = new User(req.body);
      user.token = token;

      const userStore = await user.save();

      await confirmRegister({
        name: userStore.name,
        email: userStore.email,
        token: userStore.token,
      });

      return res.status(201).json({
        ok: true,
        msg: "Se ha enviado un mail con las instrucciones para completar su registro",
        data: userStore,
      });
    } catch (error) {
      console.log(error);
      return errorResponse(res, error, "REGISTER");
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      if ([email, password].includes("" || null)) {
        throw createError(400, "Todos los campos son obligatorios");
      }

      let user = await User.findOne({
        email,
      });

      if (!user) {
        throw createError(403, "Credenciales inválidas ");
      }

      if (!user.checked) {
        throw createError(403, "Tu cuenta no ha sido confirmada");
      }

      if (!(await user.checkedPassword(password))) {
        throw createError(403, "Credenciales inválidas ");
      }

      return res.status(201).json({
        ok : true,
        msg : "Usuario logueado",
        user : {
          name : user.name,
          _id : user._id,
        },
        token : generateJWT({
          id : user._id,
        })
      });
    } catch (error) {
      console.log(error);
      return errorResponse(res, error, "LOGIN");
    }
  },

  checked: async (req, res) => {
    const { token } = req.query;

    try {
      if (!token) {
        throw createError(400, "Token inexistente");
      }

      const user = await User.findOne({
        token,
      });

      if (!user) {
        throw createError(400, "Token invalido");
      }

      user.checked = true;
      user.token = "";

      await user.save();

      return res.status(200).json({
        ok: true,
        msg: "Registro completado exitosamente",
      });
    } catch (error) {
      console.log(error);
      return errorResponse(res, error, "el CHECKEO");
    }
  },

  sendToken: async (req, res) => {
    const { email } = req.body;

    try {
      let user = await User.findOne({
        email,
      });

      if (!user) throw createError(400, "Email incorrecto");

      const token = generateTokenRandom();

      user.token = token;
      await user.save();

      await forgotPassword({
        name: user.name,
        email: user.email,
        token: user.token,
      });

      //TODO: Enviar email para reestablecer la contraseña

      return res.status(200).json({
        ok: true,
        msg: "Se ha enviado un email con las intrucciones",
      });
    } catch (error) {
      return errorResponse(res, error, "SEND-TOKEN");
    }
  },

  verifyToken: async (req, res) => {
    try {
      const { token } = req.query;

      if (!token) throw createError(400, "No hay token en la petición");

      const user = await User.findOne({
        token,
      });

      if (!user) throw createError(400, "Token inválido");

      return res.status(200).json({
        ok: true,
        msg: "Token verificado",
      });
    } catch (error) {
      console.log(error);
      return errorResponse(res, error, "REGISTER");
    }
  },
  changerPassword: async (req, res) => {
    try {
      const { token } = req.query;
      const { password } = req.body;

      if (!password) throw createError(400, "El password es obligatorio");

      const user = await User.findOne({
        token,
      });

      user.password = password;
      user.token = "";

      await user.save();

      return res.status(200).json({
        ok: true,
        msg: "Contraseña actualizada",
      });
    } catch (error) {
      console.log(error);
      return errorResponse(res, error, "CHANGER-PASSWORD");
    }
  },
};
