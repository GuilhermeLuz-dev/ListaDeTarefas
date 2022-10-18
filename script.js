// Pegando elementos HTML;
let lista = document.querySelector(".list");
let nota = document.querySelector(".nota");
let bottom = document.querySelector(".bottom");

// Criando variáveis auxiliares;
let notas = [];
let cont;

// Adicionando evento que cria nova nota ao clicar na tecla Enter;
nota.addEventListener("keypress", function (event) {
        if (event.key === "Enter")
                guardarNota();
})
// Readicinando as informações da pagina após atualização;
const atualizar = () => {
        lista.innerHTML = '';
        for (let i = 0; i < localStorage.length; i++) {
                // Preenchendo o array notas para ser usado como base na função guardarNota();
                notas.push(localStorage.getItem(`nota${i}`));

                // Readicionando as informações do localstorage na lista de notas da pagina;
                verificarChecked(i);
        }
        scroll();
}

// Atualizando o localStorage após alguma alteração com os dados contido no array notas;
const prencherMemoria = () => {
        for (let i = 0; i < notas.length; i++) {
                localStorage.setItem(`nota${i}`, notas[i])
        }
}

// Verificando se alguma nota foi checada para adicionar o check;
const verificarChecked = (i) => {
        // Verificando atravez dos objetos contidos em notas quais estão checados e quais não estão;
        if (!JSON.parse(notas[i]).check) {
                // Adicionando nota que não está checada;
                lista.innerHTML += `<li id="nota${i}">` +
                        `<div id="check" onclick="checked(this)">` +
                        `<img class="imgMark" src="images/check.png" alt="Lixo" style="display: none"></div>` +
                        JSON.parse(notas[i]).nota + // Transformando uma das strings contidas no array notas, e adicionando-a como objeto na lista;
                        '<img class="lixo" src="images/lixeira.png" onclick="remove(this)"></li>';
        } else {
                // Adicionando nota que está checada;
                lista.innerHTML += `<li id="nota${i}">` +
                        `<div id="check" onclick="notCheked(this)">` +
                        `<img class="imgMark" src="images/check.png" style="display: inline"></div>` +
                        JSON.parse(notas[i]).nota +
                        '<img class="lixo" src="images/lixeira.png" onclick="remove(this)"></li>';
        }
}

// Verificando se é necessario o uso de um scroll na lista de notas;
const scroll = () => {
        if (notas.length > 9)
                addScroll();
        else removeScroll();
}

// Eventos que adicionam ou tiram o scroll;
const addScroll = () => document.querySelector(".box").style.overflowY = "scroll";

const removeScroll = () => document.querySelector(".box").style.overflowY = "hidden";



// Evento para manter informações após atualização de pagina;
document.addEventListener("load", atualizar());



// Função que armazena as notas digitadas e adiciona na lista de notas da pagina;
const guardarNota = () => {

        if (nota.value != '') {
                if (notas.length == 10) {
                        alert("Ops, a memoria está cheia...");
                        return;
                }
                notas.push(`{"nota":"${nota.value}","check":false}`); // Preenchendo o array notas que armazenará as notas e seu estado de checado ou não;
                for (let i = 0; i < notas.length; i++) {
                        // Armazenando as notas no localstorage usando o length e os index do array notas como base;
                        if (i == notas.length - 1) {
                                localStorage.setItem(`nota${i}`, notas[i]); // Guardando os dados no localStorage
                                cont = i; // Variável auxiliar para pegar o valor do index da nota recem adicionada;
                        }
                }

                // Adicionando uma nova nota na lista de notas e limpando a caixa de texto;

                lista.innerHTML += `<li id="nota${cont}">` +
                        `<div id="check" onclick="checked(this)">` +
                        `<img class="imgMark" src="images/check.png" style="display: none"></div>` +
                        nota.value +
                        '<img class="lixo" src="images/lixeira.png" onclick="remove(this)"></li>';
                nota.value = ""
        }
        scroll()
}

// Resetando toda a lista de nota e o array notas;
const reset = () => {
        notas.splice(0);
        localStorage.clear();
        lista.innerHTML = "";
        scroll();
}

// Marcando nota como realizada;
const checked = (e) => {
        let item = JSON.parse(notas[e.parentNode.id[4]]);
        item.check = true;
        notas[e.parentNode.id[4]] = JSON.stringify(item);
        localStorage.clear();
        e.setAttribute('onclick', 'notCheked(this)');
        e.firstChild.style.display = "inline"
        prencherMemoria();
}

// Desmarcando a nota; 
const notCheked = (e) => {
        let item = JSON.parse(notas[e.parentNode.id[4]]);
        item.check = false;
        notas[e.parentNode.id[4]] = JSON.stringify(item);
        localStorage.clear();
        e.setAttribute('onclick', 'checked(this)');
        e.firstChild.style.display = "none"
        prencherMemoria();
}

// Removendo alguma nota específica e atualizando o localstorage e o array notas;
const remove = (e) => {

        let id = e.parentNode.id; // pegando o id da nota que será removida;

        for (let i = 0; i < localStorage.length; i++) {

                if (id == localStorage.key(i)) { // Percorrendo o localStorage até que a nota que será excluida seja encontrada;

                        notas.splice(id[4], 1); // Excluindo do Array;
                        localStorage.clear(); // Limpando a memoria para atualização;
                        lista.innerHTML = ''; // Limpando a lista para atualização;
                        prencherMemoria(); // Preenchendo o localStorage com os dados atualizados; 

                        // Atualizando a lista já sem os itens removidos;
                        for (let n = 0; n < notas.length; n++) {
                                localStorage.setItem(`nota${n}`, notas[n]);
                                verificarChecked(n);
                        }
                }
        }
        scroll();
}