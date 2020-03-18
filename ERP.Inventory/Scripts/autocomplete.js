/**
 * 
 * @param {any} inp             specific Element
 * @param {any} arr             JSON ARRAY
 * @param {any} searchByWord    WORD BY WORD
 * @param {any} keyID           ID for everyData
 * @param {any} keyText         Text for displaying
 * @param {any} template        RETURN template
 * 
 * //USAGE
 * var jArray = {ID:1, Text:"Sample"}
 *  autocomplete(document.getElementById("myInput"), jArray, true, "ID", "Text", (el, data) => {
 *               if (el.order % 2 == 0)
 *                   el.style.backgroundColor = 'blue';
 *           });
 */


function autocomplete(inp, arr, searchByWord = false, keyID = 'ID', keyText = 'Name', template = function (el, data = null) { }, limit = 10) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    var autocompleteDIV;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        //a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", this.id + "autocomplete-list autocomplete-items");
        autocompleteDIV = a;
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);

        /*Splitting word by space*/
        var inputArray = val.toUpperCase().split(' ');

        /*for each item in the array...*/
        var count = 0;
        for (i = 0; i < arr.length; i++) {

            /*Customizing Search based on compatibility*/
            //======================= WORD BY WORD SEARCH ================================
            if (searchByWord) {

                //CHECKING IF EVERY WORD EXISTS
                var compatible = true;
                for (var j = 0; j < inputArray.length; j++) {

                    if (arr[i][keyText].toUpperCase().indexOf(inputArray[j]) < 0) {
                        compatible = false;
                        break;
                    }
                }

                if (compatible) {
                    count++;
                    //CREATING ELEMENT FOR THE RESULT
                    var str = arr[i];
                    b = document.createElement("DIV");
                    b.innerHTML = arr[i][keyText];
                    /*insert a input field that will hold the current array item's value:*/
                    b.innerHTML += "<input type='hidden' value='" + arr[i][keyText] + "' data-id='" + arr[i][keyID] + "'>";
                    /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener("click", function (e) {
                        /*insert the value for the autocomplete text field:*/
                        inp.value = this.getElementsByTagName("input")[0].value;
                        inp.setAttribute("data-id", this.getElementsByTagName("input")[0].getAttribute("data-id"));
                        /*close the list of autocompleted values,
                        (or any other open lists of autocompleted values:*/
                        closeAllLists();
                    });
                    b.order = count;

                    //RETURN via template
                    if (template != null)
                        template(b, arr[i]);

                    a.appendChild(b);
                }
                //========================================================================
                //============================= END OF WORD BY WORD=======================
                //========================================================================

            }
            else {
                //=======================================================================
                //====================== SEARCH FIRST LETTER ============================
                //=======================================================================
                /*check if the item starts with the same letters as the text field value:*/

                if (arr[i][keyText].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                    count++;
                    /*create a DIV element for each matching element:*/
                    b = document.createElement("DIV");
                    /*make the matching letters bold:*/
                    b.innerHTML = "<strong>" + arr[i][keyText].substr(0, val.length) + "</strong>";
                    b.innerHTML += arr[i][keyText].substr(val.length);
                    /*insert a input field that will hold the current array item's value:*/
                    b.innerHTML += "<input type='hidden' value='" + arr[i] + "' data-id='" + arr[i][keyID] + "'>";
                    /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener("click", function (e) {
                        /*insert the value for the autocomplete text field:*/
                        inp.value = this.getElementsByTagName("input")[0].value;
                        inp.setAttribute("data-id", this.getElementsByTagName("input")[0].getAttribute("data-id"));
                        /*close the list of autocompleted values,
                        (or any other open lists of autocompleted values:*/
                        closeAllLists();
                    });
                    b.order = count;

                    //SETUP TEMPLATE
                    if (template != null)
                        template(b, arr[i]);


                    a.appendChild(b);
                }

                //=======================================================================
                //====================== END SEARCH FIRST LETTER ==================================
                //=======================================================================
            }

            //Limiting
            if (count == limit)
                break;
        }
        //GET UNIQUES
        var uniqueArray = inputArray.filter(function (item, pos) {
            return inputArray.indexOf(item) == pos;
        });
        //HIGHLIGHTING TEXT FOR THE RESULT
        if (searchByWord) {
            for (var k = 0; k < uniqueArray.length; k++) {
                highlight(this.id + "autocomplete-list", uniqueArray[k]);
            }
        }

    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = autocompleteDIV;//document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    function highlight(elClass, texts) {
        var inputTexts = document.getElementsByClassName(elClass)[0].children;
        //LOOP FOR THE HTML ELEMENTS
        for (var i = 0; i < inputTexts.length; i++) {


            var inputText = inputTexts[i];
            var innerHTML = inputText.innerHTML;

            var index = innerHTML.toLowerCase().indexOf(texts.toLowerCase());

            //Catching B for error HTML displays in options
            if (texts == 'B') {
                if (innerHTML.charAt(index + 1) == '>')
                    continue;
            }

            //FORMATTING DISPLAY AND BOLDING COMPATIBLE WORD OR TEXT
            if (index >= 0) {
                innerHTML = innerHTML.substring(0, index) + "<b>" + innerHTML.substring(index, index + texts.length) + "</b>" + innerHTML.substring(index + texts.length);
                inputText.innerHTML = innerHTML;
            }
        }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}