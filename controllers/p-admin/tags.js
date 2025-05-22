const tagRepo = require("./../../repositories/tagRepo");


exports.showTagsManage = async (req, res, next) => {
try {
    const tags = await tagRepo.findAll();

    return res.render('/p-admin/tag.ejs', {tags});
} catch (err) {
    next(err);
}
};

exports.showCreateArticle = async (req, res, next) => {
    try {
        const tags = await tagRepo.findAll();


        return res.render('p-admin/createArticle.ejs', {tags});
    } catch (err) {
        next(err);
    }
};