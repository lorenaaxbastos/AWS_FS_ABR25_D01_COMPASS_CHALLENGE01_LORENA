# Coffee Shop - Desafio 01 - Programa de Bolsas da compass UOL

Um site responsivo e interativo de uma cafeteria, desenvolvido utilizando apenas **HTML**, **CSS** e **JavaScript puro**. O projeto foi além do protótipo original do Figma, incorporando práticas modernas como carregamento dinâmico de conteúdo, Web Components e arquitetura modularizada. Nenhum framework externo foi utilizado.

---

## 📌 Funcionalidades

-   Cards de produtos gerados dinamicamente a partir de um arquivo JSON
-   Sistema de filtros com base no tipo de produto
-   Tabela interativa exibindo os detalhes filtrados
-   Carrossel com feedbacks de clientes
-   Formulário de inscrição com validação de e-mail e persistência no localStorage
-   Efeitos visuais ao passar o mouse nos botões
-   Spinner de carregamento durante requisições
-   Layout responsivo para diferentes tamanhos de tela
-   Renderização dinâmica de layouts e páginas utilizando fetch() de parciais HTML e CSS
-   Componentização usando Web Components para reutilização de estruturas
-   Organização modular dos utilitários e componentes

---

## 🧱 Estrutura do Projeto

```
└── 📁src
    └── 📁components
        └── BaseComponent.js
        └── components.js
        └── 📁layout
            └── 📁footer
                └── Footer.css
                └── Footer.html
                └── Footer.js
            └── 📁header
                └── Header.css
                └── Header.html
                └── Header.js
            └── 📁nav
                └── Nav.css
                └── Nav.html
                └── Nav.js
        └── 📁sections
            └── 📁about-section
                └── AboutSection.css
                └── AboutSection.html
                └── AboutSection.js
            └── 📁cta-section
                └── CtaSection.css
                └── CtaSection.html
                └── CtaSection.js
            └── 📁hero-section
                └── HeroSection.css
                └── HeroSection.html
                └── HeroSection.js
            └── 📁menu-section
                └── MenuSection.css
                └── MenuSection.html
                └── MenuSection.js
            └── 📁subscription-section
                └── SubscriptionSection.css
                └── SubscriptionSection.html
                └── SubscriptionSection.js
            └── 📁testimonials-section
                └── TestimonialsSection.css
                └── TestimonialsSection.html
                └── TestimonialsSection.js
        └── 📁ui
            └── 📁button
                └── Button.css
                └── Button.html
                └── Button.js
            └── 📁menu
                └── Menu.css
                └── Menu.html
                └── Menu.js
            └── 📁subscription-form
                └── SubscriptionForm.css
                └── SubscriptionForm.html
                └── SubscriptionForm.js
            └── 📁testimonials
                └── TestimonialsCard.css
                └── TestimonialsCard.html
                └── TestimonialsCard.js
                └── TestimonialsSlider.css
                └── TestimonialsSlider.html
                └── TestimonialsSlider.js
    └── 📁configs
        └── .prettierrc
    └── 📁data
        └── all-items.json
        └── feedbacks.json
    └── 📁layouts
        └── main-layout.html
    └── 📁pages
        └── home.html
    └── 📁scripts
        └── index.js
    └── 📁shared
        └── 📁spinner
            └── Spinner.css
            └── Spinner.html
            └── Spinner.js
        └── 📁styles
            └── 📁abstracts
                └── _variables.css
            └── 📁base
                └── _animations.css
                └── _reset.css
                └── _typography.css
                └── _utilities.css
            └── index.css
    └── 📁utils
        └── loader.js
└── index.html
└── README.MD
```

---

## 🛠️ Tecnologias Utilizadas

![HTML5](https://img.shields.io/badge/HTML5-ee683a?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-0d88c2?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](<https://img.shields.io/badge/JavaScript%20(ES6%2B)-eeb735?style=for-the-badge&logo=javascript&logoColor=black>)

---

## ▶️ Como Executar o Projeto

1. Clone o repositório:

```bash
git clone git@github.com:seu-usuario/AWS_FS_ABR25_D01_COMPASS_nome-do-projeto.git
```

2. Navegue até o diretório do projeto:

```bash
cd AWS_FS_ABR25_D01_COMPASS_nome-do-projeto
```

3. Abra o arquivo `index.html` em seu navegador.

Não é necessário nenhum servidor local ou instalação de dependências externas.
