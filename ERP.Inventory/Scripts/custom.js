//OPEN MODAL
$('.open-dialog').click(function (e) {

    e.preventDefault();

    
    var $modalEl = $('#Default-Modal');

    var $this = $(this);

    var dataURL = $this.attr('data-href');

    var isLargeModal = $this.attr('data-modal-size');

    if (isLargeModal) {
        $modalEl.find('.modal-dialog').addClass('modal-xl');
    }

    var id = $this.attr('id');

    $modalEl.find('.modal-title').html(id);
    $modalEl.find('.modal-body').load(dataURL, function () {
        $modalEl.modal({ show: true });
    });

    $modalEl.find('modal-dialog').removeClass('modal-xl');
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
    $(event.target).parents('tr').remove();

    var i = 1;
    $('.' + getclass).each(function () {
        $(this).find('td label[name = number]').html(i);
        i++;
    });
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