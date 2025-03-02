import { NewsData } from "./data/NewsData";

export class NewsReader
{
    public static async getAllNews(pathOffset: boolean = false)
    {
        const base = pathOffset ? "../" : "./"
        const dest = new Array<NewsData>();
        const response = await fetch(base + "news_articles/news_list.json");
        const data = await response.json();

        for (const element of data) {
            const articleResponse = await fetch(base + "news_articles/articles/" + element + ".json");
            const articleData = await articleResponse.json();
            dest.push(NewsData.fromJson(element, articleData));
        }

        return dest;
    }

    public static async getNews(id: string)
    {
        const articleResponse = await fetch("../../news_articles/articles/" + id + ".json");
        if (articleResponse.ok)
        {
            const articleData = await articleResponse.json();
            return NewsData.fromJson(id, articleData);
        } 
        else return null;
    }
}
