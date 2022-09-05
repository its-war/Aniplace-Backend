const Notification = require('../../models/Notification');
module.exports = async (req, res) => {
    await Notification.updateMany({para: req.userData._id, status: 0}, {status: 1}).then(() => {
        return res.send({markLidos: true});
    });
}