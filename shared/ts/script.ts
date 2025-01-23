import anime from "animejs";

var isMenuExpanded = false;

const headerLogoLink = document.getElementsByClassName("header-logo-link")[0];
const headerNavItemLinks = document.getElementsByClassName("header-nav-item-link");
const hamburgerButton = document.getElementsByClassName("header-hamburger")[0];
const hamburgerMenu = document.getElementsByClassName("hamburger-menu-container")[0];
const hamburgerButtonBars = document.getElementsByClassName("header-hamburger-line");
const headerNavigationSpans = document.getElementsByClassName("header-nav-item-span");
const mainContainer = document.getElementsByClassName("main-container")[0];
const headerNavButtons = document.getElementsByClassName("header-nav-item-link");
const aboutContainer = document.getElementsByClassName("about-container")[0];

document.addEventListener("DOMContentLoaded", onLoaded);
hamburgerButton.addEventListener("click", onHamburgerButtonClick);

function onLoaded()
{
    animateOnLoaded();

    for (let i = 0; i < headerNavButtons.length; i++)
    {
        headerNavButtons[i].addEventListener("click", () => onHeaderNavigationButtonClick(headerNavButtons[i]));
    }

    const onSmallMediaQuery = window.matchMedia("(max-width: 795px)");
    const onMediumMediaQuery = window.matchMedia("(min-width: 796px) and (max-width: 959px)");
    const onLargeMediaQuery = window.matchMedia("(min-width: 960px)");

    onSmallMediaQuery.addEventListener("change", () => onWidthChanged(0));
    onMediumMediaQuery.addEventListener("change", () => onWidthChanged(796));
    onLargeMediaQuery.addEventListener("change", () => onWidthChanged(960));
}

function onHeaderNavigationButtonClick(element: Element)
{
    const dest = element.children[0].textContent?.toLowerCase();
    if (dest === "about")
    {
        aboutContainer.scrollIntoView({ behavior: "smooth" });
    }
}

function onHamburgerButtonClick() 
{
    isMenuExpanded = !isMenuExpanded;
    animateOnHamburgerButtonClick();
}

function onWidthChanged(width: number)
{
    if (width != 0)
    {
        isMenuExpanded = false;
        animateOnHamburgerButtonClick();
    }
}

function animateOnLoaded()
{
    for (let i = headerNavItemLinks.length - 1; i >= 0; i--)
    {
        anime({
            targets: headerNavItemLinks[i],
            translateY: [-200, 0],
            duration: 750,
            delay: 100 * (headerNavItemLinks.length - i),
            easing: "easeOutQuint"
        });
        anime({
            targets: headerNavItemLinks[i],
            opacity: [0, 1],
            duration: 750,
            delay: 150 * (headerNavItemLinks.length - i),
            easing: "easeOutQuint"
        });
    }

    anime({
        targets: headerLogoLink,
        translateY: [-200, 0],
        duration: 750,
        delay: 300,
        easing: "easeOutQuint"
    });
    anime({
        targets: headerLogoLink,
        opacity: [0, 1],
        duration: 750,
        delay: 500,
        easing: "easeOutQuint"
    });

    anime({
        targets: mainContainer,
        translateY: [100, 0],
        duration: 500,
        delay: 500,
        easing: "easeOutQuint"
    });

    anime({
        targets: mainContainer,
        opacity: [0, 1],
        duration: 750,
        delay: 500,
        easing: "easeOutQuint"
    });

    anime({
        targets: hamburgerButton,
        translateY: [-100, 0],
        duration: 750,
        delay: 300,
        easing: "easeOutQuint"
    });

    const animValue = { value: 0 };
    anime({
        targets: animValue,
        value: [100, 0],
        duration: 875,
        update: () => {
            window.scrollTo(0, animValue.value);
        }
    });
}

function animateOnHamburgerButtonClick()
{
    if (isMenuExpanded)
    {
        anime({
            targets: hamburgerMenu,
            translateX: "0%",
            duration: 250,
            easing: "easeInQuint"
        })
        anime({
            targets: hamburgerButtonBars[0],
            marginTop: 0,
            marginBottom: -1,
            rotate: 45,
            duration: 250,
            easing: "easeInQuint"
        });
        anime({
            targets: hamburgerButtonBars[1],
            marginTop: -1,
            marginBottom: 0,
            rotate: -45,
            duration: 250,
            easing: "easeInQuint"
        });
    }
    else
    {
        anime({
            targets: hamburgerMenu,
            translateX: "-100%",
            duration: 250,
            easing: "easeInQuint"
        })
        anime({
            targets: hamburgerButtonBars[0],
            marginTop: 7.5,
            marginBottom: 7.5,
            rotate: 0,
            duration: 250,
            easing: "easeInQuint"
        });
        anime({
            targets: hamburgerButtonBars[1],
            marginTop: 7.5,
            marginBottom: 7.5,
            rotate: 0,
            duration: 250,
            easing: "easeInQuint"
        });
    }
}