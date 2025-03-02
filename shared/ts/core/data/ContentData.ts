export class ContentData
{
    public type: "md" | "img";
    public content: any;

    private constructor(type: "md" | "img", content: any)
    {
        this.type = type;
        this.content = content;
    }

    public static fromJson(json: any)
    {
        return new ContentData(json.type, json.content);
    }
}