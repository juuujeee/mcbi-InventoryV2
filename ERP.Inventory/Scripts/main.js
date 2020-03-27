function setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + 365 + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var UserID = getCookie("UserID");
    var Token = getCookie("Token");
    if (UserID === "" && Token === "") {
        window.location.href = "/Account/Login";
    }
}

function deleteCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


function UrlRequest() {
    if (window.XMLHttpRequest) {
        // code for modern browsers
        return new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
}

function JsonRequest(url, method, data, fn, isJson = true, isExternal = false) {

    var xmlh = UrlRequest();
    var user = getCookie('UserID');
    var token = getCookie('Token');
    //console.log('UserLog:' + user);
    //console.log('TokenLog:' + token);
    if (user === undefined)
        user = 0;
    if (token === undefined)
        token = 0;

    xmlh.onreadystatechange = function () {
        //console.log(this.readyState);
        //console.log(this.status);
        if (this.readyState === 4) {
            //console.log(this.responseText);
            try {
                var json = JSON.parse(this.responseText);

                if (json.Message === 'Request Invalidated.' || json.Message === 'Search Invalidated.') {
                    //LoginPopUp();
                    //redirect to login page
                }
                else
                    fn(json);
            } catch (e) {
                console.log(e);
                console.log(this.responseText);
            }
        }
    };

    //console.log(window.location.origin + url);
    
    if (isExternal == false) {
        url = window.location.origin + url;
    }
    


    xmlh.open(method, url, false);
    if (isJson)
        xmlh.setRequestHeader('Content-Type', 'application/json;charset=utf-8');

    xmlh.setRequestHeader('UserID', user);
    xmlh.setRequestHeader('Token', token);
    if (data !== null && data !== undefined) {

        //console.log(JSON.stringify(data));
        if (isJson)
            xmlh.send(JSON.stringify(data));
        else
            xmlh.send(data);
    }
    else
        xmlh.send();
    return xmlh;
}


/*================================PURE JAVASCRIPT HERE!!===============================*/

/*=======================================================================================================================================================*/

/*DELIVERY METHOD HERE */
function DeliveryAttrMethod() {
    var delMethod = document.getElementsByClassName("delMethodID")[0];

    delMethod.onchange = function () {
        var val = this.value;

       // console.log(val);

        var attrCounter = 0;

        var attr = null;

        var removable = document.querySelectorAll(".delMethod__content .delMethod__can__remove");

        removable.forEach((item, index) => {
            item.remove();
        });

        var delMethodAttrURL = '/Data/DelMethodAttribute';

        JsonRequest(delMethodAttrURL, 'GET', null, function (delMethodAttribute) {

            //console.log(delMethodAttribute);

           
            if (delMethodAttribute.length > 0) {
                for (var z = 0; z < delMethodAttribute.length; z++) {

                    attr = delMethodAttribute[z];

                   // console.log(attr);

                    var delAttrContent = '';

                    if (delMethodAttribute[z].DelMethodID_010 === parseInt(val)) {

                        delAttrContent += '<div class="content delMethod__can__remove">';
                        delAttrContent += '<label>' + delMethodAttribute[z].MethodAttribute.toUpperCase() + '</label>';

                        if (parseInt(val) === 1) {
                            if (attrCounter === 2) {
                                JsonRequest('/Data/DelMethodAttrValue', 'GET', null, function (response) {

                                    //console.log(response);

                                    delAttrContent += '<select class="deliveryMethodAttr" data-id="' + attr.ID + '">';

                                    for (var x = 0; x < response.length; x++) {
                                       //console.log(response[x].DelMethodAttrID_008);
                                        //console.log("Attr" + attr.ID);
                                        if (response[x].DelMethodAttrID_008 === attr.ID) {

                                            delAttrContent += '<option value="' + response[x].ID + '">' + response[x].AttrValueName + '</option>';

                                            //console.log("Select Option Here !!!");
                                        }

                                    }
                                    delAttrContent += '</select>';

                                    //console.log(delAttrContent);
                                });
                            }
                            else {
                                delAttrContent += '<input type="text" name="DeliveryMethodAttr[' + attrCounter + ']" class="deliveryMethodAttr" data-id="' + attr.ID + '">';
                            }
                        }
                        if (parseInt(val) === 2) {
                            if (attrCounter === 0) {
                                JsonRequest('/Data/DelMethodAttrValue', 'GET', null, function (response) {

                                    delAttrContent += '<select class="deliveryMethodAttr" data-id="' + attr.ID + '">';

                                    for (var x = 0; x < response.length; x++) {

                                        if (response[x].DelMethodAttrID_008 === attr.ID) {

                                            delAttrContent += '<option value="' + response[x].ID + '">' + response[x].AttrValueName + '</option>';

                                        }

                                    }
                                    delAttrContent += '</select>';

                                });
                            }
                            else {
                                delAttrContent += '<input type="text" name="DeliveryMethodAttr[' + attrCounter + ']" value="" class="deliveryMethodAttr" data-id="' + attr.ID + '">';
                            }
                        }
                        if (parseInt(val) === 3) {
                            delAttrContent += '<input type="text" name="DeliveryMethodAttr[' + attrCounter + ']" value="" class="deliveryMethodAttr" data-id="' + attr.ID + '">';
                        }

                        delAttrContent += '</div>';

                        //Append html Element

                        //console.log(delAttrContent);

                        document.getElementsByClassName("delMethod__content")[0].insertAdjacentHTML('beforeend', delAttrContent);

                        attrCounter++;
                    }
                }
            }

        });

    };

}
/*END OF DELIVERY METHOD*/

/*============================================================================================================================*/

/*GET ITEMS AUTOCOMPLETE*/
var itemsData = [];
var itemURL = '/Data/ItemsMasterlist';
JsonRequest(itemURL, 'GET', null, function (data) {

    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {

            var newObj = {};

            if (data[i].ItemFullNameInfo !== null) {

                newObj.ID = data[i].ID;
                newObj.Value = data[i].ItemFullNameInfo.Name;
                newObj.hasAttribute = data[i].Category3.hasAttribute;

                itemsData.push(newObj);
            }

        }
    }

    var el = document.getElementsByName("Items");

    el.forEach((item, index) => {
        
        autocomplete(item, itemsData, true, "ID", "Value", (el, data) => {
        });
    });

});
/*END GET ITEMS AUTOCOMPLETE*/

/*===========================================================================================================================*/

/*GET UNITS AUTOCOMPLETE*/
var unitsData = [];
var unitsURL = '/Data/units';
JsonRequest(unitsURL, 'GET', null, function (data) {

    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            var obj = {};

            obj.ID = data[i].ID;
            obj.Value = data[i].ShortName;

            unitsData.push(obj);
        }
    }

    var el = document.getElementsByName("Units");

    el.forEach((item, index) => {
        autocomplete(item, unitsData, true, "ID", "Value", (el, data) => {

        });
    });

});
/*END UNITS AUTOCOMPLETE*/

/*================================================================================================================================*/

/*GET ITEM CONDITION AUTOCOMPLETE*/
var itemConditionData = [];
var itemConditionURL = '/Data/ItemCondition';
JsonRequest(itemConditionURL, 'GET', null, function (data) {

    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            var obj = {};

            obj.ID = data[i].ID;
            obj.Value = data[i].StatusName;

            itemConditionData.push(obj);
        }
    }

    var el = document.getElementsByName("ItemCondition");

    el.forEach((item, index) => {
        autocomplete(item, itemConditionData, true, "ID", "Value", (el, data) => {

        });
    });

});
/*END ITEM CONDITION AUTOCOMPLETE*/

/*=======================================================================================================================*/

/*MOBILE MENU JS*/
function OpenMobileMenu(event) {

    document.getElementsByClassName("wrapper__leftmenu")[0].classList.toggle("open__menu");
}
/*END MOBILE MENU JS*/

/*=========================================================================================================================*/

/*LOGOUT BUTTON JS*/
function Logout(event) {

    console.log(event.target);

    event.preventDefault();

    deleteCookie("Token");
    deleteCookie("UserID");

    window.location = "/Account/Login";

}
/*END LOGOUT BUTTON JS*/

/*===========================================================================================================================*/

/*SIDEBAR MENU JS*/
function CollapsedSidebarMenu(event) {

   // console.log(event.target.getAttribute("data-target"));

    var attr = event.target.getAttribute("data-target");

    if (typeof attr !== typeof undefined && attr !== false) {
        event.preventDefault();

        var el = document.querySelectorAll(attr)[0];
        
        el.classList.toggle("d__none");

        //console.log(event.target.classList.contains("open__menu"));

        if (event.target.classList.contains("open__menu")) {
            event.target.classList.remove("open__menu");
        }
        else {
            
            event.target.classList.add("open__menu");
        }

        //event.target.className = "open__menu";

        //console.log(event.target.className.toggle("open__menu"));
        

        //if (attr.classList.contains("open__menu")) {
        //    event.target.classList.remove("open__menu");
        //}
        //else {
        //    document.event.target.classList.add("open__menu");
        //}
    }

}
/*END SIDEBAR MENU JS*/


/*FORMAT MONEY*/
function formatMoney(number, decPlaces, decSep, thouSep) {
    decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
        decSep = typeof decSep === "undefined" ? "." : decSep;
    thouSep = typeof thouSep === "undefined" ? "," : thouSep;
    var sign = number < 0 ? "-" : "";
    var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
    var j = (j = i.length) > 3 ? j % 3 : 0;

    return sign +
        (j ? i.substr(0, j) + thouSep : "") +
        i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
        (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
}

/*ACCEPT ONLY NUMBERS IN INPUT FIELD*/
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}