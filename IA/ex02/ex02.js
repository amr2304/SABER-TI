document.addEventListener('DOMContentLoaded', () => {
    const chkEntrega = document.getElementById('chkEntrega');
    const campoEndereco = document.getElementById('campo-endereco');
    const txtEndereco = document.getElementById('txtEndereco');
    const btnCalcular = document.getElementById('btnCalcular');
    const receiptBox = document.getElementById('recibo');
    const totalValor = document.getElementById('total-valor');
    const resumoEndereco = document.getElementById('resumo-endereco');

    // Controla o surgimento suave do campo de endereço baseado na classe active do CSS
    chkEntrega.addEventListener('change', () => {
        if (chkEntrega.checked) {
            campoEndereco.classList.add('active');
            txtEndereco.focus();
        } else {
            campoEndereco.classList.remove('active');
            txtEndereco.value = ''; // Limpa o campo caso desmarque
        }
    });

    // Calcula os valores selecionados ao clicar no botão
    btnCalcular.addEventListener('click', () => {
        let total = 0;
        const itensSelecionados = document.querySelectorAll('.item-menu:checked');

        // Soma os preços guardados nos atributos data-preco dos itens ativos
        itensSelecionados.forEach(item => {
            total += parseFloat(item.getAttribute('data-preco'));
        });

        // Aplica validação da entrega e adiciona a taxa de R$ 4,00
        if (chkEntrega.checked) {
            const enderecoVal = txtEndereco.value.trim();
            
            if (enderecoVal === '') {
                alert('Por favor, informe seu endereço para prosseguirmos com a entrega.');
                txtEndereco.focus();
                return;
            }
            
            total += 4.00;
            resumoEndereco.innerHTML = `<strong>Entrega em:</strong> ${enderecoVal}`;
            resumoEndereco.style.display = 'block';
        } else {
            resumoEndereco.style.display = 'none';
        }

        // Formata o valor final profissionalmente com padrão de Moeda Real Brasileira (BRL)
        const totalFormatado = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        totalValor.textContent = totalFormatado;

        // Torna a caixa de recibo visível na tela
        receiptBox.style.display = 'block';
    });
});