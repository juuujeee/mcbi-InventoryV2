using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ERP.Inventory.Controllers
{
    public class InventoryController : Controller
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

        // GET: Inventory
        public ActionResult Index()
        {
            return View();
        }

    }
}