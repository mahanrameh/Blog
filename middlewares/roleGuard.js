module.exports = (role) => {
    return (req, res, next) => {
        if (role !== req.user.role) {
            return res.redirect('/auth/login');
        }

        next();
    }
};