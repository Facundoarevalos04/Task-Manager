module.exports = {
    profile: async (req, res) => {
    try {
        return res.status(201).json({
            ok : true,
            msg : 'perfil de usuario',
            user : req.user
        })
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).json({
            ok : false,
            msg : msg.error || 'Hubo un error'
        })
    }
}
}