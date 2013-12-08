FizzLight
=========

#Presenduino
---------------------

Directions on [installing Node.js](https://github.com/joyent/node/wiki/installation). 



###Required node libaries/packages:


#####Node.js [*serialport library*](https://npmjs.org/package/serialport)
  ```$ npm install serialport```
  
  
#####Javascript Arduino framework [*Johnny-Five*](https://github.com/rwaldron/johnny-five#setup-and-assemble-arduino)
 ``` $ npm install johnny-five```



###Code:

#####*html reference - brain.js*: Changed pin numbers in the [example by divanvisagie](https://gist.github.com/divanvisagie/4702867) from pin 13 to pin 8


```
var five = require( 'johnny-five' ),
board,
narf = require( 'narf' );
board = new five.Board();
/*
Executes a command and fires event when done that
will return the command output
*/
 
// The board's pins will not be accessible until
// the board has reported that it is ready
board.on("ready", function() {
var val = 0;
// Set pin 13 to OUTPUT mode
this.pinMode( 8, 1 );  //changed divanvisagie's example to pin 8 (instead of 13) here and two more times again below.
// Mode Table
// INPUT: 0
// OUTPUT: 1
// ANALOG: 2
// PWM: 3
// SERVO: 4
this.digitalWrite( 8, 0 );     //13 changed to 8
/* Api functions */
var self = this;
var APIFunctions = {
GET : {
ledSwitch : function ( data, callback ){
data.url.value = parseInt( data.url.value, 0 );
if( data.url.value === 1 || data.url.value === 0){
self.digitalWrite( 8, data.url.value );       //13 changed to 8
}
callback( data.url.value );
}
},
POST : {}
};
console.log( narf );
var hs = new narf.HttpServer( { port : 8080 } ).start();
hs.on( 'port', function( port ){
hs.addAPI( { functions : APIFunctions } );
} );
});
 
narf.setDebug( false );
 
narf.pageServer( {
 
port : 8079,
path : __dirname + '/'
} );
```




#####*Node server - LED_Server.js* 

Inside the pomo() function, added a get request after the timerstop() function:
```
function pomo(){

  if(pomoTime>0) {
    pomoTime-= 100;
    console.log(pomoTime);
    console.log(maxTime);
    changeColor(pomoTime, maxTime);
  }
    
  else {
    //red color background change
    $('#colorVary').css('background-color', "Crimson");
    timerStop();
    $.get("http://localhost:8080/?serverfunction=ledSwitch&value=1");      // the http request to to node.js server to tell the Arduino to turn on the red light
  }
```


