let mongoose = require('mongoose');
let User= require('./models/user');
let Car =require('./models/car')
let express = require('express');
let app= express();

let url = 'mongodb://localhost:27017/week6lec1';

mongoose.connect(url,function(err){
    if(err){
        console.log(err);
    }
    else{

        let user=new User({
            name: 'Max',
            age: 22,
            address:'Melbourne',
        });

        user.save(function(err){
            
            if(err) console.log(err);
            else {
                console.log('save');
                let car = new Car({
                    maker: 'BMW',
                    year:2015,
                    user: user._id
                });
                car.save(function(err){
                    if(err)
                        console.log(err);
                    else
                        console.log('Car saved');
                })
            }
            
                
        });

    }
});
app.get('/getusers',function(req,res){
    User.find().exec(function(err,data){
        res.send(data);
    }); });
app.get('/getcars',function(req,res){
    Car.find().populate('user').exec(function(err,data){
        res.send(data);
    }); });

    app.get('/deleteall',function(req,res){
        User.deleteMany({},function(err,obj){
            Car.deleteMany({},function(req,res){

            })
        })
    })

app.listen(8080);
