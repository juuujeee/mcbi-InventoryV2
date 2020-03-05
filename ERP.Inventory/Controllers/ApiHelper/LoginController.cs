﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace ERP.Inventory.Controllers.ApiHelper
{
    public class LoginController : Helper.ExtController
    {
        public override object TempObject { get; set; }

        public LoginController() : base("http://192.168.1.100:98/api/")
        {


        }

        void LoadHeader()
        {
            SyncRequest.httpClient.DefaultRequestHeaders.Clear();
            foreach (string i in Request.Headers.AllKeys)
            {
                if (i == "Content-Type" || i == "Content-Length") continue;

                string res = Request.Headers[i];
                SyncRequest.httpClient.DefaultRequestHeaders.Add(i, res);
            }

        }


        // GET: Inventory
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Helper.ProducesJson]
        [Route("Login/{name}/{id}")]
        [Route("Login/{name}/{id}/{*sample}")]
        public ActionResult Get(string name, int? id, string sample)
        {
            //SyncRequest.httpClient.DefaultRequestHeaders.a
            LoadHeader();
            if (id == 0)
                return Ok(SyncRequest.HttpRequest(name));
            else if (id == null)
            {
                string ss = Request.RawUrl.Replace("/Login/", "").ToString();// RouteData.Route.ToString();
                return Ok(SyncRequest.HttpRequest(ss));
            }
            return Ok(SyncRequest.HttpRequest(name + "/" + id));
            /*

            if (id == 0)
                return Ok(JsonConvert.DeserializeObject<List<Inventory_Domain_Layer._001_invRefCategory1Domain>>(SyncRequest.HttpRequest(name)));

            return Ok(JsonConvert.DeserializeObject<Inventory_Domain_Layer._001_invRefCategory1Domain>(SyncRequest.HttpRequest(name + "/" + id)));
            */
        }
        [HttpGet]
        [Helper.ProducesJson]
        [Route("Login/{name}")]
        public ActionResult Get2(string name)
        {
            LoadHeader();

            return Ok(SyncRequest.HttpRequest(name));
            /*

            if (id == 0)
                return Ok(JsonConvert.DeserializeObject<List<Inventory_Domain_Layer._001_invRefCategory1Domain>>(SyncRequest.HttpRequest(name)));

            return Ok(JsonConvert.DeserializeObject<Inventory_Domain_Layer._001_invRefCategory1Domain>(SyncRequest.HttpRequest(name + "/" + id)));
            */
        }





        // [HttpPut]
        [HttpPost]
        [Route("Login/{name}/{*samples}")]
        [Helper.ProducesJson]
        public ActionResult Post(string name, string samples)
        {
            LoadHeader();
            // + Request.RequestContext.RouteData.Values["directives"].ToString();
            Stream req = Request.InputStream;
            req.Seek(0, System.IO.SeekOrigin.Begin);
            string json = new StreamReader(req).ReadToEnd();

            req.Dispose();
            try
            {
                //assuming JSON.net/Newtonsoft library from http://json.codeplex.com/
                //input = JsonConvert.DeserializeObject<InputClass>(json)
                return Ok
                    (
                        SyncRequest.HttpRequest
                        (
                            samples != null ? Request.RawUrl.Replace("/Login/", "").ToString() : name,
                            "POST",
                            new System.Net.Http.StringContent(json, System.Text.Encoding.UTF8, "application/json")
                        )
                    );
            }

            catch (Exception ex)
            {
                return new HttpStatusCodeResult(System.Net.HttpStatusCode.BadRequest);
            }
        }
    }
}