const path = require('path')
// console.log(__dirname)
const rootDir = path.join(__dirname, '../')

exports.addingAllProducts = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
}

exports.addedAllProducts = (req, res, next) => {
    console.log(req.body);
    res.redirect('/shop');
}

exports.contactingUs = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'getCall.html'))
}

exports.onsuccess = (req, res, next) => {
    res.send('Form submitted successfully');
}

exports.shopping = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
}