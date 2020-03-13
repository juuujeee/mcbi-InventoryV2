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
    var user = $.cookie('UserID');
    var token = $.cookie('Token');
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
