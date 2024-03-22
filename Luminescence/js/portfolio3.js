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
    console.log(allData['section-home'].ownerInfo.name);

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

    const qualificationContainer = createQualificationCards(allData['section-experience']);
    container.appendChild(qualificationContainer);

    const testimonialContainer = createTestimonialContainer(allData['section-testimonials']);
    container.appendChild(testimonialContainer);

    const contactContainer = createContactContainer(allData['section-contact'],allData['section-contact'].socialMedia);
    container.appendChild(contactContainer);

    const currentYear = new Date().getFullYear();
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    
    const creditText = document.createElement('p');
    creditText.textContent = `${allData['section-home'].ownerInfo.name} © ${currentYear}. All rights reserved.`;
    footer.appendChild(creditText);
    
    container.appendChild(footer);
    

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

    observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });
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
//============================================================//
// create qualification section //
//==============================================================//
function createQualificationCards(data) {
    const qualificationCardContainer = document.createElement('div');
    qualificationCardContainer.classList.add('qualification-card-container');
    // Title Div
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title-div');

    const titleH1 = document.createElement('h1');
    titleH1.classList.add('glow-h1-text2');
    titleH1.textContent = 'Qualification';
    titleH1.innerHTML = titleH1.textContent.replace(/(.{5})(.)/, '$1<span class="flicking">$2</span>');

    const titleH4 = document.createElement('h4');
    titleH4.classList.add('two-line');
    titleH4.textContent = 'Explore my work';

    titleDiv.appendChild(titleH1);
    titleDiv.appendChild(titleH4);

    qualificationCardContainer.appendChild(titleDiv);

    // Education Data
    const educationData = data['data-education'];
    educationData.education.sort((a, b) => new Date(b.graduationYear) - new Date(a.graduationYear));
    const educationContainer = document.createElement('div');
    educationContainer.classList.add('education-container');

    const eduCardContainer = document.createElement('div');
    eduCardContainer.classList.add('Qcard-container');

    const educationHeading = document.createElement('h1');
    educationHeading.innerHTML = `<i class="fa-solid fa-graduation-cap"></i> ${educationData.heading.replace(/(.{9})(.)/, '$1<span class="flicking">$2</span>')}`;
    educationContainer.appendChild(educationHeading);

    educationData.education.forEach(edu => {
        const qCard = document.createElement('div');
        qCard.classList.add('Qcard');

        const qCardHeader = document.createElement('div');
        qCardHeader.classList.add('Qcard-header');

        const degreeElement = document.createElement('h2');
        degreeElement.textContent = edu.degree;
        qCardHeader.appendChild(degreeElement);

        const graduationYearElement = document.createElement('span');
        graduationYearElement.textContent = edu.graduationYear;
        qCardHeader.appendChild(graduationYearElement);

        qCard.appendChild(qCardHeader);

        const qCardBody = document.createElement('div');
        qCardBody.classList.add('Qcard-body');
        qCardBody.setAttribute('data-year', edu.graduationYear)

        // Details Div
        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('details');
        const detailsHeading = document.createElement('h3');
        detailsHeading.textContent = 'Details';
        detailsDiv.appendChild(detailsHeading);
        
        const subjectElement = document.createElement('p');
        subjectElement.innerHTML = '<i class="fa-solid fa-book-open"></i> Subject: ' + edu.subject;
        detailsDiv.appendChild(subjectElement);

        const universityElement = document.createElement('p');
        universityElement.innerHTML = '<i class="fa-solid fa-building-columns"></i> University: ' + edu.university;
        detailsDiv.appendChild(universityElement);

        const locationElement = document.createElement('p');
        locationElement.innerHTML = '<i class="fa-solid fa-map-location"></i> Location: ' + edu.location;
        detailsDiv.appendChild(locationElement);

        const graduationYearDetailElement = document.createElement('p');
        graduationYearDetailElement.innerHTML = '<i class="fa-solid fa-trophy"></i> Graduation Year: ' + edu.graduationYear;
        detailsDiv.appendChild(graduationYearDetailElement);

        qCardBody.appendChild(detailsDiv);

        // Responsibilities Div
        const responsibilitiesDiv = document.createElement('div');
        responsibilitiesDiv.classList.add('responsibilities');

        const responsibilitiesHeading = document.createElement('h3');
        responsibilitiesHeading.textContent = 'Activities';
        responsibilitiesDiv.appendChild(responsibilitiesHeading);

        const activitiesElement = document.createElement('ul');
        edu.activity.forEach(act => {
            const activity = document.createElement('li');
            activity.innerHTML = `<i class="fa-solid fa-check"></i> ${act}`;
            activitiesElement.appendChild(activity);
        });
        responsibilitiesDiv.appendChild(activitiesElement);

        qCardBody.appendChild(responsibilitiesDiv);

        qCard.appendChild(qCardBody);

        eduCardContainer.appendChild(qCard);
    });
    educationContainer.appendChild(eduCardContainer);

    // Experience Data
    const experienceData = data['data-experience'];
    experienceData.experience.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    const experienceContainer = document.createElement('div');
    experienceContainer.classList.add('qualification-container');

    const experienceCardContainer = document.createElement('div');
    experienceCardContainer.classList.add('Qcard-container');

    const experienceHeading = document.createElement('h1');
    experienceHeading.innerHTML = `<i class="fa-solid fa-chart-simple"></i> ${experienceData.heading.replace(/(.{13})(.)/, '$1<span class="flicking">$2</span>')}`;
    experienceContainer.appendChild(experienceHeading);

    experienceData.experience.forEach(exp => {
        const expCard = document.createElement('div');
        expCard.classList.add('Qcard');

        const expCardHeader = document.createElement('div');
        expCardHeader.classList.add('Qcard-header');

        const positionElement = document.createElement('h2');
        positionElement.textContent = exp.position;
        expCardHeader.appendChild(positionElement);

        const startDateElement = document.createElement('span');
        startDateElement.textContent = exp.startDate;
        expCardHeader.appendChild(startDateElement);

        expCard.appendChild(expCardHeader);

        const expCardBody = document.createElement('div');
        expCardBody.classList.add('Qcard-body');
        expCardBody.setAttribute('data-year', exp.startDate.split('-')[0]);

        // Details Div
        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('details');
        const detailsHeading = document.createElement('h3');
        detailsHeading.textContent = 'Details';
        detailsDiv.appendChild(detailsHeading);

        const companyElement = document.createElement('p');
        companyElement.textContent = 'Company: ' + exp.company;
        detailsDiv.appendChild(companyElement);

        const locationElement = document.createElement('p');
        locationElement.textContent = 'Location: ' + exp.location;
        detailsDiv.appendChild(locationElement);

        const startDateDetailElement = document.createElement('p');
        startDateDetailElement.textContent = 'Start Date: ' + exp.startDate;
        detailsDiv.appendChild(startDateDetailElement);

        const endDateDetailElement = document.createElement('p');
        endDateDetailElement.textContent = 'End Date: ' + exp.endDate;
        detailsDiv.appendChild(endDateDetailElement);

        expCardBody.appendChild(detailsDiv);

        // Responsibilities Div
        const responsibilitiesDiv = document.createElement('div');
        responsibilitiesDiv.classList.add('responsibilities');

        const responsibilitiesHeading = document.createElement('h3');
        responsibilitiesHeading.textContent = 'Responsibilities';
        responsibilitiesDiv.appendChild(responsibilitiesHeading);

        const responsibilitiesElement = document.createElement('ul');
        exp.responsibilities.forEach(responsibility => {
            const liElement = document.createElement('li');
            liElement.innerHTML = `<i class="fa-solid fa-check"></i> ${responsibility}`;
            responsibilitiesElement.appendChild(liElement);
        });
        responsibilitiesDiv.appendChild(responsibilitiesElement);

        expCardBody.appendChild(responsibilitiesDiv);

        expCard.appendChild(expCardBody);

        experienceCardContainer.appendChild(expCard);

    });
    experienceContainer.appendChild(experienceCardContainer);

    qualificationCardContainer.appendChild(educationContainer);
    qualificationCardContainer.appendChild(experienceContainer);

    return qualificationCardContainer;
}
//============================================================//
// create testimonial section //
//==============================================================//
function createTestimonialContainer(data){
    const testimonialContainer = document.createElement('div');
    testimonialContainer.classList.add('testimonial-container');
    testimonialContainer.id = "testimonial";

    // Title Div
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title-div');

    const titleH1 = document.createElement('h1');
    titleH1.classList.add('glow-h1-text');
    titleH1.textContent = 'Testimonials';
    titleH1.innerHTML = titleH1.textContent.replace(/(.{5})(.)/, '$1<span class="flicking">$2</span>');

    const titleH4 = document.createElement('h4');
    titleH4.classList.add('two-line');
    titleH4.textContent = 'See what our clients experienced';

    titleDiv.appendChild(titleH1);
    titleDiv.appendChild(titleH4);

    testimonialContainer.appendChild(titleDiv);



    const clientReviewsDiv = document.createElement('div');
    clientReviewsDiv.classList.add('client-reviews');
    
    const testimonialContents = document.createElement('div');
    testimonialContents.classList.add('testimonials-contents');
    
    let allTestimoni = [];

    data.forEach((testimonial, index) => {
        const testimonialElement = document.createElement('div');
        testimonialElement.classList.add('testimonial','review-card');
        
        // Testimonial Header
        const testimonialHeader = document.createElement('div');
        testimonialHeader.classList.add('testimonial-header');
    
        // Image Container
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');
    
        if (testimonial.image) {
            const img = document.createElement('img');
            img.src = testimonial.image;
            img.alt = testimonial.name;
            imgContainer.appendChild(img);
        }
    
        // Client Details
        const clientDetails = document.createElement('div');
        clientDetails.classList.add('client-details');
    
        const clientName = document.createElement('h3');
        clientName.textContent = testimonial.name;
    
        const clientPosition = document.createElement('p');
        clientPosition.textContent = testimonial.position;
    
        clientDetails.appendChild(clientName);
        clientDetails.appendChild(clientPosition);
    
        testimonialHeader.appendChild(imgContainer);
        testimonialHeader.appendChild(clientDetails);
    
        // Testimonial Body
        const testimonialBody = document.createElement('div');
        testimonialBody.classList.add('testimonial-body');
    
        const quote = document.createElement('p');
        quote.textContent = testimonial.quote;
    
        // Optionally, you can add a rating element
        const rating = document.createElement('div');
        rating.classList.add('rating');
        for (let i = 0; i < testimonial.rating; i++) {
            const star = document.createElement('span');
            star.textContent = '★';
            rating.appendChild(star);
        }
    
        testimonialBody.appendChild(quote);
        testimonialBody.appendChild(rating);
    
        testimonialElement.appendChild(testimonialHeader);
        testimonialElement.appendChild(testimonialBody);

        testimonialContents.appendChild(testimonialElement);
        allTestimoni.push(testimonialElement);

        if(index === 0){
            testimonialElement.classList.add('appear');
        }
    });

    // Append testimonials and dots to client-reviews div
    clientReviewsDiv.appendChild(testimonialContents);
    clientReviewsDiv.appendChild(createBtnContainer(data.length));
    testimonialContainer.append(clientReviewsDiv);

    let cloneTest = allTestimoni[allTestimoni.length - 1].cloneNode(true);
    cloneTest.classList.add('cloned');
    cloneTest.classList.remove('review-card');
    testimonialContents.insertBefore(cloneTest, allTestimoni[0]);
    
    function createBtnContainer(numDots) {
        const btnContainer = document.createElement('div');
        btnContainer.classList.add('btn-container');
        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                scrollToTestimonial(i);
                updateActiveDot(i);
            });
            if (i === 0) {
                dot.classList.add('active');
            }
            btnContainer.appendChild(dot);
        }
        return btnContainer;
    }
    

    function scrollToTestimonial(index) {
        console.log(index);
        const testimonialDiv = document.querySelector('.review-card');
        const testimonialWidth = testimonialDiv.offsetWidth;
        const scrollLeft = testimonialWidth * index;
        const testimonialsContainer = document.querySelector('.testimonials-contents');
        testimonialsContainer.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        });
        updateActiveTestimonial(index);
    
        console.log(allTestimoni.length - 1);
    
        if (index !== 0 && index !== allTestimoni.length - 1) {
            let clonedElm = document.querySelector('.cloned');
            if (clonedElm) {
                clonedElm.remove();
            }
        } else if (index === 0) {
            if (!document.querySelector('.cloned')) {
                testimonialContents.insertBefore(cloneTest, allTestimoni[0]);
            }
        } else if (index === allTestimoni.length - 1) {
            if (!document.querySelector('.cloned-last')) {
                let lastcloneTest = allTestimoni[0].cloneNode(true);
                lastcloneTest.classList.add('cloned-last');
                lastcloneTest.classList.remove('review-card');
                testimonialContents.appendChild(lastcloneTest);
                testimonialsContainer.scrollTo({
                    left: scrollLeft+400,
                    behavior: 'smooth'
                });
            }
        }
    }
    
    
    function updateActiveDot(index) {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    function updateActiveTestimonial(index) {
        const testimonials = document.querySelectorAll('.review-card');
        testimonials.forEach((testimonial, i) => {
            if (i === index) {
                testimonial.classList.add('appear');
            } else {
                testimonial.classList.remove('appear');
            }
        });
    }
    

    
    


    return testimonialContainer;
}
//============================================================//
// create contact section //
//==============================================================//
function createContactContainer(data, socialMedia) {
    const contactContainer = document.createElement('div');
    contactContainer.classList.add('contact-container');
    contactContainer.id = "contact";

    // Title Div
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title-div');

    const titleH1 = document.createElement('h1');
    titleH1.classList.add('glow-h1-text2');
    titleH1.textContent = 'Contact Us';
    titleH1.innerHTML = titleH1.textContent.replace(/(.{8})(.)/, '$1<span class="flicking">$2</span>');

    const titleH4 = document.createElement('h4');
    titleH4.classList.add('two-line');
    titleH4.textContent = 'Let us know your opinion';

    titleDiv.appendChild(titleH1);
    titleDiv.appendChild(titleH4);

    contactContainer.appendChild(titleDiv);

    // Contact Info Container
    const contactContents = document.createElement('div');
    contactContents.classList.add('contact-contents');

    const contactInfoContainer = document.createElement('div');
    contactInfoContainer.classList.add('contact-info-container');

    const contactInfoHeading = document.createElement('h2');
    contactInfoHeading.textContent = data.heading;

    const contactInfoSubheading = document.createElement('p');
    contactInfoSubheading.textContent = data.subheading;

    contactInfoContainer.appendChild(contactInfoHeading);
    contactInfoContainer.appendChild(contactInfoSubheading);

    const contactInfo = data.contactInfo;
    for (const key in contactInfo) {
        if (Object.hasOwnProperty.call(contactInfo, key)) {
            const contactItem = contactInfo[key];
            const contactItemDiv = document.createElement('div');
            contactItemDiv.classList.add('contact-item');

            const iconDiv = document.createElement('div');
            iconDiv.classList.add('contact-icon');
            iconDiv.innerHTML = contactItem.icon;

            const valueDiv = document.createElement('div');
            valueDiv.classList.add('contact-value');
            valueDiv.textContent = contactItem.value;

            contactItemDiv.appendChild(iconDiv);
            contactItemDiv.appendChild(valueDiv);

            contactInfoContainer.appendChild(contactItemDiv);
        }
    }
    contactInfoContainer.appendChild(generateSocialMedia(socialMedia));
    contactContents.appendChild(contactInfoContainer);
    

    // Contact Form Container
    const contactFormContainer = document.createElement('div');
    contactFormContainer.classList.add('contact-form-container');
    // Create form header
    const formHeader = document.createElement('div');
    formHeader.classList.add('form-header');

    const headerTitle = document.createElement('h1');
    headerTitle.textContent = 'Get In Tounch';

    const headerSubtitle = document.createElement('p');
    headerSubtitle.classList.add('one-line');
    headerSubtitle.textContent = 'Please fill out the form below to get in touch with us.';

    formHeader.appendChild(headerTitle);
    formHeader.appendChild(headerSubtitle);
    contactFormContainer.appendChild(formHeader);
    // Add your contact form elements here if needed
    const form = createContactForm();
    contactFormContainer.appendChild(form);
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {};
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if(input.value !== ""){
                formData[input.name] = input.value;
            }else{
                createModal('Warning', "An input is empty");
            }
        });
    
        console.log(formData);
        createModal('Congratulations', "Your request has been submitted.");
    });
    

    contactContents.appendChild(contactFormContainer);

    contactContainer.appendChild(contactContents);

    return contactContainer;
}

function createContactForm() {
    // Create the form element
    const form = document.createElement('form');
    form.classList.add('contact-form');

    // Define the form fields
    const fields = [
        { label: 'Name', type: 'text', name: 'name', placeholder: 'Your name', required: true },
        { label: 'Email', type: 'email', name: 'email', placeholder: 'Your email', required: true },
        { label: 'Message', type: 'textarea', name: 'message', placeholder: 'Your message', required: true }
    ];

    // Create and append input fields to the form
    fields.forEach(field => {
        const inputGroup = document.createElement('div');
        inputGroup.classList.add('input-group');

        const label = document.createElement('label');
        label.textContent = field.label;
        label.setAttribute('for', field.name);
        inputGroup.appendChild(label);

        if (field.type === 'textarea') {
            const textarea = document.createElement('textarea');
            textarea.setAttribute('name', field.name);
            textarea.id = field.name;
            // textarea.setAttribute('placeholder', field.placeholder);
            textarea.setAttribute('required', field.required ? 'required' : '');
            inputGroup.appendChild(textarea);
            textarea.addEventListener('input', function(){
                if(textarea.value != ""){
                    inputGroup.classList.add('filled');
                    inputGroup.classList.remove('wrong-filled');
                            label.setAttribute('data-tooltip', 'Correct');
                }else{
                    inputGroup.classList.remove('filled');
                    inputGroup.classList.remove('wrong-filled');
                    label.removeAttribute('data-tooltip');
                }
            });
        } else {
            const input = document.createElement('input');
            input.setAttribute('type', field.type);
            input.setAttribute('name', field.name);
            input.id = field.name;
            // input.setAttribute('placeholder', field.placeholder);
            input.setAttribute('required', field.required ? 'required' : '');
            inputGroup.appendChild(input);
            input.addEventListener('input', function() {
                if (input.value.trim() !== "") {
                    if (input.id === 'name') {
                        if (/^[a-zA-Z\s]*$/.test(input.value.trim())) {
                            inputGroup.classList.add('filled');
                            inputGroup.classList.remove('wrong-filled');
                            label.setAttribute('data-tooltip', 'Correct');
                        } else {
                            inputGroup.classList.remove('filled');
                            inputGroup.classList.add('wrong-filled');
                            label.setAttribute('data-tooltip', 'Incorrect');
                        }
                    } else if (input.id === 'email') {
                        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.value.trim())) {
                            inputGroup.classList.add('filled');
                            inputGroup.classList.remove('wrong-filled');
                            label.setAttribute('data-tooltip', 'Correct');
                        } else {
                            inputGroup.classList.remove('filled');
                            inputGroup.classList.add('wrong-filled');
                            label.setAttribute('data-tooltip', 'Incorrect');
                        }
                    }
                } else {
                    inputGroup.classList.remove('filled');
                    inputGroup.classList.remove('wrong-filled');
                    label.removeAttribute('data-tooltip');
                }
            });
            
            
        }

        form.appendChild(inputGroup);
    });

    // Create and append the submit button
    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-container');

    const submitBtn = document.createElement('button');
    submitBtn.setAttribute('type', 'submit');
    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Submit';
    submitBtn.className = 'submit-btn';
    btnContainer.appendChild(submitBtn);
    form.appendChild(btnContainer);
    
    return form;
}

//============================================================//
// create Modal //
//==============================================================//
function createModal(modalTitle, content) {
    // Create modal container
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal');

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    // Modal header
    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');

    // Header title
    const headerTitle = document.createElement('div');
    headerTitle.classList.add('header-title');
    headerTitle.textContent = modalTitle;

    // Close button container
    const closeBtnContainer = document.createElement('div');
    closeBtnContainer.classList.add('close-btn-container');

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('close-btn');
    closeBtn.innerHTML = '&times;'; // Close symbol
    closeBtn.addEventListener('click', () => {
        modalContainer.remove();
    })

    // Append close button to close button container
    closeBtnContainer.appendChild(closeBtn);

    // Append header title and close button container to modal header
    modalHeader.appendChild(headerTitle);
    modalHeader.appendChild(closeBtnContainer);

    // Modal body
    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
    modalBody.textContent = content;

    // Modal footer
    const modalFooter = document.createElement('div');
    modalFooter.classList.add('modal-footer');
    // You can add footer content here if needed

    // Append header, body, and footer to modal content
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);

    // Append modal content to modal container
    modalContainer.appendChild(modalContent);

    // Append modal container to the body
    document.body.appendChild(modalContainer);
}

// createModal('Modal Title', 'This is the content of the modal.');
