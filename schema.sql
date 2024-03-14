CREATE TABLE Usuario (
    ID_Usuario SERIAL PRIMARY KEY, 
    Nome_de_usuario VARCHAR(100) NOT NULL,
    Senha VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL
);

CREATE TABLE Nota (
    ID_Nota SERIAL PRIMARY KEY,
    Titulo VARCHAR(255) NOT NULL,
    Conteudo TEXT NOT NULL,
    Data_de_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Data_de_modificacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ID_Usuario INTEGER NOT NULL,
    Prioridade INTEGER, -- Definição completa do campo Prioridade
    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario)
);

CREATE TABLE Rel_nota_usu (
    ID_Usuario INTEGER NOT NULL,
    ID_Nota INTEGER NOT NULL,
    ID_Usuario_Compartilha INTEGER NOT NULL PRIMARY KEY,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario),
    FOREIGN KEY (ID_Nota) REFERENCES Nota(ID_Nota)

);
