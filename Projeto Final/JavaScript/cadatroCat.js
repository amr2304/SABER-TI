const SUPABASE_URL = "https://rvlvrxanqhhvrikdojxf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_C7DX2jQep57xHIu86zu0-g_BmCTlkNQ";

// Cria a conexão entre seu JavaScript e o Supabase
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function cadastrarProduto(){
    const Categoria = document.getElementById("Categoria").value;
    const Descricao = document.getElementById("inputDesc").value;

    const {data,error} = await supabaseClient 
    .from ("Produto")
    .select("ds_produto")
    .insert("Categoria INTO ds_produto")
    .select("obs_produto")
    .insert("Descricao INTO obs_produto")
    
    }
    
