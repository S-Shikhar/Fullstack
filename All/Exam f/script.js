const body = document.getElementById("body");
const email = document.getElementById("email");
const pass = document.getElementById("pass");
const sub = document.getElementById("sub");
const dis = document.getElementById("dis");
const divl = document.querySelector(".login");
function disemail(){
    let gmail = email.value;
    let passw = pass.value;
    dis.innerText = `Email: ${gmail}  \n Password: ${passw}`;
    // body.createElement("div");
    // alert("Email: " + gmail);
    divl.style.backgroundColor = "red";

}

sub.addEventListener("mouseover", disemail);

sub.addEventListener("mouseout", () => {
    divl.style.backgroundColor = "";
    dis.innerText = "";
});

let fun = async function datahandle(){
    console.log("hello")
    try{
        let load = await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Please Wait for a second ...")
            }, 1000);
        });
        console.log("hello from load")
        let get = await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Data fetched from the database")
            }, 5000);
        });
        console.log("hello from get");
        
        console.log(get);
        console.log(load);

    } catch(err) {
        console.log("Error found");
    }
}

fun();