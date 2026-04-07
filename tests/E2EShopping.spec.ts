import { test, expect } from '@playwright/test';
import * as product from '../pages/product'
import * as cart from '../pages/cart'
import * as checkOut from '../pages/checkOut'

test("should add item to cart", async ({ page }) => {

    await page.goto("/products")

    const addedProduct = await product.addProductToCart(1, page)


    const cartButton = await page.locator("[data-test-id='header-cart-button']").getByRole("button")
    await cartButton.click()

    await cart.assertProduct(page, addedProduct.name || "")

    const subtotal = await cart.getSubTotal(page)

    await expect(subtotal).toBe(addedProduct.price)

    await page.getByRole("button", {
        name: "Proceed to Checkout"
    }).click()

    await checkOut.contactInformation(page)
    await checkOut.shippingAddress(page)
    await checkOut.paymentInformation(page)

    //const total = await page.locator(".font-bold.text-lg").nth(2).textContent()
    //const totalAmount = Number(total?.substring(1))
    //await console.log("Total Amount:", totalAmount)

    await page.getByRole("button", {
        name: "Place Order"
    }).click()

    await checkOut.trackOrder(page)

    //const statusMessage = await page.getByText("Order Details").locator("..").textContent()
    //await expect(statusMessage).toContain("Thank you for your order! Here is a summary of your purchase.")

    const firstorder = await page.getByText(addedProduct.name || "")
    await expect(firstorder).toBeVisible()

})