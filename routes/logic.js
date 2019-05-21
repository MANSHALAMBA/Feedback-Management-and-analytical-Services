var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.Promise = Promise;
app.use(bodyParser.urlencoded({extended: true}));
//dbconnect
mongoose.connect("mongodb://localhost/data", { useMongoClient: true });





router.post("/login",function(req,res){
    
      var en = req.body.enrollno;
      
      console.log(en);
     

      MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
        if(err){
                      console.log("Problem with database search");
               }
           var dbo = db.db("data");
           /*Return only the documents with the address "Park Lane 38":*/
           var query ="Enrollment_No" + ":" + en;
          dbo.collection("data").find(query).toArray(function(err, result) {
            if (err) res.redirect('/');
            res.redirect('/form');
            db.close();
       });
         });
        });
      
    //   User.findOne({ "Enrollment_No" : en }, function(err, user){
    //       if(err){
    //           console.log("Problem with database search");
    //       }
    //       if(!user){
    //           console.log("student not found");
    //           res.redirect('/');
    //       }
    //       else{
              
    //           res.redirect('/form');
               
    //       }

