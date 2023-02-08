const createError = require("http-errors");
const Project = require("../database/models/Project");
const errorResponse = require("../helpers/errorResponse");

module.exports = {
  list: async (req, res) => {
    try {
      const projects = await Project.find().where("createdBy").equals(req.user).select('name client')

      return res.status(200).json({
        ok: true,
        msg: "Lista de proyectos",
        projects,
      });


    } catch (error) {
      console.log(error);
      return errorResponse(res, error, "Lis t");
    };

  },

  store: async (req, res) => {
    try {
      const { name, description, client } = req.body;

      if (
        [name, description, client].includes("") || !name || !description || !client ) throw createError(400, "Todos los campos son obligatorios");

      if (!req.user) throw createError(401, "Error de autenticacion");

      const project = new Project(req.body);
      project.createdBy = req.user._id;

      const projectStore = await project.save();

      return res.status(201).json({
        ok: true,
        msg: "Proyecto guardado exitosamente",
        project: projectStore,
      });
    } catch (error) {
      console.log(error);
      return errorResponse(res, error, "Store");
    }
  },

  detail: async (req, res) => {
    try {
      const { id } = req.params;
      if(!require("mongoose").Types.ObjectId.isValid(id)) throw createError(400, "No es un ID válido");

      const project = await Project.findById(id);

      if (!project) throw createError(404, "Proyecto no encontrado");

      if (req.user._id.toString() !== project.createdBy.toString())
        throw createError(401, "Error de autorizacion");

      return res.status(200).json({
        ok: true,
        msg: "detalle del proyecto",
        project,
      });
    } catch (error) {
      console.log(error);
      return errorResponse(res, error, "detail");
    };

  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      if (!require("mongoose").Types.ObjectId.isValid(id))
        throw createError(400, "No es un ID válido");

        const project = await Project.findById(id); 
 
        if (!project) { 
            throw createError(404, "Proyecto no encontrado"); 
        } 
         
        if (req.user._id.toString() !== project.createdBy.toString()) { 
        throw createError( 
            401, 
            "No tenés la autorización para actualizar este proyecto" 
            ); 
        } 
         
        const { name, description, client, dateExpire } = req.body; 
         
        project.name = name || project.name; 
        project.description = description || project.description; 
        project.dateExpire = dateExpire || project.dateExpire; 
        project.client = client || project.client; 
         
        const projectUpdate = await project.save(); 
         
        return res.status(201).json({ 
            ok: true, 
            project: projectUpdate, 
        });
    } catch (error) {
      console.log(error);
      return errorResponse(res, error, "Update");
    }
  },

  remove: async (req, res) => {
    try {
      const { id } = req.params;
      /* if(!ObjectId.isValid(id)) throw createError(400, "no es un ID valido") */

      const project = await Project.findById(id);

      if (!project) throw createError(404, "Proyecto eliminado");

      if (req.user._id.toString() !== project.createdBy.toString())
        throw createError(401, "Error de autorizacion");

      await project.deleteOne();

      return res.status(200).json({
        ok: true,
        msg: "Proyecto eliminado",
      });
    } catch (error) {
      console.log(error);
      return errorResponse(res, error, "Remove");
    }
  },

  addCollaborator: async (req, res) => {
    try {
      return res.status(200).json({
        ok: true,
        msg: "colabarador agregado",
      });
    } catch (error) {
      console.log(error);
      return errorResponse(res, error, "En la agrgacion de un colaborador");
    }
  },

  removeCollaborator: async (req, res) => {
    try {
      return res.status(200).json({
        ok: true,
        msg: "colabarador eliminado",
      });
    } catch (error) {
      console.log(error);
      return errorResponse(res, error, "En la eliminacion de el colaborador");
    }
  },
};
