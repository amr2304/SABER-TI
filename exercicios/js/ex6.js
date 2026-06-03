
function Calcular(){
    const idade1 = Number(document.getElementById("idade1").value);
    const idade2 = Number(document.getElementById("idade2").value);
    const idade3 = Number(document.getElementById("idade3").value);
    const idade4 = Number(document.getElementById("idade4").value);
    
    let media = (idade1+idade2+idade3+idade4) /4;
     const item  = document.getElementById("item");   // pego o id do ul     
     const resultado = document.createElement("li")   // crio o li 
     resultado.innerHTML = `a media é ${media}`
     item.appendChild(resultado)  
};                              