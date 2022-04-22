const cheerio = require('cheerio');
const axios = require('axios');
const {PCFACTORY} = require('../endpoints/pcFactory');


const extractCategories = async () => {

    const url = PCFACTORY.BASE_URL + PCFACTORY.NOTE_BOOKS;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const categories = [];
    console.log('extractCategories' + $);

}

module.exports = {extractCategories};