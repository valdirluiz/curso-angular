(function () {
  'use strict';

	angular.module("listaTelefonica").config(function (serialGeneratorProvider) {
		serialGeneratorProvider.setLength(10);
	});

})();