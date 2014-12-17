app.directive('goopiSceneEdit', function() {
    return {
      restrict: 'E',
      transclude: false,
      scope: {
          templateUrl: '@',
          control: "=",
          scene: "=selectedScene",
          fonts: "=fonts",
          textPropertyChanged: "&",
          textElementSelected: "&",
          imageframePropertyChanged: "&",
          imageframeElemuploadLibraryentSelected: "&",
          upload_my_computer_clicked_callback: "&uploadMyComputerClicked",
          upload_my_library_clicked_callback: "&uploadMyLibraryClicked",
          upload_bank_clicked_callback:"&uploadBankClicked"
      },
      template: "<div ng-include='templateUrl'></div>",
      link: function(scope, element, attr, ctrl, transclude){
          
          scope.editCtrl=scope.control;
          scope.editCtrl.text_selected={};
          scope.editCtrl.imageframe_selected={};
          
          if(!scope.editCtrl)
              return;

          scope.editCtrl.changeSelectedText = function(text){
              console.log("Method changeSelectedText called");
              var c=0;             
              for(i in scope.scene.texts) {
                  if(text.id==scope.scene.texts[i].id) {
                     scope.selectText(c);
                     break;
                  }
                  c++;
              }
          };
          
          scope.selectTextCallback = function(index){
              index = typeof(index)==='undefined' ? 0 : index;
              
              if(!scope.scene.texts[index])
                  return;
                                      
              scope.textElementSelected({text_object:scope.scene.texts[index]});                         
          };
          
          scope.selectText = function(index){
              index = typeof(index)==='undefined' ? 0 : index;              
              var c=0;
              for(i in scope.scene.texts) {
                  if(c==index) {
                     scope.scene.texts[i].selected=true;
                     scope.editCtrl.text_selected=scope.scene.texts[i];
                     scope.text_index=c;
                  }
                  else {
                      scope.scene.texts[i].selected=false;
                  }
                  c++;
              }
          };
          
          scope.prevText = function(){
              if(scope.text_index>0) {
                  scope.selectTextCallback(scope.text_index-1);
              }
          };
          
          scope.nextText = function(){
              if(scope.text_index<scope.scene.texts.length-1) {
                  scope.selectTextCallback(scope.text_index+1);
              }
          };
          
          
          
          ///////////////////////////////////////////////////////////
          
          
          scope.editCtrl.changeSelectedImageframe = function(imageframe){
              console.log("Method changeSelectedImageframe called");
              var c=0;             
              for(i in scope.scene.texts) {
                  if(imageframe.id==scope.scene.imageframes[i].id) {
                     scope.selectImageframe(c);
                     break;
                  }
                  c++;
              }
          };
          
          scope.selectImageframeCallback = function(index){
              index = typeof(index)==='undefined' ? 0 : index;
              
              if(!scope.scene.imageframes[index])
                  return;
                                      
              scope.imageframeElementSelected({imageframe_object:scope.scene.imageframes[index]});                         
          };
          
          scope.selectImageframe = function(index){
              index = typeof(index)==='undefined' ? 0 : index;
              var c=0;
              for(i in scope.scene.imageframes) {
                  if(c==index) {
                     scope.scene.imageframes[i].selected=true;
                     scope.editCtrl.imageframe_selected=scope.scene.imageframes[i];
                     scope.imageframe_index=c;
                  }
                  else {
                      scope.scene.imageframes[i].selected=false;
                  }
                  c++;
              }
          };
          
          scope.prevImageframe = function(){
              if(scope.imageframe_index>0) {
                  scope.selectImageframeCallback(scope.imageframe_index-1);
              }
          };
          
          scope.nextImageframe = function(){
              if(scope.imageframe_index<scope.scene.imageframes.length-1) {
                  scope.selectImageframeCallback(scope.imageframe_index+1);
              }
          };
          
          scope.uploadMyComputer = function(scene,image_id){
            scope.upload_my_computer_clicked_callback({scene:scene,image_id:image_id});
          };
          
          scope.uploadLibrary = function(scene,image_id){
            scope.upload_my_library_clicked_callback({scene:scene,image_id:image_id});
          };
          
          scope.uploadBank = function(scene,image_id){
            scope.upload_bank_clicked_callback({scene:scene,image_id:image_id});
          };
          
          
      },
      controller: function ($scope, $element, $attrs) {
          
      }
    };
});