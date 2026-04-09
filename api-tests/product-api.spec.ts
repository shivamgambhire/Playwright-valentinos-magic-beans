import {expect, test} from "@playwright/test"

test("API Test - Get Products", async ({request}) => {
    
    // Send a GET request to the /products endpoint
    const response = await request.get("/products")

    // Parse the response body as JSON
    const responseBody = await response.json()

    console.log(responseBody)

    // Assert that the response status code is 200
    await expect(response.status()).toBe(200)

        
    // Assert that the response headers contain the correct content type
    await expect(response.headers()['content-type']).toContain('application/json')
})