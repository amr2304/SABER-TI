function Calcular(){
    const num1 = document.getElementById("num1").value;
    const num2 = document.getElementById("num2").value;

    if (num1 > num2)
        alert(`${num1} é o maior número`)
    else if (num2 > num1)       
        alert(`${num2} é o maior número`)
    else
        alert(  `${num1} e o ${num2} são iguais`)
}