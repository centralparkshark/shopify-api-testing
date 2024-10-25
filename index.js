// npm init
// npm install dotenv
// npm i --save shopify-api-node

// import express from 'express'
import Shopify from 'shopify-api-node'
import dotenv from 'dotenv'
// import tamData from './tam.js'

dotenv.config()

const shopify = new Shopify({
    shopName: 'vmillerstocksync',
    apiKey: process.env.API_KEY,
    password: process.env.ADMIN_ACCESS_TOKEN
})

async function fetchProducts(sku) {
    const query = ` query {
        productVariants(first: 5, query: "sku:${sku}") {
            edges {
                node {
                    id
                    title
                    sku
                }
            }
        }
    }`
    try {
        const response = await shopify.graphql(query)
        console.log("response", response)
        const product = response.productVariants.edges;
        console.log(product)
    } catch (error) {
        console.error('Error fetching product', error)
    }
}

fetchProducts("15670")
// fetchProducts('15675')
// fetchProducts(15668)
// fetchProducts(15673)








// const PORT = 3030

// app.get('/', (req, res) => {
//     res.send('<h1>App is running..</h1>')
// })



// app.listen(PORT, () => {
//     console.log(`Server is running at port ${PORT}...`)
// })



// ideas:
// use AI to generate tags, category, type, etc