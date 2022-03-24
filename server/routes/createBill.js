const express = require('express');
const router = express.Router();
const fs = require('fs');
const mime = require('mime');
const multer = require('multer')
var upload = multer(); 

const { WaybillDetails } = require('../models');


function sendError(res, err) {
    var result = {
        "success": false,
        "error": err,
       
    };
    return res.json(result);
}

function sendSuccess(res, result) {
    var finalResult = {
        "success": true,
        "data": result
    };
    return res.json(finalResult);
}

router.post('/', (req, res) => {
    return new Promise((resolve, reject) => {
        let uploadtype = req.body.uploadtype;
        let fileName;
        let imageData;
        console.log("check "+req.body.pod_image)  
        
            
            var matches = req.body.pod_image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
            response = {};
            
            if (matches.length !== 3) {
            return new Error('Invalid input string');
            }
            
            response.type = matches[1];
            response.data = Buffer.from(matches[2], 'base64');
            let decodedImg = response;
            imageData = decodedImg.data;
            let type = decodedImg.type;
            let extension = mime.extension(type);
            fileName = `${req.body.waybill_no}.` + extension;
        
        // else if(uploadtype =='fileUpload'){
        //     imageData = req.files.podfile;
        //     var uploadImage = req.files.podfile;
        //     var imageName = uploadImage.name;
        //     var ext4 = path.extname(imageName)
        //     fileName = uniqid('_') + ext4;
        // }

        let filpath= __dirname + "/../../uploads/"
        let counter =0;
        if (fs.existsSync(filpath + fileName)) {
           do{
                counter = counter+1;
                fileName = counter +"-" + fileName;
           }while(fs.existsSync(filpath + fileName))
        }  

        
        try {
            
        fs.writeFileSync(filpath + fileName, imageData, 'utf8');
            WaybillDetails.create({wayBillNo : req.body.waybill_no,podDate : req.body.pod_date,podImage:fileName}).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        } catch (e) {
        console.log(e)
        }

        
    });
});

module.exports = router;