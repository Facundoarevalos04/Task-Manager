module.exports =  {
    list : async (req, res) =>  {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'Lista de proyectos'
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                msg: msg.error || 'Hubo un error en el listado de proyectos'
            })
        }
    },
    store : async (req, res) =>  {
        try {
            return res.status(201).json({
                ok: true,
                msg: 'Proyecto guardado'
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                msg: msg.error || 'Hubo un error en el guardado del proyecto'
            })
        }
    },
    detail : async (req, res) =>  {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'detalle del proyecto'
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                msg: msg.error || 'Hubo un error en el detalle'
            })
        }
    },
    update : async (req, res) =>  {
        try {
            return res.status(201).json({
                ok: true,
                msg: 'Proyecto actualzado'
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                msg: msg.error || 'Hubo un error en la actualizacion del proyecto'
            })
        }
    },
    remove : async (req, res) =>  {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'Proyecto eliminado'
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                msg: msg.error || 'Hubo un error en la eliminacion del proyecto'
            })
        }
    },
    addCollaborator : async (req, res) =>  {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'colabarador agregado'
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                msg: msg.error || 'Hubo un error en la agregacion del colaborador'
            })
        }
    },
    removeCollaborator : async (req, res) =>  {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'colabarador eliminado'
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                msg: msg.error || 'Hubo un error en la eliminacion del colaborador'
            })
        }
    },
    

}