import anime from "animejs";
import { PageType } from "./core/PageType"
import { NewsReader } from "./core/NewsReader";
import * as news from "./news";

var isMenuExpanded = false;

let pageType = PageType.Home;

const onSmallMediaQuery = window.matchMedia("(max-width: 795px)");
const onMediumMediaQuery = window.matchMedia("(min-width: 796px) and (max-width: 959px)");
const onLargeMediaQuery = window.matchMedia("(min-width: 960px)");

const headerLogoLink = document.getElementsByClassName("header-logo-link")[0];
const headerNavItemLinks = document.getElementsByClassName("header-nav-item-link");
const hamburgerButton = document.getElementsByClassName("header-hamburger")[0];
const hamburgerMenu = document.getElementsByClassName("hamburger-menu-container")[0];
const hamburgerButtonBars = document.getElementsByClassName("header-hamburger-line");
const headerNavigationSpans = document.getElementsByClassName("header-nav-item-span");
const mainContainer = document.getElementsByClassName("main-container")[0];
const headerNavButtons = document.getElementsByClassName("header-nav-item-link");
const newsItemsContainer = document.getElementsByClassName("news-items")[0];
const aboutContainer = document.getElementsByClassName("about-container")[0];

document.addEventListener("DOMContentLoaded", onLoaded);
hamburgerButton.addEventListener("click", onHamburgerButtonClick);

function onLoaded()
{
    animateOnLoaded();

    onSmallMediaQuery.addEventListener("change", () => onSmallWidthChanged());
    onMediumMediaQuery.addEventListener("change", () => onMediumWidthChanged());
    onLargeMediaQuery.addEventListener("change", () => onLargeWidthChanged());

    let n = 0;
    if (onSmallMediaQuery.matches) n = 2;
    if (onMediumMediaQuery.matches) n = 4;
    if (onLargeMediaQuery.matches) n = 6; 

    if (window.location.pathname.includes("news"))
    {
        pageType = PageType.News;
        news.onNewsLoad(n);
    }
    else
    if (window.location.pathname.includes("member"))
    {
        pageType = PageType.Member;

    }
    else
    if (window.location.pathname.includes("sponsor"))
    {
        pageType = PageType.Sponsor;
    }
    else
    {
        pageType = PageType.Home;
        onHomeLoaded(n);
    }

    for (let i = 0; i < headerNavButtons.length; i++)
    {
        headerNavButtons[i].addEventListener("click", () => onHeaderNavigationButtonClick(headerNavButtons[i]));
    }
}

function onHomeLoaded(n: number)
{
    loadNews(n);
}

function loadNews(num: number)
{
    if (pageType != PageType.Home) return;

    while (newsItemsContainer.firstChild) 
    {
        newsItemsContainer.removeChild(newsItemsContainer.firstChild);
    }

    NewsReader.getAllNews()
        .then(data => data.sort((a, b) => (a.date < b.date) ? 1 : -1))
        .then(data => 
        {
            for (let i = 0; i < data.length; i++)
            {       
                if (i < num)
                {
                    const news = data[i];
        
                    const newsItem = document.createElement("div");
                    newsItem.classList.add("news-item");
        
                    const newsItemTitle = document.createElement("span");
                    newsItemTitle.classList.add("news-item-title");
                    newsItemTitle.textContent = news.title;
        
                    const newsItemDate = document.createElement("span");
                    newsItemDate.classList.add("news-item-date");
                    newsItemDate.textContent = news.date.toLocaleDateString();
        
                    const newsItemImage = document.createElement("img");
                    newsItemImage.classList.add("news-item-image");
                    newsItemImage.src = "./news_articles/img/" + news.image;
        
                    newsItem.appendChild(newsItemImage);
                    newsItem.appendChild(newsItemDate);
                    newsItem.appendChild(newsItemTitle);
        
                    newsItemsContainer.appendChild(newsItem);
                }
            }
        }) 
    
}

function querySearchSection()
{
    const url = new URL(window.location.href);
    const nav = url.searchParams.get("nav");
    if (nav == "about")
    {
        aboutContainer.scrollIntoView({ behavior: "smooth" });
    }
}

function onHeaderNavigationButtonClick(element: Element)
{
    if (pageType != PageType.Home) return;
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

function onSmallWidthChanged()
{
    if (onSmallMediaQuery.matches)
    {
        loadNews(2);
    }
}

function onMediumWidthChanged()
{
    if (onMediumMediaQuery.matches)
    {
        isMenuExpanded = false;
        animateOnHamburgerButtonClick();
        loadNews(4);
    }
}

function onLargeWidthChanged()
{
    if (onLargeMediaQuery.matches)
    {
        isMenuExpanded = false;
        animateOnHamburgerButtonClick();
        loadNews(6);
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
        },
        complete: () => querySearchSection()
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