class ProjectDialog extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    const imgSrc = this.getAttribute('img-src');
    const titleText = this.getAttribute('title');
    const contentString = this.getAttribute('content');
    const companyText = this.getAttribute('company');
    const companyLinkURL = this.getAttribute('company-link');
    const projectLinkURL = this.getAttribute('project-link');
    const githubLinkURL = this.getAttribute('github-link');
    const techUsedString = this.getAttribute('tech-used');

    const dialog = document.createElement('dialog');
    dialog.setAttribute('class', 'project-dialog');

    const img = document.createElement('img');
    img.src = imgSrc;
    img.setAttribute('class', 'dialog-image');

    const title = document.createElement('p');
    let titleContent = titleText;
    if (projectLinkURL && projectLinkURL.length > 0) {
      titleContent = `<a href="${projectLinkURL}" target="_blank">${titleText}</a>`;
    }
    title.innerHTML = titleContent;

    const company = document.createElement('p');
    company.setAttribute('class', 'company');
    let companyContent = '@ ' + companyText;
    if (companyLinkURL && companyLinkURL.length > 0) {
      companyContent = `<a href="${companyLinkURL}" target="_blank">${companyText}</a>`;
    }
    company.innerHTML = companyContent;

    const companyAndTitle = document.createElement('div');
    companyAndTitle.setAttribute('class', 'company-and-title');
    companyAndTitle.appendChild(title);
    companyAndTitle.appendChild(company);

    const content = document.createElement('ul');
    content.setAttribute('class', 'dialog-content');
    if (contentString && contentString.length > 0) {
      const contentArray = JSON.parse(contentString);
      contentArray.forEach((itemText) => {
        const li = document.createElement('li');
        li.textContent = itemText;
        content.appendChild(li);
      });
    }

    let githubLink;

    if (githubLinkURL && githubLinkURL.length > 0) {
      githubLink = document.createElement('a');
      githubLink.setAttribute('href', githubLinkURL);
      githubLink.setAttribute('target', '_blank');
      githubLink.setAttribute('class', 'github-link');
      githubLink.textContent = 'GitHub';
      githubLink.className = 'github-link';
    } else {
      githubLink = document.createElement('p');
      githubLink.textContent = 'GitHub not available';
      githubLink.setAttribute('class', 'github-link');
    }

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.className = 'close-button';

    const techUsedElement = document.createElement('p');
    techUsedElement.setAttribute('class', 'tech-stack');
    techUsedElement.textContent = 'Tech stack: ';
    if (techUsedString && techUsedString.length > 0) {
      const techUsedArray = JSON.parse(techUsedString);
      const techUsedText = techUsedArray.join(', ');
      techUsedElement.textContent += techUsedText;
    } else {
      techUsedElement.textContent += 'Not available';
    }

    dialog.appendChild(img);
    dialog.appendChild(companyAndTitle);
    dialog.appendChild(githubLink);
    dialog.appendChild(content);
    dialog.appendChild(techUsedElement);
    dialog.appendChild(closeButton);
    dialog.appendChild(closeButton);

    const style = document.createElement('style');
    style.textContent = `
          .project-dialog {
            width: 100%;
            max-width: 500px;
            border: 1px solid #ccc;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            font-weight: 500;
          }
          .dialog-content {
            padding-left: 20px;
            border-bottom: 2px solid #aaa;
            border-top: 2px solid #aaa;
            padding-top: 10px;
            padding-bottom: 10px;
          }
          a {
            color: blue;
            text-decoration: none ;
          }
          li {
            list-style-type: square;
          }
          .github-link {
            padding: 10px;
          }
          .company-and-title {
            font-weight: 700;
            display: flex;
            flex-direction: row;
            font-size: 1.5em;
            align-items: center;
          }
          .company {
            font-weight: 700;
            padding: 5px;
          }
          .project-dialog img {
            max-width: 100%;
            object-fit: cover; 
          }
          .close-button {
            float: right;
            border: 1px solid #aaa;
            background: rgb(210, 210, 210);
            font-size: 1em;
            cursor: pointer;
            padding: 5px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
          .close-button:hover {
            background: rgb(200, 200, 200);
            cursor: pointer;
          }
          .close-button:active {
            background: rgb(180, 180, 180);
          }
          .dialog-description {
            max-height: 200px;
            margin-top: 10px;
          }
          .tech-stack {
            padding: 10px;
          }
          @media screen and (max-width: 768px) {
            .project-dialog {
              max-width: 400px;
            }
          }
          @media screen and (max-width: 480px) {
            .project-dialog {
              max-width: 300px;
            }
          }
      `;
    this.shadowRoot.append(style, dialog);

    closeButton.addEventListener('click', (event) => {
      event.stopPropagation();
      dialog.close();
    });

    dialog.addEventListener('click', (event) => {
      event.stopPropagation();
      if (event.target === dialog) {
        dialog.close();
      }
    });
  }

  openDialog() {
    this.shadowRoot.querySelector('dialog').showModal();
  }
}

customElements.define('project-dialog', ProjectDialog);
