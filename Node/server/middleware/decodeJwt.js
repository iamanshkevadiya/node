const jwt = require('jasonwebtoken');

const decode = async (req, res, next) => {
    let token = req.headers?.authorization?.split('')[1];
    try {
        if (token) {
            let data = await jwt.verify(token, "private-key");
            try {
                if (data) {
                    req.user = data;
                    next();
                }
            } catch (error) {
                res.status(404).json({ error: error.message });
            }
        }
        else {
            res.status(401).json({ error: "No token provided" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = decode;