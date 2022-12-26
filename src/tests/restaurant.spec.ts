import { ApiResponse } from '../infra/rest/api-response'
import { Restaurant } from '../logic/REST/API-Response/get-restaurants-response'
import { expect } from 'chai'

import restaurantsAPI from '../logic/REST/restaurantsAPI'

describe('Restaurants tests', () => {
    before('Reset restaurant server', async () => {
        //Arrange
        await restaurantsAPI.resetServer()
    })

    it('Validate the amount of restaurants', async () => {
        //Act
        const restaurants: ApiResponse<Restaurant[]> = await restaurantsAPI.getRestaurants()

        //Assert
        expect(restaurants.success).to.be.true
        const actualAmount = restaurants.data?.length
        expect(actualAmount).to.equal(3, 'Restaurants amount is not as expected')
    })

    it('Get restaurant by id', async () => {
        //Arrange
        const myNewRest = { address: 'My Addess 1', id: 233, name: 'My Restaurant', score: 2.3 }
        const createResponse = await restaurantsAPI.createRestaurant(myNewRest)

        //Act
        const getByIdResponse = await restaurantsAPI.getRestaurantById(233)

        //Assert
        expect(getByIdResponse.status).to.equal(200)
        expect(getByIdResponse.success).to.be.true
        expect(getByIdResponse.data).to.deep.equal(myNewRest)
    })

    it('Get non exsisting restaurant', async () => {
        //Act
        const getByIdResponse = await restaurantsAPI.getRestaurantById(233)

        //Assert
        expect(getByIdResponse.error).to.equal('restaurant with given id not found')
        expect(getByIdResponse.success).to.be.false
        expect(getByIdResponse.status).to.equal(404)
    })
    it('Create a new restaurant', async () => {
        //Act
        const myNewRest = { address: 'Fiction Street 1', id: 216, name: 'VkusnoITochka', score: 4.3 }
        const successResponse = { success: true }
        const getByIdResponse = await restaurantsAPI.createRestaurant(myNewRest)

        //Assert
        expect(getByIdResponse.success).to.be.true
    })
    it('Edit a given restaurant', async () => {
        //Act
        const newProperty = { address: 'Hashalom 22 Tel Aviv' }

        const getByIdResponse = await restaurantsAPI.updateRestaurantById(216, newProperty)

        //Assert
        expect(getByIdResponse.success).to.be.true
    })
    it('Edit non existing restaurant', async () => {
        //Act
        const newProperty = { address: 'Hashalom 22 Tel Aviv' }

        const getByIdResponse = await restaurantsAPI.updateRestaurantById(576, newProperty)

        //Assert
        expect(getByIdResponse.error).to.equal('restaurant with given id not found')
        expect(getByIdResponse.success).to.be.false
        expect(getByIdResponse.status).to.equal(404)
    })
    it('Delete a restaurant', async () => {
        //Act
        const getByIdResponse = await restaurantsAPI.deleteRestaurantById(216)

        //Assert
        expect(getByIdResponse.success).to.be.true
    })
    it('Delete non existing restaurant', async () => {
        //Act
        const getByIdResponse = await restaurantsAPI.deleteRestaurantById(716)

        //Assert
        expect(getByIdResponse.error).to.equal('restaurant with given id not found')
        expect(getByIdResponse.success).to.be.false
        expect(getByIdResponse.status).to.equal(404)
    })
})
