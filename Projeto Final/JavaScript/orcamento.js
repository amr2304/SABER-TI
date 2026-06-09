const SUPABASE_URL = "https://rvlvrxanqhhvrikdojxf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_C7DX2jQep57xHIu86zu0-g_BmCTlkNQ";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function orcamento(evento){
    evento.preventDefault(); //para não dar reset na página 

    const orcamentoid = Number(document.getElementById("orcamentoid").value);
    const orcamentoitemid =  Number(document.getElementById("orcamentoitemid").value);
    const produtoid =  Number(document.getElementById("produtoid").value);
    const produtodesc = document.getElementById("produtodesc").value;
    const qt_produto =  Number(document.getElementById("qt_produto").value);
    const vl_unitario = Number(document.getElementById("vl_unitario").value);
    const vl_total =  Number(document.getElementById("vl_total").value);

}