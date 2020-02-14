using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace ERP.Inventory.Controllers
{
    public class DataController : Helper.ExtController
    {
        public override object TempObject { get; set; }

        public DataController() : base("http://192.168.1.100:90/api/") { }


        // GET: Inventory
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Helper.ProducesJson]
        [Route("Data/{name}/{id}")]
        public ActionResult Get(string name, int id)
        {
            
            if (id == 0)
                return Ok(SyncRequest.HttpRequest(name));
            return Ok(SyncRequest.HttpRequest(name + "/" + id));
            /*

            if (id == 0)
                return Ok(JsonConvert.DeserializeObject<List<Inventory_Domain_Layer._001_invRefCategory1Domain>>(SyncRequest.HttpRequest(name)));

            return Ok(JsonConvert.DeserializeObject<Inventory_Domain_Layer._001_invRefCategory1Domain>(SyncRequest.HttpRequest(name + "/" + id)));
            */
        }
        [HttpGet]
        [Helper.ProducesJson]
        [Route("Data/{name}")]
        public ActionResult Get2(string name)
        {
            
                return Ok(SyncRequest.HttpRequest(name));
            /*

            if (id == 0)
                return Ok(JsonConvert.DeserializeObject<List<Inventory_Domain_Layer._001_invRefCategory1Domain>>(SyncRequest.HttpRequest(name)));

            return Ok(JsonConvert.DeserializeObject<Inventory_Domain_Layer._001_invRefCategory1Domain>(SyncRequest.HttpRequest(name + "/" + id)));
            */
        }




    }
}