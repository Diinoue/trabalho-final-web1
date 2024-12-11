const form = document.getElementById("cadastroF");
const update = document.getElementById("updateF");

//FRONT END

let emailValidado = false;
    function validateEmail(email) {
        const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        return pattern.test(email);
      }

function validateForm (nome, sobrenome, email, senha, confSenha) {

    let valido = true;

    // VALIDA NOME
    if (nome === "") {
        alert("Preencha esse campo");
        valido = false;
    }    

    // VALIDA SOBRENOME
    if (sobrenome === "") {
        alert("Preencha esse campo");
        valido = false;
    }    

    // VALIDA SENHA
    if (senha.length < 6) {
        alert("Minimo 6 caracteres");
        valido = false;
    }

    // VALIDA CONFIRMAÇÃO SENHA
    if (senha != confSenha) {
        alert("Senha diferente");
        valido = false;
    }


    if (!validateEmail(email)) {
        alert("Email invalido");
        valido = false;
    }
    
    return valido;
}

async function showUsers(){
    fetch('http://localhost:3001/users')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        const [length] = [data];
        for(let i = 0; i < length.length; i++){
            const {id, nome, sobrenome, email, senha} = data[i];
            const container = document.querySelector('.lista');
            
            const linha = document.createElement('div');
            linha.className = 'linha';
            const info = id + " " + nome + " " + sobrenome + " " + email;
            const texto = document.createElement('p');
            texto.textContent = info;
            
            const botao = document.createElement('button');
            botao.textContent = 'EXCLUIR';
            botao.className = 'delete'; // 
            botao.id = id;

            linha.appendChild(texto);
            linha.appendChild(botao);
            
            container.appendChild(linha);
        }
    })
    .catch(error => {
        console.error('Erro ao buscar dados:', error);
    });
   
   }
  
//---------
async function refresh () {
     const linhas = document.querySelectorAll('.linha');

     linhas.forEach(linha => {
         linha.remove();
     });
     const user = await showUsers();
}

refresh();

//CRIA USUÁRIO
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

form.addEventListener("submit", async function(event) {
    event.preventDefault(); 

    const formData = {
        nome: document.getElementById("nome").value.trim(),
        sobrenome: document.getElementById("sobrenome").value.trim(),
        email: document.getElementById("email").value.trim(),
        senha: document.getElementById("senha").value.trim(),
    };

    const confSenha = document.getElementById("confirmaSenha").value.trim();   
    let validade = validateForm(formData.nome,formData.sobrenome,formData.email,formData.senha,confSenha);
    console.log("validade = ", validade);
    if(validade){
        try {
            const response = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'},
                    body: JSON.stringify(formData)
                });
    
                if(!response.ok){
                    throw new Error("Deu ruim pra criar ai chefe");
                }
                const data = await response.json();
                console.log("Deu boa: ", data.nome);
                refresh();
            }catch(error){
                console.error("Deu ruim: ", error);
            }
    }
});


//DELETA USUÁRIO
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const container = document.querySelector('.lista');

container.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete')) {
        const botaoId = event.target.id;

        console.log(`Botão com ID ${botaoId} foi clicado!`);
        try {
         
            const response = await fetch('http://localhost:3001/users/' + botaoId, {
            //const response = await fetch('http://localhost:3001/users/:id', {
                method: 'DELETE',
                headers:{
                    'Content-Type': 'application/json'},
                });
                 
                if(!response.ok){
                    throw new Error("Deu ruim pra deletar ai chefe");
                }
                const data = await response.json();
                console.log("Deu boa: ", data.nome);
                refresh();
            }catch(error){
                
                console.error("Deu ruim: ", error);
                alert("Deu ruim");
    }
    }
});

//ATUALIZA USUÁRIO
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------



update.addEventListener("submit", async function(event) {
    event.preventDefault();

    const updateData = {
        id: document.getElementById("uId").value.trim(),
        nome: document.getElementById("uNome").value.trim(),
        sobrenome: document.getElementById("uSobrenome").value.trim(),
        email: document.getElementById("uEmail").value.trim(),
        senha: document.getElementById("uSenha").value.trim(),
    };
    const uConfSenha = document.getElementById("uConfirmaSenha").value.trim(); 

    let validade = validateForm(updateData.nome,updateData.sobrenome,updateData.email,updateData.senha,uConfSenha);
    if(validade){
    try {
        const response = await fetch('http://localhost:3001/users/', {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'},
                body: JSON.stringify(updateData)
            });
    
            if(!response.ok){
                throw new Error("Deu ruim pra criar ai chefe");
            }
            const data = await response.json();
            console.log("Deu boa: ", data.nome);
            refresh();
        }catch(error){
            console.error("Deu ruim: ", error);
            refresh();
        }
    }
});
//COISAS FRONT-END
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
