const jwt = require('jsonwebtoken');

const verifyAdminToken = (req, res, next) => {
    //let token = req.headers.token;
    const authHeader = req.headers.authorization || req.headers.Authorization;
    // console.log("Token........." + authHeader);
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: 'Unauthorized or Token Expired! Login Again!'
            });
        }
        // console.log(decoded);
        req.admin = decoded;
        next();
    }
    );
};

const verifyUserToken = (req, res, next) => {
    //let token = req.headers.token;
    const authHeader = req.headers.authorization || req.headers.Authorization;
    // console.log("Token........." + authHeader);
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: 'Unauthorized or Token Expired! Login Again!'
            });
        }
        // console.log(decoded);
        req.user = decoded;
        next();
    }
    );
};

const authJwt = {
    verifyAdminToken: verifyAdminToken,
    verifyUserToken: verifyUserToken
};
module.exports = authJwt;