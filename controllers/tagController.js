const tagRepo = require("./../repositories/tagRepo");





exports.getAll = async (req, res, next) => {
    try {
        const tags = await tagRepo.findAll();


        return res.status(200).json(tags);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const {title} = req.body;

        const tag = await tagRepo.create(title);


        return res.status(201).json(tag);
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params;

        await tagRepo.remove(id);

        req.flash('success', 'tag got removed');

        return res.redirect('p-admin/tags');
        return res.status(200).console.log
        ({
            message: 'tag got removed'
        });
    } catch (err) {
        next(err);
    }
};