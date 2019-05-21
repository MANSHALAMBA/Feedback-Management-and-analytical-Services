// temp_for_class = c;

  // dbo.collection("teacherdata").findOne({ "Faculty_Name": teacher_name[count] },
  //   function (err, response) {
  //     var id = response.uno;
  //     dbo.collection("scoredata").findOne({
  //       "uno": response.uno,
  //       "subject": temp_for_subject
  //     },
  //       function (err, response) {
  //         obj_2breflater = response;
  //         switch (response) {
  //           case null:
  //             // code for insertion

  //             object_tobeadded = {
  //               "uno": id,
  //               "subject": temp_for_subject,
  //               // "cse3a":,
  //               // "cse5b":, 
  //             }
  //             // code addition of score   
  //             object_tobeadded[temp_for_class] = Number(req.body.question1a) + Number(req.body.question1b) + Number(req.body.question1c) + Number(req.body.question1d)
  //               + Number(req.body.question1e) + Number(req.body.question2a) + Number(req.body.question2b) + Number(req.body.question2c) +
  //               Number(req.body.question2d) + Number(req.body.question2e);

  //             var keyname = "count" + temp_for_class;
  //             var keyname4 = "percentage" + temp_for_class;

  //             object_tobeadded[keyname] = 1;

  //             /////////////////// classpercent
  //             var temp = 100 * ((object_tobeadded[temp_for_class]) / 50);
  //             object_tobeadded[keyname4] = temp;



  //             dbo.collection("scoredata").insertOne(object_tobeadded, function (err, res) {
  //               if (err) console.log(err);

  //             });




  //             break;

  //           default:
  //             // code for class addition
  //             array_classname = Object.keys(response).map((key) => key);
  //             array_classname.splice(0, 1);
  //             array_classname.splice(0, 1);

  //             index_ofclass = array_classname.indexOf(temp_for_class);

  //             switch (index_ofclass) {
  //               case -1:
  //                 obj = {};
  //                 var temp = Number(req.body.question1a) + Number(req.body.question1b) + Number(req.body.question1c) + Number(req.body.question1d)
  //                   + Number(req.body.question1e) + Number(req.body.question2a) + Number(req.body.question2b) + Number(req.body.question2c) +
  //                   Number(req.body.question2d) + Number(req.body.question2e);

  //                 obj[temp_for_class] = temp;

  //                 var keyname2 = "count" + temp_for_class;
  //                 obj[keyname2] = 1;

  //                 ////////////////////classpercent
  //                 var keyname5 = "percentage" + temp_for_class;
  //                 obj[keyname5] = 100 * (temp / (1 * 50));

  //                 var newvalues = { $set: obj };
  //                 dbo.collection("scoredata").updateOne(response, newvalues, function (err, res) {
  //                   if (err) throw new Error("Can't Login! Contact Developer!");

  //                 });
  //                 break;
  //               default:
  //                 var obj3 = {};
  //                 var keyname3 = "count" + temp_for_class;
  //                 me = obj_2breflater[keyname3];
  //                 obj3[keyname3] = Number(obj_2breflater[keyname3]) + 1;
  //                 var upobj2 = { $set: obj3 };

  //                 // code for count updation


  //                 dbo.collection("scoredata").updateOne({
  //                   "uno": id,
  //                   "subject": temp_for_subject
  //                 }, upobj2, function (err, res) {
  //                   if (err) console.log(err);

  //                 });

  //                 var newscore = response[temp_for_class] + Number(req.body.question1a) + Number(req.body.question1b) + Number(req.body.question1c) + Number(req.body.question1d)
  //                   + Number(req.body.question1e) + Number(req.body.question2a) + Number(req.body.question2b) + Number(req.body.question2c) +
  //                   Number(req.body.question2d) + Number(req.body.question2e);

  //                 // response[temp_for_class]=newscore;
  //                 // var newscore = { $set: {name: Number(req.body.question1a)+Number(req.body.question1b)+Number(req.body.question1c)+Number(req.body.question1d)
  //                 //   +Number(req.body.question1e)+Number(req.body.question2a)+Number(req.body.question2b)+Number(req.body.question2c)+
  //                 //   Number(req.body.question2d)+Number(req.body.question2e)+Number(req.body.question3a)+Number(req.body.question4a)
  //                 //   } };
  //                 //    
  //                 var obj2 = {};
  //                 obj2[temp_for_class] = newscore;
  //                 var upobj = { $set: obj2 };




  //                 // code for addition of score
  //                 dbo.collection("scoredata").updateOne({
  //                   "uno": id,
  //                   "subject": temp_for_subject
  //                 }, upobj, function (err, res) {
  //                   if (err) throw err;

  //                 });


  //                 // ///////////////code for classpercent updation
  //                 var obj4 = {};
  //                 var keyname5 = "percentage" + temp_for_class;
  //                 obj4[keyname5] = 100 * (newscore / ((Number(obj_2breflater[keyname3]) + 1) * 50));
  //                 var upobj3 = { $set: obj4 };

  //                 dbo.collection("scoredata").updateOne({
  //                   "uno": id,
  //                   "subject": temp_for_subject
  //                 }, upobj3, function (err, res) {
  //                   if (err) console.log(err);

  //                 });


  //             }










  // var newscore=response[temp_for_class]+Number(req.body.question1a)+Number(req.body.question1b)+Number(req.body.question1c)+Number(req.body.question1d)
            // +Number(req.body.question1e)+Number(req.body.question2a)+Number(req.body.question2b)+Number(req.body.question2c)+
            // Number(req.body.question2d)+Number(req.body.question2e)+Number(req.body.question3a)+Number(req.body.question4a);

            // // response[temp_for_class]=newscore;
            // // var newscore = { $set: {name: Number(req.body.question1a)+Number(req.body.question1b)+Number(req.body.question1c)+Number(req.body.question1d)
            // //   +Number(req.body.question1e)+Number(req.body.question2a)+Number(req.body.question2b)+Number(req.body.question2c)+
            // //   Number(req.body.question2d)+Number(req.body.question2e)+Number(req.body.question3a)+Number(req.body.question4a)
            // //   } };
            //  //    
            //       var obj2={};
            //       obj2[temp_for_class]=newscore;
            //      var upobj={ $set: obj2 };




            //     // code for addition of score
            //       dbo.collection("scoredata").updateOne({"uno":id ,
            //       "subject":temp_for_subject}, upobj, function(err, res) {
            //            if (err) throw err;

            //          });   


            //          // ///////////////code for classpercent updation
            //          var obj4={};
            //          var keyname5="percentage"+temp_for_class;
            //          obj4[keyname5]=100*( newscore   /( (Number(obj_2breflater[keyname3])+1) *60) );
            //          var upobj3={ $set: obj4 };

            //          dbo.collection("scoredata").updateOne({"uno":id ,
            //          "subject":temp_for_subject}, upobj3, function(err, res) {
            //               if (err) throw err;

            //             });  




          

          //                if(response === null){
          //                   // code for insertion

          //               object_tobeadded={  "uno":id,
          //                                 "subject":temp_for_subject,
          //                               // "cse3a":,
          //                               // "cse5b":, 
          //        }

          //        object_tobeadded[temp_for_class] = 0;

          //        dbo.collection("scoredata").insertOne(object_tobeadded, function(err, res) {
          //       if (err) throw err;

          //     });


          // }
          //     else{  

          //       // code for class addition
          //       array_classname=Object.keys(response).map((key) => key);  
          //       array_classname.splice(0, 1);
          //       array_classname.splice(0, 1);

          //       index_ofclass= array_classname.indexOf(temp_for_class);

          //              if(index_ofclass==-1){

          //               // code for updation of scoredata
          //               var newvalues = { $set: {temp_for_class:0} };           
          //               dbo.collection("scoredata").updateOne(response, newvalues, function(err, res) {
          //                 if (err) throw err;

          //               });



          //              }




          //       }

          //////////////CODE FOR STUDENT REPORT
          // fetch teacherName
          // fetch answers
          // key:teacher  name
          // key:question

          // collection search 


