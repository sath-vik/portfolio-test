/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 1000,
    delay: 100,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 


// contact form related
// Initialize emailjs
emailjs.init("vDaQKN39yXb1FmL6b");

function validateAndSend() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const contactResponse = document.getElementById("contact-response");
    const submitButton = document.querySelector('.contact__button');

    // Check if the name is empty
    if (!name) {
        contactResponse.style.display = 'inline';
        contactResponse.innerText = 'Please enter your name.';
        setTimeout(() => {
            contactResponse.style.display = 'none';
        }, 5000);
        return;
    }

    // Check if the email is empty or invalid
    if (!email) {
        contactResponse.style.display = 'inline';
        contactResponse.innerText = 'Please enter your email address.';
        setTimeout(() => {
            contactResponse.style.display = 'none';
        }, 5000);
        return;
    } else if (!isValidEmail(email)) {
        contactResponse.style.display = 'inline';
        contactResponse.innerText = 'Please enter a valid email address.';
        setTimeout(() => {
            contactResponse.style.display = 'none';
        }, 5000);
        return;
    }

    // Check if the message is empty
    if (!message) {
        contactResponse.style.display = 'inline';
        contactResponse.innerText = 'Please enter your message.';
        setTimeout(() => {
            contactResponse.style.display = 'none';
        }, 5000);
        return;
    }

    // If all fields are valid, submit the form
    submitButton.innerHTML = `Submitting...`;
    emailjs.send("service_ky2agvt", "template_qnfllcl", {
        to_name: "Recipient Name",  // Replace with the recipient's name
        from_name: name,
        from_email: email,
        message_html: message
    }).then(
        function (response) {
            submitButton.innerHTML = `Submit`;
            console.log("Email sent successfully:", response);
            contactResponse.style.display = 'inline';
            contactResponse.innerText = `Message sent successfully.`;
            setTimeout(() => {
                contactResponse.style.display = 'none';
            }, 5000);
            document.getElementById("contact-form").reset();
        },
        function (error) {
            submitButton.innerHTML = `Submit`;
            console.log("Email sending failed:", error);
            contactResponse.style.display = 'inline';
            contactResponse.innerText = `Message not sent.`;
            setTimeout(() => {
                contactResponse.style.display = 'none';
            }, 5000);
        }
    );
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}














document.addEventListener("DOMContentLoaded", function () {
    const icons = document.querySelectorAll('.floating-icon');
    const container = document.querySelector('.floating-icons');
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    // Generate random initial positions and velocities for icons
    const iconData = Array.from(icons).map(icon => {
        const x = Math.random() * (containerWidth - icon.offsetWidth);
        const y = Math.random() * (containerHeight - icon.offsetHeight);
        const vx = (Math.random() - 0.5) * 0.5; // Slower velocities for smooth motion
        const vy = (Math.random() - 0.5) * 0.5;
        return { icon, x, y, vx, vy, width: icon.offsetWidth, height: icon.offsetHeight };
    });

    // Update positions
    function updatePositions() {
        iconData.forEach(data => {
            // Update position based on velocity
            data.x += data.vx;
            data.y += data.vy;

            // Handle container boundary collisions
            if (data.x <= 0 || data.x + data.width >= containerWidth) data.vx *= -1;
            if (data.y <= 0 || data.y + data.height >= containerHeight) data.vy *= -1;

            // Apply updated position to the icon
            data.icon.style.left = `${data.x}px`;
            data.icon.style.top = `${data.y}px`;
        });

        // Detect and resolve collisions between icons
        for (let i = 0; i < iconData.length; i++) {
            for (let j = i + 1; j < iconData.length; j++) {
                checkCollision(iconData[i], iconData[j]);
            }
        }
    }

    // Collision detection and resolution between two icons
    function checkCollision(data1, data2) {
        const dx = data1.x - data2.x;
        const dy = data1.y - data2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = (data1.width + data2.width) / 2;

        // If they are colliding
        if (distance < minDistance) {
            // Simple collision resolution: swap velocities
            const tempVx = data1.vx;
            const tempVy = data1.vy;
            data1.vx = data2.vx;
            data1.vy = data2.vy;
            data2.vx = tempVx;
            data2.vy = tempVy;

            // Move icons apart to avoid overlap after collision
            const overlap = minDistance - distance;
            const adjustmentX = (overlap * (dx / distance)) / 2;
            const adjustmentY = (overlap * (dy / distance)) / 2;

            data1.x += adjustmentX;
            data1.y += adjustmentY;
            data2.x -= adjustmentX;
            data2.y -= adjustmentY;
        }
    }

    // Animation loop
    function animate() {
        updatePositions();
        requestAnimationFrame(animate);
    }

    // Start the animation
    animate();
});
