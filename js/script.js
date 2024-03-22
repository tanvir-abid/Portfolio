const portfolioProjects = [
  {
    name: 'Diaphanous',
    publishDate: '2023-05-15',
    designTheme: 'Glassmorphic',
    synopsis: 'This portfolio showcases a blend of frontend technologies such as HTML, CSS, and JavaScript for interactive and responsive web design. It leverages modern frameworks like Bootstrap for layout and styling consistency. Dynamic content loading and form submission are handled seamlessly through JavaScript, providing an engaging user experience.',
    path: 'Diaphanous/',
    images: ['image1.jpg', 'image2.jpg', 'image3.jpg']
  },
  {
    name: 'Penumbra',
    publishDate: '2023-08-20',
    designTheme: 'Neumorphic',
    synopsis: 'This portfolio showcases a blend of cutting-edge web technologies, featuring responsive design with CSS Grid and Flexbox, interactive components powered by JavaScript, and neumorphic design for a modern aesthetic. It leverages modular and maintainable code, optimizing performance for a seamless user experience.',
    path: 'Penumbra/',
    images: ['image4.jpg', 'image5.jpg', 'image6.jpg']
  },
  {
    name: 'Luminescence (Developing)',
    publishDate: '2023-11-10',
    designTheme: 'Neon',
    synopsis: 'This portfolio boasts a captivating neon-themed design, employing vibrant colors and sleek gradients to create a visually striking experience. Built with meticulous attention to detail, it combines modern web technologies to deliver an immersive and engaging showcase of skills and projects.',
    path: 'Luminescence/',
    images: ['image7.jpg', 'image8.jpg', 'image9.jpg']
  },
  {
    name: 'Project 4 (Comming Soon)',
    publishDate: '2024-02-01',
    designTheme: 'Futuristic',
    synopsis: 'A description of the fourth project...',
    path: '/projects/project4',
    images: ['image10.jpg', 'image11.jpg', 'image12.jpg']
  }
];



// Function to create the heading container
function createHeadingContainer() {
  const headingContainer = document.getElementById('headingContainer');

  // Create and append h1 tag
  const heading = document.createElement('h1');
  heading.textContent = 'Khondoker Abid Hasan Tanvir'; // Replace with your desired heading text
  headingContainer.appendChild(heading);

  // Create and append first p tag
  const paragraph1 = document.createElement('p');
  paragraph1.textContent = 'All My Porfolios'; 
  paragraph1.className = 'tagline';
  headingContainer.appendChild(paragraph1);

  // Create and append second p tag
  const paragraph2 = document.createElement('p');
  paragraph2.textContent = ''; // Replace with your desired text
  headingContainer.appendChild(paragraph2);
}

// Call the function to create the heading container
createHeadingContainer();



// Function to create card HTML for each project
function createCard(project) {
  const card = document.createElement('div');
  card.className = 'card';

  // Card header with automatic image slider
  const cardHeader = document.createElement('div');
  cardHeader.className = 'card-header';
  const imageContainer = document.createElement('div');
  imageContainer.className = 'image-container';

  let activeIndex = 0;

  // Function to update active image in the slider
  function updateSlider() {
    const images = imageContainer.querySelectorAll('img');
    images.forEach((img, index) => {
      if (index === activeIndex) {
        img.classList.add('active');
      } else {
        img.classList.remove('active');
      }
    });

    activeIndex = (activeIndex + 1) % images.length;
  }

  project.images.forEach((image, index) => {
    const img = document.createElement('img');
    img.src = `img/${image}`;
    if (index === 0) {
      img.classList.add('active');
    }
    imageContainer.appendChild(img);
  });

  // Set up automatic image slider interval with different delays for each card
  let delay = Math.floor(Math.random() * 5) + 2;
  setInterval(updateSlider, delay*1000); // Random delay between 1 and 5 seconds

  cardHeader.appendChild(imageContainer);
  card.appendChild(cardHeader);

  // Card body with other properties
  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  const properties = ['name', 'publishDate', 'designTheme', 'synopsis'];
  const titleDiv = document.createElement('div');
  titleDiv.className = 'portfolio-title';

  properties.forEach(prop => {
    if (prop === "name") {
      const h1 = document.createElement('h1');
      h1.innerHTML = `${project['name']}`;
      titleDiv.appendChild(h1);
      cardBody.appendChild(titleDiv);
    } else {
      const p = document.createElement('p');
      p.innerHTML = `<strong>${prop.charAt(0).toUpperCase() + prop.slice(1)}:</strong> ${project[prop]}`;
      cardBody.appendChild(p);
    }
  });

  // Button to redirect the user to the specified path
  const button = document.createElement('button');
  button.innerHTML = '<i class="fa-solid fa-arrow-up-right-from-square"></i>';
  button.onclick = function () {
    window.location.href = project.path;
  };

  titleDiv.appendChild(button);

  card.appendChild(cardBody);


  return card;
}


// Function to render all cards in the container
function renderPortfolio() {
const container = document.getElementById('portfolioContainer');

portfolioProjects.forEach(project => {
    const card = createCard(project);
    container.appendChild(card);
});
}

// Call the renderPortfolio function to display the cards
renderPortfolio();




function createStars() {
  const numberOfStars = 100;

  for (let i = 0; i < numberOfStars; i++) {
      createStar();
  }
}

function createStar() {
  const star = document.createElement('div');
  star.className = 'star';

  const startX = Math.random() * document.documentElement.clientWidth;
  const startY = Math.random() * document.documentElement.clientHeight;
console.log(startX);
console.log(startY);
  star.style.left = `${startX}px`;
  star.style.top = `${startY}px`;

  document.body.appendChild(star);

  animateStar(star);
}

function animateStar(star) {
  const speed = Math.random() * 2 + 1; // Adjust speed as needed

  function moveStar() {
      const currentTop = parseFloat(star.style.top);
      star.style.top = `${currentTop + speed}px`;

      if (currentTop > window.innerHeight) {
          // Reset star position if it goes beyond the window
          star.style.top = '0px';
          star.style.left = `${Math.random() * window.innerWidth}px`;
      }

      requestAnimationFrame(moveStar);
  }

  moveStar();
}

window.addEventListener('load', createStars);