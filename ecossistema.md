# 🌍 Documentação do Ecossistema do Projeto

Este projeto nasceu no evento **NLW Pocket 08** da Rocketseat! 🚀 A missão? Criar um sistema completo, com backend e frontend, proporcionando uma experiência prática e moderna em **JavaScript** e **TypeScript**. 💻

## 🏗️ Estrutura do Projeto

O projeto está dividido em duas pastas principais, **server** e **web**, que representam o cérebro e o rosto da aplicação, respectivamente.

### Pasta `server`

Aqui mora o backend, responsável por toda a lógica de negócios e a comunicação com o banco de dados. 🧠💾

#### 📂 Arquivos e Pastas Importantes:

- **`.env`**: Onde ficam as variáveis de ambiente secretas (shhh!). 🤫
- **`docker-compose.yml`**: Orquestrador de contêineres como um maestro do Docker! 🎶
- **`drizzle.config.ts`**: Configuração do nosso querido **Drizzle ORM**. 🌧️
- **`src/`**: O coração do servidor, com a lógica de banco de dados e os endpoints HTTP. 🚪
- **`package.json`**: A central de controle de dependências e scripts. 🎛️

#### 🎮 Scripts Úteis:

- **`start`**: Inicia o servidor e o Docker Compose. Tudo pronto para a decolagem! 🚀
- **`dev`**: Ativa o modo desenvolvimento. É hora de codar! 👨‍💻👩‍💻
- **`build`**: Compila o código TypeScript, preparando o terreno para a produção. 🔧
- **`seed`**: Alimenta o banco de dados com dados iniciais. 🌱
- **`lint`**: Verifica a qualidade do código, porque ninguém gosta de bugs! 🐞
- **`format`**: Formata o código automaticamente, mantendo tudo bonitinho. 💅

### Pasta `web`

Essa pasta é o rosto da aplicação, o frontend que o usuário interage! 😎💻

#### 📂 Arquivos e Pastas Importantes:

- **`index.html`**: A porta de entrada do frontend. 🚪
- **`src/`**: Contém o código-fonte da aplicação **React**. É onde a mágica acontece! ✨
- **`tailwind.config.js`**: Onde configuramos o **Tailwind CSS** para deixar o visual na moda. 🎨
- **`vite.config.ts`**: Configuração do **Vite** para compilar tudo rapidinho. ⚡
- **`package.json`**: Outra central de controle, mas agora para o frontend! 🎮

#### 🎮 Scripts Úteis:

- **`start`**: Inicia a aplicação em modo de produção. Acelera! 🚗💨
- **`dev`**: Modo de desenvolvimento ativado. Tudo pronto para o show! 🎤
- **`build`**: Compila o código TypeScript e constrói a aplicação. 🏗️
- **`lint`**: Verifica a qualidade do código, garantindo que tudo esteja perfeito. 🌟
- **`format`**: Deixa o código bem alinhado e organizado. 📏

## 📦 Dependências Principais

### Backend (`server/package.json`):

- **fastify**: O motor turbo do backend! 🚗💨
- **drizzle-orm**: Para manipulação suave do banco de dados. 🛠️
- **dotenv**: Carrega as variáveis de ambiente secretas. 🔑
- **zod**: Guardião dos esquemas e validador de dados. 🛡️

### Frontend (`web/package.json`):

- **react**: O mestre das interfaces de usuário! 🧙‍♂️
- **vite**: Build na velocidade da luz! ⚡
- **tailwindcss**: Deixa o frontend deslumbrante com CSS utilitário. 💅
- **react-hook-form**: Facilita a vida com formulários. 📝
- **zod**: Sempre garantindo que os dados estejam no formato certo! 🔍

## 📜 Licença

Este projeto está licenciado sob a **Licença MIT**. Quer mais detalhes? Dê uma olhada no arquivo LICENSE. 🔍

---

Agora que você já conhece o ecossistema, é só pôr a mão na massa e decolar! 🚀✨
