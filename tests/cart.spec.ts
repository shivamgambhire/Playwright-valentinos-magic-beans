import {test,expect} from '@playwright/test';

test("should add item to cart", async ({page})=>{

    await page.goto("/products")
    const product =await page.locator(".p-6").first()

    const productName = await product.locator("h3").textContent()
    const productPrice = await product.locator(".font-bold").textContent()

    //console.log(productName,productPrice)

    const addToCartButton = await product.getByRole("button",{
        name:"Add to cart"
    })
    await addToCartButton.click()

    await page.pause()
    
    const cartButton = await page.locator("[data-test-id='header-cart-button']").getByRole("button")
    await cartButton.click()

    //const cartItemName = await page.locator(".p-6 .font-semibold").first().textContent()
    const cartItemName = await page.getByRole("heading",{
        /**productName?.trim()

        Optional chaining:
        If productName exists → trim spaces
        If null/undefined → return undefined (no crash) */
        name:productName?.trim() || ""  
        
        /** Meaning:
            “Trust me, this will never be null or undefined” */   
        //name:productName!
    })
    const cartItemNameText = await cartItemName.textContent()

    await expect(cartItemName).toBeVisible()
    const cartItemPrice = await page.locator(".p-6 .font-bold").first().textContent()

    //console.log(cartItemNameText,cartItemPrice)
    
    
    const subTotal = await page.getByText("Subtotal").locator("..").locator(".font-semibold")
    const subTotalText = await subTotal.textContent()

    // Remove the currency symbol and convert to number
    const expectedSubTotal = Number(subTotalText?.substring(1)) 
    // Remove the currency symbol and convert to number
    /*
    ?. (Optional Chaining)
        subTotalText?.substring(1)

        Means:
        If subTotalText is not null/undefined, then run substring
        Otherwise → return undefined (no crash) 
    */
    const expectedProductPrice = Number(productPrice?.substring(1)) 

    //assert subtotal
    await expect(expectedSubTotal).toBe(expectedProductPrice)
    //console.log("Expected Subtotal:", expectedSubTotal);
    //console.log("Expected Product Price:", expectedProductPrice);

})