using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mail;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace APIService.Infrastructure
{
    public class EmailNotification
    {
        public void Send(string to, string subject, string body, string senderPassword)
        {
            var from = ConfigurationManager.AppSettings["email.from"];
            var passoword = ConfigurationManager.AppSettings["email.password"];
            var host = ConfigurationManager.AppSettings["email.host"];
            var port = ConfigurationManager.AppSettings["email.port"];
            using (MailMessage mm = new MailMessage(from, to))
            {
                mm.Subject = subject;
                mm.Body = body;
                mm.IsBodyHtml = true;
                SmtpClient smtp = new SmtpClient();
                smtp.Host = host;
                smtp.EnableSsl = true;
                NetworkCredential NetworkCred = new NetworkCredential(from, passoword);
                smtp.UseDefaultCredentials = true;
                smtp.Credentials = NetworkCred;
                smtp.Port = Convert.ToInt32(port);
                smtp.SendAsync(mm, "");
            }
        }
    }

    public class EmailService : IIdentityMessageService
    {
        public Task SendAsync(IdentityMessage message)
        {
            var from = ConfigurationManager.AppSettings["email.from"];
            var passoword = ConfigurationManager.AppSettings["email.password"];
            var host = ConfigurationManager.AppSettings["email.host"];
            var port = ConfigurationManager.AppSettings["email.port"];

            AlternateView htmlView = AlternateView.CreateAlternateViewFromString(message.Body, new ContentType("text/html"));

            using (MailMessage mm = new MailMessage(
                new MailAddress(from, "Egile Network"),
                new MailAddress(message.Destination) ))
            {
                mm.Subject = message.Subject;
                mm.AlternateViews.Add(htmlView);
                mm.IsBodyHtml = true;
                SmtpClient smtp = new SmtpClient();
                smtp.Host = host;
                smtp.EnableSsl = true;
                NetworkCredential NetworkCred = new NetworkCredential(from, passoword);
                smtp.UseDefaultCredentials = true;
                smtp.Credentials = NetworkCred;
                smtp.Port = Convert.ToInt32(port);
                smtp.Send(mm);
                return Task.FromResult(1);
            }

        }
    }
}