class ProjectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const imgSrc = this.getAttribute('img-src');
    const titleText = this.getAttribute('title');
    const descriptionText = this.getAttribute('description');
    const companyText = this.getAttribute('company');

    const card = document.createElement('div');
    card.setAttribute('class', 'project-card');

    const img = document.createElement('img');
    img.src = imgSrc;

    const title = document.createElement('span');
    title.textContent = titleText;
    title.setAttribute('class', 'title');

    const company = document.createElement('span');
    company.textContent = '@' + companyText;
    company.setAttribute('class', 'company');

    const companyAndTitle = document.createElement('div');
    companyAndTitle.setAttribute('class', 'company-and-title');
    companyAndTitle.appendChild(title);
    companyAndTitle.appendChild(company);

    const description = document.createElement('p');
    description.textContent = descriptionText;

    card.appendChild(img);
    card.appendChild(companyAndTitle);
    card.appendChild(description);

    const style = document.createElement('style');

    style.textContent = `
    .project-card {
      border: 1px solid #ddd;
      margin: 5px;
      margin-top: 10px;
      border-radius: 8px;
      background: white;
      box-shadow: 0 7px 8px rgba(0,0,0,0.2);
      cursor: pointer;
      display: flex;
      flex-direction: column;
      height: auto;
    }
    .company-and-title {
      align-items: center;
      margin: 10px
    }
    .company {
      font-weight: 500;
      border-bottom: 2.5px solid rgba(255, 0, 255, 0.8);
      margin-left: 10px;
      padding-bottom: 2px;
    }
    .title {
      font-weight: bold;
    }
    .project-card:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 12px rgba(0,0,0,0.3);
    }
    .project-card img {
      width: 100%; 
      height: 200px; 
      object-fit: cover; 
    }
    .project-card h3, .project-card p {
      margin: 10px;
    }
    `;
    this.shadowRoot.append(style, card);
  }
}

customElements.define('project-card', ProjectCard);
