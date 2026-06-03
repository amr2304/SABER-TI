function Calcular() {

    let salarioBruto = [
        Number(document.getElementById("JaneiroBruto").value),
        Number(document.getElementById("FevereiroBruto").value),
        Number(document.getElementById("MarçoBruto").value),
        Number(document.getElementById("AbrilBruto").value),
        Number(document.getElementById("MaioBruto").value),
        Number(document.getElementById("JunhoBruto").value),
        Number(document.getElementById("JulhoBruto").value),
        Number(document.getElementById("AgostoBruto").value),
        Number(document.getElementById("SetembroBruto").value),
        Number(document.getElementById("OutubroBruto").value),
        Number(document.getElementById("NovembroBruto").value),
        Number(document.getElementById("DecembroBruto").value)
    ];

    let desconto = [
        Number(document.getElementById("JaneiroDesconto").value),
        Number(document.getElementById("FevereiroDesconto").value),
        Number(document.getElementById("MarçoDesconto").value),
        Number(document.getElementById("AbrilDesconto").value),
        Number(document.getElementById("MaioDesconto").value),
        Number(document.getElementById("JunhoDesconto").value),
        Number(document.getElementById("JulhoDesconto").value),
        Number(document.getElementById("AgostoDesconto").value),
        Number(document.getElementById("SetembroDesconto").value),
        Number(document.getElementById("OutubroDesconto").value),
        Number(document.getElementById("NovembroDesconto").value),
        Number(document.getElementById("DecembroDesconto").value)
    ];

    let meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril',
        'Maio', 'Junho', 'Julho', 'Agosto',
        'Setembro', 'Outubro', 'Novembro', 'Decembro'
    ];

    let salarioLiquido = [];
    const   
    for (let i = 0; i < 12; i++) {
        salarioLiquido[i] = salarioBruto[i] * desconto[i];
        salarioLiquido[i].innerHtml= `${salarioLiquido}`
        console.log(meses[i] + ": " + salarioLiquido[i]);
    }
}