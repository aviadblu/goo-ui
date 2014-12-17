app.directive('goopiScenes', function() {
    return {
      restrict: 'E',
      transclude: false,
      scope: {
          templateUrl: '@',
          control: "=",
          scenes: "=",
          scene_clicked_callback:'&onSceneClicked'
      },
      template: "<div ng-include='templateUrl'></div>",
      link:function(scope, element, attr, ctrl) {       

        
        scope.scCtrl=scope.control;
        
        scope.scCtrl.MoveScenesStrip = function(dir){
            console.log("Method MoveScenesStrip called");
            if(dir=="forward"){
                scope.scenesForward();
                return;
            }
            
            if(dir=="backward"){
                scope.scenesBackward();
                return;
            }
            
        };

        scope.fixSelected = function(){
            var c=0;
            var index_selected=0;
            for(i in scope.scenes) {
                if(scope.scenes[i].selected) {
                   index_selected=c; 
                   break;
                }
                c++;
            }
            
            for(i in scope.scenes) {
                scope.scenes[i].selected=false;
            }
            scope.scenes[index_selected].selected=true;
        };
          
        
        // click callback
        scope.scene_clicked_dir = function(scene,index){
            for(i in scope.scenes) {
                scope.scenes[i].selected=false;
            }
            scope.scenes[index].selected=true;
            scope.scene_clicked_callback({scene_data:scene,scene_index:index});
        }; 

          
        // auto fix scroller according to screen size
        scope.scenesAutoFix = function(){        

            scope.scCtrl.scroller_left=10;
            scope.scCtrl.scene_scroll={
               left:scope.scCtrl.scroller_left+"px",
               width:"100%"
            };            

            var scene_element_w=getElementByClass("goopi_scene")[0].clientWidth;
            var scenes_wrapper_w=getElementByClass("goopi-scenes-container")[0].clientWidth;
            var scenesWidth=scope.scenes.length*scene_element_w;

            scope.scCtrl.max_left=scenesWidth-scenes_wrapper_w-15;

            if(scenesWidth>scenes_wrapper_w){
                scope.scCtrl.scene_scroll.width=scenesWidth+"px";
                //scope.scrollers_active=true;
                
                addClass(getElementByClass("scroller")[0],"active");
                addClass(getElementByClass("scroller")[1],"active");
            }
            else {
                //scope.scrollers_active=false;           
                removeClass(getElementByClass("scroller")[0],"active");
                removeClass(getElementByClass("scroller")[1],"active");
            }
            

            // overkill screen size rerendering
            if(scope.$$phase || scope.$root.$$phase) {} else {scope.$apply(function () {});} 
        };
        
        // scroll forward
        scope.scenesForward = function(){
            var scene_w=getElementByClass("goopi_scene")[0].clientWidth;
            scope.scCtrl.scroller_left-=scene_w;
            
            if(-scope.scCtrl.scroller_left>scope.scCtrl.max_left) {
                scope.scCtrl.scroller_left=-scope.scCtrl.max_left;
            }
            
            scope.scCtrl.scene_scroll.left=scope.scCtrl.scroller_left+"px";
            if(scope.$$phase || scope.$root.$$phase) {} else {scope.$apply(function () {});}
            
            //getElementByClass("scenes-scroll")[0].style.left=scope.scCtrl.scroller_left+"px";
        };
        
        // scroll backward
        scope.scenesBackward = function(){
            var scene_w=getElementByClass("goopi_scene")[0].clientWidth;
            scope.scCtrl.scroller_left+=scene_w;

            if(scope.scCtrl.scroller_left>10) {
                scope.scCtrl.scroller_left=10;
            }

            scope.scCtrl.scene_scroll.left=scope.scCtrl.scroller_left+"px";
            if(scope.$$phase || scope.$root.$$phase) {} else {scope.$apply(function () {});}
        };
        
      }
    };
});

app.directive('onResize', function() {    
    return {
      restrict: 'A',
      link:function(scope, element, attr, ctrl) {
        window.onresize =function(){            
            scope.$eval(attr.onResize);
        };
      }
    };
});