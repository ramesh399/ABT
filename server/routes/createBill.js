const express = require('express');
const router = express.Router();
const fs = require('fs');
const mime = require('mime');

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

        var matches = req.body.pod_image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
        response = {};
        
        if (matches.length !== 3) {
        return new Error('Invalid input string');
        }
        
        response.type = matches[1];
        response.data = Buffer.from(matches[2], 'base64');
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        let type = decodedImg.type;
        let extension = mime.extension(type);
        let fileName = "image." + extension;
        try {
        fs.writeFileSync("./images/" + fileName, imageBuffer, 'utf8');
        
        } catch (e) {
        next(e);
        }

        WaybillDetails.create({wayBillNo : req.body.waybill_no,podDate : req.body.pod_date,pod_image:fileName}).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    });
});

module.exports = router;