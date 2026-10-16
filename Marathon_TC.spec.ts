import {expect, test } from "@playwright/test";

test('PVR Cinems Ticket Booking : ', async ({page}) => {
   //launch browser and open website 
    await page.goto('https://www.pvrcinemas.com/')
    await page.waitForLoadState('domcontentloaded')

    //Verify the Title of the page
    const Title = await page.title()
    console.log(Title);
    await expect(Title).toBe('PVR Cinemas')


    //select city as Pune
    await page.locator('.show-desktop-view').click()
    await page.locator('text=Pune').click()

    //Choose cinema from the available list
    await page.locator('.cinemas-inactive').click()
    await page.waitForTimeout(3000)
    await page.locator("//span[text()='Select Cinema']").click()
     await page.waitForTimeout(3000)
    await page.locator("//span[text()='PVR Market City Pune']").click()

    
    //Select movie date
    await page.locator("//span[text()='Tomorrow']").click()
    await page.waitForTimeout(2000)
    


    //Choose any available movie
    await page.locator("//span[text()='Select Movie']").click()
    await page.locator("//span[text()='Select Movie']").click()
    await page.locator("(//span[text()='WHALEFALL'])[3]").click()


    //Select available show time 
    await page.locator("//span[text()='06:35 PM']").click()
   // await page.waitForTimeout(3000)

    
    //Click on Book button 
    //await page.locator('text=Book').click()
    await page.getByLabel('Submit',{exact:true}).click();
    //await page.waitForTimeout(2000)

    //Click on Accept for Terms & Conditions
    await page.getByText('Accept', {exact:true}).click()
    //await page.waitForTimeout(2000)

    //Select the available seat
    await page.locator("//span[@id='QR.PRIME ROWS|C:5']").click();
    //await page.waitForTimeout(2000)

    //Verify seat information and total ticket amount using assertions
    const seat = await page.locator("//span[@id='QR.PRIME ROWS|C:5']").innerText()
    console.log('seat :', seat);
    const selectedseat = await page.locator("//div[@class='select-seat-number']/div").innerText()
    console.log('selectedseat :', selectedseat);
     expect(selectedseat).toContain(seat)
    
   
    const GrandTotal = page.locator("//h6[text()=839.00]")
    await expect(GrandTotal).toHaveText('839.00')


    //Proceed to booking
    await page.getByText('Proceed' , {exact:true}).click()








})