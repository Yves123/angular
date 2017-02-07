var base = '/script/js';
var urlArgs = "CDNVersion=" + new Date().getTime();

require.config({
    baseUrl: base,
    urlArgs: urlArgs,
    waitSeconds: 200,
    paths: {
        angular: 'lib/angular.min',
        router: 'lib/angular-route.min',
        jquery:'lib/jquery-1.11.3.min',
        bootStrap: 'lib/bootstrap.min',
        sysConfig: 'common/SysConfig',
        indexApp: 'app/indexApp',
        loginApp: 'app/loginApp',
        jqueryMD5: 'lib/jquery.md5',
        jQueryUi: 'lib/jquery-ui.min',
    },
    shim: {
        angular:{
            exports:'angular'
        },
        router: {
            deps: ['angular'],
            exports:'router'
        },
        bootStrap: {
            deps: ['jquery'],
            exports:'bootStrap'
        }        
    }
});
