using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ERP.Inventory.Controllers
{
    public class InvController : Controller
    {
        // GET: Inv
        public ActionResult Index()
        {
            return View();
        }
    }
}