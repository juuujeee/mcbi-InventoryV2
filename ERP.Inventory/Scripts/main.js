function setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
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

function JsonRequest(url, method, data, fn, isJson = true) {

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
    xmlh.open(method, window.location.origin + url);
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
var items = [];
var itemURL = '/Data/ItemsMasterlist';

JsonRequest(itemURL, 'GET', null, function (data) {

    // console.log(data);

    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {

            var newObj = {};

            if (data[i].ItemFullNameInfo !== null) {

                newObj.id = data[i].ID;
                newObj.value = data[i].ItemFullNameInfo.Name;
                newObj.label = data[i].ItemFullNameInfo.Name;
                newObj.hasAttribute = data[i].Category3.hasAttribute;

                items.push(newObj);
            }

        }
    }

});


function fnGetItems(event) {

    var $this = $(event.target);

}
/*END GET ITEMS AUTOCOMPLETE*/

/*===========================================================================================================================*/

/*GET UNITS AUTOCOMPLETE*/
var units = [];
var unitsURL = '/Data/units';


JsonRequest(unitsURL, 'GET', null, function (data) {

    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            var obj = {};

            obj.id = data[i].ID;
            obj.value = data[i].ShortName;
            obj.label = data[i].ShortName;
            obj.fullname = data[i].FullName;

            units.push(obj);
        }
    }

});

function fnGetUnits(event) {

    var $this = $(event.target);

    $this.autocomplete({
        source: units,
        select: function (event, ui) {

            var $this = $(this);

            $this.attr('data-fullname', ui.item.fullname);
            $this.attr('data-val', ui.item.id);
        }
    });

}
/*END UNITS AUTOCOMPLETE*/

/*================================================================================================================================*/

/*GET ITEM CONDITION AUTOCOMPLETE*/
var itemCondition = [];
var itemConditionURL = '/Data/ItemCondition';


JsonRequest(itemConditionURL, 'GET', null, function (data) {

    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            var obj = {};

            obj.id = data[i].ID;
            obj.value = data[i].StatusName;
            obj.label = data[i].StatusName;

            itemCondition.push(obj);
        }
    }

});

function fnGetItemCondition(event) {

    var $this = $(event.target);

}

/*END ITEM CONDITION AUTOCOMPLETE*/

/*=======================================================================================================================*/

/*MOBILE MENU JS*/

function OpenMobileMenu(event) {

    console.log(event);

    //var mobileMenu = document.getElementById("mobile-menu-btn");

    //mobileMenu.onclick = function () {
    //    document.getElementsByClassName("wrapper__leftmenu")[0].classList.toggle("open__menu");
    //};
}

/*END MOBILE MENU JS*/

/*=========================================================================================================================*/

/*LOGOUT BUTTON JS*/

function Logout(event) {

    console.log(event);

    //var logout = document.getElementsByClassName("logout")[0];

    //logout.onclick = function (event) {
    //    event.preventDefault();

    //    deleteCookie("Token");
    //    deleteCookie("UserID");

    //    window.location = "/Account/Login";
    //};
}

/*END LOGOUT BUTTON JS*/



