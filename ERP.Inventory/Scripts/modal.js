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
function setModal() {

    // Get the button that opens the moda
    //var btn = document.getElementById(".open-dialog");


    // When the user clicks the button, open the modal 
    //console.log($('#' + el + ' .open-dialog').html());
    document.getElementsByClassName('open-dialog')[0].onclick =  function () {
    window.modal = document.getElementById("myModal");
        window.modal.style.display = "block";
        var getID = $(this).parents('.content').find('input[type=radio]').val();

        window.modal.setAttribute('data-id', getID);

        //console.log(getID);
        //console.log(window.ControlList);

        //return;
        if (window.ControlList != undefined) {

            for (var i = 0; i < window.ControlList.length; i++) {
                if (window.ControlList[i].ID == getID) {

                    //console.log(window.ControlList[i]);
                    $(window.modal).find('h2').html(window.ControlList[i].controlName);
                    $(window.modal).find('.control-modal-display-title').val(window.ControlList[i].title);
                    $(window.modal).find('.control-modal-display-description').val(window.ControlList[i].description);

                }
            }

        }



    };

    // When the user clicks on <span> (x), close the modal

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close");

    for (var i = 0; i < span.length; i++) {
        span[i].onclick = function () {
            window.modal.style.display = "none";
            //console.log('hide1');
        }
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == window.modal) {
            window.modal.style.display = "none";
        }
    }
}


// for actions
function actionModal() {
    //console.log(modal);

    // Get the button that opens the moda
    //var btn = document.getElementById(".open-dialog");


    
    // When the user clicks the button, open the modal 

    document.getElementsByClassName('open-dialog1')[0].onclick = function () {
    window.modal = document.getElementById("myModalactions");
        window.modal.style.display = "block";

        var getID = $(this).parents('.content').find('input[type=checkbox]').val();
        window.modal.setAttribute('data_id_actions', getID);

        var v = window.ActionList;
        var b = window.ControlAccess;
        var c = window.ControlDataInput;
        window.modal.setAttribute('ControlID', c);


        console.log(c);

        //return;
        if (window.ActionList != undefined) {

            for (var i = 0; i < window.ActionList.length; i++) {
                for (var m = 0; m < window.ControlAccess.length; m++) {
                    if (window.ActionList[i].ID == getID || window.ControlAccess[m].ID == getID) {
                        if (c == window.ControlAccess[m].controlID) {

                            //console.log(window.ControlAccess[m].controlID);

                            $(modal).find('h2').html(window.ControlAccess[m].Action2);
                            $(modal).find('.Action_Action').val(window.ControlAccess[m].Action);
                            $(modal).find('.Action_Tittle').val(window.ControlAccess[m].controlAccessDisplayTitle);
                            $(modal).find('.Action_Des').val(window.ControlAccess[m].controlAccessDescription);
                            $(modal).find('.Action_CustomEl').val(window.ControlAccess[m].customElement);
                            $(modal).find('.CheckDisable').val(window.ControlAccess[m].isHideifDisabled);
                            /*$(modal).find('.control-modal-display-description').val(window.ActionList[i].description);*/
                        }
                    }
                }
            }
        }



    };

    // When the user clicks on <span> (x), close the modal
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close");

    for (var i = 0; i < span.length; i++) {
        span[i].onclick = function () {
            window.modal.style.display = "none";
        }
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == window.modal) {
            window.modal.style.display = "none";
        }
    }

}
function modalClose() {
    window.modal.style.display = "none";
}