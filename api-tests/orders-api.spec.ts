import {test, expect} from '@playwright/test';

test('API Test - Post Create Orders', async ({request}) => {

    // Define the payload Data for creating an order
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
                productId: "504",
                quantity: 1
            }
        ]
    }

    // Send a POST request to the /orders endpoint with the order payload
    const orderResponse = await request.post('/orders',{
        data: orderPayload
    })

    await expect(orderResponse.status()).toBe(201)

    const orderResponseBody = await orderResponse.json()
    //console.log(orderResponseBody)

    await expect(orderResponseBody).toHaveProperty('success',true)
    

})