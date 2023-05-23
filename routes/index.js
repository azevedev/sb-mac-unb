const express = require('express');

const router = express.Router();
const fs = require('fs');

router.get("/", (req, res) => {
    res.render("index");
});

const real = (number) => {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

router.get('/result', (req, res) => {
    var json = undefined;
    fs.readFile('public/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        json = JSON.parse(data)

        for (const [key, _] of Object.entries(json)) {
            for (const [key2, value2] of Object.entries(json[key])) {
                if (typeof(value2) == typeof(Number())) {
                    let str = "R$ " + json[key][key2]
                    json[key][key2] = str
                } else {
                    for (const [key3, value3] of Object.entries(json[key][key2])) {
                        if (typeof(value3) == typeof(Number())) {
                            let str = "R$ " + json[key][key2][key3].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                            json[key][key2][key3] = str
                        } else {
                            for (const [key4, value4] of Object.entries(json[key][key2][key3])) {
                                if (typeof(value4) == typeof(Number())) {
                                    let str = "R$ " + json[key][key2][key3][key4].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                                    json[key][key2][key3][key4] = str
                                }
                            }
                        }
                    }
                }
            }
        }


        res.render("result", { results: json });
    });

});

router.get('/balance', (req, res) => {
    fs.readFile('public/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.json({ "error": true, "message": err })
            return;
        }
        json = JSON.parse(data)
        res.json(json)

    })

});

router.post('/save-file', (req, res) => {
    fs.writeFile("public/db.json", req.body.data, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("File saved successfully");
    });
    res.json({ status: "success" })
})

module.exports = router;