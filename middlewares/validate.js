module.exports = (varlidator, path) => {
    return async (req, res, next) => {
        try {
            await varlidator.varlidate(req.body);

            next();
        } catch (err) {
        req.flash('error', err.errors[0]);

        return res.redirect(path);

            return res.status(400).json({error: err.errors});
        }
    }
};