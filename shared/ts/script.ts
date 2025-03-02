import { PageType } from "./core/PageType"
import * as common from "./common"
import * as home from "./home";  
import * as news from "./news";
import * as article from "./article"
import * as contact from "./contact"

let pageType = PageType.Home;

document.addEventListener("DOMContentLoaded", onLoaded);


function onLoaded()
{
    common.onLoaded();
    pageType = getPageType();

    if (pageType == PageType.Home) home.onHomeLoaded();
    else
    if (pageType == PageType.News) news.onNewsLoad();
    else
    if (pageType == PageType.Article) article.onArticleLoad(); 
    else
    if (pageType == PageType.Contact) contact.onContactLoad();
}

function getPageType(): PageType
{
    if (window.location.pathname.includes("/news/"))
        if (window.location.pathname.includes("/article/"))
            return PageType.Article;
        else
            return PageType.News;
    else
    if (window.location.pathname.includes("/member/"))
        return PageType.Member;
    else
    if (window.location.pathname.includes("/sponsor/"))
        return PageType.Sponsor;
    else
    if (window.location.pathname.includes("/contact/"))
        return PageType.Contact;
    else
    if (window.location.pathname.includes("/about/"))
        return PageType.About;
    else
    if (window.location.pathname.includes("/home/") || window.location.pathname == "/" || window.location.pathname.includes("/index.html"))
        return PageType.Home;
    else
        return PageType.Home;
}

