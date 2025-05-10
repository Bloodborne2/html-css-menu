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

// FUNÇÃO DA POLITICA DE COOKIES
document.addEventListener("DOMContentLoaded", function () {
  // Verificar se o usuário já aceitou ou recusou os cookies
  const cookiesAccepted = localStorage.getItem("cookiesAccepted");

  if (cookiesAccepted === null) {
    // Se a decisão não foi tomada ainda, inserir o banner dinamicamente
    insertCookieBanner();
  } else {
    // Caso o banner tenha sido aceito ou recusado, não mostrar novamente
    return;
  }

  // Inserir o banner de cookies no DOM
  function insertCookieBanner() {
    const banner = document.createElement("div");
    banner.id = "cookie-banner";
    banner.className = "cookie-banner";

    banner.innerHTML = `
          <p>Utilizamos cookies para melhorar a sua experiência no nosso site. Ao continuar navegando, você concorda com nossa <a href="/politica-de-cookies">Política de Cookies</a>.</p>
          <div>
              <button id="accept-cookies">Aceitar</button>
          </div>
          <div>
          <button id="decline-cookies">Recusar</button>
          </div>
      `;

    document.body.appendChild(banner);

    // Adicionar o estilo CSS do banner
    const style = document.createElement("style");
    style.innerHTML = `
          .cookie-banner {
              position: fixed;
              bottom: 0;
              left: 0;
              right: 0;
              background-color: rgba(0, 0, 0, 0.8);
              color: #fff;
              padding: 15px;
              text-align: center;
              font-family: Arial, sans-serif;
              z-index: 1000;
          }
          .cookie-banner p {
              margin: 0;
              padding: 0;
              font-size: 16px;
          }
          .cookie-banner a {
              color: #ffd700;
              text-decoration: underline;
          }
          .cookie-banner div {
              display: flex;
              justify-content: center;
              gap: 10px;
          }
          .cookie-banner button {
              padding: 8px 15px;
              font-size: 16px;
              cursor: pointer;
              border: none;
              border-radius: 5px;
              background-color: #4CAF50;
              color: white;
              transition: background-color 0.3s ease;
          }
          .cookie-banner button:hover {
              background-color: #45a049;
          }
      `;
    document.head.appendChild(style);

    // Quando o usuário clica em "Aceitar"
    document
      .getElementById("accept-cookies")
      .addEventListener("click", function () {
        localStorage.setItem("cookiesAccepted", "true");
        banner.style.display = "none";
      });

    // Quando o usuário clica em "Recusar"
    document
      .getElementById("decline-cookies")
      .addEventListener("click", function () {
        localStorage.setItem("cookiesAccepted", "false");
        banner.style.display = "none";
      });
  }
});
