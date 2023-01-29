let mainColors = localStorage.getItem("color-option");
if (mainColors !== null) {
    document.documentElement.style.setProperty ('--main-color', localStorage.getItem("color-option"));
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");
        if (element.dataset.color === mainColors) {
            element.classList.add("active");
        };
    });
};
 // Random Background option 
let backgroundOption = true;

// variable to control the Interval
let backgroundInterval;

// check if there's local storage random background item 
let backgroundLocalItem = localStorage.getItem("background_option");

// check if random local storage is empty
if (backgroundLocalItem !== null) {
    if (backgroundLocalItem === 'true') {
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }

    // Remove all active class from span
    document.querySelectorAll(".random-span span").forEach(element => {
        element.classList.remove("active");
    });
    if (backgroundLocalItem === 'true') {
        document.querySelector(".random-span .yes").classList.add("active");
    } else {
        document.querySelector(".random-span .no").classList.add("active");
    }
}
// start setting box
document.querySelector(".toggle-rotate .fa-gear").onclick = function() {
    this.classList.toggle("fa-spin");

    document.querySelector(".setting-box").classList.toggle("open");
}
// switch colors
document.querySelectorAll(".colors-list li").forEach (li => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty ('--main-color', e.target.dataset.color);
        // set color on local storage 
        localStorage.setItem("color-option", e.target.dataset.color);

        handleActive(e);

    });     
});

// switch background 
document.querySelectorAll(".random-span span").forEach (span => {
    span.addEventListener("click", (e) => {
        
        // remove active class from all childerns
        handleActive(e);

        if (e.target.dataset.background === 'yes') {
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option", true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    });
});
// end setting box

// select landing page element 
let landingPage = document.querySelector(".landing-page");

// get array of imgs
let imgsArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];



// Function to randomize imgs
function randomizeImgs () {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            // get random img from imgsArray
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            // change background Image Url 
            landingPage.style.backgroundImage = 'url("../images/'+ imgsArray[randomNumber] +'")';  
        }, 3000); 
    };
};
randomizeImgs();

// Select Skills Selector
let ourSkills = document.querySelector(".skills");
let spans = document.querySelectorAll(".skill-progress span");

window.onscroll = function () {
    if (window.scrollY >= ourSkills.offsetTop - 500) {
        spans.forEach((span) => {
            span.style.width = span.dataset.progress;
        })
    } else {
        spans.forEach((span) => {
            span.style.width = "0";
        })
    }
}

// start gallery
// create pop with the image 
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach( img => {
        img.addEventListener("click", (e)=>{
            // create overlay element 
            let overlay = document.createElement("div");
            // add class for overlay
            overlay.className = "popup-overlay";
            // append overlay to the body
            document.body.appendChild(overlay);
     
            // create pop
            let popupBox = document.createElement("div");
            // add class to pop 
            popupBox.className = "popup-box";
            // create the image 
            let popupImage = document.createElement("img");
            // set image source 
            popupImage.src = img.src;
            // add image to the popup box
            popupBox.appendChild(popupImage);
            // append the popup box to the body 
            document.body.appendChild(popupBox);
            // create the span close 
            let closeSpan = document.createElement("span");
            // create the span close text 
            let spanText = document.createTextNode("X");
            // append text to span button
            closeSpan.appendChild(spanText);
            // add class to close button
            closeSpan.className = "close-button"; 
            // add close button to popup box
            popupBox.appendChild(closeSpan);
      })
  
});

document.addEventListener("click", function(e) {
    if (e.target.className == "close-button") {
        // close image popup
        e.target.parentNode.remove();
        // close overlay
        document.querySelector(".popup-overlay").remove();
    }
})

// end gallery

// Start Bullets
// call all bullets
let allBullets = document.querySelectorAll(".nav-bullets .bullet");
// select all Links
let allLinks = document.querySelectorAll(".links a");

function scrollToSomewhere(elements) {
    elements.forEach(ele => {
        ele.addEventListener("click", (e) =>{
            e.preventDefault();

            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth',
            });
        });
    });
}
scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);


function handleActive(ev) {

    // Remove Active Class From All Childrens
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {

        element.classList.remove("active");
    });

    // Add Active Class On Self
    ev.target.classList.add("active");

    }

let bullettsAll = document.querySelectorAll(".bullets-option span");
let bullettsContainer = document.querySelector(".nav-bullets");
let bulletsLoaclStorage = localStorage.getItem("bullets_option");

if (bulletsLoaclStorage !== null) {
    bullettsAll.forEach(span => {
        span.classList.remove("active");
    });
    if (bulletsLoaclStorage === "block") {
        bullettsContainer.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
        bullettsContainer.style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bullettsAll.forEach(bullet => {
    bullet.addEventListener("click", (e) =>{
        if (e.target.dataset.display === "show") {
            bullettsContainer.style.display = "block";
            localStorage.setItem("bullets_option", "block");
        } else {
            bullettsContainer.style.display = "none";
            localStorage.setItem("bullets_option", "none");
        }
        handleActive(e);
    });
});

document.querySelector(".reset-option").onclick = function() {
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets_option"); 
    localStorage.removeItem("color-option");

    window.location.reload();
}

let toggleButton = document.querySelector(".header-area .toggle-menu");
let tLinks = document.querySelector(".header-area .links");

toggleButton.onclick = function(e) {
    e.stopPropagation();
    this.classList.toggle("menu-active");
    tLinks.classList.toggle("open");
}
document.addEventListener("click", (e) => {
    if (e.target !== tLinks && e.target !== toggleButton) {
        if (tLinks.classList.contains("open")) {
            toggleButton.classList.toggle("menu-active");
            tLinks.classList.toggle("open"); 
        }
    }
});
tLinks.onclick = function(e) {
    e.stopPropagation();
}
