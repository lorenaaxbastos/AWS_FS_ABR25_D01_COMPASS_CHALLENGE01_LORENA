# Bean Scene Coffee Shop - Interactive Web Page

## 📄 Description

This project was developed as part of a **Compass UOL challenge**, during my internship in the Compass scholarship program. It consists of a web page where sections are progressively revealed with fade-in transitions, following a **Figma design provided as a reference**. Each section dynamically receives a loading spinner for accessibility and user feedback purposes.

The implementation emphasizes accessibility, semantic HTML, dynamic DOM manipulation, progressive enhancement, and modern CSS animations. It showcases JavaScript DOM manipulation skills, accessibility considerations, and dynamic UI building without relying on frontend frameworks.

You can view the live website here: **[bean-scene-compass.netlify.app](https://bean-scene-compass.netlify.app/)**

## 🚀 Features

-   Progressive reveal of sections with fade-in transitions
-   Dynamic injection of loading spinners in each section
-   Clean, modular JavaScript code
-   CSS use of pseudo-classes, pseudo-elements, animations and transitions for smooth UI effects
-   Vanilla JavaScript (no external libraries or frameworks)
-   Semantic HTML structure
-   Accessibility best practices (ARIA roles, live regions)
-   Organized project structure with Git branches and commits following conventional commit standards
-   Readable code for maintainability

...and much more!

## 🛠️ Technologies Used

![HTML5](https://img.shields.io/badge/HTML5-ee683a?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-0d88c2?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](<https://img.shields.io/badge/JavaScript%20(ES6%2B)-eeb735?style=for-the-badge&logo=javascript&logoColor=black>)

## ⚙️ Installation & Setup

No external dependencies are required!

### To run locally:

1. Clone the repository:

```bash
git clone https://github.com/lorenaaxbastos/AWS_FS_ABR25_D01_COMPASS_CHALLENGE01_LORENA.git
```

2. Open the index.html file directly in your browser.

Alternatively, if you use a local server (recommended for testing):

```bash
# If you have live-server installed
live-server

# Or use VSCode Live Server extension
```

## 📝 Project Structure

```
└── 📁src
    └── 📁components
        └── BaseComponent.js
        └── BaseSection.js
        └── components.js
        └── 📁layout
            └── 📁footer
                └── Footer.css
                └── Footer.html
                └── Footer.js
            └── 📁header
                └── ...
            └── 📁nav
                └── ...
        └── 📁sections
            └── 📁about-section
                └── AboutSection.css
                └── AboutSection.html
                └── AboutSection.js
            └── 📁cta-section
                └── ...
            └── 📁hero-section
                └── ...
            └── 📁menu-section
                └── ...
            └── 📁subscription-section
                └── ...
            └── 📁testimonials-section
                └── ...
        └── 📁ui
            └── 📁button
                └── Button.css
                └── Button.html
                └── Button.js
            └── 📁menu # MenuCard, MenuCards and MenuTable
                └── ...
            └── 📁slider
                └── ...
            └── 📁subscription-form
                └── ...
            └── 📁testimonial
                └── ...
    └── 📁configs
        └── .prettierrc
    └── 📁data
        └── all-items.json
        └── feedbacks.json
        └── nav.json
    └── 📁imgs
        └── ...
    └── 📁layouts
        └── main-layout.html
    └── 📁pages
        └── home.html
    └── 📁scripts
        └── index.js
    └── 📁shared
        └── 📁section
            └── observeReadyEvents.js
            └── observeSection.css
            └── observeSection.js
        └── 📁spinner
            └── Spinner.css
            └── Spinner.js
        └── 📁styles
            └── 📁abstracts
                └── _variables.css
            └── 📁base
                └── _reset.css
                └── _typography.css
                └── _utilities.css
            └── index.css
    └── 📁utils
        └── format.js
        └── globalCssLoader.js
        └── injectSpinners.js
        └── loader.js
```

## 📣 Author

**Lorena Bastos**

Full-Stack Developer & Compass UOL Intern
Aspiring Senior Developer

_Passionate about clean code, innovation, and best practices._

**LinkedIn:** [linkedin.com/in/lorenaaxbastos](https://www.linkedin.com/in/lorenaaxbastos/)

## 📃 License

MIT License
