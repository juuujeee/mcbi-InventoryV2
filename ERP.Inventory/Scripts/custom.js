
$.ajaxSetup({
    headers: {
        "UserID": $.cookie("UserID"),
        "Token": $.cookie("Token"),
        "Content-Type": "application/json"
    }
});

$('.logout').click(function (e) {

    e.preventDefault();

    $.removeCookie('Token', { path: '/' });
    $.removeCookie('UserID', { path: '/' });

    window.location = "/Account/Login";
});


//INITIALIZE DATEPICKER
$('body').on('focus', '.date-picker', function () {
    $(this).datepicker({
        autoHide: true
    });
});


//CRUD
var crud = {
    create: function (url, data) {

        return $.post(url, data).fail(function () {

            console.log('Error sending post request.');

        });

    },
    read: function (url) {

        return $.get(url).fail(function () { console.log('Error sending get request.'); });
    },
    update: function (url, data) {
        return this.create(url, data);
    },
    delete: function (url, data) {
        return this.update(url, data);
    }
};


//FIT THE CONTAINER OF JQUERY AUTOCOMPLETE IN THE ELEMENT
$.extend($.ui.autocomplete.prototype.options, {
    open: function (event, ui) {
        $(this).autocomplete("widget").css({
            "width": ($(this).width() + "px")
        });
    }
});


//FOR DELIVERY METHOD ONCHANGE
$('.delMethodID').on('change', function (e) {

    var $this = $(this);

    var attrCounter = 0;

    //var $delMethodAttributeEl = $('.delMethodAttribute');
    //$delMethodAttributeEl.html('');

    var $delContent = $('.delMethod__content');
    $delContent.find('.delMethod__can__remove').remove();

    var delMethodAttrURL = '/Data/DelMethodAttribute';

    $.ajaxSetup({
        async: false
    });

    $.getJSON(delMethodAttrURL, function (delMethodAttribute) {

        for (var z = 0; z < delMethodAttribute.length; z++) {

            var delAttrContent = '';

            if (delMethodAttribute[z].DelMethodID_010 === parseInt($this.val())) {

                //delAttrContent += '<div style="display:flex">';
                delAttrContent += '<div class="content delMethod__can__remove">';
                delAttrContent += '<label>' + delMethodAttribute[z].MethodAttribute.toUpperCase() + '</label>';

                if (parseInt($this.val()) === 1) {
                    if (attrCounter === 2) {

                        $.getJSON('/Data/DelMethodAttrValue', function (response) {

                            //console.log(response);
                            delAttrContent += '<select class="deliveryMethodAttr" data-id="' + delMethodAttribute[z].ID + '">';

                            for (var x = 0; x < response.length; x++) {

                                if (response[x].DelMethodAttrID_008 === delMethodAttribute[z].ID) {

                                    delAttrContent += '<option value="' + response[x].ID + '">' + response[x].AttrValueName + '</option>';

                                }

                            }
                            delAttrContent += '</select>';

                        });
                    }
                    else {
                        delAttrContent += '<input type="text" name="DeliveryMethodAttr[' + attrCounter + ']" class="deliveryMethodAttr" data-id="' + delMethodAttribute[z].ID + '">';
                    }

                }

                if (parseInt($this.val()) === 2) {
                    if (attrCounter === 0) {

                        $.getJSON('/Data/DelMethodAttrValue', function (response) {

                            delAttrContent += '<select class="deliveryMethodAttr" data-id="' + delMethodAttribute[z].ID + '">';

                            for (var x = 0; x < response.length; x++) {

                                if (response[x].DelMethodAttrID_008 === delMethodAttribute[z].ID) {

                                    delAttrContent += '<option value="' + response[x].ID + '">' + response[x].AttrValueName + '</option>';

                                }

                            }
                            delAttrContent += '</select>';

                        });
                    }
                    else {
                        delAttrContent += '<input type="text" name="DeliveryMethodAttr[' + attrCounter + ']" value="" class="deliveryMethodAttr" data-id="' + delMethodAttribute[z].ID + '">';
                    }

                }

                if (parseInt($this.val()) === 3) {
                    delAttrContent += '<input type="text" name="DeliveryMethodAttr[' + attrCounter + ']" value="" class="deliveryMethodAttr" data-id="' + delMethodAttribute[z].ID + '">';
                    
                }
                delAttrContent += '</div>';

                //$delMethodAttributeEl.eq(attrCounter).append(delAttrContent);

                $delContent.append(delAttrContent);

                attrCounter++;
            }

        }
    });

    $.ajaxSetup({
        async: true
    });

});




//FOR ITEMS AUTOCOMPLETE
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

    $this.autocomplete({
        source: items,
        select: function (event, ui) {

            var $this = this;

            if (ui.item.hasAttribute) {
                $('.has__attribute__container').dialog({
                    autoResize: true,
                    width: 'auto',
                    modal: true,
                    title: 'ITEM ATTRIBUTE',
                    open: function () {
                        $(this).find('input[name=ItemName]').val(ui.item.value);
                    },
                    buttons: {
                        "OK": function () {

                            $(this).find('.item__attribute').each(function (e) {


                                //console.log($(this).find('select[name=ItemAttribute]').val());


                                $this.closest('td').append('<span class="item-attribute" data-attribute-id="' + $(this).find('select[name=ItemAttribute]').val() + '" data-attribute-value="' + $(this).find('input[name=Value]').val() + '"></span>');
                            });



                            $(this).dialog("close");

                        },
                        Cancel: function () {
                            $(this).dialog("close");
                        }
                    }
                });
            }

            $(this).attr('data-val', ui.item.id);
            $(this).attr('data-description', ui.item.value);
            $(this).attr('data-attribute', ui.item.hasAttribute);
        }
    });

}





function fnGetItemsByProj(event) {

    var $this = $(event.target);
    var projectID = $this.parents('.Transcontent').find('input[name=OriginProjectID]').val();

    if (projectID === null || projectID === '') {
        swal.fire('Warning', 'Select Origin Project', 'warning');
    }
    else {

        var items = [];
        var itemURL = '/Data/ItemsMasterList/ItemsbyProjects/' + projectID;

        $.getJSON(itemURL, function (data) {

            if (data !== null) {

                for (var i = 0; i < data.length; i++) {

                    var newObj = {};

                    var qty = 0;

                    for (var z = 0; z < data[i].ProjectQuantity.length; z++) {

                        var proj = data[i].ProjectQuantity[z];

                        if (proj.ProjectID === parseInt(projectID)) {

                            qty += proj.Quantity;

                            //console.log(proj.Quantity);
                        }
                    }


                    newObj.id = data[i].ID;
                    newObj.value = data[i].ItemFullNameInfo.Name;
                    newObj.label = data[i].ItemFullNameInfo.Name;
                    newObj.units = data[i].Units.ShortName;
                    newObj.unitID = data[i].Units.ID;
                    newObj.quantity = qty;

                    items.push(newObj);
                }

            }
            else {
                swal.fire('Warning', 'No Item', 'warning');
            }

        });


        $this.autocomplete({
            source: items,
            select: function (event, ui) {

                $(this).attr('data-val', ui.item.id);
                $(this).closest('tr').find('input[name=Units]').val(ui.item.units).attr('data-val', ui.item.unitID);
                $(this).closest('tr').find('input[name=Qty]').val(ui.item.quantity).attr('data-limit', ui.item.quantity).removeAttr('disabled');
            }
        });

    }

}


//FOR UNITS AUTOCOMPLETE
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


// FOR ITEM CONDITION
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

    $this.autocomplete({
        source: itemCondition,
        select: function (event, ui) {

            var $this = $(this);

            $this.attr('data-val', ui.item.id);
        }
    });
}


//FOR GENERIC NAME (CATEGORY 3)
function fnGetGenericName(event) {

    var $this = $(event.target);

    var $formEl = $this.closest('form');

    var category3 = [];
    var category3URL = '/Data/category3';

    $.getJSON(category3URL, function (data) {

        for (var i = 0; i < data.length; i++) {
            var obj = {};

            obj.id = data[i].ID;
            obj.value = data[i].Name;
            obj.label = data[i].Name;
            obj.Cat2ID_002 = data[i].Cat2ID_002;

            category3.push(obj);

        }

        console.log(category3);

        $this.autocomplete({
            source: category3,
            select: function (event, ui) {

                var $this = $(this);

                $this.attr({ 'data-val': ui.item.id, 'Cat2ID_002': ui.item.Cat2ID_002 });
            },
            minLength: 0,
            appendTo: $formEl
        });

    });
}


//REMOVE TR FIELD
function fnRemoveItem(event) {

    var $this = $(event.target);

    $($this).parents('tr').remove();

    var counter = $('.custom-table').find('td.number').length;


    if (counter > 0) {
        for (var i = 0; i < counter; i++) {
            $('.custom-table').find('td.number').eq(i).html(i + 1);
        }
    }
}


/*------------------------------------
    CUSTOM MENU
 ------------------------------------*/
$('.sidebar__menu').on('click', function (e) {

    var attr = $(this).attr('data-target');

    // For some browsers, `attr` is undefined; for others, `attr` is false. Check for both.
    if (typeof attr !== typeof undefined && attr !== false) {
        e.preventDefault();

        $(attr).toggleClass('d__none');

        if ($(attr).hasClass('d__none')) {
            $(this).removeClass('open__menu');
        }
        else {
            $(this).addClass('open__menu');
        }


        //$(attr).toggleClass('open');

        //if ($(attr).hasClass('open')) {
        //    $(attr).slideDown();
        //    $(this).addClass('open-menu');
        //}
        //else {
        //    $(attr).slideUp();
        //    $(this).removeClass('open-menu');
        //}

    }
    
});

$('#mobile-menu-btn').on('click', function (e) {

    var $leftSidebar = $('.wrapper__leftmenu');

    $leftSidebar.toggleClass('open__menu');

});
