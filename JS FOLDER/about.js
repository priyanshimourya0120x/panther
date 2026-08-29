/* =====================================================
   PANTHER DIGITAL SOLUTIONS
   ABOUT PAGE JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       SELECT ELEMENTS
    ===================================================== */

    const navbar = document.getElementById("navbar");

    const menuBtn = document.getElementById("menuBtn");

    const navMenu = document.getElementById("navMenu");

    const dropdownBtn = document.getElementById("dropdownBtn");

    const solutionsDropdown =
        document.getElementById("solutionsDropdown");

    const heroVideo =
        document.querySelector(".hero-video");

    const counters =
        document.querySelectorAll(".counter");

    const statsSection =
        document.querySelector(".stats-section");


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function openMobileMenu() {

        if (!navMenu || !menuBtn) return;

        navMenu.classList.add("active");

        const icon =
            menuBtn.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        }

    }


    function closeMobileMenu() {

        if (!navMenu || !menuBtn) return;

        navMenu.classList.remove("active");

        const icon =
            menuBtn.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

        if (solutionsDropdown) {

            solutionsDropdown.classList.remove("open");

        }

    }


    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", () => {

            const isOpen =
                navMenu.classList.contains("active");

            if (isOpen) {

                closeMobileMenu();

            } else {

                openMobileMenu();

            }

        });

    }


    /* =====================================================
       MOBILE SOLUTIONS DROPDOWN
    ===================================================== */

    if (dropdownBtn && solutionsDropdown) {

        dropdownBtn.addEventListener("click", (event) => {

            if (window.innerWidth <= 768) {

                event.preventDefault();

                event.stopPropagation();

                solutionsDropdown.classList.toggle("open");

            }

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU WHEN NAV LINK IS CLICKED
    ===================================================== */

    const mainNavLinks =
        document.querySelectorAll(
            ".nav-menu > a"
        );


    mainNavLinks.forEach((link) => {

        link.addEventListener("click", () => {

            if (window.innerWidth <= 768) {

                closeMobileMenu();

            }

        });

    });


    /* =====================================================
       CLOSE MENU AFTER CLICKING MEGA MENU LINKS
    ===================================================== */

    const megaLinks =
        document.querySelectorAll(
            ".mega-services a, .mega-btn"
        );


    megaLinks.forEach((link) => {

        link.addEventListener("click", () => {

            if (window.innerWidth <= 768) {

                closeMobileMenu();

            }

        });

    });


    /* =====================================================
       CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", (event) => {

        if (window.innerWidth > 768) return;

        if (!navMenu || !menuBtn) return;

        const clickedInsideMenu =
            navMenu.contains(event.target);

        const clickedMenuButton =
            menuBtn.contains(event.target);


        if (
            navMenu.classList.contains("active") &&
            !clickedInsideMenu &&
            !clickedMenuButton
        ) {

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
       HERO VIDEO FALLBACK
    ===================================================== */

    if (heroVideo) {

        heroVideo.addEventListener("error", () => {

            const heroImage =
                document.querySelector(".hero-image");

            if (heroImage) {

                heroImage.classList.add("active");

            }

        });


        heroVideo.addEventListener("loadeddata", () => {

            const heroImage =
                document.querySelector(".hero-image");

            if (heroImage) {

                heroImage.classList.remove("active");

            }

        });

    }


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 30) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );


    updateNavbar();


    /* =====================================================
       SMOOTH SCROLL FOR INTERNAL LINKS
    ===================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


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
                    navbar
                        ? navbar.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.pageYOffset -
                    navbarHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });


                if (window.innerWidth <= 768) {

                    closeMobileMenu();

                }

            }

        });

    });


    /* =====================================================
       STATS COUNTER
    ===================================================== */

    let counterStarted = false;


    function startCounters() {

        counters.forEach((counter) => {

            const target =
                Number(
                    counter.dataset.count
                );


            const duration = 1600;

            const startTime =
                performance.now();


            function updateCounter(currentTime) {

                const elapsed =
                    currentTime - startTime;


                const progress =
                    Math.min(
                        elapsed / duration,
                        1
                    );


                /*
                   Smooth ease-out animation
                */

                const easeOut =
                    1 -
                    Math.pow(
                        1 - progress,
                        3
                    );


                const currentValue =
                    Math.floor(
                        easeOut * target
                    );


                counter.textContent =
                    currentValue;


                if (progress < 1) {

                    requestAnimationFrame(
                        updateCounter
                    );

                } else {

                    counter.textContent =
                        target;

                }

            }


            requestAnimationFrame(
                updateCounter
            );

        });

    }


    if (
        statsSection &&
        counters.length > 0
    ) {

        const statsObserver =
            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting &&
                            !counterStarted
                        ) {

                            counterStarted = true;

                            startCounters();

                            observer.unobserve(
                                statsSection
                            );

                        }

                    });

                },

                {
                    threshold: 0.35
                }

            );


        statsObserver.observe(
            statsSection
        );

    }


    /* =====================================================
       SCROLL REVEAL
       APPROACH CARDS
    ===================================================== */

    const revealElements =
        document.querySelectorAll(

            ".approach-card, " +
            ".why-card, " +
            ".purpose-box, " +
            ".service-item, " +
            ".industry-tags span, " +
            ".intro-text, " +
            ".intro-image"

        );


    if (revealElements.length > 0) {

        revealElements.forEach((element) => {

            element.classList.add(
                "reveal-element"
            );

        });


        const revealObserver =
            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "reveal-active"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -50px 0px"
                }

            );


        revealElements.forEach((element) => {

            revealObserver.observe(
                element
            );

        });

    }


    /* =====================================================
       APPROACH CARD STAGGER DELAY
    ===================================================== */

    const approachCards =
        document.querySelectorAll(
            ".approach-card"
        );


    approachCards.forEach(
        (card, index) => {

            card.style.transitionDelay =
                `${index * 0.1}s`;

        }
    );


    /* =====================================================
       WHY CARD STAGGER DELAY
    ===================================================== */

    const whyCards =
        document.querySelectorAll(
            ".why-card"
        );


    whyCards.forEach(
        (card, index) => {

            card.style.transitionDelay =
                `${index * 0.1}s`;

        }
    );


    /* =====================================================
       SERVICE ITEM STAGGER DELAY
    ===================================================== */

    const serviceItems =
        document.querySelectorAll(
            ".service-item"
        );


    serviceItems.forEach(
        (item, index) => {

            item.style.transitionDelay =
                `${index * 0.07}s`;

        }
    );


    /* =====================================================
       INDUSTRY TAG STAGGER
    ===================================================== */

    const industryTags =
        document.querySelectorAll(
            ".industry-tags span"
        );


    industryTags.forEach(
        (tag, index) => {

            tag.style.transitionDelay =
                `${index * 0.08}s`;

        }
    );


    /* =====================================================
       SERVICE HOVER ARROW ANIMATION
    ===================================================== */

    serviceItems.forEach((item) => {

        const arrow =
            item.querySelector(
                ".service-arrow"
            );


        if (!arrow) return;


        item.addEventListener(
            "mouseenter",
            () => {

                arrow.style.transform =
                    "translate(4px, -4px)";

            }
        );


        item.addEventListener(
            "mouseleave",
            () => {

                arrow.style.transform =
                    "translate(0, 0)";

            }
        );

    });


});