let noClicks = 0;
const maxNoClicks = 3; // To represent our 4 gfs
const minNoScale = 0.65;
let noScale = 1;
let yesScale = 1;

// Starting gif
const gifElement = document.getElementById("Asking-gir");

// Handling Yes button and it'scaling
const yesButton = document.getElementById("yes-btn");
const yesButtonstyle = window.getComputedStyle(yesButton);
const maxYesWidth = parseFloat(yesButtonstyle.maxWidth);


const noButton = document.getElementById("no-btn");

const buttonContainer = document.querySelector(".btn-container");

// switching of gifs (in order)//

//Sad, crying, then closeup crying
const gifs =["assests/i-miss-you-cupcake.gif","assests/gir-sadly-crying.gif","assests/gir-crying-closeup.gif"];

// an array of messages for no-btn
const nobtnmessages = ["I think you clicked 'No' by accident", "Wow, really?", "Pumpkin, please !","PLS PLS PLS PLS PLS !"];

// when clicking no button
noButton.addEventListener('click',() => {
    if (noClicks < maxNoClicks){
        // switch gifs
        gifElement.src = gifs[noClicks];
    }

    // change no text (randomly using modluar)
    noButton.textContent = nobtnmessages[noClicks % maxNoClicks];
    
    // adjusting no button text and width
    noButton.style.width = 'auto';
    noButton.style.width = '${noButton.scrollWidth}px'; //passing the new size in css

    // Decrease the size of no button
    if(noScale > minNoScale){
        noScale -= 0.1;
        noButton.style.transform = `scale(${noScale})`; //Updating scale transformation for no button

    }

    // Calculate the width the yes button scale
    const baseWidth = parseFloat(yesButtonstyle.width);
    const scaleWidth = baseWidth * yesScale;

    console.log('Scaled Width: ${scaleWidth}, Max Width: ${maxYesWidth}');

    // Check if scaled width is less than the maxYesWidth
    if (scaleWidth < maxYesWidth){
        yesScale += 0.5; // Scale by a smaller amount
        yesButton.style.transform = `scale(${yesScale})`;

        //Get the current gap scale from CSS
        const rootStyles = getComputedStyle(document.documentElement)
        const gapScaleFactor = parseFloat(rootStyles.getPropertyValue('--gap-scale-factor')) || 250;

        // Adjusting the gaps dynamically
        const currentGap = parseFloat(buttonContainer.style.gap) || 20;
        const NewGap = Math.sqrt(currentGap * gapScaleFactor);
        buttonContainer.style.gap = '${NewGap}px'; // Passing this as the new value
    }
    // increment the number of time no has been clicked
    noClicks++;
});



