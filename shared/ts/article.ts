import anime from "animejs";
import marked from "marked";
import { NewsData } from "./core/data/NewsData";
import { NewsReader } from "./core/NewsReader";


const notFoundContainer = document.getElementsByClassName("article-notfound-container")[0] as HTMLElement;
const articleContainer = document.getElementsByClassName("article-container")[0] as HTMLElement;
const articleImg = document.getElementsByClassName("article-img")[0] as HTMLImageElement;
const articleTitle = document.getElementsByClassName("article-title")[0] as HTMLSpanElement;

let isScrolled = false;

function onArticleLoad()
{
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    if (!id) setError();
    else
    {
        NewsReader.getNews(id).then(data => setArticle(data));
    }
    
}

function setArticle(data: NewsData | null)
{
    if (!data) 
    {
        setError();
        return;
    }
    else
    {
        notFoundContainer.style.display = "none";
        articleTitle.textContent = data.title;
        articleImg.src = "/news_articles/img/" + data.image
        for (let i = 0; i < data.content.length; i++)
        {
            const content = data.content[i];
            if (content.type === "md")
            {
                const mdLines = content.content as string[];
                const markdown = document.createElement("div");
                markdown.classList.add("article-content-markdown")
                let dest = "";
                for (const mdline of mdLines) 
                {
                    dest += mdline + "<br/>\n"
                }
                markdown.innerHTML = marked.parse(dest) as string;
                articleContainer.appendChild(markdown);
            }
            else
            if (content.type === "img")
            {
                const imgPath = content.content as string;
                const img = document.createElement("img");
                img.classList.add("article-content-img");
                img.src = "/news_articles/img/" + imgPath;
                articleContainer.appendChild(img);
            }
        }
    }
}

function setError()
{
    notFoundContainer.style.display = "flex";
    articleContainer.style.display = "none";
}

export { onArticleLoad };