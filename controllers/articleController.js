const slugify = require("slugify");
const articleRepo = require("./../repositories/articleRepo");


exports.getAll = async (req, res, next) => {
    try {
        
        
    } catch (err) {
        
    }
};

exports.create = async (req, res, next) => {
    try {
        let { title, content, slug, tags } = req.body;
        slug = slugify(slug, {lower: true});

        const author_id = req.user.id;

        const article = await articleRepo.create({
            title, 
            content, 
            slug, 
            author_id, 
            cover: req.file?.filename
        });

        tags.forEach(async tag => {
            await articleRepo.addTag(article.id, Number(tag));
        }); 


        req.flash('success', 'article got created');
        return res.redirect('/p-admin/create-article');
    } catch (err) {
        next(err);
    }
};

exports.getBySlug = async (req, res, next) => {
    try {
        
    } catch (err) {
        
    }
};

exports.deleteArticle = async (req, res, next) => {
    try {
        
    } catch (err) {
        
    }
};