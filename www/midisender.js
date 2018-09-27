
var exec = require('cordova/exec');

var MIDISender = function() {};

// -----

/**
 * @param {number} channelNum 0-15 
 * @param {number} noteNum 1-128
 * @return {void}
 */
MIDISender.sendNote = function(channelNum, noteNum) 
{
	// add 192 for the 192-207 note range
	channelNum = parseInt(channelNum) + 192;

    exec(function(){}, function(){}, "MIDISender", "sendNote", [channelNum, noteNum]);
};

// -----

/**
 * @param {function} callback
 * @return {void}
 */
MIDISender.getIncoming = function(callback) 
{
	exec(
		function(data)
		{
			if(angular.isObject(data) && angular.isDefined(data.channel))
			{
				data.channel = parseInt(data.channel) - 192;

				callback.call(this, data);
			}
		},
		function() {},
		"MIDISender",
		"getIncoming",
	  	{}
	  );
};

// -----

module.exports = MIDISender;