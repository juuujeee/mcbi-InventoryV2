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
        $modalEl.modal({ show: true });
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



var delMethodAttribute = [
    {
        "ID": 1,
        "DelMethodID_010": 1,
        "MethodAttribute": "DriverName"
    },
    {
        "ID": 2,
        "DelMethodID_010": 1,
        "MethodAttribute": "Plate No."
    },
    {
        "ID": 3,
        "DelMethodID_010": 1,
        "MethodAttribute": "Vehicle Type"
    },
    {
        "ID": 4,
        "DelMethodID_010": 2,
        "MethodAttribute": "Courier Name"
    },
    {
        "ID": 5,
        "DelMethodID_010": 2,
        "MethodAttribute": "Tracking No."
    },
    {
        "ID": 6,
        "DelMethodID_010": 3,
        "MethodAttribute": "Msgr Name"
    },
    {
        "ID": 7,
        "DelMethodID_010": 3,
        "MethodAttribute": "Msgr ID No."
    }
];

//FOR DELIVERY METHOD ONCHANGE
$('.delMethodID').on('change', function (e) {

    var $this = $(this);

    var attrCounter = 0;


    $('.delMethodAttribute').find('label').text("");
    $('.delMethodAttribute').find('input').attr('disabled', true).removeAttr('data-id');

    for (var z = 0; z < delMethodAttribute.length; z++) {

        if (delMethodAttribute[z].DelMethodID_010 === parseInt($this.val())) {

            //console.log("Testing only here!!!");
            $('.delMethodAttribute').find('label').eq(attrCounter).text(delMethodAttribute[z].MethodAttribute).css({ "text-transform": "uppercase" });
            $('.delMethodAttribute').find('input').eq(attrCounter).attr({ 'disabled': false, 'data-id': delMethodAttribute[z].ID });

            attrCounter++;
        }
    }
});


//FOR ITEMS AUTOCOMPLETE
var items = [];
var itemURL = 'http://192.168.1.100:89/api/values';
$.getJSON(itemURL, function (data) {

    for (var i = 0; i < data.length; i++) {

        var newObj = {};

        newObj.id = data[i].ID;
        newObj.value = data[i].Name;
        newObj.label = data[i].Name;

        items.push(newObj);
    }

    $('body').on('click', '.items', function () {

        $(this).autocomplete({
            source: items,
            select: function (event, ui) {

                var $this = $(this);

                $this.attr('data-val', ui.item.id);
            }
        });
    });

});



//FOR UNITS AUTOCOMPLETE
var units = [];
var unitsURL = 'http://124.105.198.3:90/api/units';
$.getJSON(unitsURL, function (data) {

    for (var i = 0; i < data.length; i++) {
        var obj = {};

        obj.id = data[i].ID;
        obj.value = data[i].ShortName;
        obj.label = data[i].ShortName;
        obj.fullname = data[i].FullName;

        units.push(obj);
    }

    $('body').on('click', '.units', function () {

        $(this).autocomplete({
            source: units,
            select: function (event, ui) {

                var $this = $(this);

                $this.attr('data-fullname', ui.item.fullname);
                $this.attr('data-val', ui.item.id);
            }
        });

    });
});


// FOR ITEM CONDITION
var itemCondition = [];
var itemConditionURL = 'http://124.105.198.3:90/api/ItemCondition';
$.getJSON(itemConditionURL, function (data) {

    for (var i = 0; i < data.length; i++) {
        var obj = {};

        obj.id = data[i].ID;
        obj.value = data[i].StatusName;
        obj.label = data[i].StatusName;

        itemCondition.push(obj);
    }

    $('body').on('click', '.itemCondition', function () {

        $(this).autocomplete({
            source: itemCondition,
            select: function (event, ui) {

                var $this = $(this);

                $this.attr('data-val',ui.item.id);
            }
        });

    });
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
