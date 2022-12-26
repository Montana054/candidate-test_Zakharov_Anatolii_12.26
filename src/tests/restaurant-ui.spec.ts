import { expect } from 'chai';
import { RestaurantPage } from '../logic/pages/restaurant-page';
import { BrowserWrapper } from '../infra/browser/browser';
import configJson from '../../config.json';


describe('UI tests', () => {
    let browser: BrowserWrapper;
    let resturantPage: RestaurantPage;
    let countRes;

    beforeEach('Start browser', async () => {
        browser = new BrowserWrapper();
        resturantPage = await browser.newPage(RestaurantPage, configJson.baseUiUrl);
    })

    afterEach('Close browser', async () => {
        await browser.close();
    })

    it('Validate "Create new Restaurant Popup" opened', async function () {
        await resturantPage.clickreateNewRestaurantButtone();
        let actualResult = await resturantPage.checkIfTitleInPopupExcit();
        expect(actualResult, 'Restaurants popup was not opened').to.be.true;
    })

    it('PT Create new Restaurant', async function () {
        await resturantPage.checkResturantIsExist();
        await resturantPage.clickreateNewRestaurantButtone();
        let actualResult = await resturantPage.checkIfTitleInPopupExcit();
        expect(actualResult, 'Create new restaurant').to.be.true;
        await resturantPage.fillField();
        await resturantPage.clickConfirmBtn();
        actualResult = await resturantPage.checkIfOkBtnExcist();
        expect(actualResult, 'OK').to.be.true;
        await resturantPage.clickOkBtn();
        let countRes = await resturantPage.checkResturantIsExistAfter();
        // expect(countRes).to.be.true;

    })
    it('PT Check Restaurant if exist, delete one', async function () {
        countRes = await resturantPage.deleteRestaurant();
        expect(countRes).to.be.true;
    })
    it('PT Check Restaurant if exist, delete all', async function () {
        countRes = await resturantPage.deleteRestaurantAllRestaurants();
        expect(countRes).to.be.true;

    })

    it('PT check what close btn on popup work and the restaurant does not add', async function () {
        await resturantPage.checkResturantIsExist();
        await resturantPage.clickreateNewRestaurantButtone();
        let actualResult = await resturantPage.checkIfTitleInPopupExcit();
        expect(actualResult, 'Create new restaurant').to.be.true;
        await resturantPage.fillField();
        await resturantPage.clickCloseBtn();
        expect(actualResult).to.be.true;
    })
    // it('NT create new Restaurant "Maximum"', async function () {
    //     await resturantPage.clickreateNewRestaurantMaximum();
    //     await resturantPage.fillField();
    //     await resturantPage.clickConfirmBtn();
    //     await resturantPage.clickOkBtn();

    // })
    // it('NT create new Restaurant with wrong data fill name field "integer"', async function () {

    // })
    // it('NT create new Restaurant with wrong data fill all field with "0"', async function () {

    // })
    // it('NT create new Restaurant with wrong data fill all field with "null"', async function () {

    // })
    // it('NT create new Restaurant "MAXIMUM"', async function () {

    // })

})

