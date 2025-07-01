const userRepo = require("./../repositories/userRepo");
const articleRepo = require("./../repositories/articleRepo");


exports.home =  async (req, res) => {

    const userId = req.user?.id;

    let user = null;

    if (userId) {
        user = await userRepo.findById(userId);
    }


    const articles = await articleRepo.findAll();


    res.render('index.ejs', {
        user,
        articles
    });
};

exports.search = async (req, res) => {
    const searchValue = req.query.q;

    const articles = await articleRepo.searchInArticle(searchValue);

    return res.render('search.ejs', {
        articles,
        searchValue
    });
};
