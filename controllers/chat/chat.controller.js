const { Chat }  = require("../../models/index");
const chats = new Chat();

const getAllController = (req, res) => {
    const chat = chats.getAll();
    return res.status(200).json(chat);
}

const saveController =  (req, res) => {
    console.log(req.body);
    const { email, date, message } = req.body;

    if (email && date && message) {
        const nuevoRegistro = chats.save({ mail, date, message });
        return res.status(201).json(nuevoRegistro);
    }

    return res.status(400).json({
        error: 'El campo email no puede estar vacio'
    });
}

module.exports = {
    getAllController,
    saveController
}
