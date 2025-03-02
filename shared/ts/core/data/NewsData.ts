import { ContentData } from "./ContentData"
export class NewsData
{
    public id: string;
    public title: string;
    public image: string;
    public content: ContentData[];
    public date: Date;

    private constructor(id: string, title: string, image: string, content: ContentData[], date: Date)
    {
        this.id = id;
        this.title = title;
        this.image = image;
        this.content = content;
        this.date = date;
    }

    public static fromJson(id: string, json: any): NewsData
    {
        let cd: Array<ContentData> = new Array(json.content.length);

        for (const data in json.content)
        {
            cd.push(ContentData.fromJson(data))
        }

        return new NewsData(id, json.title, json.image, json.content, new Date(json.date));
    }
}