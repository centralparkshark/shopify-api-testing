// import express from 'express'
// import Shopify from 'shopify-api-node'
// import dotenv from 'dotenv'
// import tamData from './tam.js'

// const app = express()
// dotenv.config()

// const shopify = new Shopify({
//     shopName: 'vmillerstocksync',
//     apiKey: process.env.API_KEY,
//     password: process.env.ADMIN_ACCESS_TOKEN
// })

// const PORT = 3030

// app.get('/', (req, res) => {
//     res.send('<h1>App is running..</h1>')
// })



// app.listen(PORT, () => {
//     console.log(`Server is running at port ${PORT}...`)
// })


/*Fetch All Products*/
// async function fetchProducts() {
//     try {
//         const products = await shopify.product.list()
//         console.log(products)
//     } catch (error) {
//         console.error(error)
//     }
// }

// app.get('/products', async(req,res) => {
//     await shopify.product
//     .list({limit : 5})
//     .then((products) => res.send(products))
//     .catch((err) => console.error(err))
// })

// untested update
// app.get('/products/:sku', (req,res) => {
//     shopify.product
//     .update(params.sku, {
//        stock: 4,        
//     })
//     .then(product => res.send(product))
//     .catch((err) => console.error(err))
// })

/*Create New Product*/
// const newProduct = {
//     title: 'Book',
//     body_html: 'test djgsjdlgls',
//     vendor: 'Jackson',
//     status: 'draft',
//     variants: [
//         {
//             option1: "default",
//             price: 10,
//         }        
//     ]
// }

// const productWithVariants = {
//     title: 'HHC Crewneck2',
//     body_html: 'sweter',
//     vendor: 'Jackson',
//     variants: [
//         {
//             option1: "L",
//             option2: "Gray",
//             sku: 15670,
//         },
//         {
//             option1: "S",
//             option2: "Gray",
//             sku: 15668,
//         },
//         {
//             option1: "L",
//             option2: "Red",
//             sku: 15675,
//         },
//         {
//             option1: "S",
//             option2: "Red",
//             sku: 15673,
//         }
//     ],
//     options: [
//         {
//             name: "Size",
//             // values: [
//             //     "XS", "S", "M", "L", "XL", "2XL", "3XL"
//             // ]
//         },
//         {
//             name: "Color",
//             // values: [
//             //     "Gray", "Red"
//             // ]
//         }
//     ]
// }

// shopify.product.create(productWithVariants)
// .then(response => {
//     console.log(("Product created!", response))
// })
// .catch(error => console.error(error))

// shopify.product.create(productWithVariants)
// .then(response => {
//     console.log(("Product created!", response))
// })
// .catch(error => console.error(error))

// to upload 1 item, no biggie
// limit 40hits/minute
// create csv file and upload that to add a lot of items
// fetch data from tam db, reorganize in newProduct, and then create on shopify
async function findItem(sku) {
    try {
        const item = await shopify.product.list({sku:sku})
        console.log(item)
    } catch (error) {
        console.error(error)
    }
}


async function updateItem(sku){
    // use sku to get product id
    const item = await findItem(sku)
    const tamInfo = tamData(22189)
    const updatedVariant = {
        stock: tamInfo.qty
    }
    try {
        const response = await shopify.productVariant.list(sku)
        console.log('Product Variants:', response)
    } catch (error) {
        console.error(error)
    }
}

//updateItem(9541667029239)
//findItem(22189)

// Matching 
// console.log(tamData(22189))
// console.log(tamData(22125))
// console.log(tamData(22351))
// console.log(tamData(15670))

