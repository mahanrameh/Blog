const tagRepo = require("./../repositories/tagRepo");
const articleRepo = require("./../repositories/articleRepo");
const { calculateTimeGap } = require("../utils/funcs");





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

exports.findTagArticle = async (req, res, next) => {
    try {
        const tagTitle = req.params.slug;

        const tag = await tagRepo.findByTitle(tagTitle);

        const articles = await articleRepo.findTagArticle(tag.id);


        articles.forEach(article => {
            article.created_at = calculateTimeGap(article.created_at);
        } );


        return res.render('tagArticle.ejs', {
            tag: tag.title,
            articles
        });
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const {id, title} = req.body;

        await tagRepo.update(id, title);

        req.flash('success', 'tag got updated');

        return res.redirect('p-admin/tags');
        return res.status(200).console.log
        ({
            message: 'tag got updated'
        });
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