using APIService.DAL;
using APIService.Domain;
using System.Web.Http;
using System;

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
          return Ok(_mgr.GetFeedBacks());
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
