const textArea = document.querySelector(".conteudo__escrito");
const mensagem = document.querySelector(".conteudo__pronto");
const caixaConteudoPronto = document.querySelector(".caixa__conteudo__pronto");
const botaoCopy = document.querySelector(".botao__copiar");
const temaMode = document.querySelector(".tema");
const imagemAviso = document.querySelector(".aviso__imagem");
const imagemMode = document.querySelector(".imagem__mode");
const body = document.body;

function toggleTema() {
    body.classList.toggle('lightmode');

    if (body.classList.contains('lightmode')) {
        imagemAviso.src = './img/exclamation__circle.png';
        imagemMode.src = './img/lightmode.png';
    } else {
        imagemAviso.src = './img/exclamation__white.png'; 
        imagemMode.src = './img/darkmode.png';
    }
}

textArea.addEventListener("input", function() {
    this.value = filtrarTexto(this.value);
    autoResize(this); 
});

mensagem.addEventListener("input", function() {
    autoResize(this); 
});

function filtrarTexto(texto) {
    texto = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return texto.toLowerCase().replace(/[^a-z ]/g, "");
}

function botaoCriptografar() {
    const textoEncriptado = criptografar(textArea.value);
    mensagem.value = textoEncriptado;
    textArea.value = "";
    const elementsToHide = caixaConteudoPronto.querySelectorAll("h2, p");
    elementsToHide.forEach(element => {
        element.style.display = "none";
    });
    mensagem.style.background = "none";
    mensagem.style.margin = "2% 1%";
    caixaConteudoPronto.classList.remove('hidden');
    mensagem.classList.remove('hidden'); 
    botaoCopy.classList.remove('hidden'); 
    autoResize(textArea);
    autoResize(mensagem); 
}

function criptografar(stringEncriptar) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringEncriptar = stringEncriptar.toLowerCase();
    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringEncriptar.includes(matrizCodigo[i][0])) {
            stringEncriptar = stringEncriptar.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
        }
    }
    return stringEncriptar;
}

function botaoDescriptografar() {
    const textoEncriptado = desencriptografar(textArea.value);
    mensagem.value = textoEncriptado;
    textArea.value = "";
    const elementsToHide = caixaConteudoPronto.querySelectorAll("h2, p");
    elementsToHide.forEach(element => {
        element.style.display = "none";
    });
    mensagem.style.background = "none";
    mensagem.style.margin = "2% 1%";
    caixaConteudoPronto.classList.remove('hidden');
    mensagem.classList.remove('hidden'); 
    botaoCopy.classList.remove('hidden'); 
    autoResize(textArea);
    autoResize(mensagem);
}

function desencriptografar(stringDesencriptar) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringDesencriptar = stringDesencriptar.toLowerCase();
    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringDesencriptar.includes(matrizCodigo[i][1])) {
            stringDesencriptar = stringDesencriptar.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0]);
        }
    }
    return stringDesencriptar;
}

function botaoCopiar() {
    mensagem.select();
    navigator.clipboard.writeText(mensagem.value);
    mensagem.value = "";
    const elementsToShow = caixaConteudoPronto.querySelectorAll("h2, p");
    elementsToShow.forEach(element => {
        element.style.display = "";
    });
    mensagem.style.background = "";
    if (window.innerWidth <= 1200) {
        mensagem.classList.add('hidden');
        botaoCopy.classList.add('hidden');
    }
    autoResize(mensagem);
}

function autoResize(textarea) {
    textarea.style.height = 'auto'; 
    textarea.style.height = textarea.scrollHeight + 'px'; 
}

document.addEventListener('DOMContentLoaded', function() {
    autoResize(textArea);
    autoResize(mensagem);
});

if (window.innerWidth <= 1200){
mensagem.classList.add('hidden')
botaoCopy.classList.add('hidden')}