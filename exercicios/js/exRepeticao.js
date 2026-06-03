function Tabuada(){
const num1=Number(document.getElementById("num1").value);
const num2=Number(document.getElementById("num2").value);
const contagem = document.getElementById("contagem");


for (let i=num1; i >= 0; i--){
const li = document.createElement("li");
 li.innerHTML = `${i}`;
 contagem.appendChild(li);
}

const contagem2 = document.getElementById("contagem2");

for (let i=num2; i >= 0; i--){
const li2 = document.createElement("li");
 li2.innerHTML = `${i}`;
 contagem2.appendChild(li2);
}

}   