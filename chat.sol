pragma solidity ^0.4.7;

contract chat {
    
    event Keyagrement1(address se,address rec,string p,string ka)
    event Keyagrement2(address re,address sen,string kb)
    event ReceiveMessage(address from,address to,string msgtext)
    //秘钥协商——sender向receiver发起好友申请
    function keyagrement1(address receiver,string prime1,string key1){
        Keyagrement1(msg.sender,receiver,prime1,key1);
    }
    //秘钥协商——receiver接受sender为好友
    function keyagrement2(address sender,string key2){
        Keyagrement2(msg.sender,sender,key2);
    }
    
    
    //聊天
    function sendMessage(address msgreceiver,string crypted){
        ReceiveMessage(msg.sender,msgreceiver,crypted)
    }
    
}
