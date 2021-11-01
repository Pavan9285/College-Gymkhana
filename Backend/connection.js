const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config({ path: './.env' });

var mysqlConnection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true
});

function createConnection() {
    mysqlConnection.connect((err) => {
        if (!err) {
            console.log("Database Connected");
            // createDatabase()
            createUserTable()
            createGameTable()
            createItemTable()
            createDegreeTable()
            createClassTable()
            createEventTable()
            createInformationTable()
            createItemhistoryTable()
            createFeedbackTable()
        } else {
            console.log("Connection Failed", err);
        }
    })
}



function createDatabase() {
    mysqlConnection.query("CREATE DATABASE vazegymkhana", (err, result) => {
        if (!err) {
            console.log("Database created");
        } else {
            console.log('this is the err:', err);
        }
    })
}

function createUserTable() {
    var sql = "CREATE TABLE if not exists user(id int auto_increment,first_name varchar(100),last_name varchar(100),email varchar(100),password varchar(100),class varchar(100),control_id int(100),stream varchar(100),roll_no varchar(100),isadmin varchar(100),primary key(id))";
    mysqlConnection.query(sql, (err, result) => {
        if (!err) {
            console.log("user table created")
        } else {
            console.log("this is the err of user table creation", err);
        }

    })
}

function createDegreeTable() {
    var sql = "CREATE TABLE if not exists degree(id int auto_increment,degree varchar(100),primary key(id))";
    mysqlConnection.query(sql, (err, result) => {
        if (!err) {
            console.log("Degree table created")
        } else {
            console.log("this is the err of degree table creation", err);
        }
    })
}

function createClassTable() {
    var sql = "CREATE TABLE if not exists class(id int auto_increment,classes varchar(100),opening_time varchar(100),closing_time varchar(100),degree_id varchar(100),primary key(id))";
    mysqlConnection.query(sql, (err, result) => {
        if (!err) {
            console.log("Class table created")
        } else {
            console.log("this is the err of class table creation", err);
        }
    })
}



function createGameTable() {
    var sql = "CREATE TABLE if not exists game(id int auto_increment,game varchar(100),primary key(id))";
    mysqlConnection.query(sql, (err, result) => {
        if (!err) {
            console.log("Game table created")
        } else {
            console.log("this is the err of inventory table creation", err);
        }
    })
}

function createItemTable() {
    var sql = "CREATE TABLE if not exists item(id int auto_increment,items varchar(100),total_quantity int(100),available_quantity int(100),game_id varchar(100),primary key(id))";
    mysqlConnection.query(sql, (err, result) => {
        if (!err) {
            console.log("Item table created")
        } else {
            console.log("this is the err of item table creation", err);
        }
    })
}

function createItemhistoryTable() {
    var sql = "CREATE TABLE if not exists itemhistory(id int auto_increment,itemshistory varchar(100),place varchar(200),date date,details varchar(1000),game_id varchar(100),primary key(id))";
    mysqlConnection.query(sql, (err, result) => {
        if (!err) {
            console.log("Itemhistory table created")
        } else {
            console.log("this is the err of Item history table creation", err);
        }
    })
}

function createEventTable() {
    var sql = "CREATE TABLE if not exists event(id int auto_increment,event varchar(100),primary key(id))";
    mysqlConnection.query(sql, (err, result) => {
        if (!err) {
            console.log("Event table created")
        } else {
            console.log("this is the err of event table creation", err);
        }
    })
}

function createFeedbackTable() {
    var sql = "CREATE TABLE if not exists feedback(id int auto_increment,feedbackvazeGymkhana varchar(1000),feedbackwebsite varchar(1000),primary key(id))";
    mysqlConnection.query(sql, (err, result) => {
        if (!err) {
            console.log("Feedback table created")
        } else {
            console.log("this is the err of feedback table creation", err);
        }
    })
}

function createInformationTable() {
    var sql = "CREATE TABLE if not exists information(id int auto_increment,informations varchar(100),timing varchar(100),place varchar(100),fee varchar(100),prize varchar(100),details varchar(500),event_id varchar(100),primary key(id))";
    mysqlConnection.query(sql, (err, result) => {
        if (!err) {
            console.log("Information table created")
        } else {
            console.log("this is the err of information table creation", err);
        }
    })
}

createConnection()

module.exports = mysqlConnection;