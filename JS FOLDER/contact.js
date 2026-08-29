/* =====================================================
   PANTHER DIGITAL SOLUTIONS
   CONTACT PAGE JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       SELECTORS
    ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    const dropdown = document.querySelector(".dropdown");
    const dropdownBtn = document.querySelector(".dropdown-btn");

    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const serviceInput = document.getElementById("service");
    const messageInput = document.getElementById("message");


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", () => {

            navMenu.classList.toggle("active");

            const icon = menuBtn.querySelector("i");

            if (!icon) return;

            icon.classList.toggle(
                "fa-bars",
                !navMenu.classList.contains("active")
            );

            icon.classList.toggle(
                "fa-xmark",
                navMenu.classList.contains("active")
            );

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU
    ===================================================== */

    document.querySelectorAll(".nav-menu > a").forEach(link => {

        link.addEventListener("click", () => {

            closeMobileMenu();

        });

    });


    function closeMobileMenu() {

        if (!navMenu || !menuBtn) return;

        navMenu.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    }


    /* =====================================================
       MOBILE DROPDOWN
    ===================================================== */

    if (dropdown && dropdownBtn) {

        dropdownBtn.addEventListener("click", (event) => {

            if (window.innerWidth <= 768) {

                /*
                   Agar Solutions text ke link par click nahi hua
                   to dropdown open/close hoga
                */

                if (!event.target.closest("a")) {

                    event.preventDefault();

                    dropdown.classList.toggle("open");

                }

            }

        });

    }


    /* =====================================================
       CLOSE DROPDOWN ON OUTSIDE CLICK
    ===================================================== */

    document.addEventListener("click", (event) => {

        if (
            dropdown &&
            !dropdown.contains(event.target)
        ) {

            dropdown.classList.remove("open");

        }

    });


    /* =====================================================
       CLOSE MOBILE MENU WHEN DROPDOWN LINK CLICKED
    ===================================================== */

    document.querySelectorAll(".dropdown-menu a").forEach(link => {

        link.addEventListener("click", () => {

            if (window.innerWidth <= 768) {

                setTimeout(() => {

                    closeMobileMenu();

                }, 150);

            }

        });

    });


    /* =====================================================
       SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }

        );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("show");

        });

    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

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

            const navbar =
                document.querySelector(".navbar");

            const navbarHeight =
                navbar ? navbar.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                navbarHeight -
                20;

            window.scrollTo({

                top: targetPosition,
                behavior: "smooth"

            });

        });

    });


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    const navbar =
        document.querySelector(".navbar");


    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 40) {

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
       PHONE NUMBER VALIDATION
    ===================================================== */

    if (phoneInput) {

        phoneInput.addEventListener("input", () => {

            phoneInput.value =
                phoneInput.value.replace(
                    /[^0-9+\-\s]/g,
                    ""
                );

        });

    }


    /* =====================================================
       FORM MESSAGE FUNCTION
    ===================================================== */

    function showMessage(text, type = "success") {

        if (!formMessage) return;

        formMessage.textContent = text;

        formMessage.className =
            `form-message ${type}`;

        formMessage.style.display = "block";

    }


    function clearMessage() {

        if (!formMessage) return;

        formMessage.textContent = "";

        formMessage.className =
            "form-message";

    }


    /* =====================================================
       CONTACT FORM SUBMIT
    ===================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            handleContactForm
        );

    }


    function handleContactForm(event) {

        event.preventDefault();


        /* -----------------------------------------------
           GET FORM VALUES
        ----------------------------------------------- */

        const name =
            nameInput.value.trim();

        const email =
            emailInput.value.trim();

        const phone =
            phoneInput.value.trim();

        const service =
            serviceInput.value.trim();

        const message =
            messageInput.value.trim();


        /* -----------------------------------------------
           VALIDATION
        ----------------------------------------------- */

        if (!name) {

            showMessage(
                "Please enter your name.",
                "error"
            );

            nameInput.focus();

            return;

        }


        if (!email) {

            showMessage(
                "Please enter your email address.",
                "error"
            );

            emailInput.focus();

            return;

        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            showMessage(
                "Please enter a valid email address.",
                "error"
            );

            emailInput.focus();

            return;

        }


        if (!message) {

            showMessage(
                "Please tell us about your project.",
                "error"
            );

            messageInput.focus();

            return;

        }


        /* -----------------------------------------------
           PHONE VALIDATION
        ----------------------------------------------- */

        if (phone) {

            const phoneDigits =
                phone.replace(/\D/g, "");

            if (phoneDigits.length < 10) {

                showMessage(
                    "Please enter a valid phone number.",
                    "error"
                );

                phoneInput.focus();

                return;

            }

        }


        /* -----------------------------------------------
           BUTTON LOADING STATE
        ----------------------------------------------- */

        const submitBtn =
            contactForm.querySelector(".form-btn");

        const originalContent =
            submitBtn.innerHTML;


        submitBtn.disabled = true;

        submitBtn.classList.add("loading");

        submitBtn.innerHTML = `
            Sending...
            <span>
                <i class="fa-solid fa-spinner fa-spin"></i>
            </span>
        `;


        /* -----------------------------------------------
           CURRENTLY FRONTEND SUCCESS
           
           Yahan baad mein EmailJS,
           FormSubmit ya backend API connect
           kiya ja sakta hai.
        ----------------------------------------------- */

        setTimeout(() => {

            showMessage(
                "Thank you! Your message has been sent successfully. We will get back to you soon.",
                "success"
            );


            contactForm.reset();


            submitBtn.disabled = false;

            submitBtn.classList.remove("loading");

            submitBtn.innerHTML =
                originalContent;


        }, 1200);

    }


    /* =====================================================
       CLEAR ERROR MESSAGE ON INPUT
    ===================================================== */

    [
        nameInput,
        emailInput,
        phoneInput,
        serviceInput,
        messageInput
    ].forEach(input => {

        if (!input) return;

        input.addEventListener(
            "input",
            clearMessage
        );

        input.addEventListener(
            "change",
            clearMessage
        );

    });


    /* =====================================================
       ACTIVE NAV LINK BASED ON CURRENT PAGE
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    document.querySelectorAll(
        ".nav-menu > a"
    ).forEach(link => {

        const linkPage =
            link.getAttribute("href")
                ?.toLowerCase();


        if (
            currentPage === linkPage ||
            (
                !currentPage &&
                linkPage === "index.html"
            )
        ) {

            document
                .querySelectorAll(".nav-menu > a")
                .forEach(item => {

                    item.classList.remove("active");

                });


            link.classList.add("active");

        }

    });


    /* =====================================================
       WINDOW RESIZE RESET
    ===================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {

            closeMobileMenu();

            if (dropdown) {

                dropdown.classList.remove("open");

            }

        }

    });


});