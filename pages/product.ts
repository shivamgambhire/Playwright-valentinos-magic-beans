import { type Page } from "@playwright/test"

export async function addProductToCart(index: number, page:Page){

    const productWrapper =await page.locator(".p-6").nth(index)

    const productName = await productWrapper.locator("h3").textContent()
    const productPrice = await productWrapper.locator(".font-bold").textContent()

    //console.log(productName,productPrice)

    const addToCartButton = await productWrapper.getByRole("button",{
        name:"Add to cart"
    })
    await addToCartButton.click()

    return {
        name: productName,
        price: Number(productPrice?.substring(1)) // Remove the currency symbol and convert to number
    }

}