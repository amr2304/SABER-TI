const SUPABASE_URL = "https://rvlvrxanqhhvrikdojxf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_C7DX2jQep57xHIu86zu0-g_BmCTlkNQ";

// Cria a conexão entre seu JavaScript e o Supabase
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function SalvarCategoria(evento){
     evento.preventDefault(); //para não dar um reset na página 
     
     const ds_categoria = document.getElementById("CategoriaInput").value;
     const produtoid = document.getElementById("CodInput").value;
     const mensagem = document.getElementById("mensagem");

     const novaCategoria = {
        categoriaprodutoid: produtoid,
        ds_categoria_produto: ds_categoria,
        
     };
     
    const {error} = await supabaseClient 
    .from("categoria_produto")
    .insert(novaCategoria);

    if (error){
     mensagem.innerHTML = "Erro ao salvar a categoria: " + error.message;
     mensagem.style.color = "red";
     return;
    }
    
    mensagem.innerHTML = "Categoria salva com sucesso!";
    mensagem.style.color = "green";
    document.querySelector("form").reset();
}
    
