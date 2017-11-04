using APIService.DAL;
using APIService.Domain;
using System.Web.Http;

namespace APIService.Controllers
{
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
            _mgr.AddFeedBack(feedBack);
            return Ok();
        }

       
    }
}
