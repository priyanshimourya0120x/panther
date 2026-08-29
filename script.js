/* =====================================================
   PANTHER DIGITAL SOLUTIONS
   HOME PAGE JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       SELECTORS
    ===================================================== */

    const navbar = document.querySelector(".navbar");

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    const dropdown = document.querySelector(".dropdown");
    const dropdownBtn = document.querySelector(".dropdown-btn");

    const reviewTrack = document.getElementById("reviewTrack");
    const reviews = document.querySelectorAll(".review-card");

    const nextReview = document.getElementById("nextReview");
    const prevReview = document.getElementById("prevReview");

    let currentReview = 0;
    let reviewInterval = null;


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function openMobileMenu() {

        if (!navMenu || !menuBtn) return;

        navMenu.classList.add("show");

        const icon = menuBtn.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        }

        menuBtn.setAttribute("aria-label", "Close menu");
    }


    function closeMobileMenu() {

        if (!navMenu || !menuBtn) return;

        navMenu.classList.remove("show");

        const icon = menuBtn.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

        menuBtn.setAttribute("aria-label", "Open menu");
    }


    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", (event) => {

            event.stopPropagation();

            if (navMenu.classList.contains("show")) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }

        });

    }


    /* =====================================================
       MOBILE DROPDOWN
    ===================================================== */

    if (dropdown && dropdownBtn) {

        dropdownBtn.addEventListener("click", (event) => {

            if (window.innerWidth <= 900) {

                event.preventDefault();

                event.stopPropagation();

                dropdown.classList.toggle("active");

            }

        });

    }


    /* =====================================================
       CLOSE MENU ON NAV LINK CLICK
    ===================================================== */

    document.querySelectorAll(".nav-menu > a").forEach(link => {

        link.addEventListener("click", () => {

            if (window.innerWidth <= 900) {
                closeMobileMenu();
            }

        });

    });


    document.querySelectorAll(".dropdown-menu a").forEach(link => {

        link.addEventListener("click", () => {

            if (window.innerWidth <= 900) {

                closeMobileMenu();

                if (dropdown) {
                    dropdown.classList.remove("active");
                }

            }

        });

    });


    /* =====================================================
       OUTSIDE CLICK
    ===================================================== */

    document.addEventListener("click", (event) => {

        if (
            dropdown &&
            !dropdown.contains(event.target)
        ) {

            dropdown.classList.remove("active");

        }

        if (
            navMenu &&
            menuBtn &&
            window.innerWidth <= 900 &&
            navMenu.classList.contains("show") &&
            !navMenu.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {

            closeMobileMenu();

        }

    });


    /* =====================================================
       REVIEW SLIDER
    ===================================================== */

    function showReview(index) {

        if (!reviewTrack || !reviews.length) return;


        if (index >= reviews.length) {
            currentReview = 0;

        } else if (index < 0) {
            currentReview = reviews.length - 1;

        } else {
            currentReview = index;
        }


        reviewTrack.style.transform =
            `translateX(-${currentReview * 100}%)`;


        reviews.forEach((review, i) => {

            review.classList.toggle(
                "active-review",
                i === currentReview
            );

        });

    }


    /* =====================================================
       NEXT REVIEW
    ===================================================== */

    if (nextReview) {

        nextReview.addEventListener("click", () => {

            showReview(currentReview + 1);

            resetAutoSlider();

        });

    }


    /* =====================================================
       PREVIOUS REVIEW
    ===================================================== */

    if (prevReview) {

        prevReview.addEventListener("click", () => {

            showReview(currentReview - 1);

            resetAutoSlider();

        });

    }


    /* =====================================================
       AUTO SLIDER
    ===================================================== */

    function startAutoSlider() {

        if (!reviews.length) return;

        stopAutoSlider();

        reviewInterval = setInterval(() => {

            showReview(currentReview + 1);

        }, 6000);

    }


    function stopAutoSlider() {

        if (reviewInterval) {

            clearInterval(reviewInterval);

            reviewInterval = null;

        }

    }


    function resetAutoSlider() {

        stopAutoSlider();

        startAutoSlider();

    }


    /* =====================================================
       INITIAL REVIEW
    ===================================================== */

    if (reviews.length) {

        showReview(0);

        startAutoSlider();

    }


    /* =====================================================
       PAUSE REVIEW ON HOVER
    ===================================================== */

    const reviewSection =
        document.querySelector(".reviews");


    if (reviewSection) {

        reviewSection.addEventListener(
            "mouseenter",
            stopAutoSlider
        );

        reviewSection.addEventListener(
            "mouseleave",
            startAutoSlider
        );

    }


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 50) {

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
       SMOOTH HASH SCROLL
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

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


            if (!target) return;


            event.preventDefault();


            const navbarHeight =
                navbar
                    ? navbar.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                navbarHeight -
                20;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });


            if (window.innerWidth <= 900) {
                closeMobileMenu();
            }

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    document.querySelectorAll(
        ".nav-menu > a"
    ).forEach(link => {

        const linkHref =
            link.getAttribute("href");


        if (!linkHref) return;


        const linkPage =
            linkHref
                .split("/")
                .pop()
                .toLowerCase();


        if (
            currentPage === linkPage ||
            (
                currentPage === "" &&
                linkPage === "index.html"
            )
        ) {

            document.querySelectorAll(
                ".nav-menu > a"
            ).forEach(item => {

                item.classList.remove("active");

            });


            link.classList.add("active");

        }

    });


    /* =====================================================
       RESIZE RESET
    ===================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {

            closeMobileMenu();

            if (dropdown) {
                dropdown.classList.remove("active");
            }

        }

    });

});
