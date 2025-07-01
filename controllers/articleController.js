const slugify = require("slugify");
const sharp = require("sharp");
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
        const fileType = req.file.originalname;

        const author_id = req.user.id;
        const imgFileBuffer = req.file.buffer;
        const coverPath = `/images/cover/${Date.now()}${fileType}`;


        if (fileType == 'png') {
            sharp(imgFileBuffer)
            .png({
                quality: 60,
            })
            .toFile(`./public${coverPath}`);
        } else if (fileType == 'jpeg') {
            sharp(imgFileBuffer)
            .jpeg({
                quality: 60,
            })
            .toFile(`./public${coverPath}`);
        } else {
            req.flash('error', 'can not support file type');
        }




        const article = await articleRepo.create({
            title, 
            content, 
            slug, 
            author_id, 
            cover: coverPath
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