function fetchData() {
    return fetch('../data/data.json')
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

document.addEventListener('DOMContentLoaded', async () => {
    let allData = await fetchData();

    let topMenu = createTopMenu(allData['section-home'].ownerInfo.name,allData['section-home'].slides[0].caption.buttonURL);
    document.querySelector('main').appendChild(topMenu);

    const sliderContainer = createAutomaticSlider(allData['section-home'],allData['section-contact'].socialMedia);
    const sliderSection = document.createElement('section');
    sliderSection.classList.add('section-home');
    sliderSection.appendChild(sliderContainer)
    document.querySelector('main').appendChild(sliderSection);

    const aboutContainer = generateAboutContainer(allData['section-about']);
    const aboutSection = document.createElement('section');
    aboutSection.classList.add('section-about');
    aboutSection.appendChild(aboutContainer)
    document.querySelector('main').appendChild(aboutSection);

    const serviceContainer = generateServiceCards(allData['section-services'].services);
    const serviceSection = document.createElement('section');
    serviceSection.classList.add('section-services');
    const serviceheadingContainer = document.createElement('div');
    serviceheadingContainer.classList.add('heading-container');
    serviceheadingContainer.innerHTML = `
        <h1>Our services</h1>
        <span><i class="fa-solid fa-star-of-life"></i></span>
    `;
    serviceSection.appendChild(serviceheadingContainer);
    serviceSection.appendChild(serviceContainer);
    document.querySelector('main').appendChild(serviceSection);

    const portfolioContainer = generateTabComponent(allData['section-portfolio'].projects);
    const portfolioSection = document.createElement('section');
    portfolioSection.classList.add('section-portfolio');
    // Creating the heading container with h1 tag
    const headingContainer = document.createElement('div');
    headingContainer.classList.add('heading-container');
    headingContainer.innerHTML = `
        <h1>Portfolio</h1>
        <span><i class="fa-solid fa-star-of-life"></i></span>
    `;
    // Appending heading container and portfolio container to the portfolio section
    portfolioSection.appendChild(headingContainer);
    portfolioSection.appendChild(portfolioContainer);
    document.querySelector('main').appendChild(portfolioSection);


    const skillContainer = generateSkillCards(allData['section-skills'].skills);
    const skillSection = document.createElement('section');
    skillSection.classList.add('section-skill');
    // Creating the heading container with h1 tag
    const skillheadingContainer = document.createElement('div');
    skillheadingContainer.classList.add('heading-container');
    skillheadingContainer.innerHTML = `
            <h1>Skills</h1>
            <span><i class="fa-solid fa-star-of-life"></i></span>
    `;
    // Appending heading container and portfolio container to the portfolio section
    skillSection.appendChild(skillheadingContainer);
    skillSection.appendChild(skillContainer);
    document.querySelector('main').appendChild(skillSection);

    const qualificationCardContainer = generateQualificationCards(allData['section-experience']);
    const experienceSection = document.createElement('section');
    experienceSection.classList.add('section-experience');
    // Creating the heading container with h1 tag
    const experienceheadingContainer = document.createElement('div');
    experienceheadingContainer.classList.add('heading-container');
    experienceheadingContainer.innerHTML = `
        <h1>academic and experience</h1>
        <span><i class="fa-solid fa-star-of-life"></i></span>
    `;
    // Appending heading container and qualification container
    experienceSection.appendChild(experienceheadingContainer);
    experienceSection.appendChild(qualificationCardContainer);
    document.querySelector('main').appendChild(experienceSection);


    const testimonyContainer = generateTestimonialCards(allData['section-testimonials']);
    const testimonySection = document.createElement('section');
    testimonySection.classList.add('section-testimonial');
    // Creating the heading container with h1 tag
    const testimonyheadingContainer = document.createElement('div');
    testimonyheadingContainer.classList.add('heading-container');
    testimonyheadingContainer.innerHTML = `
        <h1>Testimonials</h1>
        <span><i class="fa-solid fa-star-of-life"></i></span>
    `;
    // Appending heading container and qualification container
    testimonySection.appendChild(testimonyheadingContainer);
    testimonySection.appendChild(testimonyContainer);
    document.querySelector('main').append(testimonySection);


    const contactContainer = generateContactContainer(allData['section-contact'],allData['section-contact'].socialMedia);
    const contactSection = document.createElement('section');
    contactSection.classList.add('section-contact');
    // Creating the heading container with h1 tag
    const contactheadingContainer = document.createElement('div');
    contactheadingContainer.classList.add('heading-container');
    contactheadingContainer.innerHTML = `
        <h1>Contact Me</h1>
        <span><i class="fa-solid fa-star-of-life"></i></span>
    `;
    // Appending heading container and qualification container
    contactSection.appendChild(contactheadingContainer);
    contactSection.appendChild(contactContainer);
    document.querySelector('main').append(contactSection);

    createFooterCredit(allData['section-home'].ownerInfo.name);
    createScrollToTopButton();
})
//---------------------------------------------------------//
// create the menu //
//------------------------------------------------------------//
function createTopMenu(name, resumeUrl) {
    const menuItems = [
        { icon: '<i class="fa-solid fa-house"></i>', text: 'Home' },
        { icon: '<i class="fa-solid fa-briefcase"></i>', text: 'Portfolio' },
        { icon: '<i class="fa-solid fa-gear"></i>', text: 'Services' },
        { icon: '<i class="fa-solid fa-file-signature"></i>', text: 'Contact' },
        // Add more items as needed
    ];

    // Create top menu elements
    const topMenu = document.createElement('div');
    topMenu.classList.add('top-menu');

    // Left side with logo and title
    const leftSide = document.createElement('div');
    leftSide.classList.add('left-logo');

    const logo = document.createElement('i');
    logo.classList.add('fa-solid', 'fa-fire'); // Replace with your logo icon
    leftSide.appendChild(logo);

    const title = document.createElement('span');
    title.textContent = name; // Replace with your title
    leftSide.appendChild(title);

    // Right side with menu items
    const rightSide = document.createElement('div');
    rightSide.classList.add('right-menuItems');

    const menuItemsContainer = document.createElement('div');
    menuItemsContainer.classList.add('menu-items-container');

    if (window.innerWidth <= 768) {
        const menuBar = document.createElement('span');
        menuBar.classList.add('menu-bar');
        menuBar.innerHTML = '<i class="fa-solid fa-bars"></i>';
        rightSide.appendChild(menuBar);

        menuBar.addEventListener('click', function () {
            if (menuItemsContainer.classList.contains('show')) {
                menuItemsContainer.classList.remove('show');
                menuItemsContainer.classList.add('hide');
                setTimeout(() => {
                    menuItemsContainer.style.display = 'none';
                }, 490);
                menuBar.innerHTML = `<i class="fa-solid fa-bars"></i>`;
            } else {
                menuItemsContainer.classList.remove('hide');
                menuItemsContainer.classList.add('show');
                menuItemsContainer.style.display = 'flex';
                menuBar.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
            }
            menuBar.classList.toggle('active');
        });

        let closeToggle = document.createElement('span');
        closeToggle.classList.add('menu-close');
        closeToggle.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
        menuItemsContainer.appendChild(closeToggle);
        closeToggle.addEventListener('click', function(){
            if (menuItemsContainer.classList.contains('show')) {
                menuItemsContainer.classList.remove('show');
                menuItemsContainer.classList.add('hide');
                setTimeout(() => {
                    menuItemsContainer.style.display = 'none';
                }, 490);
                menuBar.innerHTML = `<i class="fa-solid fa-bars"></i>`;
            }
            menuBar.classList.toggle('active');
        })
    }

    menuItems.forEach((item, index) => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');

        const text = document.createElement('span');
        text.innerHTML = `${item.icon} ${item.text}`;
        menuItem.appendChild(text);
        menuItemsContainer.appendChild(menuItem)

        menuItem.addEventListener('click', function () {
            // Remove active class from all items
            menuItemsContainer.querySelectorAll('.menu-item').forEach(item => {
                item.classList.remove('active');
            });

            // Add active class to the clicked item
            menuItem.classList.add('active');
            // Scroll to the corresponding section
            const section = document.querySelector(`.section-${item.text.toLowerCase()}`);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });

        // Add active class to Home menu item on page load
        if (index === 0) {
            menuItem.classList.add('active');
        }
    });
    // Add "Hire Me" button
    const hireMeContainer = document.createElement('div');
    hireMeContainer.classList.add('hire-me-container');

    const hireMeButton = document.createElement('button');
    hireMeButton.classList.add('hire-me-button');
    hireMeButton.innerHTML = '<i class="fa-solid fa-file-zipper"></i> Resume';
    hireMeButton.addEventListener('click',function(){
        createModal("My Resume", resumeUrl);
    })

    hireMeContainer.appendChild(hireMeButton);
    menuItemsContainer.appendChild(hireMeContainer);

    rightSide.appendChild(menuItemsContainer);
    // Append left and right sides to top menu
    topMenu.appendChild(leftSide);
    topMenu.appendChild(rightSide);

    return topMenu;
}

//----------------------------------------------------------//
// create the slider //
//---------------------------------------------------------//
function createAutomaticSlider(data, socialMediaData) {
    const sliderContainer = document.createElement('div');
    sliderContainer.classList.add('slider-container');

    const slides = data.slides;
    let currentSlideIndex = 0;

    function showSlide(index) {
        // Remove the "active" class from all slides
        slides.forEach((slide, i) => {
            const slideItem = sliderContainer.children[i];
            slideItem.classList.remove('active');
        });

        // Add the "active" class to the current slide
        const currentSlide = sliderContainer.children[index];
        currentSlide.classList.add('active');
    }

    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        showSlide(currentSlideIndex);
    }

    // Create slides
    slides.forEach((slide, index) => {
        const slideItem = document.createElement('div');
        slideItem.classList.add('slide-item');

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('img-container');
        
        const image = document.createElement('img');
        image.src = slide.imageSrc;
        image.alt = `Slide ${index + 1}`;
        if(window.innerWidth <= 768){
            if(index == 0){
                image.style.width = '240px';
                imageContainer.style.alignItems = 'flex-end'
            }
        }else{
            if(index == 0){
                image.style.width = '400px';
                imageContainer.style.alignItems = 'flex-end'
            }
        }
        
        imageContainer.appendChild(image);

        const captionContainer = document.createElement('div');
        captionContainer.classList.add('caption-container');
        
        const caption = document.createElement('div');
        caption.classList.add('caption');
        
        const title = document.createElement('h2');
        title.textContent = slide.caption.title;
        
        const description = document.createElement('p');
        description.textContent = slide.caption.description;
        
        caption.appendChild(title);
        caption.appendChild(description);

        if(index == 0){
            const socialMediaContainer = generateSocialMedia(socialMediaData);
            socialMediaContainer.classList.add('slide-social-media');
            caption.appendChild(socialMediaContainer);

        }else if(index == 1){
            const techIconsContainer = document.createElement('div');
            techIconsContainer.classList.add('tech-icons-container');
        
            const techIcons = [
                '<i class="fa-brands fa-html5"></i>', 
                '<i class="fa-brands fa-css3-alt"></i>', 
                '<i class="fa-brands fa-js"></i>', 
                '<i class="fa-brands fa-python"></i>'
            ];
        
            techIcons.forEach(icon => {
                const iconSpan = document.createElement('span');
                const tempContainer = document.createElement('div');
                tempContainer.innerHTML = icon;
        
                // Append child nodes of the temporary container to the iconSpan
                while (tempContainer.firstChild) {
                    iconSpan.appendChild(tempContainer.firstChild);
                }
        
                techIconsContainer.appendChild(iconSpan);
            });
        
            caption.appendChild(techIconsContainer);
        }
        
        captionContainer.appendChild(caption);
        slideItem.appendChild(captionContainer);        
        slideItem.appendChild(imageContainer);
       
        sliderContainer.appendChild(slideItem);
    });

    // Set interval to change slide every 5000 milliseconds (adjust as needed)
    setInterval(nextSlide, 5000);

    // Show the initial slide
    showSlide(currentSlideIndex);

    return sliderContainer;
}

//---------------------------------------------------------//
// social media //
//-------------------------------------------------------//
function generateSocialMedia(data) {
    const socialMediaContainer = document.createElement('div');
    socialMediaContainer.classList.add('social-media-container');

    data.forEach(item => {
        const socialMediaItem = document.createElement('div');
        socialMediaItem.classList.add('social-media-item');

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

//-----------------------------------------------------------//
// about section //
//-----------------------------------------------------------//
function generateAboutContainer(data) {
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
    aboutHeader.innerHTML = 'About Me';
    const aboutTagLine = document.createElement('h4');
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

//------------------------------------------------------------------//
// service section //
//--------------------------------------------------------------------//
function generateServiceCards(data) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    data.forEach(service => {
        const card = document.createElement('div');
        card.classList.add('card');

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
        button.addEventListener('click', function(){
            createModal(service.name, service.plans)
        });

        cardFooter.appendChild(button);

        // Append Header, Body, and Footer to Card
        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        card.appendChild(cardFooter);

        // Append Card to Card Container
        cardContainer.appendChild(card);
    });

    return cardContainer;
}

//----------------------------------------------------//
// protfolio tab section //
//----------------------------------------------------//
function generateTabComponent(projectsData) {
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

        filteredProjects.forEach(project => {

            const tabCard = document.createElement('div');
            tabCard.classList.add('tab-card');

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

            // Body
            const body = document.createElement('div');
            body.classList.add('body');

            const description = document.createElement('p');
            description.textContent = project.description;

            body.appendChild(description);

            // Footer
            const footer = document.createElement('div');
            footer.classList.add('footer');

            const button = document.createElement('button');
            button.textContent = 'Learn More';
            button.addEventListener('click', () => {
                createModal(project.title, project.projectURL, project.category)
            });

            footer.appendChild(button);

            // Append Header, Body, and Footer to Tab Card
            tabCard.appendChild(header);
            tabCard.appendChild(body);
            tabCard.appendChild(footer);

            tabCardsContainer.appendChild(tabCard);
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
    filterProjects('All');

    tabContainer.appendChild(tabCardsContainer);

    return tabContainer;
}

//----------------------------------------------------//
// skill section //
//----------------------------------------------------//
function generateSkillCards(skillsData) {
    const skillCardsContainer = document.createElement('div');
    skillCardsContainer.classList.add('skill-cards-container');

    skillsData.forEach(skillCategory => {
        const skillCard = document.createElement('div');
        skillCard.classList.add('skill-card');

        // Skill Card Header
        const skillCardHeader = document.createElement('div');
        skillCardHeader.classList.add('skill-card-header');

        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = skillCategory.category;
        skillCardHeader.appendChild(categoryTitle);

        skillCard.appendChild(skillCardHeader);

        // Skill Card Body
        const skillCardBody = document.createElement('div');
        skillCardBody.classList.add('skill-card-body');

        const colorClasses = ['gray-fill', 'blue-fill', 'green-fill', 'red-fill', 'purple-fill', 'pink-fill'];

        skillCategory.items.forEach(skillItem => {
            const progressBar = document.createElement('div');
            progressBar.classList.add('progress-bar');

            const itemName = document.createElement('div');
            itemName.classList.add('skill-name-div');
            const skillName = document.createElement('span');
            skillName.textContent = skillItem.name;
            itemName.appendChild(skillName);
            const skillPercentage = document.createElement('span');
            skillPercentage.textContent = '0%'; // Initially set to 0%
            itemName.appendChild(skillPercentage);

            const progress = document.createElement('div');
            progress.classList.add('progress');

            const progressFill = document.createElement('div');
            progressFill.classList.add('progress-fill');
            // Randomly select a color class
            const randomColorClass = colorClasses[Math.floor(Math.random() * colorClasses.length)];
            progressFill.classList.add(randomColorClass);

            // Set initial width to 0
            progressFill.style.width = '0%';

            // Initialize the Intersection Observer
            const observer = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    let width = 0;
                    const intervalId = setInterval(() => {
                        width++;
                        // Update the width of the skill bar
                        progressFill.style.width = `${width}%`;
                        skillPercentage.textContent = `${width}%`;
                        // Check if the target width is reached
                        if (width >= skillItem.level) {
                            clearInterval(intervalId); // Stop the interval
                        }
                    }, 30);
                    observer.unobserve(skillCard); // Stop observing once animation starts
                }
            });

            observer.observe(skillCard); // Start observing when the skill card enters the viewport

            progress.appendChild(progressFill);

            progressBar.appendChild(itemName);
            progressBar.appendChild(progress);

            skillCardBody.appendChild(progressBar);
        });

        skillCard.appendChild(skillCardBody);

        // Append the skill card to the container
        skillCardsContainer.appendChild(skillCard);
    });

    return skillCardsContainer;
}
//----------------------------------------------------//
// qualification section //
//----------------------------------------------------//
function generateQualificationCards(data) {
    const qualificationCardContainer = document.createElement('div');
    qualificationCardContainer.classList.add('qualification-card-container');

    // Education Data
    const educationData = data['data-education'];
    educationData.education.sort((a, b) => new Date(b.graduationYear) - new Date(a.graduationYear));
    const educationContainer = document.createElement('div');
    educationContainer.classList.add('Qcard-container');

    const educationHeading = document.createElement('h1');
    educationHeading.innerHTML = `<i class="fa-solid fa-graduation-cap"></i> ${educationData.heading}`;
    educationContainer.appendChild(educationHeading);

    educationData.education.forEach(edu => {
        const qCard = document.createElement('div');
        qCard.classList.add('Qcard');
        qCard.setAttribute('data-year', edu.graduationYear)

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

        educationContainer.appendChild(qCard);


    });

    // Experience Data
    const experienceData = data['data-experience'];
    experienceData.experience.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    const experienceContainer = document.createElement('div');
    experienceContainer.classList.add('Qcard-container');

    const experienceHeading = document.createElement('h1');
    experienceHeading.innerHTML = `<i class="fa-solid fa-chart-simple"></i> ${experienceData.heading}`;
    experienceContainer.appendChild(experienceHeading);

    experienceData.experience.forEach(exp => {
        const expCard = document.createElement('div');
        expCard.classList.add('Qcard');
        expCard.setAttribute('data-year', exp.startDate.split('-')[0]);

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

        experienceContainer.appendChild(expCard);

    });

    qualificationCardContainer.appendChild(educationContainer);
    qualificationCardContainer.appendChild(experienceContainer);

    return qualificationCardContainer;
}

//--------------------------------------------------//
// testimony section //
//-------------------------------------------------//
function generateTestimonialCards(testimonialsData) {
    const testimonyContainer = document.createElement('div');
    testimonyContainer.classList.add('testimony-container');

    const testimonyCardsContainer = document.createElement('div');
    testimonyCardsContainer.classList.add('testimony-cards-container');

    testimonialsData.forEach(testimonial => {
        const card = document.createElement('div');
        card.classList.add('testimony-card');

        // Card Header
        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');

        // Image Container
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        if (testimonial.image) {
            const image = document.createElement('img');
            image.src = testimonial.image;
            image.alt = testimonial.name;
            imageContainer.appendChild(image);
        } else {
            const nameInitial = document.createElement('h1');
            nameInitial.textContent = testimonial.name.charAt(0);
            imageContainer.appendChild(nameInitial);
        }

        cardHeader.appendChild(imageContainer);

        // Name Container
        const nameContainer = document.createElement('div');
        nameContainer.classList.add('name-container');

        const name = document.createElement('h3');
        name.textContent = testimonial.name;

        const position = document.createElement('p');
        position.textContent = testimonial.position;

        nameContainer.appendChild(name);
        nameContainer.appendChild(position);

        cardHeader.appendChild(nameContainer);

        card.appendChild(cardHeader);

        // Card Body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const quote = document.createElement('p');
        quote.textContent = testimonial.quote;

        const rating = document.createElement('div');
        rating.classList.add('rating');

        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('i');

            if (i <= testimonial.rating) {
                star.classList.add('fa-solid', 'fa-star');
                star.classList.add('filled');
            } else {
                star.classList.add('fa-regular', 'fa-star');
                star.classList.add('empty');
            }

            rating.appendChild(star);
        }

        cardBody.appendChild(nameContainer);
        cardBody.appendChild(quote);
        cardBody.appendChild(rating);

        card.appendChild(cardBody);

        testimonyCardsContainer.appendChild(card);
    });

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-container');

    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
    prevBtn.addEventListener('click', () => {
        // Handle previous button click
        scrollTestimonyCardsContainer(-200);
    });

    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
    nextBtn.addEventListener('click', () => {
        // Handle next button click
        scrollTestimonyCardsContainer(200);
    });

    btnContainer.appendChild(prevBtn);
    btnContainer.appendChild(nextBtn);

    testimonyContainer.appendChild(testimonyCardsContainer);
    testimonyContainer.appendChild(btnContainer);
    function scrollTestimonyCardsContainer(scrollAmount) {
        const scrollOptions = {
            left: testimonyCardsContainer.scrollLeft + scrollAmount,
            behavior: 'smooth'
        };

        testimonyCardsContainer.scroll(scrollOptions);
    }

    return testimonyContainer;
}

//--------------------------------------------------//
// contact section //
//-----------------------------------------------------//
function generateContactContainer(contactData, socialMediaData) {
    const contactContainer = document.createElement('div');
    contactContainer.classList.add('contact-container');

    // Contact Info Container
    const contactInfoContainer = document.createElement('div');
    contactInfoContainer.classList.add('contact-info-container');

    // Heading
    const heading = document.createElement('h2');
    heading.textContent = contactData.heading;
    contactInfoContainer.appendChild(heading);

    // Subheading
    const subheading = document.createElement('p');
    subheading.textContent = contactData.subheading;
    contactInfoContainer.appendChild(subheading);

    // Contact Information
    const contactInfo = document.createElement('div');
    contactInfo.classList.add('contact-info');

    Object.keys(contactData.contactInfo).forEach(infoKey => {
        const infoItem = document.createElement('div');
        infoItem.classList.add('info-item');

        // Icon
        const iconContainer = document.createElement('div');
        iconContainer.classList.add('icon-container');
        iconContainer.innerHTML = contactData.contactInfo[infoKey].icon;

        infoItem.appendChild(iconContainer);

        // Value
        const value = document.createElement('p');
        value.innerHTML = contactData.contactInfo[infoKey].value;

        infoItem.appendChild(value);

        contactInfo.appendChild(infoItem);
    });

    contactInfoContainer.appendChild(contactInfo);
    contactContainer.appendChild(contactInfoContainer);
    contactInfoContainer.appendChild(generateSocialMedia(socialMediaData));

    // Payment Information
    const paymentInfoContainer = document.createElement('div');
    paymentInfoContainer.classList.add('payment-info-container');

    const paymentHeading = document.createElement('h3');
    paymentHeading.textContent = 'We Accept';
    paymentInfoContainer.appendChild(paymentHeading);

    const paymentMethods = document.createElement('ul');
    paymentMethods.classList.add('payment-methods');

    contactData.paymentInfo.forEach(payment => {
        const paymentItem = document.createElement('li');
        paymentItem.innerHTML = `<div class="icon-container">${payment.icon}</div>${payment.method}`;
        
        paymentItem.addEventListener('click', function(){
            let payInfo;
            if(payment.url){
                payInfo = `<h2>Payment Method : ${payment.method}</h2> <div>Click here to pay: <a href=${payment.url}>${payment.method}</a></div>`
            }else{
                payInfo = `<h2>Payment Method : ${payment.method}</h2> <h4>Payment Number: <span id="copy">${payment.number}</span></h4>`
            }
            createModal("Payment Information",payInfo)
        })

        paymentMethods.appendChild(paymentItem);
    });

    paymentInfoContainer.appendChild(paymentMethods);
    contactInfoContainer.appendChild(paymentInfoContainer);
    
    // Contact Form Container
    const contactFormContainer = document.createElement('div');
    contactFormContainer.classList.add('contact-form-container');

    // Contact Form Header
    const contactFormHeader = document.createElement('div');
    contactFormHeader.classList.add('contact-form-header');

    const headerTitle = document.createElement('h2');
    headerTitle.textContent = 'Get In Touch';
    const headerDescription = document.createElement('p');
    headerDescription.textContent = 'Fill out the form below to get in touch with us.';

    contactFormHeader.appendChild(headerTitle);
    contactFormHeader.appendChild(headerDescription);
    contactFormContainer.appendChild(contactFormHeader);

    // Use the function to generate the contact form
    const contactForm = generateContactForm();
    // Add submit event listener
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission
        let submitButton = document.querySelector('.contact-form button');
        submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
        submitButton.disabled = true;
        
        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                submitButton.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Submit';
                createModal('Congratulations','Thank you for reaching out! Your message has been successfully submitted. I will get back to you as soon as possible. If you have any urgent inquiries, feel free to contact me directly via email or phone. Have a great day!');
                submitButton.disabled = false; 
                contactForm.reset();
            } else {
                alert('Message not sent.');
                submitButton.disabled = false; 
                submitButton.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Submit';
            }
        })
        .catch(error => {
            console.log(error);
        })
    });
    contactFormContainer.appendChild(contactForm);

    contactContainer.appendChild(contactFormContainer);


    return contactContainer;
}

function generateContactForm() {
    const form = document.createElement('form');
    form.classList.add('contact-form');
    form.method = 'POST';
    // Create a hidden input element
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'apikey';
    hiddenInput.value = 'c8fb6cf0-85ce-49d9-be34-cbe21e1f7c9b';
    form.appendChild(hiddenInput);
    // Name Input
    const nameInputGroup = document.createElement('div');
    nameInputGroup.classList.add('input-group');

    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Name:';
    const nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('name', 'name');
    nameInputGroup.appendChild(nameLabel);
    nameInputGroup.appendChild(nameInput);

    form.appendChild(nameInputGroup);

    // Email Input
    const emailInputGroup = document.createElement('div');
    emailInputGroup.classList.add('input-group');

    const emailLabel = document.createElement('label');
    emailLabel.textContent = 'Email:';
    const emailInput = document.createElement('input');
    emailInput.setAttribute('type', 'email');
    emailInput.setAttribute('name', 'email');
    emailInputGroup.appendChild(emailLabel);
    emailInputGroup.appendChild(emailInput);

    form.appendChild(emailInputGroup);

    // Subject Input
    const subjectInputGroup = document.createElement('div');
    subjectInputGroup.classList.add('input-group');

    const subjectLabel = document.createElement('label');
    subjectLabel.textContent = 'Subject:';
    const subjectInput = document.createElement('input');
    subjectInput.setAttribute('type', 'text');
    subjectInput.setAttribute('name', 'subject');
    subjectInputGroup.appendChild(subjectLabel);
    subjectInputGroup.appendChild(subjectInput);

    form.appendChild(subjectInputGroup);

    // Message Textarea
    const messageInputGroup = document.createElement('div');
    messageInputGroup.classList.add('input-group');

    const messageLabel = document.createElement('label');
    messageLabel.textContent = 'Message:';
    const messageTextarea = document.createElement('textarea');
    messageTextarea.setAttribute('name', 'message');
    messageInputGroup.appendChild(messageLabel);
    messageInputGroup.appendChild(messageTextarea);

    form.appendChild(messageInputGroup);

    // Submit Button
    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Submit';

    
    form.appendChild(submitButton);

    return form;
}


//--------------------------------------------------//
// modal //
//--------------------------------------------------//
function generateLightBox(lightboxImages){
    // Create lightbox container
    const lightboxContainer = document.createElement('div');
    lightboxContainer.classList.add('lightbox-container');

    // Create lightbox div
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');

    // Create lightbox-thumb div
    const lightboxThumb = document.createElement('div');
    lightboxThumb.classList.add('lightbox-thumb');

    // Iterate through the array of images
    lightboxImages.forEach((image, index) => {
        // Create an img element for each image
        const img = document.createElement('img');
        img.setAttribute('src', image);
        img.setAttribute('alt', `Image ${index + 1}`);

        // Add click event to each image in lightbox-thumb
        img.addEventListener('click', () => {
            // Set the clicked image as the source for lightbox
            lightbox.innerHTML = '';
            lightbox.appendChild(img.cloneNode(true));
        });
        if(index === 0){
            img.click();
        }
        // Append the image to lightbox-thumb
        lightboxThumb.appendChild(img);
    });

    // Append lightbox and lightbox-thumb to the lightbox container
    lightboxContainer.appendChild(lightbox);
    lightboxContainer.appendChild(lightboxThumb);

    return lightboxContainer;
}


function createModal(title, content, category) {
    // Create modal container
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.style.opacity = 1;

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content','show-modal');

    // Create modal header
    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');

    // Modal title
    const modalTitle = document.createElement('div');
    modalTitle.classList.add('modal-title');
    modalTitle.innerHTML = `<h1>${title}</h1>`;

    // Close button
    const closeDiv = document.createElement('div');
    closeDiv.classList.add('close-div');
    const closeButton = document.createElement('span');
    closeButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    closeButton.addEventListener('click', function() {
        if(modalContent.classList.contains('show-modal')){
            modalContent.classList.remove('show-modal');
            modal.classList.add('hide');
            modalContent.classList.add('hide-modal');
            setTimeout(() => {
                document.body.removeChild(modal);
            },495);
        }
    });
    closeDiv.appendChild(closeButton);

    // Append title and close button to header
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeDiv);

    // Create modal body
    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
    if(category === 'SEO'){
        let lightboxContainer = generateLightBox(content);
        modalBody.appendChild(lightboxContainer);
    }else if(category === "Content Writing"){

        const article = document.createElement('article');
        const contentArray = Object.values(content);
        // Iterate through each string in the array
        contentArray.forEach( paragraph => {
            // Create a div element with class 'para'
            const paraDiv = document.createElement('div');
            paraDiv.classList.add('para');

            // Parse the HTML string and append it to the div
            paraDiv.innerHTML = paragraph;

            // Append the div to the article
            article.appendChild(paraDiv);
        });
        article.addEventListener('selectstart', function (e) {
            e.preventDefault();
            alert("You can't select or copy this content.")
        });
        modalBody.appendChild(article);

    }else if (isURL(content) || isLink(content)) {
        // If it's a URL or link, create an iframe
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', content);
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('height', '100%');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', true);
    
        // Append the iframe to the modal body
        modalBody.appendChild(iframe);
        modalBody.style.height = '500px';
    }else if (typeof content === 'object') {
        // If it's an object, convert to array and use forEach loop
        const contentArray = Object.entries(content);

        modalContent.style.width = '90%';
    
        contentArray.forEach(([key, value]) => {
            const mCard = document.createElement('div');
            mCard.classList.add('mcard');
    
            // Card Header
            const mCardHeader = document.createElement('div');
            mCardHeader.classList.add('mcard-header');
            const headerTitle = document.createElement('h2');
            headerTitle.textContent = key;
            mCardHeader.appendChild(headerTitle);
            mCard.appendChild(mCardHeader);
    
            // Card Body
            const mCardBody = document.createElement('div');
            mCardBody.classList.add('mcard-body');

            const mCardFooter = document.createElement('div');
            mCardFooter.classList.add('mcard-footer');
    
            // Check if the value is an object
            if (typeof value === 'object') {
                // If it's an object, convert to array and use forEach loop
                const valueArray = Object.entries(value);
                valueArray.forEach(([innerKey, innerValue]) => {
                    if(innerKey === "price"){
                        const paragraph = document.createElement('p');
                        paragraph.textContent = `${innerKey}: ${innerValue}`;
                        mCardHeader.appendChild(paragraph);
                    }else if (innerKey === "planID") {
                        const button = document.createElement('button');
                        button.textContent = 'Place Order';
                        button.addEventListener('click', () => {
                            console.log(`Clicked on the button with value: ${innerValue}`);
                        });
                        mCardFooter.appendChild(button);
                    }else if (innerKey === "features"){
                        const featuresHeading = document.createElement('h3');
                        featuresHeading.textContent = innerKey;
                        // Append the h3 tag to modal header
                        mCardBody.appendChild(featuresHeading);
                    
                        // Check if the value is an array
                        if (Array.isArray(innerValue)) {
                            // Create a ul tag for the features list
                            const featuresList = document.createElement('ul');
                    
                            // Iterate through the array and create list items
                            innerValue.forEach(feature => {
                                const listItem = document.createElement('li');
                                listItem.textContent = feature;
                                featuresList.appendChild(listItem);
                            });
                    
                            // Append the ul to the modal body
                            mCardBody.appendChild(featuresList);
                        }
                    }else{
                        const paragraph = document.createElement('p');
                        paragraph.textContent = `${innerKey}: ${innerValue}`;
                        mCardBody.appendChild(paragraph);
                    }
                });
            } else {
                // If it's not an object, create a paragraph
                const paragraph = document.createElement('p');
                paragraph.textContent = `${key}: ${value}`;
                mCardBody.appendChild(paragraph);
            }
    
            mCard.appendChild(mCardBody);
            mCard.appendChild(mCardFooter);
    
            // Append the card to the modal body
            modalBody.appendChild(mCard);
            modalBody.classList.add('pricing-container', `column${contentArray.length}`);
        });
    } else {
        // If it's not a URL, link, or object, use innerHTML as before
        modalBody.innerHTML = content;
    }
    


    // Append header, body, and footer to modal content
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);

    // Append modal content to modal container
    modal.appendChild(modalContent);
    
    // Append modal to body
    document.body.appendChild(modal);
}
// Function to check if a given string is a URL
function isURL(str) {
    const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?)?([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]+)?$/;
    return urlRegex.test(str);
}

// Function to check if a given string is a link (starts with http or www)
function isLink(str) {
    return /^https?:\/\//.test(str) || /^www\./.test(str);
}

// create footer credit
function createFooterCredit(title) {
    // Create a container div for the footer credit
    const footerCreditContainer = document.createElement('div');
    footerCreditContainer.classList.add('footer-credit');

    // Create the credit text with the current year
    const currentYear = new Date().getFullYear();
    const creditText = document.createElement('p');
    creditText.textContent = `${title} © ${currentYear}. All Rights Reserved.`;

    // Append the credit text to the container
    footerCreditContainer.appendChild(creditText);

    // Append the container to the body or your desired element
    document.body.appendChild(footerCreditContainer);
}

// create sroll to top button
function createScrollToTopButton() {
    // Create scroll to top button
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
    scrollToTopButton.classList.add('scroll-to-top');

    // Function to scroll to top when button is clicked
    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scrolling behavior
        });
    });

    // Append the button to the body tag
    document.body.appendChild(scrollToTopButton);

    // Hide the button by default
    scrollToTopButton.style.display = 'none';

    // Show the button when user scrolls down 300px
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopButton.style.display = 'block';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });
}

