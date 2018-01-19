namespace APIService.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class IPAddress : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.FeedBacks", "IPAddress", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.FeedBacks", "IPAddress");
        }
    }
}
