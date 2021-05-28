function windowSizeCheck() {
    if (window.innerWidth < 350 ) {
        alert("Your device width is less than 330px and website might look weird!"); }

    if (window.innerHeight < 530 ) {
        alert("Your device width is less than 510px and website might look weird!"); }
}

window.onload = (event) => {
    windowSizeCheck();
};