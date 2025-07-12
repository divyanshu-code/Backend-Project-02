const express = require('express');
const app = express();
const path = require('path');
const userModel= require('./models/user')

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.get('/' , (req, res)=>{

        res.render("hlo.ejs")
})

app.get('/read' , async (req, res)=>{

      let UserA= await userModel.find()
      
        res.render("hii.ejs" , { user: UserA});
})

app.get('/delete/:id' , async (req, res)=>{

     let users= await userModel.findOneAndDelete({

          _id : req.params.id
       })

       res.redirect("/read")
})

app.get('/edit/:id' , async (req , res) =>{

     let user = await userModel.findOne({_id: req.params.id});

     res.render("edit.ejs" , {user: user});

})

app.post('/update/:id' , async (req, res)=>{

        let {image , email, name } = req.body ;
        let user = await userModel.findOneAndUpdate({_id: req.params.id} , {name, image , email} , {new: true});

        res.redirect("/read" );

})

app.post('/create' , async (req, res)=>{

        let {image, email, name} = req.body

      let User=   await userModel.create({
             name,                              // name : name  and as continue we use this because we have same name in both
             image,
             email
                
        })

        res.redirect("/read")
})



app.listen(5173)