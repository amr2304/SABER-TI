function Mostrar() {
    let i = 1
    const lista = document.getElementById("Lista");

    for (i = 1; i < 11; i++) {
        if (i % 2 != 0) {
            const li = document.createElement("li");
            li.innerHTML = `${i}`
            lista.appendChild(li)
            console.log(i)
        }
    }
}


function Mostrar2() {
    let i = 1
    const lista2 = document.getElementById("Lista2");

    while (i < 11) {
        if (i % 2 != 0) {
            const li2 = document.createElement("li");
            li2.innerHTML = `${i}`
            lista2.appendChild(li2)
            console.log(i)
        }
        i++
    }

}


function Mostrar3() {
    let i = 1
    const lista3 = document.getElementById("Lista3");

    do {
        if (i % 2 != 0) {
            const li3 = document.createElement("li");
            li3.innerHTML = `${i}`
            lista3.appendChild(li3)
            console.log(i)
        }
        i++;
    }
    while (i < 11);
}

