function Calculo(){
    const nota1 = Number(document.getElementById("nota1").value);
    const nota2 = Number(document.getElementById("nota2").value);
    const nota3 = Number(document.getElementById("nota3").value);
    const nota4 = Number(document.getElementById("nota4").value);
    const faltas = Number(document.getElementById("faltas").value);
    
   let media = (nota1+nota2+nota3+nota4)/4;
    const status = document.getElementById("status")
   if ( media < 6 || faltas > 20)
    status.innerHTML=`Aluno reprovado ${media}`
   else if (media > 5.9 && faltas < 20 )
    status.innerHTML=`Aluno aprovado ${media}`
   else if ( media > 5.9 && faltas > 20)
     status.innerHTML=`Aluno reprovado ${media}`
    else if (media < 6 && faltas < 20)
     status.innerHTML=`Aluno reprovado ${media}`
    
}