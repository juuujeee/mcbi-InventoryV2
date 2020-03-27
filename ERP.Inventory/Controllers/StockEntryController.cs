using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Helper;
using ERP.Inventory.Models;
using System.Net.Http;
using System.Net.Http.Headers;

namespace ERP.Inventory.Controllers
{
    public class StockEntryController : Controller
    {

        ApiHelper.UserRoleAccess userRole;

        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            string userID = "0";
            if (requestContext.HttpContext.Request.Cookies.AllKeys.Contains("UserID"))
            {
                userID = requestContext.HttpContext.Request.Cookies.Get("UserID").Value ?? "0";
            }
            string toKen = "0";
            if (requestContext.HttpContext.Request.Cookies.AllKeys.Contains("UserID"))
                toKen = requestContext.HttpContext.Request.Cookies.Get("Token").Value ?? "0";

            userRole = new ApiHelper.UserRoleAccess(userID, toKen);

            base.Initialize(requestContext);

            if (userID == "0" || toKen == "0")
            {
                RedirectToAction("Login", "Account").ExecuteResult(this.ControllerContext);
            }
        }


        // GET: StockEntry
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetSupplier()
        {
            List<VendorInfo> ven = null;
            using (var client = new HttpClient())
            {
                client.BaseAddress =  new Uri("http://192.168.1.100:99/api/vendor/supplierlist");
               
                ven = client.GetAsync("").Result.Content.ReadAsAsync<IList<VendorInfo>>().Result.ToList();

            }


            return Json(ven, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetEmployee()
        {
            List<EmployeeList> emp = null;
            using(var client = new HttpClient())
            {

            }

            return Json(emp, JsonRequestBehavior.AllowGet);
        }
    }
}