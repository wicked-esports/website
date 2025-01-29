export class NewsData
{
    public id: string;
    public title: string;
    public image: string;
    public content: string;
    public date: Date;

    private constructor(id: string, title: string, image: string, content: string, date: Date)
    {
        this.id = id;
        this.title = title;
        this.image = image;
        this.content = content;
        this.date = date;
    }

    public static fromJson(json: any): NewsData
    {
        return new NewsData(json.id, json.title, json.image, json.content, new Date(json.date));
    }
}