function Tabuada(){
    const num = Number(document.getElementById("num").value);
    const tabuada = document.getElementById("tabuada") // pega o id do ul 

    for (let i=0 ; i<10; i++){
     const li = document.createElement("li")         //criar uma variável para criar o document.create...
     li.innerHTML = `${num}X${i+1}=${num*(i+1)}`
     tabuada.appendChild(li)
    }
}