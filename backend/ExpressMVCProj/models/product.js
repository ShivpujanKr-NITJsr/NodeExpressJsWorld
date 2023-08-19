// const products = []
const path = require('path');
const fs = require('fs')

const getProductsFromFile = cb => {
    const p = path.join(
        path.dirname(process.mainModule.filename),
        'data',
        'products.json'
    );
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent))
        }

    })
}

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        const p = path.join(
            path.dirname(process.mainModule.filename),
            'data',
            'products.json'
        );
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                if (err) {
                    console.error("Error writing file:", err);
                }
            });
        })

    }

    // save(){
    //     products.push(this)
    // }

    static fetchAll(cb) {

        getProductsFromFile(cb);

    }
}