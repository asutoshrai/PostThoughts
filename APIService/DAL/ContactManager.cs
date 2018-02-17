using APIService.Domain;
using APIService.Infrastructure;
using APIService.Models;
using APIService.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace APIService.DAL
{
    public class ContactManager : IDisposable
    {
        ApplicationDbContext _context;

        public ContactManager()
        {
            _context = new ApplicationDbContext();
        }


        public void AddContact(Contact contact)
        {
            using (_context)
            {
                _context.Contacts.Add(contact);
                _context.SaveChanges();
            }

            EmailNotification email = new EmailNotification();
            email.Send("admin@kindacts.in", "KindActs: Query", contact.data);
        }


        public void Dispose()
        {
            if (_context != null)
            {
                _context.Dispose();
            }
        }

    }
}