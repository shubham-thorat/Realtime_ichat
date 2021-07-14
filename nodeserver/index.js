const io = require('socket.io')(8000);

//resolve allow-access-control-orgin issue is solve by adding
// moesif orign and CORS changer extension to chrome browser 

const users = {}
// console.log("error")

io.on("connection", socket => {
    // console.log("run");
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        // console.log("New user Joined,", name);
        socket.broadcast.emit('user-joined', name);
    })

    socket.on('send', message => {
        // console.log(users[socket.id]);
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    })
    socket.on("disconnect", () => {
        // console.log(socket.id); // undefined
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
});
// io.on('connection', socket =>{

// })
