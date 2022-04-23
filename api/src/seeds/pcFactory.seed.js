const cheerio = require('cheerio');
const axios = require('axios');
const {PCFACTORY} = require('../endpoints/pcFactory');


const extractNotebooks = async () => {

    const url = PCFACTORY.BASE_URL + PCFACTORY.NOTE_BOOKS;
    const {data} = await axios.get(url);
    const $ = cheerio.load(data);
    const notebooks = $('div.product-list');
    //console.log('notebooks ===> ', notebooks);
    const notebooksArray = ["name"];
    for(let i = 0 ; i < notebooks.length; i++){
        const notebook = notebooks[i];
        const notebooksDivs = $(notebook).find('div.product');
        for(let j = 0; j < notebooksDivs.length; j++){
            const notebookDiv = notebooksDivs[j];
            //console.log('notebookDiv ===>', notebookDiv);
            const productRelative = $(notebookDiv).find('div.p-relative');
            //console.log('productRelative ===>', productRelative);
            const productPath = $(productRelative).find('a.product-ab-link').attr('href');
            //console.log('product path ===>', productPath);
            const productPathName = productPath.replace('/producto/', "");
            //console.log('product path name ===>', productPathName);
        }
        
    }
    return notebooksArray;
}

module.exports = {extractCategories: extractNotebooks};