const count = 10
const apiKey = 'D4NjaH1qRIm4EMQ19NYKBGCHu8a4bSKrr4sLK5711xE'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
const imageContainer = document.getElementById("imageContainer")

let ready = false;
let imageLoaded = 0;
let newImages = 0;
let photos = []

function loadingFunc() {
    console.log(imageLoaded)
    imageLoaded++
    if(imageLoaded == newImages) {
        ready = true
    }
}

// Our display assitant function
function assitantFunc(element, attribute) {
    for(const myKey in attribute) {
        element.setAttribute(myKey, attribute[myKey])
    }
}

// displaying images
function displayImages() {
    imageLoaded = 0;
    newImages = photos.length
    photos.forEach((e) => {
        const linkImg = document.createElement("a")
        // linkImg.setAttribute("href", e.links.html)
        // linkImg.setAttribute("target", "_blank")
        assitantFunc(linkImg, {
            href: e.links.html,
            target: "_blank"
        })
        const Img = document.createElement("img")
        // Img.setAttribute("src", e.urls.regular)
        // Img.setAttribute("title", e.description)
        linkImg.appendChild(Img)
        imageContainer.appendChild(linkImg)
        assitantFunc(Img, {
            src: e.urls.regular,
            title: e.alt_description
        })
        Img.addEventListener("load", loadingFunc)
    })
}

// A api fetch api function
async function apiFetch() {
    try {
        const data = await fetch(apiUrl)
        photos = await data.json()
        displayImages()
    }catch (err) {
        // Catching errors
    }
}

window.addEventListener("scroll", (e) => {
   if(window.innerHeight + scrollY >= document.body.offsetHeight - 500 && ready) {
       ready = false;
       apiFetch()
   }
})




apiFetch()