
// Get Data Models
const Face = require('../models/Face')
var FileSaver = require('file-saver');
const uuidv4 = require('uuid/v4')
const fse = require('fs-extra');
const fs = require('fs');
const path = require('path');

exports.create = (req, res) => {
    // Validate request
    //console.log("tracking data:  "+JSON.stringify(req.body));

    const face = new Face(req.body);
    var data = face.faceData
    var uuid4 = uuidv4()    

    var imageName = uuid4 +".png"
    let baseDir = path.join(__dirname, '../public/assets/fileserver/'+imageName);
    var base64Data = data.replace(/^data:image\/png;base64,/, "");


    fs.writeFile(baseDir, base64Data,'base64', (err) => {
    console.log('data saved',data);
    if (err) throw err;               
    console.log(err); 
    }) 

    face.faceData = imageName
    face.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the face."
        });
    });
};
 
exports.findAll = (req, res) => {
    Face.find()
    .then(face => {
        res.send(face);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving faces."
        });
    });
};
exports.findOne = (req, res) => {
    Face.findById(req.params.faceId)
    .then(face => {
        if(!face) {
            return res.status(404).send({
                message: "Artisan not found with id " + req.params.faceId
            });            
        }
        res.send(face);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Artisan not found with id " + req.params.faceId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.faceId
        });
    });
};

exports.update = (req, res) => {
 
    const id = req.params.faceId
    const art = req.body
    const { ...updateData } = art
    Face.findByIdAndUpdate(id,updateData,{new: true})
    .then(face => {
        if(!face) {
            return res.status(404).send({
                message: "Face not found with id " + req.params.faceId
            });
        }
        res.send(face);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Face not found with id " + req.params.faceId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.faceId
        });
    });
};
exports.delete = (req, res) => {
    Face.findByIdAndDelete(req.params.faceId)
    .then(face => {
        if(!face) {
            return res.status(404).send({
                message: "Face not found with id " + req.params.faceId
            });
        }
        var fileName = face.faceData
        console.log('deleted file',fileName);

        let baseDir = path.join(__dirname, '../public/assets/fileserver/'+fileName);
        fs.unlink(baseDir, function (err) {
            if (err) throw err;
            // if no error, file has been deleted successfully
            console.log('File deleted!');
        }); 

        res.send({message: "Face deleted successfully!",status: 200});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Face not found with id " + req.params.faceId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.faceId
        });
    });
};