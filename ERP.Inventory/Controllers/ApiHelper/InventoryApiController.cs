using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ERP.Inventory.Controllers
{
    public class InventoryApiController : Controller
    {

        Helper.SynchronousRequest SyncRequest;
        public InventoryApiController():base()
        {
            SyncRequest = new Helper.SynchronousRequest("http://192.168.1.100:90/api/");
        }


        // GET: Inventory
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Helper.ProducesJson(typeof(string))]
        public string Get(string name, int id)
        {
            if (id == 0)
                return SyncRequest.HttpRequest(name);

            return SyncRequest.HttpRequest(name + "/" + id);
        }

        



    }
}