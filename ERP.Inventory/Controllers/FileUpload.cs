using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace HRMS.Inventory.Controllers
{
    public class ItemImageController : Controller
    {

        // GET: ItemImage
        public ActionResult Index()
        {
            return View();
        }


        [HttpPost]
        public object FileUpload(int id)
        {
            /*
            HttpHelper = new ApiHelper("multipart/form-data");
            string user = Request.Headers["user"] ?? "0";
            string token = Request.Headers["token"] ?? "0";
            HttpHelper.DefaultRequestHeaders.Add("user", user);
            HttpHelper.DefaultRequestHeaders.Add("token", token);
            */
            //try
            //{
            System.Web.HttpFileCollectionBase hfc = HttpContext.Request.Files;
            string path = "/item-images/";

            //Get the names and of the files..
            List<string> GetFileNames = new List<string>();
            List<string> GetExtensions = new List<string>();
            for (int i = 0; i < hfc.Count; i++)
            {
                System.Web.HttpPostedFileBase hpf = hfc.Get(i);
                if (Request.Browser.Browser == "IE")
                {
                    GetFileNames.Add(System.IO.Path.GetFileName(hpf.FileName));
                    GetExtensions.Add(System.IO.Path.GetExtension(hpf.FileName));
                }
                else
                {
                    GetFileNames.Add(hpf.FileName);
                    GetExtensions.Add(System.IO.Path.GetExtension(hpf.FileName));
                }
            }
            string Filenames = string.Join("|", GetFileNames.ToArray());
            string Exts = string.Join("|", GetExtensions.ToArray());

            if (Filenames.Trim() == "")
                return "[]";
            /*
             * SAVING TO API
            //Save to images and get its IDs
            JObject jo = new JObject();
            jo.Add(new JProperty("ID", 0));
            jo.Add(new JProperty("Filename", Filenames));
            jo.Add(new JProperty("Ext", Exts));
            jo.Add(new JProperty("TargetID", id));
            jo.Add(new JProperty("Usage", "item"));
            jo.Add(new JProperty("isProfile", 1));
            GetParameters = "/InvImages";
            this.httpContent = new System.Net.Http.StringContent(JsonConvert.SerializeObject(jo), System.Text.Encoding.UTF8, "application/json");

            object ob = HttpRequest();
            
            jo = JsonConvert.DeserializeObject<JObject>(ob.ToString());

            string[] IDS = jo["DataID"].ToString().Split(',');
          */
            string[] IDS = new string[] { "1", "2", "3" };

            try
            {

                for (int i = 0; i < hfc.Count; i++)
                {
                    System.Web.HttpPostedFileBase hpf = hfc.Get(i);//[i];
                    if (hpf.ContentLength > 0)
                    {

                        //Remove each files to ID's then save it to local file.
                        string fileName = IDS[i] + GetExtensions[i];
                        /*
                        if (Request.Browser.Browser == "IE")
                        {
                            fileName = Path.GetFileName(hpf.FileName);
                        }
                        else
                        {
                            fileName = hpf.FileName;
                        }*/
                        string fullPathWithFileName = path + fileName;
                        //C:\inetpub\wwwroot\ERP
                        //C:\Inetpub\vhosts\default\htdocs\
                        if (Request.IsLocal)
                            hpf.SaveAs(Server.MapPath("/Content" + fullPathWithFileName));
                        else
                            hpf.SaveAs(ViewBag.ImageDirectory + fullPathWithFileName);
                    }
                }
            }
            catch (Exception e)
            {
                return e;
            }

            return "Shoul be upload Result";

            //return ob;
            //return fileName + id;
            //}
            //catch (Exception ex)
            //{
            //    throw ex;
            //}


            //   return null;
        }




    }
}