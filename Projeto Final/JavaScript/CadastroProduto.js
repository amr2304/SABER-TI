const SUPABASE_URL = "https://rvlvrxanqhhvrikdojxf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_C7DX2jQep57xHIu86zu0-g_BmCTlkNQ";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
let produtoEmEdicao = null; // Variável para armazenar o ID do produto em edição

async function salvarProduto(evento){
   evento.preventDefault(); //para não dar um reset na página
const mensagem = document.getElementById("mensagem"); // para as mensagens para saber se cadastrou ou não

 const codProduto = Number(document.getElementById("inputCod").value);
 const catProduto = Number(document.getElementById("inputCategoria").value);
 const dsProduto = document.getElementById("ds_input").value;
 const obsProduto = document.getElementById("inputObs").value;
 const vlVenda = Number(document.getElementById("inputValor").value);
 const dt_cadastro_produto = new Date(document.getElementById("inputData").value);
 const Status = document.getElementById("inputStatus").value;

 const novoProduto ={
  categoriaprodutoid: catProduto,
  ds_produto: dsProduto,
  obs_produto:obsProduto,
  vl_venda_produto:vlVenda,
  dt_cadastro_produto:dt_cadastro_produto,
  status_produto:Status,
 };

 if (produtoEmEdicao) {
    // Modo edição - UPDATE
    const {error} = await supabaseClient
    .from("produto")
    .update(novoProduto)
    .eq("produtoid", produtoEmEdicao);

    if (error){
     mensagem.innerHTML = "Erro ao atualizar o produto: " + error.message;
     mensagem.style.color = "red";
     return;
    }
    
    mensagem.innerHTML = "Produto atualizado com sucesso!";
    mensagem.style.color = "green";
    produtoEmEdicao = null; // Limpa o ID do produto em edição
    document.getElementById("inputCod").disabled = false;
    document.querySelector("button[type='submit']").textContent = "Salvar";
    
 } else {
    // Modo novo - INSERT
    novoProduto.produtoid = codProduto;
    
    const {error} = await supabaseClient 
    .from("produto")
    .insert(novoProduto);

    if (error){
     mensagem.innerHTML = "Erro ao salvar o produto: " + error.message;
     mensagem.style.color = "red";
     return;
    }
    
    mensagem.innerHTML = "Produto salvo com sucesso!";
    mensagem.style.color = "green";
 }
 
 document.querySelector("form").reset();
 carregarProdutos(); // Recarrega a lista de produtos
}

// Função para carregar produtos
async function carregarProdutos() {
    const corpoProdutos = document.getElementById("corpoProdutos");
    corpoProdutos.innerHTML = ""; // Limpa a tabela
    
    const { data, error } = await supabaseClient
        .from("produto")
        .select("*");
    
    if (error) {
        corpoProdutos.innerHTML = "<tr><td colspan='6'>Erro ao carregar produtos: " + error.message + "</td></tr>";
        return;
    }
    
    if (data.length === 0) {
        corpoProdutos.innerHTML = "<tr><td colspan='6'>Nenhum produto cadastrado</td></tr>";
        return;
    }
    
    data.forEach(produto => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${produto.produtoid}</td>
            <td>${produto.ds_produto}</td>
            <td>${produto.categoriaprodutoid}</td>
            <td>R$ ${parseFloat(produto.vl_venda_produto).toFixed(2)}</td>
            <td>${produto.status_produto}</td>
            <td>
                <button onclick="editarProduto(${produto.produtoid})" style="background-color: blue; color: white; padding: 5px 10px; cursor: pointer;">Editar</button>
                <button onclick="excluirProduto(${produto.produtoid})" style="background-color: red; color: white; padding: 5px 10px; cursor: pointer;">Excluir</button>
            </td>
        `;
        corpoProdutos.appendChild(linha);
    });
}

async function editarProduto(id) {
    // 1. Busca o produto no banco usando o ID
    const { data, error } = await supabaseClient
        .from("produto")
        .select("*")
        .eq("produtoid", id)
        .single(); // single() retorna um único registro
    
    if (error) {
        alert("Erro ao carregar produto: " + error.message);
        return;
    }
    
    // 2. Preenche o formulário com os dados do produto encontrado
    document.getElementById("inputCod").value = data.produtoid;
    document.getElementById("inputCod").disabled = true; // Não permite mudar o código
    document.getElementById("inputCategoria").value = data.categoriaprodutoid;
    document.getElementById("ds_input").value = data.ds_produto;
    document.getElementById("inputObs").value = data.obs_produto;
    document.getElementById("inputValor").value = data.vl_venda_produto;
    document.getElementById("inputData").value = data.dt_cadastro_produto;
    document.getElementById("inputStatus").value = data.status_produto;
    
    // 3. Muda o texto do botão de "Salvar" para "Atualizar"
    document.querySelector("button[type='submit']").textContent = "Atualizar";
    
    // 4. Armazena o ID do produto em edição
    produtoEmEdicao = id;
    
    // 5. Rola a página para o topo (para o usuário ver o formulário)
    window.scrollTo(0, 0);
}

// Função para excluir produto
async function excluirProduto(id) {
    if (confirm("Deseja realmente excluir este produto?")) {
        const { error } = await supabaseClient
            .from("produto")
            .delete()
            .eq("produtoid", id);
        
        if (error) {
            alert("Erro ao excluir produto: " + error.message);
            return;
        }
        
        alert("Produto excluído com sucesso!");
        carregarProdutos(); // Recarrega a lista
    }
}

// Carrega os produtos quando a página termina de carregar
window.addEventListener("load", carregarProdutos);