class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const header = document.createElement('header');
    header.setAttribute('class', 'header');

    const nav = document.createElement('nav');

    const homeLink = document.createElement('a');
    homeLink.textContent = 'Home';
    homeLink.href = '/index.html';
    homeLink.classList.add('nav-link');

    const blogLink = document.createElement('a');
    blogLink.textContent = 'Blog';
    blogLink.href = '/html/blogs-main.html';
    blogLink.classList.add('nav-link');

    nav.appendChild(homeLink);
    nav.appendChild(blogLink);

    const iconContainer = document.createElement('div');
    iconContainer.setAttribute('class', 'icon-container');

    const githubLink = document.createElement('a');
    githubLink.href = 'https://www.github.com/ilya-wd';
    const githubIcon = document.createElement('img');
    githubLink.target = '_blank';
    githubIcon.src = '/assets/logos/github-mark.svg';
    githubIcon.alt = 'GitHub';
    githubLink.appendChild(githubIcon);

    const linkedinLink = document.createElement('a');
    linkedinLink.href = 'https://www.linkedin.com/in/ilya-nekrasov';
    const linkedinIcon = document.createElement('img');
    linkedinLink.target = '_blank';
    linkedinIcon.src = '/assets/logos/linkedin-100.svg';
    linkedinIcon.alt = 'LinkedIn';
    linkedinLink.appendChild(linkedinIcon);

    iconContainer.appendChild(githubLink);
    iconContainer.appendChild(linkedinLink);

    const blogName = document.createElement('p');
    blogName.textContent = `Ilya's Page`;
    blogName.setAttribute('class', 'blog-name');

    header.appendChild(blogName);
    header.appendChild(nav);
    header.appendChild(iconContainer);

    const style = document.createElement('style');
    style.textContent = `
      .header {
        background-color: rgb(220, 244, 246);
        color: black;
        text-align: center;
        padding: 0.5em 1em;
        border-bottom: 3px solid rgba(0, 0, 0, 0.3);
        font-size: 1.2rem;
        display: grid;
        grid-template-columns: auto 1fr auto;
        justify-items: center;
        align-items: center;
      }
      .nav-link {
        background-color: transparent;
        border: none;
        cursor: pointer;
        font-size: 1.5rem;
        font-weight: 600;
        color: black;
        text-decoration: underline;
        margin-right: 10px;
        margin-left: 10px;
      }
      .icon-container img{
        width: 36px; 
        height: auto;
        margin-right: 20px;
      }
      .icon-container img:hover {
        transform: scale(1.1);
      }   
      .blog-name {
        font-weight: 600;
        font-size: 1.5rem;
        margin-left: 10px;
      }
      .nav-link:hover {
        color: rgb(163, 31, 162);
      }
      @media (max-width: 600px) {
        .icon-container img {
          margin-top: 10px;
          width: 22px;
          gap: 0px;
          margin-right: 10px;
        }
        .header {
          grid-template-columns: 1fr;
          text-align: center;
        }
        .icon-container, .blog-name, nav {
          order: 1;
          margin-top: 10px;
        }
    `;

    this.shadowRoot.append(style, header);
  }
}

customElements.define('my-header', Header);
