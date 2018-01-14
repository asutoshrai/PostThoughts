using APIService.Domain;
using APIService.Models;
using APIService.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace APIService.DAL
{
    public class FeedBackManager : IDisposable
    {
        ApplicationDbContext _context;

        public FeedBackManager()
        {
            _context = new ApplicationDbContext();
        }

        public StoryModel GetFeedBacks(int currentPage,int pageSize)
        {

            using (_context)
            {
                var model= new StoryModel
                {
                    stories = _context.FeedBacks.OrderByDescending(x => x.CreatedOn)
                    .Skip(pageSize * (currentPage - 1))
                    .Take(pageSize).ToList(),
                    totalCount = _context.FeedBacks.Count()
                };

                return model;
        } }
       


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