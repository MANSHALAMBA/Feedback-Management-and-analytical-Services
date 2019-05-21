const fetch= async () =>{
            //   return new Promise((resolve , reject)=>{

            //     resolve('{"text":"hey there"}')
            //   })

            return 0;


}

let result="I will be changed";
const foo=async() =>{

 result=await fetch()
console.log(JSON.parse(result))

}

foo();


// let MongoClient = require('mongodb').MongoClient;
// const connectionString = 'mongodb://localhost:27017';

    (async () => {
        // let client = await MongoClient.connect(connectionString,
        //     { useNewUrlParser: true });

        // let db = client.db('dbName');
        try {
           const res = await db.collection("collectionName").findOne({ 
               "someKey": someValue
           });

           console.log(`res => ${JSON.stringify(res)}`);
        }
        finally {
            client.close();
        }
    })()
        .catch(err => console.error(err));