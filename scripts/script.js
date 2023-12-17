document.addEventListener('DOMContentLoaded', () => {
  fetch('../data/data.json')
    .then((response) => response.json())
    .then((data) => {
      data.forEach((project) => {
        createProjectCard(project);
      });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
});

function createProjectCard(project) {
  const container = document.getElementById('projects-container');

  const card = document.createElement('div');
  card.className = 'w-full sm:w-1/2 md:w-1/2 p-2';
  const projectCard = document.createElement('project-card');
  projectCard.setAttribute('img-src', project.image);
  projectCard.setAttribute('title', project.title);
  projectCard.setAttribute('description', project.description);
  projectCard.setAttribute('company', project.company);
  card.appendChild(projectCard);

  const dialogView = document.createElement('project-dialog');
  dialogView.setAttribute('content', project.dialogContent);
  dialogView.setAttribute('img-src', project.image);
  dialogView.setAttribute('title', project.title);
  dialogView.setAttribute('company', project.company);
  dialogView.setAttribute('company-link', project.companyLink);
  dialogView.setAttribute('project-link', project.projectLink);
  dialogView.setAttribute('github-link', project.githubLink);
  dialogView.setAttribute('tech-used', project.techUsed);

  card.appendChild(dialogView);

  card.addEventListener('click', () => {
    dialogView.openDialog();
  });

  container.appendChild(card);
}
