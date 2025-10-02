// Ensure GSAP and ScrollTrigger are loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // 1. Register Plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin); 

    // 2. Smooth Scroll for Navigation Links
    document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            gsap.to(window, {
                duration: 1, 
                scrollTo: targetId, 
                ease: "power2.inOut"
            });
        });
    });

    // 3. Hero Section Entrance Animation (Runs once on load)
    gsap.from(".hero-content .animate-text", {
        y: 50,
        opacity: 0,
        stagger: 0.3, 
        duration: 0.8,
        delay: 0.5,
        ease: "power3.out"
    });

    // 4. Unified Section Scroll Animations (Fade-in and Slide-up)
    const sectionsToAnimate = gsap.utils.toArray(".animate-on-scroll");

    // --- CRITICAL FIX STEP 1 ---
    // Explicitly set the initial hidden state for all section content.
    gsap.set(sectionsToAnimate, { opacity: 0, y: 50 });

    sectionsToAnimate.forEach(section => {
        // --- CRITICAL FIX STEP 2 ---
        // Animate the element TO its default (visible) state when triggered.
        gsap.to(section, {
            opacity: 1, // Animate TO opacity 1
            y: 0,       // Animate TO y: 0 (original position)
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: "top bottom", // Starts when the element enters the bottom of the viewport
                // play, pause, resume, reverse (when scrolling back up)
                toggleActions: "play none none reverse", 
            },
        });
    });
    
    // 5. Project Card stagger animation on scroll
    const projectCards = gsap.utils.toArray(".project-card");
    
    // Set initial state for cards
    gsap.set(projectCards, { opacity: 0, y: 30 }); 

    // Animate cards to visible state when triggered
    gsap.to(".project-card", {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
            trigger: "#projects .projects-grid",
            start: "top 85%",
            toggleActions: "play none none reverse", 
        }
    });

});