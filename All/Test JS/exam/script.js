const email = document.getElementById("floatingInput");
const pass = document.getElementById("floatingPassword")
const sub = document.getElementById("sub")

// document.addEventListener("input", e => {
//     console.log(email.value);    
// })

sub.addEventListener("click", e => {
    console.log(email.value);
    console.log(pass.value);
    // window.location.href = "index2.html"
})

