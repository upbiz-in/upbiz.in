const fs = require('fs');
const file = 'css/styles.css';
let content = fs.readFileSync(file, 'utf8');

const newCSS = `/* ===================================================================
 * # SITE HEADER
 *
 *
 * ------------------------------------------------------------------- */
.s-header {
	z-index: 1000;
	position: fixed;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 100%;
	max-width: 100vw;
	padding: 2.5rem 5%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: rgba(20, 20, 20, 0);
	border-radius: 0px;
	transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}

/* --------------------------------------------------------------------
 * ## logo
 * -------------------------------------------------------------------- */
.s-header__logo {
	z-index: 3;
	line-height: 1;
    display: flex;
    align-items: center;
}

.s-header__logo a.logo {
	display: block;
	margin: 0;
	padding: 0;
	outline: 0;
	border: none;
}

.s-header__logo img {
	width: 135px;
	margin: 0;
	vertical-align: bottom;
    transition: width 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

/* --------------------------------------------------------------------
 * ## main navigation
 * -------------------------------------------------------------------- */
.s-header__nav {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 2.5rem;
    align-items: center;
}

.s-header__menu-links {
	list-style: none;
	display: flex;
	gap: 2.5rem;
	margin: 0;
	padding: 0;
}

.s-header__menu-links li {
	padding-left: 0;
    margin: 0;
}

.s-header__menu-links a {
	display: block;
	font-family: var(--font-1); /* Use base sans-serif */
	font-weight: 600;
	font-size: 1.6rem;
	line-height: var(--vspace-1);
	color: #FFFFFF;
	position: relative;
	text-decoration: none;
    transition: color 0.3s ease, font-size 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

/* Underline Hover Animation */
.s-header__menu-links a::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0%;
    height: 2px;
    background-color: #FFFFFF;
    transition: width 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.s-header__menu-links a:hover::after,
.s-header__menu-links .current a::after {
    width: 100%;
}

.s-header__menu-links a:focus,
.s-header__menu-links a:hover {
	color: var(--color-3);
}

/* --------------------------------------------------------------------
 * ## CTA button
 * -------------------------------------------------------------------- */
.s-header__contact {
    display: flex;
    align-items: center;
}

/* From Uiverse.io by Creatlydev - Adapted */ 
.button {
  line-height: 1;
  text-decoration: none;
  display: inline-flex;
  border: none;
  cursor: pointer;
  align-items: center;
  gap: 0.75rem;
  background-color: var(--clr);
  color: #fff;
  border-radius: 10rem;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  padding-left: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background-color 0.3s;
  font-family: var(--font-1), sans-serif;
  font-size: 1.5rem;
}

.button__icon-wrapper {
  flex-shrink: 0;
  width: 25px;
  height: 25px;
  position: relative;
  color: var(--clr);
  background-color: #fff;
  border-radius: 50%;
  display: grid;
  place-items: center;
  overflow: hidden;
}

.button:hover {
  background-color: #000;
  color: #fff;
}

.button:hover .button__icon-wrapper {
  color: #000;
}

.button__icon-svg--copy {
  position: absolute;
  transform: translate(-150%, 150%);
}

.button:hover .button__icon-svg:first-child {
  transition: transform 0.3s ease-in-out;
  transform: translate(150%, -150%);
}

.button:hover .button__icon-svg--copy {
  transition: transform 0.3s ease-in-out 0.1s;
  transform: translate(0);
}

/* --------------------------------------------------------------------
 * ## Scrolled / Sticky State
 * -------------------------------------------------------------------- */
.s-header.scrolled {
    top: 20px;
    width: 90%;
    max-width: 1100px;
    padding: 1rem 2rem;
    background: rgba(33, 35, 38, 0.8);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

/* Shrink items slightly when sticky */
.s-header.scrolled .s-header__logo img {
    width: 110px;
}
.s-header.scrolled .s-header__menu-links a {
    font-size: 1.5rem;
}

/* --------------------------------------------------------------------
 * ## mobile menu toggle
 * -------------------------------------------------------------------- */
.s-header__menu-toggle {
	--toggle-block-width: 44px;
	--toggle-line-width: 28px;
	--toggle-line-height: 2px;
	display: none;
	width: var(--toggle-block-width);
	height: var(--toggle-block-width);
	position: absolute;
	right: calc(var(--gutter) * 2);
    top: 50%;
    transform: translateY(-50%);
}

.s-header__menu-toggle span {
	display: block;
	background-color: var(--color-3);
	width: var(--toggle-line-width);
	height: var(--toggle-line-height);
	margin-top: -1px;
	font: 0/0 a;
	text-shadow: none;
	color: transparent;
	transition: all 0.5s;
	position: absolute;
	right: calc((var(--toggle-block-width) - var(--toggle-line-width)) / 2);
	top: 50%;
}

.s-header__menu-toggle span::before,
.s-header__menu-toggle span::after {
	content: "";
	width: 100%;
	height: 100%;
	background-color: inherit;
	transition: all 0.5s;
	position: absolute;
	left: 0;
}

.s-header__menu-toggle span::before {
	top: -10px;
}

.s-header__menu-toggle span::after {
	bottom: -10px;
}

/* is clicked */
.s-header__menu-toggle.is-clicked span {
	background-color: rgba(255, 255, 255, 0);
	transition: all 0.1s;
}

.s-header__menu-toggle.is-clicked span::before,
.s-header__menu-toggle.is-clicked span::after {
	background-color: var(--color-3);
}

.s-header__menu-toggle.is-clicked span::before {
	top: 0;
	transform: rotate(135deg);
}

.s-header__menu-toggle.is-clicked span::after {
	bottom: 0;
	transform: rotate(225deg);
}

/* ------------------------------------------------------------------- 
 * responsive: site-header
 * ------------------------------------------------------------------- */
@media screen and (max-width: 1024px) {
    .s-header {
        padding: 1.5rem 5%;
    }
    .s-header.scrolled {
        width: 95%;
    }
    .s-header__menu-links, .s-header__nav {
        gap: 1.5rem;
    }
}

@media screen and (max-width: 900px) {
    /* Mobile Menu Logic overrides */
    .s-header__nav {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background-color: var(--color-2-dark);
        flex-direction: column;
        padding: 2rem;
        transform: scaleY(0);
        transform-origin: top;
        transition: transform 0.4s ease;
        border-radius: 0 0 20px 20px;
    }

    .menu-is-open .s-header__nav {
        transform: scaleY(1);
    }

    .s-header__menu-links {
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin-bottom: 2rem;
    }

    .s-header__contact {
        margin: 0 auto;
    }

    .s-header__menu-toggle {
        display: block;
    }

    .s-header.scrolled {
        border-radius: 30px;
    }
    
    .menu-is-open .s-header.scrolled {
        border-radius: 30px 30px 0 0;
    }
}

@media screen and (max-width: 600px) {
	.s-header__logo img {
        width: 100px;
    }
    .s-header__menu-toggle {
        right: 1rem;
    }
}

/* ===================================================================
 * # PAGEHEADER`;

const regex = /\/\* ===================================================================\s*\* # SITE HEADER[\s\S]*?\/\* ===================================================================\s*\* # PAGEHEADER/g;
const newContent = content.replace(regex, newCSS);
fs.writeFileSync(file, newContent);
console.log('Styles overwritten.');
