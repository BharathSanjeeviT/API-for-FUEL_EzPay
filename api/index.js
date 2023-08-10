const express  = require("express")
const app = express()

const bodyparser = require("body-parser");
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended : false}))

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

console.log("Hello World")

app.get('/api',(req,res)=> {
    const dbFunc = async () => {
        const data = await prisma.User.findMany()
        res.send(data)
    }
    dbFunc()
})

app.get('/api/redirect',(req,res)=>{
    res.redirect("http://"+"krunker"+".io")
})

app.post('/api/create_user',(req,res)=> {
     
    const postData = async () => {
        const data = await prisma.User.create({
            data : {
                id : req.body.id,
                name : req.body.name
            },
        })
        res.send(data)
    }
    postData()
})

app.post('/api/trans',(req,res)=>{

    const create_trans = async () => {
        const data = await prisma.Transaction.create({
            data :  {
                userId : req.body.uid,
                petId : 1,
                transaction : req.body.amount,
            },
        }) 
        res.send(data);
    } 
    create_trans()
})

app.post('/api/getTrans',(req,res)=>{
    
    const get_trans = async () => {
        const data = await prisma.user.findUnique({
            where : {
                id : req.body.id,
            },
            include : {
                transUser : true,
            },
        })
        res.send(data.transUser)
    }
    get_trans();
})

app.listen(process.env.PORT || 3000)

module.exports = app;

