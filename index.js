// npm init
// npm install dotenv
// npm i --save shopify-api-node
// npm i axios 

// import express from 'express'
import dotenv from 'dotenv'
import axios from 'axios'
import tamData from './tam.js'

dotenv.config()

async function getResponse(query) {
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
    return response;
}

// return shopify variant id using tam sku
async function fetchProductBySku(sku) {
    const query = ` query {
        productVariants(first: 1, query: "sku:${sku}") {
            edges {
                node {
                    id
                    title
                    sku
                    inventoryItem {
                        id
                    }
                }
            }
        }
    }`
    try {
        const response = await getResponse(query)
        const product = response.data.data.productVariants.edges[0].node
        return (product)
    } catch (error) {
        console.error('Error fetching product', error)
    }
}

async function updateItemQty(sku){
    // use sku to get product id+
    const item = await fetchProductBySku(sku)
    const itemID = item.id
    const inventoryID = item.inventoryItem.id
    // change location to correct id
    const location = "gid://shopify/Location/96155828471"
    const tamInfo = tamData(sku)

    // tamInfo.qty for stock
    const query = `mutation {
    inventorySetQuantities(input: {
      ignoreCompareQuantity: true
      name: "available"
      reason: "correction"
      quantities: [
        {
          inventoryItemId: "${inventoryID}"
          locationId: "${location}"
          quantity: ${Math.floor(tamInfo.qty * 0.1)}
        }
      ]
    }) {
      userErrors {
        field
        message
      }
    }
  }`
  try {
    const response = await getResponse(query)
    // const product = response.data.data.productVariants.edges[0].node
    console.log (response.data)
    } catch (error) {
        console.error('Error updating product', error)
    }

}

// updateItemQty(22189)
// updateItemQty(15670)
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
// when creating new object make sure tracked is set to true
// use AI to generate tags, category, type, etc
// need to figure out batch updates to reduce api calls