app.directive('goopiFrame', function($interpolate,$compile) {
    return {
      restrict: 'E',
      scope: {
          templateUrl: '@',
          scene: "=selectedScene",
          slider_stop_callback: "&onSliderStop",
          imageClicked: "&"
      },
      template: "<div ng-include='templateUrl'></div>",
      link: function(scope, element, attr, ctrl, transclude){
          scope.getDecTime = function(ssff){
              if(typeof(ssff)=== 'undefined')
                  return;
            var du=ssff.split(":");
            var duration_sec=parseInt(du[0])+parseInt(du[1])/100;
            return duration_sec;
         };

          scope.getTimeFrameFormat = getTimeFrameFormat;
          
          scope.sliderTime=0;
          
          scope.DecToSSFF = function(dec){
              return getTimeFrameFormat(dec);
          };
          
          scope.marks = [
	          	{text:"00:00",left:0}
	          ];
          //scope.getDecTime(scene.starttimeontemplate);

          
          
      },
      controller: function ($scope, $element, $attrs) {
          $scope.sliderStop = function(){
              var time=$scope.scene.starttimeontemplate;
              var scene_id=$scope.scene.id;
              $scope.scene.onload=true;
              if($scope.$$phase || $scope.$root.$$phase) {} else {$scope.$apply(function () {});} 
              $scope.slider_stop_callback({scene:$scope.scene,time:time});
              
          };

		  $scope.setMarks = function(scene) {
		  	return;
          	console.log(scene.duration)
          	setTimeout(function(){
          		$scope.marks.push({text:"02:00",left:50});
          		if($scope.$$phase || $scope.$root.$$phase) {} else {$scope.$apply(function () {});}
          	});
    		
          };
      }
    };
});


app.directive('sliderStop', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link:function(scope, element, attr, ctrl) {                           
        element.bind("change",function(){            
            scope.$eval(attr.sliderStop);
        });
      }
    };
});