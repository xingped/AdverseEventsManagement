myApp.controller('EditModalCtrl', ['$scope', '$http', '$uibModalInstance', 'selectedEvent', function($scope, $http, $uibModalInstance, selectedEvent) {
	$scope.drugs = [];
	$scope.reactions = [];
	$scope.mode = selectedEvent ? 'EDIT' : 'CREATE';
	if(selectedEvent) $scope.selectedEvent = selectedEvent;
	console.log($scope.selectedEvent);

	$scope.saveEvent = function() {
		// If event is new then PUT, else if updating then POST
		$http({
			method: $scope.mode === 'CREATE' ? 'PUT' : 'POST',
			url: '/api/events/' + ($scope.mode === 'EDIT' ? $scope.selectedEvent._id : ''),
			data: $scope.selectedEvent
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