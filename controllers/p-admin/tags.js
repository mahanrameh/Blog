const tagRepo = require("./../../repositories/tagRepo");


exports.showTagsManage = async (req, res, next) => {
try {
    const tags = await tagRepo.findAll();

    return res.render('/p-admin/tag.ejs', {tags});
} catch (err) {
    next(err);
}
};