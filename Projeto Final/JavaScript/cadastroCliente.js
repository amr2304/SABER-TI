const SUPABASE_URL = "https://rvlvrxanqhhvrikdojxf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_C7DX2jQep57xHIu86zu0-g_BmCTlkNQ";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


const formCliente = document.getElementById("formCliente");
const tabelaClientes = document.getElementById("tabelaClientes");
const mensagem = document.getElementById("mensagem");


const clienteIdInput = document.getElementById("clienteId");
const tipoClienteInput = document.getElementById("tipoCliente");
const cpfCnpjClienteInput = document.getElementById("cpfCnpjCliente");
const nomeClienteInput = document.getElementById("nomeCliente");

const btnSalvar = document.getElementById("btnSalvar");
const btnCancelarEdicao = document.getElementById("btnCancelarEdicao");

// Mostra uma mensagem na tela.
// O parametro "texto" e a mensagem.
// O parametro "tipo" define a cor pelo CSS: sucesso ou erro.
function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = "mensagem " + tipo;
}

// Transforma o valor salvo no banco em um texto mais facil de entender.
// No banco salvamos apenas F ou J.
function formatarTipoCliente(tipoCliente) {
  if (tipoCliente === "F") {
    return "Pessoa Fisica";
  }

  if (tipoCliente === "J") {
    return "Pessoa Juridica";
  }

  return "Nao informado";
}

// Busca todos os clientes no Supabase e mostra na tabela.
// Como essa funcao conversa com o banco, ela precisa ser async.
async function carregarClientes() {
  // Faz um SELECT na tabela cliente.
  // Escolhemos apenas as colunas que vamos exibir na tela.
  const { data, error } = await supabaseClient
    .from("cliente")
    .select("clienteid, tipo_cliente, cpf_cnpj_cliente, nome_cliente")
    .order("clienteid", { ascending: true });

  // Se o Supabase retornar erro, mostramos o erro e paramos a funcao.
  if (error) {
    tabelaClientes.innerHTML = `
      <tr>
        <td colspan="5">Erro ao carregar clientes.</td>
      </tr>
    `;
    mostrarMensagem("Erro ao buscar clientes: " + error.message, "erro");
    return;
  }

  // Se a consulta funcionou, mas nao voltou nenhum cliente,
  // mostramos uma linha informando que nao existem registros.
  if (data.length === 0) {
    tabelaClientes.innerHTML = `
      <tr>
        <td colspan="5">Nenhum cliente cadastrado.</td>
      </tr>
    `;
    return;
  }

  // Limpa a tabela antes de preencher.
  // Isso evita duplicar linhas quando a listagem for atualizada.
  tabelaClientes.innerHTML = "";

  // Percorre cada cliente retornado pelo Supabase.
  // Para cada cliente, criamos uma linha nova na tabela.
  data.forEach(function (cliente) {
    const linha = document.createElement("tr");

    // Monta as colunas da linha.
    // A ultima coluna fica vazia por enquanto, porque os botoes serao criados abaixo.
    linha.innerHTML = `
      <td>${cliente.clienteid}</td>
      <td>${formatarTipoCliente(cliente.tipo_cliente)}</td>
      <td>${cliente.cpf_cnpj_cliente}</td>
      <td>${cliente.nome_cliente}</td>
      <td class="coluna-acoes"></td>
    `;

    // Cria o botao Editar.
    // Quando clicar nele, os dados do cliente vai para o formulario.
    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";
    botaoEditar.type = "button";
    botaoEditar.className = "btn-editar";
    botaoEditar.addEventListener("click", function () {
      prepararEdicao(cliente);
    });

    // Cria o botao Excluir.
    // Quando clicar nele, chamamos a funcao que apaga o registro no Supabase.
    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.type = "button";
    botaoExcluir.className = "btn-excluir";
    botaoExcluir.addEventListener("click", function () {
      excluirCliente(cliente);
    });

    // Coloca os botoes dentro da coluna de acoes.
    linha.querySelector(".coluna-acoes").appendChild(botaoEditar);
    linha.querySelector(".coluna-acoes").appendChild(botaoExcluir);

    // Adiciona a linha pronta dentro do corpo da tabela.
    tabelaClientes.appendChild(linha);
  });
}

// Salva um novo cliente no Supabase.
async function salvarCliente() {
  // Cria um objeto com os dados digitados no formulario.
  // Os nomes das propriedades precisam ser iguais aos nomes das colunas no banco.
  const novoCliente = {
    tipo_cliente: tipoClienteInput.value,
    cpf_cnpj_cliente: cpfCnpjClienteInput.value.trim(),
    nome_cliente: nomeClienteInput.value.trim()
  };

  // Envia o objeto para a tabela cliente usando INSERT.
  const { error } = await supabaseClient
    .from("cliente")
    .insert(novoCliente);

  // Se der erro, mostramos a mensagem e nao continuamos.
  if (error) {
    mostrarMensagem("Erro ao salvar cliente: " + error.message, "erro");
    return;
  }

  // Se deu certo, avisamos o usuario, limpamos o formulario
  // e recarregamos a tabela para mostrar o novo cliente.
  mostrarMensagem("Cliente salvo com sucesso!", "sucesso");
  formCliente.reset();
  await carregarClientes();
}

// Prepara a tela para editar um cliente ja existente.
// Essa funcao recebe o cliente que veio da linha da tabela.
function prepararEdicao(cliente) {
  // Preenche o formulario com os dados do cliente escolhido.
  clienteIdInput.value = cliente.clienteid;
  tipoClienteInput.value = cliente.tipo_cliente;
  cpfCnpjClienteInput.value = cliente.cpf_cnpj_cliente;
  nomeClienteInput.value = cliente.nome_cliente;

  // Durante a edicao, bloqueamos tipo e CPF/CNPJ.
  // Neste exemplo vamos permitir alterar apenas o nome.
  tipoClienteInput.disabled = true;
  cpfCnpjClienteInput.readOnly = true;

  // Muda o botao principal de "Salvar" para "Atualizar"
  // e mostra o botao de cancelar edicao.
  btnSalvar.textContent = "Atualizar";
  btnCancelarEdicao.style.display = "inline-block";

  mostrarMensagem("Editando cliente: " + cliente.nome_cliente, "sucesso");
}

// Cancela o modo de edicao e volta para o modo de cadastro normal.
function cancelarEdicao() {
  // Limpa o formulario.
  formCliente.reset();

  // Limpa o id para o sistema entender que nao esta mais editando.
  clienteIdInput.value = "";

  // Libera novamente os campos bloqueados.
  tipoClienteInput.disabled = false;
  cpfCnpjClienteInput.readOnly = false;

  // Volta o texto do botao principal e esconde o cancelar edicao.
  btnSalvar.textContent = "Salvar";
  btnCancelarEdicao.style.display = "none";

  // Limpa a mensagem da tela.
  mensagem.textContent = "";
  mensagem.className = "mensagem";
}

// Atualiza o cliente no Supabase.
// Aqui atualizamos apenas o nome.
async function atualizarCliente() {
  // Pega o id do cliente que esta sendo editado.
  const clienteId = clienteIdInput.value;

  // Pega o novo nome digitado.
  const nomeCliente = nomeClienteInput.value.trim();

  // Faz um UPDATE na tabela cliente.
  // O .eq("clienteid", clienteId) garante que so o cliente escolhido sera alterado.
  const { error } = await supabaseClient
    .from("cliente")
    .update({ nome_cliente: nomeCliente })
    .eq("clienteid", clienteId);

  // Se der erro, mostramos a mensagem e paramos.
  if (error) {
    mostrarMensagem("Erro ao atualizar cliente: " + error.message, "erro");
    return;
  }

  // Se deu certo, avisamos, saimos do modo edicao e recarregamos a tabela.
  mostrarMensagem("Cliente atualizado com sucesso!", "sucesso");
  cancelarEdicao();
  await carregarClientes();
}

// Exclui um cliente do Supabase.
// Recebe o cliente inteiro para usar o id e o nome na confirmacao.
async function excluirCliente(cliente) {
  // Antes de apagar, pede confirmacao para evitar exclusao sem querer.
  const confirmou = confirm(
    "Tem certeza que deseja excluir o cliente " + cliente.nome_cliente + "?"
  );

  // Se o usuario cancelar, a funcao para aqui.
  if (!confirmou) {
    return;
  }

  // Faz o DELETE na tabela cliente.
  // O filtro pelo clienteid garante que apenas aquele registro sera apagado.
  const { error } = await supabaseClient
    .from("cliente")
    .delete()
    .eq("clienteid", cliente.clienteid);

  // Se der erro, mostramos a mensagem e paramos.
  if (error) {
    mostrarMensagem("Erro ao excluir cliente: " + error.message, "erro");
    return;
  }

  // Se o cliente excluido estava sendo editado,
  // limpamos o formulario para sair do modo edicao.
  if (clienteIdInput.value == cliente.clienteid) {
    cancelarEdicao();
  }

  // Mostra sucesso e atualiza a tabela.
  mostrarMensagem("Cliente excluido com sucesso!", "sucesso");
  await carregarClientes();
}

// Evento de envio do formulario.
// Ele acontece quando o usuario clica em Salvar ou Atualizar.
formCliente.addEventListener("submit", async function (evento) {
  // Impede a pagina de recarregar sozinha.
  evento.preventDefault();

  // Se existe id no campo clienteId, estamos editando.
  // Se nao existe id, estamos cadastrando um cliente novo.
  if (clienteIdInput.value) {
    await atualizarCliente();
  } else {
    await salvarCliente();
  }
});

// Evento do botao Cancelar edicao.
// Quando clicar nele, volta ao modo de cadastro.
btnCancelarEdicao.addEventListener("click", function () {
  cancelarEdicao();
});

// Quando a pagina abre, ja buscamos os clientes no Supabase.
carregarClientes();
