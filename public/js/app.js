var myApp = angular.module('myApp', [
	'ui.router',
	'ui.bootstrap'
]);

myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('/', {
			url: '/',
			templateUrl: 'views/events.html',
			controller: 'EventsCtrl'
		});
}]);
myApp.controller('EventsCtrl', ['$scope', '$http', '$uibModal', function($scope, $http, $uibModal) {
	$scope.events = [];
	$scope.drugs = [];
	$scope.reactions = [];
	$scope.page = 0;

	$scope.getEvents = function() {
		$http({
			method: 'GET',
			url: '/api/events',
			params: {
				page: $scope.page
			}
		}).then(function(resp) {
			$scope.events = resp.data;
		}, function(err) {
			$scope.errorMsg = err.data.errorMsg;
		});
	}
	$scope.getEvents();

	$scope.prevPage = function() {
		$scope.page -= ($scope.page > 0 ? 1 : 0);
		$scope.getEvents();
	}

	$scope.nextPage = function() {
		$scope.page += ($scope.events.length == 10 ? 1 : 0);
		$scope.getEvents();
	}

	$scope.deleteEvent = function(event) {
		$http({
			method: 'DELETE',
			url: '/api/events/'+event._id
		}).then(function(resp) {
			$scope.events.splice($scope.events.indexOf(event), 1);
		}, function(err) {
			$scope.errorMsg = err.data.errorMsg;
		});
	}

	$scope.openEditWindow = function(selectedEvent) {
		$uibModal.open({
			templateUrl: 'templates/modals/edit.html',
			controller: 'EditModalCtrl',
			resolve: {
				selectedEvent: function() {
					return selectedEvent;
				}
			}
		}).result.then(function(result) {
			if(selectedEvent) {
				selectedEvent = JSON.parse(JSON.stringify(result));
			} else {
				if($scope.page === 0) {
					$scope.events.unshift(result);
					$scope.events.pop();
				}
			}
		}, function() {
			// modal canceled/closed
		});
	}
}]);
myApp.controller('EditModalCtrl', ['$scope', '$http', '$uibModalInstance', 'selectedEvent', function($scope, $http, $uibModalInstance, selectedEvent) {
	$scope.drugs = [];
	$scope.reactions = [];
	$scope.mode = selectedEvent ? 'EDIT' : 'CREATE';
	$scope.selectedEvent = selectedEvent;
	console.log($scope.selectedEvent);

	$scope.saveEvent = function(event) {
		// If event is new then PUT, else if updating then POST
		$http({
			method: $scope.mode === 'CREATE' ? 'PUT' : 'POST',
			url: '/api/events/' + ($scope.mode === 'EDIT' ? $scope.selectedEvent._id : ''),
			data: event
		}).then(function(resp) {
			$uibModalInstance.close(resp.data);
		}, function(err) {
			$scope.errorMsg = err.data.errorMsg;
		});
	}

	$scope.cancel = function() {
		$uibModalInstance.dismiss();
	}

	$scope.getDrugs = function() {
		$http({
			method: 'GET',
			url: '/api/drugs'
		}).then(function(resp) {
			$scope.drugs = resp.data;
		}, function(err) {
			$scope.errorMsg = err.data.errorMsg;
		});
	}
	$scope.getDrugs();

	$scope.getReactions = function() {
		$http({
			method: 'GET',
			url: '/api/reactions'
		}).then(function(resp) {
			$scope.reactions = resp.data;
		}, function(err) {
			$scope.errorMsg = err.data.errorMsg;
		});
	}
	$scope.getReactions();

	$scope.addDrug = function() {
		$scope.selectedEvent.patient.drugs.push({
			autorizationNumber: null,
			DosageText: null,
			medicinalProduct: null,
			drugIndication: null
		});
	}

	$scope.removeDrug = function(index) {
		$scope.selectedEvent.patient.drugs.splice(index,1);
	}

	$scope.addReaction = function() {
		$scope.selectedevent.patient.reaction.push({
			meddraPrimaryTerm: null
		});
	}

	$scope.removeReaction = function(index) {
		$scope.selectedEvent.patient.reaction.splice(index,1);
	}
}]);