app.directive('goopiSceneActions', function() {
    return {
      restrict: 'E',
      transclude: false,
      scope: {
          templateUrl: '@',
          control: "=",
          onActionClicked: "&",
          onPlayallClicked: "&",
          scenes_d: "=scenesd",
          scenes_n: "=scenesn"
      },
      template: "<div ng-include='templateUrl'></div>",
      link: function(scope, element, attr, ctrl, transclude){

       	scope.applyAction = function(action) {
       		scope.onActionClicked({action:action});	
       	};
       	
       	scope.playAll = function(){
       		scope.onPlayallClicked();
       	};
          
      },
      controller: function ($scope, $element, $attrs) {
          
      }
    };
});