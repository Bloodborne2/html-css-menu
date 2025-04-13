//validação do form do LOGIN
function acionarBotao() {

    var textEmail = document.getElementById('txtEmail').value;

    var textSenha = document.getElementById('txtSenha').value;

    if (textEmail == "") {
        alert('Preencha o campo email!!');
    } else if (textSenha == "") {
        alert('Preencha o campo senha!!');
    }
    else {
        if (textEmail == "admin@gmail.com" && textSenha == '123') {
            alert('Login de administrador');
            window.location.href = "cadastroDePadaria.html";

        } else {
            alert('Login errado');
        }

    }
}

function acionarBotaoCadastro() {
    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault(); // impede envio do form até passar na validação

        const usuario = document.getElementById("txtUsuario").value.trim();
        const cep = document.getElementById("cep").value.trim();
        const endereco = document.getElementById("endereco").value.trim();
        const bairro = document.getElementById("bairro").value.trim();
        const numero = document.getElementById("numero").value.trim();
        const email = document.getElementById("txtEmail").value.trim();
        const senha = document.getElementById("txtSenha").value.trim();

        // Validação do usuário
        if (usuario === "") {
            alert("Por favor, preencha o nome de usuário.");
            return;
        }

        // Validação do CEP (espera formato 00000-000)
        const cepRegex = /^\d{5}-?\d{3}$/;
        if (!cepRegex.test(cep)) {
            alert("Por favor, insira um CEP válido (formato 00000000).");
            return;
        }

        // Verifica se o endereço e bairro foram preenchidos pela função buscarEnderecoPorCEP()
        if (endereco === "" || bairro === "") {
            alert("Endereço ou bairro não preenchidos. Verifique o CEP informado.");
            return;
        }

        // Validação do número
        if (numero === "" || isNaN(numero) || Number(numero) <= 0) {
            alert("Por favor, insira um número válido para o endereço.");
            return;
        }

        // Validação do e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Por favor, insira um email válido.");
            return;
        }

        // Validação da senha
        if (senha.length < 6) {
            alert("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        alert("Formulário enviado com sucesso!");
    
    });

}


function buscarEnderecoPorCEP() {
    let cep = document.getElementById("cep").value;
    cep = cep.replace(/\D/g, ""); // remove caracteres não numéricos

    if (cep.length !== 8) {
        alert("CEP inválido. Deve conter 8 números.");
        document.getElementById("endereco").value = "";
        document.getElementById("bairro").value = "";
        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert("CEP não encontrado.");
                document.getElementById("endereco").value = "";
                document.getElementById("bairro").value = "";
            } else {
                document.getElementById("endereco").value = data.logradouro || "";
                document.getElementById("bairro").value = data.bairro || "";
            }
        })
        .catch(error => {
            console.error("Erro ao buscar o CEP:", error);
            alert("Erro ao buscar o CEP.");
        });
}

document.addEventListener("DOMContentLoaded", function () {
    const cidade = "São Paulo";

    fetch(`https://goweather.herokuapp.com/weather/${encodeURIComponent(cidade)}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("temperatura").textContent = data.temperature || "Não disponível";
            document.getElementById("vento").textContent = data.wind || "Não disponível";
            document.getElementById("descricao").textContent = data.description || "Não disponível";
        })
        .catch(error => {
            console.error("Erro ao buscar o clima:", error);
            document.getElementById("clima-container").innerHTML = "<p>Erro ao carregar dados do clima.</p>";
        });
});