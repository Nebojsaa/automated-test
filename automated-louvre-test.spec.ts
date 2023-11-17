import { chromium, devices, Browser, BrowserContext, Page } from 'playwright';

async function bookLouvreTicket(date: string, timeslot: string, numAdults: number, numChildren: number) {
  const browser: Browser = await chromium.launch();
  const context: BrowserContext = await browser.newContext();
  const page: Page = await context.newPage();

  try {
    // Navigate to the Louvre website
    await page.goto('https://www.ticketlouvre.fr/louvre/b2c/index.cfm/calendar/eventCode/MusWeb');
    await page.waitForTimeout(5000); // 5 seconds delay

    // As far as I understood test, I need to test functionality of buying a ticket. Today is 17.11.2023 so the date 11.11.2023 is disabled
    await page.click('.ui-icon.ui-icon-circle-triangle-e');
    await page.click('.high_availability > .ui-state-default');
    await page.click('#perf-widget > div.widget-body > ul > li:nth-child(2) > a');
    await page.selectOption('#product-list > div:nth-child(1) > div.col-quantity.js-basket-item-sel > select', numAdults);
    await page.selectOption('#product-list > div:nth-child(3) > div.col-quantity.js-basket-item-sel > select', numChildren);

    await page.waitForTimeout(5000); // 5 seconds delay

    // Click the "Book Now" button
    await page.click('.small-button.next.jq-a-disable.jq-basket-submit.jq-basket-submit-do');
    await page.waitForTimeout(5000); // 5 seconds delay

    // Check the checkbox
    await page.getByClass('.label_checkbox_pair.col-action.js-basket-item-btn').check();

    // Click on "Confirm your order" button 
    await page.locator('#jq-checkout-confirm').click();    

    // Click on "Sign up" button
    await page.getByText('Sign up').click();
    await page.waitForTimeout(5000); // 5 seconds delay
    
    // Fill in the form
    await page.locator("#SurName").fill("Komnenovic");
    await page.locator("#FirstName").fill("Nebojsa");
    await page.locator("#EmailAddress1").fill("n.komnenovic@teamaxess.com");
    await page.locator("#EmailAddress2").fill("n.komnenovic@teamaxess.com");
    await page.locator("#Address3").fill("Linke Weinzeile");
    await page.locator("#ZipCode").fill("1060");
    await page.locator("#City").fill("Vienna");
    await page.selectOption("#Country", "Austria");
    await page.check('#Custom3')
    await page.locator("#Password").fill("Komnenovic");
    await page.locator("#ConfirmPassword").fill("Komnenovic");

    await page.locator(".frc-button").click();

    await page.locator("#jq-user-form-submit")

    // Allow some additional time to simulate different internet speeds
    // Adjust the delay based on the desired speed (e.g., 'slow 3G', 'offline', etc.)
    await page.waitForTimeout(5000); // 5 seconds delay

  } catch (error) {
    console.error(`Error during booking: ${error}`);

  } finally {
    // Close the browser
    await browser.close();
  }
}

// Example usage
const date = '11.11.2023';
const timeslot = '9:30 AM';
const numAdults = 2;
const numChildren = 1;

// Call the function to book tickets
bookLouvreTicket(date, timeslot, numAdults, numChildren);
