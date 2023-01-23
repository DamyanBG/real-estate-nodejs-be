const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });
        //decode the authenticated is from the token
        req.auth_id = decoded.auth_id;
        req.auth_role = decoded.auth_role;
        //console.log(req);
        next();
    });
};

module.exports = verifyToken;
