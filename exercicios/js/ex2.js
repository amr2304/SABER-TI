function Calcular(){
    const idade = document.getElementById("idade").value;
    if (idade <= 12 ){
        alert("você é uma criança")
    } else if ( idade >= 13 && idade <= 17){
        alert("Adolecente");
    } else if (idade >= 18 && idade <= 59){
        alert("Adulto")
    }
    else{
        alert("Idoso")
    }
}