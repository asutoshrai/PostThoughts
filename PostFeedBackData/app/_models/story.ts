export class Story{
    public data:string;
    public userId:string;
    public ipAddress:string;
    public createdOn:Date;
}


export class StoryModel{
    public stories:Story[];
    public totalCount:number;
}