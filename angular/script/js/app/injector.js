define(['angular', 'sysConfig','router'],function(angular, sysConfig){
	var injectorObj={};

	var authHandler=function(app){                     // 添加Basic 验证
		app.config(function($httpProvider){
			//delete $httpProvider.defaults.headers.common['X-Requested-With'];
			var safeStr = unescape(encodeURIComponent('12345678'));
			var btoaCode = btoa(safeStr);
			btoaCode = "Basic " + btoaCode;
			$httpProvider.defaults.headers.common['Authorization']=btoaCode;
			$httpProvider.defaults.headers.post['Authorization']=btoaCode;
		});
	};

	var httpFilterHandler=function(app){
		app.factory('httpInterceptor', ['$q','$injector',function($q, $injector) {
		    var penddingRequestCount=0;
		    var httpInterceptor = {
		      request : function(config) {//请求
		      	if(config.url.indexOf('/api/')>-1){
						// if(config.url.indexOf(sysConfig.BaseUrl[sysConfig.ApiEnv])>-1){
		      		penddingRequestCount++;
		      	}
		        return config;
		      },
		      requestError : function(config){ //请求没发送成功
		      	if(config.url.indexOf('/api/')>-1){
		      		penddingRequestCount--;
		      		if(penddingRequestCount==0){
		      		}

		      	}
		        return $q.reject(config);
		      },
		      response : function(response) {//请求接收成功，响应
		      	if(response.config.url.indexOf('/api/')>-1){
		      		penddingRequestCount--;
		      		if(penddingRequestCount==0){

		      		}
		      	}
		        return response;
		      },
		      responseError : function(response) {//接收到请示但失败
		      	if(response.config.url.indexOf('/api/')>-1){
		      		penddingRequestCount--;
		      		if(penddingRequestCount==0){

		      		}
		      	}
		        return $q.reject(response);
		      }
		    };
		  return httpInterceptor;
		}]);
		app.config(['$httpProvider', function($httpProvider) {
		  $httpProvider.interceptors.push('httpInterceptor');
		}]);
	};

	injectorObj.AuthHandler=authHandler;
	injectorObj.HttpFilterHandler=httpFilterHandler;

	return injectorObj;
});
