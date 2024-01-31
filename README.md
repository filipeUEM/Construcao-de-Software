# Notas

## Descrição

Primeiro trabalho da disciplina de Construção de Software. Este projeto visa criar um aplicativo web de notas, onde seja possível criar, organizar e buscar por suas notas de forma prática.

## Backlog do Produto

### Histórias de Usuário

| ID   | História de Usuário                                       |
|------|------------------------------------------------------------|
| H001 | Tela de Login. Como um usuário do sistema, eu quero ser capaz de criar uma conta na aplicação, fazer login e redefinir minha senha para que eu possa acessar e gerenciar minhas notas e recuperar o acesso à minha conta em caso de esquecimento da senha.|
| H002 | Tela Inicial. Como um usuário, ao acessar a tela inicial, quero visualizar uma tela intuitiva e autoexplicativa.|
| H003 | Criar Notas. Como um usuário, quero poder criar notas. Eu desejo poder inserir um título, uma data e o conteúdo da nota.|
| H004 | Excluir Notas. Como um usuário, quero poder excluir notas. A exclusão de uma nota não deve afetar a sequência das outras notas. |
| H005 | Buscar por Notas. Realizar buscas nas minhas notas. Quero ser capaz de encontrar uma nota com base no seu ID único, título ou data associada. |
| H006 | Editar Notas. Como usuário, quero poder editar todas as informações de uma nota após sua criação. A edição deve incluir a capacidade de modificar o título, a data e o conteúdo da nota, mantendo o mesmo ID, permitindo realizar alterações sem perder a referência da nota original. |
| H007 | Logoff da Aplicação. Como usuário quero ter segurança sobre minhas informações ao sair da aplicação, portanto desejo ter a opção de deslogar ao clicar em um botão. Ao deslogar, quero retornar à tela de login, mas quero que minhas informações criadas e modificadas sejam mantidas. |

## Arquitetura Projetada para o Software

### Diagramas

#### Diagrama de Caso de Uso
![Diagrama de Caso de Uso](https://github.com/filipeUEM/Construcao-de-Software/blob/main/Diagramas/Diagrama%20de%20Caso%20de%20Uso.png)

#### Diagrama de Classe
![Diagrama de Classe](https://github.com/filipeUEM/Construcao-de-Software/blob/main/Diagramas/Diagrama-de-classe.png)

#### Diagrama de Componentes
![Diagrama de Componentes](https://github.com/filipeUEM/Construcao-de-Software/blob/main/Diagramas/diagrama-de-componentes.PNG)

### Descrição da Arquitetura

- Considerando que será usado HTML, CSS e javascript para construir o programa, devido a simplicidade, a arquitetura escolhida é a Cliente-Servidor Simples. Foi escolhido a arquitetura Cliente-Servidor Simples para a criação do programa de notas devida a sua facilidade de desenvolvimento e manutenção. Com uma clara separação de responsabilidades entre o cliente (interface do usuário) e o servidor (lógica de negócios e armazenamento), o código torna-se mais compreensível e fácil de gerenciar. A menor complexidade da comunicação entre as partes resulta em um programa mais eficiente para um único usuário. Além disso, a escalabilidade vertical é viável, adaptando-se à medida que o programa cresce. Essa abordagem simplificada reduz custos de manutenção e oferece uma solução eficaz para projetos individuais ou de pequeno porte.

## Backlog da Sprint

### Sprint 1

#### Tarefas

| ID   | História de Usuário                                       |
|------|------------------------------------------------------------|
| H001 | Tela de Login. Como um usuário do sistema, eu quero ser capaz de criar uma conta na aplicação, fazer login e redefinir minha senha para que eu possa acessar e gerenciar minhas notas e recuperar o acesso à minha conta em caso de esquecimento da senha.|
| H002 | Tela Inicial. Como um usuário, ao acessar a tela inicial, quero visualizar uma tela intuitiva e autoexplicativa.|
| H003 | Criar Notas. Como um usuário, quero poder criar notas. Eu desejo poder inserir um título, uma data e o conteúdo da nota.|
| H004 | Excluir Notas. Como um usuário, quero poder excluir notas. A exclusão de uma nota não deve afetar a sequência das outras notas. |
| H005 | Buscar por Notas. Realizar buscas nas minhas notas. Quero ser capaz de encontrar uma nota com base no seu ID único, título ou data associada. |
| H006 | Editar Notas. Como usuário, quero poder editar todas as informações de uma nota após sua criação. A edição deve incluir a capacidade de modificar o título, a data e o conteúdo da nota, mantendo o mesmo ID, permitindo realizar alterações sem perder a referência da nota original. |
| H007 | Logoff da Aplicação. Como usuário quero ter segurança sobre minhas informações ao sair da aplicação, portanto desejo ter a opção de deslogar ao clicar em um botão. Ao deslogar, quero retornar à tela de login, mas quero que minhas informações criadas e modificadas sejam mantidas. |


--- 

### Acadêmicos

- Filipe Amadeu Santana
- Gustavo Henrique Franzin da Silva
- Gustavo Tadashi Takehara

### Professor

- Carlos Danilo Luz


