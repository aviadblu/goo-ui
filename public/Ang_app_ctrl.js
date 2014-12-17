var app = angular.module('goopiEditingPageApp', ['ui.bootstrap','colorpicker.module','ngTouch']);
app.controller('goopiEditingPageCtrl', function($scope,$http,$rootScope) {

    // demo ////////////////////////////////////////////
    var demo = true;
    getApiUrl = function(call){
        if(demo) {
            return "ajaxDemo/"+call+".json";
        }
        else {
            return "/api/"+call
        }
    };
    ////////////////////////////////////////////////////         

    // ajax data ///////////////////////////////////////
    $http.get(getApiUrl('scenes'))
    .success(function(data, status, headers, config) {
        $scope.scenes=data;
        for(i in data) {
            if(data[i].selected){
               $scope.selected_scene=data[i]; 
            }                
        }
    });
    
    $http.get(getApiUrl('fonts'))
    .success(function(data, status, headers, config) {
        $scope.fonts=data;
    });
    
    ////////////////////////////////////////////////////

        
    
    
    
    
    // frame callbacks: ////////////////////////////////
    $scope.renderFrame = function(scene,time) {
        console.log("callback: on-slider-stop | scene_id: "+scene.ID+" | time: "+time);
        $http.get(getApiUrl('render_frame'),{scene:scene,time:time})
        .success(function(data, status, headers, config) {
            
            $scope.selected_scene=data;
            $scope.selected_scene.onload=false;
            
        });        
    };
    
    $scope.frameImageClicked = function(scene_object){
        console.log("callback: image-clicked | scene_id: "+scene_object.ID);
    };
    
    ////////////////////////////////////////////////////
    
    
    
    
    
    
    
    
    
    // edit scenes callbacks: //////////////////////////
    
    // scope share object
    $scope.editSceneCtrl = {};
    
    
    $scope.updateTextObjectChanged = function(text_object){
        console.log("callback: text-property-changed | text_object_id: "+text_object.id);
    };            
    
    $scope.textObjectSelected = function(text_object) {
        console.log("callback: text-element-selected | text_object_id: "+text_object.id);
        // call to update UI method
        $scope.editSceneCtrl.changeSelectedText(text_object);
    };
    
    $scope.updateImageframeObjectChanged = function(imageframe_object){
        console.log("callback: imageframe-property-changed | imageframe_object_id: "+imageframe_object.id);
    };    
    
    $scope.imageframeObjectSelected = function(imageframe_object){
        console.log("callback: text-element-selected | imageframe_object_id: "+imageframe_object.id);
        // call to update UI method        
        $scope.editSceneCtrl.changeSelectedImageframe(imageframe_object);
    };
    
    $scope.onUploadMyComputer = function(scene,image_id){
        console.log("callback: upload-my-computer-clicked | image_id: "+image_id);        
    };
    
    $scope.onUploadMylibrary = function(scene,image_id){
        console.log("callback: upload-my-library-clicked | image_id: "+image_id);        
    };
    
    $scope.onUploadBank = function(scene,image_id){
        console.log("callback: upload-bank-clicked | image_id: "+image_id);        
    };
    
    $scope.approveMultiline = function(text_object) {
        return false;
    }
        
    /////////////////////////////////////////////////////
    
    
    
    
    
    
    
    
    
    // scenes callbacks: ////////////////////////////////
    
    $scope.scenesCtrl = {};
    
    $scope.sceneClicked = function(scene_data,scene_index){
        console.log("callback: on-scene-clicked | scene_id: "+scene_data.ID);        
        $scope.selected_scene=scene_data;
    };
    
    // method:
    /*
    setTimeout(function(){
        $scope.scenesCtrl.MoveScenesStrip("forward");
    },1000);
    
    setTimeout(function(){
        $scope.scenesCtrl.MoveScenesStrip("forward");
    },2000);

    setTimeout(function(){
        $scope.scenesCtrl.MoveScenesStrip("backward");
    },3500);
    
    setTimeout(function(){
        $scope.scenesCtrl.MoveScenesStrip("backward");
    },4200);
    */
    /////////////////////////////////////////////////////
    
       
       
    // scene action callbacks:
    $scope.scenes_d = getTimeFrameFormat(19.3);
    $scope.scenes_n = 5;
    $scope.sceneActionClicked = function(action) {
    	console.log("callback: on-action-clicked | action: "+action);
    };
    
    $scope.scenePlayallClicked = function() {
    	console.log("callback: on-playall-clicked");
    };

});

app.directive('repeatDone', function() {
    return function(scope, element, attrs) {
        if (scope.$last) { // all are rendered
            scope.$eval(attrs.repeatDone);
        }
    }
});