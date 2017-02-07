define(['angular', 'jquery', 'sysConfig','jqueryMD5'], function (angular, $, config) {
  var _self = {};

  //***********Ajax Loading****************

  _self.showAjaxLoading = function () {
    if ($('#Overlay').length > 0) {
      $('#Overlay').show();
      return;
    }
    var divObj = $('<div id="Overlay"></div>');
    divObj.css({
      'position': 'absolute',
      'top': '0',
      'left': '0',
      'z-index': '9999',
      'opacity': '0.5',
      'width': '100%',
      'height': '100%'
    });
    var imgObj = $('<img src="/img/loading.gif"/>');
    imgObj.css({
      'width': '32px',
      'height': '32px',
      'position': 'absolute',
      'top': '50%',
      'left': '50%',
      'margin-left': '-16px',
      'margin-top': '-16px'
    });
    divObj.append(imgObj);
    $('body').append(divObj);
  };

  _self.hideAjaxLoading = function () {
    $('#Overlay').hide();
  };

  //***********Ajax Get/Post****************
  _self.ajaxGet = function (http, url, successCallback, errorCallback) {
    url = url.replace(/api\//, '');
    var decodedURL = decodeURIComponent(url);
    // console.log(decodedURL);
    var timespan = appendTimeSpan(decodedURL);
    decodedURL = config.getBaseUrl() + decodedURL + timespan;
    url = config.getBaseUrl() + url + timespan;
    var authString = getBasicAuthHandler(decodedURL);

    http.defaults.headers.common['Authorization'] = authString;
    http.defaults.headers.post['Authorization'] = authString;

    http.get(url)
      .success(function (result) {
        successCallback(result);
      })
      .error(function (err) {
        errorCallback(err);
      });
  };

  _self.ajaxPost = function (http, url, data, successCallback, errorCallback) {
    url = url.replace(/api\//, '');
    url = config.getBaseUrl() + url;
    url += appendTimeSpan(url);
    var authString = getBasicAuthHandler(url, data);

    http.defaults.headers.common['Authorization'] = authString;
    http.defaults.headers.post['Authorization'] = authString;

    http.post(url, data)
      .success(function (result) {
        successCallback(result);
      })
      .error(function (err) {
        errorCallback(err);
      });
  };

  //***********操作结束提示******************

  _self.showFade = function (val, xPencent, yPencent) {
    var fadeDiv = $('#showDiv');
    if (fadeDiv.length == 0) {
      fadeDiv = $('<div id=\'showDiv\'></div>');
      $('body').append(fadeDiv);
    }
    if (xPencent == undefined) {
      xPencent = '50%';
    }
    if (yPencent == undefined) {
      yPencent = '50%';
    }
    fadeDiv.html(val);
    fadeDiv.css({
      'z-index': '9999',
      'background': 'rgba(150,227,158,0.8)',
      '-moz-border-radius': '5px',
      '-weikit-border-radius': '5px',
      'border-radius': '5px',
      'color': '#046509',
      'border': '1px solid #76d778',
      'text-align': 'center',
      'padding': '8px 50px',
      'position': 'fixed',
      'top': yPencent,
      'left': xPencent,
      'margin-left': '-125px',
      'display': 'none'
    });
    $('#showDiv').fadeIn(500);
    $('#showDiv').fadeOut(3000);
  };

  var getHttpAuthSignHandler = function (httpUrl, postData) {
    var preSign = httpUrl;
    if (postData) {
      postData = JSON.stringify(postData);
      preSign += '|' + postData;
    }
    preSign += '|' + config.AppSecret;
    var sign = $.md5(preSign);
    return sign;
  };

  var getBasicAuthHandler = function () {
    var httpUrl = arguments[0];
    var postData = arguments[1];
    var sign = getHttpAuthSignHandler(httpUrl, postData);
    var safeStr = unescape(encodeURIComponent(config.AppKey + ':' + sign));
    var btoaCode = btoa(safeStr);
    btoaCode = 'Basic ' + btoaCode;
    return btoaCode;
  };
  return _self;
});
