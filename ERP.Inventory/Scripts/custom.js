
//MINIMIZE OR MAXIMIZE SIDEBAR
$(function () {

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $('#header').toggleClass('active');
    });

});


//OPEN MODAL
$('.open-dialog').click(function (e) {

    e.preventDefault();

    var $modalEl = $('#Default-Modal');

    var $this = $(this);

    var dataURL = $this.attr('data-href');

    var modalSize = $this.attr('data-modal-size');

    var size = 'modal-' + modalSize;

    if (modalSize !== '') {

        $modalEl.find('.modal-dialog').addClass(size);
    }

    var id = $this.attr('id');

    $modalEl.find('.modal-title').html(id);
    $modalEl.find('.modal-body').load(dataURL, function () {
        $modalEl.modal({ show: true, keyboard: false });
        $modalEl.addClass('modal-static');
    });

    $modalEl.find('modal-dialog').removeClass(size);
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


//SUBMIT FORM
$('.save_btn').click(function (e) {
    var $this = $(this);

    var findClosestForm = $this.parents('div.modal').find('div.modal-body').find('form');

    findClosestForm.submit();

    //  console.log(findClosestForm);

});


//ROW ADD
function RowAdd(event, targetsync = 'items-sync') {

    var elem = $(event.target).parents('tr');
    var table = $(elem).parents('table')[0];
    var getclass = elem.attr('class');

    console.log(getclass);

    var elemIndex = $(elem).index();

    //Get Clone FirstElement HTML from parent Table -> String
    var htclone = String($('.' + getclass).html());

    let doc = $('<tr class="' + getclass + '">' + htclone + '</tr>');// new DOMParser().parseFromString(htclone, 'text/html');
    $(doc).find('.' + targetsync).siblings().remove();

    doc.insertAfter(elem);

    //doc.find('.' + targetsync).parents('td').removeAttr('data-select2-id');
    //doc.find('.' + targetsync).removeAttr('data-select2-id');
    //doc.find('.' + targetsync).removeClass('select2-hidden-accessible');
    //doc.find('.' + targetsync).removeAttr('aria-hidden');
    //doc.find('.' + targetsync + ' option').removeAttr('data-select2-id');
    //doc.find('.' + targetsync + ' option').removeAttr('title');

    //LoadSync();

    var i = 1;
    $('.' + getclass).each(function () {
        $(this).find('td label[name = number]').html(i);
        i++;
    });

    $('.datepicker').datepicker({
        autoHide: true
    });
}

// ROW REMOVE
function RowRemove(event) {
    var elem = $(event.target).parents('tr');
    var getclass = elem.attr('class');

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true
    }).then((result) => {
        if (result.value) {

            elem.remove();
            var i = 1;
            $('.' + getclass).each(function () {
                $(this).find('td label[name = number]').html(i);
                i++;
            });
        }
    });



    //console.log($(event.target).parents('tr').children('td').length);

    // var countTD = $(event.target).parents('tr').children('td').length;

    //console.log($(event.target).parents('tr').children('td').eq(0).children('input').val());

    //for (var z = 0; i > countTD; z++) {

    //}


}


//FIT THE CONTAINER OF JQUERY AUTOCOMPLETE IN THE ELEMENT
$.extend($.ui.autocomplete.prototype.options, {
    open: function (event, ui) {
        $(this).autocomplete("widget").css({
            "width": ($(this).width() + "px")
        });
    }
});


//AUTO CLOSE THE SIDEBAR IF ANOTHER MENU IS OPEN
$('.sidebarCollapse').on('show.bs.collapse', function () {

    $('.sidebarCollapse').not(this).collapse('hide');

});



//var delMethodAttribute = [
//    {
//        "ID": 1,
//        "DelMethodID_010": 1,
//        "MethodAttribute": "DriverName"
//    },
//    {
//        "ID": 2,
//        "DelMethodID_010": 1,
//        "MethodAttribute": "Plate No."
//    },
//    {
//        "ID": 3,
//        "DelMethodID_010": 1,
//        "MethodAttribute": "Vehicle Type"
//    },
//    {
//        "ID": 4,
//        "DelMethodID_010": 2,
//        "MethodAttribute": "Courier Name"
//    },
//    {
//        "ID": 5,
//        "DelMethodID_010": 2,
//        "MethodAttribute": "Tracking No."
//    },
//    {
//        "ID": 6,
//        "DelMethodID_010": 3,
//        "MethodAttribute": "Msgr Name"
//    },
//    {
//        "ID": 7,
//        "DelMethodID_010": 3,
//        "MethodAttribute": "Msgr ID No."
//    }
//];

//FOR DELIVERY METHOD ONCHANGE
$('.delMethodID').on('change', function (e) {

    var $this = $(this);

    var attrCounter = 0;


    var $delMethodAttributeEl = $('.delMethodAttribute');
    $delMethodAttributeEl.html('');

    var delMethodAttrURL = '/Data/DelMethodAttribute';

    $.ajaxSetup({
        async: false
    });

    $.getJSON(delMethodAttrURL, function (delMethodAttribute) {

        for (var z = 0; z < delMethodAttribute.length; z++) {

            var delAttrContent = '';

            if (delMethodAttribute[z].DelMethodID_010 === parseInt($this.val())) {

                delAttrContent += '<div style="display:flex">';
                delAttrContent += '<label style="width:150px">' + delMethodAttribute[z].MethodAttribute + '</label>';

                if (parseInt($this.val()) === 1) {
                    if (attrCounter === 2) {

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

                $delMethodAttributeEl.eq(attrCounter).append(delAttrContent);

                attrCounter++;
            }

        }
    });

    $.ajaxSetup({
        async: true
    });

});



//FOR ITEMS AUTOCOMPLETE
function fnGetItems(event) {

    var $this = $(event.target);
    var items = [];
    var itemURL = '/Data/ItemsMasterlist';

    $this.autocomplete({
        source: items,
        select: function (event, ui) {

            $(this).attr('data-val', ui.item.id);
        }
    });

    $.getJSON(itemURL, function (data) {

        //console.log(data);

        for (var i = 0; i < data.length; i++) {

            var newObj = {};

            if (data[i].ItemFullNameInfo !== null) {

                //console.log(data[i].ItemFullNameInfo);

                newObj.id = data[i].ID;
                newObj.value = data[i].ItemFullNameInfo.Name;
                newObj.label = data[i].ItemFullNameInfo.Name;

                items.push(newObj);
            }

        }
    });
}

function fnGetItemsByProj(event) {

    var $this = $(event.target);

    var projectID = $this.parents('.content-body').find('input#originProjectID').val();

    if (projectID === null || projectID === '') {
        swal.fire('Warning', 'Select Origin Project', 'warning');
    }
    else {

        var items = [];
        var itemURL = '/Data/ItemsMasterList/ItemsbyProjects/' + projectID;

        $this.autocomplete({
            source: items,
            select: function (event, ui) {

                console.log(ui.item.quantity);

                $(this).attr('data-val', ui.item.id);
                $(this).closest('tr').find('input[name=Units]').val(ui.item.units).attr('data-val', ui.item.unitID);
                $(this).closest('tr').find('input[name=Qty]').val(ui.item.quantity).attr('data-limit', ui.item.quantity).removeAttr('disabled');
            }
        });

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
    }

}


//FOR UNITS AUTOCOMPLETE
function fnGetUnits(event) {

    var $this = $(event.target);
    var units = [];
    var unitsURL = '/Data/units';

    $this.autocomplete({
        source: units,
        select: function (event, ui) {

            var $this = $(this);

            $this.attr('data-fullname', ui.item.fullname);
            $this.attr('data-val', ui.item.id);
        }
    });

    $.getJSON(unitsURL, function (data) {

        for (var i = 0; i < data.length; i++) {
            var obj = {};

            obj.id = data[i].ID;
            obj.value = data[i].ShortName;
            obj.label = data[i].ShortName;
            obj.fullname = data[i].FullName;

            units.push(obj);
        }

    });
}


// FOR ITEM CONDITION
function fnGetItemCondition(event) {

    var $this = $(event.target);
    var itemCondition = [];
    var itemConditionURL = '/Data/ItemCondition';

    $this.autocomplete({
        source: itemCondition,
        select: function (event, ui) {

            var $this = $(this);

            $this.attr('data-val', ui.item.id);
        }
    });

    $.getJSON(itemConditionURL, function (data) {

        for (var i = 0; i < data.length; i++) {
            var obj = {};

            obj.id = data[i].ID;
            obj.value = data[i].StatusName;
            obj.label = data[i].StatusName;

            itemCondition.push(obj);
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
$('.sidebar-menu').on('click', function (e) {

    var attr = $(this).attr('data-target');

    // For some browsers, `attr` is undefined; for others, `attr` is false. Check for both.
    if (typeof attr !== typeof undefined && attr !== false) {
        e.preventDefault();

        $(attr).toggleClass('d-none');

        if ($(attr).hasClass('d-none')) {
            $(this).removeClass('open-menu');
        }
        else {
            $(this).addClass('open-menu');
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

    var $leftSidebar = $('.left-sidebar');

    if ($leftSidebar.hasClass('slideInLeft')) {

        $leftSidebar.removeClass('slideInLeft');
        $leftSidebar.addClass('slideOutLeft');

        //$leftSidebar.removeClass('mobile-menu-open');

    }
    else {

        $leftSidebar.removeClass('slideOutLeft');
        $leftSidebar.addClass('slideInLeft');

        $leftSidebar.addClass('mobile-menu-open');
    }


});


//var deliveryMethod = [];

//var deliveryMethodURL = 'http://192.168.1.100:90/api/DeliveryMethod';
//$.getJSON(deliveryMethodURL, function (data) {

//    for (var i = 0; i < data.length; i++) {
//        var obj = {};

//        obj.id = data[i].ID;
//        obj.value = data[i].Name;
//        obj.label = data[i].Name;

//        deliveryMethod.push(obj);
//    }


//    $(".delMethod").autocomplete({
//        source: deliveryMethod,
//        select: function (event, ui) {

//            var $this = $(this);
//            $this.parents('.card-header').find('input.delMethodID').val(ui.item.id);

//            var attrCounter = 0;

//            $('.delMethodAttribute').find('label').text("");
//            $('.delMethodAttribute').find('input').attr('disabled', true).removeAttr('data-id');

//            for (var z = 0; z < delMethodAttribute.length; z++) {

//                //console.log(delMethodAttribute[z]);

//                if (delMethodAttribute[z].DelMethodID_010 === ui.item.id) {

//                    $('.delMethodAttribute').find('label').eq(attrCounter).text(delMethodAttribute[z].MethodAttribute);
//                    $('.delMethodAttribute').find('input').eq(attrCounter).attr({ 'disabled': false, 'data-id': delMethodAttribute[z].ID });

//                    attrCounter++;
//                }

//            }
//        }
//    })

//});
