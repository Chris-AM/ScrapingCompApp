const cheerio = require('cheerio');
const axios = require('axios');
const { response, request } = require('express');
const { PCFACTORY } = require('../endpoints/pcFactory');


const extractNotebooks = async () => {
    const url = PCFACTORY.BASE_URL + PCFACTORY.NOTE_BOOKS;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const notebooks = $('div.product-list');
    //console.log('notebooks ===> ', notebooks);
    const notebooksArray = [''];
    for (let i = 0; i < notebooks.length; i++) {
        const notebook = notebooks[i];
        const notebooksDivs = $(notebook).find('div.product');
        for (let j = 0; j < notebooksDivs.length; j++) {
            const notebookDiv = notebooksDivs[j];
            //console.log('notebookDiv ===>', notebookDiv);
            const productRelative = $(notebookDiv).find('div.p-relative');
            //console.log('productRelative ===>', productRelative);
            const productPath = $(productRelative).find('a.product-ab-link').attr('href') || "";
            //console.log('product path ===>', productPath);
            const productPathName = productPath.replace('/producto/', "");
            //console.log('product path name ===>', productPathName);
            notebooksArray.push(productPathName);
        }
    }
    return notebooksArray;
}

const getNotebooksInfo = async (notebookName = '') => {
    const url = PCFACTORY.BASE_URL + PCFACTORY.PRODUCT + notebookName;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const storeId = PCFACTORY.STORE_ID;
    //obtainint id from url
    const notebookId = Number.parseInt(notebookName.substring(0, notebookName.indexOf('-')));
    //removing PcFactory's products wrapper
    let productNameWrapper = $('div.product-single__description-mobile');
    let productImageWraper = $('div.product-single__image-container');
    let productImageUrlWrapper = $(productImageWraper).find('div.product-single__image');
    let productSummaryWrapper = $('div[data-tab="fichatecnica"]');
    let productSummaryTableWrapper = $(productSummaryWrapper).find('div.table');
    let productPriceWrapper = $('div.product-single__price');
    //getting PcFactory's products Info
    let productName = $(productNameWrapper).find('div.paragraph, color-dark-2').text();
    let productImage = PCFACTORY.BASE_URL + $(productImageUrlWrapper).find('img').attr('src');
    let productSummary = $(productSummaryTableWrapper).find('div.table__content, table__content--two-column').text();
    let productPrice = Number.parseInt($(productPriceWrapper).find('meta[itemprop="price"]').attr('content'));
    if (!notebookId || !productName || !productImage || !productSummary) {
        return null;
    }
    const productInfo = {
        storeId,
        notebookId,
        url,
        productName, 
        productImage, 
        productSummary, 
        productPrice
    }
    //console.log('productInfo ===>', productInfo);
    return productInfo;
}

module.exports = {
    extractNotebooks,
    getNotebooksInfo
}