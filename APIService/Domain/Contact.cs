using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace APIService.Domain
{
    public class Contact
    {
        public int id { get; set; }
        public string data { get; set; }
        public string createdBy { get; set; }
        public DateTime createdOn { get; set; }
    }
}