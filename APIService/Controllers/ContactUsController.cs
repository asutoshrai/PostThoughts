using APIService.DAL;
using APIService.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace APIService.Controllers
{
    public class ContactUsController : ApiController
    {
        ContactManager _mgr;

        public ContactUsController()
        {
            _mgr = new ContactManager();
        }

        [HttpPost]
        public IHttpActionResult Post(Contact contact)
        {
            contact.createdOn = DateTime.Now;
            _mgr.AddContact(contact);
            return Ok();
        }

    }
}
