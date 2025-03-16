function acionarBotao(){

    var textEmail = document.getElementById('txtEmail').value;

    var textSenha = document.getElementById('txtSenha').value;

    if (textEmail == ""){
        alert('Preencha o campo email!!');
    }else if (textSenha == ""){
        alert('Preencha o campo senha!!');
    }
    else{
        if(textEmail == "admin@gmail.com" && textSenha == '123'){
        alert('Login de administrador');
        window.location.href = 'cadastroDePadaria.html';
    }
    else{
        alert('Login inválido'); 
    }   
    }
}