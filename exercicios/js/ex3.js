function Calcular(){
    const nota = document.getElementById("nota").value;
    
    if (nota >= 7){
        alert("aprovado")
    }
    else if (nota < 7 &&  nota >= 5.9){
        alert("recuperação")
    }
    else{
        alert("Reprovado")
    }
}