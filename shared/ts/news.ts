import { NewsData } from "./core/data/NewsData";
import { NewsReader } from "./core/NewsReader";

const newsItemsContainer = document.getElementsByClassName("news-items")[0];

function onNewsLoad()
{
    while (newsItemsContainer.firstChild) 
    {
        newsItemsContainer.removeChild(newsItemsContainer.firstChild);
    }

    NewsReader.getAllNews(true)
        .then(data => data.sort((a, b) => (a.date < b.date) ? 1 : -1))
        .then(data => 
        {
            for (let i = 0; i < data.length; i++)
            {       
                const news = data[i];
        
                const newsItem = document.createElement("a");
                newsItem.classList.add("news-item");
                newsItem.href = `./article/?id=${news.id}`

                const newsItemTitle = document.createElement("span");
                newsItemTitle.classList.add("news-item-title");
                newsItemTitle.textContent = news.title;

                const newsItemDate = document.createElement("span");
                newsItemDate.classList.add("news-item-date");
                newsItemDate.textContent = news.date.toLocaleDateString();

                const newsItemImage = document.createElement("img");
                newsItemImage.classList.add("news-item-image");
                newsItemImage.src = "../news_articles/img/" + news.image;

                newsItem.appendChild(newsItemImage);
                newsItem.appendChild(newsItemDate);
                newsItem.appendChild(newsItemTitle);

                newsItemsContainer.appendChild(newsItem);
            }
        }) 
}

export { onNewsLoad }