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