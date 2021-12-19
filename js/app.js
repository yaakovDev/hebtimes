import { hebDateStr,init_geo,timeString } from './lib.js';

let g_geo=null;
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: async function(id) {
        //console.log(`app start at ${process.env.NODE_ENV} mode...`);
        g_geo =  await init_geo(-1,-1,null,'60_min');
        screen.orientation.lock('landscape-primary');
        var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;'); 
        //receivedElement.setAttribute('style', 'display:block;');

        $('#dawn').html(timeString(g_geo.dawn));
        $('#sunrise').html(timeString(g_geo.sunrise));
        $('#sunset').html(timeString(g_geo.sunset));
        $('#krshm_mga').html(timeString(g_geo.krshm_mga));
        $('#krshm_gra').html(timeString(g_geo.krshm_gra));
        $('#current_date').html(hebDateStr(new Date()));
        let parasha = new Hebcal.HDate().getSedra('h');//h-hebrew s-sfarad a-ashkenaz
        $('#parasha').html(parasha);
        

        //saturday
        let friday = new Date();
        while(friday.getDay() != 5 )
            friday.setDate(friday.getDate() + 1);//next day
        let geo_friday = await init_geo(-1,-1,friday);

        let sat = new Date();
        while(sat.getDay() != 6 )
            sat.setDate(sat.getDate() + 1);//next day
        let geo_saturday = await init_geo(-1,-1,sat,'60_min');
        $('#candle_lighting').html(timeString(geo_friday.candle_lighting));
        $('#motsash_geonim').html(timeString(geo_saturday.motsash_geonim));
        $('#motash_rtam').html(timeString(geo_saturday.motash_rtam));
        initFlickity();
    },
//variables
    _lastSecond:-1
};

setInterval(async () => {
    console.log(`g_geo:${g_geo}`)
    if( !g_geo)
        return;
    var elapsed = new Date();
    if ( app._lastSecond != elapsed.getSeconds() ) {
        app._lastSecond = elapsed.getSeconds();
        let elapsed_sec = Math.abs(elapsed-g_geo.sunrise)/1000;

        $('#current_time').html(timeString(elapsed));
        $('#back_time').html(timeString(elapsed_sec));
        }
}, 1000);  


function initFlickity() {
var $carousel = $('#time-carousel').flickity();

$carousel.on( 'change.flickity', function( event, index ) {
    if ( document.body.classList.contains('theme-light') ) {
        document.body.classList.remove('theme-light');
        document.body.classList.add('theme-dark');
        }
    else{
        document.body.classList.remove('dark-light');
        document.body.classList.add('theme-light');
        }
  });
}

app.receivedEvent();
//app.initialize();




  



/*-SLIDE WITH HAMMER----------------------------------------
var myElement = document.getElementById('current_time');

// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(myElement);

// listen to events...
mc.on("panleft panright tap press", function(ev) {
    current_time_click()
    //myElement.textContent = ev.type +" gesture detected.";
});

-----------------------
//heb cal usage example
var year = new Hebcal();
year.setCity('Jerusalem');
//console.log('year: ' + JSON.stringify(year) );
console.log('year: ' + year.year );
var month =  new Hebcal.Month(10, 2019);
console.log('m: ' + month.month );
console.log('y: ' + month.year );

parasha
let parash = new Hebcal.HDate().getSedra('hs') // [ 'לך-לך' ]        
console.log(`parash:${parash}`);
*/


//The earth rotates 360o around it's axis (there are 360 degrees of longitude lines) 
//in 24 hours. So one hour = 360/24 = 15 degrees of longitude lines,
// and one degree longitude = 60 minutes / 15 degrees = 4 minutes