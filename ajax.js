var ajaxRequestCache = [];
var cAjaxRequestsInUse = 0;
// calls fnApply(fSuccess, responseText, targetInfo) when data is ready or on failure.
function doAjaxPost(queryURL, targetInfo, fnApply) {
    var req;

    if (ajaxRequestCache.length) {
        req = ajaxRequestCache.pop();
    } else {
        if (window.XMLHttpRequest) {     
            // Standard object - Firefox, Safari, ...
            req = new XMLHttpRequest();
        } else // assume if (window.ActiveXObject)
        {    
            // Internet Explorer 
            req = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    cAjaxRequestsInUse++;
    req.onreadystatechange = function() {          
        if (req.readyState  == 4) {              
            if (req.status  == 200) {
                fnApply(true, req.responseText, targetInfo);
            } else {
                fnApply(false, req.status, targetInfo);
            }    
            ajaxRequestCache.push(req);
            cAjaxRequestsInUse--;
        }
    }
    var i = queryURL.indexOf('?');
    if (i == -1) {
        req.open('POST', queryURL, true);
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.send('');
    } else {
        req.open('POST', queryURL.substr(0, i), true);
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.send(queryURL.substring(i + 1));
    }
}

// targetInfo = element ID
function fnApplyToInnerHTML(fSuccess, responseText, targetInfo) {
    document.getElementById(targetInfo).innerHTML = responseText;
}

// targetInfo = element ID
function fnApplyToValue(fSuccess, responseText, targetInfo) {
    document.getElementById(targetInfo).value = responseText;
}

// targetInfo = element
function fnApplyEToInnerHTML(fSuccess, responseText, targetInfo) {
    targetInfo.innerHTML = responseText;
}

// targetInfo = element
function fnApplyEToValue(fSuccess, responseText, targetInfo) {
    targetInfo.value = responseText;
}

