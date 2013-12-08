
var pomoTime,
    timer_id,
    pomoType;

 


// Function to pause the timer
function timerPause(){
  clearInterval(timer_id);
  //log('You can't pause an adventure!');
  $('#info').slideDown(); 
}

// Stop the timer
function timerStop (){
  clearInterval(timer_id);
  //log('PresenDuino of ' +pomoType + ' minutes ended');
  $('#info').slideDown(); 
  playSound();
}


function log(str){
  var currentTime = new Date()
  var hours = currentTime.getHours()
  var minutes = currentTime.getMinutes()

  if (minutes < 10)
    minutes = "0" + minutes;

  $('#log').slideDown();
  $('div#log ul').append('<li><b>' + hours + ':' + minutes +':</b> ' + str + '</li>');
}


// Play a sound
function playSound() {
  $('embed').remove();
  $('body').append('<embed src="audio/whip.mp3" autostart="true" hidden="true" loop="false">');
}

//Carin changed green and red background colors
function changeColor(currentTime, maxTime){
    if (currentTime > (maxTime * 0.9))
      //green color background change
      $('#colorVary').css('background-color', "#00bb4e");
    else{
      //yellow color background change
      $('#colorVary').css('background-color', "#FFCC00");
	};
    // sets color to green.
    
    
    // $('#colorVary').css('background-color', red);



    // element.addClass('color' + curNumber, 500);
    // // So previous classes get removed.
    // element.attr('class', 'color' + curNumber);
    // setTimeout(function() {
    //   changeColor(element,curNumber);
    // }, 1000);
    
    //setTimeout(function(){changeColor(element, curNumber)}, 1000);
}


// Sets a new pomodoro
function setPomodoro(minTime){
  
  pomoType = minTime;
  pomoTime = minTime * 60 * 1000;
  maxTime = pomoTime;
  // stil has to be fixed
  var currTime = timerRun();
  //changeColor(currTime, pomoTime);
  //log('PresenDuino of ' +pomoType + ' minutes started');
}

// Start the timer
function timerRun(){
  clearInterval(timer_id);
  timer_id = setInterval('pomo()', 100);

  $('#info').slideUp();
  
}


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
    
    
  // To convert the time
  var myTime = pomoTime;

  var minutes = Math.floor(myTime/(60*1000));
      myTime  = myTime - minutes*60*1000;

  var seconds = Math.floor(myTime/1000);
      myTime  = myTime - seconds*1000;

  // To format the output
  var str = '';
  if (minutes<10)
    str = '0';
  $('#m').text(str + minutes);

  var str = '';
  if (seconds<10)
    str = '0';
  $('#s').text(str + seconds);

}







$(document).ready(function() {
  
  // 25 minutes timer  
  $('#pomodoro20').click(function() {
    setPomodoro(20);
  });
  
  // 15 minutes timer
  $('#pomodoro15').click(function() {
    setPomodoro(15);
  });
  
  // 5 minutes timer
  $('#pomodoro5').click(function()  {
    setPomodoro(5);
  });
 
 // 1 minutes timer
  $( '#pomodoro1').click(function()  {
    setPomodoro(1);
  });

  // to stop the timer
  $('#stop').click(function() {
    timerPause();
  });



  $('#start').click(function() {
    //log('The adventure must go on!');
    timerRun();
  });



  // o


  $('#text').on('click', function(){
    // $('#log').show();
    // log('on');
     playSound();
    setPomodoro(0.02);
  });



  $('#info').hide();
  $('#info').slideDown();
  $('#log').hide();

});

































