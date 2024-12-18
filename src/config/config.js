const dotenv = require('dotenv');

// কনফিগ ফাইল লোড করা
dotenv.config({path:'./config.env'});

module.exports.PORT = process.env.PORT || 2020;
module.exports.DATABASE_URL = process.env.DB;
module.exports.USER = process.env.USER;
module.exports.PASS = process.env.PASS;
module.exports.JWT_KEY = process.env.JWT;
module.exports.JWT_EXPIRE_TIME = 30 * 24 * 60 * 60;

module.exports.EMAIL_HOST = 'learningcell555@gmail.com';
module.exports.EMAIL_PORT = 25;
module.exports.EMAIL_SECURITY = false;
module.exports.EMAIL_USER = "learningcell555@gmail.com";
module.exports.EMAIL_PASSWORD = 'laie uflt jswj zstx';
module.exports.EMAIL_UN_AUTH = true;

module.exports.WEB_CACHE = false;
module.exports.MAX_JSON_SIZE = "10MB";
module.exports.URL_ENCODE = true;

module.exports.REQUEST_TIME = 20 * 60 * 1000;
module.exports.REQUEST_NUMBER = 2000;
