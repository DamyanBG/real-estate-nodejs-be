const verifyRole = (roles) => {
    return (req, res, next) => {
        console.log('Verifying Role');
        if (!req.auth_role) return res.sendStatus(403);
        if (!roles.includes(req.auth_role)) return res.sendStatus(403);
        next();
    };
};

module.exports = verifyRole;
