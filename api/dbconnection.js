const express = require('express')
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const {Server}=require("socket.io");
const http = require("http");
const server=http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"*",

    }
});
app.use(cors())

const con = mysql.createConnection({
    connectionLimit:100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chatdb',
    port: 3306
});
con.connect(function(err)
{
    if(err)
    {
        console.log("1st error in register api: ",err);
    }
    else
    {
        console.log("Connected Successfully");
    }
})
app.use(express.json())
app.post('/api/register',(req,res)=>
{
    const user = req.body.userName;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const pass = req.body.password;
    const gender = req.body.gender;
    const profilePic = req.body.profilePic;
    var gen;
            sqlSearch1="select * from tblUser where userName = '" + user + "'"
            con.query(sqlSearch1,function(err,result)
            {
                if(err)
                {
                    console.log('1st error in register api: ',err);
                }
                else
                {
                    if(result.length!=0)
                    {
                        res.send("User already exists");
                    }
                    else
                    {
                        if(gender=='Male')
                        {
                            gen = 0;
                        }
                        else
                        {
                            gen =1;
                        }
                        sqlInsert1 = "insert into tblUser (userName,firstName,lastName,password,gender,profilePic) values (?,?,?,?,?,?) "
                        con.query(sqlInsert1,[user,firstName,lastName,pass,gen,profilePic],function(err,result)
                        {
                            if(err)
                            {
                                console.log("3rd error in register api: ",err);
                            }
                            else
                            {
                                console.log(result.insertId);
                                res.send("User created!!");
                            }
                        });
                    }
                }

            });
})
app.post('/api/login',(req,res)=>
{
    const user = req.body.userName;
    const pass = req.body.password;
    sqlSearch2="select id from tblUser where userName = ? and password=?"
    con.query(sqlSearch2,[user,pass],function(err,result)
    {
        if(err)
        {
            console.log("1st error:",err);
        }
        else
        {
            if(result.length)
            {   
                res.send(result[0])
            }
            else
            {
                res.send("Try again!");
            }
        }
    });
})
app.get('/api/user',(req,res)=>
{
    const user = req.body.userName;
    const pass = req.body.password;
    sqlSearch4="Select id,userName,password from tblUser where userName='"+user+"'and password='"+pass+"'"
    con.query(sqlSearch4,function(err,result){
        if(err)
        {
            console.log("1st error in getUserDetails",err);
        }
        else
        {
            if(result.length!=0)
            {
                res.send(result);
            }
            else{
                res.send("Invalid user")
            }
        }
    })
})
app.get('/api/userInfo/:id',(req,res)=>
{
    const id = req.params['id'];
    const user = req.body.user;
    const pass = req.body.pass;
    sqlSearch4="Select tblUser.userName as User_name,tblUser.firstName as firstName,tblUser.lastName as lastName, Case when gender = 0 then 'Male' when gender = 1 then 'Female'  end AS Gender,tblUSer.isCreatedAt as Created_At,tblUSer.updateAt as Latest_Update from tblUser where id='"+id+"'"
    con.query(sqlSearch4,function(err,result){
        if(err)
        {
            console.log("1st error in getUserDetails",err);
        }
        else
        {
            if(result.length!=0)
            {
                res.send(result);
            }
            else{
                res.send("Invalid user")
            }
        }
    })
})
app.post('/api/userUpdate/:id',(req,res)=>
{
    const id = req.params['id'];
    const userName = req.body.userName;
    const firstName = req.body.firstName;
    const lastName =  req.body.lastName;
    const password = req.body.password;
    const gender = req.body.gender;
    const profilePic = req.body.profilePic;
    var gen;
    var sqlUpdadte1
    var ch = req.body.ch;
    if(gender=='Male')
    {
        gen = 0;
    }
    else
    {
        gen =1;
    }
    switch(ch)
    {
        case 1:
                sqlUpdadte1 = "UPDATE tblUser SET userName='"+userName+"' where id='"+id+"'";
                break;
        case 2:
                sqlUpdadte1 = "UPDATE tblUser SET firstName='"+firstName+"' where id='"+id+"'";
                break;
        case 3:
                sqlUpdadte1 = "UPDATE tblUser SET lastName='"+lastName+"' where id='"+id+"'";
                break;        
        case 4: 
                sqlUpdadte1 = "UPDATE tblUser SET password='"+password+"'where id='"+id+"'";
                break;
        case 5:
                sqlUpdadte1 = "UPDATE tblUSer SET gender='"+gen+"' where id='"+id+"'";
                break;      
        case 6:
                sqlUpdadte1 = "UPDATE tblUser SET profilePic='"+profilePic+"'";
                break;
        case 7: 
                sqlUpdadte1 = "UPDATE tblUser SET userName='"+userName+"',firstName='"+firstName+"',lastName='"+lastName+"',password='"+password+"',gender="+gen+",profilePic='"+profilePic+"'where id='"+id+"'";                 
                break; 
    }   
    con.query(sqlUpdadte1,function(err,result)
    {
        if(err)
        {   
            console.log('2nd error in updateUser:',err);
        }
        else
        {
            if(result.length!=0)
            {
                console.log(result)
                res.send("Updated!")
            }
        }      
    })
})
app.post('/api/message',(req,res)=>
{
    const messageGroupId = req.body.messageGroupId;
    const message = req.body.message;
    const way = req.body.way;
    const type = req.body.type;
    var sqlSearch7 = "select * from tblMessage where messageGroupId = '"+messageGroupId+"'";
    con.query(sqlSearch7,function(err,result)
    {
        if(err)
        {
            console.log("1st error in message: ",err);
        }
        else
        {
            if(result.length!=0)
            {
                res.send('Already exists');
            }
            else
            {
                sqlInsert3 = "insert into tblMessage (messageGroupId,message,way,type) values  (?,?,?,?)";
                con.query(sqlInsert3,[messageGroupId,message,way,type],function(err,result)
                {
                    if(err)
                    {
                        console.log('2nd err in message: ',err);
                    }
                    else
                    {
                        res.send('Created!!');
                    }
                })
            }
        }
    })
})
app.post('/api/postMessage/:id',(req,res)=>
{
    const id = req.params['id'];
    const message = req.body.message;
    var sqlUpdadte3 = "Update tblMessage SET message = '"+message+"' where id= '"+id+"'";
    con.query(sqlUpdadte3,function(err,result)
    {
        if(err)
        {
            console.log('1st error in postMessage: ',err);
        }
        else
        {
            res.send("Message inserted");
        }
    })
                       
})
app.get('/api/getMessageList/:id',(req,res)=>
{
    const id = req.params.id;
    sqlSearch31 =  `SELECT tg.id, tg.name, tg.profilePic, tg.updateAt, tg.createdAt, tg.isActive, tg.isDelete FROM tblgroupmember as tm INNER JOIN tblgroup as tg on tg.id = tm.groupId where userId = ${id} and tg.isActive = 1 && tg.isDelete = 0 and tm.isActive = 1 and tm.isDelete = 0`;
    con.query(sqlSearch31,function(err,result)
    {
        if(err)
        {
            console.log("1st error in getMessageList api: ",err);
        }
        else
        {
            if(result.length!=0)
            {
                res.send(result);
            }
            else{
                res.send("Invalid request")
            }
        }
    });
})
app.get('/api/getMessage/:id',(req,res)=>
{
    const id = req.params['id'];
    sqlSearch3 = "SELECT * FROM tblMessage where messageGroupId = '"+id+"'";
    con.query(sqlSearch3,function(err,result)
    {
        if(err)
        {
            console.log("1st error in getMessageId api: ",err);
        }
        else
        {
            if(result.length!=0)
            {
                res.send(result);
            }
            else{
                res.send("Invalid request")
            }
        }
    });
})
app.post('/api/groupDetails',(req,res)=>
{
    const grpName = req.body.grpName;
    const profilePic = req.body.profilePic;
    sqlInsert2="insert into tblGroup (name,profilePic) values (?,?) ";
    con.query(sqlInsert2,[grpName,profilePic],function(err,result)
    {
        if(err)
        {
            console.log("1st error:",err);
        }
        else
        {
            console.log(result.length);
            if(result.length!=0)
            {
                res.send("Group Created");
            }
        }
    });
})
app.get('/api/getGroupDetails/:id',(req,res)=>
{
    const id = req.params['id'];
    sqlSearch5 = "SELECT tblgroup.Id as GroupId,tblgroup.name as GroupName,tblgroup.profilepic as ProfilePic FROM tblGroup where id = '"+id+"'";
    con.query(sqlSearch5,function(err,result)
    {
        if(err)
        {
            console.log("1st error in getGroupDetails api: ",err);
        }
        else
        {
            if(result.length!=0)
            {
                res.send(result);
            }
            else{
                res.send("Invalid request")
            }
        }
    });
})
app.post('/api/updateGroupDetails/:id',(req,res)=>
{
    const id = req.params['id'];
    const grpName = req.body.grpName;
    const profilePic = req.body.profilePic;
    var sqlUpdadte2
    var ch = req.body.ch;
    switch(ch)
    {
        case 1:
                sqlUpdadte2 = "UPDATE tblgroup SET profilePic='"+profilePic+"' where id='"+id+"'";
                break;
        case 2:
                sqlUpdadte2 = "UPDATE tblgroup SET name='"+grpName+"' where id='"+id+"'";
                break;
        case 3:
                sqlUpdadte2 = "UPDATE tblgroup SET profilePic='"+profilePic+"',name='"+grpName+"' where id='"+id+"'";
                break;        
    }
    con.query(sqlUpdadte2,function(err,result)
    {
        if(err)
        {   
            console.log('2nd error in updateGroupDetails:',err);
        }
        else
        {
            if(result.length!=0)
            {
                console.log(result)
                res.send("Updated!")
            }
        }      
    })
})
app.get('/api/getGroupDetail/:id',(req,res)=>
{
    const id = req.params['id'];
    sqlSearch6 = "Select id,groupId,tblGroupMember.userId as GroupMember from tblGroupMember where id = '"+id+"'";
    con.query(sqlSearch6,function(err,result)
    {
        if(err)
        {
            console.log("1st error in GroupMember api: ",err);
        }
        else
        {
            if(result.length!=0)
            {
                console.log(result);
                res.send(result);
            }
            else
            {
                res.send("Invalid request")
            }
        }
    });
})

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    
    
  
    /*socket.on("join_room", (data) => {
      socket.join(data);
    });*/
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
      });
  
    socket.on("send_message", (payload) => {
      socket.to(payload.room).emit("receive_message", payload);
      const data = {
        message: payload.message,
        messageGroupId: payload.room,
        way: payload.author,
        type: 'text'
      }

      sqlInsert3 = "insert into tblMessage (messageGroupId,message,way,type) values  (?,?,?,?)";
        con.query(sqlInsert3,[data.messageGroupId,data.message,data.way,data.type],function(err,result) {})
    });
    socket.on('disconnect', ()=> {
        console.log("User Disconnected", socket.id);
    });
  });

server.listen(8080,function(){
    var host = server.address().address
    var port = server.address().port
    console.log("http://%s:%s",host,port)
})