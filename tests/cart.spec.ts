import {test,expect} from '@playwright/test';
import * as product from '../pages/product'
import * as cart from '../pages/cart'

test("should add item to cart", async ({page})=>{

    await page.goto("/products")

    const addedProduct = await product.addProductToCart(1,page)

    //await page.pause()
    
    const cartButton = await page.locator("[data-test-id='header-cart-button']").getByRole("button")
    await cartButton.click()
  
    await cart.assertProduct(page,addedProduct.name || "")

    const subtotal = await cart.getSubTotal(page)

    console.log("Subtotal:", subtotal)
    console.log("Added Product Price:", addedProduct.price);

   
    //assert subtotal
    await expect(subtotal).toBe(addedProduct.price)
    //console.log("Expected Subtotal:", expectedSubTotal);
    //console.log("Expected Product Price:", expectedProductPrice);

})