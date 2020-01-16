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