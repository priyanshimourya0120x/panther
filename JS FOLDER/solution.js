/* =====================================================
   PANTHER DIGITAL SOLUTIONS - SOLUTION PAGE JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");
    const dropdown = document.querySelector(".dropdown");
    const dropdownBtn = document.querySelector(".dropdown-btn");
    const navbar = document.querySelector(".navbar");
    const heroVideo = document.querySelector(".hero-video");
    const solutionCards = document.querySelectorAll(".solution-card");


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function openMobileMenu() {

        if (!navMenu || !menuBtn) return;

        navMenu.classList.add("active");
        document.body.classList.add("menu-open");

        const icon = menuBtn.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        }

    }


    function closeMobileMenu() {

        if (!navMenu || !menuBtn) return;

        navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");

        const icon = menuBtn.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

        if (dropdown) {
            dropdown.classList.remove("open");
        }

    }


    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", (e) => {

            e.stopPropagation();

            if (navMenu.classList.contains("active")) {

                closeMobileMenu();

            } else {

                openMobileMenu();

            }

        });

    }


    /* =====================================================
       MOBILE DROPDOWN
    ===================================================== */

    if (dropdownBtn && dropdown) {

        dropdownBtn.addEventListener("click", (e) => {

            if (window.innerWidth <= 768) {

                e.preventDefault();
                e.stopPropagation();

                dropdown.classList.toggle("open");

            }

        });

    }


    /* =====================================================
       CLOSE MENU WHEN CLICKING NAVIGATION LINK
    ===================================================== */

    const navLinks = document.querySelectorAll(
        ".nav-menu a:not(.dropdown-btn)"
    );


    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (window.innerWidth <= 768) {

                closeMobileMenu();

            }

        });

    });


    /* =====================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", (e) => {

        if (window.innerWidth > 768) return;

        if (!navMenu || !menuBtn) return;

        const clickedInsideMenu =
            navMenu.contains(e.target);

        const clickedMenuButton =
            menuBtn.contains(e.target);

        if (!clickedInsideMenu && !clickedMenuButton) {

            closeMobileMenu();

        }

    });


    /* =====================================================
       RESET MOBILE MENU ON DESKTOP
    ===================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {

            closeMobileMenu();

        }

    });


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    function handleNavbarScroll() {

        if (!navbar) return;

        if (window.scrollY > 40) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }


    window.addEventListener("scroll", handleNavbarScroll);

    handleNavbarScroll();


    /* =====================================================
       HERO VIDEO FALLBACK
    ===================================================== */

    if (heroVideo) {

        heroVideo.addEventListener("error", () => {

            const heroSection =
                document.querySelector(".solutions-hero");

            if (heroSection) {

                heroSection.classList.add(
                    "video-fallback"
                );

            }

        });


        heroVideo.addEventListener("loadeddata", () => {

            heroVideo.classList.add("loaded");

        });

    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    const anchorLinks = document.querySelectorAll(
        'a[href^="#"]'
    );


    anchorLinks.forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const targetId =
                this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target =
                document.querySelector(targetId);

            if (!target) return;

            e.preventDefault();

            const navbarHeight =
                navbar ? navbar.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top
                + window.pageYOffset
                - navbarHeight;

            window.scrollTo({

                top: targetPosition,
                behavior: "smooth"

            });

        });

    });


    /* =====================================================
       SOLUTION CARD SCROLL REVEAL
    ===================================================== */

    if ("IntersectionObserver" in window) {

        const solutionObserver =
            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "show"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -60px 0px"
                }

            );


        solutionCards.forEach((card, index) => {

            card.style.transitionDelay =
                `${index % 2 === 0 ? 0 : 100}ms`;

            solutionObserver.observe(card);

        });

    } else {

        solutionCards.forEach(card => {

            card.classList.add("show");

        });

    }


    /* =====================================================
       IMAGE LOAD ANIMATION
    ===================================================== */

    const solutionImages =
        document.querySelectorAll(".solution-image img");


    solutionImages.forEach(image => {

        if (image.complete) {

            image.classList.add("loaded");

        } else {

            image.addEventListener("load", () => {

                image.classList.add("loaded");

            });

        }

    });


    /* =====================================================
       BUTTON RIPPLE EFFECT
    ===================================================== */

    const buttons = document.querySelectorAll(
        ".primary-btn, .solution-btn"
    );


    buttons.forEach(button => {

        button.addEventListener("click", function (e) {

            const ripple =
                document.createElement("span");

            ripple.classList.add("ripple");

            const rect =
                this.getBoundingClientRect();

            const size =
                Math.max(
                    rect.width,
                    rect.height
                );

            ripple.style.width =
                `${size}px`;

            ripple.style.height =
                `${size}px`;

            ripple.style.left =
                `${e.clientX - rect.left - size / 2}px`;

            ripple.style.top =
                `${e.clientY - rect.top - size / 2}px`;

            this.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });


    /* =====================================================
       HERO CONTENT ANIMATION
    ===================================================== */

    const heroContent =
        document.querySelector(".hero-content");


    if (heroContent) {

        setTimeout(() => {

            heroContent.classList.add("show");

        }, 200);

    }


    /* =====================================================
       ACTIVE NAV LINK DETECTION
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    document.querySelectorAll(".nav-menu > a")
        .forEach(link => {

            const linkPage =
                link.getAttribute("href")
                    ?.toLowerCase();

            if (
                currentPage &&
                linkPage === currentPage
            ) {

                document
                    .querySelectorAll(
                        ".nav-menu > a"
                    )
                    .forEach(item => {

                        item.classList.remove("active");

                    });

                link.classList.add("active");

            }

        });


});