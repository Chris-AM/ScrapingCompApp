const cheerio = require('cheerio');
const axios = require('axios');
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

const getNotebooksInfo = async (notebookName) => {
    const url = PCFACTORY.BASE_URL + PCFACTORY.PRODUCT + notebookName;
    //const devURL = PCFACTORY.BASE_URL + PCFACTORY.PRODUCT + '42840-lenovo-notebook-cloudbook-detachable-ideapad-d330-10-1-hd-celeron-n4020-4gb-ram-64gb-emmc-windows-10--office-home--student-preinstalado-mineral-grey'
    //console.log('url ===> ',url)
    const { data } = await axios.get(url);
    //console.log('data ===> ', data);
    const $ = cheerio.load(data);
    //removing PcFactory's products wrapper
    let productNameWrapper = $('div.product-single__description-mobile');
    let productImageWraper = $('div.product-single__image-container');
    let productImageUrlWrapper = $(productImageWraper).find('div.product-single__image');
    let productSummaryWrapper = $('div[data-tab="fichatecnica"]');
    let productSummaryTableWrapper = $(productSummaryWrapper).find('div.table');
    //getting PcFactory's products Info
    let productName = $(productNameWrapper).find('div.paragraph, color-dark-2').text();
    let productImage = PCFACTORY.BASE_URL + $(productImageUrlWrapper).find('img').attr('src');
    let productSummary = $(productSummaryTableWrapper).find('div.table__content, table__content--two-column').text();
    // console.log('product name ===>', productName);
    // console.log('product image ===>', productImage);
    // console.log('product summary ===>', productSummary);
    if(!productName || !productImage || !productSummary){
        return null;
    }
    const productInfo = {
        url, productName, productImage, productSummary
    }
    //console.log('productInfo ===>', productInfo);
    return productInfo;
}

const loadNotebooks = async () => {
    const extractedNotebooks = await extractNotebooks();
    const notebooksInfoPromises = extractedNotebooks.map(async (notebookName) => {
        const notebookInfo = await getNotebooksInfo(notebookName);
        return notebookInfo;
    }
    );
    const notebooksInfo = await Promise.all(notebooksInfoPromises);
    //console.log('notebooksInfo ===>', notebooksInfo);
    return notebooksInfo;
}

module.exports = { extractNotebooks, getNotebooksInfo, loadNotebooks };