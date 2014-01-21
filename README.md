javascript-speedtest
====================

Javascript-based speedtest script



  var speedtest = new Speedtest(); //here you can specify custom files
  speedtest.run(10); //parameter - number of times to test
  speedtest.done(function(bps) {
    console.log(bps); //do something with bps
  });
