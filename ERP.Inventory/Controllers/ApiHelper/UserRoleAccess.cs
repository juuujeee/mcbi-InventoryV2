using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace ERP.Inventory.Controllers.ApiHelper
{
    public class UserRoleAccess : Helper.SynchronousRequest
    {
        public UserRoleAccess(string UserID, string Token) : base("http://192.168.1.100:98/api/user/userroleaccess")
        {
            httpClient.DefaultRequestHeaders.Add("UserID", "38");
            httpClient.DefaultRequestHeaders.Add("Token", "y65yK6eDALIfurzczhjZ7bK7D");
            string retval = HttpRequest("", "GET");
            JObject jo = JsonConvert.DeserializeObject<JObject>(retval);
            JArray jAr = jo["customSettings"] as JArray;
            JArrayToggler = new Helper.JsonArrayToggler(jAr, "", "style=\"display:none\"", "disabled=\"disabled\"");
        }
        private Helper.JsonArrayToggler JArrayToggler { get; set; }
        public bool isAllowed(string elementName)
        {
          return  JArrayToggler[$"defaultElement={elementName}"].GetValue<bool>("isAllowed");
        }
        public string this[string elementName]
        {
            get
            {
                return JArrayToggler[$"defaultElement={elementName}, isAllowed=false"]["isHideifDisabled"];
            }
        }

    }
}