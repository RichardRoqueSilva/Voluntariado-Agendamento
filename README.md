<h1 align="center">
  Voluntariado agendamento
</h1>

<h4 align="center">Status: ✔ Concluído</h4>

---

<p align="center">
 <a href="#user-content-sobre-o-projeto">Sobre o projeto</a> |
 <a href="#user-content-executando-o-projeto">Executando o projeto</a> |
 <a href="#user-content-tecnologias">Tecnologias</a>
</p>

---

## **Sobre o projeto**

Projeto integrador para de gestão de escalas da ONG "Doutores Panacéia", desenvolvido em Spring boot e Angular.

## **Executando o projeto**

### Pré-requisitos

-   NodeJS ( versão utilizada: 22.12.0 )
-   Npm ( versão utilizada: 10.9.0 )
-   Angular CLI ( versão utilizada: 19.1.7 )
-   Java ( versão utilizada: 17 )
-   Apache Maven ( versão utilizada: 3.9.11 )

### Instruções adicionais

Por padrão, a aplicação vai buscar os dados em nosso back-end no endereço `http://localhost:8080`. Para alterá-lo, modifique a propriedade `apiUrl` do arquivo `frontent/src/environments/environment.ts`.

A configuração do CORS irá permitir a origem `http://localhost:4200` e `http://127.0.0.1:4200` por padrão. É possível alterá-la através da propriedade `voluntariado.origenspermitidas` do arquivo de configurações ou, ao rodar o projeto, modificando a origem permitida através da linha de comando.
Exemplo:

```bash
$ ./mvnw spring-boot:run -Dspring-boot.run.arguments=--voluntariado.origenspermitidas=http://localhost:8000
```

### Instruções de execução do frontend do projeto (/frontend)

```bash
# Na pasta raíz do projeto do frontend, instale as dependências
$ npm install

# Execute o projeto em modo de desenvolvimento
$ npm start
# ou
$ ng serve

# O servidor de desenvolvimento será iniciado na porta 4200
# Para acessar o projeto, navegue para http://localhost:4200

# Para alterar a porta do servidor de desenvolvimento utilize a opção --port seguida do número da porta
$ ng serve --port 8000
```

### Instruções de execução do backend do projeto (/agendamentos)

```bash
# Na pasta raíz do projeto
# Execute o projeto (utilizando o maven wrapper)
$ ./mvnw spring-boot:run

# Execute o projeto (com o maven instalado)
$ mvn spring-boot:run
```


## **Tecnologias**

Este projeto foi construído com as seguintes ferramentas/tecnologias:

-   **[Angular](https://angular.io/)**
-   **[Angular Material](https://material.angular.dev/)**
-   **[Java](https://www.java.com/)**
-   **[Spring Boot](https://spring.io/projects/spring-boot)**