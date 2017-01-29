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