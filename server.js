const express = require('express');
const app = express();
const http = require('http').createServer(app);
const PORT =  3000;


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));


http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log(` socket Connected... ID:- ${socket.id}`);
    
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    });
    // socket.on("disconnect", (reason) => {
    //     console.log(`disconnect ${socket.id} due to ${reason}`);
    //   });

})