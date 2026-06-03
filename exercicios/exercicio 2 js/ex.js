function Par(){
  let i=0;
  const Pares = document.getElementById("Pares");
  const li = document.createElement("li")
  let cont = 0; 
    while (cont < 3 ){
        if ( i % 2 == 0){
           li.innerHTML = `${i}`
           Pares.appendChild(li);
           cont++;
        }
        i++          
    }
}