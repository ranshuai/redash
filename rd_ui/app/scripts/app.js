angular.module('redash', [
    'redash.directives',
    'redash.admin_controllers',
    'redash.controllers',
    'redash.filters',
    'redash.services',
    'redash.renderers',
    'redash.visualization',
    'ui.codemirror',
    'highchart',
    'angular-growl',
    'angularMoment',
    'ui.bootstrap',
    'smartTable.table',
    'ngResource',
    'ngRoute'
]).config(['$routeProvider', '$locationProvider', '$compileProvider', 'growlProvider',
    function($routeProvider, $locationProvider, $compileProvider, growlProvider) {

        function getQuery(Query, $q, $route) {
            var defer = $q.defer();

            Query.get({
                'id': $route.current.params.queryId
            }, function(query) {
                defer.resolve(query);
            });

            return defer.promise;
        };

        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|http|data):/);
        $locationProvider.html5Mode(true);
        growlProvider.globalTimeToLive(2000);

        $routeProvider.when('/dashboard/:dashboardSlug', {
            templateUrl: '/views/dashboard.html',
            controller: 'DashboardCtrl'
        });
        $routeProvider.when('/queries', {
            templateUrl: '/views/queries.html',
            controller: 'QueriesCtrl',
            reloadOnSearch: false
        });
        $routeProvider.when('/queries/new', {
            templateUrl: '/views/queryview.html',
            controller: 'QueryViewCtrl',
            reloadOnSearch: false,
            resolve: {
                'viewSource': function isViewSource() {
                    return true;
                }
            }
        });
        // TODO
        // we should have 2 controllers: queryViewCtrl and queryEditCtrl
        $routeProvider.when('/queries/:queryId', {
            templateUrl: '/views/queryview.html',
            controller: 'QueryViewCtrl',
            reloadOnSearch: false,
            resolve: {
                'query': ['Query', '$q', '$route', getQuery]
            }
        });
        $routeProvider.when('/queries/:queryId/source', {
            templateUrl: '/views/queryview.html',
            controller: 'QueryViewCtrl',
            reloadOnSearch: false,
            resolve: {
                'query': ['Query', '$q', '$route', getQuery],
                'viewSource': function isViewSource() {
                    return true;
                }
            }
        });
        $routeProvider.when('/admin/status', {
            templateUrl: '/views/admin_status.html',
            controller: 'AdminStatusCtrl'
        });
        $routeProvider.when('/', {
            templateUrl: '/views/index.html',
            controller: 'IndexCtrl'
        });
        $routeProvider.otherwise({
            redirectTo: '/'
        });


    }
]);