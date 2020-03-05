using Rotativa;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ERP.Inventory.Controllers
{
    public class ItemMasterlistController : Controller
    {
        // GET: ItemMasterlist
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Create()
        {
            return View("~/Views/ItemMasterlist/_Create.cshtml");
        }

    }
}