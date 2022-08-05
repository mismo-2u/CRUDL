'use strict'

const STORAGE_KEY = 'carDB'
const PAGE_SIZE = 5
const gVendors = ['audi', 'fiat', 'suzuki', 'honda']

var gCars
var gFilterBy = {vendor:'', minSpeed:0}
var gPageIdx = 0

_createCars()

function nextPage(){
    gPageIdx++
    if(gPageIdx * PAGE_SIZE >= gCars.length) gPageIdx = 0
}

function getVendors(){
    return gVendors
}

function getCars(){
    var cars = gCars.filter(car => car.vendor.includes(gFilterBy.vendor) && 
        car.maxSpeed >= gFilterBy.minSpeed)
    const startIdx = gPageIdx * PAGE_SIZE
    cars = cars.slice(startIdx, startIdx + PAGE_SIZE)
    return cars
}

function deleteCar(carId){
    const carIdx = gCars.findIndex(car => carId === car.id)
    gCars.splice(carIdx,1)
    _saveCarsToStorage()
}

function addCar(vendor){
    const car = _createCar(vendor)
    gCars.unshift(car)
    _saveCarsToStorage()
    return car
}

function getCarById(carId){
    const car = gCars.find(car => carId === car.id)
    return car
}

function updateCar(carId, newSpeed){
    const car = gCars.find(car => carId === car.id)
    car.maxSpeed = newSpeed
    _saveCarsToStorage()
    return car
}

function _createCar(vendor){
    return {
        id: makeId(),
        vendor,
        maxSpeed: getRandomIntInclusive(50,250),
        desc: makeLorem()
    }
}

function _createCars(){
    var cars = loadFromStorage(STORAGE_KEY)
    if(!cars || !cars.length){
        cars = []
        for(let i=0; i < 21; i++){
            var vendor = gVendors[getRandomIntInclusive(0,gVendors.length-1)]
            cars.push(_createCar(vendor))
        }
    }
    gCars = cars
    _saveCarsToStorage()
}

function setCarSort(sortBy={}){
    if(sortBy.maxSpeed !== undefined){
        gCars.sort((c1,c2)=> (c1.maxSpeed - c2.maxSpeed) * sortBy.maxSpeed) 
    } else if (sortBy.vendor !== undefined){
        gCars.sort((c1, c2)=> c1.vendor.localeCompare(c2.vendor) * sortBy.vendor)
    }
}

function _saveCarsToStorage(){
    saveToStorage(STORAGE_KEY, gCars)
}

function setCarFilter(filterBy={}){
    if(filterBy.vendor !== undefined) gFilterBy.vendor = filterBy.vendor
    if(filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed

    const queryStringParams = `?vendor=${gFilterBy.vendor}&minSpeed=${gFilterBy.minSpeed}`
    const newUrl = window.location.protocol + "//" + window.location.host
    + window.location.pathname + queryStringParams
    
    window.history.pushState({path:newUrl},'',newUrl)
}