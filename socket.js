/**
 * Created by yang on 2015/6/22.
 */
var server = require('http').createServer();
var io = require('socket.io')(server);
var pub = require('redis').createClient(6379, '192.168.1.54');
var sub = require('redis').createClient(6379, '192.168.1.54');

var pchannel = 'channel.user.';
var cacheSockets = {};

io.on('connection', function(socket) {
    var userId = socket.handshake.query.userId;
    cacheSockets[userId] = socket;
    socket.on('message', function(data) {
        console.log('[userId]-', userId, ':', data);
        var msg = JSON.parse(data);
        var channel = pchannel + msg.userId;
        console.log('[channel]-', channel);
        pub.publish(channel, data);
    });
    socket.on('disconnect', function() {
        console.log('disconnect:', userId);
        delete cacheSockets[userId];
    });
});

sub.psubscribe(pchannel + '*');

sub.on('pmessage', function(pattern, channel, msg) {
    var userId = channel.substr(channel.lastIndexOf('.') + 1);
    console.log('[userId]:', userId, ', [channel]:', channel, ', [msg]:', msg);
    if (userId) {
        if (userId === '*') {
            io.emit('message', msg);
        } else {
            var socket = cacheSockets[userId];
            if (socket) {
                socket.emit('message', msg);
            }
        }
    }
});

server.listen(3001);