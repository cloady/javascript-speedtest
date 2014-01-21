window.Speedtest = (function() {
    var fileName = 'test.gif';
    var fileSize = '501024';
    
    var Speedtest = function(filename, filesize) {
        this.fileName = (filename) ? filename : fileName;
        this.fileSize = (filesize) ? filesize : fileSize;
        this.callback = { error: function() {}, complete: function() {} };
    };
    
    Speedtest.prototype.run = function(times) {
        var _self = this,
            current = 0,
            speed = 0;
        
        function probe() {
            var file = new Image();
            var startTime = (new Date()).getTime();
            file.src = fileName +'?n='+startTime;

            file.onload = function() {
                current++;
                if (current < times)
                {
                    speed += fileSize/(((new Date()).getTime()-startTime)/1000)/times;
                    probe();
                }
                else
                    _self.callback.complete(speed);
            };

            file.onerror = function() {
                _self.callback.error();
            };
        }
        
        probe();
        
        return this;
    };
    
    Speedtest.prototype.done = function(fn) { 
        this.callback.complete = fn; 
        return this; 
    };
    
    Speedtest.prototype.error = function(fn) { 
        this.callback.error = fn; 
        return this; 
    };
    
    return Speedtest;
    
}).call(this);
