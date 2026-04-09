import {test,expect} from "@playwright/test"

test("API test - browse product and create order as guest customer", async ({request}) => {

    // Step 1: Browse products and get the product details
    const productsResponse = await request.get("/products")
    await expect(productsResponse.status()).toBe(200)

    const productsBody = await productsResponse.json()
    expect(productsBody.success).toBe(true)
    expect(Array.isArray(productsBody.data)).toBe(true)

    //Step 2: find first product with stock greater than 0
    const product = productsBody.data
    const availableProduct = product.find((p: any) => p.stock > 0)

    expect(availableProduct).toBeDefined()
    expect(availableProduct.stock).toBeGreaterThan(0)

    const orderPayload = {
        customerDetails: {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            address: "1234 Main St.",
            city: "Rhyolite",
            zipCode: "89003",
            country: "United States"
        },
        items: [
            {
                productId: availableProduct.id,
                quantity: 1
            }
        ]
    }

    const orderResponse = await request.post('/orders',{
        data: orderPayload
    })

    // Assert that the order creation was successful
    await expect(orderResponse.status()).toBe(201)
    await expect(orderResponse.headers()['content-type']).toContain('application/json')
    
    const orderResponseBody = await orderResponse.json()

    console.log("Order is created: " + orderResponseBody.data.orderId)

    await expect(orderResponseBody).toHaveProperty('success',true)

    //validate order responce
    await expect(orderResponseBody).toHaveProperty('data')
    await expect(orderResponseBody).toHaveProperty('success',true)

    //Validate order data structure
    const orderData = orderResponseBody.data
    expect(orderData).toHaveProperty('orderId')
    expect(orderData).toHaveProperty('message','Order created successfully')

    //validate orderId format 
    expect(orderData.orderId.length).toBeGreaterThan(0)
    expect(orderData.orderId).toMatch(/^[A-Z0-9]+$/)

})
    