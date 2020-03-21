using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ERP.Inventory.Models
{
    public class Vendor
    {
        public int SupplierID { get; set; }
        public string SupplierName { get; set; }
        
    }

    public class Branch
    {
        public int ID { get; set; }

        public string BranchName { get; set; }

        public string SeriesNo { get; set; }
    }

    public class VendorInfo
    {
        public Vendor VendorSupplier { get; set; }
        
        public List<Branch> VendorBranch { get; set; }
    }
}