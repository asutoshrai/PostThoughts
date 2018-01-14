using APIService.DAL;
using APIService.Domain;
using System.Web.Http;
using System;
using APIService.Models;

namespace APIService.Controllers
{
    [Authorize]
    public class FeedbackController : ApiController
    {
        FeedBackManager _mgr;
        public FeedbackController()
        {
            _mgr = new FeedBackManager();
        }

        [HttpGet]
        public IHttpActionResult Get()
        {
            var pairs = this.Request.GetQueryStrings();
            int currentPage = Convert.ToInt32(pairs["currentPage"]);
            int pageSize = Convert.ToInt32(pairs["maxItems"]);
            return Ok(_mgr.GetFeedBacks(currentPage, pageSize));
        }

        [HttpPost]
        public IHttpActionResult Post(FeedBack feedBack)
        {
            feedBack.CreatedOn = DateTime.Now;
            _mgr.AddFeedBack(feedBack);
            return Ok();
        }

       
    }
}
