# Estoque

<img src="printscreen.png" alt="Projeto">

> Controle e gerenciamento de estoque através de uma dashboard interativa.


## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Você possui as versões mais recentes `Docker` e do `Docker Compose` 
- Você tem uma máquina `Windows (10 ou 11 com WSL ativo) / Linux / Mac`.

## 🚀 Instalando o projeto

Para instalar o estoque, siga estas etapas:

Linux, macOS e Windows:

```
crie um arquivo .env na raiz do projeto
adicione as configurações do .env do laravel
altere o arquivo .env do front-end em estoque_front
docker-compose build
docker-compose start
```

## ☕ Editando em tempo real 

O backend ja é editado em tempo real, para o front-end, siga estas etapas:

```
instale o node (v18 ou superior)
entre na pasta estoque_frontend
npm install
npm run dev
```

ou então (não recomendado):
```
entre na pasta estoque_frontend
crie um arquivo Dockerfile
configure o dockerfile para rodar os comandos acima
```

Adicione comandos de execução e exemplos que você acha que os usuários acharão úteis. Forneça uma referência de opções
para pontos de bônus!

## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE) para mais detalhes.