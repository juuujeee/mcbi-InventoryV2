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

function JsonRequest(url, method, data, fn, async = true, isJson = true) {

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

    xmlh.open(method, window.location.origin + url, async);
    if (isJson)
        xmlh.setRequestHeader('Content-Type', 'application/json;charset=utf-8');

    xmlh.setRequestHeader('UserID', user);
    xmlh.setRequestHeader('Token', token);
    if (data !== null && data !== undefined) {

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

        var attrCounter = 0;

        var attr = null;

        var removable = document.querySelectorAll(".delMethod__content .delMethod__can__remove");

        removable.forEach((item, index) => {
            item.remove();
        });

        var delMethodAttrURL = '/Data/DelMethodAttribute';

        JsonRequest(delMethodAttrURL, 'GET', null, function (delMethodAttribute) {

           
            if (delMethodAttribute.length > 0) {
                for (var z = 0; z < delMethodAttribute.length; z++) {

                    attr = delMethodAttribute[z];

                    var delAttrContent = '';

                    if (delMethodAttribute[z].DelMethodID_010 === parseInt(val)) {

                        delAttrContent += '<div class="content delMethod__can__remove">';
                        delAttrContent += '<label>' + delMethodAttribute[z].MethodAttribute.toUpperCase() + '</label>';

                        if (parseInt(val) === 1) {
                            if (attrCounter === 2) {
                                JsonRequest('/Data/DelMethodAttrValue', 'GET', null, function (response) {

                                    delAttrContent += '<select class="deliveryMethodAttr" data-id="' + attr.ID + '">';

                                    for (var x = 0; x < response.length; x++) {
                                      
                                        if (response[x].DelMethodAttrID_008 === attr.ID) {

                                            delAttrContent += '<option value="' + response[x].ID + '">' + response[x].AttrValueName + '</option>';

                                        }

                                    }
                                    delAttrContent += '</select>';

                                }, false);
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

                                }, false);
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
                        document.getElementsByClassName("delMethod__content")[0].insertAdjacentHTML('beforeend', delAttrContent);

                        attrCounter++;
                    }
                }
            }

        }, false);

    };

}
/*END OF DELIVERY METHOD*/

/*============================================================================================================================*/

/*GET ITEMS AUTOCOMPLETE*/

document.body.addEventListener('click', event => {
    
    if (event.target.getAttribute('name') !== 'Items')
        return;
    
    GetItems();
});

function GetItems() {

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
                    newObj.Units = data[i].Units !== null ? data[i].Units.ShortName : '';
                    newObj.UnitID = data[i].Units !== null ? data[i].Units.ID : '';

                    itemsData.push(newObj);
                }

            }
        }

        var itemEl = document.getElementsByName("Items");

        itemEl.forEach((item, index) => {

            autocomplete(item, itemsData, true, "ID", "Value", (el, data) => { },
                sel => {
                    item.parentNode.parentNode.querySelector("input[name='Units']").value = sel.data.Units;
                    item.parentNode.parentNode.querySelector("input[name='Units']").setAttribute("data-id", sel.data.UnitID);

                    if (index === (item.parentNode.parentNode.parentNode.querySelectorAll("tr").length - 1)) {

                        //Get The Parent Element
                        let tbody = item.parentNode.parentNode.parentNode;
                        
                        //Clone TR Element
                        let cloneElement = item.parentNode.parentNode.parentNode.querySelector("tr:first-child").cloneNode(true);

                        //Clear Clone Element
                        cloneElement.querySelectorAll("input[type='text']").forEach((item, index) => {
                            item.value = '';
                        });
                        let countTR = item.parentNode.parentNode.parentNode.querySelectorAll("tr").length;
                        cloneElement.querySelector("td.counter").textContent = countTR + 1;

                        //Append Clone Element to Table Body
                        tbody.append(cloneElement);

                    }

                });
        });

    });
}

/*END GET ITEMS AUTOCOMPLETE*/

/*===========================================================================================================================*/

/*GET UNITS AUTOCOMPLETE*/
//var unitsData = [];
//var unitsURL = '/Data/units';
//JsonRequest(unitsURL, 'GET', null, function (data) {

//    if (data.length > 0) {
//        for (var i = 0; i < data.length; i++) {
//            var obj = {};

//            obj.ID = data[i].ID;
//            obj.Value = data[i].ShortName;

//            unitsData.push(obj);
//        }
//    }

//    var el = document.getElementsByName("Units");

//    el.forEach((item, index) => {
//        autocomplete(item, unitsData, true, "ID", "Value", (el, data) => {

//        });
//    });

//});
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

    //console.log(event.target);

    event.preventDefault();

    deleteCookie("Token");
    deleteCookie("UserID");

    window.location = "/Account/Login";

}
/*END LOGOUT BUTTON JS*/

/*===========================================================================================================================*/

/*SIDEBAR MENU JS*/
function CollapsedSidebarMenu(event) {

    var attr = event.target.getAttribute("data-target");

    if (typeof attr !== typeof undefined && attr !== false) {
        event.preventDefault();

        var el = document.querySelectorAll(attr)[0];
        
        el.classList.toggle("d__none");

        if (event.target.classList.contains("open__menu")) {
            event.target.classList.remove("open__menu");
        }
        else {
            
            event.target.classList.add("open__menu");
        }

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