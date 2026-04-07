import { Page, expect } from "@playwright/test"

export const testValues = {
    firstName: "Shivam",
    lastName: "Sharma",
    email: "abc@abc.com",
    address: "123 Main St",
    city: "bangalore",
    zipCode: "560068",
    country: "India",
    Payment: {
        nameOnCard: "Shivam Sharma",
        cardNumber: "4242 4242 4242 4242",
        expiryDate: "12/34",
        cvv: "123"
    }

}

export async function contactInformation(page: Page) {

    await page.getByLabel("First Name").fill(testValues.firstName)
    await page.getByLabel("Last Name").fill(testValues.lastName)
    await page.getByLabel("Email").fill(testValues.email)
}

export async function shippingAddress(page: Page) {
    await page.getByLabel("Address").fill(testValues.address)
    await page.getByLabel("City").fill(testValues.city)
    await page.getByLabel("Zip Code").fill(testValues.zipCode)
    await page.getByLabel("Country").fill(testValues.country)
}

export async function paymentInformation(page: Page) {
    await page.getByLabel("Name on Card").fill(testValues.Payment.nameOnCard)
    await page.getByLabel("Card Number").fill(testValues.Payment.cardNumber)
    await page.getByLabel("Expiry (MM/YY)").fill(testValues.Payment.expiryDate)
    await page.getByLabel("CVC").fill(testValues.Payment.cvv)
}

export async function trackOrder(page: Page) {

    const trackingNumber = await page.getByText("Your Order ID is:").locator("..")
    const orderID = await trackingNumber.getByRole("paragraph").nth(1).textContent()

    await page.getByRole('button', {
        name: "Track Your Order"
    }).click()

    //const orderId = await page.getByText("Your Order ID is:").locator("..").textContent()
    await page.getByLabel("Order ID").fill(orderID?.trim() || "")
    await page.getByLabel("Email Address").fill(testValues.email)


    await page.getByRole('button', {
        name: "Track Order"
    }).click()


}