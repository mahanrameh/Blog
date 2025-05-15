const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepo = require("./../repositories/userRepo");
const configs = require("./../configs");



exports.showRegisterView = (req, res) => {
    res.render('register.ejs');
};

exports.register = async (req, res, next) => {
    try {
        const {name, password, username, email} = req.body;


        const hashedPassword = await bcrypt.hash(password, 12);


        const user = userRepo.create({
            name, 
            password: hashedPassword, 
            username, 
            email
        });


        const accessToken = jwt.sign(
            {id: user.id, role: user.role},
            configs.auth.accessTokenSecretKey,
            {expiresIn: configs.auth.accessTokenExpireTime + 'S'}
        );
        const refreshToken = jwt.sign(
            {id: user.id, role: user.role},
            configs.auth.refreshTokenSecretKey,
            {expiresIn: configs.auth.refreshTokenExpireTime + 'S'}
        );

        const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);

        res.cookie('access-token', accessToken, {
            maxAge: 900000,
            httpOnly: true
        });
        res.cookie('refresh-token', hashedRefreshToken, {
            maxAge: 900000,
            httpOnly: true
        });


        req.flash('success', 'signed up successfully');

    
        return res.redirect('/auth');
        

        return res.status(201).json({
            accessToken,
            refreshToken: hashedRefreshToken
        });

    } catch (err) {
        next(err);
    }


};

exports.showLoginView = (req, res) => {
    res.render('login.ejs');
};

exports.login = async (req, res, next) => {
    const {username, password} = req.body;


    const user = await userRepo.findByUsername(username);
    if (!user) {
        req.flash('error', 'Invalid username or password');

        return res.redirect('/auth/login');

        
        return res.status(401).json({
            message: 'Invalid username or password'
        });
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        req.flash('error', 'Invalid username or password');

        return res.redirect('/auth/login');

        return res.status(401).json({
            message: 'Invalid username or password'
        }); 
    }


    const accessToken = jwt.sign(
        {id: user.id, role: user.role},
        configs.auth.accessTokenSecretKey,
        {expiresIn: configs.auth.accessTokenExpireTime + 'S'}
    );
    const refreshToken = jwt.sign(
        {id: user.id, role: user.role},
        configs.auth.refreshTokenSecretKey,
        {expiresIn: configs.auth.refreshTokenExpireTime + 'S'}
    );

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);

    res.cookie('access-token', accessToken, {
        maxAge: 900000,
        httpOnly: true
    });
    res.cookie('refresh-token', hashedRefreshToken, {
        maxAge: 900000,
        httpOnly: true
    });


    req.flash('success', 'signed in successfully');

    
    return res.redirect('/auth');
    
    
    return res.status(201).json({
        accessToken,
        refreshToken: hashedRefreshToken
    });
};

exports.refresh = async (req, res, next) => {

};

exports.getMe = async (req, res, next) => {

};

exports.logout = async (req, res, next) => {

};