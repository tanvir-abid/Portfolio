function fetchData() {
    return fetch('../data/data.json')
        .then(response => response.json())
        .then(data => {
            return data;
        });
}
//--------------------------------------------------------//
document.addEventListener('DOMContentLoaded', async function(){
    let allData = await fetchData();
    console.log(allData['section-contact'].socialMedia);

    const container = document.createElement('div');
    container.id = 'container';

    const homeParallaxContainer = createHomeParallaxContainer(allData['section-home'].slides, allData['section-contact'].socialMedia);
    container.appendChild(homeParallaxContainer); 

    const navigation = createNavigation();
    container.appendChild(navigation); 

    const aboutSection = createAboutContainer(allData['section-about']);
    container.appendChild(aboutSection);

    const serviceSection = createServiceCards(allData['section-services'].services);
    container.appendChild(serviceSection);

    const portfolioSection = createPortfolioContainer(allData['section-portfolio'].projects);
    container.appendChild(portfolioSection);

    const skillCardsContainer = createSkillCards(allData['section-skills'].skills);
    container.appendChild(skillCardsContainer);

    document.body.appendChild(container);
})


function generateSocialMedia(data) {
    const socialMediaContainer = document.createElement('div');
    socialMediaContainer.classList.add('social-media-container');

    data.forEach(item => {
        const socialMediaItem = document.createElement('div');
        socialMediaItem.classList.add('social-media-item');
        socialMediaItem.setAttribute('media-name', `${item.mediaName}`)

        const icon = document.createElement('span');
        icon.innerHTML = item.icon;

        const link = document.createElement('a');
        link.href = item.url;
        link.target = "_blank"; // Open in a new tab/window
        link.appendChild(icon);

        socialMediaItem.appendChild(link);
        socialMediaContainer.appendChild(socialMediaItem);
    });

    return socialMediaContainer;
}

//--------------------------------------------//
// create top nav //
//--------------------------------------------//
function createNavigation() {
    // Navigation item names and respective icons
    const navItemData = [
        { name: "Home", icon: '<i class="fa-solid fa-house-chimney"></i>' }, 
        { name: "Services", icon: '<i class="fa-solid fa-database"></i>' }, 
        { name: "Portfolios", icon: '<i class="fa-solid fa-images"></i>' }, 
        { name: "Contact", icon: '<i class="fa-regular fa-id-card"></i>' }
    ];

    // Create navigation element
    const nav = document.createElement('nav');
    const stickyClass = 'sticky-nav';

    // Function to handle scroll event
    function handleScroll() {
        const scrollY = window.scrollY || window.pageYOffset;

        if (scrollY >= window.innerHeight) {
            // Add the sticky class when scrolling down 100vh
            nav.classList.add(stickyClass);
        } else {
            // Remove the sticky class when scrolling back up
            nav.classList.remove(stickyClass);
        }
    }

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);
    // Create logo container
    const logoContainer = document.createElement('div');
    logoContainer.classList.add('logo-container');

    // Create logo image
    const logoImg = document.createElement('img');
    logoImg.src = 'img/logo.png'; // Replace 'path/to/your/logo.png' with the actual path to your logo image
    logoImg.alt = 'Logo';

    // Create logo heading
    const logoHeading = document.createElement('h1');
    logoHeading.textContent = window.innerWidth <= 768 ? 'Kh. Tanvir' : 'Khondoker Abid Hasan Tanvir';    

    // Append logo image and heading to logo container
    logoContainer.appendChild(logoImg);
    logoContainer.appendChild(logoHeading);

    // Append logo container to navigation element
    nav.appendChild(logoContainer);

    // Create nav container
    const navContainer = document.createElement('div');
    navContainer.classList.add('nav-container');

    // Create nav items container
    const navItemsContainer = document.createElement('div');
    navItemsContainer.classList.add('nav-items-container');

    // Create navigation items with icons
    navItemData.forEach(itemData => {
        const navItem = document.createElement('div');
        navItem.classList.add('nav-item');

        // Create a span for the icon
        const iconSpan = document.createElement('span');
        iconSpan.innerHTML = itemData.icon;

        // Create a span for the text
        const textSpan = document.createElement('span');
        textSpan.textContent = itemData.name;

        // Append the icon and text spans to the nav item
        navItem.appendChild(iconSpan);
        navItem.appendChild(textSpan);

        navItem.addEventListener('click', function () {
            const targetElement = document.getElementById(itemData.name.toLowerCase());

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });

        navItemsContainer.appendChild(navItem);
    });

    // Append nav items container to nav container
    navContainer.appendChild(navItemsContainer);

    // Create hire button
    const hireButton = document.createElement('span');
    hireButton.className = 'hire-btn';
    hireButton.innerHTML = '<i class="fa-solid fa-file-lines"></i>Hire';

    // Append hire button to nav container
    navContainer.appendChild(hireButton);

    if (window.innerWidth <= 768) {
        // For the mobile version, add a span with a bar icon
        const mobileNavToggle = document.createElement('span');
        mobileNavToggle.classList.add('mobile-nav-toggle');
        mobileNavToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        navItemsContainer.classList.add('hide');
        // Click event to toggle visibility classes
        mobileNavToggle.addEventListener('click', function () {
            if (navItemsContainer.classList.contains('hide')) {
                navItemsContainer.classList.remove('hide');
                navItemsContainer.classList.add('show');
                navItemsContainer.style.display = 'flex';
            } else {
                navItemsContainer.classList.remove('show');
                navItemsContainer.classList.add('hide');
                setTimeout(() => {
                    navItemsContainer.style.display = 'none';
                }, 490);
            }
        });

        // Append mobileNavToggle to nav container
        navContainer.appendChild(mobileNavToggle);
    }

    // Append nav container to navigation element
    nav.appendChild(navContainer);

    // Return the created navigation element
    return nav;
}

//-----------------------------------------------//
function createHomeParallaxContainer(slidersData,socialData) {
    // Get the image source of the first object
    const firstSlideImageSrc = slidersData[0].imageSrc;

    // Create the home-parallax-container div
    const homeParallaxContainer = document.createElement('div');
    homeParallaxContainer.classList.add('home-parallax-container');
    homeParallaxContainer.id = 'home';

    // Create the parallax-container div
    const parallaxContainer = document.createElement('div');
    parallaxContainer.classList.add('parallax-container');
    parallaxContainer.style.backgroundImage = `url(${firstSlideImageSrc})`;

    // Create the caption-container div
    const captionContainer = document.createElement('div');
    captionContainer.classList.add('caption-container');

    // Populate caption-container with h1 and h3 tags
    const captionTitle = document.createElement('h1');
    captionTitle.classList.add('hero-text');
    const captionDescription = document.createElement('h3');

    const contentWriterKeywords = [
        "Experienced SEO content writer for hire",
        "Freelance blog post writer specializing in tech",
        "Affordable creative writer for product descriptions",
        "Professional health and wellness article writer",
        "Content writer with expertise in finance and investments",
        "Fashion copywriter for e-commerce websites",
        "Skilled travel content writer for hire",
        "Legal content writing services",
        "Technology white paper writer",
        "Social media content creator for small businesses"
    ];

    captionTitle.textContent = 'Professional & Creative Content Writer';
    // Wrap each character with a span tag
    const words = captionTitle.textContent.split(' ');
    const lastWordIndex = words.length - 1;

    const wrappedWords = words.map((word, index) => {
        if (index === lastWordIndex) {
            // Wrap the last character of the last word with a span
            const lastCharacter = word.slice(-1);
            const remainingCharacters = word.slice(0, -1);
            return `<span>${remainingCharacters}<em>${lastCharacter}</em></span>`;
        } else {
            return `<span>${word}</span>`;
        }
    });

    captionTitle.innerHTML = wrappedWords.join(' ');
    
    captionContainer.appendChild(captionTitle);

    const initialText = document.createElement('span');
    initialText.textContent = 'Hi, I am ';
    const typeWriter = document.createElement('span');
    captionDescription.appendChild(initialText);
    captionDescription.appendChild(typeWriter);
    captionContainer.appendChild(captionDescription);
    
    let keywordIndex = 0;
    let typingEffectInterval;

    function startTypingEffect() {
        
        typingEffectInterval = setInterval(function () {
            if (typeWriter.textContent.length < contentWriterKeywords[keywordIndex].length) {
                typeWriter.textContent += contentWriterKeywords[keywordIndex].charAt(typeWriter.textContent.length);
            } else {
                clearInterval(typingEffectInterval);
                setTimeout(function () {
                    eraseText();
                }, 1500);
            }
        }, 100);
    }

    function eraseText() {
        typingEffectInterval = setInterval(function () {
            if (typeWriter.textContent.length > 0) {
                typeWriter.textContent = typeWriter.textContent.slice(0, -1);
            } else {
                clearInterval(typingEffectInterval);
                keywordIndex = (keywordIndex + 1) % contentWriterKeywords.length;
                setTimeout(function () {
                    startTypingEffect();
                }, 500);
            }
        }, 50);
    }

    // Start the typewriting effect
    startTypingEffect();

    captionContainer.appendChild(generateSocialMedia(socialData));
    // create and append down arrow 
    const downArrowContainer = document.createElement('div');
    downArrowContainer.classList.add('scroll-down-container');
    downArrowContainer.addEventListener('click', () => {
        // Scroll down 100vh when clicked
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth' // Optional: smooth scrolling animation
        });
    });

    const downArrow = document.createElement('span')
    downArrow.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
    downArrowContainer.appendChild(downArrow);
    captionContainer.appendChild(downArrowContainer);
    // Append parallax-container and caption-container to home-parallax-container
    homeParallaxContainer.appendChild(parallaxContainer);
    homeParallaxContainer.appendChild(captionContainer);

    // Return the created home-parallax-container div
    return homeParallaxContainer;
}
//----------------------------------------------//
// create about section //
//=================================================//
function createAboutContainer(data) {
    const aboutContainer = document.createElement('div');
    aboutContainer.classList.add('about-container');

    // Feature Image
    const featureImageContainer = document.createElement('div');
    featureImageContainer.classList.add('feature-image-container');

    // Add an image (You need to replace 'path/to/image.jpg' with the actual image path)
    const featureImage = document.createElement('img');
    featureImage.src = 'img/tanvir.jpg';
    featureImage.alt = 'Feature Image';
    featureImageContainer.appendChild(featureImage);

    // About Contents
    const aboutContentsContainer = document.createElement('div');
    aboutContentsContainer.classList.add('about-contents-container');

    const aboutContents = document.createElement('div');
    aboutContents.classList.add('about-contents');

    const aboutHeader = document.createElement('h1');
    aboutHeader.classList.add('glow-h1-text');
    aboutHeader.innerHTML = 'About Me';
    const words = aboutHeader.textContent.split(' ');
const lastWord = words.pop();

// Concatenate the words with the last word wrapped in a <span> tag
aboutHeader.innerHTML = words.join(' ') + ' <span class="blinking">' + lastWord + '</span>';

    const aboutTagLine = document.createElement('h4');
    aboutTagLine.classList.add('one-line')
    aboutTagLine.textContent = 'My Story';

    aboutContents.appendChild(aboutHeader);
    aboutContents.appendChild(aboutTagLine);

    // Add paragraphs with strong tags for bold text
    data.texts.forEach(text => {
        const paragraph = document.createElement('p');
        paragraph.innerHTML = text;
        aboutContents.appendChild(paragraph);
    });
    aboutContentsContainer.appendChild(aboutContents);
    // Append feature image and about contents to about container
    aboutContainer.appendChild(featureImageContainer);
    aboutContainer.appendChild(aboutContentsContainer);

    return aboutContainer;
}
//===========================================================//
// create service section //
//===========================================================//
function createServiceCards(data) {
    // Service Container
    const serviceContainer = document.createElement('div');
    serviceContainer.classList.add('service-container');
    serviceContainer.id = 'services';

    // Title Div
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title-div');

    const titleHeading = document.createElement('h1');
    titleHeading.classList.add('glow-h1-text');
    titleHeading.textContent = 'Services';
    titleHeading.innerHTML = titleHeading.textContent.replace(/(.{3})(.)/, '$1<span class="flicking">$2</span>');

    const subTitle = document.createElement('h4');
    subTitle.classList.add('two-line')
    subTitle.textContent = 'Explore our offered services';

    titleDiv.appendChild(titleHeading);
    titleDiv.appendChild(subTitle);

    // Append Title Div to Service Container
    serviceContainer.appendChild(titleDiv);

    // Card Container
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    data.forEach((service, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.display = 'none';

        // Card Header
        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');

        const icon = document.createElement('i');
        service.icon.split(' ').forEach(className => {
            icon.classList.add(className);
        });

        const nameTaglineContainer = document.createElement('div');
        const name = document.createElement('h3');
        name.textContent = service.name;

        const tagline = document.createElement('p');
        tagline.textContent = service.tagLine;

        nameTaglineContainer.appendChild(name);
        nameTaglineContainer.appendChild(tagline);

        cardHeader.appendChild(icon);
        cardHeader.appendChild(nameTaglineContainer);

        // Card Body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const synopsis = document.createElement('p');
        synopsis.textContent = service.synopsis;

        cardBody.appendChild(synopsis);

        // Card Footer
        const cardFooter = document.createElement('div');
        cardFooter.classList.add('card-footer');

        const button = document.createElement('button');
        button.textContent = service.buttonText;
        button.addEventListener('click', function () {
            createModal(service.name, service.plans);
        });

        cardFooter.appendChild(button);

        // Append Header, Body, and Footer to Card
        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        card.appendChild(cardFooter);

        // Append Card to Card Container
        cardContainer.appendChild(card);

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // If the section is in view, display tab cards
                    setTimeout(() => {
                        card.style.display = 'block';
                    }, index * 500);
                    observer.unobserve(entry.target); // Stop observing once displayed
                }
            });
        }, { threshold: 0.5 }); // Adjust threshold as needed

        // Observe the section containing tab cards
        observer.observe(cardContainer);
    });

    // Append Card Container to Service Container
    serviceContainer.appendChild(cardContainer);

    return serviceContainer;
}

//============================================================//
// create portfolio section //
//==============================================================//
function createPortfolioContainer(projectsData) {
    const portfolioContainer = document.createElement('div');
    portfolioContainer.classList.add('portfolio-container');
    portfolioContainer.id = "portfolios";

    // Title Div
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title-div');

    const titleH1 = document.createElement('h1');
    titleH1.classList.add('glow-h1-text');
    titleH1.textContent = 'Portfolio';
    titleH1.innerHTML = titleH1.textContent.replace(/(.{3})(.)/, '$1<span class="flicking">$2</span>');

    const titleH4 = document.createElement('h4');
    titleH4.classList.add('two-line');
    titleH4.textContent = 'Explore my work';

    titleDiv.appendChild(titleH1);
    titleDiv.appendChild(titleH4);

    portfolioContainer.appendChild(titleDiv);

    // Tab Container
    const tabContainer = document.createElement('div');
    tabContainer.classList.add('tab-container');

    // Create tabs for each category
    const categories = ['All', ...Array.from(new Set(projectsData.map(project => project.category)))];

    const tabsContainer = document.createElement('div');
    tabsContainer.classList.add('tabs');

    categories.forEach(category => {
        const tab = document.createElement('div');
        tab.classList.add('tab');
        tab.textContent = category;

        tab.addEventListener('click', () => {
            filterProjects(category);
            updateActiveTab(tab);
        });

        tabsContainer.appendChild(tab);
    });

    tabContainer.appendChild(tabsContainer);

    // Create tab cards for each project
    const tabCardsContainer = document.createElement('div');
    tabCardsContainer.classList.add('tab-cards-container');

    function filterProjects(category) {
        const filteredProjects = category === 'All' ?
            projectsData :
            projectsData.filter(project => project.category === category);

        tabCardsContainer.innerHTML = '';

        filteredProjects.forEach((project, index) => {

            const tabCard = document.createElement('div');
            tabCard.classList.add('tab-card');

            // Card Front
            const cardFront = document.createElement('div');
            cardFront.classList.add('card-front');

            // Header
            const header = document.createElement('div');
            header.classList.add('header');

            const image = document.createElement('img');
            image.src = project.imageSrc;
            image.alt = project.title;

            const titleTag = document.createElement('div');
            titleTag.classList.add('title-tag');

            const title = document.createElement('h3');
            title.textContent = project.title;

            const tag = document.createElement('span');
            tag.textContent = project.tags.join(', ');

            titleTag.appendChild(title);
            titleTag.appendChild(tag);

            header.appendChild(image);
            header.appendChild(titleTag);
            cardFront.appendChild(header);

            // Card Back
            const cardBack = document.createElement('div');
            cardBack.classList.add('card-back');

            const body = document.createElement('div');
            body.classList.add('body');

            const description = document.createElement('p');
            description.textContent = project.description;

            body.appendChild(description);

            const footer = document.createElement('div');
            footer.classList.add('footer');

            const button = document.createElement('button');
            button.textContent = 'Learn More';
            button.addEventListener('click', () => {
                createModal(project.title, project.projectURL, project.category)
            });

            footer.appendChild(button);

            cardBack.appendChild(body);
            cardBack.appendChild(footer);

            // Append Front and Back to Tab Card
            tabCard.appendChild(cardFront);
            tabCard.appendChild(cardBack);

            tabCardsContainer.appendChild(tabCard);
            setTimeout(() => {
                tabCard.style.display = 'block';
            }, index * 500); 
        });
    }

    function updateActiveTab(clickedTab) {
        const allTabs = tabsContainer.querySelectorAll('.tab');
        allTabs.forEach(tab => {
            tab.classList.remove('active');
        });
        clickedTab.classList.add('active');
    }
    // Trigger a click on the "All" tab when the page loads
    const allTab = tabsContainer.querySelector('.tab');
    updateActiveTab(allTab);
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If the section is in view, display tab cards
                filterProjects('All');
                observer.unobserve(entry.target); // Stop observing once displayed
            }
        });
    },{ threshold: 0.5 }); // Adjust threshold as needed
    
    // Observe the section containing tab cards
    observer.observe(tabCardsContainer);
    tabContainer.appendChild(tabCardsContainer);
    portfolioContainer.appendChild(tabContainer);

    return portfolioContainer;
}
//============================================================//
// create skill section //
//==============================================================//
function createSkillCards(skillData) {
    const skillsContainer = document.createElement('div');
    skillsContainer.classList.add('skills-container');

    // Title Div
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title-div');

    // Title Heading
    const titleHeading = document.createElement('h1');
    titleHeading.textContent = 'Skills Showcase';
    titleHeading.className = 'glow-h1-text2';
    titleHeading.innerHTML = titleHeading.textContent.replace(/(.{2})(.)/, '$1<span class="flicking">$2</span>');

    // Title Subheading
    const titleSubheading = document.createElement('h4');
    titleSubheading.textContent = 'Explore my skills and expertise';
    titleSubheading.className = 'two-line';

    titleDiv.appendChild(titleHeading);
    titleDiv.appendChild(titleSubheading);

    skillsContainer.appendChild(titleDiv);

    // Skill Cards Container
    const skillCardsContainer = document.createElement('div');
    skillCardsContainer.classList.add('skill-cards-container');

    let observer;

    function handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startProgressCount();
                observer.unobserve(entry.target);
            }
        });
    }

    observer = new IntersectionObserver(handleIntersection, { threshold: 0.9 });
    observer.observe(skillCardsContainer);

    function startProgressCount() {
        skillData.forEach(category => {
            category.items.forEach(skill => {
                const progress = skillCardsContainer.querySelector(`[data-skill='${skill.name}']`);
                let count = 0;
                let MAX = skill.level;

                let run = setInterval(() => {
                    count++;
                    if (count <= MAX) {
                        progress.parentElement.style.background = `conic-gradient(#0fa ${count}%, #212428 0)`;
                        progress.firstElementChild.textContent = `${count}%`;
                    }
                    if (count == MAX) {
                        clearInterval(run);
                    }
                }, 50);
            });
        });
    }

    skillData.forEach(category => {
        const skillCard = document.createElement('div');
        skillCard.classList.add('skill-card');

        // Skill Card Header
        const skillCardHeader = document.createElement('div');
        skillCardHeader.classList.add('skill-card-header');

        const categoryName = document.createElement('h2');
        categoryName.textContent = category.category;
        skillCardHeader.appendChild(categoryName);

        // Skill Card Body
        const skillCardBody = document.createElement('div');
        skillCardBody.classList.add('skill-card-body');

        category.items.forEach(skill => {
            const parentSkill = document.createElement('div');
            parentSkill.classList.add('parent-skill');

            const skillElement = document.createElement('div');
            skillElement.classList.add('skill');

            const progress = document.createElement('div');
            progress.classList.add('progress');
            progress.dataset.skill = skill.name;

            const progressNumber = document.createElement('span');
            progressNumber.classList.add('progress-number');
            progressNumber.textContent = '0%';

            progress.appendChild(progressNumber);
            skillElement.appendChild(progress);

            const skillTitle = document.createElement('span');
            skillTitle.classList.add('skill-title');
            skillTitle.textContent = skill.name;

            parentSkill.appendChild(skillElement);
            parentSkill.appendChild(skillTitle);

            skillCardBody.appendChild(parentSkill);
        });

        skillCard.appendChild(skillCardHeader);
        skillCard.appendChild(skillCardBody);

        skillCardsContainer.appendChild(skillCard);
    });

    skillsContainer.appendChild(skillCardsContainer);

    return skillsContainer;
}

