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