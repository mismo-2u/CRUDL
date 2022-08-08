
function onInit(){
    
    renderFilterByQueryStringParams()
    renderCars()
    renderVendors()
}

function onNextPage(pageNum){
    setPageIdx(pageNum)
    // nextPage()
    renderCars()
}

function renderCars(){  
    var cars = getCars()
    var strHTMLs = cars.map(car =>`
        <article class="car-preview">
            <button class="btn-remove" onclick="onDeleteCar('${car.id}')">x</button>
            <h5>${car.vendor}</h5>
            <h6>Up To <span><br>${car.maxSpeed}</span>KMH</h6>
            <img onerror="this.src='img/fiat.png'" src="img/${car.vendor}.png" alt="car by vendor"><br><hr>
            <button onclick="onReadCar('${car.id}')">Details</button>
            <button onclick="onUpdateCar('${car.id}')">Update</button>
        </article>
    `)
    document.querySelector('.cars-container').innerHTML = strHTMLs.join('')
    renderPagesCount()
}

function renderPagesCount(){
    var numOfPages = getInfoOnPages()
    var strHTML = ''
    if(numOfPages === 0) strHTML = '<h1>No Cars To Present</h1>'
    else{
        for(var i=0;i<numOfPages;i++){
            strHTML += `<button type="button" class="curr-page${i} btn btn-light" onclick="onNextPage(${i})">${i+1}</button>`
        }
    }
    var elPages = document.querySelector('.pages')
    elPages.innerHTML = strHTML

}

function renderVendors(){
    const vendors = getVendors()
    console.log('vendors',vendors);
    const strHTMLs = vendors.map(vendor => `<option>${vendor}</option>`)

    const elVendors = document.querySelector('.filter-vendor-select')
    elVendors.innerHTML += strHTMLs.join('')
}

function onDeleteCar(carId){
    deleteCar(carId)
    renderCars()
    flashMsg(`Car Deleted`)
}
function onAddCar(){
    var vendor = prompt('Vendor?')
    if(vendor !== undefined){
        const car = addCar(vendor)
        renderCars()
        flashMsg(`Car Added (id:${car.id})`)
    }
}
function onUpdateCar(carId){
    const car = getCarById(carId)
    var newSpeed = prompt(`Speed?`, car.maxSpeed)
    if(newSpeed && car.maxSpeed !== newSpeed){
        const car = updateCar(carId, newSpeed)
        renderCars()
        flashMsg(`Speed Updeted To: ${car.maxSpeed}`)
    }
}

function onReadCar(carId){
    // debugger
    var car = getCarById(carId)
    var elModal = document.querySelector('.modal1')
    elModal.querySelector('h3').innerText = car.vendor
    elModal.querySelector('h4 span').innerText = car.maxSpeed
    elModal.querySelector('p').innerText = car.desc
    elModal.classList.add('open')
    console.log('elModal',elModal)
}

function onSetFilterBy(filterBy){
    setCarFilter(filterBy)
    renderCars()
}

function onCloseModal(){
    document.querySelector('.modal1').classList.remove('open')
    // renderCars()
}
function flashMsg(msg){
    const el = document.querySelector('.user-msg')
    el.innerText = msg
    el.classList.add('open')
    setTimeout(()=>{el.classList.remove('open')},3000)
}
function renderFilterByQueryStringParams(){
    const queryStringParams = new URLSearchParams(window.location.search)
    const filterBy = {
        vendor: queryStringParams.get('vendor') || '',
        minSpeed: +queryStringParams.get('minSpeed') || 0
    }

    if(!filterBy.vendor && !filterBy.minSpeed) return

    document.querySelector('.filter-vendor-select').value = filterBy.vendor
    document.querySelector('.filter-speed-range').value = filterBy.minSpeed
    setCarFilter(filterBy)
}

function onSetSortBy(){
    const prop = document.querySelector('.sort-by').value
    const isDesc = document.querySelector('.sort-desc').checked
    const sortBy = {}
    sortBy[prop] = (isDesc)? -1 : 1

    setCarSort(sortBy)
    renderCars()
}