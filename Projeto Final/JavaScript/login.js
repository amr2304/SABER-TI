const SUPABASE_URL = "https://rvlvrxanqhhvrikdojxf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_C7DX2jQep57xHIu86zu0-g_BmCTlkNQ";

// Cria a conexão entre seu JavaScript e o Supabase
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Função chamada quando o usuário clica no botão Entrar
async function Entrar(evento) {
  // Impede o formulário de recarregar a página automaticamente
  evento.preventDefault();


  const usuario = document.getElementById("inputUsuario").value;
  const senha = document.getElementById("inputSenha").value;

  // Consulta a tabela "usuarios" no Supabase
  const { data, error } = await supabaseClient
    // Define qual tabela será consultada
    .from("usuarios")

    // Seleciona todas as colunas da tabela
    .select("*")

    // Filtra os registros onde a coluna "usuario" é igual ao valor digitado
    .eq("usuario", usuario)

    // Filtra os registros onde a coluna "senha" é igual ao valor digitado
    .eq("senha", senha)

    // Diz que esperamos encontrar apenas um registro
    .single();
    
  // Verifica se deu erro ou se nenhum usuário foi encontrado
  if (error || !data) {
    // Mostra mensagem de erro para o usuário
    alert("Usuário ou senha incorretos!");

    // Para a execução da função
    return;
  }

  // Se chegou aqui, o usuário e a senha foram encontrados no Supabase
  // Redireciona o usuário para a página home.html
  window.location.href = "home.html";
}