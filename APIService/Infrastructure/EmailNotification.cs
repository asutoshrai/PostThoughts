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
        public void Send(string to, string subject, string body)
        {
            var from = ConfigurationManager.AppSettings["email.from"];
            var passoword = ConfigurationManager.AppSettings["email.password"];
            var host = ConfigurationManager.AppSettings["email.host"];
            var port = ConfigurationManager.AppSettings["email.port"];
            var isSecure = ConfigurationManager.AppSettings["email.isSecure"];

            using (MailMessage mm = new MailMessage(from, to))
            {
                mm.Subject = subject;
                mm.Body = body;
                mm.IsBodyHtml = true;
                SmtpClient smtp = new SmtpClient();
                smtp.Host = host;
                smtp.EnableSsl = Convert.ToBoolean(isSecure);
                NetworkCredential NetworkCred = new NetworkCredential(from, passoword);
                smtp.UseDefaultCredentials = true;
                smtp.Credentials = NetworkCred;
                smtp.Port = Convert.ToInt32(port);
                smtp.Send(mm);
            }
        }
    }

    public class EmailService : IIdentityMessageService
    {
        public Task SendAsync(IdentityMessage message)
        {
            var from = ConfigurationManager.AppSettings["email.from"];
            var password = ConfigurationManager.AppSettings["email.password"];
            var host = ConfigurationManager.AppSettings["email.host"];
            var port = ConfigurationManager.AppSettings["email.port"];
            var isSecure = ConfigurationManager.AppSettings["email.isSecure"];

            //create the mail message 
            MailMessage mail = new MailMessage();

            //set the addresses 
            mail.From = new MailAddress(from); //IMPORTANT: This must be same as your smtp authentication address.
            mail.To.Add(message.Destination);

            //set the content 
            mail.Subject = message.Subject;
            mail.Body = message.Body;
            mail.IsBodyHtml = true;
            //send the message 
            SmtpClient smtp = new SmtpClient(host);

            //IMPORANT:  Your smtp login email MUST be same as your FROM address. 
            NetworkCredential Credentials = new NetworkCredential(from, password);
            smtp.Credentials = Credentials;
            smtp.EnableSsl =Convert.ToBoolean(isSecure);
            smtp.Port = Convert.ToInt32(port);
            smtp.Timeout = 360000;
            smtp.Send(mail);
            return Task.FromResult(1);
        }
    }
}