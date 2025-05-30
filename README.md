# 📌 Versions / Releases

- v1.0.4 - (14/05/2025)
  -🔄 Adicionados novos campos no cadastro de padaria
  -🛠️ Criação de padaria fixas para aparecer na pagina de listagem
  -🛠️ Correção do cadastro de padaria, agora a padaria cadastrada aparece na pagina de listagem
  -🛠️ Correção dos IDs dos elementos de erro no formulário de cadastro e login (de erroEmail/erroSenha para emailError/senhaError) para exibição correta das mensagens de validação.
  -🛠️ Inclusão da chamada da função acionarBotaoCadastro() no evento DOMContentLoaded para garantir a validação e o controle do formulário de cadastro.
  -🔄 Ajustes no fluxo de validação e exibição de mensagens de erro no login e cadastro, melhorando a experiência do usuário.
  -🧹 Refatoração do JavaScript para melhor organização e manutenção do código de validação.
  -✅ Garantia de que as mensagens de erro apareçam corretamente nos formulários de login e cadastro.
---
- v1.0.3 - (10/05/2025)
  - 🎨 Criação de novos HTMLs pagina de contato, listagem e detalhes
  - 🎨 Criação de header e footer para todas as páginas
  - 🛠️ Ajustes no JavaScript para exibição dinâmica do banner de cookies em todas as páginas
  - 🛠️ Pagina de listagem de padaria com js dinamico
  - 🛠️ Utulização de localStorage para no cadastro para então ser utulizado no login  
  - 🎉 Exibição do banner de cookies apenas uma vez, utilizando localStorage para persistência entre páginas e sessões
  - 🔄 Melhoria na integração entre o banner de cookies e o layout do site
---
- **v1.0.2** - (17/04/2025)
  - 🎨 Melhore geral no CSS do site
  - 🎨 criação de novo html da pagina de contato
  - 🎨criação de footer e header
    
---
- **v1.0.0** - (13/04/2025)
  - 🔄 Integração com **API de Clima (OpenWeatherMap)** para exibir dados em tempo real no site
  - 🎨 Estilização e centralização do container de clima na interface
  - ✅ Validação aprimorada no formulário de cadastro
  - 🗺️ Integração com **API ViaCEP** para preenchimento automático de endereço
  - 🧱 Ajustes visuais e melhorias na responsividade da interface

---
- **v1.0.0** - (16/03/2025)
  - Implementação de JavaScript
  - Criação de uma nova página, acessível apenas com e-mail e senha corretos na página de login

---

# 📖 Página de Divulgação de Padaria

A **Página de Divulgação de Padaria** é uma plataforma voltada para conectar microempreendedores do ramo de panificação com clientes em potencial. O site oferece funcionalidades para cadastro de usuários, listagem de padarias, avaliações de clientes e muito mais.

---

## 🔑 Funcionalidades

- **Cadastro de Usuários**: Os novos usuários podem criar uma conta. Usuários cadastrados podem acessar suas contas através da página de login.
- **Página Inicial**: Apresentação do site
- **Cookies**
- **Página "Sobre Nós"**: Missão, visão e valores da empresa.
- **Página de Contato**: Informações de localização e número de telefone para suporte ou dúvidas.
- **Exibição de Padarias**
- **Avaliação e Comentário de Usuários**
- **Busca de Padarias**

---

## 📝 Cadastro de Usuários e Login

### Cadastro de Usuário (Campos obrigatórios):

- **Nome**
- **E-mail**
- **Senha**
- **CEP**
- **Endereço**
- **Bairro**

### Login (Campos obrigatórios):

- **E-mail**
- **Senha**

---

## 🏠 Página Inicial

A página inicial apresentará a ideia geral do site e comentários de usuários, além de exibir o clima atual da cidade de São Paulo.

---

## ℹ️ Página "Sobre Nós"

- Missão
- Visão
- Valores da empresa

---

## 📞 Página de Contato

- Localização da empresa  
- Número de telefone para suporte ou dúvidas

---

## 🍞 Cadastro de Padaria

Usuários poderão cadastrar suas padarias sem a necessidade de estar logado. O formulário de cadastro incluirá:

- **Nome da Padaria** (Obrigatório)
- **Diferencial da Empresa** (Ex: Produtos artesanais, ingredientes orgânicos) (Obrigatório)
- **Descrição do Cardápio** (Opcional)
- **Site** (Opcional)
- **Horário de Funcionamento** (Obrigatório)
- **Telefone** (Obrigatório)
- **Upload de Imagens** (Apenas URL de imagens)  
  - Foto do estabelecimento (Obrigatório)
- **Localização**: Endereço completo (sem integração com mapas) (Obrigatório)

---

## 📋 Exibição dos Anúncios

### Página de Listagem:

- Exibe todas as padarias cadastradas com informações resumidas (nome e diferencial)

### Página de Detalhes:

- Exibe informações completas da padaria ao clicar em um anúncio

---

## 🔍 Busca

- Funcionalidade para buscar padarias pelo nome

---

## ⭐ Avaliações e Comentários

- **Sistema de Avaliação**: Clientes podem deixar notas para as padarias (Obrigatório)
- **Comentários**: Usuários podem compartilhar suas experiências (Opcional)

