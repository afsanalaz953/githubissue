console.log("loged in")

document.getElementById("signin-btn").addEventListener("click", function () {
const userName = document.getElementById("input-text")
const inputText = userName.value;
const userPassword = document.getElementById("input-pass")
const inputPassword = userPassword.value;
if (inputText == "admin" && inputPassword == "admin123" ) {
    // alert("login success")
    window.location.assign("home.html");
} else {
    alert ("login failed")
    return;
}
console.log(inputText, inputPassword)

    console.log("click");
})