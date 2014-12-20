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
 
      },
      controller: function ($scope, $element, $attrs) {
          $scope.sliderStop = function(){
              var time=$scope.scene.starttimeontemplate;
              var scene_id=$scope.scene.id;
              $scope.scene.onload=true;
              if($scope.$$phase || $scope.$root.$$phase) {} else {$scope.$apply(function () {});} 
              $scope.slider_stop_callback({scene:$scope.scene,time:time});
              
          };


          $scope.$watch('scene', function(newValue, oldValue) {
                if(newValue) {
                    $scope.setMarks(newValue);
                }                
          });
           $scope.setMarks = function(scene) {
                var marks = 6;
          	setTimeout(function(){
                    var mark_html = '';               
                    var max = $scope.getDecTime(scene.duration);               
                    var step = max/marks;        
                    var per_part = 100 / marks;
                    for(var i=0; i<=marks;i++) {
                        mark_html+='<div class="mark" style="left:'+(i*per_part)+'%" >'+$scope.getTimeFrameFormat(step*i)+'</div>';
                        
                        if(i<marks)
                            mark_html+='<div class="half_mark" style="left:'+(i*per_part + (0.5*per_part))+'%" ></div>';
                    }                              
                    document.getElementById('frame_marks').innerHTML = mark_html;
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