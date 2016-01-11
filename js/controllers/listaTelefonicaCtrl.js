(function () {
  'use strict';

	angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, contatosAPI, operadorasAPI, serialGenerator) {

		$scope.app = "Lista Telefonica";

		$scope.contatos = [];

		$scope.operadoras = [];

		var carregarContatos = function(){
			contatosAPI.getContatos().success(function(data){
				$scope.contatos = data;
			});
		};

		var carregarOperadoras = function(){
			operadorasAPI.getOperadoras().success(function(data){
				$scope.operadoras = data;
				}).error(function(data){
					$scope.message = "Aconteceu um problema ao carregar operadoras: " + data;
				});
		};

		$scope.adicionarContato = function(contato){
			contato.cor = "red";
			contato.data = new Date();
			contato.serial = serialGenerator.generate();
			contatosAPI.saveContato(contato).success(function(data){
				delete $scope.contato;
				$scope.contatoForm.$setPristine();
				carregarContatos();
			}).error(function(data){
				$scope.message = "Falha ao salvar contato";
			});
			carregarContatos();
			delete $scope.contato;
			$scope.contatoForm.$setPristine();
		};

		$scope.apagarContatos = function(contatos){
			$scope.contatos = contatos.filter(function(contato){
				if(!contato.selecionado) return contato;
			});
		};

		$scope.isContatoSelecionado = function(contatos){
			return contatos.some(function(contato){
				return contato.selecionado;
			});
		};

		$scope.odernarPor  = function(campo){
			$criterioDeOrdenacao = campo;
			$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
		};

		carregarContatos();
		carregarOperadoras();

	});

})();