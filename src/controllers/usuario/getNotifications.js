const Notification = require('../../models/Notification');
const Usuario = require('../../models/Usuario');
module.exports = async (req, res) => {
    await Notification.find({
        para: req.userData._id
    }).sort({_id: "desc"}).limit(25).then(async (notifications) => {
        if(notifications.length > 0){
            for(let i = 0; i < notifications.length; i++){
                switch(notifications[i].action){
                    case 1: {
                        await Usuario.findById(notifications[i].metadado).select('nome -_id').then((u) => {
                            notifications[i].texto = notifications[i].texto.replace('-$$$-', u.nome);
                        });
                        break;
                    }
                }
            }
            return res.send({notifications: notifications});
        }
    });
}