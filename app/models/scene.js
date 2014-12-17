var mongoose     = require('mongoose');
var Schema       = mongoose.Schema,
                    ObjectId = Schema.ObjectId;

var SceneSchema   = new Schema({
	name: String,
        ID: ObjectId,
        imageURL: String,
        currentimageURL: String,
        sliderTime: Number,
        onload: Boolean,
        duration: String,
        starttimeontemplate: String,
        enabled: Boolean,
        selected: Boolean,
        texts: [{
                name: String,
                id: String,
                enabled: Boolean,
                selected: Boolean,
                value: String,
                fontfamily: String,
                fillcolor: String,
                strokecolor: String,
                fontsize: Number,
                originalid: String            
        }],
        imageframes: [{
                name: String,
                id: String,
                enabled: Boolean,
                selected: Boolean,
                isvideo: Boolean,
                videosubtype: String,
                duration: String,
                minimalduration: String,
                snapshoturl: String,
                originalid: String  
        }]
});

module.exports = mongoose.model('Scene', SceneSchema);