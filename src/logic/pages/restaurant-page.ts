
import { Locator, Page } from "playwright";
import { PageBase } from "./page-base";

const CREATE_NEW_RESTURANT_BUTTON = "//button[contains(text(),'Create new')]";
const POPUP_TITLE = "//h2[contains(text(),'Create new restaurant')]"

// fields
const FIELD_ID = "input#id";
const FIELD_NAME = "input#name";
const FIELD_ADDRESS = "input#address";
const FIELD_SCORE = "input#score";

//close btn
const CLOSE_BTN = "div#close-button";
//submit btn
const SUBMIT_BTN = "//button[normalize-space()='Submit']";
//popup created
const POPUP_CREATED = 'text="Created!"';
const OK_BTN = "//button[contains(text(),'OK')]";
const CHECK_RESTAURANT_LIST = '//tbody/tr';
const DELET_RESTAURANT_LIST = '//button[normalize-space()="X"]'

let el;
let countBefor: any;
let countAfter: any;
let index = new Date().getSeconds() / 1000;
export class RestaurantPage extends PageBase {

    constructor(page: Page) {
        super(page);
    }

    clickreateNewRestaurantButtone = async () => {
        await this.page.click(CREATE_NEW_RESTURANT_BUTTON);
    }
    checkIfTitleInPopupExcit = async () => {
        return await this.page.isVisible(POPUP_TITLE);
    }
    checkIfOkBtnExcist = async () => {
        await this.page.waitForTimeout(3000);
        return await this.page.isVisible(OK_BTN);
    }

    fillField = async () => {
        await this.page.fill(FIELD_ID, '23' + index);
        await this.page.fill(FIELD_NAME, 'Jon');
        await this.page.fill(FIELD_ADDRESS, 'Israel 123');
        await this.page.fill(FIELD_SCORE, '2');

    }
    clickConfirmBtn = async () => {
        await this.page.click(SUBMIT_BTN);
    }
    checkIfPopupCreatedExcist = async () => {
        return await this.page.isVisible(POPUP_CREATED);
    }
    clickOkBtn = async () => {
        await this.page.click(OK_BTN);
    }
    checkResturantIsExist = async () => {
        await this.page.waitForTimeout(3000);
        countBefor = this.page.locator(CHECK_RESTAURANT_LIST);
        console.log('Rest count befor: ', await countBefor.count());
    }
    checkResturantIsExistAfter = async () => {
        // console.log('Rest count befor 1: ', await countBefor.count());
        await this.page.waitForTimeout(3000);
        countAfter = this.page.locator(CHECK_RESTAURANT_LIST);
        console.log('Rest count aftre: ', await countAfter.count());
        if (await countAfter.count() > await countBefor.count()) {
            // why before same after here
            return true
        }
        else return false;

    }
    deleteRestaurant = async () => {
        await this.page.waitForTimeout(3000);
        countBefor = this.page.locator(CHECK_RESTAURANT_LIST);

        if (await countBefor.count() < 0) {
            //need create new
        }
        else {
            console.log('Rest count befor: ', await countBefor.count());
            for (el of await countBefor.elementHandles()) {
                await this.page.waitForTimeout(3000);
                await this.page.click(DELET_RESTAURANT_LIST);
                await this.page.click(OK_BTN)
                await this.page.waitForTimeout(3000);
                break;
            }

        }
        console.log('Rest count after: ', await countBefor.count());
        return true;

    }
    deleteRestaurantAllRestaurants = async () => {
        await this.page.waitForTimeout(3000);
        countBefor = this.page.locator(CHECK_RESTAURANT_LIST);

        if (await countBefor.count() > 0) {

            for (el of await countBefor.elementHandles()) {
                await this.page.waitForTimeout(3000);
                await this.page.click(DELET_RESTAURANT_LIST);
                await this.page.click(OK_BTN)
                await this.page.waitForTimeout(3000);
            }
            return true;
        }
        else {
            return false;
        }
    }
    clickCloseBtn = async () => {
        await this.page.waitForTimeout(3000);
        countBefor = this.page.locator(CHECK_RESTAURANT_LIST);
        await this.page.click(CLOSE_BTN);
        await this.page.waitForTimeout(3000);
        countAfter = await this.page.locator(CHECK_RESTAURANT_LIST);
        if (await countAfter.count() == await countBefor.count()) {
            return true
        }
        else return false;
    }

    clickreateNewRestaurantMaximum = async () => {
        let count1: any;
        while (await this.page.locator(CREATE_NEW_RESTURANT_BUTTON).isEditable()) {
            countBefor = this.page.locator(CHECK_RESTAURANT_LIST);
            console.log('Rest count befor: ', await countBefor.count());
            this.page.click(CREATE_NEW_RESTURANT_BUTTON);

            await this.page.fill(FIELD_ID, '23' + index);
            await this.page.fill(FIELD_NAME, 'Jon');
            await this.page.fill(FIELD_ADDRESS, 'Israel 123');
            await this.page.fill(FIELD_SCORE, '2');

            await this.page.click(SUBMIT_BTN);
            await this.page.click(OK_BTN);
            await this.page.waitForTimeout(2000);

            countBefor = this.page.locator(CHECK_RESTAURANT_LIST);
            console.log('Rest count after: ', await countBefor.count());

        }


    }
}

