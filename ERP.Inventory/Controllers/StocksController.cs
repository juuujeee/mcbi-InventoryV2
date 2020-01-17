using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ERP.Inventory.Controllers
{
    public class StocksController : Controller
    {
        // GET: Stocks
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult StockEntry()
        {
            return View("~/Views/Stocks/_StocksEntry.cshtml");
        }

        public ActionResult StockOut()
        {
            return View("~/Views/Stocks/_StocksOut.cshtml");
        }
    }
}