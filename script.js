// VALIDAÇÃO DO FORM DE LOGIN USANDO LOCAL STORAGE
function acionarBotao() {
  const emailInput = document.getElementById("txtEmail");
  const senhaInput = document.getElementById("txtSenha");
  const email = emailInput.value.trim();
  const senha = senhaInput.value.trim();

  let valido = true;

  // Função auxiliar de validação visual
  function validarCampo(campo, erroId, condicao) {
    const erro = document.getElementById(erroId);
    if (condicao) {
      erro.style.display = "none";
      campo.parentElement.classList.remove("invalid");
    } else {
      erro.style.display = "block";
      campo.parentElement.classList.add("invalid");
      valido = false;
    }
  }

  validarCampo(
    emailInput,
    "erroEmail",
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  );
  validarCampo(senhaInput, "erroSenha", senha !== "");

  if (!valido) return;

  // Verifica se existem usuários cadastrados no localStorage
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuarioEncontrado = usuarios.find(
    (usuario) => usuario.email === email && usuario.senha === senha
  );

  if (usuarioEncontrado) {
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
    alert("Login realizado com sucesso!");
    window.location.href = "index.html";
  } else {
    validarCampo(emailInput, "erroEmail", false);
    validarCampo(senhaInput, "erroSenha", false);
    document.getElementById("erroSenha").textContent =
      "Email ou senha incorretos.";
  }
}

// VALIDAÇÃO DO FORM DE CADASTRO DE USUARIO E LOCAL STORAGE
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

// CADASTRO DE PADARIAS
document.addEventListener("DOMContentLoaded", () => {
  const formCadastro = document.getElementById("formCadastro");
  const padarias = JSON.parse(localStorage.getItem("padarias")) || [];

  formCadastro.addEventListener("submit", (event) => {
    event.preventDefault(); // Impede o envio padrão

    // Pegando os valores dos campos
    const nomePadaria = document.getElementById("nomePadaria").value;
    const diferencial = document.getElementById("diferencial").value;
    const descCardapio = document.getElementById("descCardapio").value;
    const imagemUrl = document.getElementById("fotoUrl").value;
    const endereco = document.getElementById("endereco").value;
    const horario = document.getElementById("horario").value;
    const telefone = document.getElementById("telefone").value;
    const site = document.getElementById("site").value;

    // Criando o objeto da padaria
    const novaPadaria = {
      id: padarias.length + 1,
      nome: nomePadaria,
      diferencial: diferencial,
      descricao: descCardapio || "Descrição não informada.",
      imagem:
        imagemUrl || "https://via.placeholder.com/300x200?text=Sem+imagem",
      endereco: endereco,
      horario: horario,
      telefone: telefone,
      site: site || "",
      cardapio: descCardapio || "Cardápio não informado",
    };

    // Salvando no localStorage
    padarias.push(novaPadaria);
    localStorage.setItem("padarias", JSON.stringify(padarias));

    alert("Padaria cadastrada com sucesso!");
    formCadastro.reset();
  });

  // Habilita o botão de envio mesmo sem validação
  document.getElementById("submitBtn").disabled = false;
});

// VALIDAÇÃO DO FORM DE CADASTRO DE PADARIAS
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formCadastro");
  const submitBtn = document.getElementById("submitBtn");

  const camposObrigatorios = [
    {
      id: "nomePadaria",
      regex: /.+/,
      erroId: "nomePadariaError",
      msg: "Informe o nome da padaria.",
    },
    {
      id: "diferencial",
      regex: /.+/,
      erroId: "diferencialError",
      msg: "Informe o diferencial da empresa.",
    },
    { id: "fotoUrl", regex: /^https?:\/\/.+\..+/, erroId: null, msg: null },
    {
      id: "endereco",
      regex: /.+/,
      erroId: "enderecoError",
      msg: "Informe o endereço completo.",
    },
    {
      id: "horario",
      regex: /.+/,
      erroId: "horarioError",
      msg: "Informe o horário de funcionamento.",
    },
    {
      id: "telefone",
      regex: /^\(?\d{2}\)?\s?\d{4,5}-\d{4}$/,
      erroId: "telefoneError",
      msg: "Informe um telefone válido. Ex: (11) 1234-5678",
    },
  ];

  function validarCampo(campo, regex, erroId, msg) {
    const valor = campo.value.trim();
    const valido = regex.test(valor);

    if (erroId) {
      const erroDiv = document.getElementById(erroId);
      if (!valido) {
        erroDiv.textContent = msg;
        erroDiv.style.display = "block";
        campo.classList.add("invalido");
      } else {
        erroDiv.textContent = "";
        erroDiv.style.display = "none";
        campo.classList.remove("invalido");
      }
    }

    return valido;
  }

  function validarFormulario() {
    let valido = true;
    camposObrigatorios.forEach((c) => {
      const campo = document.getElementById(c.id);
      const estaValido = validarCampo(campo, c.regex, c.erroId, c.msg);
      if (!estaValido) valido = false;
    });
    submitBtn.disabled = !valido;
  }

  camposObrigatorios.forEach((campo) => {
    const input = document.getElementById(campo.id);
    input.addEventListener("input", validarFormulario);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    validarFormulario();

    if (!submitBtn.disabled) {
      alert("Padaria cadastrada com sucesso!");
      form.reset();
      submitBtn.disabled = true;
    }
  });
});

// TROCAR A SENHA
function recuperarSenha() {
  const email = document.getElementById("emailRecuperar").value.trim();
  const novaSenha = document.getElementById("novaSenha").value.trim();
  const mensagem = document.getElementById("mensagemRecuperar");

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const index = usuarios.findIndex((user) => user.email === email);

  if (index === -1) {
    mensagem.textContent = "Email não encontrado.";
    mensagem.classList.remove("sucesso");
    mensagem.classList.add("erro");
    return;
  }

  const senhaAntiga = usuarios[index].senha;

  if (novaSenha === "") {
    mensagem.textContent = "A nova senha não pode estar vazia.";
    mensagem.classList.remove("sucesso");
    mensagem.classList.add("erro");
    return;
  }

  if (novaSenha.length < 6) {
    mensagem.textContent = "A senha deve conter no mínimo 6 caracteres.";
    mensagem.classList.remove("sucesso");
    mensagem.classList.add("erro");
    return;
  }

  if (novaSenha === senhaAntiga) {
    mensagem.textContent = "A nova senha deve ser diferente da senha atual.";
    mensagem.classList.remove("sucesso");
    mensagem.classList.add("erro");
    return;
  }

  usuarios[index].senha = novaSenha;
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  mensagem.textContent = "Senha redefinida com sucesso!";
  mensagem.classList.remove("erro");
  mensagem.classList.add("sucesso");

  setTimeout(() => {
    window.location.href = "paginaDeLogin.html";
  }, 2000);
}

// Carrega dados do usuário logado na página de perfil
function carregarPerfil() {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  if (!usuarioLogado) {
    alert("Você precisa estar logado para acessar o perfil.");
    window.location.href = "index.html";
    return;
  }

  document.getElementById("logoutBtn").style.display = "inline";

  const perfilDiv = document.getElementById("perfilDados");
  perfilDiv.innerHTML = `
    <p><strong>Usuário:</strong> ${usuarioLogado.usuario}</p>
    <p><strong>Email:</strong> ${usuarioLogado.email}</p>
    <p><strong>Endereço:</strong> ${usuarioLogado.endereco}, Nº ${usuarioLogado.numero}</p>
    <p><strong>Bairro:</strong> ${usuarioLogado.bairro}</p>
    <p><strong>CEP:</strong> ${usuarioLogado.cep}</p>
  `;
}

// Logout
function logout() {
  localStorage.removeItem("usuarioLogado");
  alert("Você foi desconectado.");
  window.location.href = "index.html";
}
