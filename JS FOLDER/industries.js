/* =====================================================
   PANTHER DIGITAL - INDUSTRIES PAGE JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const navbar = document.querySelector(".navbar");

    const menuBtn = document.getElementById("menuBtn");

    const navMenu = document.getElementById("navMenu");

    const dropdown = document.querySelector(".dropdown");

    const dropdownBtn = document.querySelector(".dropdown-btn");

    const industryCards =
        document.querySelectorAll(".industry-card");



    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function openMobileMenu() {

        if (!navMenu || !menuBtn) return;

        navMenu.classList.add("active");

        const icon = menuBtn.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        }

        document.body.classList.add("menu-open");

    }


    function closeMobileMenu() {

        if (!navMenu || !menuBtn) return;

        navMenu.classList.remove("active");

        dropdown?.classList.remove("open");

        const icon = menuBtn.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

        document.body.classList.remove("menu-open");

    }


    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", (event) => {

            event.stopPropagation();

            if (navMenu.classList.contains("active")) {

                closeMobileMenu();

            } else {

                openMobileMenu();

            }

        });

    }



    /* =====================================================
       MOBILE SOLUTIONS DROPDOWN
    ===================================================== */

    if (dropdown && dropdownBtn) {

        dropdownBtn.addEventListener("click", (event) => {

            if (window.innerWidth <= 768) {

                event.preventDefault();

                event.stopPropagation();

                dropdown.classList.toggle("open");

            }

        });

    }



    /* =====================================================
       CLOSE MENU WHEN NAV LINK IS CLICKED
    ===================================================== */

    const navLinks =
        document.querySelectorAll(".nav-menu a");

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            if (window.innerWidth <= 768) {

                closeMobileMenu();

            }

        });

    });



    /* =====================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", (event) => {

        if (
            window.innerWidth <= 768 &&
            navMenu &&
            menuBtn &&
            !navMenu.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {

            closeMobileMenu();

        }

    });



    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    const anchorLinks =
        document.querySelectorAll('a[href^="#"]');


    anchorLinks.forEach((link) => {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(targetId);


            if (target) {

                event.preventDefault();


                const navbarHeight =
                    navbar ? navbar.offsetHeight : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    navbarHeight -
                    20;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }

        });

    });



    /* =====================================================
       INDUSTRY CARD SCROLL REVEAL
    ===================================================== */

    if (industryCards.length > 0) {


        const cardObserver =
            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("show");

                            observer.unobserve(entry.target);

                        }

                    });

                },

                {

                    threshold: 0.12,

                    rootMargin: "0px 0px -60px 0px"

                }

            );


        industryCards.forEach((card, index) => {

            card.classList.add("reveal-card");


            card.style.transitionDelay =
                `${index % 2 === 0 ? 0 : 120}ms`;


            cardObserver.observe(card);

        });

    }



    /* =====================================================
       HERO CONTENT REVEAL
    ===================================================== */

    const heroContent =
        document.querySelector(".hero-content");


    if (heroContent) {

        heroContent.classList.add("hero-show");

    }



    /* =====================================================
       INDUSTRY INTRO REVEAL
    ===================================================== */

    const industryIntro =
        document.querySelector(".industry-intro");


    if (industryIntro) {


        const introObserver =
            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("show-intro");

                            observer.unobserve(entry.target);

                        }

                    });

                },

                {

                    threshold: 0.2

                }

            );


        introObserver.observe(industryIntro);

    }



    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    function handleNavbarScroll() {

        if (!navbar) return;


        if (window.scrollY > 50) {

            navbar.classList.add("navbar-scrolled");

        } else {

            navbar.classList.remove("navbar-scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        handleNavbarScroll
    );


    handleNavbarScroll();



    /* =====================================================
       RESET MOBILE MENU ON DESKTOP
    ===================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {

            closeMobileMenu();

        }

    });



    /* =====================================================
       KEYBOARD ESCAPE CLOSE
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeMobileMenu();

        }

    });


});