/*$('.open-dialog').click(function (e) {
    e.preventDefault();
    var $modalEl = $('#Default-Modal');
    var $this = $(this);
    var dataURL = $this.attr('data-href');
    //var modalSize = $this.attr('data-modal-size');
    //var size = 'modal-' + modalSize;
    //if (modalSize !== '') {
    //$modalEl.find('.modal-dialog').addClass(size);
    //}
    var id = $this.parents('.content__text').find('span');
    $modalEl.find('.modal-title').html(id);
    
        $modalEl.modal({ show: true});
        //$modalEl.addClass('modal-static');
})*/
function setModal(el = "myModal") {
    var modal = document.getElementById(el);

    // Get the button that opens the moda
    //var btn = document.getElementById(".open-dialog");


    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 

    $('.open-dialog').on("click", function () {
        modal.style.display = "block";
    });

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}