const jwt = require('jsonwebtoken');

function verify(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token, 'secretKey', (err, authData) => {
            if(err)
            throw err;
            else {
                res.setHeader('expires', authData.exp);
                next();
            }
        })
        // next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = {
    verify
}