
async function LoadHeader() {
    console.log("[INFO] LoadHeader called...");
    return fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector("nav").innerHTML = data;
        })
        .catch(error => console.error("[INFO] Error:", error));
}
function DisplayHomePage(){
    console.log("Calling DisplayProductPage")
}
function DisplayDonate(){
    console.log("Calling DisplayDonatePage")
}
function DisplayAboutUs(){
    console.log("Calling DisplayAboutUs")
}
function DisplayEventsPage(){
    console.log("Calling DisplayEventsPage")
}
function DisplayNews(){
    console.log("Calling Community News - Volunteer Connect")
}
function DisplayPrivacyStatement(){
    console.log("Calling Privacy Statement")
}
function DisplayTermsConditions(){
    console.log("Calling Volunteer Terms and Conditions")
}
function DisplayContactUs(){
    console.log("Calling Contact Us")
}
async function Start(){
    console.log("Starting App..");
    console.log(`Current document title: ${document.title}`);

    switch(document.title){
        case "Volunteer Connect":
            DisplayHomePage();
            break;
        case "Donate - Volunteer Connect":
            DisplayDonate();
            break;
        case "About Us":
            DisplayAboutUs();
            break;
        case "Events":
            DisplayEventsPage();
            break;
        case "Community News - Volunteer Connect":
            DisplayNews();
            break;
        case "Contact Us":
            DisplayContactUs();
            break;
        case "Privacy Statement":
            DisplayPrivacyStatement();
            break;
        case "Volunteer Terms and Conditions":
            DisplayTermsConditions();
            break;
        default:
            console.error("No matching case for page title");
            break;
    }
}
window.addEventListener("DOMContentLoaded", () => {
    console.log("Dom fully loaded");
    Start();
})