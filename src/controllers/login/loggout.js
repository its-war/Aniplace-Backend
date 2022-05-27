module.exports = (req, res) => {
    req.headers['x-access-token'] = null;
    res.json({autorizado: false, token: null});
};