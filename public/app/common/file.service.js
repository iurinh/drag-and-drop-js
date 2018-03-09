var fileService = {
    read: _read
}

function _read(uri){
    return new Promise(function(response){
        try{
            var xmlhttp;

            if (window.XMLHttpRequest)
                xmlhttp = new XMLHttpRequest();
            else
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

            xmlhttp.open("GET", uri, true);

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    var text = xmlhttp.responseText;

                    response(text.replace(/\n/g,""));
                }
            }

            xmlhttp.send();
        } catch(err){
            response();
        }
    })
}
