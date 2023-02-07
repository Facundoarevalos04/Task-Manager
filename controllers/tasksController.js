module.exports =  {
    list : async (req, res) =>  {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'Lista de tareas'
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                msg: msg.error || 'Hubo un error en el listado de Tareas'
            })
        }
    },
    store : async (req, res) =>  {
        try {
            return res.status(201).json({
                ok: true,
                msg: 'Tarea guardado'
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                msg: msg.error || 'Hubo un error en el guardado de la tarea'
            })
        }
    },
    detail : async (req, res) =>  {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'Detalle de la tarea'
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                msg: msg.error || 'Hubo un error en el detalle de la tarea'
            })
        }
    },
    update : async (req, res) =>  {
        try {
            return res.status(201).json({
                ok: true,
                msg: 'Tarea actualzado'
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                msg: msg.error || 'Hubo un error en la actualizacion de la tarea'
            })
        }
    },
    remove : async (req, res) =>  {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'Tarea eliminado'
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                msg: msg.error || 'Hubo un error en la eliminacion de la Tarea'
            })
        }
    },
    changeState : async (req, res) =>  {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'tarea completada'
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                msg: msg.error || 'Hubo un error en changeState'
            })
        }
    },

}