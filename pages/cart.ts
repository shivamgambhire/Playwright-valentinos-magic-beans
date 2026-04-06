import {expect,  type Page } from "@playwright/test"

export async function assertProduct(page: Page, heading: string) {
  const cartItemName = await page.getByRole("heading",{
        /**productName?.trim()

        Optional chaining:
        If productName exists → trim spaces
        If null/undefined → return undefined (no crash) */
        name:heading?.trim() || ""  
        
        /** Meaning:
            “Trust me, this will never be null or undefined” */   
        //name:productName!
    })
    

    const cartItemNameText = await cartItemName.textContent()

    await expect(cartItemName).toBeVisible()
    
}

export async function getSubTotal(page: Page) {

    const subTotalWrapper = await page.getByText("Subtotal").locator("..").locator(".font-semibold")
    const subTotal = await subTotalWrapper.textContent()

    //console.log("Subtotal Text:", subTotal)
    return Number(subTotal?.substring(1)) // Remove the currency symbol and convert to number   

}