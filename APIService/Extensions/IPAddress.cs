using Microsoft.Owin;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace APIService.Extensions
{
    public static class IPAddress
    {
        public static string GetIPAddress(this ApiController controller)
        {
            HttpRequestMessage  request = controller.Request;

            if (request.Properties.ContainsKey("MS_OwinContext"))
            {
                return ((OwinContext)request.Properties["MS_OwinContext"]).Request.RemoteIpAddress;
            }
            else if (HttpContext.Current != null)
            {
                return HttpContext.Current.Request.UserHostAddress;
            }
            else
            {
                return null;
            }
        }
    }
}