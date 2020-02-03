using Rotativa;
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
            ViewBag.Report = false;

            ViewBag.ItemType = itemType;

            return PartialView($"~/Views/Form/_{pageName}.cshtml");
        }

        public ActionResult FormReport(string pageName, string itemType)
        {
            ViewBag.Report = true;

            ViewBag.ItemType = itemType;

            return View($"~/Views/Form/_{pageName}.cshtml");

        }
        public ActionResult SampleReport(string pageName, string itemType)
        {
            //Response.AppendHeader("Content-Disposition", new System.Net.Mime.ContentDisposition { Inline = true, }.ToString());

            var data = new ActionAsPdf("FormReport", new { pageName = pageName, itemType = itemType })
            {
                PageSize = Rotativa.Options.Size.A4,
                PageMargins = { Left = 10, Bottom = 10, Right = 10, Top = 10 },
            };

            return data;
        }
    }
}