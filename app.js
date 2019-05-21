var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jsdom = require('jsdom').JSDOM;
var exphbs = require('express-handlebars');
const wt = require("worker-thread");
var cookieParser = require('cookie-parser');
var session = require('client-sessions');



var a;
var b;
var c;
var array_subjectid;
var array_subjectname;
var count;
var subject;
var total_score = 0;
// var temp;
var temp_for_subject;
var temp_for_class;
var object_tobeadded;
var array_classname;
var index_ofclass;
var obj;
var me;
var obj_2breflater;
var bigtableobject;
var d;


// var teacher_name=new Array(15);             
var i=0;
const waitFor = (ms) => new Promise(r => setTimeout(r, ms))







function json2array(json) {
  var result = [];
  var keys = Object.keys(json);
  keys.forEach(function (key) {
    result.push(json[key]);
  });
  result.splice(0, 1);
  result.splice(0, 1);
  result.splice(0, 1);

  return result;
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var dbo;
MongoClient.connect(url, function (err, db) {
  if (err) console.log(err);
  dbo = db.db("feedback");
});
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var about = require('./routes/about');
var login = require('./routes/login');
var form = require('./routes/form');
var score = require('./routes/score');

var teacher_report = require('./routes/teacher_report');







var app = express();


var swig = require('swig');
app.engine('html', swig.renderFile);





app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');






app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', about);
app.use('/login', login);
app.use('/form', form);
app.use('/score', score);

app.use('/teacher_report', teacher_report);

app.use(session({
  cookieName: 'session',
  secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
  duration: 30 * 60 * 1000,
  // activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}));




app.post("/login", function (req, res) {


  if (!req.body.enrollno) {
    res.render('ErrorInEnrol', {

    });
  } else {
    dbo.collection("studentdata").findOne({ "Enrollment_No": req.body.enrollno },
      function (err, response) {
        if (response == null) {                
          res.render('ErrorInEnrol', {                     

          });
        }
        else {
          console.log("/login"+req.session.user);
          req.session.user = response;

          req.session.class = response.class;
          req.session.enrollno = req.body.enrollno;
          console.log( req.session.enrollno);
          req.session.i =0;
          req.session.count = 0;
          req.session.teacher_name=[] ;
          req.session.array_subjectname=[];
          req.session.array_subjectid;

          console.log("/login after assigning user"+req.session.user.Email_Id);
         
            // count= 0;
            
          


            // d = req.body.enrollno;
            // c = response.class;
              ////////////////////code for big table 

            bigtableobject = {
              "Email_Address": response.Email_Id,
              "Class": response.class,
              "Enrollment_Number": req.body.enrollno,
              "Group": response.group,
              "Name": response.Student_Name,
              "DOB": response.Date_of_birth,


            }

            dbo.collection("bigtable").findOne({ "Enrollment_Number": req.body.enrollno }, function (err, response) {
              if (err) console.log(err);

              switch (response) {
                case null:
                  // code block

                  dbo.collection("bigtable").insertOne(bigtableobject, function (err, res) {
                    if (err) throw err;

                  });
                  break;

                  default:
                  var newobj = { $set: bigtableobject };
                  dbo.collection("bigtable").updateOne(response, newobj, function (err, res) {
                    if (err) console.log(err);
                  });


              }

            });
            
            
            /////here lab wise
            dbo.collection("subjectdata").findOne({ "class": response.class, "group": response.group },
              function (err, response) {

                // a=response.subject1; 
                req.session.array_subjectid = json2array(response);
                // a = array_subjectid[0];


                
                  
                  const start = async () => {
                    await asyncForEach( req.session.array_subjectid , async (element) => {
                     
                      const res = await dbo.collection("teacherdata").findOne({ 
                        "uno": element
                    });
         
                    req.session.teacher_name[req.session.i]=res.Faculty_Name;
                    req.session.i=(req.session.i)+1;
                      
                    
                   
                    
                    })
                    
                    
                    
                    req.session.array_subjectname = Object.keys(response).map((key) => key);
                    req.session.array_subjectname.splice(0, 1);
                    req.session.array_subjectname.splice(0, 1);
                    req.session.array_subjectname.splice(0, 1);


               
                    
                    console.log( req.session.teacher_name);
               
                                           
                    

                    res.render('form', {
                      enrollno: req.body.enrollno,
                      teacherName: req.session.teacher_name[ req.session.count],
                      studentclass: response.class,
                      subject:  req.session.array_subjectname[ req.session.count],
                    });
                  
                  
                  
                  
                  // dbo.collection("teacherdata").findOne({"uno": element} ,function(err, response) {

                  //   //semaphore implement
                  //   if (err) throw err;
                   
                  //   teacher_name[i]=response.Faculty_Name;
                  //   i=i+1;                                          
                  // });



                  
                 
                 
                 
                  //check

                  
                };
                
               
                start()  

              });
           











          
        }
      });

  }

});


app.post("/nextteacher", function (req, res) {

    

  
  if (req.session && req.session.user)     { 
    
       console.log("First:"+req.session.enrollno);
    // Check if session exists
    // lookup the user in the DB by pulling their email from the session
    console.log("/nexteacher"+req.session.user.Email_Id);


              /////////// CODE FOR BIG TABLE

              dbo.collection("bigtable").findOne({ "Enrollment_Number":req.session.enrollno}, function (err, response) {
                if (err) console.log(err);
                 console.log("Third:"+req.session.enrollno);

                switch (response) {
                  case null:
                           console.log("Hey there is no object");
                  break;

                  default:
                  console.log("Hey yes there is a object");
                  console.log(req.session.count);
                var obj_main = {};
                var keyname_main1 = "[" + req.session.array_subjectname[req.session.count] + "]" + "_" + "[" +   req.session.teacher_name[req.session.count] + "]" + "_" + "Is the Teacher conducting the class regularly?";
                obj_main[keyname_main1] = req.body.question1a;

                var keyname_main2 = "[" + req.session.array_subjectname[req.session.count] + "]" + "_" + "[" +   req.session.teacher_name[req.session.count] + "]" + "_" + "Does the Teacher promote interactive classes with short answer?";
                obj_main[keyname_main2] = req.body.question1b;

                var keyname_main3 = "[" + req.session.array_subjectname[req.session.count] + "]" + "_" + "[" +   req.session.teacher_name[req.session.count] + "]" + "_" + "Clarity of Speech in the Class?";
                obj_main[keyname_main3] = req.body.question1c;

                var keyname_main4 = "[" + req.session.array_subjectname[req.session.count] + "]" + "_" + "[" +   req.session.teacher_name[req.session.count] + "]" + "_" + "Appropriate speed of delivering the Lectures?	";
                obj_main[keyname_main4] = req.body.question1d;

                var keyname_main5 = "[" + req.session.array_subjectname[req.session.count] + "]" + "_" + "[" +   req.session.teacher_name[req.session.count] + "]" + "_" + "Proper usage of Blackboard & legibility of handwriting?";
                obj_main[keyname_main5] = req.body.question1e;


                var keyname_main6 = "[" + req.session.array_subjectname[req.session.count] + "]" + "_" + "[" +   req.session.teacher_name[req.session.count] + "]" + "_" + "Does the teacher present his/her ideas clearly?";
                obj_main[keyname_main6] = req.body.question2a;


                var keyname_main7 = "[" + req.session.array_subjectname[req.session.count] + "]" + "_" + "[" +   req.session.teacher_name[req.session.count] + "]" + "_" + "Use of illustrations/examples to explain topics/use of OHP/LCD in Class?";
                obj_main[keyname_main7] = req.body.question2b;

                var keyname_main8 = "[" + req.session.array_subjectname[req.session.count] + "]" + "_" + "[" +   req.session.teacher_name[req.session.count] + "]" + "_" + "Accessibility and guidance outside the classroom?";
                obj_main[keyname_main8] = req.body.question2c;

                var keyname_main9 = "[" + req.session.array_subjectname[req.session.count] + "]" + "_" + "[" +   req.session.teacher_name[req.session.count] + "]" + "_" + "Has the teacher shown you the answer sheet and discussed the question paper?";
                obj_main[keyname_main9] = req.body.question2d;

                var keyname_main10 = "[" + req.session.array_subjectname[req.session.count] + "]" + "_" + "[" +   req.session.teacher_name[req.session.count] + "]" + "_" + "Does the teacher behaves gracefully and<br> judiciously in and out of class?";
                obj_main[keyname_main10] = req.body.question2e;


                var keyname_main11 = "[" + req.session.array_subjectname[req.session.count] + "]" + "_" + "[" +   req.session.teacher_name[req.session.count] + "]" + "_" + "Do you feel happy to have had this Teacher?";
                obj_main[keyname_main11] = req.body.question3a;

                var keyname_main12 = "[" + req.session.array_subjectname[req.session.count] + "]" + "_" + "[" +   req.session.teacher_name[req.session.count] + "]" + "_" + "Any Other Remarks:";
                obj_main[keyname_main12] = req.body.question4;



                var newobj = { $set: obj_main };
                dbo.collection("bigtable").updateOne(response, newobj, function (err, res) {
                  if (err) console.log(err);
                });


              }


              //////////// CODE FOR SCORE TABLE 
           dbo.collection("scoretable").findOne({ "Teacher_Name":req.session.teacher_name[req.session.count] , "Subject_name":req.session.array_subjectname[req.session.count]}, function (err, response) {
            if (err) console.log(err);
                console.log("Second:"+req.session.enrollno);
            switch (response) {
              case null:
                       // code for insertion of object
                       var myobj = { "Teacher_Name":req.session.teacher_name[req.session.count], "Subject_name":req.session.array_subjectname[req.session.count] , "classname": [req.session.class] , 
                       "responses":[{"count":"1","q1":req.body.question1a,
                                               "q2":req.body.question1b,
                                                "q3":req.body.question1c,
                                                "q4":req.body.question1d,
                                               "q5":req.body.question1e,
                                               "q6":req.body.question2a,
                                               "q7":req.body.question2b,
                                               "q8":req.body.question2c,
                                                "q9":req.body.question2d ,
                                                "q10":req.body.question2e,
                                     "overallaverage":((Number(req.body.question1a)+Number(req.body.question1b)+Number(req.body.question1c)+Number(req.body.question1d)+Number(req.body.question1e)+Number(req.body.question2a)+Number(req.body.question2b)+Number(req.body.question2c)+Number(req.body.question2d)+Number(req.body.question2e))/10),
                                     "Numberof":{  "Yes":"" ,
                                     "No":"" }
                                          }]};
                                   // check for response yes or no

                                   if(req.body.question3a=="Yes"){
                                    myobj.responses[0].Numberof.Yes="1";
                                             
                                   }
                                   else if(req.body.question3a=="No"){

                                    myobj.responses[0].Numberof.No="1";


                                   }

                                        
                       dbo.collection("scoretable").insertOne(myobj, function(err, res) {
                        if (err) throw err;
                        
                      });
              break;

              default:

                 //check for presence of class name in classname array
                 
                
                 var check=response.classname.includes(req.session.class); 
                 switch(check) {
                             
                       case false:
                                     // code addition of new class in classname array
                                     
                                     var updatedresponse2=response;
                                     var id2=response._id;
                                     updatedresponse2.classname.push(req.session.class);
                                     var myobj2= {"count":"1","q1":req.body.question1a,
                                     "q2":req.body.question1b,
                                      "q3":req.body.question1c,
                                      "q4":req.body.question1d,
                                     "q5":req.body.question1e,
                                     "q6":req.body.question2a,
                                     "q7":req.body.question2b,
                                     "q8":req.body.question2c,
                                      "q9":req.body.question2d,
                                      "q10":req.body.question2e,
                           "overallaverage":((Number(req.body.question1a)+Number(req.body.question1b)+Number(req.body.question1c)+Number(req.body.question1d)+Number(req.body.question1e)+Number(req.body.question2a)+Number(req.body.question2b)+Number(req.body.question2c)+Number(req.body.question2d)+Number(req.body.question2e))/10),
                           "Numberof":{  "Yes":"" ,
                           "No":"" }
                                };
                                // check for response yes or no

                                if(req.body.question3a=="Yes"){
                                  myobj2.Numberof.Yes="1";
                                           
                                 }
                                 else if(req.body.question3a=="No"){

                                  myobj2.Numberof.No="1";


                                 }
                                     
                                 updatedresponse2.responses.push(myobj2);

                                 //update object

                                 var newobj = { $set:updatedresponse2  };
                           dbo.collection("scoretable").updateOne({"_id":id2}, newobj, function (err, res) {
                            if (err) console.log(err);
                                  });
                                
                              break;
                          
                        case true:
                                      // code for score updation in 3rd case when classname is there
                                       var updatedresponse=response;
                                       var id=response._id;

                                      var index=updatedresponse.classname.indexOf(req.session.class);
                                      console.log("index at"+index);

                                      updatedresponse.responses[index].count=Number(updatedresponse.responses[index].count)+Number(1);
                                      console.log("count at"+updatedresponse.responses[index].count+" ");
                                      
                                      // check for response yes or no
                                      if(req.body.question3a=="Yes"){
                                        ++(updatedresponse.responses[index].Numberof.Yes);
                                                 
                                       }
                                       else if(req.body.question3a=="No"){
      
                                        ++(updatedresponse.responses[index].Numberof.No);
      
                                       }
                                       
                                       console.log( Number(response.responses[index].q1)   );
                                       console.log(  Number(response.responses[index].count)   );
                                       console.log( Number(req.body.question1a)     );
                                       console.log( Number(updatedresponse.responses[index].count)   );

                                       var temp=(  (  (    Number(response.responses[index].q1)         *   (    Number(updatedresponse.responses[index].count) - Number(1)     )      )  +   (  Number(req.body.question1a)  )              )   /  (   Number(updatedresponse.responses[index].count)     )         )  ;                                                 
                                       console.log(temp);
                                       updatedresponse.responses[index].q1= (  (  (    Number(response.responses[index].q1)         *   (    Number(updatedresponse.responses[index].count) - Number(1)     )      )  +   (  Number(req.body.question1a)  )              )   /  (   Number(updatedresponse.responses[index].count)     )         )  ;                                                 
                                       
                                       updatedresponse.responses[index].q2=(  (  (    Number(response.responses[index].q2)         *   (    Number(updatedresponse.responses[index].count) - Number(1)     )      )  +   (  Number(req.body.question1b)  )              )   /  (   Number(updatedresponse.responses[index].count)     )         )  ;                                                 
                                       
                                       updatedresponse.responses[index].q3=(  (  (    Number(response.responses[index].q3)         *   (    Number(updatedresponse.responses[index].count) - Number(1)     )      )  +   (  Number(req.body.question1c)  )              )   /  (   Number(updatedresponse.responses[index].count)     )         )  ;                                                 
                                       
                                       updatedresponse.responses[index].q4=(  (  (    Number(response.responses[index].q4)         *   (    Number(updatedresponse.responses[index].count) - Number(1)     )      )  +   (  Number(req.body.question1d)  )              )   /  (   Number(updatedresponse.responses[index].count)     )         )  ;                                                 
                                       
                                       updatedresponse.responses[index].q5=(  (  (    Number(response.responses[index].q5)         *   (    Number(updatedresponse.responses[index].count) - Number(1)     )      )  +   (  Number(req.body.question1e)  )              )   /  (   Number(updatedresponse.responses[index].count)     )         )  ;                                                 
                                       
                                       updatedresponse.responses[index].q6=(  (  (    Number(response.responses[index].q6)         *   (    Number(updatedresponse.responses[index].count) - Number(1)     )      )  +   (  Number(req.body.question2a)  )              )   /  (   Number(updatedresponse.responses[index].count)     )         )  ;                                                 
                                       
                                       updatedresponse.responses[index].q7=(  (  (    Number(response.responses[index].q7)         *   (    Number(updatedresponse.responses[index].count) - Number(1)     )      )  +   (  Number(req.body.question2b)  )              )   /  (   Number(updatedresponse.responses[index].count)     )         )  ;                                                 
                                       
                                       updatedresponse.responses[index].q8=(  (  (    Number(response.responses[index].q8)         *   (    Number(updatedresponse.responses[index].count) - Number(1)     )      )  +   (  Number(req.body.question2c)  )              )   /  (   Number(updatedresponse.responses[index].count)     )         )  ;                                                 
                                       
                                       updatedresponse.responses[index].q9=(  (  (    Number(response.responses[index].q9)         *   (    Number(updatedresponse.responses[index].count) - Number(1)     )      )  +   (  Number(req.body.question2d)  )              )   /  (   Number(updatedresponse.responses[index].count)     )         )  ;                                                 
                                       
                                       updatedresponse.responses[index].q10=(  (  (    Number(response.responses[index].q10)         *   (    Number(updatedresponse.responses[index].count) - Number(1)     )      )  +   (  Number(req.body.question2e)  )              )   /  (   Number(updatedresponse.responses[index].count)     )         )  ;                                                 
                                       
                                       updatedresponse.responses[index].overallaverage=( (updatedresponse.responses[index].q1)+(updatedresponse.responses[index].q2)+(updatedresponse.responses[index].q3)+(updatedresponse.responses[index].q4)+(updatedresponse.responses[index].q5)+(updatedresponse.responses[index].q6)+(updatedresponse.responses[index].q7)+(updatedresponse.responses[index].q8)+(updatedresponse.responses[index].q9)+(updatedresponse.responses[index].q10) )/Number(10);
                                      


                                      //update object
                                      
                                        console.log(updatedresponse)
                                      var newobj2 = { $set:updatedresponse  };
                                      dbo.collection("scoretable").updateOne({"_id":id}, newobj2, function (err, res) {
                                       if (err) console.log(err);
                                             });
                                





                      
                           

                 }

                  }

                   // page updation goes here
              if (req.session.count < ( req.session.array_subjectid.length-1)) {
                ++req.session.count;
          
          

              
              res.render('form', {
                enrollno: req.session.enrollno,
                teacherName:  req.session.teacher_name[req.session.count],
                studentclass: req.session.class,
                subject: req.session.array_subjectname[req.session.count],
              });

             
 
           




        }
        else {
          // session_obj.session.destroy();
  
          console.log("/studentloggingout"+req.session.user.Email_Id);
          // req.session.destroy();
              

          res.render('score', {
            // score:me,
            // tempo:array_classname,
          });



        }
                    
                  });

             



              });








            
       
          
        


        }




});





// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
