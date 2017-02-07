define([], function () {
  var viewModel = function(){
		var self = this;

        self.convertFromDepart = function(dataModel){
            var result = {
                name: '天气不错',
                count: '2017-02-06'
            };
            return result;
        };
	};
	return viewModel;
});