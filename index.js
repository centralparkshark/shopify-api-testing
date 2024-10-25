// npm init
// npm install dotenv
// npm i --save shopify-api-node
// npm i axios 

// import express from 'express'
import dotenv from 'dotenv'
import axios from 'axios'
import tamData from './tam.js'

dotenv.config()

// return shopify variant id using tam sku
async function fetchProductBySku(sku) {
    const query = ` query {
        productVariants(first: 1, query: "sku:${sku}") {
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
        const response = await axios.post(
            `https://${process.env.SHOP}.myshopify.com/admin/api/2024-10/graphql.json`,
            {query},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': process.env.ADMIN_ACCESS_TOKEN
                }
            }
        )
        const product = response.data.data.productVariants.edges[0].node
        return (product.id)
    } catch (error) {
        console.error('Error fetching product', error)
    }
}

async function updateItem(sku){
    // use sku to get product id+
    const item = await fetchProductBySku(sku)
    const tamInfo = tamData(sku)

    console.log(item, tamInfo)
    // const updatedVariant = {
    //     stock: tamInfo.qty
    // }
    // try {
    //     const response = await shopify.productVariant.list(sku)
    //     console.log('Product Variants:', response)
    // } catch (error) {
    //     console.error(error)
    // }
}

updateItem(22189)
// fetchProductBySku("15670")
// fetchProductBySku('15675')
// fetchProductBySku(15668)
// fetchProductBySku(15673)








// const PORT = 3030

// app.get('/', (req, res) => {
//     res.send('<h1>App is running..</h1>')
// })



// app.listen(PORT, () => {
//     console.log(`Server is running at port ${PORT}...`)
// })



// ideas:
// use AI to generate tags, category, type, etc