using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ERP.Inventory.Controllers
{
    public class FormController : Controller
    {
        // GET: Form
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult FormView(string pageName, string itemType)
        {
            ViewBag.ItemType = itemType;

            return PartialView($"~/Views/Form/_{pageName}.cshtml");
        }
    }
}