using Rotativa;
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

        public ActionResult TransferStock()
        {
            return View("~/Views/Stocks/_TransferStock.cshtml");
        }


        public ActionResult ReleaseStock()
        {
            return View("~/Views/Stocks/_ReleaseStock.cshtml");
        }


        public ActionResult PrintStock(string pageName, int id)
        {
            return View($"~/Views/Stocks/Print/_{pageName}.cshtml");
        }

        public ActionResult Print(string pageName, int id)
        {
            var data = new ActionAsPdf("PrintStock", new { pageName = pageName, id = id })
            {
                PageSize = Rotativa.Options.Size.A4,
                PageMargins = { Left = 10, Bottom = 10, Right = 10, Top = 10 },
            };

            return data;
        }

        public ActionResult StockInquiry()
        {
            return View("~/Views/Stocks/_StockInquiry.cshtml");
        }

        //public ActionResult WithdrawnStock()
        //{
        //    return View("~/Views/Stocks/_ReleaseStock.cshtml");
        //}

        //public ActionResult IssuedStock()
        //{
        //    return View("~/Views/Stocks/_IssuedStock.cshtml");
        //}
    }
}