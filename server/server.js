const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const bodyparser = require('body-parser');
const app = express();
const port = 3000;

var corsOptions = {
    origin:'http://localhost:4200',
    optionSuccessStatus: 200
};

var heroes=[{}];

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended:true
}))

const url='mongodb://localhost:27017';
const dbName ="sample_airbnb";

const client = new MongoClient(url, {useUnifiedTopology: true})



app.listen(port, function(){
    console.log('Server running')
})

/*
app.get('/api/heroes', function(req, res){
    console.log(heroes)
    res.json(heroes)
})

app.get('/api/heroe/:id', function(req, res){
    res.json(heroes[req.params.id])
})

*/
collection = "listingsAndReviews";

app.get('/api/habitaciones', function(req, res){
    client.connect(function(err){
        if(err) throw err;
        var dbo = client.db(dbName);
        dbo.collection(collection).find({}).toArray(function(err,result){
            if (err) throw err;
            res.json(result);
        })
    })
})






app.get('/api/max', function(req, res){
    client.connect(function(err){
        if(err) throw err;
        var dbo = client.db(dbName);
        dbo.collection("Customer").aggregate({}).sort({_id:-1}).limit(1).toArray(function(err,result){
            if (err) throw err;
            res.json(result);
        })
    })
})

app.get('/api/maxhab', function(req, res){
    client.connect(function(err){
        if(err) throw err;
        var dbo = client.db(dbName);
        dbo.collection("listingsAndReviews").aggregate({}).sort({_id:-1}).limit(1).toArray(function(err,result){
            if (err) throw err;
            res.json(result);
        })
    })
})


app.get('/api/explore', function(req, res){
    client.connect(function(err){
        if(err) throw err;
        var dbo = client.db(dbName);
        dbo.collection("listingsAndReviews").aggregate([
            { $lookup:
               {
                 from: 'Customer',
                 localField: 'identifier_user',
                 foreignField: '_id',
                 as: 'fin'
               }
             }
            ]).toArray(function(err,result){
            if (err) throw err;
            res.json(result);
        })
    })
})


app.get('/api/user/:id', function(req, res){
    console.log("Accesed, "+req.params.id)
    client.connect(function(err){
        if(err) throw err;
        var dbo = client.db(dbName);
        var query={_id:parseInt(req.params.id)}//cambio
        //var query={_id: req.params.id}//cambio
        console.log(query);
        dbo.collection("Customer").findOne(query,function(err,result){
            if (err) handleError(res,err.message,"Failed to get document");//Cambio
            res.json(result);
        })
    })
})



app.get('/api/check/:email/:pass', function(req, res){
    var correo = req.params.email;
    var passw = req.params.pass;
    client.connect(function(err){
        if(err) throw err;
        var dbo = client.db(dbName);
        dbo.collection("Customer").find({Correo:correo,pass:passw}).toArray(function(err,result){
            if (err) throw err;
            res.json(result);
        })
    })
})






app.get('/api/buscar/:termino', function(req, res){
    client.connect(function(err){
        if(err) throw err;
        var dbo = client.db(dbName);
        var val=req.params.termino;
        var query={nombre: {$regex: '.*' + val + '.*',$options:"-i"}} //Cambio esto
        console.log(query);
        dbo.collection(collection).find(query).toArray(function(err,result){
            if (err) throw err;
            res.json(result);
        })
    })
})



app.post('/api/create-customer', function(req,res){ 
    var _id = req.body._id;  
    var FirstName = req.body.FirstName; 
    var LastName =req.body.LastName; 
    var Telefono = req.body.Telefono; 
    var Metodo =req.body.Metodo; 
    var Country=req.body.Country; 
    var City=req.body.City; 
    var Status=req.body.Status; 
    var image_profile=req.body.image_profile; 
    var Correo=req.body.Correo;
    var Pass=req.body.pass;
  
    var Met=parseInt(Metodo);
    var data = { 
        "_id": _id,
        "FirstName": FirstName, 
        "LastName":LastName, 
        "Correo":Correo,
        "Telefono":Telefono, 
        "Metodo":Met,
        "Country":Country,
        "City":City,
        "Status":Status,
        "image_profile":image_profile,
        "pass":Pass
       

    } 
    client.connect(function(err){
        if(err) throw err;

    var dbo = client.db(dbName);
dbo.collection('Customer').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("Record inserted Successfully"); 
              
    }); 

})
          
}) 


app.post('/likes', function(req,res,next){ 
 client.connect(function(err){
        if(err) throw err;
        var _id = parseInt(req.body.id);  
        var like = parseInt(req.body.like); 
        
        console.log(like)

    var dbo = client.db(dbName);
dbo.collection('listingsAndReviews').updateOne({"_id":_id},{$set:{"likes":like}},function(err, collection){ 
        if (err) throw err; 
        console.log("Record inserted Successfully"); 
        client.close();  
             })

        })
          
}) 


app.post('/api/upload-hab', function(req,res){ 
    var _id = req.body._id; 
    var identifier_user = req.body.identifier_user;  
    var name = req.body.name; 
    var largo =req.body.largo; 
    var ancho = req.body.ancho; 
    var summary =req.body.summary; 
    var house_rules=req.body.house_rules; 
    var property_type=req.body.property_type; 
    var minimum_nights=req.body.minimum_nights; 
    var maximum_nigths=req.body.maximum_nigths; 
    var bedrooms=req.body.bedrooms;
    var beds=req.body.beds;
    var bathrooms=req.body.bathrooms;
    var price=req.body.price;
    var latitude=req.body.latitude;
    var longitude=req.body.longitude;
    var picture_url = req.body.picture_url;
  
    
    var data = { 
        "_id": _id,
        "identifier_user":identifier_user,
        "date": new Date(),
        "name": name, 
        "largo":largo, 
        "ancho":ancho,
        "summary":summary, 
        "house_rules":house_rules,
        "property_type":property_type,
        "minimum_nights":minimum_nights,
        "maximum_nigths":maximum_nigths,
        "bedrooms":bedrooms,
        "beds":beds,
        "bathrooms":bathrooms,
        "price":price,
        "picture_url": picture_url,
        "coordinates":{"longitude":longitude,"latitude":latitude},
        "likes": 0
        
       
    } 
    client.connect(function(err){
        if(err) throw err;

    var dbo = client.db(dbName);
dbo.collection('listingsAndReviews').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("Record inserted Successfully"); 
              
    }); 

})
          
}) 







