//prefixes of implementation that we want to test
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange    = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) window.alert("O seu navegador nao suporta uma versao estavel do IndexedDB.");


const usuariosProg = [
   {id: "01", nome: "Administrador", login: "admin", senha: "1234"},
   {id: "02", nome: "Gustavo", login: "gustavota", senha: "1234"},
   {id: "03", nome: "Gustavo", login: "gustavo", senha: "1234"},
   {id: "04", nome: "Filipe", login: "filipe", senha: "1234"}
];

const notasBd = [
	{id:"01",
     id_nota:"01",
	 id_usuario:"01",
	 titulo:"Exemplo de nota",
	 dataCriacao:"13/03/2024",
	 dataMan:"13/03/2024",
	 prioridade:"normal",
	 conteudo:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"}
];

const relacaoUsuario = [
	{id: "01", id_usuario:"01", id_nota:"01", id_usuComp:"02"},
	{id: "02", id_usuario:"01", id_nota:"01", id_usuComp:"03"},
	{id: "03", id_usuario:"01", id_nota:"01", id_usuComp:"04"}
];

//var dropDB = indexedDB.deleteDatabase("notas_DB");
let db;
let openRequest = indexedDB.open("notas_DB", 1);

openRequest.onerror = function(event) {
	console.error("Erro ao conectar no banco de dados, Erro: ", event.target.error);
};

openRequest.onsuccess = function() {
	db = openRequest.result;
	console.log("Conectado com sucesso: " + db);
};

openRequest.onupgradeneeded = function() {
	db = openRequest.result;
	var objectStore = db.createObjectStore("usuarios", {keyPath: "login"});
	var i;
	
    objectStore.createIndex("login_idx1", "login", { unique: true });
	objectStore.createIndex("login_idx2", "id");
    
    for (var i in usuariosProg) {
		objectStore.add(usuariosProg[i]);
    }
    console.info('Banco de usuarios preenchido');
	
	objectStore = db.createObjectStore("notas", {autoIncrement: true});
	
	objectStore.createIndex("nota_idx", "id", { unique: true });
	objectStore.createIndex("nota_idx1", ["id_usuario","id_nota"]);
	objectStore.createIndex("nota_idx2", "id_nota");
	objectStore.createIndex("nota_idx3", "id_usuario");
	objectStore.createIndex("nota_idx4", "titulo");
	objectStore.createIndex("nota_idx5", ["id_usuario","titulo",]);

	for (i in notasBd) {
		objectStore.add(notasBd[i]);
	}
	console.info('Banco de notas preenchido');
	
	objectStore = db.createObjectStore("rel_nota_usu", {autoIncrement: true});
	
	objectStore.createIndex("rel_nota_usu_idx", "id", { unique: true });
	objectStore.createIndex("rel_nota_usu_idx1", ["id_usuario","id_nota","id_usuComp"]);
	objectStore.createIndex("rel_nota_usu_idx2", ["id_usuario","id_nota"]);
	objectStore.createIndex("rel_nota_usu_idx3", "id_usuComp");
	
	for (i in relacaoUsuario) {
		objectStore.add(relacaoUsuario[i]);
	}
	console.info('Banco de relacao preenchido');
	console.info('Banco de dados criado');
};

function fazer_login() {
    var transaction = db.transaction(["usuarios"]);
    var objectStore = transaction.objectStore("usuarios");
    var request     = objectStore.get(document.getElementById('login').value);
	
	if(document.getElementById('login').value == '' || document.getElementById('senha').value == '') {
		alert("O nome do usuario ou senha esta vazio!");
		return;
	}
	
    request.onerror = function(event) {
       alert("Erro ao conectar ao banco de dados!");
	   return;
    };
    
    request.onsuccess = function(event) {
		if(!request.result) {
			alert("Conta nao encontrada!");
			return;
		}
		
		if(request.result.senha != document.getElementById('senha').value) {
			alert("Senha incorreta!");
			return;
		}
		
		localStorage.setItem('loginUsu', request.result.login);
		
		window.location.replace("index.html");
    };
}

function preencheUsuario() {
    db = openRequest.result;
	
	var inputBuscar = localStorage.getItem('loginUsu');
    var transaction = db.transaction(["usuarios"]);
    var objectStore = transaction.objectStore("usuarios");
    var request     = objectStore.get(inputBuscar);
	
    request.onsuccess = function() {
		if (request.result) {
            document.getElementById('idUsuario').value         = request.result.id;
			document.getElementById('usuarioLogado').innerHTML = request.result.nome;
			localStorage.setItem('ident', request.result.id);
		} else {
            console.error("Usuario nao encontrado!");
        }
    };

    request.onerror = function(event) {
        console.error("Erro na busca: ", event.target.error);
    };
}

function getCorPrioridade(prioridade){
	var cor = 'black';
	
	switch(prioridade){
		case         'normal': cor = 'black';
		                       break;
							   
		case     'importante': cor = 'yellow';
		                       break;
							   
		case 'extraordinario': cor = 'red';
		                       break;
	}
	
	return cor;
}

function criarCard(idNota, idUsuario, ehCompartilhado, titulo, conteudo, prioridade) {
    const cardContainer   = document.getElementById('container-card');
    const card            = document.createElement('div');
    const titleElement    = document.createElement('h2');
	const subTitleElement = document.createElement('h3');
	const contentElement  = document.createElement('p');
	
	card.classList.add('card');
	card.setAttribute('data-idNota', idNota);
	card.setAttribute('data-idUsu', idUsuario);
	
    
    titleElement.textContent = titulo;
    if(ehCompartilhado) titleElement.style.color = '#7FFF00';
	
    subTitleElement.textContent = prioridade;
	subTitleElement.style.color = getCorPrioridade(prioridade);
	
    contentElement.textContent = conteudo;
    
    card.appendChild(titleElement);
	card.appendChild(subTitleElement);
    card.appendChild(contentElement);
    
	card.addEventListener('click', function() {
        getNota(this.getAttribute('data-idUsu'),this.getAttribute('data-idNota'));
		abrirModal();
    });
	
    cardContainer.appendChild(card);
}

function buscarNotas(inputBuscar) {
    db = openRequest.result;
	
	var idUsuario;
	var idNota;
	var prioridade;
	var titulo;
	var conteudo;
	var id = localStorage.getItem('ident');
	
    var transaction  = db.transaction(["notas"], "readonly");
	
	var store    = transaction.objectStore("notas");
    var index    = store.index("nota_idx5");
	var chave    = [id,inputBuscar];
	var chaveMax = [id,inputBuscar + "\uffff"];
    var request  = index.getAll(IDBKeyRange.bound(chave, chaveMax));
	
	const cardContainer   = document.getElementById('container-card');
	
	while (cardContainer.firstChild) {
		cardContainer.removeChild(cardContainer.firstChild);
	}
	
    request.onsuccess = function() {
        var notasEncontradas = request.result;		
        if (notasEncontradas.length > 0) {
			for (var i = 0; i < notasEncontradas.length; i++) {
				idUsuario  = notasEncontradas[i].id_usuario;
				idNota     = notasEncontradas[i].id_nota;
				titulo     = notasEncontradas[i].titulo;
				conteudo   = notasEncontradas[i].conteudo;
				prioridade = notasEncontradas[i].prioridade;
				
				criarCard(idNota, idUsuario, false, titulo, conteudo, prioridade);
			}
        }
		
		buscaRelacao(id);
    };
	
	request.onerror = function(event) {
        console.error("Erro na busca: ", event.target.error);
    };
}
