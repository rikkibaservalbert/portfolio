const text =
"Modern Portfolio • Technology • Creativity";

let i = 0;

function typeWriter(){

    if(i < text.length){

        document.getElementById("typing").innerHTML +=
        text.charAt(i);

        i++;

        setTimeout(typeWriter,50);
    }
}

typeWriter();

document.getElementById("year").textContent =
new Date().getFullYear();

const toggleBtn =
document.getElementById("themeToggle");

toggleBtn.addEventListener("click",()=>{

document.body.classList.toggle("light-mode");

if(document.body.classList.contains("light-mode")){

toggleBtn.textContent="☀️ Light";

localStorage.setItem("theme","light");

}else{

toggleBtn.textContent="🌙 Dark";

localStorage.setItem("theme","dark");

}

});

if(localStorage.getItem("theme")==="light"){

document.body.classList.add("light-mode");

toggleBtn.textContent="☀️ Light";

}else{

toggleBtn.textContent="🌙 Dark";

}