const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


/* Unsplash Api */
const count = 30;
const apiKey ='fQL-W0iD6j4Kjww_j_ytkP_4dhu_3DFMg3kRJ9NTcbQ';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check If all images are loaded function 

function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready = ', ready)
    }
}

// Create helper set attribute function 

function setAttributes (element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key,attributes[key]);
    }
}


// Create Elements For Links & Photos , Add to DOM 

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages)
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })

        // Create <img> for photo 
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })

        //Event Listener, check when each has finished loading

        img.addEventListener('load', imageLoaded);

        // Put img inside a, then put both in image container element

        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}

// Get photos from unsplash API

async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch (error){
        console.log('oops , u have an error', error)
    }
}
// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});
// on load

getPhotos();