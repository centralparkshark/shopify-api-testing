import express from 'express'
import Shopify from 'shopify-api-node'
import dotenv from 'dotenv'


const app = express()
dotenv.config()

const shopify = new Shopify({
    shopName: 'vmillerstocksync',
    apiKey: process.env.API_KEY,
    password: process.env.ADMIN_ACCESS_TOKEN
})

const PORT = 3030




app.get('/', (req, res) => {
    res.send('<h1>App is running..</h1>')
})

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

/*Create New Product*/
// const newProduct = {
//     title: 'Book',
//     body_html: 'test djgsjdlgls',
//     vendor: 'Jackson',
//     status: 'draft'
// }

// shopify.product.create(newProduct)
// .then(response => {
//     console.log(("Product created!", response))
// })
// .catch(error => console.error(error))


app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}...`)
})

