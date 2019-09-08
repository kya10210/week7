const express = require("express");
const mongoose = require('mongoose');
const Task = require('./models/tasks');
const Developer = require('./models/developers');
const bodyparser = require('body-parser');
//Configure Express
const app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: false }));
app.listen(8080);


let db;
//Connect to mongoDB server
mongoose.connect('mongodb://localhost:27017/week7', function (err) {
    if (err) {
        console.log('Error in Mongoose connection');
        throw err;
    }
    console.log('Successfully connected');
})

    //homepage
    app.get('/', function (req, res) {
        res.render('index.html');
    });

    //insert
    app.get('/inserttask', function(req,res){
        res.render('inserttask.html');
    });

    app.post('/addtask', function(req,res){
        let taskDetails = req.body;

        console.log(taskDetails);
        
        let task = new Task({
            _id: new mongoose.Types.ObjectId(),
            name: taskDetails.taskname,
            assign: taskDetails.taskassign,
            due: new Date(taskDetails.taskdue),
            status: taskDetails.taskstatus,
            description: taskDetails.taskdesc
        });

        task.save(function (err) {
            if (err) throw err;
            console.log('Task successfully Added to DB');
        });
        res.redirect('/listtasks');
    });

    //list all
    app.get('/listtasks', function(req,res){
        Task.find({}, function (err, data) {
            res.render('listtasks.html', { taskDb: data });
        });
    });

    //delete by task id
    app.get('/deletebytaskid', function(req,res){
        res.render('deletetask.html');
    });

    app.post('/deletebyid', function(req,res){
        let taskId = req.body.taskid;
        Task.deleteOne({ '_id': taskId }, function (err, doc) {
            console.log(doc);
        });
        res.redirect('/listtasks');
    });

    //delete all completed task
    app.get('/deletecompletedtask', function(req,res){
        res.render('deletecompleted.html');
    });

    app.post('/deletecompleted', function(req,res){
        Task.deleteMany({ 'status': 'Complete' }, function (err, doc) {
            console.log(doc);
        });
        res.redirect('/listtasks');
    });

    //update status
    app.get('/updatetaskbyid', function(req,res){
        res.render('updatetask.html');
    });

    app.post('/update', function(req,res){
        let taskId = req.body.taskid;
        let taskStatus = req.body.taskstatus;
        console.log(taskId);
        
        Task.updateOne({ '_id': taskId }, { $set: { 'status': taskStatus } }, function (err, doc) {
            console.log('success');
        });
        res.redirect('/listtasks');
    });

    // insert developer
    app.get('/insertdeveloper',function(req,res){
        res.render('insertdeveloper.html');
    });

    app.post('/adddeveloper',function(req,res){
        let deveDetails = req.body;

        console.log(deveDetails);
        
        let developer = new Developer({
            _id: new mongoose.Types.ObjectId(),
            name: {
                firstName: deveDetails.devfname,
                lastName: deveDetails.devlname},
            level: deveDetails.devlevel,
            address: {
                state:deveDetails.devstate,
                suburb: deveDetails.devsuburb,
                street: deveDetails.devstreet,
                unit: deveDetails.devunit
            }
        });

        developer.save(function (err) {
            if (err) throw err;
            console.log('Developer successfully Added to DB');
        });
        res.redirect('/listdevelopers');
    });

    //list developer
    app.get('/listdevelopers',function(req,res){
        Developer.find({}, function (err, data) {
            console.log(data);
            
            res.render('alldevelopers.html', { developerDb: data });
        });   
     });

    // app.get('/insertmany',function(req,res){
    //     res.render('insertmany.html');
    // });

    // app.post('/insert',function(req,res){
    //     let count = Number(req.body.count);
    //     let taskDetails = req.body;
    //     let tasks =[];
    //     for(var i = 1; i<= count; i++){
    //         tasks.push({id: getNewId(),
    //             name: taskDetails.taskname,
    //             assign: taskDetails.taskassign,
    //             due: new Date(taskDetails.taskdue),
    //             status: taskDetails.taskstatus,
    //             description: taskDetails.taskdesc});
    //     }
    //     console.log(tasks);
        
    //     db.collection('tasks').insertMany(tasks);
    //     res.redirect('/listtasks');
    // })
   
    //generate ID
    function getNewId() {
        return (Math.floor(Math.random() * 1000));
    }

    // <div class="form-group">
    // <label>Level</label>
    // <select name="devlevel">
    //     <option value="BEGINNER">BEGINNER</option>
    //     <option value="EXPERT">EXPERT</option>
    //   </select>
    // </div>