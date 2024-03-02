//prefixes of implementation that we want to test
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange    = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) window.alert("O seu navegador não suporta uma versao estavel do IndexedDB.");

const usuarios = [
   { id: "01", name: "Administrador", username: "admin", senha: "1234" },
   { id: "02", name: "Gustavo", username: "gustavota", senha: "1234" },
   { id: "03", name: "Gustavo", username: "gustavo", senha: "1234" },
   { id: "04", name: "Filipe", username: "filipe", senha: "1234" }
];
let db;
let openRequest = indexedDB.open("dbusers", 1);

openRequest.onerror = function() {
   console.error("Erro ao conectar no banco de dados, Erro: ", error);
};

openRequest.onsuccess = function() {
   db = openRequest.result;
   console.log("Conectado com sucesso: " + db);
};

openRequest.onupgradeneeded = function() {
   console.info('Banco de dados dos usuario criado');

   db = openRequest.result;
   var objectStore = db.createObjectStore("users", {keyPath: "username"});
   
   objectStore.createIndex("username", "username", { unique: true });
   
   for (var i in usuarios) {
      objectStore.add(usuarios[i]);
   }
};

function fazer_login() {
    var transaction = db.transaction(["users"]);
    var objectStore = transaction.objectStore("users");
    var request     = objectStore.get(document.getElementById('username').value);
    
	if(document.getElementById('username').value == '' || document.getElementById('senha').value == '') {
		alert("O nome do usuario ou senha esta vazio!");
		return;
	}
	
    request.onerror = function(event) {
       alert("Erro ao conectar ao banco de dados!");
	   return;
    };
    
    request.onsuccess = function(event) {
		if(!request.result) {
			alert("Conta não encontrada!");
			return;
		}
		
		if(request.result.senha != document.getElementById('senha').value) {
			alert("Senha incorreta!");
			return;
		}
		
		window.location.replace("index.html");
    };
}