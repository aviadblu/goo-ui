// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var time; 
try {
    time = require('time');
}
catch(err) {
    time = false;
    console.log("TIme error...");
}

// configuration =================

mongoose.connect('mongodb://aviad:123456@ds063769.mongolab.com:63769/test1');     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('combined'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());




// model:


var Scene     = require('./app/models/scene');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router


// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
        //app.use(getDateTime);
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});

getDateTime = function() {
    var today;
    if(!time) {
        today = new Date();
    }
    else {
        today = new time.Date();
        today.setTimezone("Asia/Jerusalem");
    }
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var h=today.getHours();
    var i=today.getMinutes();
    var s=today.getSeconds()
    
    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    today = dd+'/'+mm+'/'+yyyy+' '+h+":"+i+":"+s;
    return today;
   
}

function merge_options(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}

getTimeFrameFormat = function(dec){
    // convert time in decimal format to ss:ff format for display
    var ss=String(dec).match(/(\d+)(\.\d+)?/);
    if(!ss) {
        return;
    } 
    
    if(!ss[2]) {
        ss[2]=0;
    }

    ss[2]=parseInt(ss[2]*100);

    var f=parseInt(ss[1])>=10?ss[1]:"0"+ss[1];
    var s=parseInt(ss[2])>=10?ss[2]:"0"+ss[2];

    return f+":"+s;
};



// api ---------------------------------------------------------------------
// 

app.get('*', function (req, res) {
  res.send('hello, world!')
});


// get all scenes 
app.get('/api/scenes_bulk_update', function(req, res) {



    Scene.find(function(err, scenes) {
        for(i in scenes){
            console.log(scenes[i]._id);
            Scene.remove({
                _id : scenes[i]._id
            }, function(err, scene) {
                
            });
        }
        //res.json({ message: 'Scene '+scenes[i]._id+' deleted!' });
        
    });
 
    var scenes=[
        {
            name:"Scene 1 test",
            imageURL:"img/showImg1.jpg",
            currentimageURL:"img/showImg1.jpg",
            onload:false,
            duration:"04:02",
            starttimeontemplate:"00:00",
            enabled:true,
            selected:false,
            texts:[
                    {
                            name: "String name 1",
                            enabled: true,
                            selected: true,
                            value: "Text 1 content",
                            fontfamily: "ACaslonPro-BoldItalic",
                            fillcolor: "#00ff22",
                            strokecolor: "#000000",
                            fontsize: 32,
                            originalid: "1234"            
                    },
                    {
                            name: "String name 2",
                            enabled: true,
                            selected: false,
                            value: "Text 2 content",
                            fontfamily: "ACaslonPro-BoldItalic",
                            fillcolor: "#00cc88",
                            strokecolor: "#000000",
                            fontsize: 24,
                            originalid: "1234"            
                    }
                ],
            imageframes:[
                    {
                            name: "Image name 1",
                            enabled: true,
                            selected: true,
                            isvideo: false,
                            videosubtype: "",
                            duration: "00:00",
                            minimalduration: "00:00",
                            snapshoturl: "img/snapshot1.jpg",
                            originalid: "1234"  
                    },
                    {
                            name: "Image name 2",
                            enabled: true,
                            selected: false,
                            isvideo: false,
                            videosubtype: "",
                            duration: "00:00",
                            minimalduration: "00:00",
                            snapshoturl: "img/snapshot2.jpg",
                            originalid: "1234"  
                    }
            ]
        },
        {
            name:"Scene 2",
            imageURL:"img/showImg2.jpg",
            currentimageURL:"img/showImg2.jpg",
            onload:false,
            duration:"05:22",
            starttimeontemplate:"00:00",
            enabled:true,
            selected:false,
            texts:[
                    {
                            name: "String name 1",
                            enabled: true,
                            selected: true,
                            value: "Text 1 content",
                            fontfamily: "ACaslonPro-BoldItalic",
                            fillcolor: "#00ff22",
                            strokecolor: "#000000",
                            fontsize: 32,
                            originalid: "1234"            
                    },
                    {
                            name: "String name 2",
                            enabled: true,
                            selected: false,
                            value: "Text 2 content",
                            fontfamily: "ACaslonPro-BoldItalic",
                            fillcolor: "#00cc88",
                            strokecolor: "#000000",
                            fontsize: 24,
                            originalid: "1234"            
                    }
                ],
            imageframes:[
                    {
                            name: "Image name 1",
                            enabled: true,
                            selected: true,
                            isvideo: false,
                            videosubtype: "",
                            duration: "00:00",
                            minimalduration: "00:00",
                            snapshoturl: "img/snapshot1.jpg",
                            originalid: "1234"  
                    },
                    {
                            name: "Image name 2",
                            enabled: true,
                            selected: false,
                            isvideo: false,
                            videosubtype: "",
                            duration: "00:00",
                            minimalduration: "00:00",
                            snapshoturl: "img/snapshot2.jpg",
                            originalid: "1234"  
                    }
            ]
        },
        {
            name:"Scene 3",            
            imageURL:"img/showImg3.jpg",
            currentimageURL:"img/showImg3.jpg",
            onload:false,
            duration:"04:00",
            starttimeontemplate:"00:00",
            enabled:true,
            selected:true,
            texts:[
                    {
                            name: "String name 1",
                            enabled: true,
                            selected: true,
                            value: "Text 1 content",
                            fontfamily: "ACaslonPro-BoldItalic",
                            fillcolor: "#00ff22",
                            strokecolor: "#000000",
                            fontsize: 32,
                            originalid: "1234"            
                    },
                    {
                            name: "String name 2",
                            enabled: true,
                            selected: false,
                            value: "Text 2 content",
                            fontfamily: "ACaslonPro-BoldItalic",
                            fillcolor: "#00cc88",
                            strokecolor: "#000000",
                            fontsize: 24,
                            originalid: "1234"            
                    }
                ],
            imageframes:[
                    {
                            name: "Image name 1",
                            enabled: true,
                            selected: true,
                            isvideo: false,
                            videosubtype: "",
                            duration: "00:00",
                            minimalduration: "00:00",
                            snapshoturl: "img/snapshot1.jpg",
                            originalid: "1234"  
                    },
                    {
                            name: "Image name 2",
                            enabled: true,
                            selected: false,
                            isvideo: false,
                            videosubtype: "",
                            duration: "00:00",
                            minimalduration: "00:00",
                            snapshoturl: "img/snapshot2.jpg",
                            originalid: "1234"  
                    }
            ]
        },
        {
            name:"Scene 4",            
            imageURL:"img/showImg4.jpg",
            currentimageURL:"img/showImg4.jpg",
            onload:false,
            duration:"06:30",
            starttimeontemplate:"00:00",
            enabled:true,
            selected:false,
            texts:[
                    {
                            name: "String name 1",
                            enabled: true,
                            selected: true,
                            value: "Text 1 content",
                            fontfamily: "ACaslonPro-BoldItalic",
                            fillcolor: "#00ff22",
                            strokecolor: "#000000",
                            fontsize: 32,
                            originalid: "1234"            
                    },
                    {
                            name: "String name 2",
                            enabled: true,
                            selected: false,
                            value: "Text 2 content",
                            fontfamily: "ACaslonPro-BoldItalic",
                            fillcolor: "#00cc88",
                            strokecolor: "#000000",
                            fontsize: 24,
                            originalid: "1234"            
                    }
                ],
            imageframes:[
                    {
                            name: "Image name 1",
                            enabled: true,
                            selected: true,
                            isvideo: false,
                            videosubtype: "",
                            duration: "00:00",
                            minimalduration: "00:00",
                            snapshoturl: "img/snapshot1.jpg",
                            originalid: "1234"  
                    },
                    {
                            name: "Image name 2",
                            enabled: true,
                            selected: false,
                            isvideo: false,
                            videosubtype: "",
                            duration: "00:00",
                            minimalduration: "00:00",
                            snapshoturl: "img/snapshot2.jpg",
                            originalid: "1234"  
                    }
            ]
        },
        {
            name:"Scene 5",            
            imageURL:"img/showImg5.jpg",
            currentimageURL:"img/showImg5.jpg",
            onload:false,
            duration:"03:20",
            starttimeontemplate:"00:00",
            enabled:true,
            selected:false,
            texts:[
                    {
                            name: "String name 1",
                            enabled: true,
                            selected: true,
                            value: "Text 1 content",
                            fontfamily: "ACaslonPro-BoldItalic",
                            fillcolor: "#00ff22",
                            strokecolor: "#000000",
                            fontsize: 32,
                            originalid: "1234"            
                    },
                    {
                            name: "String name 2",
                            enabled: true,
                            selected: false,
                            value: "Text 2 content",
                            fontfamily: "ACaslonPro-BoldItalic",
                            fillcolor: "#00cc88",
                            strokecolor: "#000000",
                            fontsize: 24,
                            originalid: "1234"            
                    }
                ],
            imageframes:[
                    {
                            name: "Image name 1",
                            enabled: true,
                            selected: true,
                            isvideo: false,
                            videosubtype: "",
                            duration: "00:00",
                            minimalduration: "00:00",
                            snapshoturl: "img/snapshot1.jpg",
                            originalid: "1234"  
                    },
                    {
                            name: "Image name 2",
                            enabled: true,
                            selected: false,
                            isvideo: false,
                            videosubtype: "",
                            duration: "00:00",
                            minimalduration: "00:00",
                            snapshoturl: "img/snapshot2.jpg",
                            originalid: "1234"  
                    }
            ]
        }
    ];
   
        for(i in scenes){
            ///console.log(scenes[i]); 
            var new_scene = new Scene(scenes[i]);
            new_scene.save();
        }
        
        return;
        res.json(scenes); // return all in JSON format
});

app.get('/api/scenes', function(req, res) {

    // use mongoose to get all todos in the database
    Scene.find(function(err, scenes) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(scenes); // return all todos in JSON format
    });
});



app.post('/api/scenes',function(req, res) {
    
    var sc=req.body;
    sc.done = false;
		
    Scene.create(
        sc, function(err, scene) {
        if (err)
            res.send(err);

        // get and return all the scenes after you create another
        Scene.find(function(err, scenes) {
            if (err)
                res.send(err)
            res.json(scenes);
        });
    });

});

 
app.put('/api/scenes/:scene_id',function(req, res) {
    
    
        //var scene = new Scene();
        // use our bear model to find the bear we want
        Scene.findById(req.params.scene_id, function(err, scene) {


                if (err)
                        res.send(err);
                
                for(i in req.body) {
                    scene[i]=req.body[i];
                }

                 
                

                // save the bear
                scene.save(function(err) {
                        if (err)
                                res.send(err);

                        res.json({ message: 'Scene updated!' });
                });

        });
}); 

// delete a todo
app.delete('/api/scenes/:scene_id', function(req, res) {
    Scene.remove({
        _id : req.params.scene_id
    }, function(err, scene) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Scene.find(function(err, scenes) {
            if (err)
                res.send(err)
            res.json(scenes);
        });
    });
});


app.get('/api/fonts', function(req, res) {
    var fonts=[
        "ACaslonPro-Bold","ACaslonPro-BoldItalic","ACaslonPro-Italic"
    ];
    res.json(fonts); // return all todos in JSON format

});


app.post('/api/render_frame', function(req, res) {

    Scene.findById(req.body.scene._id, function(err, scene) {

        //scene.sliderTime=req.body.time;
        scene.starttimeontemplate=req.body.time;
        scene.currentimageURL='img/rerender.jpg';
        res.json(scene);

    });
    

});




// application -------------------------------------------------------------
app.get('*', function(req, res) {
    console.log("hello@@@");
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});


// listen (start app with node server.js) ======================================
app.listen(8080);
console.log(getDateTime()+": Goopi App listening on port 8080");