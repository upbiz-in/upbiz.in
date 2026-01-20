/* ===================================================================
 * Monica 1.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function (html) {

    'use strict';

    const cfg = {

        // MailChimp URL
        mailChimpURL: 'https://facebook.us1.list-manage.com/subscribe/post?u=1abf75f6981256963a47d197a&amp;id=37c6d8f4d6'

    };


    /* preloader
     * -------------------------------------------------- */
    const ssPreloader = function () {

        const preloader = document.querySelector('#preloader');
        if (!preloader) return;

        const siteBody = document.querySelector('body');
        const minDisplayTime = 3300; // 1s delay + 0.5s + 4*0.3s + 0.3s + 300ms buffer
        const startTime = Date.now();

        html.classList.add('ss-preload');

        window.addEventListener('load', function () {
            const elapsedTime = Date.now() - startTime;
            const hideDelay = (elapsedTime >= minDisplayTime) ? 0 : minDisplayTime - elapsedTime;

            setTimeout(function () {
                preloader.addEventListener('transitionend', function afterTransition(e) {
                    if (e.target.matches('#preloader')) {
                        siteBody.classList.add('ss-show');
                        e.target.style.display = 'none';
                        e.target.style.visibility = 'hidden';
                        preloader.removeEventListener(e.type, afterTransition);
                    }
                });
                html.classList.remove('ss-preload');
                html.classList.add('ss-loaded');
            }, hideDelay);
        });

    }; // end ssPreloader


    /* mobile menu
     * ---------------------------------------------------- */
    const ssMobileMenu = function () {

        const toggleButton = document.querySelector('.s-header__menu-toggle');
        const mainNavWrap = document.querySelector('.s-header__nav');
        const siteBody = document.querySelector('body');

        if (!(toggleButton && mainNavWrap)) return;

        toggleButton.addEventListener('click', function (e) {
            e.preventDefault();
            toggleButton.classList.toggle('is-clicked');
            siteBody.classList.toggle('menu-is-open');
        });

        mainNavWrap.querySelectorAll('.s-header__nav a').forEach(function (link) {

            link.addEventListener("click", function (event) {

                // at 900px and below
                if (window.matchMedia('(max-width: 900px)').matches) {
                    toggleButton.classList.toggle('is-clicked');
                    siteBody.classList.toggle('menu-is-open');
                }
            });
        });

        window.addEventListener('resize', function () {

            // above 900px
            if (window.matchMedia('(min-width: 901px)').matches) {
                if (siteBody.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
                if (toggleButton.classList.contains('is-clicked')) toggleButton.classList.remove('is-clicked');
            }
        });

    }; // end ssMobileMenu


    /* swiper
     * ------------------------------------------------------ */
    const ssSwiper = function () {

        const homeSliderSwiper = new Swiper('.home-slider', {

            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                // when window width is > 400px
                401: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is > 800px
                801: {
                    slidesPerView: 2,
                    spaceBetween: 40
                },
                // when window width is > 1330px
                1331: {
                    slidesPerView: 3,
                    spaceBetween: 48
                },
                // when window width is > 1773px
                1774: {
                    slidesPerView: 4,
                    spaceBetween: 48
                }
            }
        });

        const pageSliderSwiper = new Swiper('.page-slider', {

            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                // when window width is > 400px
                401: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is > 800px
                801: {
                    slidesPerView: 2,
                    spaceBetween: 40
                },
                // when window width is > 1240px
                1241: {
                    slidesPerView: 3,
                    spaceBetween: 48
                }
            }
        });

    }; // end ssSwiper


    /* mailchimp form
     * ---------------------------------------------------- */
    const ssMailChimpForm = function () {

        const mcForm = document.querySelector('#mc-form');

        if (!mcForm) return;

        // Add novalidate attribute
        mcForm.setAttribute('novalidate', true);

        // Field validation
        function hasError(field) {

            // Don't validate submits, buttons, file and reset inputs, and disabled fields
            if (field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') return;

            // Get validity
            let validity = field.validity;

            // If valid, return null
            if (validity.valid) return;

            // If field is required and empty
            if (validity.valueMissing) return 'Please enter an email address.';

            // If not the right type
            if (validity.typeMismatch) {
                if (field.type === 'email') return 'Please enter a valid email address.';
            }

            // If pattern doesn't match
            if (validity.patternMismatch) {

                // If pattern info is included, return custom error
                if (field.hasAttribute('title')) return field.getAttribute('title');

                // Otherwise, generic error
                return 'Please match the requested format.';
            }

            // If all else fails, return a generic catchall error
            return 'The value you entered for this field is invalid.';

        };

        // Show error message
        function showError(field, error) {

            // Get field id or name
            let id = field.id || field.name;
            if (!id) return;

            let errorMessage = field.form.querySelector('.mc-status');

            // Update error message
            errorMessage.classList.remove('success-message');
            errorMessage.classList.add('error-message');
            errorMessage.innerHTML = error;

        };

        // Display form status (callback function for JSONP)
        window.displayMailChimpStatus = function (data) {

            // Make sure the data is in the right format and that there's a status container
            if (!data.result || !data.msg || !mcStatus) return;

            // Update our status message
            mcStatus.innerHTML = data.msg;

            // If error, add error class
            if (data.result === 'error') {
                mcStatus.classList.remove('success-message');
                mcStatus.classList.add('error-message');
                return;
            }

            // Otherwise, add success class
            mcStatus.classList.remove('error-message');
            mcStatus.classList.add('success-message');
        };

        // Submit the form 
        function submitMailChimpForm(form) {

            let url = cfg.mailChimpURL;
            let emailField = form.querySelector('#mce-EMAIL');
            let serialize = '&' + encodeURIComponent(emailField.name) + '=' + encodeURIComponent(emailField.value);

            if (url == '') return;

            url = url.replace('/post?u=', '/post-json?u=');
            url += serialize + '&c=displayMailChimpStatus';

            // Create script with url and callback (if specified)
            var ref = window.document.getElementsByTagName('script')[0];
            var script = window.document.createElement('script');
            script.src = url;

            // Create global variable for the status container
            window.mcStatus = form.querySelector('.mc-status');
            window.mcStatus.classList.remove('error-message', 'success-message')
            window.mcStatus.innerText = 'Submitting...';

            // Insert script tag into the DOM
            ref.parentNode.insertBefore(script, ref);

            // After the script is loaded (and executed), remove it
            script.onload = function () {
                this.remove();
            };

        };

        // Check email field on submit
        mcForm.addEventListener('submit', function (event) {

            event.preventDefault();

            let emailField = event.target.querySelector('#mce-EMAIL');
            let error = hasError(emailField);

            if (error) {
                showError(emailField, error);
                emailField.focus();
                return;
            }

            submitMailChimpForm(this);

        }, false);

    }; // end ssMailChimpForm


    /* alert boxes
     * ------------------------------------------------------ */
    const ssAlertBoxes = function () {

        const boxes = document.querySelectorAll('.alert-box');

        boxes.forEach(function (box) {

            box.addEventListener('click', function (e) {
                if (e.target.matches('.alert-box__close')) {
                    e.stopPropagation();
                    e.target.parentElement.classList.add('hideit');

                    setTimeout(function () {
                        box.style.display = 'none';
                    }, 500)
                }
            });
        })

    }; // end ssAlertBoxes


    /* Back to Top
    * ------------------------------------------------------ */
    const ssBackToTop = function () {

        const pxShow = 900;
        const goTopButton = document.querySelector(".ss-go-top");

        if (!goTopButton) return;

        // Show or hide the button
        if (window.scrollY >= pxShow) goTopButton.classList.add("link-is-visible");

        window.addEventListener('scroll', function () {
            if (window.scrollY >= pxShow) {
                if (!goTopButton.classList.contains('link-is-visible')) goTopButton.classList.add("link-is-visible")
            } else {
                goTopButton.classList.remove("link-is-visible")
            }
        });

    }; // end ssBackToTop


    /* smoothscroll
     * ------------------------------------------------------ */
    const ssMoveTo = function () {

        const easeFunctions = {
            easeInQuad: function (t, b, c, d) {
                t /= d;
                return c * t * t + b;
            },
            easeOutQuad: function (t, b, c, d) {
                t /= d;
                return -c * t * (t - 2) + b;
            },
            easeInOutQuad: function (t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            },
            easeInOutCubic: function (t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t * t + b;
                t -= 2;
                return c / 2 * (t * t * t + 2) + b;
            }
        }

        const triggers = document.querySelectorAll('.smoothscroll');

        const moveTo = new MoveTo({
            tolerance: 0,
            duration: 1200,
            easing: 'easeInOutCubic',
            container: window
        }, easeFunctions);

        triggers.forEach(function (trigger) {
            moveTo.registerTrigger(trigger);
        });

    }; // end ssMoveTo

    /* Animate on scroll
     * ------------------------------------------------------ */
    const ssAnimateOnScroll = function () {

        const blocks = document.querySelectorAll('.expertise-right .list-items__item');
        if (!blocks.length) return;

        const observer = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    entry.target.classList.remove('is-visible');
                }
            });
        }, {
            root: null,
            rootMargin: "0px",
            threshold: 0.1 // item is 10% visible
        });

        blocks.forEach(function (block) {
            observer.observe(block);
        });

    }; // end ssAnimateOnScroll

    /* A utility function to map a value from one range to another.
    * ------------------------------------------------------ */
    const mapRange = (value, inMin, inMax, outMin, outMax) => {
        // Ensure the input value is within the input range
        const val = Math.max(inMin, Math.min(inMax, value));
        // Map the value to the output range
        return (val - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    };

    /* Gradient Text on Scroll
     * ------------------------------------------------------ */
    const ssGradientText = function () {
        const gradientText = document.querySelector('#gradient-text');
        const textContainer = gradientText.parentElement; // The element to track for scroll progress
        if (!gradientText || !textContainer) return;

        const originalText = gradientText.innerText;
        const targetWords = ["creating", "managing", "supporting"];

        // Clear original text
        gradientText.innerHTML = '';

        // Split by whitespace but keep delimiters to preserve spacing
        const tokens = originalText.split(/(\s+)/);

        tokens.forEach(token => {
            // Check if the token (trimmed of punctuation for matching) is a target word
            // We remove punctuation for the check but keep the token as is for display
            const cleanToken = token.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
            const isTarget = targetWords.includes(cleanToken);

            let container = gradientText;
            if (isTarget) {
                const highlightSpan = document.createElement('span');
                highlightSpan.classList.add('highlight-word');
                gradientText.appendChild(highlightSpan);
                container = highlightSpan;
            }

            // Create char spans
            const chars = token.split('');
            chars.forEach(char => {
                const span = document.createElement('span');
                span.textContent = char;
                span.classList.add('char');
                container.appendChild(span);
            });
        });

        const charSpans = gradientText.querySelectorAll('.char');
        const totalChars = charSpans.length;

        const updateTextHighlight = () => {
            const rect = textContainer.getBoundingClientRect();
            const elementTop = rect.top;
            const viewportHeight = window.innerHeight;

            // Define the scroll zone in terms of viewport height (vh)
            const REVEAL_START_VH = 0.75; // Start when element top is 75% down the screen
            const REVEAL_END_VH = 0.25;   // Finish when element top is 25% down the screen

            // As we scroll down, `elementTop` decreases. We want to map this decreasing value
            // to an increasing progress from 0 to 1. The animation starts when the element's top
            // is at `REVEAL_START_VH` and ends when it reaches `REVEAL_END_VH`.
            let scrollProgress = mapRange(elementTop, viewportHeight * REVEAL_END_VH, viewportHeight * REVEAL_START_VH, 1, 0);

            // Clamp progress between 0 and 1
            scrollProgress = Math.max(0, Math.min(1, scrollProgress));

            // console.log('Scroll Progress:', scrollProgress);

            const charsToHighlight = Math.floor(totalChars * scrollProgress);

            charSpans.forEach((span, index) => {
                span.classList.toggle('active', index < charsToHighlight);
            });
        };

        // Run on load and on scroll
        window.addEventListener('scroll', updateTextHighlight);
        updateTextHighlight(); // Initial call
    };

    /* Sticky Intro Animation
     * ------------------------------------------------------ */
    const ssStickyIntro = function () {
        const intro = document.querySelector('.s-intro');
        const about = document.querySelector('.s-about');
        const introContent = document.querySelector('.s-intro__content');

        if (!intro || !about || !introContent) return;

        function updateIntro() {
            const aboutRect = about.getBoundingClientRect();
            const introHeight = intro.offsetHeight;
            const windowHeight = window.innerHeight;

            // Check if about section is entering the viewport
            // We want the effect to start when About is approaching the intro
            // Since Intro is sticky, it stays at top. About scrolls UP over it.
            // visual overlapping starts when aboutRect.top < windowHeight

            // However, since Intro is sticky height: 100vh (effectively), 
            // the overlap happens when aboutRect.top comes into view from bottom.
            // But usually sticky works by parent scroll.

            // Let's assume standard flow: Intro is 100vh. About is below.
            // When we scroll, Intro sticks. About scrolls up covering it.
            // Overlap progress: when aboutRect.top is between windowHeight and 0.

            if (aboutRect.top <= windowHeight && aboutRect.top >= 0) {
                // Progress: 0 (about at bottom) -> 1 (about at top)
                const progress = 1 - (aboutRect.top / windowHeight);

                // Fade out and scale down
                const opacity = 1 - progress; // opacity goes 1 -> 0
                const scale = 1 - (progress * 0.15); // scale goes 1 -> 0.85
                const yPos = progress * 100; // Move down slightly

                introContent.style.opacity = Math.max(0, opacity);
                introContent.style.transform = `scale(${scale}) translateY(${yPos}px)`;
            } else if (aboutRect.top > windowHeight) {
                // Reset if above
                introContent.style.opacity = 1;
                introContent.style.transform = 'scale(1) translateY(0)';
            }
        }

        window.addEventListener('scroll', () => {
            requestAnimationFrame(updateIntro);
        });

        // Initial call
        updateIntro();
    };


    /* Lenis Smooth Scroll
     * ------------------------------------------------------ */
    const ssLenisScroll = function () {

        // Only disable on actual mobile/tablet devices, not desktop with touch
        // Check for mobile user agents and small screens
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isSmallScreen = window.innerWidth <= 1024;
        const isMobileDevice = isMobile || (isSmallScreen && 'ontouchstart' in window);

        if (isMobileDevice) {
            return; // Use native scrolling on mobile
        }

        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        // Animation frame loop
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Expose lenis instance globally for other functions
        window.lenis = lenis;

        // Update scroll-based animations on Lenis scroll
        lenis.on('scroll', () => {
            // Trigger custom scroll event for other listeners
            window.dispatchEvent(new Event('scroll'));
        });

    }; // end ssLenisScroll


    /* Initialize
     * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssMobileMenu();
        ssSwiper();
        ssMailChimpForm();
        ssAlertBoxes();
        ssAnimateOnScroll();
        ssGradientText();
        ssMoveTo();
        ssStickyIntro();
        ssLenisScroll();

    })();

})(document.documentElement);