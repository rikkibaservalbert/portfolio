const text =
"BS Information Technology Student | Future IT Professional";

let i = 0;

function typing() {
    if (i < text.length) {
        document.getElementById("typing").innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, 50);
    }
}

typing();

document.getElementById("year").textContent =
new Date().getFullYear();