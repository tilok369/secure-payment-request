using SecureRequest.Web.Helper;
using SecureRequest.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using static System.Configuration.ConfigurationManager;

namespace SecureRequest.Web.Controllers
{
    [RoutePrefix("payment")]
    public class PaymentController : ApiController
    {
        private readonly Encryption _encryption;
        public PaymentController()
        {
            _encryption = new Encryption(AppSettings["Key"], AppSettings["IV"]);
        }
        [HttpPost]
        [Route("initiate")]
        public bool Submit(CardInfo cardInfo)
        {
            try
            {
                var key = _encryption.DecodeFromBase64String(cardInfo.Key);
                var encryption = new Encryption(key, AppSettings["IV"]);
                var ci = new CardInfo
                {
                    Name = encryption.DecodeFromBase64String(cardInfo.Name),
                    Number = encryption.DecodeFromBase64String(cardInfo.Number),
                    ExpiryDate = encryption.DecodeFromBase64String(cardInfo.ExpiryDate),
                    Cvv = encryption.DecodeFromBase64String(cardInfo.Cvv)
                };

                return true;
            }
            catch (Exception exception)
            {
                return false;
            }
        }
    }
}
