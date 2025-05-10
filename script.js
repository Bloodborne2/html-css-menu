// VALIDAÇÃO DO FORM DE LOGIN USANDO LOCAL STORAGE
function acionarBotao() {
  var textEmail = document.getElementById("txtEmail").value.trim();
  var textSenha = document.getElementById("txtSenha").value.trim();

  if (textEmail == "") {
    alert("Preencha o campo email!");
    return;
  } else if (textSenha == "") {
    alert("Preencha o campo senha!");
    return;
  }

  // Verifica se existem usuários cadastrados no localStorage
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Verifica se o email e a senha existem nos usuários cadastrados
  let usuarioEncontrado = usuarios.find(
    (usuario) => usuario.email === textEmail && usuario.senha === textSenha
  );

  if (usuarioEncontrado) {
    let desejaCadastrar = confirm(
      "Login bem-sucedido! Deseja cadastrar uma padaria?"
    );
    if (desejaCadastrar) {
      window.location.href = "cadastroDePadaria.html";
    } else {
      window.location.href = "index.html";
      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
    }
  } else {
    alert("Email ou senha incorretos!");
  }
}

// VALIDAÇÃO DO FORM DE CADASTRO E LOCAL STORAGE
function acionarBotaoCadastro() {
  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault(); // Impede envio do form até passar na validação

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
      alert("Por favor, insira um CEP válido (formato 00000-000).");
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

    // Verifica se o usuário já existe no localStorage
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verifica se o e-mail já está cadastrado
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].email === email) {
        alert("Este email já está cadastrado.");
        return;
      }
    }

    // Adiciona o novo usuário ao array
    const novoUsuario = {
      usuario: usuario,
      cep: cep,
      endereco: endereco,
      bairro: bairro,
      numero: numero,
      email: email,
      senha: senha,
    };

    // Salva o novo usuário no localStorage
    usuarios.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso!");
    window.location.href = "paginaDeLogin.html"; // Redireciona para a página de login após o cadastro
  });
}

// FUNÇÃO PARA BUSCAR ENDEREÇO PELO CEP
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
    .then((response) => response.json())
    .then((data) => {
      if (data.erro) {
        alert("CEP não encontrado.");
        document.getElementById("endereco").value = "";
        document.getElementById("bairro").value = "";
      } else {
        document.getElementById("endereco").value = data.logradouro || "";
        document.getElementById("bairro").value = data.bairro || "";
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar o CEP:", error);
      alert("Erro ao buscar o CEP.");
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const cidade = "São Paulo";

  fetch(`https://goweather.herokuapp.com/weather/${encodeURIComponent(cidade)}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("temperatura").textContent =
        data.temperature || "Não disponível";
      document.getElementById("vento").textContent =
        data.wind || "Não disponível";
      document.getElementById("descricao").textContent =
        data.description || "Não disponível";
    })
    .catch((error) => {
      console.error("Erro ao buscar o clima:", error);
      document.getElementById("clima-container").innerHTML =
        "<p>Erro ao carregar dados do clima.</p>";
    });
});

