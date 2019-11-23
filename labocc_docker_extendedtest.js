var request = require('/labocc/node_modules/request');
var mqtt = require('/labocc/node_modules/mqtt')
var dateformat = require('/labocc/node_modules/dateformat');
var dict = {}; //dictionary that contains everything, sent via socket
const IcalExpander = require('/labocc/node_modules/ical-expander');
var sect = {}; //dictionary that holds info from dsector.json DB
var calendar=[];
const path = require('path');
const express = require('/labocc/node_modules/express');
const fs = require('fs');
const app = express();
//app.use('/assets', express.static('assets'))
app.use(express.static(__dirname + '/assets'))
app.use(express.static(__dirname + '/public'));
var server = require('http').createServer(app);
var socket = require('/labocc/node_modules/socket.io')(server);
var client  = mqtt.connect('mqtt://mosquitto:1883')//('mqtt://192.168.55.31:1883') //('mqtt://test.mosquitto.org')--use public only for testing
const rssi_buffer_size = 6; //amount of rssi readings used for averaging
const timeoutLimit = 60000; //timecheck if beacon is still available (in ms)
const inthreshold = -56; //threshold of beacon rssi OUTSIDE of lab 
const batterythreshold = 10; //battery level beyond which status is "Warning"
const labthreshold = -80; //threshold of beacon rssi INSIDE of lab
const entrancepi = "bleq1"; //Defines the Entrance Sector
const entrancepi2 = "bleq2";
var sub = "beaconz";
var verbose = process.argv[2];
var countmein = 0;
var moment = require('moment-timezone');
//var ics = fs.readFileSync('./agenda.ics', 'utf-8');


if (verbose == null){
	console.log('\nRunning labocc without realtime logging. To activate logging please rerun labocc and add the <<log>> argument...\n');
	var twirlTimer = (function() {
			var P = ["\\", "|", "/", "-"];
			var x = 0;
			return setInterval(function() {
					process.stdout.write("\r" + P[x++]);
					x &= 3;
					}, 250);
			})();
};

if (verbose == 'log') console.log('\nRunning labocc with realtime logging...\n');

if (verbose == 'debug') {
	console.log('\nRunning labocc on debug mode (Logging on, filter on)...\n');
	sub = "filter";
}

//check and fill dict with rssi values for averaging, keep date and ms of rssi value        
function addData(data){
	if (dict.hasOwnProperty(data.id)){
		var mac = 'Unknown';
		if (sect.hasOwnProperty(data.addr)){
			mac = sect[data.addr].SECTOR;
		}
		if (!dict[data.id].hasOwnProperty("rssi"))
			dict[data.id].rssi={};
		if (!dict[data.id].rssi.hasOwnProperty(mac))
			dict[data.id].rssi[mac]=[];
		dict[data.id].rssi[mac].push(data.rssi);
		if (dict[data.id].rssi[mac].length>rssi_buffer_size)
			dict[data.id].rssi[mac].shift();
		dict[data.id].lastSeen =dateformat(Date.now());
		dict[data.id].lastSeenMs =Date.now();
		dict[data.id].battery = parseInt(data.batt);
	}

//if (data.id == '98072d8c6a85') console.log(dict[data.id]);

};

//calculates in-out value,defined rules of connection
function processData() {
var bb1 = bb2 = bb3 = bb4 = bb5 = bb6 = bb7 = bb8 = bb9 = total = inside = outside = 0;

	for (var uuid in dict) {
		if (!dict[uuid].hasOwnProperty("lastSeenMs")) {
			dict[uuid].in = false;
			dict[uuid].status = 'Initialise';
		} else {
			var maxRssi = -500;
			var closestSector = "";
			for (var rssipermac in dict[uuid].rssi) {
				var sum = dict[uuid].rssi[rssipermac].reduce(function(a, b) { return a + b; });
				var avg = sum / dict[uuid].rssi[rssipermac].length;
				if (avg > maxRssi) {
					maxRssi = avg;
					closestSector = rssipermac;
				}
		dict[uuid].rssi[rssipermac].length = 0;
			}
			dict[uuid].mac = closestSector;
			dict[uuid].rssi = {};

			//dict[uuid].in !== entrancepi||avg>inthreshold;
			dict[uuid].in = (dict[uuid].mac !== entrancepi && dict[uuid].mac !== entrancepi2 && dict[uuid].mac !== "Unknown");//||(dict[uuid].mac == entrancepi && avg < inthreshold);
//This is where the mqtt publish data and logging starts
                        if (dict[uuid].in == true) {
                         countmein++;

//console.log("The date and time is :",dateformat(Date.now()),".Someone went inside! He is : ",dict[uuid].UUID," and he is close to : ",dict[uuid].mac,". The count increased to ",countmein);
console.log(" UUID ",dict[uuid].UUID," SECTOR ",dict[uuid].mac," COUNT ",countmein);

                        }
//
////
                        switch (dict[uuid].mac) {
                                default:
                                        break;
                                case "bleq1":
                                        bb1++;
                                        break;
                                case "bleq2":
                                        bb2++;
                                        break;
                                case "bleq3":
                                        bb3++;
                                        break;
                                case "bleq4":
                                        bb4++;
                                        break;
                                case "bleq5":
                                        bb5++;
                                        break;
                                case "bleq6":
                                        bb6++;
                                        break;
                                case "bleq7":
                                        bb7++;
                                        break;
                                case "bleq8":
                                        bb8++;
                                        break;
                                case "bleq9":
                                        bb9++;
                                        break;
                        }
////

			if (dict[uuid].battery < batterythreshold) {
				dict[uuid].status = 'Battery Warning';
			} else if (Date.now()-dict[uuid].lastSeenMs < timeoutLimit) {
				dict[uuid].status = 'OK';
			} else {
				if (dict[uuid].mac == entrancepi || dict[uuid].mac == entrancepi2)
					dict[uuid].status = 'Maintenance';
				else if (avg < labthreshold)
					dict[uuid].status = 'Connection Lost';
				else
					dict[uuid].status = 'Terminated by user';
			}
			if (verbose == 'log') console.log ('Beacon ID: '+ dict[uuid].UUID +  ', last seen before ', Date.now()-dict[uuid].lastSeenMs + 'ms from the Pi with MAC Address ', dict[uuid].mac + ' with an average RSSI of ', Math.round(avg) + ' and a battery reading of ', dict[uuid].battery  + ' %');
		}
	}
	////
	outside = bb1+bb2;
	inside = bb3+bb4+bb5+bb6+bb7+bb8+bb9;
	total = inside+outside;
	console.log(bb1,bb2,bb3,bb4,bb5,bb6,bb7,bb8,bb9,inside,outside,total);
  //client.publish('frontend',JSON.stringify({"tstamp":Date.now(), "treal":dateformat(Date.now()), "sector1":bb1, "sector2":bb2, "sector3":bb3, "sector4":bb4,"sector5":bb5,"sector6":bb6,"sector7":bb7,"sector8":bb8,"sector9":bb9,"in":inside,"out":outside,"all":total}));
  var time = new Date().toISOString();
	client.publish('frontend',JSON.stringify({"tstamp":Date.now(), "treal":time, "sector1":bb1, "sector2":bb2, "sector3":bb3, "sector4":bb4,"sector5":bb5,"sector6":bb6,"sector7":bb7,"sector8":bb8,"sector9":bb9,"in":inside,"out":outside,"all":total}));
////

}

//parses data from beacon and sector DB
function initializeData() {
	fs.readFile("/labocc/public/dblukii_extendedtest.json", function (err,data) {
			if (err) {
			return console.log(err);
			}
			dict=JSON.parse(data);
			console.log('Beacon DB loaded sucessfully!');
			});
	fs.readFile("/labocc/public/dsector.json", function (err,data) {
			if (err) {
			return console.log(err);
			}
			sect=JSON.parse(data);
			console.log('Sector DB loaded sucessfully!');
			});
}

// OLD Version Calendar 
// function calendarData() {
//         //fs.readFileSync("/labocc/notes.ics","utf-8", function (error,response,body) {
// 	request.get('http://labocc:labocc@radicale:5232/labocc/491c6565-1433-2e12-5207-fd682eb77d5b/', function (error, response, body) {
// 		 console.log("Calendar requested",error);
// 			if (!error && response.statusCode == 200) {
// 			var ics = body;
// 			const icalExpander = new IcalExpander({ ics, maxIterations: 1000 });
// 		//var date = new Date(); // Or the date you'd like converted.
// 		//	isoDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
			
// 		//	date_end = new  Date(date.getTime() + (1000 * 60 * 60 * 24 * 3) - (date.getTimezoneOffset() * 60000)).toISOString(); //(105421695)); // - (date.getTimezoneOffset() * 60000)).toISOString();
// 				// The new Date calculation for Calendar problem 29.04.2019 Oguz//
// 				var date = (new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString());
// 				var isoDate = (new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString());
// 				var ins = Date.parse(isoDate);
// 				//var isoDate = new Date(datex - (1000*60*60*24*0.083)).toISOString();
// 				var ins = Date.parse(date);
// 				date_end = new  Date(ins + (1000 * 60 * 60 * 24 * 3)).toISOString();
// 				//
			
// 			const events = icalExpander.between(new Date(ins),new Date(date_end));
// 			const mappedEvents = events.events.map(e => ({ startDate: e.startDate, endDate: e.endDate, summary: e.summary }));
// 			const mappedOccurrences = events.occurrences.map(o => ({ startDate: o.startDate, endDate: o.endDate, summary: o.item.summary }));
			
// 			var allEvents = [].concat(mappedEvents, mappedOccurrences);
// 			allEvents.sort(function(a,b) { 
// 			    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime() 
// 			});

// 			for (var i=0;i<allEvents.length;++i) {
//                                 calendar.push({"dfday":dateformat(allEvents[i].startDate.toJSDate().toISOString(),"dddd"), "dnday":dateformat(allEvents[i].startDate.toJSDate().toISOString(),"dd"),"dfmonth":dateformat(allEvents[i].startDate.toJSDate().toISOString(),"mmmm"),"dnyear":dateformat(allEvents[i].startDate.toJSDate().toISOString(),"yyyy"),"timeStart":dateformat(allEvents[i].startDate.toJSDate().toISOString(),"shortTime"), "timeEnd":dateformat(allEvents[i].endDate.toJSDate().toISOString(),"shortTime"), "description":allEvents[i].summary});

// 			}
// /*
//                         if (calendar.length < 3) {
//                                 for (var i=calendar.length;i<4;++i) {
//                                 calendar.push({"dfday":dateformat(date.setDate(date.getDate() + 1),"dddd"), "dnday":dateformat(date,"dd"),"dfmonth":dateformat(date,"mmmm"),"dnyear":dateformat(date,"yyyy"),"timeStart":"- -", "timeEnd":"- -", "description":'No events planned'});
//                                 }
//                         }
// */
// 			}
// /*			else	{
//                                 for (var j=0;j<4;++j) {
//                                 calendar.push({"dfday":dateformat(date.setDate(date.getDate() + 1),"dddd"), "dnday":dateformat(date,"dd"),"dfmonth":dateformat(date,"mmmm"),"dnyear":dateformat(date,"yyyy"),"timeStart":"- -", "timeEnd":"- -", "description":'Calendar is offline!'});
//                                 		      }
// 			}*/
// // the above crashes due to ical.js when no caldav server is present

// });
// return(calendar);
// }
function calendarData() {
	console.log(calendarData)
	//request.get('http://labocc:labocc@radicale:5232/labocc/491c6565-1433-2e12-5207-fd682eb77d5b/', function (error, response, body) {
	request.get('http://notes02.ise.fraunhofer.de/Kalender/LaborkalenderPOG.nsf/ical.ics', function (error, response, body) {
		//console.log("Calendar requested",error);
			if (!error && response.statusCode == 200) {
			var ics = body;
			const icalExpander = new IcalExpander({ ics, maxIterations: 500 });

			date= new Date();
			date_now = moment().tz('Europe/Berlin').add(60,'minutes').toString(); //subtract or add(195, 'minutes') - // nothing
			date_endadd = moment().tz('Europe/Berlin').add(4380,'minutes');//add(4260, 'minutes');//;
			date_end = date_endadd.toString();

			console.log(date,date_now,date_end)

			const events = icalExpander.between(new Date(date_now),new Date(date_end));
			const mappedEvents = events.events.map(e => ({ startDate: e.startDate, endDate: e.endDate, summary: e.summary }));
			const mappedOccurrences = events.occurrences.map(o => ({ startDate: o.startDate, endDate: o.endDate, summary: o.item.summary }));
			
			var allEvents = [].concat(mappedEvents, mappedOccurrences);
			allEvents.sort(function(a,b) { 
				return new Date(a.startDate).getTime() - new Date(b.startDate).getTime() 
			});
			
			for (var i=0;i<allEvents.length;++i) {
				// var trexd = (allEvents[1].startDate).getTime()

				var trex = (allEvents[i].startDate.toJSDate().toISOString())
				var drex = (allEvents[i].endDate.toJSDate().toISOString())
								calendar.push({"dfday":dateformat(allEvents[i].startDate.toJSDate().toString(),"dddd"), "dnday":dateformat(allEvents[i].startDate.toJSDate().toString(),"dd"),"dfmonth":dateformat(allEvents[i].startDate.toJSDate().toString(),"mmmm"),"dnyear":dateformat(allEvents[i].startDate.toJSDate().toString(),"yyyy"),"timeStart":dateformat(moment(trex).tz('Europe/Berlin'),"shortTime"), "timeEnd":dateformat(moment(drex).tz('Europe/Berlin'),"shortTime"), "description":allEvents[i].summary});
								// var bra = moment(trex)
								// var brax = moment(trex).tz('Europe/Berlin')
								// var brae = moment(trex).tz('Europe/Berlin').subtract(1,'hours')
								//console.log(new Date(),moment(),new Date(moment()))
								
			}
            //             if (calendar.length < 3) {
            //                     for (var i=calendar.length;i<4;++i) {
            //                     calendar.push({"dfday":dateformat(date.setDate(date.getDate() + 1),"dddd"), "dnday":dateformat(date,"dd"),"dfmonth":dateformat(date,"mmmm"),"dnyear":dateformat(date,"yyyy"),"timeStart":"- -", "timeEnd":"- -", "description":'No events planned'});
            //                     }
            //             }
			// }
			console.log(allEvents.length)
			if (allEvents.length !=0) {
			var last_event = new Date(allEvents[allEvents.length-1].startDate.toJSDate().toString()).getDate();
			console.log(allEvents.length,allEvents[allEvents.length-1].startDate.toJSDate().toString(),date.getDate(),last_event)
			if (calendar.length < 3) {
				for (var i=calendar.length;i<4;++i) {
				calendar.push({"dfday":dateformat(date.setDate(last_event + 1 ),"dddd"), "dnday":dateformat(date,"dd"),"dfmonth":dateformat(date,"mmmm"),"dnyear":dateformat(date,"yyyy"),"timeStart":"- -", "timeEnd":"- -", "description":'No events planned'});
				last_event ++; 
			}
		}
	}
	else
	for (var i=calendar.length;i<4;++i) {
		var date_for_noevent = new Date(date_now).getDate()
		console.log(date_for_noevent);
	calendar.push({"dfday":dateformat(date.setDate(date_for_noevent + i),"dddd"), "dnday":dateformat(date,"dd"),"dfmonth":dateformat(date,"mmmm"),"dnyear":dateformat(date,"yyyy"),"timeStart":"- -", "timeEnd":"- -", "description":'No events planned'})
		// date_for_noevent ++; 
}
}


/*			else	{
                                for (var j=0;j<4;++j) {
                                calendar.push({"dfday":dateformat(date.setDate(date.getDate() + 1),"dddd"), "dnday":dateformat(date,"dd"),"dfmonth":dateformat(date,"mmmm"),"dnyear":dateformat(date,"yyyy"),"timeStart":"- -", "timeEnd":"- -", "description":'Calendar is offline!'});
                                		      }
			}*/
// the above crashes due to ical.js when no caldav server is present

});
return(calendar);
}
//client(pi) calls data, served by mqtt / client(html) calls message, served by socket.io
client.on('connect', function(socket) {
		console.log('LabOcc has sucessfully connected to the MQTT Broker, awaiting BleqBox data...');
		client.subscribe(sub);
		client.on('message', function(topic,message) {
				var bbdata = JSON.parse(message);
				addData(bbdata);
				//if (verbose == 'log' || verbose == 'debug' ) console.log('This is addata\n', bbdata);
				});
		});

socket.on('connection', function(client) {
		client.on('data', function (data) {
				processData();
				client.emit('data', dict)
				if (verbose == 'log') console.log('This is processdata\n',dict );
				}); 
		client.on('calendar', function () {
				client.emit('calendar', calendarData())
				if (verbose == 'log') console.log('This is calendarData\n',calendar );
				calendar = []; 
				});
		});

//calls data initialization from dbeacon and dsector
initializeData();

//defines public folder
//app.use(express.static(__dirname + '/public'));
//set homepage folder
app.get('/', (req, res) => { res.sendFile(__dirname + '/labocc_docker.html'); })
//set server port
server.listen(4000, () => console.log('LabOcc-Server app listening on port 4000!'))

