define([], function () {

  //掌上体检接口
  _self.ZSTJApiEnv = "test";//接口环境
  _self.ZSTJAppKey = "HZ_PME_API_V1";
  _self.ZSTJAppSecret = "1!2@3#4$5%6^";
  //接口列表
  _self.BaseZSTJUrl = {};
  _self.BaseZSTJUrl.dev = "http://hzswvajgs01:90/api/V3/";
  _self.BaseZSTJUrl.test = "http://hzswvajgs01:142/api/V3/";

  _self.getBaseZSTJUrl = function () {
    return _self.BaseZSTJUrl[_self.ZSTJApiEnv];
  };
  return _self;
});
