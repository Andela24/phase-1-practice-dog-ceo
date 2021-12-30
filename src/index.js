console.log('%c HI', 'color: firebrick')

//on page load, fetches the images using the url above ⬆️
//parses the response as JSON

const container = document.querySelector('#dog-image-container')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const ulContainer = document.getElementById('dog-breeds')
const dropDown = document.querySelector("#breed-dropdown")
let breedsArray = []

//handling events
ulContainer.addEventListener('click', handleClick)
dropDown.addEventListener('change', handleChange)


function getImages(){
    fetch(imgUrl)
    .then(response => response.json())
    .then(images => {
        const imgs = images.message
        //take this array of images
        //turn into img element
        let imgsArray = createImgElement(imgs)
        renderImg(imgsArray)

    })
}
//append img to DOM
function createImgElement(imgs){
   return imgs.map((img) => {
       let i = `<img src=${img}>`
       return i
   })
}
//rendering each element to the DOM
function renderImg(imgsArray) {
    imgsArray.forEach(element => {
        renderElement(element)
    })
}

function renderElement(element) {
    ulContainer.innerHTML += element
}

//on page load, fetches all the dog breeds using the url 
//adds the breeds to the page in the <ul> provided in index.html

function getBreeds(){ 
    fetch(breedUrl)
    .then(response => response.json())
    .then(breeds => {
        breedsArray = Object.keys(breeds.message)
        const breedsLis = createLiElement(breedsArray)
        renderLis(breedsLis)
    })
}

//create a new Li and append list to the DOM
function createLiElement(breedsArray) {
    return breedsArray.map((breeds) => {
    let li = `<li>${breeds}</li>`
    return li
    })
    }

//append each Li to DOM
function renderLis(breedsLis) {
breedsLis.forEach(element => {
    renderElement(element)
})
}

//handling a click and changing the font color
function handleClick(event) {
    if(event.target.nodeName === 'LI') {
        if(event.target.style.color === 'red') {
            event.target.style.color = 'black'
        } else {
            event.target.style.color = 'red'
        }
    }
    
}

//selecting by first letter
function handleChange(event) {
    const letter = event.target.value
   //filter out the breeds that start with the letter
    const filteredBreeds = breedsArray.filter(breed => breed.startsWith(letter))
    const filteredBreedLis = createLiElement(filteredBreeds)
    ulContainer.innerHTML = ''
    renderLis(filteredBreedLis)
}

document.addEventListener('DOMContentLoaded', () => {
    getImages()
     getBreeds()
})

