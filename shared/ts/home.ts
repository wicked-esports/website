import { NewsReader } from "./core/NewsReader";
import { NewsData } from "./core/data/NewsData";

const onSmallMediaQuery = window.matchMedia("(max-width: 795px)");
const onMediumMediaQuery = window.matchMedia("(min-width: 796px) and (max-width: 959px)");
const onLargeMediaQuery = window.matchMedia("(min-width: 960px)");

const newsItemsContainer = document.getElementsByClassName("news-items")[0];

function onHomeLoaded()
{
    onSmallMediaQuery.addEventListener("change", () => onSmallWidthChanged());
    onMediumMediaQuery.addEventListener("change", () => onMediumWidthChanged());
    onLargeMediaQuery.addEventListener("change", () => onLargeWidthChanged());

    let n = 0;
    if (onSmallMediaQuery.matches) n = 2;
    if (onMediumMediaQuery.matches) n = 4;
    if (onLargeMediaQuery.matches) n = 6; 

    loadNews(n);
}

function loadNews(num: number)
{
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
        
                    const newsItem = document.createElement("a");
                    newsItem.classList.add("news-item");
                    newsItem.href = `./news/article/?id=${news.id}`
        
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

                    newsItem.addEventListener("click", () => onNewsItemClick(news));
                }
            }
        }
    ) 
}

function onNewsItemClick(news: NewsData)
{
    window.location.href = "/news/article?id=" + news.id;
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
        loadNews(4);
    }
}

function onLargeWidthChanged()
{
    if (onLargeMediaQuery.matches)
    {
        loadNews(6);
    }
}

export { onHomeLoaded }