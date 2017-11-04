using System;

namespace APIService.Domain
{
    public class FeedBack
    {
        public int Id { get; set; }
        public string Data { get; set; }
        public string UserId { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}