

//创建web3对象
var web3 = new Web3();
// 连接到以太坊节点
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var account_one = web3.eth.accounts[0];
var account_two = web3.eth.accounts[1];

var abi=[{"constant":false,"inputs":[{"name":"_rec","type":"address"},{"name":"_p","type":"string"},{"name":"_ka","type":"string"}],"name":"keyagreement1","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_msgtext","type":"string"}],"name":"sendMessage","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"_sen","type":"address"},{"name":"_kb","type":"string"}],"name":"keyagreement2","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"anonymous":false,"inputs":[{"indexed":false,"name":"se","type":"address"},{"indexed":false,"name":"rec","type":"address"},{"indexed":false,"name":"p","type":"string"},{"indexed":false,"name":"ka","type":"string"}],"name":"Keyagreement1","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"re","type":"address"},{"indexed":false,"name":"sen","type":"address"},{"indexed":false,"name":"kb","type":"string"}],"name":"Keyagreement2","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"msgtext","type":"string"}],"name":"ReceiveMessage","type":"event"}];
var chatcontract = web3.eth.contract(abi);
var chat = chatcontract.at("0xe6a0531abdfa51aff53cdd8079c98c4c9d25c5f8");//contractaddress
var crypto = require('crypto');
var newp ;
var newka ;
var sender ;
var receiver;
var newkb ;
var diffieHellman1;
var secret1;
var secret2;
var myEvent=chat.Keyagreement1();
/*myEvent.watch(function(err, result) { if (!err) {console.log(result.args.se+","+result.args.rec+","+result.args.p+","+result.args.ka);}else {console.log(err);}});*/
myEvent.watch(function(err, result) { 
      if (!err) { 
           if(result.args.rec == account_two){
            var display = document.getElementById("display");
             display.innerHTML = result.args.ka;
           console.log(result.args.se+","+result.args.rec+","+result.args.p+","+result.args.ka);
           newp = result.args.p;
           newka = result.args.ka;
           sender = result.args.se;
           }     
        } 
      else {
       console.log(err);
       }
    });

myEvent2=chat.Keyagreement2();
myEvent2.watch(function(err, result) { 
      if (!err) { 
            if(result.args.sen == account_one){
            var display2 = document.getElementById("display2");
             display2.innerHTML = result.args.kb;
            newkb = result.args.kb;
            receiver = result.args.re;
            var typednewkb = new Uint8Array(newkb.match(/[\da-f]{2}/gi).map(function (h) {return parseInt(h, 16)}));
            console.log(result.args.re+","+result.args.sen+","+result.args.kb);
            secret1 = diffieHellman1.computeSecret(typednewkb, 'hex', 'hex');
            console.log(secret1);  
            }
        } 
      else {
       console.log(err);
       }
    });

myEvent3=chat.ReceiveMessage();
myEvent3.watch(function(err, result) { 
      if (!err) { 
          if(result.args.to == account_two){
           var key2 = secret2;//口令
           console.log(secret2); 
           var ndatahex = result.args.msgtext;
           console.log(ndatahex);
           var ndata = ndatahex.toString('hex');
           var decipher = crypto.createDecipher('aes-256-cbc',key2);
           console.log(ndata);
           var dec = decipher.update(ndata,'hex','utf-8');
           dec += decipher.final('utf-8');
           console.log(result.args.from+","+result.args.to+","+result.args.msgtext); 
           var display3 = document.getElementById("display3");
             display3.innerHTML = dec;
         }
       } 
      else {
       console.log(err);
      }

    });
/*
var event = chat.ReceiveMessage({},{fromBlock: 0, toBlock: 'latest'});
   event.get(function(err, result) { 
      if (!err) { 
         var key2 = secret2;//口令
         var display4 = document.getElementById("psg");
             var ndatahex = result.args.msgtext;
             console.log(ndatahex);
           var ndata = ndatahex.toString('hex');
           var decipher = crypto.createDecipher('aes-256-cbc',key2);
           var dec = decipher.update(ndata,'hex','utf-8');
           dec += decipher.final('utf-8');
             display4.innerHTML = result.args.dec;
         } 
      else {
       console.log(err);
      }});*/

/*
var x = chat.ReceiveMessage({},{fromBlock: 0, toBlock: 'latest'});
  x.get((error, eventResult){
  if (!error)
    console.log(eventResult.args.from+eventResult.args.to);
});*/

window.App = {
  getm : function(){
var event = chat.ReceiveMessage({},{fromBlock: 0, toBlock: 'latest'});
   event.get(function(err, result) { 
      if (!err) { 
        var event1;
    for(var i = result.length-1; i >=0 ; i--){
      event1 =result[i].args.msgtext; //JSON.stringify(result[i].args.msgtext);      
      console.log(event1);
    var key2 = secret2;//口令
           console.log(secret2); 
           var ndatahex = event1;
           
           console.log(ndatahex);
          var ndata = ndatahex.toString('hex');
           var decipher = crypto.createDecipher('aes-256-cbc',key2);
           console.log(ndata);
           var dec = decipher.update(ndata,'hex','utf-8');
           dec += decipher.final('utf-8');
           console.log(dec);
           var display4 = document.getElementById("psg");
             display4.innerHTML += dec;
    }
         /*var key2 = secret2;//口令
         var display4 = document.getElementById("psg");
             var ndatahex = result.args.msgtext;
             console.log(ndatahex);
           var ndata = ndatahex.toString('hex');
           var decipher = crypto.createDecipher('aes-256-cbc',key2);
           var dec = decipher.update(ndata,'hex','utf-8');
           dec += decipher.final('utf-8');
             display4.innerHTML = dec;*/
         } 
      else {
       console.log(err);
      }});

},
  
   
  se : function(){
   var keym = document.getElementById("password").value;//口令
   var cipher = crypto.createCipher('aes-256-cbc',keym);
   var text2 = secret2.toString('hex');//密码
   var crypted = cipher.update(text2,'hex','hex');
   crypted += cipher.final('hex');
   var content = crypted;
   console.log(content);
   var filename = sender+'.txt';
   //funDownload(textarea, file);
   var eleLink = document.createElement('a');
    eleLink.download = filename;
    eleLink.style.display = 'none';
    // 字符内容转变成blob地址
    var blob = new Blob([content]);
    eleLink.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
},


  keyensure:function(){
   var keym = document.getElementById("password1").value;//口令
   var cipher = crypto.createCipher('aes-256-cbc',keym);
   var text2 = secret1.toString('hex');//密码
   var crypted = cipher.update(text2,'hex','hex');
   crypted += cipher.final('hex');
   var content = crypted;
   var filename = receiver+'.txt';
   var eleLink = document.createElement('a');
    eleLink.download = filename;
    eleLink.style.display = 'none';
    // 字符内容转变成blob地址
    var blob = new Blob([content]);
    eleLink.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
},

setStatus3: function() {
    var message = document.getElementById("list").value;
   var status3 = document.getElementById("lists");
    status3.innerHTML = message; 
     var key4 = '123';
     var decipher = crypto.createDecipher('aes-256-cbc',key4);
    var dec = decipher.update(message,'hex','hex');
    dec += decipher.final('hex');
     console.log('huaide');
     var typeddec = new Uint8Array(dec.match(/[\da-f]{2}/gi).map(function (h) {return parseInt(h, 16)}));
     console.log(typeddec);
     secret1=typeddec;
     secret2=typeddec;
     console.log(secret1);
  },


  setStatus: function(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },
  setStatus2: function(message) {
    var status2 = document.getElementById("status2");
    status2.innerHTML = message;
  },

  send : function(){
    var self = this;
    var key1 = secret1;//口令
    console.log(secret1); 
    var cipher = crypto.createCipher('aes-256-cbc',key1);
    var text=document.getElementById("msgtext").value;
    var crypted = cipher.update(text,'utf-8','hex');
    crypted += cipher.final('hex');
    console.log(crypted); 
    var msgreceiver = document.getElementById("msgreceiver").value;
    chat.sendMessage.sendTransaction(msgreceiver,crypted,{from:account_one,gas:1000000});
    this.setStatus2("transaction complete!");
  },

  keyreceive : function(){
        var typednewp = new Uint8Array(newp.match(/[\da-f]{2}/gi).map(function (h) {return parseInt(h, 16)}));
       var diffieHellman2 = crypto.createDiffieHellman(typednewp, 'hex');
       var key2hex = diffieHellman2.generateKeys('hex');
       var key2 = key2hex.toString('hex');
       var typednewka = new Uint8Array(newka.match(/[\da-f]{2}/gi).map(function (h) {return parseInt(h, 16)}));
       secret2 = diffieHellman2.computeSecret(typednewka, 'hex', 'hex');
       console.log(secret2);
       chat.keyagreement2.sendTransaction(sender,key2,{from:account_two,gas:1000000});
    },

  sendCoin: function() {
    var self = this;

    var receiver = document.getElementById("receiver").value;
    
     diffieHellman1 = crypto.createDiffieHellman(128);
    var prime1hex = diffieHellman1.getPrime('hex');
    var prime1 = prime1hex.toString('hex');    
    var key1hex = diffieHellman1.generateKeys('hex');
    console.log(key1hex);
    var key1 = key1hex.toString('hex');
     console.log(key1);
    var typedArray = new Uint8Array(key1.match(/[\da-f]{2}/gi).map(function (h) {
  return parseInt(h, 16)}));
    console.log(typedArray);
    this.setStatus("Initiating transaction... (please wait)");
    chat.keyagreement1.sendTransaction(receiver,prime1,key1,{from:account_one,gas:1000000});
    this.setStatus("transaction complete!");
  }
};




