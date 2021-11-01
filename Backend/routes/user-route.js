const express = require("express");
const router = express.Router();
const mysqlConnection = require("../connection");
const jwt = require("jsonwebtoken");
const { genSaltSync, hashSync } = require("bcrypt");
const SECRET_KEY = '1234';
var mysql = require('mysql');

const salt = genSaltSync(10);


router.post("/register", (req, res) => {
    checkEmailIdExist(req, (response, error) => {
        if (!error) {
            let user_count = response['user_count'];
            if (user_count == 0) {
                req.body.password = hashSync(req.body.password, salt);
                let query = `insert into user (first_name,last_name,email,password,class,control_id,stream,roll_no,isadmin)values('${req.body.firstname}','${req.body.lastname}','${req.body.email}','${req.body.password}','${req.body.class}','${req.body.controlid}','${req.body.stream}','${req.body.rollno}','false')`;
                mysqlConnection.query(query, (err, rows, fields) => {
                    if (!err) {
                        res.send(rows);
                    } else {

                        console.log(err)
                    }
                })
            } else {
                res.status(403).send('email id is already exist. please try again with another email id')
            }
        } else {
            res.status(500).send('something went wrong')
        }

    })
})



function checkEmailIdExist(req, response) {
    let query = `select count(*) as user_count from user where email="${req.body.email}"`
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            response(rows[0], null)
        } else {
            response(null, err)
            console.log('this is the error:', err)
        }
    })

}

router.post('/login', (req, res) => {
    req.body.password = hashSync(req.body.password, salt);
    let query = `select* from user where email="${req.body.email}" and password="${req.body.password}"`
    mysqlConnection.query(query, (err, rows, fields) => {
        if (rows.length == 1) {
            //create jwt token and send response
            console.log('this is the rows', rows)
            let token = createToken(rows[0])
            res.status(200).send({ token: token })
        } else {
            res.status(404).send('username or password is incorrect')
            console.log(err)
        }
    })
})

router.put("/register", (req, res) => {
    req.body.password = hashSync(req.body.password, salt);
    let query = `update user set username='${req.body.username}',password='${req.body.password}',email='${req.body.email}',first_name='${req.body.firstname}',last_name='${req.body.lastname}',class='${req.body.class}',control_id='${req.body.controlid}',stream='${req.body.stream}',roll_no='${req.body.rollno}' where id='${req.body.id}';`

    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            res.send(rows);

        } else {
            res.send(err)
            console.log(err);
        }
    })
})


router.delete("/register/:id", (req, res) => {
    let query = `delete from user WHERE id='${req.params.id}';`
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            res.send(err)
            console.log(err);
        }
    })
});



createToken = function (user) {
    let token = jwt.sign({
        firstname: user.firstname,
        lastname: user.lastname,
        id: user.id,
        emailId: user.emailId
    }, SECRET_KEY, {
        expiresIn: 86400
    })
    return token;
}




router.post("/addGame", (req, res) => {
    let query = `insert into game (game)values('${req.body.game}')`;
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err)
        }
    })
})

router.post("/addEvent", (req, res) => {
    let query = `insert into event (event)values('${req.body.event}')`;
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err)
        }
    })
})

router.post("/addDegree", (req, res) => {
    let query = `insert into degree (degree)values('${req.body.degree}')`;
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err)
        }
    })
})

router.post("/addItem", (req, res) => {
    let query = `insert into item (items,total_quantity,available_quantity,game_id)values('${req.body.item}',0,0,'${req.body.gameId}')`;
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {

            res.send(rows);
        } else {
            res.status(500).send('error in item inserting..')
            console.log(err)
        }
    })
})

router.post("/addItemhistory", (req, res) => {
    let query = `insert into itemhistory (itemshistory,place,date,details,game_id)values('${req.body.itemshistory}',0,0,0,'${req.body.gameId}')`;
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {

            res.send(rows);
        } else {
            res.status(500).send('error in item inserting..')
            console.log(err)
        }
    })
})

router.post("/addFeedback", (req, res) => {
    let query = `insert into feedback (feedbackvazeGymkhana,feedbackwebsite)values('${req.body.feedbackvazeGymkhana}','${req.body.feedbackwebsite}')`;
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {

            res.send(rows);
        } else {
            res.status(500).send('error in feedback insserting..')
            console.log(err)
        }
    })
})

router.post("/addInformation", (req, res) => {
    let query = `insert into information (informations,timing,place,fee,prize,details,event_id)values('${req.body.information}',0,0,0,0,0,'${req.body.eventId}')`;
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {

            res.send(rows);
        } else {
            res.status(500).send('error in item inerting..')
            console.log(err)
        }
    })
})

router.post("/addClass", (req, res) => {
    let query = `insert into class (classes,opening_time,closing_time,degree_id)values('${req.body.class}',0,0,'${req.body.degreeId}')`;
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {

            res.send(rows);
        } else {
            res.status(500).send('error in class inerting..')
            console.log(err)
        }
    })
})

router.get('/getGame', (req, res) => {
    let query = `select * from game`
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
})

router.get('/getFeedback', (req, res) => {
    let query = `select * from feedback`
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
})

router.get('/getEvent', (req, res) => {
    let query = `select * from event`
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
})

router.get('/getDegree', (req, res) => {
    let query = `select * from degree`
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
})

router.get('/getDegreeclass/:degreeId', (req, res) => {
    let query = `select * from class where degree_id=${req.params.degreeId}`
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            res.status(500).send(err);
            console.log(err);
        }
    })
})

router.get('/getGameitem/:gameId', (req, res) => {
    let query = `select * from item where game_id=${req.params.gameId}`
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            res.status(500).send(err);
            console.log(err);
        }
    })
})

router.get('/getGameitemhistory/:gameId', (req, res) => {
    let query = `select * from itemhistory where game_id=${req.params.gameId}`
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            res.status(500).send(err);
            console.log(err);
        }
    })
})

router.get('/getEventinformation/:eventId', (req, res) => {
    let query = `select * from information where event_id=${req.params.eventId}`
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            res.status(500).send(err);
            console.log(err);
        }
    })
})

router.get("/users/:id", (req, res) => {
    let query = `SELECT* FROM user where id=${req.params.id}`
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            res.send(rows[0]);
        } else {
            console.log(err);
        }
    })


})

router.get("/users", (req, res) => {
    mysqlConnection.query("SELECT* FROM user", (err, rows, fields) => {
        if (!err) {
            res.send(rows);

        } else {
            console.log(err);
        }
    })
})

// router.get('/getinventory', (req, res) => {
//     jwt.verify(req.headers.authorization.replace('Bearer ', ''), SECRET_KEY, function (err, decoded) {
//         if (!err) {
//             let query = `select* from inventory where game="${req.params.game}"`
//             mysqlConnection.query(query, (err, rows, fields) => {
//                 if (!err) {
//                     res.send(rows[0])
//                     console.log('this is the rows:', rows)
//                 } else {
//                     console.log(err);
//                 }
//             })
//         } else {
//             res.status(400).send('token is expired');
//         }
//     });
// })


router.put("/updateInventoryitem", (req, res) => {
    var queries = '';
    let items = req.body.items;
    items = items.map(item => {
        return [
            item.total_quantity,
            item.available_quantity,
            item.itemId
        ]
    })
    items.forEach(function (val) {
        queries += mysql.format("UPDATE item SET total_quantity = ?, available_quantity = ? WHERE id = ? ; ", val);
    });
    mysqlConnection.query(queries, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            res.send(err)
            console.log(err);
        }
    })
})

router.put("/updateHistorysitemhistory", (req, res) => {
    var queries = '';
    let itemshistory = req.body.itemshistory;
    itemshistory = itemshistory.map(item => {
        return [
            item.place,
            item.date,
            item.details,
            item.itemhistoryId
        ]
    })
    itemshistory.forEach(function (val) {
        queries += mysql.format("UPDATE itemhistory SET  place = ?, date = ?, details = ? WHERE id = ? ; ", val);
    });
    mysqlConnection.query(queries, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            res.send(err)
            console.log(err);
        }
    })
})

router.put("/updateEventsinformation", (req, res) => {
    var queries = '';
    let informations = req.body.informations;
    informations = informations.map(item => {
        return [
            item.timing,
            item.place,
            item.fee,
            item.prize,
            item.details,
            item.informationId
        ]
    })
    informations.forEach(function (val) {
        queries += mysql.format("UPDATE information SET timing = ?, place = ?, fee = ?, prize = ?, details = ? WHERE id = ? ; ", val);
    });
    mysqlConnection.query(queries, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            res.send(err)
            console.log(err);
        }
    })
})

router.put("/updateTimetableclass", (req, res) => {
    var queries = '';
    let classes = req.body.classes;
    classes = classes.map(item => {
        return [
            item.opening_time,
            item.closing_time,
            item.classId
        ]
    })
    classes.forEach(function (val) {
        queries += mysql.format("UPDATE class SET opening_time = ?, closing_time = ? WHERE id = ? ; ", val);
    });
    mysqlConnection.query(queries, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            res.send(err)
            console.log(err);
        }
    })
})

router.delete("/feedback/:id", (req, res) => {
    let query = `delete from feedback WHERE id='${req.params.id}';`
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            res.send(err)
            console.log(err);
        }
    })
});

module.exports = router;