using APIService.Domain;
using APIService.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace APIService.DAL
{
    public class FeedBackManager :IDisposable
    {
        ApplicationDbContext _context;

        public FeedBackManager()
        {
            _context = new ApplicationDbContext();
        }
       
        public List<FeedBack> GetFeedBacks()
        {
            using (_context)
            {
                return _context.FeedBacks.OrderByDescending(x=>x.CreatedOn).ToList();
            }
        }

        public IEnumerable<FeedBack> GetFeedBacksByUser(string UserId)
        {
            using (_context)
            {
                return _context.FeedBacks.Where(f=>f.UserId==UserId);
            }
        }

        public void AddFeedBack(FeedBack feedBack)
        {
            using (_context)
            {
                _context.FeedBacks.Add(feedBack);
                _context.SaveChanges();
            }
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