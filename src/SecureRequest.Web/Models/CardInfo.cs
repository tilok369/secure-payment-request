using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SecureRequest.Web.Models
{
    public class CardInfo
    {
        public string Name { get; set; }
        public string Number { get; set; }
        public string ExpiryDate { get; set; }
        public string Cvv { get; set; }
    }
}