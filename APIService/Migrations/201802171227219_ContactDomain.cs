namespace APIService.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ContactDomain : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Contacts",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        data = c.String(),
                        createdBy = c.String(),
                        createdOn = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Contacts");
        }
    }
}
