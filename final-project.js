(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.Tween17 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AmgJJQgUgEgMgQQgRgWAEgmQAGgrAZgjIAJgLIgEADQiMB0iNAgQhRAThOgLQhUgMhBgqQgegUg1gwQg1gxgegUIgxgdQgbgRgPgSQgXgdgIgzQgHg8gFgdQgDgPgKgmQgIghgDgUQgIg8AVhjQAQhHATgwQAYg/AmgqQAcggAugfQAagSA6gfQBfg1A0gXQBUgmBIgNQBjgSBLAZQA7AUA5A0QAkAgA7BGIBGBUQAhAnANASQAZAhAOAdQAWAvAEA1QAEA1gOAxIgOApQgJAagEAPQgEAOgEAZIAAACIATAJQBIAkA1AfQAUgGAigCQFRgPC0gOQEegWDkgnQArgHAWgBQAkAAAZAOQAYANAUAcQAKAPAVAoQAzBkBABYQAgArAHAYQAGAUgEATQgFAVgPAMQgQAMgWgBQgWgCgSgMQgZgSgbgvIiQjwQj6ApkiAXQjNARj8AKQAVAVARAWQAdAmAEAcQADAUgHARQgIATgQAIQgOAHgSgDQgRgCgOgKQgMgIgNgOIgWgaQg4hAhTgzIgJALQg7BKgsAnIgfAZQgRAQgJAOIgWApQgOAZgQAKQgNAHgNAAIgMgBgAluFtIADgDQAzgoASgXIAXghIABAAIgQgHQgdA1gzA1g");
	this.shape.setTransform(0.0388,0.0347);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-134.1,-58.5,268.29999999999995,117.1);


(lib.Tween16 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AmgJJQgUgEgMgQQgRgWAEgmQAGgrAZgjIAJgLIgEADQiMB0iNAgQhRAThOgLQhUgMhBgqQgegUg1gwQg1gxgegUIgxgdQgbgRgPgSQgXgdgIgzQgHg8gFgdQgDgPgKgmQgIghgDgUQgIg8AVhjQAQhHATgwQAYg/AmgqQAcggAugfQAagSA6gfQBfg1A0gXQBUgmBIgNQBjgSBLAZQA7AUA5A0QAkAgA7BGIBGBUQAhAnANASQAZAhAOAdQAWAvAEA1QAEA1gOAxIgOApQgJAagEAPQgEAOgEAZIAAACIATAJQBIAkA1AfQAUgGAigCQFRgPC0gOQEegWDkgnQArgHAWgBQAkAAAZAOQAYANAUAcQAKAPAVAoQAzBkBABYQAgArAHAYQAGAUgEATQgFAVgPAMQgQAMgWgBQgWgCgSgMQgZgSgbgvIiQjwQj6ApkiAXQjNARj8AKQAVAVARAWQAdAmAEAcQADAUgHARQgIATgQAIQgOAHgSgDQgRgCgOgKQgMgIgNgOIgWgaQg4hAhTgzIgJALQg7BKgsAnIgfAZQgRAQgJAOIgWApQgOAZgQAKQgNAHgNAAIgMgBgAluFtIADgDQAzgoASgXIAXghIABAAIgQgHQgdA1gzA1g");
	this.shape.setTransform(0.0388,0.0347);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-134.1,-58.5,268.29999999999995,117.1);


(lib.Tween15 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgFH5IgZgDIi0gcQhkgRhPgSQgkgIgTgHQgegLgUgQQgSgPgZgjIiMjBIgPgXQgtgYgbgbQgLgLgVgbQgVgbgMgMIgGgEQgSAJgUADQgXACgdgKIgIgDQhRgCgpgqQgOgPgTgfIgNgWQgPgbgFgMQgKgYgEgqQgEgtABhLQAAgnAGgWQAIgbAVgVQAVgVAbgKQAMgEASgDIAfgFIA3gJQAhgGAWgBQBDgCAkAjQAWAUASAuQAXA6AUBJQAKAkADAbQAEAsgSArQgRAqghAdIAgAjIAbAcQARAPAPAJIAHAEIADAAIAQgMQAngfAXg8IAOgiQAJgTALgKQAOgNAWgGQAOgEAcgDICUgPQBIgIAwgCIA1gCIAygBQATgBAKACQARACAKAHQAKAGAGAMQAGALAAAMQgBAagVAOQgMAHgRACQgJABgWgBQgrAAhuANQhJAIiSANQgVA0ggAsQCgAOB4ANQC7AVAoADQCAAJBigJIADAAQAIgPATgbQA6hOApheQAMgcAHgMQANgVARgIQASgKAgACQAhADBBARIHlCAQAWAGALAGQASAIAIANQAKAPgFATQgEATgPAKQgOAJgWAAQgOgBgZgGIoliPQgcA7ggA3IAagJQAUgFAPAFQAMADAOALIAWAVQAUATAeAUIA2AhQCXBaBQArQCCBHBuAtQAmAPANAPQAQAQgBAYQgBAZgSALQgXAQgxgUQhwgtiFhIQhPgridhdQhUgygkgeQgQgOgKgBQgKgBgSALIgzAeQgYAOgMAFQgVAKgRAAIgCAAIgKAEQgbAHgyACQiKAEjkgaQkUgfhbgEQAPAbAeAlIAxA9IAQAWQAKAMAJAHQAQALAjAIQCuAnCnAUQAYADALADQAUAFANAJQAQAKAIARQAIATgHAQQgFALgLAIQgLAHgNACIgRACIgIgBg");
	this.shape.setTransform(0.018,0.0112);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-113.8,-50.5,227.7,101.1);


(lib.Tween14 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AHPW6QgZgGgighQh/h9hujhQgqhWgUg9QgQgvgVhdQgwjVgujcQgjEzgCE3QgBBrAHBCQAKBfAcBJQAMAgACAUQADAegSAOQgMALgTgCQgSgBgOgMQgVgRgPgoQgYhEgKhWQgGg9gChiQgGnuBSnnQADgQAEgNIAAAAQg+j+AKkEIACgmQgIgBgHgCQgSgFgTgNQgJgHgYgTQifiFi+hMIhJgdQgrgRgdgPQg+ghgygyQgfgfgGgYQgEgRAGgQQAHgSAPgGQAUgJAZAPQAMAGAZAYQA5A2BqAvQA7AaB4AyQA5AcBDAsQAoAaBPA4IAvAiQAJhVAPhuIAGgnQgagIgdgOQgjgPgVgOQgcgUgPgYQgLgQgGgWIgBgEIgCgNQgEgTAAgXIgGgNIgLgVQgLgXgBgkQACgpgBgVIgBgfQAAgTACgMQAGgkAdgkQAMgQAugtIAYgYQAPgNAOgHQASgJAbgCQAqgCAnAQQAnAQAcAeQAJAKASAZQAVAfAHAVQAIAWAGAnQALBSABAwQABA/gSAnIgBACQAEAKABALQABASgHAUQgFAOgLAXQgWAsgXAPQgPAJgUAEIAAACQgUCCgLBsQBNgHBMgNQBNgNApgTQAQgIAcgQIAsgZQAvgYBIgQQApgKBTgQQAzgMAXgSQATgPAZgnIArhFQAQgaAOgMQATgSAVABQARAAANANQANAMABARQABATgSAfQgeAygZAkQgfAwgaAYQgfAcgxATQgkANg4ALIhcASQg1ANgkATIgkAWQgXAPgOAHQgbANgyANQhZAUilAVIgCAwQgIDYArCtIALAsQAGAZgBATIAAABQAHARAFAaIA5FaQAjDQAkCIQBpGNDdDXQAWAVAIAPQANAXgHATQgGAQgTAHQgKAEgLAAQgHAAgHgBg");
	this.shape.setTransform(0.0226,-0.0038);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-85.8,-146.7,171.7,293.5);


(lib.Tween13 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AERYvQgMgTgGgeQgOhOgJigIgrrbQgcEtgQCXQgaD7gcDIQgEAdgLATQgOAZgWgBQgOAAgLgKQgKgKgFgOQgFgTAEgkIBUtHQASiWAfiiIAPhNQAIgsACgiIABgSQgFgIgCgJQgGgTAEgnIA1nSIgBAAIglgOQgugRg/gEQglgDhKACIhBAEQgYACgrAHQi/AchgAdIgkAJQgUADgQgDQgSgFgMgPQgNgQAGgRQAGgVAmgNQBVgeBBgLIBegNQA5gHAkgKIAqgMQAVgEAjABICaADIBAABQA3ADAoAPIAIgaQANgxAAgkIAAgMQAIg4ANhIIAcihIgRgRIhkh3QgYgcgGgTQgEgOABgcQABgegDgNIgFgTIgHgSQgJgbABgpQADgugBgXIgCgrQAAgZAEgSQAEgTAVgmQATghAOgNQAXgUAygKQBOgQA6AIQBMAKAtAyQAoAsAIBKQAEAcgCAkIgFBBIgEAxQgEAsgFAXQgHAlgNAbIgOAZIgOAYQgNAjgLAPQgNASgaAKQgMAFgUAGQgHBQgWBzQgjC2gGArQgFAjgHBAIAKAvIArC6IAiCLQAJAgAIAWQAIAGAHALIANAaQAeBEBIBRQAUAWAIALQAOAUAFATQAFAWgLAVQgLAWgVACQgeAFgkgvIhriPQgcgmgJgXIgBgFIgLgMQgNgUgLgsIgdh2IgVDSIgBAIIAFAJQAIATACAkIA7QkQALDJASBoIAEAhQACASgEAOQgEARgMAMQgMAMgQABIgBAAQgXAAgPgYg");
	this.shape.setTransform(-2.2559,0.031);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-60.9,-160.6,117.4,321.29999999999995);


(lib.Tween12 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ADoYnQgSgDgOgMQgMgLgJgRIgPghQhykgg+jkIiVpQQgZHPhaJuQgKBDgkAHQgRADgQgMQgPgMgGgSQgFgPABgVQAAgMAEgYQArj+Ahk/QAUjFAel7IAKiEQADglAIgRQgHgJgEgMQgGgVAEgmIARi1QALhrAGgmQAOhXAqicIA8jdQAAgOAFgPQADgJAFgJIAdhlIgugBQgigCgPgIQgPgIgVgbQgaghgIgTQgKgegIgOIgLgQQgIgLgDgGQgIgQgEggQgPhwAJhAQANhlA7g4IAZgVIAZgVQAMgKAVgWQAUgSASgHQASgHAaABIAsAFQAvAEAQAGQAiAOAfAsQAsA9AFA7IAAAoQAAATABANQgFAPAGAQQACAGAJALIAAAAIAAAAIAKAMIABABQAQgWARgeIAqhPQASggAUgIQALgEALACQAMACAJAHQAJAIAEALQAFAMgDALQgBAJgGALIgMATQgKAPgQAeQgQAggIANIgbAtIgKAUIgHALQgZA2goBAQhEBwhZB1QgTAXgJATIg5DQIBRDPIA8CRQAZA6ARAeQAQAaAPAQIAVATQAMAMAHAIQAVAbgHAYQgGATgVAIQgUAIgUgGQgfgJgfgoQgtg6gnhWQgQgmguh3QgTgwgRgoIgGAZQgUBdgNBxQgKBVgJB6IgDAeQgCANgEALQARASAMAoQBADdBqHCQBnGQBzD+QAiBJgjAaQgLAIgOAAIgJgBg");
	this.shape.setTransform(2.5613,0.0271);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-35.5,-157.5,76.2,315.1);


(lib.Tween11 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AhbbFQgNgVgEggQgGgyAAhkQABjaAZpEQAKjmAEi6IgcB4QgnChhHEbIivK6IgIAcQgFAPgIAKQgIAMgNAHQgOAHgOgDQgOgDgKgNQgJgMgDgQQgDgUAKgnIEexvQAqikAThWQAeiLAOhxQADgbAFgRQAAgRAFgYIAWhiQA9kbAbiHIAXh+QhSBQhYBKQhcBPgcAbQhAA/ggA9QgcA3gOBMQgJAvgJBcQgCAdgEARQgGAZgNARQgQATgYAEQgaAEgPgRQgNgOABgZQABgPAIgeQALgmAKhTQAKhQAMgoQAWhOA5hNQAug+BKhDICGhyQBQhEAvg0QAWgZALgIQAVgRAUgCIABAAQAMhPAIhIIAKADIADgVIABgIIgYgJQgfgNgMgTQgHgKgGgXQgHgZgFgJIgLgRQgGgKgDgHQgFgMAAgRIABgIIgGgNQgFgPgHgeQgLg2gCgbQgEguAKgkQADgLALgaQAyhyBKgpQA1geBLgBQBHgCA3AYQAOACALAFQAcAMAYAdQAQATAWAmQAbAuAIAcQAFAVAAAfIgBA0IABA6QAAAhgHAYQgLAqgmAoQgYAZg0AnQgeAWgRAIIgLADQgNAOgLAFQgOAIgcAFQgaAEgXABIgHAsQgFAcgJAPQgLBJgNBQIAIAKQAWAeASAgQApBLAdBnQARA+AZB+IAWB4QAOBlAACgIgCCZQgBAhgFANQgJAagVAGQgRAFgRgKQgQgKgHgRQgGgPgBgUQgBgMACgYQATlNhalEQgQg7gRgpQgIgVgKgTIgJAxQgbCOg8EbIgWBoIgEAQIAEAHQAJAXAAAhQgBHwgYHmQgOE2gBBCQgGDWAMCiQADAogGATQgEAOgLALQgLALgOABIgFAAQgVAAgQgYg");
	this.shape.setTransform(-0.0078,0.0315);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-51.4,-175.7,102.8,351.5);


(lib.Tween10 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("EAOjAhDQhDgsg7hSQglgzg7hoIrK0DQA3D5A6CzQBKDjBiCyQApBMA7BaQAlA4BIBpIBzCoQAOAUAHANQAKATACARQACAUgKARQgLATgSADQgiAHgkg1IiXjaQgyhGgig3QixkQh1lgQhekdg+lmQgNgFgIgMQgJgOgBgdQgCgsADgmIgDoyQgBh/gCgkQgCgwgFg6QgEgvgGg5IgDgBQhPgshxgOQhGgJiGABIiIABQgmAAgVAEQghAGgUASQgPANgOAdIgYAvQgPAZgZALQgcAMgUgPQgUgPAEggQADgZAQgeQAgg6AdghQApguAvgOQAWgHAfAAQAPgBAnACQBgADDEAAQBxAGBVAdQgBgNACgRIAHgyQgljvgwjoQgwAJgsgRQgrgQgngsQgYgbglg5Qglg6gMghQgLgggEgrQgCgaAAgyQAAhGADgiQAGg6ATgqQAUgrAhgeQAkggArgJQA7gNBHAeQA3AYAsArQArArAZA3QAVAxALBHQAfC1g9BuQgYAtgnAeIAFAXQAcB3AUBzIBDjoQAchiARgwQAehQAjg5QAvhIA0gFQAhgDAZAdQAZAdgRAbQgIAMgTALIggASQgYAQgQAfQgLAUgMAnQhhEyhSFHIANBeIAIA+IAEAeQANBxAEBCQAFBJAACUIABHNQAAAzgCAmQACAOAAASIAAAQQAHAIAGAJQEuG+D6HgIBzDcQBEB+CMDrQAwBRAaAmQAsBBAtAsIAaAcQAOAQAGAPQAHATgGATQgGAVgSAGQgGACgGAAQgTAAgZgQg");
	this.shape.setTransform(0.0124,0.0222);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-101.3,-213,202.7,426.1);


(lib.Tween9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("EAH/AgJQgHgQAGgZQAKgdADgOQAHgZgCggQgCgTgHgnQgxkHgZiaQgljngRi9QgIhigNjWQgMjLgKhtQgOiQgfjPIg1ldQgDgYgBgNQAAgUAEgOQgCgugUhRIhBj7Qh6BOijA7Qh5AsjAAxQg7APgfAEQgZACgyAAIiFABQg2AAgbgEQgigEgpgOQgZgIgwgUQgYgLgMgHQgUgLgLgOQgNgRAAgVQAAgXAPgMQAXgTAtAQQAOAFA+AaQAvATAfAFQAcAFAwAAIBWABQA1ABAggEQAdgDBGgQQCOgiBEgWQCrg1CZhZQAEgNAIgPIATgfIAQgaIhDkIIgIgeQgaAKgaAEQhHAKhIgbQhFgagzg1Qgkglgfg5QgTgggghIQglhQgKgtQgKguABhZIABisQABgZADgOQAFgVANgKQALgKAUgDIAjgFQAUgFAagNIAsgZQBXgtBnAUQBmAVA/BKQBBBMAbCRQAOBPALCVQAEA2AAAbQAAAsgKAjQgRA7guAtIA2DQQAUg0AfhjIAxifIASg/QAJgjAEgcQADgcABgmIADhTQABgegGgOQgIgRgXgOIgqgWQgogVgJgjQgFgTAIgSQAIgUASgGQAXgIAfATIAXARQAOALAJAFIAmAQQAXAKALAMQAKAMAFATQADANACAWQAFA+AABDQABBjgQBGIgRA7Ig6DEQgXBNgOAmQgdBNgnBIIBGEQQAUBOAHAnIAKA3QAKA7AAAaQAAAOgDAMIADASQAEAqASA0QAHAVAdBFQBGCmBHDVQAtCEBPD/IEoO8QAiBuAOA4QAVBdACBNQAAAdgJAVQgKAagWADQgbAFgSgfQgOgYgFglQgLhhgfh3QgThHgriMQi9pijSqMIAwKTQAODGANBiQANBwAxENQAsDzAMCLQAEAmgDAWQgDAigQAVQgTAZgiABIgDAAQggAAgLgZg");
	this.shape.setTransform(0.0263,-0.0037);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-104.2,-208.2,208.5,416.4);


(lib.Tween8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("EAHfAjuQgRgTgIgeQhQkmgbjVQgRh9gGidQgEhfgDi9QgFmuABjXQAClnAQkdIADgYIgBgDQgCgQAEgbQAFgiAAgKQAAgXgJgiIgOg4QgFggADgxQADhFAAgNQgBgggGgvIgLhPQgFgygBhQQnYAPn5h3QgfgHgPgGQgZgJgQgNQgPgNgNgUQgIgMgNgbIi1lsQgeg9AYgbQANgOAWABQAVAAAQANQAOALAMATQAGALALAZQAcA8A7B1IBBCCQAVAqATAQQAWASAzALQGhBfGuAGIgDgRQgUhegyhTQgfAZg/gDQhEgCg4gUQg4gUglgjIgEgCQhygtg3hYQghg1gNhJQgKg4AAhRQAAhhAShDQAXhXA4gxQAygsBQgRQA4gMBdgBQAngBAXACQAjADAZAMQAqATAhAwQAXAfAbA9IAZA4IAAgEQgBgfgBgPQgCgVgLg2IgahzQgUhQgNguQgVhFgYg1IgNgdQgGgRgCgOQgBgRAHgPQAHgQANgGQAOgHAQAEQAPADAMALQAQAOARAlQAwBuAgCQQAWBkAXCjIATCNIAGAvQAIAPADAUQACAOAAAdIgBCAIAAA2IAAAeIgBD6IgBANIAABbQAJAIAGALQAIATgIAPQgFAKgKAGQABBIAFAnIAHAtQAFAcABARQADAdgCAvIgBBMQABAcAQB9QAJBIgDAzIACACQAJANAFATQAEALAEAYQApDSB3GnQB2GhAoDaIAkDNQAVB/ASBOQAzDpBcCXQAqBEgeAdQgVATgggQQgbgNgVgeQhLhtguikQgXhWgmjUQh0qCjBpmQgDIjACFRQADE2APC2QAWEOA7DUQAYBVAFAaQANA/gHAxQgFAkgVAJQgHADgGAAQgPAAgOgQgAEj03QgFATgJAYQgVA2gZA5IA/CYIAAABIACk+IgFALg");
	this.shape.setTransform(-0.0034,0.0048);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-101.8,-230.2,203.6,460.5);


(lib.Tween7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("EAJoAgxQgbgMgZgcIn5pAQg7hEgZgkQgsg9gTg4QgMgjgHgtQgEgagFg3IgrnnQgQitgFhNQgKiMAAhvQAAiJAQjaQgIgGgFgJQgKgTgCghQgCgmAHguQAEgfALg1IBAlBIAEgUQh6CKhDBGQgoArhUBTIgbAYQgQALgQAFQgSAFgXgFQgPgCgbgJIhqgmQg8gXgsgVQg4gcgcgNQgxgWgmgJIgpgIQgXgFgPgJQgSgLgJgTQgKgVAIgSQAJgTAZgHQAVgFAbAFQApAGAvARQAdALA4AYIDtBoIAXAIQANAEALgDQALgCALgJIARgTQAdggAfgYIAlgeQANgNATgYIA2hDQAxg8ARgRIAuguQAagcAQgVIAYgiQAPgVAMgLQAHgHAIgEIANhKQAMhKAGg2IgKACQhJAKhIgeQhHgegug7Qgog1gXhQQgOg1gNheQgLhXACgsQADg/AZg8QAYg8AqgwQAdggAmgcQA5gqA/gQQBFgSA8ATQBAAVAvA+QAqA4ASBLQAIAiADApQAngBAZBDQCHFoBUEaQAiByg4AiQgUAMgsAAIlVgBIgSAAIgJAuIhEFYQgPBHgGAnQgKA9gBAxIAAABQAFAEAFAFQANAQAHAZQAEAOAEAgQAYDAA8DjQArCiBSD4QAeBbATAvQAeBLAiA3QA1BXBuBtQAyAyB/BzQBzBpA9A+QDHDMBFDFQALAegCAZQgDAfgXAKQgOAGgRgGQgQgGgLgNQgJgLgHgRIgMggQgnhvhehyQg6hHh+h6Ik/k0Qg1gzgbgeQgrgvgagsQgWgmgUgzQgLgegUg/Ii9pXIBWPAQAEAvAEAZQAGAoAMAeQAOAhArA5QBsCNCvDBIEmFFQAZAdAIAcQALAjgVASQgMAKgPAAQgNAAgOgHgAC046QAABNgBASQgDA1gMAnQgXBHg9AyIgSAOQgKB9gLBLIgGAiIFHgJQhLkehrkPIAAAKgAiu9oQgEACgDAJIgNAmIAFAFQALgGADgEQAEgFAAgFQAGgTAFgGQAEgEALgFIgXAAg");
	this.shape.setTransform(-0.0118,0.0088);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-106,-210.4,212,420.9);


(lib.Tween6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("EgAdAi5QgNgMgCgiIgdoXQgRk9gEiYQgGkGAOjPQARjxA7ljQAJg7AGggQALgvANglQgCgOgBgTIgCj/QgBiLAFg8QAKhfADgwQACgZABgnIgIALQgZAlgKARQgRAfgVAvIgiBQQgVAvgoBMQiGD9iYDvQgVAfgJARQgPAbgHAYIgKAoQgGAXgIAPQgLATgSAKQgVAKgSgIQgTgJgGgaQgFgVAFgbQAPhRA8hjQBLhtAig5QAWglAYgtICOkCQAcgxAOggIAchHQARgtANgaQAKgUA1hUQAohAAMgtQAJgdAGgMQAMgVASgFIAAAAIAAmiIAAgIIgJAAQg4ACg4gXQgwgUgxgnQgngegtgwQg1g2gTgrQgQgkgLhKQgMhTAAgzQABh2A0hrQAZg0AggaQAlgdA9gGQBagIBXAwQBUAuA2BRQBdCKACDcQACDPhrBIIgEINIgBBhQAJgDAJABQATACAOATQAMARABAVQABASgGAXIgMAnQBiBrBrC1QA9BmB2DOQAYAmgGAWQgGAWgbAGQgaAHgVgNQgSgKgPgXQgJgNgOgeQhtjkiejHIgug9IgFgHIgPHGQALAIAHAQQAMAYADAlQAtJdCRJRQAoCiBUFEQBEEaATDRQADAfgHAXQgKAdgXAEQgaAFgSgdQgPgYgEgjQgikDhpmjQh/n/ggikQg3kbgWkfQhBFFgKFJQgHDsAWGNQAbHVACClQAAAYgCAOQgDAVgJAOQgLAQgTAFQgGACgFAAQgNAAgJgJg");
	this.shape.setTransform(0.01,0.0207);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59,-224.2,118.1,448.4);


(lib.Tween5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ACEaOIAAgBIACgFIAIAGIgKAAgACpY3IgTgEQAgiEA7ijIB9lCQAQgpAGgWQALgkADgeQAJhTgthcQgjhHhHhSQhPhbhphgQg8g3hOhCQBbEzgRFCQgEBVgMA8QgMA9glBlIhCC/Ig1CZQgdgMgmgbIgXgPQBMjNA+jQQAZhSAIg1QAKhCgFhwQgGiQgRhtQgViHgphtQgNghgDgPQgFgXADgTQgIgGgFgIQgMgUgBgiQgBgoAIgwQAGggAOg5QBOkxBbk9IACgFQg/BBg2A6QhMBRgpA1QhABSgxBjQgXAvgIAgQgDAPgGAzQgFAogJAYQgJAVgOAOQgQAQgTAAQgUABgQgQQgQgRABgVQAAgOAJgVQALgbACgIQAEgPAAgdQABggACgNQADgSAOgdQBGiZBYhsQAYgdAwg0IDnj6QAXgbATgJIADgBQgBgRAHgTQAEgNAMgaIA0hnQgRgCgSgIQgcgMgXgZQgSgTgEgSQgCgIgBgOIgBgWQgCgKgGgOIgJgYQgGgRgBgWIgBgpQABgyAHgXQAIgWAagoQAXggAOgRQA7hGBOgYQAjgLBEgHQAjgFAVADQAyAIApA0QAOATAQAcIAcAxIATAhQAKAUAFAPQAIAaAAAzQAAAngCATQgEAfgMAXQgIAOgbAdQgdAegMAKQgXAWgWAOQgUANgkAQQgsAUgOAHIgbAPQgRAIgNACQgOADgPgDIgtBbQACAHABAHQABAOgEASIgJAfIgBADQAKAHAHAMQAGAMAGAWIBIEXQAgB7AKA/QAIAtABAjIACAkQABAVACAOQAEATANAlIAgBaQANAjgBAUQAAAPgHALQgHAOgMAGQgPAHgRgFQgQgFgMgNQgPgQgOgqIgchYQgNgmgEgVQgDgRgDg7QgEg7gPhIQgJgtgXhVIg0jEQgkB1glCFQgoCVhEEPQgOA3gBAcIAAAQQAIABAIACQARAGASAPQAJAHAWAVQAuAwBjBZQBjBZAvAvQCnCoA6CeQAcBNgCA6QgCAkgMArQgJAbgTAxQhiD3gYBEQg+CrggCKQgqgFgqgIg");
	this.shape.setTransform(0.0042,0.0029);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-52.8,-167.8,105.6,335.6);


(lib.Tween4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ABNbPQgHgLgBgPQgBgJACgTQAEg4gBiFIgLu9QAAgegCgOQgDgYgJgRQgHgOgOgPIgbgZIkRjuIACE5QAABAgBAkQgCA4gHAsQgGAigRBDIhdFfIhpF+QgHAbgGAOQgKAWgOANQgRAPgXABQgYABgNgRQgPgVAPgvQBslnBgluQAXhZAHgzQAGgrACg1IABhgQAAjjgChyQAAghAEgUIgHgFQgLgLgEgPQgHgTAEgmQAaksBLlBQg0BDgnA/IhHB6IhsCqQhBBlgfBKIgQAmQgLATgNAMQgPAOgWACQgWABgNgOQgWgYAWg2QAqhlA5hZQAUggAqg/IAagrQBOiCAfgwQBWiFBkh9QAWgcASgMIADgBQgBgMAAgPQADg0AMhAQAIgoAShMQgiAAgTgFQgdgGgPgSQgJgLgHgUQgGgWgFgLQgFgOgMgTIgTghQgeg8gChhQgBhMATgtQAYg5BGg2QA9gwBDgZQBJgcBHACQAqACAZAPQAPAJAOARQAIAKAPAXIAYAoQANAXAFAUQAHAXABAhIgBA5IABBAQAAAlgFAZQgHAmgaA1QglBLgtAoQgdAYgfAMQgkANgigEQgfBkgOBoQFojgHLi2QAmgOASAAQAQAAANAHQANAIAGAMQAGAOgEAQQgFAQgMALQgPAPgoAPQmNCalwDcQggATgSAOQgaATgPAWQgPAUgKAdQgGATgIAjQhNFCghFLIgCASQAUAKAWAVQCZCSCcCAQAgAbAMAMQAYAWANAWQAXAlAHA3QAEAigCBAQgMIKAaIKQABAigCATQgDAdgNATQgPAWgdAEIgJABQgXAAgMgRg");
	this.shape.setTransform(0.0026,0.0259);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-78.5,-175.9,157,351.9);


(lib.Tween3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AARbHQgTgDgLgYQgJgSgCgbQgHhoAUibIAfkCQAJhlgCh/QgBhJgHicIgQlKQgXBCgiBLIhQCrQguBkgaBJQglBog6DXQg5C8hQBsQgTAagYANQgcAPgVgOQgOgJgEgSQgEgQAEgRQAEgOAKgQIAUgcQBGhkAzitQA0jFAhhfQAYhEB6kGQBejKAYiIQAIgvAFg7IAFhqIAUm+Qi4BtheA5QiyBshsBgQgbAYgSAJQgcAOgXgHQgVgHgJgXQgJgXALgTQAGgMAUgQQDji6EBiOIBNgqQArgZAegWIAcgUQgDgMgDgQQgJgygDhAQgCgnAAhNQAAg+ACggQACg0AHgpIABgBQhdg6gbhFQgFgNgJgjQgMg4gCgjQgEgzANgnIAOgjQAJgWAEgNQAFgPAFgeQAGgfAEgOQAOgpAigoQAfgkAcgLQATgGAfgBQCHgFB3A/QAiASASATQARASAPAjQAaA5ABA1QACBLgwBPQgTAfgcAjQgUAXgjAlQgrAvgcAVQgYATg0AfQgVAMgQAGQgGAggCApQgCAYAAA4IABBcQABAzAGAoQAFAiAGAPIDjlQQBIhrApg2IBYhwQA0hBAdgzQAKgSAHgIQALgOANgDQATgGASAPQASAPACAWQAFAggdAvQggA2hOBdQhRBggfAyIgyBVIguBEIjQErQgUAdgPAKQgJAHgKACIgYILQgFBigHAyIgEAaQAJAAAIAFQANAIAGASQAEANABAVQAbGWADGWQABBsgHA2QgEAggMA/QgeCnAACoIgBAgQgBASgGANQgHAPgNAJQgMAIgLAAIgHgBg");
	this.shape.setTransform(0.023,0.0446);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-70,-173.5,140.1,347.1);


(lib.Tween2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Ag2a3IihlcQhgjQg3iQQgVg3gJgjQgNgzAAgqQgBgtAOgzQALgnAVg1QAghNAxhcQAcg2A+huIA2hhQAUgiAOgLQAMgKAOgDQAIgDAIABIAWgKIAFgCIABgFQAIg1gIhBQgFgsgQhIQghiWgihyQgpiMg0h0IgZgzIgFAIQgJAMgUAUQlLFchcFeQgKAogLAQQgJANgNAIQgPAIgOgDQgQgCgLgOQgKgOgDgRQgDgYANgpQA5jABMiCQAcgxAuhBQBrieBXhbIAeggQARgSALgPIAQgVQAJgMAHgHQALgKAKgEIgrhaQhFiOgbhnIgCgIQgmgGgggZQgMANgVAFQgPADgZAAQg8ABgdgMQgdgNgfghQg3g+gXhOQgMgpgFgLIgUgkQgUglgEg4IgBhjIABgvQABgaAFgTQAGgYAOgSQAPgTAVgHQAJgDASgCQATgDAIgDQALgEAVgKQANgFATAAIAiACIBDgCQApgBAaAHQAzANA4A4QBiBkATBxQAGAfAAAuQABAvgJAbIgJAVQgGANgCAIIgCAWQgCAOgDAHQgCAHgGALQgGALgCAGQgFANABAiQAAAVgEAOQAHAKAGANQAFANAJAdQAdBeBOCbIAqBVIARABQAkADA0AOQHBBxFCD9QArAiBCA4QAUARAJAOQANAUgEASQgEATgVAKQgUAJgUgFQgSgEgTgNQgLgIgUgTQi4ikjphuQjJhgjbgvIATAvQAMAeAdBZQA/DJAXBqQAkCggFCGIAIAHQAUAVgCAuQgCAdgIAnIgOBDQgUBegGB4QgEBIAACQQAABfAJAuQAKAsAhBMQBSDDAwBlQBOCiBPB4QAVAfAFATQADAOgDAOQgDAPgKAIQgLAKgSAAQgPAAgPgIQgTgMgXgiQg5hWg6hzQgkhGg/iMIhRi1QgjhOgJgnQgHgdgCgmIgChDQgBjAAFhiQAIihAdh9QgKgBgJgBIgNAXQhTCMgpBMQhBB5gmBoQgbBHAAAtQgBAeAJAjQAGAYAOAoQA2CZBcDHQA2BzBtDmQAUAqAAAZQgBASgKAPQgLAQgRADIgHAAQgiAAgbg+g");
	this.shape.setTransform(0.0371,-0.0029);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86.1,-178.1,172.3,356.2);


(lib.Tween1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AKGY+QgLgGgQgOQkajwigifQgngmgUgYQgfglgSgiQgagwgNhCQgJgrgHhPQgnmmgCkIQAAgSABgOQgMgSgEgjQgKhRgTjYIAAgDIgJgBQgogFhNgUQh4ggg0gPQhfgdhJgeQhDgcgjgbQgYgTgZgdQgPgRgcgmQgkgwgQgcQgphCgZhZQgUhDgPhjQgIg5AZgTQAPgMAWAGQAVAGANARQAKAOAGAWQAEAOADAaQAKBEAMAsQAPA9AYAuQAUAmAxBBQAiAuAYAUQAZAWAjASQAaAMApAPQCRA1DoA0IgSjQQgMiFgChPQgCg/AChhQgfgCgQAAIglADQgWABgPgFQgUgHgbgaQgdgbgOgUQgKgPgNgaQgohPgQhUQgShXAIhVQAFgvAMgcQASgoAugoQAbgXAWgIQARgGAWgBIAnAAIAqAAQAYAAARAEQAsAKApAmQAeAbAiAyQAWAiAHASQALAaAFA0QAGBJgFAqQgJBDggApQgPATgCAGQgEAJAAAOIABAXQAAAfgQAaIgJALIAAAEQgCB5APDxQAGB5AIBYIAIBWQANgIASgGQB8gxDAghQA8gLAZgHQAvgOAegXQAjgcAYgzQAQggAUg/QALgkABgTQABgYgHgoIgaiHQgGggADgRQADgcAVgMQASgJAWAKQAUAKALAUQAIAQAEAZIAFAqQAEAdANA5QARBigcBjQgcBjhDBKQgkAoglAVQgoAXg/ANIhuARQg6ALhxAhQg0APgXALIgaAMQgQAHgMACIgFABIAaDVQADAZAAAOIgBAMIADADQALAQAJAmQArCoBWC9QBBCQBsDDQARAeAMAQQASAYAUAOQARALAZAJIAuANQA0AOBpAuQBWAmA2AQQANAHALADIADABIAOAKIACAHQAFAUgCAYQgBALgFAIQgDAFgGAEQgLAIgQABIgLgBIl1iKQgdgLgOgHQgYgLgQgNQgTgPgRgZQgLgPgSggQhIiAgnhIQg7hwgpheIgQgmQAMDEAUDCQAHA5AGAfQALAxASAjQAWApA6A6QDDDKDbCvQAWASALALQAQARAGATQAIAVgJAWQgKAWgUAEIgHAAQgLAAgNgGg");
	this.shape.setTransform(-4.0912,0.0409);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-92.7,-160.4,177.3,320.9);


(lib.window_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AkIBAIBdhYIAxDIIAEASIAFAcIAHAlIAGgwIAFgmIAEgZIA0kqIBPhNIA0DFQADAHADAOIAEAaIAHAjIAFguIAFgkIAFgdIAwkmIBchZIhkI6IheBbIgxiwIgFgWIgHggIgJgpIgJA9IgEAXIgDAXIgDATIgDALIgvEMIheBag");
	this.shape.setTransform(216.3,102.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhwE9QgTgFgKgbQgKgaAAg1IAAh5QAAg1AKgtQAKgtATgoQATgqAbgkQAcglAjgiIAGgGQAkgiAbgQQAcgRATAEQATAEAKAaQAKAcAAA1IAAB4QAAA1gKAsQgKAugTApQgTApgcAlQgbAkgkAiIgGAGQgjAigcARQgWAOgRAAIgHgBgAAdipQgMAGgOAOIgGAHQgPAOgKAPQgLAQgIASQgIASgDAWQgFAWAAAZIAABYQAAAfAFARQADASAIAGQAIAGALgGQAKgEAPgOIAGgHQAOgOAMgQQALgRAIgUQAIgVAEgZQAEgZAAgeIAAhYQAAgagEgOQgEgPgIgDIgGgBQgGAAgHADg");
	this.shape_1.setTransform(171.075,150.1593);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhsG4QgSAAgKgVQgLgVAAgvIAAi1QAAggAHgjQAIglAQgmQARglAbgoQAcgnAognIAQgPIARgOIAQgNIAPgIIAAixIBYhWIAAJ2QgrA7gpAxQgpAwgjAkQgeAbgYAQQgXAQgRAAIgCgBgAAgg2QgOAJgRAQQgeAdgPAmQgPAmAAAoIAAB1QAAAsAOAJQAOAJAfgeIASgTIAQgSIANgSIANgSIAAkJQgPAJgNAKg");
	this.shape_2.setTransform(133.25,174.5563);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AiSh0IAhgoIAmgsIAngrQATgVARgRQApgnAbgPQAcgOARADQASAEAHAUQAJAUAAAgIAAFRIhZBWIAAkwQgBhPg5A3IgOARIgRASIgPASQgHAIgEAGIAAFzIhZBVg");
	this.shape_3.setTransform(96.4,224.8743);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgrhoIBYhVIAAHaIhYBVgAgrkcIBYhVIAABvIhYBVg");
	this.shape_4.setTransform(68.95,239.125);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AkIBAIBdhYIAyDIIADASIAFAdIAHAkIAGgwIAFgmIAEgZIA0krIBPhMIA1DGQACAGACAOIAFAaIAHAjIAFguIAGgkIADgdIAxkmIBchZIhkI6IhfBbIgwiwIgFgWIgHgfIgJgrIgJA+IgEAYIgDAWIgEASIgCAMIgvELIhfBbg");
	this.shape_5.setTransform(33.85,277);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("EgTyAtxMAAAhbhMAnlAAAMAAABbhg");
	this.shape_6.setTransform(124.7,53.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_6}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.9,-239.4,253.3,592.7);


(lib.win_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AhPCeIAvhhIhbjZIBFAAIA2CcIA3icIBFAAIiGE6g");
	this.shape.setTransform(465.675,158.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AguByQgUgFgMgKQgNgJgFgNQgGgNABgQIAAgGQgBgRAIgNQAGgMANgIQAMgIASgEQASgEAXAAIAtAAIAAgJQAAgJgBgHQgCgHgEgFQgEgEgFgCQgHgDgKAAIgFAAQgLAAgKAEQgJAEgEALIg4gSQAFgNAIgJQAJgJALgFQAMgHAPgCQARgEASAAQAaAAASAFQASAFALAKQAMAJAEAPQAFAQABAVIAACQQgWAFgZADQgYAEgdAAQgdAAgUgFgAgfAaQgJAHAAALIAAACQAAAFACAFQADAEAFADQAEAEAJACQAIABAMAAIALAAIAKgBIAKgCIAHgCIAAguIgvAAQgSAAgHAHg");
	this.shape_1.setTransform(440.7,153.525);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgpCNQgQgPAAgjIAAj4IA9AAIAADoQAAARAFAJQAFAIAOAAQAIAAAHgBIAPgEIAAAuQgHAEgOACQgNACgPAAQghAAgRgRg");
	this.shape_2.setTransform(422.475,149.6);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AhmChIAAk1IAcgFIAdgDIAdgDIAbgBQAUAAAQAEQAQADANAJQAMAIAIAPQAHAPAAAWIAABUQAAAPgFAOQgGAOgLAKQgKAKgSAHQgRAGgYABQgNgBgNgBIgagDIAABZgAgUhtIgUAEIAACAIAVADIATABQAUAAAKgKQALgKAAgUIAAg4QAAgLgDgJQgCgHgGgFQgFgFgHgDQgIgBgKAAQgKgBgKACg");
	this.shape_3.setTransform(401,157.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgoByQgUgGgOgLQgPgLgHgSQgIgSAAgZIAAgxQAAgTAHgRQAGgRANgNQANgNATgHQATgIAZAAIAGAAQAWAAATAHQASAGAOANQANAMAHATQAIASAAAYIAAAlIiTAAIAAAGQAAAYANALQANALAXAAQAPAAANgDQANgCALgEQAMgEAJgFIARgKIAAAyQgPAMgXAHQgXAIgfAAQgZAAgUgFgAgfg8QgLAMAAAYIBVAAQAAgNgDgIQgDgJgFgGQgFgGgHgCQgIgDgJAAIgDAAQgUAAgLALg");
	this.shape_4.setTransform(374.975,153.525);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AhDB0IAAjbIASgFIAWgDQAMgCANAAQAMgCAOAAQAMAAAMACQALABAJADIAAA1IgJgDIgLgDIgKgCIgLgBIgRACIgPADIAACwg");
	this.shape_5.setTransform(354.6,153.25);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgCB3QgYAAgTgFQgUgFgNgKQgNgLgHgRQgGgRgBgZIAAg4QABgaAGgRQAHgRANgKQANgLAUgFQATgFAYAAIAEAAQAZAAATAFQATAFANALQAOAKAHARQAHARgBAaIAAA4QABAZgHARQgHARgOALQgNAKgTAFQgTAFgZAAgAgUhCQgHACgGAGQgEAFgEAIQgCAJAAAMIAAApQAAAPACAKQAEAKAEAGQAGAGAHADQAIADAKAAIAEAAQAKAAAIgDQAIgDAFgGQAGgGACgKQADgKAAgPIAAgpQAAgMgDgJQgCgIgGgFQgFgGgIgCQgIgCgKAAIgEAAQgKAAgIACg");
	this.shape_6.setTransform(321.05,153.525);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgICNQgOgEgJgIQgIgIgEgLQgDgMAAgOIAAh4IgeAAIAAgwIAeAAIAAg2IA8gGIAAA8IA4AAIAAAwIg4AAIAABmQAAAOAGAIQAGAIAPAAQAIAAAJgCIASgEIAAAvQgJAEgOACQgNACgSAAQgSAAgMgEg");
	this.shape_7.setTransform(299.65,150.875);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgoByQgUgGgOgLQgPgLgHgSQgIgSAAgZIAAgxQAAgTAHgRQAGgRANgNQANgNATgHQATgIAZAAIAGAAQAWAAATAHQASAGAOANQANAMAHATQAIASAAAYIAAAlIiTAAIAAAGQAAAYANALQANALAXAAQAPAAANgDQANgCALgEQAMgEAJgFIARgKIAAAyQgPAMgXAHQgXAIgfAAQgZAAgUgFgAgfg8QgLAMAAAYIBVAAQAAgNgDgIQgDgJgFgGQgFgGgHgCQgIgDgJAAIgDAAQgUAAgLALg");
	this.shape_8.setTransform(267.625,153.525);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AhDB0IAAjbIASgFIAXgDQALgCANAAQAMgCAOAAQANAAALACQALABAJADIAAA1IgJgDIgLgDIgKgCIgLgBIgRACIgPADIAACwg");
	this.shape_9.setTransform(247.25,153.25);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgoByQgUgGgOgLQgPgLgHgSQgIgSAAgZIAAgxQAAgTAHgRQAGgRANgNQANgNATgHQATgIAZAAIAGAAQAWAAATAHQASAGAOANQANAMAHATQAIASAAAYIAAAlIiTAAIAAAGQAAAYANALQANALAXAAQAPAAANgDQANgCALgEQAMgEAJgFIARgKIAAAyQgPAMgXAHQgXAIgfAAQgZAAgUgFgAgfg8QgLAMAAAYIBVAAQAAgNgDgIQgDgJgFgGQgFgGgHgCQgIgDgJAAIgDAAQgUAAgLALg");
	this.shape_10.setTransform(224.725,153.525);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AAoCbIAAiQQAAgkgoAAIgKAAIgLACIgKABIgIACIAACvIg+AAIAAk1IA+AAIAABSIAJgBIAMgBIANgBIAKgBQAcAAASAGQATAFALAKQALAKAFANQAFANAAAPIAACfg");
	this.shape_11.setTransform(198.875,149.325);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AAhCbIhJhzIAABzIg+AAIAAk1IA+AAIAAC7IBJhmIBEAAIhPBlIBRB7g");
	this.shape_12.setTransform(164.575,149.325);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgmBxQgVgHgNgMQgMgMgGgTQgGgSAAgYIAAgvQAAgWAHgRQAHgSAOgLQANgMASgGQASgGAWAAIACAAQAWAAAQAFQAPAGAKAHQAKAIAHAJIAMATIg2AWIgHgKIgIgJQgEgDgGgCQgFgCgHAAIgCAAQgVAAgJALQgIALAAAXIAAAuQAAAZAMALQANALAYAAQAOAAAMgDQAMgDALgFQAKgFAJgGQAIgFAGgGIAAA2QgGAFgIAFQgIAFgKAEQgLAEgNACQgNADgQAAQgdAAgVgGg");
	this.shape_13.setTransform(139.675,153.525);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgeCbIAAjgIA9AAIAADggAgehmIAAg0IA9AAIAAA0g");
	this.shape_14.setTransform(121.5,149.325);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgpCNQgQgPAAgjIAAj4IA9AAIAADoQAAARAFAJQAFAIAOAAQAIAAAHgBIAPgEIAAAuQgHAEgOACQgNACgPAAQghAAgRgRg");
	this.shape_15.setTransform(109.675,149.6);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgmBxQgVgHgNgMQgMgMgGgTQgGgSAAgYIAAgvQAAgWAHgRQAHgSAOgLQANgMASgGQASgGAWAAIACAAQAWAAAQAFQAPAGAKAHQAKAIAHAJIAMATIg2AWIgHgKIgIgJQgEgDgGgCQgFgCgHAAIgCAAQgVAAgJALQgIALAAAXIAAAuQAAAZAMALQANALAYAAQAOAAAMgDQAMgDALgFQAKgFAJgGQAIgFAGgGIAAA2IgOAKQgIAFgKAEQgLAEgNACQgNADgQAAQgdAAgVgGg");
	this.shape_16.setTransform(89.225,153.525);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AhJFIIAAhwICVAAIAABwgAg6CLIgQnSICUAAIgQHSg");
	this.shape_17.setTransform(458.35,65.475);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AhiFGQgkgHgagSQgbgTgOgeQgPgfAAgvIAAi0QAAgfALgdQAKgdAZgXQAYgWApgNQAngNA8AAIAXABIAZACIAYADIAVAEIAAixICCAAIAAJ2QhAASg8AJQg7AJg2AAQgpABglgIgAhBgnQgVAZAAAmIAAB1QAAAsAUAWQAUAXAtAAIAcgBIAWgEIATgFIATgGIAAkJQgWgGgTgCQgTgEgYAAQguAAgWAYg");
	this.shape_18.setTransform(414.55,66.05);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AhVDwQgrgLgegYQgegYgQglQgQgmAAg2IAAhnQAAgpAOglQANgjAbgcQAbgaAogPQAogRA1ABIAPAAQAvgBAnAOQAnAOAcAbQAcAaAQAnQAPAmAAAyIAABQIk3AAIAAAMQAAA0AbAWQAcAXAyAAQAfAAAcgGQAcgEAYgJQAYgIAUgLQATgLAPgKIAABqQgeAagxAQQgxAOhCAAQg0ABgrgLgAhCh/QgXAXgBA0IC1AAQAAgagGgTQgGgTgLgMQgLgMgPgFQgQgGgUABIgGAAQgsgBgWAYg");
	this.shape_19.setTransform(360.525,74.35);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AjYFUIAAqOQAbgFAfgFIA+gIIA+gFQAfgCAbAAQAoAAAjAIQAjAHAbASQAaASAPAfQAPAfAAAvIAACzQAAAggLAdQgLAdgXAWQgYAWgkAOQgkANgzAAQgcAAgbgCIg4gHIAAC8gAgtjnQgWADgTAFIAAEOQAZAGASADQATABAXAAQArAAAXgVQAWgWAAgsIAAh1QAAgZgGgQQgGgRgLgKQgLgLgQgEQgQgFgUAAQgYAAgWAEg");
	this.shape_20.setTransform(306.175,83.275);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AhiDwQgrgKgagUQgagUgLgbQgMgcAAgiIAAgLQAAgmAPgbQAOgaAagRQAbgRAmgIQAmgIAvAAIBhAAIAAgUQAAgUgDgOQgDgPgIgJQgIgKgNgEQgOgGgUAAIgLAAQgZABgUAIQgTAJgJAXIh3goQALgZASgUQARgSAZgNQAZgNAhgGQAhgGApAAQA2gBAmALQAmAJAZAVQAXAUALAgQALAgAAAtIAAEyQgwAKgzAIQgzAGg9AAQg9ABgrgLgAhEA4QgSAPAAAWIAAADQAAALAFALQAEAIALAHQALAIARAEQASADAZAAIAXgBIAWgBIAUgEIAQgEIAAhjIhjAAQgmABgRAQg");
	this.shape_21.setTransform(250.925,74.35);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AhRDtQgsgNgbgaQgbgagMgnQgNgmAAgzIAAhlQAAguAQglQAPgkAcgYQAbgZAmgMQAngMAvAAIAFAAQAvgBAgALQAgALAWAQQAVARAPAUQAOATALATIhzAvIgPgWQgHgKgIgHQgKgHgLgFQgLgFgPAAIgFAAQgsAAgTAYQgSAZAAAvIAABiQgBA1AbAWQAaAYA1AAQAcAAAbgHQAagGAWgKQAWgKATgMQARgMAMgMIAAByQgMAMgRAKQgRAKgXAIQgWAJgbAFQgcAEgiAAQg+AAgsgNg");
	this.shape_22.setTransform(200.75,74.35);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AjCDJIAAhyQAOANATAMQATALAWAIQAWAJAaAFQAZAFAdgBQAaABARgEQAQgEAJgGQAJgGADgJQADgHAAgKQAAgPgLgIQgLgJgSgGQgSgFgXgFIgvgKQgZgHgWgKQgYgKgSgRQgSgQgLgbQgLgaAAgmQAAgkAMgaQANgbAXgSQAXgSAigJQAhgLApABIAaAAQAlAAAdAHQAdAIAVANQAVANAQAUQANASAKAWIh2AlQgHgTgSgKQgQgJgZAAIgRAAQgbAAgMALQgMAMAAARQABAPAKAJQAMAIASAGQASAFAWADQAXAEAZAGQAYAGAYAKQAWAKASARQATARALAbQALAbAAAoQAAAigKAcQgMAcgYATQgZAUgoAKQgoAKg5AAQh5AAg8gxg");
	this.shape_23.setTransform(152.7,74.35);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("Ai3FIIAAqPIFwAAIAABrIjuAAIAACaIDaAAIAABpIjaAAIAAC3IDuAAIAABqg");
	this.shape_24.setTransform(106.45,65.475);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#323232").ss(1,1,1).p("AAAMbIAA41");
	this.shape_25.setTransform(-20,61.55);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("Egu3AWHIAAzCIAA41IAAgWMBdvAAAMAAAAsNg");
	this.shape_26.setTransform(279.975,121.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_26},{t:this.shape_25}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-21,-20.1,601,283);


(lib.start_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AAoB0IAAiPQAAgmgoABIgKAAIgLABIgKACIgIACIAACvIg+AAIAAjbIAYgEIAZgEIAbgDIAZgBQAcAAAUAGQATAFAMAKQAMAKAGAMQAFAOAAAPIAACfg");
	this.shape.setTransform(437.425,209.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgoByQgUgGgOgLQgPgLgHgSQgIgSAAgZIAAgxQAAgTAHgRQAGgRANgNQANgNATgHQATgIAZAAIAGAAQAWAAATAHQASAGAOANQANAMAHATQAIASAAAYIAAAlIiTAAIAAAGQAAAYANALQANALAXAAQAPAAANgDQANgCALgEQAMgEAJgFIARgKIAAAyQgPAMgXAHQgXAIgfAAQgZAAgUgFgAgfg8QgLAMAAAYIBVAAQAAgNgDgIQgDgJgFgGQgFgGgHgCQgIgDgJAAIgDAAQgUAAgLALg");
	this.shape_1.setTransform(411.525,210.125);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgoByQgUgGgOgLQgPgLgHgSQgIgSAAgZIAAgxQAAgTAHgRQAGgRANgNQANgNATgHQATgIAZAAIAGAAQAWAAATAHQASAGAOANQANAMAHATQAIASAAAYIAAAlIiTAAIAAAGQAAAYANALQANALAXAAQAPAAANgDQANgCALgEQAMgEAJgFIARgKIAAAyQgPAMgXAHQgXAIgfAAQgZAAgUgFgAgfg8QgLAMAAAYIBVAAQAAgNgDgIQgDgJgFgGQgFgGgHgCQgIgDgJAAIgDAAQgUAAgLALg");
	this.shape_2.setTransform(385.725,210.125);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AhDB0IAAjbIASgFIAXgDQALgCAOgBQALgBAOAAQAMAAAMACQALABAJADIAAA2IgJgEIgLgDIgLgCIgKAAIgSABIgOADIAACwg");
	this.shape_3.setTransform(365.35,209.85);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgmBxQgVgHgNgMQgMgMgGgTQgGgSAAgYIAAgvQAAgWAHgRQAHgSAOgLQANgMASgGQASgGAWAAIACAAQAWAAAQAFQAPAGAKAHQAKAIAHAJIAMATIg2AWIgHgKIgIgJQgEgDgGgCQgFgCgHAAIgCAAQgVAAgJALQgIALAAAXIAAAuQAAAZAMALQANALAYAAQAOAAAMgDQAMgDALgFQAKgFAJgGQAIgFAGgGIAAA2IgOAKQgIAFgKAEQgLAEgNACQgNADgQAAQgdAAgVgGg");
	this.shape_4.setTransform(343.925,210.125);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AhbBfIAAg2IAPAMQAJAFALAEQAKAEAMADQAMACAOAAQAMAAAIgCQAHgCAFgDQAEgDABgDQACgEAAgFQAAgHgFgEQgGgEgIgDIgTgEIgWgFQgMgDgLgFQgLgFgIgIQgJgHgFgNQgGgMAAgSQAAgRAHgMQAFgNALgJQALgJAQgEQAQgFATAAIAMAAQASAAANAEQAOADAKAHQAKAGAHAJQAHAJAFALIg5ARQgDgJgIgEQgIgFgMAAIgHAAQgNAAgGAFQgFAGAAAIQAAAHAFAEQAFAEAJADIATAEIAWAEQAMADALAFQALAFAIAIQAJAHAFANQAFANAAATQAAAQgFANQgFANgMAKQgLAJgTAFQgTAFgbAAQg5AAgcgYg");
	this.shape_5.setTransform(321.175,210.125);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgpCNQgQgPAAgjIAAj4IA9AAIAADoQAAARAFAJQAFAIAOAAQAIAAAHgBIAPgEIAAAuQgHAEgOACQgNACgPAAQghAAgRgRg");
	this.shape_6.setTransform(303.675,206.2);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgpCNQgQgPAAgjIAAj4IA9AAIAADoQAAARAFAJQAFAIAOAAQAIAAAHgBIAPgEIAAAuQgHAEgOACQgNACgPAAQghAAgRgRg");
	this.shape_7.setTransform(289.575,206.2);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AguBuQgUgGgMgJQgMgKgFgNQgGgNAAgPIAAieIA+AAIAACOQAAAlAnAAIALAAIALgCIALgCIAHgCIAAitIA+AAIAADZIgXAFIgaAEIgbACIgaABQgbAAgTgFg");
	this.shape_8.setTransform(267.775,210.475);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgqCdIAAiwIgdAAIAAgwIAdAAIAAgNQAAgUAEgPQAFgPAJgIQAJgJANgFQANgDASAAIAMAAIAMABIALACIAIACIAAAvIgOgDIgQgBQgMABgGAGQgFAHAAAPIAAALIAyAAIAAAwIgyAAIAACwg");
	this.shape_9.setTransform(247.25,205.8);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgCB3QgYAAgUgFQgSgFgOgKQgNgLgHgRQgHgRABgZIAAg4QgBgaAHgRQAHgRANgKQAOgLASgFQAUgFAYAAIAEAAQAZAAATAFQATAFANALQAOAKAHARQAGARAAAaIAAA4QAAAZgGARQgHARgOALQgNAKgTAFQgTAFgZAAgAgUhCQgHACgFAGQgGAFgCAIQgDAJAAAMIAAApQAAAPADAKQACAKAGAGQAFAGAHADQAIADAKAAIAEAAQAKAAAIgDQAIgDAFgGQAFgGADgKQADgKAAgPIAAgpQAAgMgDgJQgDgIgFgFQgFgGgIgCQgIgCgKAAIgEAAQgKAAgIACg");
	this.shape_10.setTransform(215.45,210.125);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgICNQgOgEgJgIQgIgIgDgLQgFgMAAgOIAAh4IgdAAIAAgwIAdAAIAAg2IA9gGIAAA8IA4AAIAAAwIg4AAIAABmQAAAOAGAIQAGAIAPAAQAHAAAKgCIASgEIAAAvQgKAEgNACQgOACgRAAQgSAAgMgEg");
	this.shape_11.setTransform(194.05,207.475);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AAHCbIAAj6IhMAtIAAg0IBag0IAxAAIAAE1g");
	this.shape_12.setTransform(161.65,205.925);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AAICbIAAj6IhNAtIAAg0IBZg0IAyAAIAAE1g");
	this.shape_13.setTransform(137.75,205.925);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AhWCbIAAk1ICtAAIAAAyIhvAAIAABbIBmAAIAAAxIhmAAIAAB3g");
	this.shape_14.setTransform(116.925,205.925);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgmA9IARhCIAAg3IA8AAIAAA3IgbBCg");
	this.shape_15.setTransform(460.275,163.9);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgJCNQgNgEgIgIQgJgIgEgLQgDgMAAgOIAAh4IgdAAIAAgwIAdAAIAAg2IA8gGIAAA8IA4AAIAAAwIg4AAIAABmQAAAOAGAIQAGAIAPAAQAIAAAJgCIATgEIAAAvQgLAEgNACQgOACgQAAQgUAAgMgEg");
	this.shape_16.setTransform(446.45,150.875);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AhDB0IAAjbIASgFIAXgDQALgCAOAAQALgCAOAAQAMAAAMACQALABAJADIAAA1IgJgDIgLgDIgLgCIgKgBIgSACIgOADIAACwg");
	this.shape_17.setTransform(429.7,153.25);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgtByQgVgFgMgKQgMgJgGgNQgGgNAAgQIAAgGQABgRAGgNQAHgMAMgIQANgIASgEQASgEAWAAIAuAAIAAgJQAAgJgCgHQgBgHgEgFQgDgEgHgCQgGgDgJAAIgGAAQgMAAgIAEQgKAEgEALIg4gSQAFgNAIgJQAJgJALgFQAMgHAQgCQAPgEAUAAQAZAAASAFQASAFAMAKQALAJAFAPQAEAQAAAVIAACQQgWAFgYADQgYAEgdAAQgdAAgTgFgAggAaQgIAHAAALIAAACQAAAFACAFQADAEAEADQAGAEAIACQAIABAMAAIAKAAIALgBIAJgCIAIgCIAAguIguAAQgSAAgJAHg");
	this.shape_18.setTransform(407,153.525);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AgICNQgOgEgJgIQgIgIgDgLQgFgMAAgOIAAh4IgdAAIAAgwIAdAAIAAg2IA9gGIAAA8IA4AAIAAAwIg4AAIAABmQAAAOAGAIQAGAIAPAAQAHAAAKgCIASgEIAAAvQgKAEgNACQgOACgRAAQgSAAgMgEg");
	this.shape_19.setTransform(386.2,150.875);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AhbBfIAAg2IAPAMQAJAFALAEQAKAEAMADQAMACAOAAQAMAAAIgCQAHgCAFgDQAEgDABgDQACgEAAgFQAAgHgFgEQgGgEgIgDIgTgEIgWgFQgMgDgLgFQgLgFgIgIQgJgHgFgNQgGgMAAgSQAAgRAHgMQAFgNALgJQALgJAQgEQAQgFATAAIAMAAQASAAANAEQAOADAKAHQAKAGAHAJQAHAJAFALIg5ARQgDgJgIgEQgIgFgMAAIgHAAQgNAAgGAFQgFAGAAAIQAAAHAFAEQAFAEAJADIATAEIAWAEQAMADALAFQALAFAIAIQAJAHAFANQAFANAAATQAAAQgFANQgFANgMAKQgLAJgTAFQgTAFgbAAQg5AAgcgYg");
	this.shape_20.setTransform(367.225,153.525);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AgBB3QgZAAgTgFQgUgFgNgKQgNgLgHgRQgGgRgBgZIAAg4QABgaAGgRQAHgRANgKQANgLAUgFQATgFAZAAIADAAQAZAAATAFQAUAFANALQANAKAHARQAHARAAAaIAAA4QAAAZgHARQgHARgNALQgNAKgUAFQgTAFgZAAgAgThCQgIACgGAGQgEAFgEAIQgCAJAAAMIAAApQAAAPACAKQAEAKAEAGQAGAGAIADQAHADAKAAIAEAAQAKAAAIgDQAIgDAGgGQAEgGAEgKQACgKAAgPIAAgpQAAgMgCgJQgEgIgEgFQgGgGgIgCQgIgCgKAAIgEAAQgKAAgHACg");
	this.shape_21.setTransform(332.5,153.525);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AgJCNQgNgEgIgIQgJgIgEgLQgDgMAAgOIAAh4IgdAAIAAgwIAdAAIAAg2IA8gGIAAA8IA4AAIAAAwIg4AAIAABmQAAAOAGAIQAGAIAPAAQAHAAAKgCIATgEIAAAvQgKAEgOACQgNACgRAAQgUAAgMgEg");
	this.shape_22.setTransform(311.1,150.875);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgoByQgUgGgOgLQgPgLgHgSQgIgSAAgZIAAgxQAAgTAHgRQAGgRANgNQANgNATgHQATgIAZAAIAGAAQAWAAATAHQASAGAOANQANAMAHATQAIASAAAYIAAAlIiTAAIAAAGQAAAYANALQANALAXAAQAPAAANgDQANgCALgEQAMgEAJgFIARgKIAAAyQgPAMgXAHQgXAIgfAAQgZAAgUgFgAgfg8QgLAMAAAYIBVAAQAAgNgDgIQgDgJgFgGQgFgGgHgCQgIgDgJAAIgDAAQgUAAgLALg");
	this.shape_23.setTransform(279.075,153.525);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AhDB0IAAjbIASgFIAXgDQALgCAOAAQALgCAOAAQAMAAAMACQALABAJADIAAA1IgJgDIgLgDIgLgCIgKgBIgSACIgOADIAACwg");
	this.shape_24.setTransform(258.7,153.25);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AgoByQgUgGgOgLQgPgLgHgSQgIgSAAgZIAAgxQAAgTAHgRQAGgRANgNQANgNATgHQATgIAZAAIAGAAQAWAAATAHQASAGAOANQANAMAHATQAIASAAAYIAAAlIiTAAIAAAGQAAAYANALQANALAXAAQAPAAANgDQANgCALgEQAMgEAJgFIARgKIAAAyQgPAMgXAHQgXAIgfAAQgZAAgUgFgAgfg8QgLAMAAAYIBVAAQAAgNgDgIQgDgJgFgGQgFgGgHgCQgIgDgJAAIgDAAQgUAAgLALg");
	this.shape_25.setTransform(236.175,153.525);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AAoCbIAAiQQAAgkgoAAIgKAAIgLACIgKABIgIACIAACvIg+AAIAAk1IA+AAIAABSIAJgBIAMgBIANgBIAKgBQAcAAASAGQATAFALAKQALAKAFANQAFANAAAPIAACfg");
	this.shape_26.setTransform(210.325,149.325);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AAhCbIhJhzIAABzIg+AAIAAk1IA+AAIAAC7IBJhmIBEAAIhPBlIBRB7g");
	this.shape_27.setTransform(176.025,149.325);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AgmBxQgVgHgNgMQgMgMgGgTQgGgSAAgYIAAgvQAAgWAHgRQAHgSAOgLQANgMASgGQASgGAWAAIACAAQAWAAAQAFQAPAGAKAHQAKAIAHAJIAMATIg2AWIgHgKIgIgJQgEgDgGgCQgFgCgHAAIgCAAQgVAAgJALQgIALAAAXIAAAuQAAAZAMALQANALAYAAQAOAAAMgDQAMgDALgFQAKgFAJgGQAIgFAGgGIAAA2IgOAKQgIAFgKAEQgLAEgNACQgNADgQAAQgdAAgVgGg");
	this.shape_28.setTransform(151.125,153.525);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AgeCbIAAjgIA9AAIAADggAgehmIAAg0IA9AAIAAA0g");
	this.shape_29.setTransform(132.95,149.325);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AgpCNQgQgPAAgjIAAj4IA9AAIAADoQAAARAFAJQAFAIAOAAQAIAAAHgBIAPgEIAAAuQgHAEgOACQgNACgPAAQghAAgRgRg");
	this.shape_30.setTransform(121.125,149.6);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AgmBxQgVgHgNgMQgMgMgGgTQgGgSAAgYIAAgvQAAgWAHgRQAHgSAOgLQANgMASgGQASgGAWAAIACAAQAWAAAQAFQAPAGAKAHQAKAIAHAJIAMATIg2AWIgHgKIgIgJQgEgDgGgCQgFgCgHAAIgCAAQgVAAgJALQgIALAAAXIAAAuQAAAZAMALQANALAYAAQAOAAAMgDQAMgDALgFQAKgFAJgGQAIgFAGgGIAAA2QgGAFgIAFQgIAFgKAEQgLAEgNACQgNADgQAAQgdAAgVgGg");
	this.shape_31.setTransform(100.675,153.525);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("ABVD1IAAkwQAAhPhVAAIgWACQgMAAgMACIgVAEQgLACgFACIAAFzIiDAAIAAnQIAxgIQAbgFAcgDIA5gGQAcgDAZAAQA8AAAoAMQApAMAaAUQAZAUAMAcQALAcAAAgIAAFRg");
	this.shape_32.setTransform(520.025,73.775);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AhAFIIAAnaICBAAIAAHagAhAjYIAAhvICBAAIAABvg");
	this.shape_33.setTransform(479.775,65.475);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AhiDwQgrgKgagUQgagUgLgbQgMgcAAgiIAAgLQAAgmAPgbQAOgaAagRQAbgRAmgIQAmgIAvAAIBhAAIAAgUQAAgUgDgOQgDgPgIgJQgIgKgNgEQgOgGgUAAIgLAAQgZABgUAIQgTAJgJAXIh3goQALgZASgUQARgSAZgNQAZgNAhgGQAhgGApAAQA2gBAmALQAmAJAZAVQAXAUALAgQALAgAAAtIAAEyQgwAKgzAIQgzAGg9AAQg9ABgrgLgAhEA4QgSAPAAAWIAAADQAAALAFALQAEAIALAHQALAIARAEQASADAZAAIAXgBIAWgBIAUgEIAQgEIAAhjIhjAAQgmABgRAQg");
	this.shape_34.setTransform(439.725,74.35);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AiPD1IAAnQIAngJQAVgEAZgEQAZgDAcgCQAagDAdAAQAbAAAYAEQAYADATAGIAABwQgJgEgLgDIgXgGQgLgDgMgBIgVgBQgRAAgUADQgUADgMADIAAF1g");
	this.shape_35.setTransform(399.675,73.775);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AhBFIIAAokIipAAIAAhrIHWAAIAABrIirAAIAAIkg");
	this.shape_36.setTransform(361.1,65.475);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AhVDwQgrgLgegYQgegYgQglQgQgmAAg2IAAhnQAAgpAOglQANgjAbgcQAbgaAogPQAogRA1ABIAPAAQAvgBAnAOQAnAOAcAbQAcAaAQAnQAPAmAAAyIAABQIk3AAIAAAMQAAA0AbAWQAcAXAyAAQAfAAAcgGQAcgEAYgJQAYgIAUgLQATgLAPgKIAABqQgeAagxAQQgxAOhCAAQg0ABgrgLgAhCh/QgXAXgBA0IC1AAQAAgagGgTQgGgTgLgMQgLgMgPgFQgQgGgUABIgGAAQgsgBgWAYg");
	this.shape_37.setTransform(287.475,74.35);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AjYFUIAAqOQAbgFAfgFIA+gIIA+gFQAfgCAbAAQAoAAAjAIQAjAHAbASQAaASAPAfQAPAfAAAvIAACzQAAAggLAdQgLAdgXAWQgYAWgkAOQgkANgzAAQgcAAgbgCIg4gHIAAC8gAgtjnQgWADgTAFIAAEOQAZAGASADQATABAXAAQArAAAXgVQAWgWAAgsIAAh1QAAgZgGgQQgGgRgLgKQgLgLgQgEQgQgFgUAAQgYAAgWAEg");
	this.shape_38.setTransform(233.125,83.275);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AhiDwQgrgKgagUQgagUgLgbQgMgcAAgiIAAgLQAAgmAPgbQAOgaAagRQAbgRAmgIQAmgIAvAAIBhAAIAAgUQAAgUgDgOQgDgPgIgJQgIgKgNgEQgOgGgUAAIgLAAQgZABgUAIQgTAJgJAXIh3goQALgZASgUQARgSAZgNQAZgNAhgGQAhgGApAAQA2gBAmALQAmAJAZAVQAXAUALAgQALAgAAAtIAAEyQgwAKgzAIQgzAGg9AAQg9ABgrgLgAhEA4QgSAPAAAWIAAADQAAALAFALQAEAIALAHQALAIARAEQASADAZAAIAXgBIAWgBIAUgEIAQgEIAAhjIhjAAQgmABgRAQg");
	this.shape_39.setTransform(177.875,74.35);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AhRDtQgsgNgbgaQgbgagNgnQgLgmAAgzIAAhlQAAguAOglQAPgkAcgYQAcgZAmgMQAngMAvAAIAFAAQAvgBAgALQAgALAWAQQAVARAPAUQAOATAKATIhyAvIgOgWQgIgKgJgHQgJgHgLgFQgLgFgPAAIgFAAQgtAAgSAYQgTAZAAAvIAABiQABA1AaAWQAbAYA0AAQAdAAAZgHQAagGAXgKQAWgKATgMQARgMALgMIAAByQgLAMgRAKQgSAKgVAIQgXAJgcAFQgcAEghAAQg/AAgrgNg");
	this.shape_40.setTransform(127.7,74.35);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AjCDJIAAhyQAPANASAMQATALAWAIQAWAJAaAFQAaAFAcgBQAaABAQgEQARgEAJgGQAJgGADgJQADgHAAgKQAAgPgLgIQgLgJgTgGQgSgFgVgFIgwgKQgYgHgYgKQgXgKgSgRQgSgQgLgbQgMgaAAgmQAAgkANgaQANgbAXgSQAYgSAhgJQAigLAoABIAaAAQAlAAAdAHQAdAIAVANQAWANAPAUQAOASAKAWIh4AlQgGgTgRgKQgSgJgYAAIgRAAQgbAAgMALQgMAMAAARQAAAPAMAJQALAIASAGQASAFAWADQAYAEAYAGQAYAGAXAKQAXAKATARQASARALAbQALAbAAAoQAAAigLAcQgLAcgZATQgYAUgoAKQgoAKg5AAQh4AAg9gxg");
	this.shape_41.setTransform(79.65,74.35);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("Ai4FIIAAqPIFwAAIAABrIjtAAIAACaIDaAAIAABpIjaAAIAAC3IDtAAIAABqg");
	this.shape_42.setTransform(33.4,65.475);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f().s("#323232").ss(1,1,1).p("AAAMbIAA41");
	this.shape_43.setTransform(-20,61.55);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("Egu3AWHIAAzCIAA41IAAgWMBdvAAAMAAAAsNg");
	this.shape_44.setTransform(279.975,121.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_44},{t:this.shape_43}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-21,-20.1,601,283);


(lib.retry_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AhPCeIAvhhIhbjZIBFAAIA2CcIA3icIBFAAIiGE6g");
	this.shape.setTransform(450.475,158.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhDB0IAAjbIASgFIAXgDQALgCAOAAQALgCAOAAQANAAALACQALABAJADIAAA1IgJgDIgLgDIgKgCIgLgBIgRACIgPADIAACwg");
	this.shape_1.setTransform(429.6,153.25);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgJCNQgNgEgIgIQgJgIgEgLQgDgMAAgOIAAh4IgdAAIAAgwIAdAAIAAg2IA8gGIAAA8IA4AAIAAAwIg4AAIAABmQAAAOAGAIQAGAIAPAAQAIAAAJgCIATgEIAAAvQgLAEgNACQgOACgQAAQgUAAgMgEg");
	this.shape_2.setTransform(411.35,150.875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgoByQgUgGgOgLQgPgLgHgSQgIgSAAgZIAAgxQAAgTAHgRQAGgRANgNQANgNATgHQATgIAZAAIAGAAQAWAAATAHQASAGAOANQANAMAHATQAIASAAAYIAAAlIiTAAIAAAGQAAAYANALQANALAXAAQAPAAANgDQANgCALgEQAMgEAJgFIARgKIAAAyQgPAMgXAHQgXAIgfAAQgZAAgUgFgAgfg8QgLAMAAAYIBVAAQAAgNgDgIQgDgJgFgGQgFgGgHgCQgIgDgJAAIgDAAQgUAAgLALg");
	this.shape_3.setTransform(390.125,153.525);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AhDB0IAAjbIASgFIAXgDQALgCAOAAQALgCAOAAQANAAALACQALABAJADIAAA1IgJgDIgLgDIgKgCIgLgBIgRACIgPADIAACwg");
	this.shape_4.setTransform(369.75,153.25);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgBB3QgZAAgTgFQgUgFgNgKQgNgLgHgRQgHgRAAgZIAAg4QAAgaAHgRQAHgRANgKQANgLAUgFQATgFAZAAIADAAQAZAAATAFQATAFAOALQANAKAHARQAGARABAaIAAA4QgBAZgGARQgHARgNALQgOAKgTAFQgTAFgZAAgAgThCQgIACgGAGQgEAFgEAIQgCAJAAAMIAAApQAAAPACAKQAEAKAEAGQAGAGAIADQAHADAKAAIAEAAQAKAAAIgDQAIgDAGgGQAEgGAEgKQACgKAAgPIAAgpQAAgMgCgJQgEgIgEgFQgGgGgIgCQgIgCgKAAIgEAAQgKAAgHACg");
	this.shape_5.setTransform(336.2,153.525);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgJCNQgNgEgIgIQgJgIgEgLQgEgMAAgOIAAh4IgcAAIAAgwIAcAAIAAg2IA9gGIAAA8IA4AAIAAAwIg4AAIAABmQAAAOAGAIQAGAIAPAAQAIAAAJgCIATgEIAAAvQgKAEgOACQgNACgRAAQgUAAgMgEg");
	this.shape_6.setTransform(314.8,150.875);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgoByQgUgGgOgLQgPgLgHgSQgIgSAAgZIAAgxQAAgTAHgRQAGgRANgNQANgNATgHQATgIAZAAIAGAAQAWAAATAHQASAGAOANQANAMAHATQAIASAAAYIAAAlIiTAAIAAAGQAAAYANALQANALAXAAQAPAAANgDQANgCALgEQAMgEAJgFIARgKIAAAyQgPAMgXAHQgXAIgfAAQgZAAgUgFgAgfg8QgLAMAAAYIBVAAQAAgNgDgIQgDgJgFgGQgFgGgHgCQgIgDgJAAIgDAAQgUAAgLALg");
	this.shape_7.setTransform(282.775,153.525);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AhDB0IAAjbIATgFIAVgDQAMgCAOAAQALgCAOAAQAMAAAMACQALABAJADIAAA1IgJgDIgLgDIgLgCIgKgBIgSACIgOADIAACwg");
	this.shape_8.setTransform(262.4,153.25);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgoByQgUgGgOgLQgPgLgHgSQgIgSAAgZIAAgxQAAgTAHgRQAGgRANgNQANgNATgHQATgIAZAAIAGAAQAWAAATAHQASAGAOANQANAMAHATQAIASAAAYIAAAlIiTAAIAAAGQAAAYANALQANALAXAAQAPAAANgDQANgCALgEQAMgEAJgFIARgKIAAAyQgPAMgXAHQgXAIgfAAQgZAAgUgFgAgfg8QgLAMAAAYIBVAAQAAgNgDgIQgDgJgFgGQgFgGgHgCQgIgDgJAAIgDAAQgUAAgLALg");
	this.shape_9.setTransform(239.875,153.525);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AAoCbIAAiQQAAgkgoAAIgKAAIgLACIgKABIgIACIAACvIg+AAIAAk1IA+AAIAABSIAJgBIAMgBIANgBIAKgBQAcAAASAGQATAFALAKQALAKAFANQAFANAAAPIAACfg");
	this.shape_10.setTransform(214.025,149.325);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AAhCbIhJhzIAABzIg+AAIAAk1IA+AAIAAC7IBJhmIBEAAIhPBlIBRB7g");
	this.shape_11.setTransform(179.725,149.325);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgmBxQgVgHgNgMQgMgMgGgTQgGgSAAgYIAAgvQAAgWAHgRQAHgSAOgLQANgMASgGQASgGAWAAIACAAQAWAAAQAFQAPAGAKAHQAKAIAHAJIAMATIg2AWIgHgKIgIgJQgEgDgGgCQgFgCgHAAIgCAAQgVAAgJALQgIALAAAXIAAAuQAAAZAMALQANALAYAAQAOAAAMgDQAMgDALgFQAKgFAJgGQAIgFAGgGIAAA2IgOAKQgIAFgKAEQgLAEgNACQgNADgQAAQgdAAgVgGg");
	this.shape_12.setTransform(154.825,153.525);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgeCbIAAjgIA9AAIAADggAgehmIAAg0IA9AAIAAA0g");
	this.shape_13.setTransform(136.65,149.325);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgpCNQgQgPAAgjIAAj4IA9AAIAADoQAAARAFAJQAFAIAOAAQAIAAAHgBIAPgEIAAAuQgHAEgOACQgNACgPAAQghAAgRgRg");
	this.shape_14.setTransform(124.825,149.6);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgmBxQgVgHgNgMQgMgMgGgTQgGgSAAgYIAAgvQAAgWAHgRQAHgSAOgLQANgMASgGQASgGAWAAIACAAQAWAAAQAFQAPAGAKAHQAKAIAHAJIAMATIg2AWIgHgKIgIgJQgEgDgGgCQgFgCgHAAIgCAAQgVAAgJALQgIALAAAXIAAAuQAAAZAMALQANALAYAAQAOAAAMgDQAMgDALgFQAKgFAJgGQAIgFAGgGIAAA2QgGAFgIAFQgIAFgKAEQgLAEgNACQgNADgQAAQgdAAgVgGg");
	this.shape_15.setTransform(104.375,153.525);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AhJFIIAAhwICVAAIAABwgAg6CLIgRnSICVAAIgRHSg");
	this.shape_16.setTransform(431.2,65.475);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AgTEqQgcgJgSgQQgTgRgHgYQgJgYAAgfIAAj9Ig9AAIAAhnIA9AAIAAhxICCgOIAAB/IB1AAIAABnIh1AAIAADXQAAAfAMARQANAQAfAAQAQAAAUgDIAngJIAABjQgVAIgcAEQgeAFgiAAQgoAAgbgJg");
	this.shape_17.setTransform(397.25,68.725);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("ABVFIIAAkxQAAhOhVAAIgWACQgMAAgMACIgVAEQgLACgFACIAAFzIiDAAIAAqPICDAAIAACuIATgCIAZgCIAbgDIAVgBQA8AAAnAMQAoAMAXAUQAYAUAKAcQAKAcAAAgIAAFRg");
	this.shape_18.setTransform(353.025,65.475);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AhvFMQgxgJgkgTIAAhwQAOALAUAIQATAIAWAGQAVAFAWADQAXADAVAAQAiAAAXgFQAWgEAPgLQAOgMAFgTQAGgTAAgdIAAgKIgWAHQgNAFgPADQgOADgQACQgQADgRAAQglAAgigHQgjgIgagRQgagSgPgeQgPgeAAgtIAAitQAAggAMgcQAMgeAagWQAYgWApgNQAngOA3AAQAaAAAcACIA6AEIA5AHIA3AHIAAHbQAAA0gQAjQgQAjgeAWQgeAVgqAKQgqAJgyAAQg1AAgxgIgAg/jSQgXAYAAAnIAAB4QAAAmAXASQAXARAnAAQALAAANgCQALgBAMgEIAXgHIASgHIAAj6IgTgEIgWgDIgXgCIgVgBQgrAAgWAZg");
	this.shape_19.setTransform(298.05,83.275);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AhjDoQgpgMgZgUQgagVgLgbQgMgcAAggIAAlOICCAAIAAEtQAABPBUAAIAXgBIAYgDIAWgEIAQgEIAAlwICCAAIAAHMIgxAJIg3AIIg4AGQgdACgaAAQg6AAgpgLg");
	this.shape_20.setTransform(243.425,75.075);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AhiDwQgrgKgagUQgagUgLgbQgMgcAAgiIAAgLQAAgmAPgbQAOgaAagRQAbgRAmgIQAmgIAvAAIBhAAIAAgUQAAgUgDgOQgDgPgIgJQgIgKgNgEQgOgGgUAAIgLAAQgZABgUAIQgTAJgJAXIh3goQALgZASgUQARgSAZgNQAZgNAhgGQAhgGApAAQA2gBAmALQAmAJAZAVQAXAUALAgQALAgAAAtIAAEyQgwAKgzAIQgzAGg9AAQg9ABgrgLgAhEA4QgSAPAAAWIAAADQAAALAFALQAEAIALAHQALAIARAEQASADAZAAIAXgBIAWgBIAUgEIAQgEIAAhjIhjAAQgmABgRAQg");
	this.shape_21.setTransform(188.875,74.35);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AgLFSQgyAAgngOQgmgNgbgZQgbgZgPghQgOgiAAgnIAAk1QAAgnAOgiQAPghAbgZQAZgZAngOQAmgNAyAAIAkAAQAqAAAjANQAiAMAZAXQAZAXAPAgQAQAfAGAmIiDARQgCgVgIgPQgHgQgLgKQgLgLgNgFQgNgFgOAAIgSAAQglAAgVAXQgXAYAAAzIAADzQAAB6BrAAIAaAAQAcAAAcgKQAcgKAYgPQAYgOASgPQASgQAJgKIAAB7QgJAKgRANQgQANgaALQgZALggAIQghAHgoAAg");
	this.shape_22.setTransform(136.5,65.575);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#323232").ss(1,1,1).p("AAAMbIAA41");
	this.shape_23.setTransform(-20,61.55);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("Egu3AWHIAAzCIAA41IAAgWMBdvAAAMAAAAsNg");
	this.shape_24.setTransform(279.975,121.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_24},{t:this.shape_23}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-21,-20.1,601,283);


(lib.door_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AiPD1IAAnQIAngJQAVgEAZgEQAZgDAcgCQAagDAdAAQAbAAAYAEQAYADATAGIAABwQgJgEgLgDIgXgGIgXgEIgVgBQgRAAgUADQgUADgMADIAAF1g");
	this.shape.setTransform(51.775,257.525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgED7Qg1AAgogKQgpgKgcgWQgcgYgOgkQgOgjAAg2IAAh3QAAg1AOglQAOgkAcgVQAcgYApgJQAogKA1AAIAJAAQAzAAApAKQApAJAcAYQAcAVAPAkQAOAlAAA1IAAB3QAAA2gOAjQgPAkgcAYQgcAWgpAKQgpAKgzAAgAgqiNQgRAFgKAMQgLALgGARQgGASAAAbIAABXQAAAfAGAVQAGAWALAMQAKANARAGQAPAFAWAAIAJAAQAVAAARgFQARgGALgNQAMgMAFgWQAHgVAAgfIAAhXQAAgbgHgSQgFgRgMgLQgLgMgRgFQgRgEgVgBIgJAAQgWABgPAEg");
	this.shape_1.setTransform(49.5,196.85);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgED6Qg1AAgogJQgpgKgcgXQgcgXgOgjQgOglAAg0IAAh4QAAg1AOgkQAOgkAcgXQAcgXApgJQAogLA1AAIAJAAQAzAAApALQApAJAcAXQAcAXAPAkQAOAkAAA1IAAB4QAAA0gOAlQgPAjgcAXQgcAXgpAKQgpAJgzAAgAgqiNQgRAGgKAKQgLAMgGARQgGATAAAaIAABXQAAAfAGAVQAGAWALANQAKANARAFQAPAGAWgBIAJAAQAVABARgGQARgFALgNQAMgNAFgWQAHgVAAgfIAAhXQAAgagHgTQgFgRgMgMQgLgKgRgGQgRgEgVAAIgJAAQgWAAgPAEg");
	this.shape_2.setTransform(49.5,135.6);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AhiFGQgkgHgagSQgagTgPgeQgPgfAAgvIAAi0QAAgfALgdQAKgdAZgXQAYgWApgNQAngNA8AAIAXABIAZACIAZADIAUAEIAAixICCAAIAAJ2QhAASg7AJQg8AJg2AAQgpABglgIgAhBgnQgVAZAAAmIAAB1QAAAsAUAWQAUAXAtAAIAbgBIAXgEIATgFIATgGIAAkJQgWgGgTgCQgTgEgYAAQguAAgWAYg");
	this.shape_3.setTransform(49.05,66.05);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("EgeSAxaMAAAhizMA8lAAAMAAABizg");
	this.shape_4.setTransform(-92.925,142.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_4}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-286.8,-173.7,387.8,632.3);


(lib.cupboard_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AhiFGQgkgHgagSQgbgTgOgeQgPgfAAgvIAAi0QAAgfAKgdQAMgdAYgXQAYgWAogNQAogNA7AAIAYABIAZACIAZADIAUAEIAAixICCAAIAAJ2QhAASg7AJQg8AJg1AAQgrABgkgIgAhAgnQgWAZAAAmIAAB1QAAAsAUAWQAVAXAtAAIAagBIAXgEIAUgFIASgGIAAkJQgWgGgTgCQgUgEgYAAQgtAAgVAYg");
	this.shape.setTransform(388.5,66.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AiPD1IAAnQIAngJQAVgEAZgEQAZgDAcgCQAagDAdAAQAbAAAYAEQAYADATAGIAABwQgJgEgLgDIgXgGQgLgDgMgBIgVgBQgRAAgUADQgUADgMADIAAF1g");
	this.shape_1.setTransform(345.975,73.775);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhiDwQgrgKgagUQgagUgLgbQgMgcAAgiIAAgLQAAgmAPgbQAOgaAagRQAbgRAmgIQAmgIAvAAIBhAAIAAgUQAAgUgDgOQgDgPgIgJQgIgKgNgEQgOgGgUAAIgLAAQgZABgUAIQgTAJgJAXIh3goQALgZASgUQARgSAZgNQAZgNAhgGQAhgGApAAQA2gBAmALQAmAJAZAVQAXAUALAgQALAgAAAtIAAEyQgwAKgzAIQgzAGg9AAQg9ABgrgLgAhEA4QgSAPAAAWIAAADQAAALAFALQAEAIALAHQALAIARAEQASADAZAAIAXgBIAWgBIAUgEIAQgEIAAhjIhjAAQgmABgRAQg");
	this.shape_2.setTransform(298.075,74.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgED6Qg0ABgpgKQgogLgcgVQgcgXgPglQgOgjAAg2IAAh3QAAg1AOglQAPgkAcgVQAcgXAogKQApgKA0AAIAJAAQA0AAAoAKQApAKAcAXQAcAVAPAkQAOAlAAA1IAAB3QAAA2gOAjQgPAlgcAXQgcAVgpALQgoAKg0gBgAgqiMQgQAEgMAMQgKAKgGATQgGARAAAbIAABXQAAAfAGAVQAGAVAKANQAMANAQAGQAPAFAWABIAJAAQAVgBARgFQARgGALgNQAMgNAGgVQAFgVABgfIAAhXQgBgbgFgRQgGgTgMgKQgLgMgRgEQgRgFgVgBIgJAAQgWABgPAFg");
	this.shape_3.setTransform(245.05,74.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AhmFHQg5gHg5gLIAAqCICCAAIAAC6IAXgHIAcgGIAegFQAOgBALAAQArAAAkAHQAkAIAbARQAaATAPAfQAOAfAAAuIAAC0QAAAfgLAdQgKAdgZAWQgYAXgoANQgpANg7AAQg2ABg3gHgAgwg5QgUAEgSAHIAAEKQAUAEAUAEQAUACAZAAQAtAAAVgYQAWgWAAgrIAAh1QAAgtgVgUQgVgWgsAAQgdABgUAFg");
	this.shape_4.setTransform(190.075,66.05);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AjYFUIAAqOQAbgFAfgFIA+gIIA+gFQAfgCAbAAQAoAAAjAIQAjAHAbASQAaASAPAfQAPAfAAAvIAACzQAAAggLAdQgLAdgXAWQgYAWgkAOQgkANgzAAQgcAAgbgCIg4gHIAAC8gAgtjnQgWADgTAFIAAEOQAZAGASADQATABAXAAQArAAAXgVQAWgWAAgsIAAh1QAAgZgGgQQgGgRgLgKQgLgLgQgEQgQgFgUAAQgYAAgWAEg");
	this.shape_5.setTransform(135.225,83.275);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AhjDoQgpgMgZgUQgagVgLgbQgMgcAAggIAAlOICCAAIAAEtQAABPBUAAIAXgBIAYgDIAWgEIAQgEIAAlwICCAAIAAHMIgxAJIg3AIIg4AGQgdACgaAAQg6AAgpgLg");
	this.shape_6.setTransform(79.675,75.075);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AhRDtQgsgNgbgaQgbgagMgnQgMgmAAgzIAAhlQAAguAOglQAPgkAcgYQAcgZAmgMQAngMAvAAIAFAAQAvgBAgALQAgALAWAQQAVARAPAUQAOATAKATIhyAvIgOgWQgIgKgJgHQgJgHgLgFQgLgFgPAAIgFAAQgtAAgSAYQgTAZAAAvIAABiQABA1AaAWQAaAYA1AAQAdAAAagHQAZgGAXgKQAWgKATgMQARgMALgMIAAByQgLAMgRAKQgSAKgVAIQgXAJgbAFQgdAEghAAQg/AAgrgNg");
	this.shape_7.setTransform(27.8,74.35);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("Egw9Ao9MAAAhR5MBh7AAAMAAABR5g");
	this.shape_8.setTransform(211.5276,259.9,0.9288,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_8}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-79.5,-2.2,582.2,524.2);


// stage content:
(lib.finalproject = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {retry:1,door:60,cupboard:120,window:180,door2:240,cupboard2:300};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,29,59,89,97,119,120,149,179,180,209,239,269,277,299,300,329,359];
	this.streamSoundSymbolsList[0] = [{id:"freesound_communityhungariantrainride59446wav",startFrame:0,endFrame:180,loop:1,offset:0}];
	this.streamSoundSymbolsList[29] = [{id:"freesound_communitywoodenslidingdoor72283wav",startFrame:29,endFrame:89,loop:1,offset:0}];
	this.streamSoundSymbolsList[89] = [{id:"freesound_communitywoodenslidingdoor72283wav",startFrame:89,endFrame:120,loop:1,offset:0}];
	this.streamSoundSymbolsList[97] = [{id:"_339320__westshorebass__flashboom_starkformachines_editedwav",startFrame:97,endFrame:120,loop:1,offset:0}];
	this.streamSoundSymbolsList[120] = [{id:"_552161__quantumriver__keysjinglinganddropping_editedwav",startFrame:120,endFrame:300,loop:1,offset:0},{id:"freesound_communitywoodenslidingdoor72283wav",startFrame:120,endFrame:149,loop:1,offset:0}];
	this.streamSoundSymbolsList[149] = [{id:"freesound_communitywoodenslidingdoor72283wav",startFrame:149,endFrame:180,loop:1,offset:0}];
	this.streamSoundSymbolsList[180] = [{id:"freesound_communitywoodenslidingdoor72283wav",startFrame:180,endFrame:209,loop:1,offset:0},{id:"freesound_communityhungariantrainride59446wav",startFrame:180,endFrame:360,loop:1,offset:0}];
	this.streamSoundSymbolsList[209] = [{id:"freesound_communitywoodenslidingdoor72283wav",startFrame:209,endFrame:269,loop:1,offset:0}];
	this.streamSoundSymbolsList[269] = [{id:"freesound_communitywoodenslidingdoor72283wav",startFrame:269,endFrame:300,loop:1,offset:0}];
	this.streamSoundSymbolsList[277] = [{id:"_339320__westshorebass__flashboom_starkformachines_editedwav",startFrame:277,endFrame:300,loop:1,offset:0}];
	this.streamSoundSymbolsList[300] = [{id:"_552161__quantumriver__keysjinglinganddropping_editedwav",startFrame:300,endFrame:360,loop:1,offset:0},{id:"freesound_communitywoodenslidingdoor72283wav",startFrame:300,endFrame:329,loop:1,offset:0}];
	this.streamSoundSymbolsList[329] = [{id:"freesound_communitywoodenslidingdoor72283wav",startFrame:329,endFrame:360,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("freesound_communityhungariantrainride59446wav",0);
		this.InsertIntoSoundStreamData(soundInstance,0,180,1);
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.start_btn.on('click', function(){
		/*
		Moves the playhead to the specified frame number in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndPlay('retry');
		});
	}
	this.frame_29 = function() {
		var soundInstance = playSound("freesound_communitywoodenslidingdoor72283wav",0);
		this.InsertIntoSoundStreamData(soundInstance,29,89,1);
	}
	this.frame_59 = function() {
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.door_btn.on('click', function(){
		/*
		Play a Movie Clip/Video or the current timeline.
		Plays the specified movie clip or video.
		*/
		_this.gotoAndPlay('door');
		});
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.window_btn.on('click', function(){
		/*
		Play a Movie Clip/Video or the current timeline.
		Plays the specified movie clip or video.
		*/
		_this.gotoAndPlay('window');
		});
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.cupboard_btn.on('click', function(){
		/*
		Play a Movie Clip/Video or the current timeline.
		Plays the specified movie clip or video.
		*/
		_this.gotoAndPlay('cupboard');
		});
	}
	this.frame_89 = function() {
		var soundInstance = playSound("freesound_communitywoodenslidingdoor72283wav",0);
		this.InsertIntoSoundStreamData(soundInstance,89,120,1);
	}
	this.frame_97 = function() {
		var soundInstance = playSound("_339320__westshorebass__flashboom_starkformachines_editedwav",0);
		this.InsertIntoSoundStreamData(soundInstance,97,120,1);
	}
	this.frame_119 = function() {
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.retry_btn.on('click', function(){
		/*
		Moves the playhead to the specified frame number in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndPlay('retry');
		});
	}
	this.frame_120 = function() {
		var soundInstance = playSound("freesound_communitywoodenslidingdoor72283wav",0);
		this.InsertIntoSoundStreamData(soundInstance,120,149,1);
		var soundInstance = playSound("_552161__quantumriver__keysjinglinganddropping_editedwav",0);
		this.InsertIntoSoundStreamData(soundInstance,120,300,1);
	}
	this.frame_149 = function() {
		var soundInstance = playSound("freesound_communitywoodenslidingdoor72283wav",0);
		this.InsertIntoSoundStreamData(soundInstance,149,180,1);
	}
	this.frame_179 = function() {
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.retry_btn2.on('click', function(){
		/*
		Moves the playhead to the specified frame number in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndPlay('retry');
		});
	}
	this.frame_180 = function() {
		var soundInstance = playSound("freesound_communityhungariantrainride59446wav",0);
		this.InsertIntoSoundStreamData(soundInstance,180,360,1);
		var soundInstance = playSound("freesound_communitywoodenslidingdoor72283wav",0);
		this.InsertIntoSoundStreamData(soundInstance,180,209,1);
	}
	this.frame_209 = function() {
		var soundInstance = playSound("freesound_communitywoodenslidingdoor72283wav",0);
		this.InsertIntoSoundStreamData(soundInstance,209,269,1);
	}
	this.frame_239 = function() {
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.door_btn2.on('click', function(){
		/*
		Play a Movie Clip/Video or the current timeline.
		Plays the specified movie clip or video.
		*/
		_this.gotoAndPlay('door2');
		});
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.cupboard_btn2.on('click', function(){
		/*
		Play a Movie Clip/Video or the current timeline.
		Plays the specified movie clip or video.
		*/
		_this.gotoAndPlay('cupboard2');
		});
	}
	this.frame_269 = function() {
		var soundInstance = playSound("freesound_communitywoodenslidingdoor72283wav",0);
		this.InsertIntoSoundStreamData(soundInstance,269,300,1);
	}
	this.frame_277 = function() {
		var soundInstance = playSound("_339320__westshorebass__flashboom_starkformachines_editedwav",0);
		this.InsertIntoSoundStreamData(soundInstance,277,300,1);
	}
	this.frame_299 = function() {
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.retry_btn3.on('click', function(){
		/*
		Moves the playhead to the specified frame number in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndPlay('retry');
		});
	}
	this.frame_300 = function() {
		var soundInstance = playSound("freesound_communitywoodenslidingdoor72283wav",0);
		this.InsertIntoSoundStreamData(soundInstance,300,329,1);
		var soundInstance = playSound("_552161__quantumriver__keysjinglinganddropping_editedwav",0);
		this.InsertIntoSoundStreamData(soundInstance,300,360,1);
	}
	this.frame_329 = function() {
		var soundInstance = playSound("freesound_communitywoodenslidingdoor72283wav",0);
		this.InsertIntoSoundStreamData(soundInstance,329,360,1);
	}
	this.frame_359 = function() {
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.win_btn.on('click', function(){
		/*
		Moves the playhead to the specified frame label in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndPlay('retry');
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(29).call(this.frame_29).wait(30).call(this.frame_59).wait(30).call(this.frame_89).wait(8).call(this.frame_97).wait(22).call(this.frame_119).wait(1).call(this.frame_120).wait(29).call(this.frame_149).wait(30).call(this.frame_179).wait(1).call(this.frame_180).wait(29).call(this.frame_209).wait(30).call(this.frame_239).wait(30).call(this.frame_269).wait(8).call(this.frame_277).wait(22).call(this.frame_299).wait(1).call(this.frame_300).wait(29).call(this.frame_329).wait(30).call(this.frame_359).wait(1));

	// start
	this.start_btn = new lib.start_btn();
	this.start_btn.name = "start_btn";
	this.start_btn.setTransform(960.05,186.4,1,1,0,0,0,277.6,59.6);
	new cjs.ButtonHelper(this.start_btn, 0, 1, 2, false, new lib.start_btn(), 3);

	this.timeline.addTween(cjs.Tween.get(this.start_btn).to({_off:true},1).wait(359));

	// door
	this.door_btn = new lib.door_btn();
	this.door_btn.name = "door_btn";
	this.door_btn.setTransform(1678.5,303.5,1,1,0,0,0,49.5,124.6);
	this.door_btn._off = true;
	new cjs.ButtonHelper(this.door_btn, 0, 1, 2, false, new lib.door_btn(), 3);

	this.timeline.addTween(cjs.Tween.get(this.door_btn).wait(59).to({_off:false},0).to({_off:true},1).wait(300));

	// door2
	this.door_btn2 = new lib.door_btn();
	this.door_btn2.name = "door_btn2";
	this.door_btn2.setTransform(1678.5,303.5,1,1,0,0,0,49.5,124.6);
	this.door_btn2._off = true;
	new cjs.ButtonHelper(this.door_btn2, 0, 1, 2, false, new lib.door_btn(), 3);

	this.timeline.addTween(cjs.Tween.get(this.door_btn2).wait(239).to({_off:false},0).to({_off:true},1).wait(120));

	// window
	this.window_btn = new lib.window_btn();
	this.window_btn.name = "window_btn";
	this.window_btn.setTransform(140.95,440.05,1,1,0,0,0,125,179.5);
	this.window_btn._off = true;
	new cjs.ButtonHelper(this.window_btn, 0, 1, 2, false, new lib.window_btn(), 3);

	this.timeline.addTween(cjs.Tween.get(this.window_btn).wait(59).to({_off:false},0).to({_off:true},1).wait(300));

	// cupboard
	this.cupboard_btn = new lib.cupboard_btn();
	this.cupboard_btn.name = "cupboard_btn";
	this.cupboard_btn.setTransform(959.95,613.05,1,1,0,0,0,209.2,59.6);
	this.cupboard_btn._off = true;
	new cjs.ButtonHelper(this.cupboard_btn, 0, 1, 2, false, new lib.cupboard_btn(), 3);

	this.timeline.addTween(cjs.Tween.get(this.cupboard_btn).wait(59).to({_off:false},0).to({_off:true},1).wait(300));

	// cupboard2
	this.cupboard_btn2 = new lib.cupboard_btn();
	this.cupboard_btn2.name = "cupboard_btn2";
	this.cupboard_btn2.setTransform(959.95,613.05,1,1,0,0,0,209.2,59.6);
	this.cupboard_btn2._off = true;
	new cjs.ButtonHelper(this.cupboard_btn2, 0, 1, 2, false, new lib.cupboard_btn(), 3);

	this.timeline.addTween(cjs.Tween.get(this.cupboard_btn2).wait(239).to({_off:false},0).to({_off:true},1).wait(120));

	// retry
	this.retry_btn = new lib.retry_btn();
	this.retry_btn.name = "retry_btn";
	this.retry_btn.setTransform(960.05,186.4,1,1,0,0,0,277.6,59.6);
	this.retry_btn._off = true;
	new cjs.ButtonHelper(this.retry_btn, 0, 1, 2, false, new lib.retry_btn(), 3);

	this.timeline.addTween(cjs.Tween.get(this.retry_btn).wait(119).to({_off:false},0).to({_off:true},1).wait(240));

	// retry2
	this.retry_btn2 = new lib.retry_btn();
	this.retry_btn2.name = "retry_btn2";
	this.retry_btn2.setTransform(960.05,186.4,1,1,0,0,0,277.6,59.6);
	this.retry_btn2._off = true;
	new cjs.ButtonHelper(this.retry_btn2, 0, 1, 2, false, new lib.retry_btn(), 3);

	this.timeline.addTween(cjs.Tween.get(this.retry_btn2).wait(179).to({_off:false},0).to({_off:true},1).wait(180));

	// retry3
	this.retry_btn3 = new lib.retry_btn();
	this.retry_btn3.name = "retry_btn3";
	this.retry_btn3.setTransform(960.05,186.4,1,1,0,0,0,277.6,59.6);
	this.retry_btn3._off = true;
	new cjs.ButtonHelper(this.retry_btn3, 0, 1, 2, false, new lib.retry_btn(), 3);

	this.timeline.addTween(cjs.Tween.get(this.retry_btn3).wait(299).to({_off:false},0).to({_off:true},1).wait(60));

	// win
	this.win_btn = new lib.win_btn();
	this.win_btn.name = "win_btn";
	this.win_btn.setTransform(960.05,186.4,1,1,0,0,0,277.6,59.6);
	this.win_btn._off = true;
	new cjs.ButtonHelper(this.win_btn, 0, 1, 2, false, new lib.win_btn(), 3);

	this.timeline.addTween(cjs.Tween.get(this.win_btn).wait(359).to({_off:false},0).wait(1));

	// dialogue
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AAhBJIgMiQIBWAAIgMCQgAheBJIgMiQIBVAAIgMCQg");
	this.shape.setTransform(1313.475,35.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgtDPIAAhHIBdAAIAABHgAgkBYIgLkmIBeAAIgKEmg");
	this.shape_1.setTransform(1289.675,48.65);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("Ag1CXQgbgHgTgPQgTgPgKgXQgLgYAAgiIAAhBQAAgaAJgXQAJgXARgRQARgRAZgJQAZgKAiAAIAJAAQAeAAAYAIQAZAJASARQARAQAKAZQAKAYAAAgIAAAyIjFAAIAAAIQAAAgASAOQASAOAfAAQATAAASgDQARgDAPgFQAQgGAMgGIAWgOIAABEQgTAPgfAKQgfAKgpAAQghAAgbgHgAgphQQgPAPgBAgIBzAAQAAgRgEgLQgEgMgHgIQgHgHgKgDQgJgEgNAAIgEAAQgbAAgOAPg");
	this.shape_2.setTransform(1262.525,54.275);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AhaCbIAAklIAZgGIAdgEQAPgDASgBQAQgBATgBQAQABAQACQAPACAMADIAABHIgNgFIgOgDIgPgCIgNgBIgYACIgTADIAADsg");
	this.shape_3.setTransform(1235.425,53.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("Ag1CXQgbgHgTgPQgTgPgKgXQgLgYAAgiIAAhBQAAgaAJgXQAJgXARgRQARgRAZgJQAZgKAiAAIAJAAQAeAAAYAIQAZAJASARQARAQAKAZQAKAYAAAgIAAAyIjFAAIAAAIQAAAgASAOQASAOAfAAQATAAASgDQARgDAPgFQAQgGAMgGIAWgOIAABEQgTAPgfAKQgfAKgpAAQghAAgbgHgAgphQQgPAPgBAgIBzAAQAAgRgEgLQgEgMgHgIQgHgHgKgDQgJgEgNAAIgEAAQgbAAgOAPg");
	this.shape_4.setTransform(1205.325,54.275);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AA1DPIAAjAQAAgyg1AAIgNABIgQACIgNADIgKACIAADqIhTAAIAAmdIBTAAIAABuIAMgCIAQgBIAQgBIAOgBQAlAAAZAHQAZAIAPANQAPAMAGASQAHARAAAUIAADVg");
	this.shape_5.setTransform(1170.875,48.65);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AAtDPIhiiaIAACaIhTAAIAAmdIBTAAIAAD6IBiiIIBaAAIhqCHIBsCkg");
	this.shape_6.setTransform(1125.075,48.65);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgzCWQgcgJgRgQQgRgQgIgZQgHgYAAggIAAg/QAAgeAKgXQAJgXARgPQASgQAYgHQAZgIAdAAIADAAQAeAAAUAGQAUAHAOAKQAOALAJAMQAJANAGAMIhIAdIgJgNQgFgHgFgEQgGgFgHgDQgHgDgKAAIgDAAQgcAAgLAQQgMAOAAAfIAAA9QAAAhARAPQARAOAgAAQASAAARgDQAQgEAOgHQAOgGAMgIQALgHAHgIIAABIQgHAHgLAHQgLAGgOAGQgOAFgRADQgSADgVAAQgnAAgcgIg");
	this.shape_7.setTransform(1091.925,54.275);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("Ag9CXQgbgGgRgNQgQgMgHgRQgIgSAAgVIAAgIQAAgXAJgRQAJgQARgLQARgLAYgFQAYgFAeAAIA9AAIAAgNQAAgMgCgJQgDgJgEgGQgFgHgJgDQgIgDgNAAIgHAAQgQAAgMAGQgMAFgGAPIhLgZQAHgQALgMQALgMAQgIQAPgIAVgEQAVgEAaAAQAiAAAYAGQAYAGAPANQAPANAHAUQAHAUAAAdIAADAQgeAHggAFQggAEgnAAQgmAAgbgHgAgrAjQgLAJAAAOIAAADQAAAHADAGQADAGAHAEQAHAFALACQALADAQAAIAOgBIAOgBIAMgCIALgDIAAg+Ig/AAQgYAAgLAKg");
	this.shape_8.setTransform(1058.425,54.275);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AhADOQgkgEgkgHIAAmVIBTAAIAAB2IANgFIASgEIATgDIAQgBQAbAAAXAFQAWAFARALQARALAJAUQAJATAAAeIAABxQAAAUgHASQgGASgQAPQgQAOgZAIQgZAJgmAAQghAAgjgFgAgegkQgMADgLAEIAACoIAZAEQAMACAQAAQAcAAANgPQAOgOAAgbIAAhKQAAgcgOgNQgNgNgbAAQgTAAgMADg");
	this.shape_9.setTransform(1025.05,49.025);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgMC9QgSgHgLgKQgLgKgFgQQgGgPAAgUIAAifIgmAAIAAhBIAmAAIAAhHIBRgJIAABQIBLAAIAABBIhLAAIAACIQAAAUAJAKQAIAKATAAQALAAAMgCIAZgGIAAA/QgOAFgSADQgSADgWAAQgZAAgRgFg");
	this.shape_10.setTransform(981.675,50.7);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("Ag1CXQgbgHgTgPQgTgPgKgXQgLgYAAgiIAAhBQAAgaAJgXQAJgXARgRQARgRAZgJQAZgKAiAAIAJAAQAeAAAYAIQAZAJASARQARAQAKAZQAKAYAAAgIAAAyIjFAAIAAAIQAAAgASAOQASAOAfAAQATAAASgDQARgDAPgFQAQgGAMgGIAWgOIAABEQgTAPgfAKQgfAKgpAAQghAAgbgHgAgphQQgPAPgBAgIBzAAQAAgRgEgLQgEgMgHgIQgHgHgKgDQgJgEgNAAIgEAAQgbAAgOAPg");
	this.shape_11.setTransform(953.325,54.275);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgPDWQgfAAgZgJQgYgJgRgQQgSgPgJgVQgJgWAAgYIAAjDQAAgZAJgVQAJgVARgQQARgPAYgJQAYgJAfAAIAgAAQAeAAAWAJQAWAIAQAOQAPAPAKAUQAJAUAFAXIhSALQgCgOgFgJQgFgKgGgGQgHgHgIgDQgIgDgJAAIgYAAQgYAAgOAOQgOAPAAAbIAACjQAAAPAEANQADANAIAKQAIAKAMAGQAMAFARAAIAPAAQAQAAAPgDQAPgEAKgFIAAhRIgzAAIAAhCICBAAIAAC8QgNAJgQAHQgQAHgRAFQgSAFgSADQgSADgUAAg");
	this.shape_12.setTransform(917.025,48.725);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AAhBJIgMiQIBWAAIgMCQgAheBJIgMiQIBVAAIgMCQg");
	this.shape_13.setTransform(884.425,35.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgzDSIAAheIBdAAIAABegAgwBDQAAgVAFgQQAFgPAIgNQAIgLAKgIIATgRIAVgPQAKgGAIgIQAHgIAFgJQAFgKAAgNQAAgUgNgKQgNgKgeAAIgIAAQgNAAgKACQgKADgIAGQgHAGgFAKQgGAKgDAOIhMgLQAGgaALgUQAKgUARgNQAQgNAXgIQAXgGAgAAIAIAAQAgAAAZAGQAZAGARANQAQAMAJAVQAJATAAAbQAAAUgFAPQgEAOgIAMQgHAKgKAJIgTAQIgUANQgKAHgHAJQgHAJgFALQgFAMAAAPg");
	this.shape_14.setTransform(1283.075,48.35);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgDCeQghAAgZgGQgagHgRgOQgSgOgJgXQgJgXAAghIAAhLQAAgiAJgWQAJgXASgOQARgPAagGQAZgGAhAAIAGAAQAhAAAaAGQAZAGASAPQARAOAKAXQAJAWAAAiIAABLQAAAhgJAXQgKAXgRAOQgSAOgZAHQgaAGghAAgAgahYQgLACgGAHQgIAIgDALQgEALAAARIAAA2QAAAUAEAOQADANAIAIQAGAIALAEQAKADANAAIAFAAQAOAAALgDQAKgEAIgIQAGgIAEgNQAEgOAAgUIAAg2QAAgRgEgLQgEgLgGgIQgIgHgKgCQgLgEgOAAIgFAAQgNAAgKAEg");
	this.shape_15.setTransform(1251.75,54.275);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AhGDRQgfgFgXgMIAAhGQAKAGAMAGQAMAEAOAEQANAEAOABQAPACANAAQAVAAAOgDQAPgDAIgHQAJgHAEgMQAEgMAAgSIAAgHIgOAFIgRAEIgUAEIgUACQgYAAgVgFQgWgFgQgLQgRgLgJgTQgKgTAAgcIAAhtQAAgUAHgTQAIgSAQgOQAQgOAZgIQAZgJAjAAIAiABIAkADIAkAEIAjAFIAAEsQAAAggKAWQgKAXgTANQgTANgbAHQgaAFgfABQgiAAgfgGgAgoiFQgOAQAAAZIAABLQAAAYAOALQAPALAZAAIAOgBIAPgDIAOgFIAMgEIAAieIgMgCIgOgCIgOgBIgOgBQgbAAgOAPg");
	this.shape_16.setTransform(1217.075,59.9);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("Ag9DOQgXgFgRgLQgQgMgKgTQgJgUAAgdIAAhxQAAgUAHgTQAGgSAQgOQAPgOAagIQAZgJAlAAIAPABIAQABIAPACIANADIAAhwIBSAAIAAGOQgoALgmAGQgmAGghAAQgbAAgWgFgAgogYQgOAPAAAYIAABKQAAAcANAOQANAOAcAAIARgBIAOgCIAMgDIAMgEIAAinIgagFQgMgCgQAAQgcAAgNAPg");
	this.shape_17.setTransform(1084.575,49.025);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgeBJIgMiQIBVAAIgMCQg");
	this.shape_18.setTransform(1060.225,35.2);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AA1DPIAAjAQAAgyg1AAIgNABIgQACIgNADIgKACIAADqIhTAAIAAmdIBTAAIAABuIAMgCIAQgBIAQgBIAOgBQAlAAAZAHQAZAIAPANQAPAMAGASQAHARAAAUIAADVg");
	this.shape_19.setTransform(944.175,48.65);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("ABUDPIg9jrIgXhiIgVBiIg+DrIhhAAIhymdIBZAAIA6DrIASBYIAVhYIA9jrIBeAAIA+DrIAUBYIAThYIA6jrIBZAAIhyGdg");
	this.shape_20.setTransform(896.675,48.65);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AhFAoIAAhPICLAAIAABPg");
	this.shape_21.setTransform(1203.425,53);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("ABiDPIgdhpIiIAAIgeBpIhUAAICBmdIBqAAICAGdgAgGhyIgIAcIgIAeIgbBbIBkAAIgbhbIgIgfIgIgbIgIgaIgGAag");
	this.shape_22.setTransform(1142.325,48.65);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("Ag5DRIAAjrIgmAAIAAhAIAmAAIAAgQQAAgcAGgUQAGgTAMgMQAMgMASgFQARgGAYAAIARABIAQACIAOACIALADIAAA+IgTgDQgKgBgLAAQgQAAgIAJQgIAIAAAWIAAANIBEAAIAABAIhEAAIAADrg");
	this.shape_23.setTransform(1106.625,48.475);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgCCeQgiAAgZgGQgZgHgSgOQgSgOgJgXQgJgXAAghIAAhLQAAgiAJgWQAJgXASgOQASgPAZgGQAZgGAiAAIAFAAQAhAAAaAGQAZAGASAPQARAOAKAXQAJAWAAAiIAABLQAAAhgJAXQgKAXgRAOQgSAOgZAHQgaAGghAAgAgahYQgKACgHAHQgIAIgDALQgEALAAARIAAA2QAAAUAEAOQADANAIAIQAHAIAKAEQAJADAOAAIAFAAQAOAAALgDQAKgEAIgIQAGgIAEgNQAEgOAAgUIAAg2QAAgRgEgLQgEgLgGgIQgIgHgKgCQgLgEgOAAIgFAAQgOAAgJAEg");
	this.shape_24.setTransform(1078.6,54.275);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AgMC9QgSgHgLgKQgLgKgFgQQgGgPAAgUIAAifIgmAAIAAhBIAmAAIAAhHIBRgJIAABQIBLAAIAABBIhLAAIAACIQAAAUAJAKQAIAKATAAQALAAAMgCIAZgGIAAA/QgOAFgSADQgSADgWAAQgZAAgRgFg");
	this.shape_25.setTransform(1035.425,50.7);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("Ag+CSQgagHgQgNQgQgNgHgRQgIgSAAgUIAAjTIBSAAIAAC+QAAAyA1AAIAPgBIAPgCIAOgCIAJgDIAAjoIBTAAIAAEjIgfAFIgjAGIgjADIgjACQgkAAgagIg");
	this.shape_26.setTransform(1006.725,54.725);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AgCCeQgiAAgZgGQgagHgRgOQgRgOgKgXQgJgXAAghIAAhLQAAgiAJgWQAKgXARgOQARgPAagGQAZgGAiAAIAFAAQAhAAAZAGQAaAGASAPQASAOAJAXQAJAWAAAiIAABLQAAAhgJAXQgJAXgSAOQgSAOgaAHQgZAGghAAgAgahYQgKACgIAHQgGAIgEALQgEALAAARIAAA2QAAAUAEAOQAEANAGAIQAIAIAKAEQAJADAOAAIAFAAQAOAAAKgDQALgEAHgIQAIgIADgNQAEgOAAgUIAAg2QAAgRgEgLQgDgLgIgIQgHgHgLgCQgKgEgOAAIgFAAQgOAAgJAEg");
	this.shape_27.setTransform(972.15,54.275);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AgMC9QgSgHgLgKQgLgKgFgQQgGgPAAgUIAAifIgmAAIAAhBIAmAAIAAhHIBRgJIAABQIBLAAIAABBIhLAAIAACIQAAAUAJAKQAIAKATAAQALAAAMgCIAZgGIAAA/QgOAFgSADQgSADgWAAQgZAAgRgFg");
	this.shape_28.setTransform(928.975,50.7);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AgzBSIAWhZIAAhKIBRAAIAABKIglBZg");
	this.shape_29.setTransform(826.3,68.075);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("ABEDPIAAi0IiIAAIAAC0IhSAAIAAmdIBSAAIAACnICIAAIAAinIBTAAIAAGdg");
	this.shape_30.setTransform(766.9,48.65);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AAqBJIgMiQIA4AAIgMCQgAhJBJIgMiQIA4AAIgMCQg");
	this.shape_31.setTransform(1064.825,35.2);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AgeAjIAPhFIAuAAIgPBFg");
	this.shape_32.setTransform(1040.85,65.825);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AhECyQgQgPAAgdIABgQIADgPIAliuIggAAIAIgpIAgAAIARhLIAugFIgSBQIBLAAIgIApIhLAAIgkCsIgCANIgBAMQAAAaAgAAQAKAAAMgCQAMgCALgEIgJAqIgXAFQgMACgQAAQggAAgQgPg");
	this.shape_33.setTransform(1029.4,50.625);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AggCdQgWAAgSgEQgTgFgOgIQgMgKgIgOQgHgPAAgVQAAgTAGgYIAPhHQAGgiAMgXQAMgWAQgPQAQgOAWgHQAWgHAaAAIALAAQAWAAATAEQASAFAOAKQANAJAIAQQAHAOAAAWQAAARgGAZIgOBHQgIAhgMAYQgLAWgRAOQgQAPgWAFQgWAHgaAAgAgMhuQgNAEgKAKQgLAKgHAQQgJAQgEAZIgNA9IgCALIgCALIgBALIAAAKQAAAWANAJQAPAJAaAAIAOAAQAQAAAOgDQANgFALgKQAKgKAHgQQAHgQAGgXIAMg9IACgKIACgMIABgLIABgJQAAgWgPgLQgOgLgZAAIgPAAQgQAAgNAFg");
	this.shape_34.setTransform(1002.65,54.25);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AAtCaIAtjTIABgJIABgIQAAgSgRgKQgRgKgdAAIgSACIgSACIgRACIgMADIg3EBIgvAAIA+kjIAbgGIAdgFIAdgDIAdgCQAZAAAUAFQATAGANAJQAMAKAGANQAFANAAAQQAAAJgCANIgFAZIgoC8g");
	this.shape_35.setTransform(970.95,53.95);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AhICZQgSgFgNgJQgNgJgHgQQgGgQgBgVIACgVIAEgWIANhAQAOhCAjgeQAhgeA3AAIAEAAQAWAAATAFQASAGANALQANALAIARQAIARgBAYIgBAYIgEAZIgGAXIi/AAIgFAWIgCALIgBALIgBAKIgBAJQAAAPAEAJQAEAJAIAFQAIAEALACQAMACANgBQASAAAQgDQARgEAPgGQAPgGANgIQANgHAIgHIgLAzQgSAQgeAIQgeAIgjAAQgWAAgTgEgAgGhuQgNAEgMAKQgKAKgJAPQgIAPgFAXICQAAIACgOIABgNQAAgPgEgKQgGgLgHgFQgIgIgLgCQgKgDgMgBIgEAAQgPAAgNAFg");
	this.shape_36.setTransform(926.85,54.25);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AhQDOQgegFgcgGIBWmUIAuAAIgZB2IARgDIATgFIAUgCIATgCQATAAARADQARAEAOAIQANAIAHAOQAIANAAAVIAAAHIgBAIIgBAIIgCAHIgXBuQgFATgJATQgIASgPAOQgQAPgYAIQgXAJghAAQgdAAgegEgAASg8IgVAEQgLABgJADIgRAEIgsDQIAOAEIARACIASACIARAAQATAAAPgEQAPgFAKgIQAKgIAGgLQAGgLACgNIAXhpIABgGIABgIIABgHIAAgFQAAgUgNgKQgPgIgYgBIgVACg");
	this.shape_37.setTransform(895.75,48.95);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AiaDSIBWiBIg7kiIAwAAIAqDuICMjuIA0AAIkAGjg");
	this.shape_38.setTransform(868.3,60.35);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AA6CTQgMgLgBgTQgWATgYALQgZAKgZAAQgSAAgQgEQgRgDgLgIQgMgJgGgNQgHgOAAgTIAAgJIABgIIACgJIABgFIAXhvQAFgUAIgSQAJgTAOgOQAPgOAXgHQAXgJAiAAQAcAAAgAEQAfAFAcAHIgtDPIgBAHIgBAIIgBAIIgBAHQAAAKAFAFQAFADAHAAQAHABAGgCIAOgGIgJAqIgQAFQgJACgKAAQgVAAgLgKgAgPhvQgPAFgJAHQgKAHgGAMQgGALgDAOIgXBqIgCAOIgBAMQAAAVAMAIQAMAJAYAAQAMAAAMgDQALgEAKgFQAMgFALgIQAKgGAKgIIAni2IgOgDIgRgDIgSgCIgRgBQgUAAgOAEg");
	this.shape_39.setTransform(837.2,54.25);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("ABxDPIA4kCQADgVAHgXIAKguIgMAYIgQAcIgRAdIgNAWIiWD1IgyAAIguj5IgDgVIgFgbIgDgcIgDgXIgIAyIgIAnIg3EDIgtAAIBYmdIA3AAIA2EeIADAQIADAVIAEAVIADATIAKgTIAOgWIALgVIAIgPICxkeIA9AAIhYGdg");
	this.shape_40.setTransform(797.45,48.65);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AgdAjIANhFIAuAAIgOBFg");
	this.shape_41.setTransform(748.75,65.825);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AgeAjIAPhFIAtAAIgOBFg");
	this.shape_42.setTransform(736.85,65.825);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AgeAjIAPhFIAuAAIgPBFg");
	this.shape_43.setTransform(724.95,65.825);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AAsDPIAtjRIACgKIABgJQAAgTgRgIQgRgLgcAAIgSACIgTACIgQACIgOADIg3EBIgtAAIBXmdIAuAAIgYBxIAigFQARgCAQAAQAaAAATAFQATAGAMAJQAMALAGANQAGANAAAQIgBAKIgCAMIgCANIgDAMIgpC7g");
	this.shape_44.setTransform(705.4,48.65);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AAsDPIAtjRIACgKIABgJQAAgTgRgIQgRgLgcAAIgSACIgTACIgQACIgOADIg3EBIgtAAIBXmdIAuAAIgYBxIAigFQARgCAQAAQAaAAATAFQATAGAMAJQAMALAGANQAGANAAAQIgBAKIgCAMIgCANIgDAMIgpC7g");
	this.shape_45.setTransform(674.35,48.65);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AhmDLQgZgHgQgNQgQgMgIgTQgJgRAAgWIABgMIACgPIACgNIACgLIA5kPIAwAAIg/EmIAAADIgBAGIgBAHIAAAFQAAAOAFALQAFALAKAHQAKAHAQAEQAPAFAWAAQAdAAATgGQAUgFANgLQANgKAHgPQAIgPAEgSIA+kmIAwAAIg/EmQgGAegMAYQgMAXgTAPQgUAQgbAJQgbAIgmAAQgfAAgYgHg");
	this.shape_46.setTransform(642.975,48.95);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AAqBJIgMiQIA4AAIgMCQgAhJBJIgMiQIA4AAIgMCQg");
	this.shape_47.setTransform(614.125,35.2);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("A6HP0QgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAABAAIAygfQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAABQABAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAIgzAfIgCABIgBAAgA4hO2QgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAAAAAIA0gfQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAIgyAfIgDABIgBAAgA27N4QgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAAAAAIAzgfQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAAAAAIg0AfIgCABIgBAAgA1VM6QgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAABAAIAygfQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAIgzAfIgCABIgBAAgAzvL8QgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAAAAAIA0gfQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAABQABAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAIgyAfIgDABIgBAAgAyJK+QgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAAAAAIAzgfQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAABQABAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAAAAAIg0AfIgCABIgBAAgAwjKAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAABAAIAygfQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAABQABAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAIgzAfIgCABIgBAAgAu9JCQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAAAAAIA0gfQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAABQABAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAIgyAfIgDABIgBAAgAtXIEQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAAAAAIAzgfQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAABQABAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAAAAAIg0AfIgCABIgBAAgArxHGQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAABAAIAygfQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAABQABAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAIgzAfIgCABIgBAAgAqLGIQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAAAAAIA0gfQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAIgyAfIgDABIgBAAgAolFKQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAAAAAIAzgfQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAAAAAIg0AfIgCABIgBAAgAm/EMQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAABAAIAygfQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAIgzAfIgCABIgBAAgAlZDOQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAAAAAIA0gfQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAABQABAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAIgyAfIgDABIgBAAgAjzCQQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAAAAAIAzgfQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAABQABAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAAAAAIg0AfIgCABIgBAAgAiNBSQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAABAAIAygfQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAABQABAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAIgzAfIgCABIgBAAgAgnAUQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAAAAAIAzgeQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAABQABAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAIgxAeIgDABIgBAAgAA+gpQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAAAAAIA0gfQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAABQABAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAAAAAIg1AfIgCABIgBAAgACmhnQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAAAAAIA1gfQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAABQABAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAIgzAfIgDABIgBAAgAEOilQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAABAAIAzgfQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAAAAAIg1AfIgCABIgBAAgAF2jjQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAAAAAIA0gfQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAIgyAfIgDABIgBAAgAHdkhQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAABAAIAzgfQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAAAAAIg1AfIgCABIgBAAgAJElfQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAAAAAIA1gfQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAABQABAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAIgzAfIgDABIgBAAgAKsmdQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAABAAIAzgfQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAABQABAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAAAAAIg1AfIgCABIgBAAgAMUnbQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAAAAAIA1gfQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAABQABAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAIgzAfIgDABIgBAAgAN8oZQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAABAAIAzgfQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAABQABAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAIg0AfIgCABIgBAAgAPkpXQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAAAAAIA0gfQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAABQABAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAAAAAIg0AfIgDABIgBAAgARLqVQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAABAAIAzgfQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAABQABAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAIg0AfIgCABIgBAAgASzrTQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAAAAAIA0gfQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAAAAAIg0AfIgDABIgBAAgAUbsRQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAABAAIA0gfQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAIg0AfIgCABIgBAAgAWDtPQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAAAAAIA0gfQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAAAAAIg0AfIgDABIgBAAgAXquNQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAABAAIA0gfQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAABQABAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAIg0AfIgCABIgBAAgAZSvLQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAAAAAIA0geQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAABQABAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAAAAAIg0AeIgDABIgBAAg");
	this.shape_48.setTransform(421.4,178.1498);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("ABBCWIgtiLIgFgRIgHgZIgIggIgIAhIgEANIgDAMIgDAJIgCAFIgsCNIhXAAIhdkrIBWAAIAuCbIADAOIAFAVIAGAcIAFgbIAFgVIADgOIAxicIBJAAIAxCbIAFARIAEAUIAGAaIAFgaIAFgUIADgRIAtibIBWAAIhcErg");
	this.shape_49.setTransform(1222.75,54.35);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AgCCeQgiAAgZgGQgagHgRgOQgRgOgKgXQgJgXAAghIAAhLQAAgiAJgWQAKgXARgOQARgPAagGQAZgGAiAAIAFAAQAhAAAaAGQAZAGASAPQARAOAKAXQAJAWAAAiIAABLQAAAhgJAXQgJAXgSAOQgSAOgZAHQgaAGghAAgAgahYQgKACgIAHQgGAIgEALQgEALAAARIAAA2QAAAUAEAOQAEANAGAIQAIAIAKAEQAJADAOAAIAFAAQAOAAALgDQAKgEAHgIQAIgIADgNQAEgOAAgUIAAg2QAAgRgEgLQgDgLgIgIQgHgHgKgCQgLgEgOAAIgFAAQgOAAgJAEg");
	this.shape_50.setTransform(1180.85,54.275);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AA1CbIAAjAQAAgyg1AAIgNABIgQACIgNACIgKADIAADqIhTAAIAAklIAfgGIAjgEIAkgEIAhgCQAlAAAaAHQAaAIAQANQAQANAHASQAIARAAAUIAADVg");
	this.shape_51.setTransform(1111.625,53.9);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AgoDPIAAkrIBRAAIAAErgAgoiIIAAhGIBRAAIAABGg");
	this.shape_52.setTransform(1086.125,48.65);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("ABACWIgsiLIgFgRIgHgZIgIggIgIAhIgDANIgEAMIgDAJIgBAFIgsCNIhYAAIhdkrIBWAAIAuCbIADAOIAEAVIAGAcIAHgbIAEgVIAEgOIAwicIBJAAIAxCbIAEARIAFAUIAFAaIAGgaIAEgUIAFgRIAtibIBVAAIhdErg");
	this.shape_53.setTransform(1053.6,54.35);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AgDCeQghAAgZgGQgZgHgSgOQgSgOgJgXQgJgXAAghIAAhLQAAgiAJgWQAJgXASgOQASgPAZgGQAZgGAhAAIAGAAQAhAAAaAGQAZAGASAPQARAOAKAXQAJAWAAAiIAABLQAAAhgJAXQgKAXgRAOQgSAOgZAHQgaAGghAAgAgahYQgKACgHAHQgIAIgDALQgEALAAARIAAA2QAAAUAEAOQADANAIAIQAHAIAKAEQAKADANAAIAFAAQAOAAALgDQAKgEAIgIQAGgIAEgNQAEgOAAgUIAAg2QAAgRgEgLQgEgLgGgIQgIgHgKgCQgLgEgOAAIgFAAQgNAAgKAEg");
	this.shape_54.setTransform(833.7,54.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13,p:{x:884.425}},{t:this.shape_12},{t:this.shape_11,p:{x:953.325}},{t:this.shape_10,p:{x:981.675}},{t:this.shape_9},{t:this.shape_8,p:{x:1058.425}},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5,p:{x:1170.875}},{t:this.shape_4,p:{x:1205.325}},{t:this.shape_3,p:{x:1235.425}},{t:this.shape_2,p:{x:1262.525}},{t:this.shape_1,p:{x:1289.675}},{t:this.shape}]}).to({state:[{t:this.shape_13,p:{x:851.725}},{t:this.shape_20,p:{x:896.675}},{t:this.shape_19,p:{x:944.175}},{t:this.shape_11,p:{x:978.625}},{t:this.shape_3,p:{x:1008.725}},{t:this.shape_4,p:{x:1035.825}},{t:this.shape_18},{t:this.shape_17,p:{x:1084.575}},{t:this.shape_5,p:{x:1134.075}},{t:this.shape_2,p:{x:1168.525}},{t:this.shape_16,p:{x:1217.075}},{t:this.shape_15},{t:this.shape_14},{t:this.shape}]},44).to({state:[]},16).to({state:[{t:this.shape_13,p:{x:1112.225}},{t:this.shape_22},{t:this.shape_19,p:{x:1178.025}},{t:this.shape_21,p:{x:1203.425}},{t:this.shape_5,p:{x:1229.125}},{t:this.shape_8,p:{x:1262.375}},{t:this.shape_1,p:{x:1289.675}},{t:this.shape}]},37).to({state:[]},23).to({state:[{t:this.shape_13,p:{x:733.575}},{t:this.shape_30},{t:this.shape_8,p:{x:802.575}},{t:this.shape_29},{t:this.shape_16,p:{x:866.075}},{t:this.shape_11,p:{x:900.625}},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26,p:{x:1006.725}},{t:this.shape_25,p:{x:1035.425}},{t:this.shape_24},{t:this.shape_23},{t:this.shape_10,p:{x:1141.725}},{t:this.shape_5,p:{x:1170.875}},{t:this.shape_4,p:{x:1205.325}},{t:this.shape_3,p:{x:1235.425}},{t:this.shape_2,p:{x:1262.525}},{t:this.shape_1,p:{x:1289.675}},{t:this.shape}]},44).to({state:[]},16).to({state:[{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31}]},44).to({state:[]},16).to({state:[{t:this.shape_13,p:{x:1112.225}},{t:this.shape_22},{t:this.shape_19,p:{x:1178.025}},{t:this.shape_21,p:{x:1203.425}},{t:this.shape_5,p:{x:1229.125}},{t:this.shape_8,p:{x:1262.375}},{t:this.shape_1,p:{x:1289.675}},{t:this.shape}]},37).to({state:[]},23).to({state:[{t:this.shape_13,p:{x:675.825}},{t:this.shape_20,p:{x:720.775}},{t:this.shape_19,p:{x:768.275}},{t:this.shape_21,p:{x:793.675}},{t:this.shape_54},{t:this.shape_26,p:{x:868.275}},{t:this.shape_25,p:{x:896.975}},{t:this.shape_10,p:{x:933.975}},{t:this.shape_5,p:{x:963.125}},{t:this.shape_2,p:{x:997.575}},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_17,p:{x:1145.825}},{t:this.shape_50},{t:this.shape_49},{t:this.shape_1,p:{x:1257.275}},{t:this.shape_14},{t:this.shape}]},44).wait(16));

	// faucet
	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f().s("#000000").ss(15,1,1).p("AOnAAI9NAA");
	this.shape_55.setTransform(960,999.55);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f().s("#000000").ss(13,1,1).p("AFiAHIAAAVIq6AAIAAgjIAAvuIK6AAIAAP8IJFPvAumP2IJOv9AkwgpIJ4AA");
	this.shape_56.setTransform(960,898.125);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#464646").s().p("AumH/IJPv9IAAAkIK5AAIAAgVIJFPug");
	this.shape_57.setTransform(960,948.425);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#666666").s().p("AlcIJIAAgkIAAvtIK5AAIAAP8IAAAVgAFDHDIp3AAg");
	this.shape_58.setTransform(960.475,848.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55}]}).wait(360));

	// faucet_knob_2
	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f().s("#000000").ss(13,1,1).p("AigiaIjEAAIAAjPILIAAIAADPIjDAAIAAIEIlBAAgAChiaIlBAA");
	this.shape_59.setTransform(825.95,962.875);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#464646").s().p("AigEDIAAoFIFBAAIAAIFg");
	this.shape_60.setTransform(825.95,973.225);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#666666").s().p("AChBnIlBAAIjEAAIAAjOILIAAIAADOg");
	this.shape_61.setTransform(825.95,937);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_61},{t:this.shape_60},{t:this.shape_59}]}).wait(360));

	// faucet_knob_1
	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f().s("#000000").ss(13,1,1).p("AigiaIjDAAIAAjPILIAAIAADPIjEAAgAChiaIAAIEIlBAAIAAoE");
	this.shape_62.setTransform(1094.6,962.875);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#464646").s().p("AigEDIAAoFIFBAAIAAIFg");
	this.shape_63.setTransform(1094.6,973.225);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#666666").s().p("AChBnIlBAAIjEAAIAAjOILIAAIAADOg");
	this.shape_64.setTransform(1094.6,937);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.shape_62}]}).wait(360));

	// soap_dispenser
	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f().s("#000000").ss(13,1,1).p("ABHkBIHdAAIAAVkIu5AAIAA1kIHcAAIADmfIAAg9Iptj3IKRiOQEcDUk2CvABKkxIgDAw");
	this.shape_65.setTransform(1249.025,851.95);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#666666").s().p("AmVRiIAA1jIHcAAIHdAAIAAVjgAojvTIKRiOQEcDUk2CvIgKABg");
	this.shape_66.setTransform(1249.025,851.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_66},{t:this.shape_65}]}).wait(360));

	// sink_bowl
	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f().s("#000000").ss(13,1,1).p("EAoAAAAQAAGeruEkQruElwkAAQwjAAruklQrukkAAmeQAAmdLukkQLuklQjAAQQkAALuElQLuEkAAGdg");
	this.shape_67.setTransform(960,849.1);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#CCCCCC").s().p("A8RLCQrukkAAmeQAAmdLuklQLukkQjAAQQkAALuEkQLuElAAGdQAAGeruEkQruElwkAAQwjAAruklg");
	this.shape_68.setTransform(960,849.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_68},{t:this.shape_67}]}).wait(360));

	// counter
	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f().s("#000000").ss(13,1,1).p("EiEogiCIHcAAMCvFAAAMBMTAAAIGdAAIDWEAMA1UBAFMl6lAAAg");
	this.shape_69.setTransform(958.925,899.85);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#999999").s().p("Ei9SAiDMA4qhEFIHcAAMCvFAAAMBMTAAAIGdAAIDWEAMA1UBAFg");
	this.shape_70.setTransform(958.925,899.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_70},{t:this.shape_69}]}).wait(360));

	// player
	this.instance = new lib.Tween1("synched",0);
	this.instance.setTransform(1502.05,318.4);

	this.instance_1 = new lib.Tween2("synched",0);
	this.instance_1.setTransform(1314.3,410.1);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween3("synched",0);
	this.instance_2.setTransform(1334.75,420.5);
	this.instance_2._off = true;

	this.instance_3 = new lib.Tween4("synched",0);
	this.instance_3.setTransform(1481,451.4);
	this.instance_3._off = true;

	this.instance_4 = new lib.Tween5("synched",0);
	this.instance_4.setTransform(1481.55,448.7);

	this.instance_5 = new lib.Tween11("synched",0);
	this.instance_5.setTransform(1499.55,631.85,1.0823,1.0823,0,0,0,18.6,167.5);
	this.instance_5._off = true;

	this.instance_6 = new lib.Tween12("synched",0);
	this.instance_6.setTransform(1505.95,618.75,1.1285,1.1285,0,0,0,-16.8,152.2);
	this.instance_6._off = true;

	this.instance_7 = new lib.Tween13("synched",0);
	this.instance_7.setTransform(1492.85,617.1,1.1286,1.1286,0,0,0,0.3,152.4);
	this.instance_7._off = true;

	this.instance_8 = new lib.Tween14("synched",0);
	this.instance_8.setTransform(1498.05,618.75,1.1316,1.1316,0,0,0,16.7,142.2);
	this.instance_8._off = true;

	this.instance_9 = new lib.Tween15("synched",0);
	this.instance_9.setTransform(1458.7,633.45,1.3044,1.3044,0,0,0,110,18.8);

	this.instance_10 = new lib.Tween16("synched",0);
	this.instance_10.setTransform(1099,641.35);
	this.instance_10._off = true;

	this.instance_11 = new lib.Tween17("synched",0);
	this.instance_11.setTransform(983,742.85);

	this.instance_12 = new lib.Tween6("synched",0);
	this.instance_12.setTransform(281.35,496);
	this.instance_12._off = true;

	this.instance_13 = new lib.Tween7("synched",0);
	this.instance_13.setTransform(197.35,487.35);
	this.instance_13._off = true;

	this.instance_14 = new lib.Tween8("synched",0);
	this.instance_14.setTransform(195.35,485.85);
	this.instance_14._off = true;

	this.instance_15 = new lib.Tween9("synched",0);
	this.instance_15.setTransform(193.45,478.25);
	this.instance_15._off = true;

	this.instance_16 = new lib.Tween10("synched",0);
	this.instance_16.setTransform(181.9,488.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},14).to({state:[{t:this.instance_2}]},15).to({state:[{t:this.instance_3}]},15).to({state:[{t:this.instance_4}]},15).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},14).to({state:[{t:this.instance_7}]},15).to({state:[{t:this.instance_8}]},15).to({state:[{t:this.instance_9}]},15).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_11}]},14).to({state:[]},1).to({state:[{t:this.instance_12}]},45).to({state:[{t:this.instance_13}]},14).to({state:[{t:this.instance_14}]},15).to({state:[{t:this.instance_15}]},15).to({state:[{t:this.instance_16}]},15).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},14).to({state:[{t:this.instance_7}]},15).to({state:[{t:this.instance_8}]},15).to({state:[{t:this.instance_9}]},15).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_11}]},14).to({state:[]},1).wait(45));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,x:1314.3,y:410.1},14).wait(346));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},14).to({_off:true,x:1334.75,y:420.5},15).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(14).to({_off:false},15).to({_off:true,x:1481,y:451.4},15).wait(316));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(29).to({_off:false},15).to({_off:true,x:1481.55,y:448.7},15).wait(301));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(60).to({_off:false},0).to({_off:true,regX:-16.8,regY:152.2,scaleX:1.1285,scaleY:1.1285,x:1505.95,y:618.75},14).wait(166).to({_off:false,regX:18.6,regY:167.5,scaleX:1.0823,scaleY:1.0823,x:1499.55,y:631.85},0).to({_off:true,regX:-16.8,regY:152.2,scaleX:1.1285,scaleY:1.1285,x:1505.95,y:618.75},14).wait(106));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(60).to({_off:false},14).to({_off:true,regX:0.3,regY:152.4,scaleX:1.1286,scaleY:1.1286,x:1492.85,y:617.1},15).wait(151).to({_off:false,regX:-16.8,regY:152.2,scaleX:1.1285,scaleY:1.1285,x:1505.95,y:618.75},14).to({_off:true,regX:0.3,regY:152.4,scaleX:1.1286,scaleY:1.1286,x:1492.85,y:617.1},15).wait(91));
	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(74).to({_off:false},15).to({_off:true,regX:16.7,regY:142.2,scaleX:1.1316,scaleY:1.1316,x:1498.05,y:618.75},15).wait(150).to({_off:false,regX:0.3,regY:152.4,scaleX:1.1286,scaleY:1.1286,x:1492.85,y:617.1},15).to({_off:true,regX:16.7,regY:142.2,scaleX:1.1316,scaleY:1.1316,x:1498.05,y:618.75},15).wait(76));
	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(89).to({_off:false},15).to({_off:true,regX:110,regY:18.8,scaleX:1.3044,scaleY:1.3044,x:1458.7,y:633.45},15).wait(150).to({_off:false,regX:16.7,regY:142.2,scaleX:1.1316,scaleY:1.1316,x:1498.05,y:618.75},15).to({_off:true,regX:110,regY:18.8,scaleX:1.3044,scaleY:1.3044,x:1458.7,y:633.45},15).wait(61));
	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(120).to({_off:false},0).to({_off:true,x:983,y:742.85},14).wait(166).to({_off:false,x:1099,y:641.35},0).to({_off:true,x:983,y:742.85},14).wait(46));
	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(180).to({_off:false},0).to({_off:true,x:197.35,y:487.35},14).wait(166));
	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(180).to({_off:false},14).to({_off:true,x:195.35,y:485.85},15).wait(151));
	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(194).to({_off:false},15).to({_off:true,x:193.45,y:478.25},15).wait(136));
	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(209).to({_off:false},15).to({_off:true,x:181.9,y:488.6},15).wait(121));

	// seat_hole
	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f().s("#000000").ss(7,1,1).p("AlTA/QACibBkiBQBkiACMgaQCNgbBiBdQBjBbgBCcQgCCahlCBQhkCBiMAaQiNAahihcQhjhcACibg");
	this.shape_71.setTransform(442.8235,341.8164);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#F1F1F1").s().p("AjyE2QhjhcACibQACibBkiBQBkiACMgaQCNgbBiBdQBjBbgBCcQgCCahlCBQhkCBiMAaQgfAGgdAAQhmAAhNhIg");
	this.shape_72.setTransform(442.8235,341.8164);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_72},{t:this.shape_71}]}).wait(360));

	// seat
	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f().s("#000000").ss(7,1,1).p("ArNBIQABlFDTkPQDTkOEng3QEog2DPC/QDPDAgCFIQgBAWARF1QAIC7AJC3I3LEhg");
	this.shape_73.setTransform(444.425,354.2397);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("ArNBIQABlFDTkPQDTkOEng3QEog2DPC/QDPDAgCFIQgBAWARF1IARFyI3LEhg");
	this.shape_74.setTransform(444.425,354.2397);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_74},{t:this.shape_73}]}).wait(360));

	// lid
	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f().s("#000000").ss(5,1,1).p("ArNBIQABlGDTkOQDTkOEng3QEog2DPC/QDQDAgDFIQgBAVASF2QAHC7AJC3I3LEhg");
	this.shape_75.setTransform(443.2,345.3561);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#F1F1F1").s().p("ArNBIQABlGDUkOQDSkOEng3QEog2DPC/QDPDAgCFIQgBAVASF2IAQFyI3LEhg");
	this.shape_76.setTransform(443.2,345.3561);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_76},{t:this.shape_75}]}).wait(360));

	// line
	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f().s("#000000").ss(7,1,1).p("ArwCOIXhkb");
	this.shape_77.setTransform(448.45,436.2);

	this.timeline.addTween(cjs.Tween.get(this.shape_77).wait(360));

	// hole
	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f().s("#000000").ss(7,1,1).p("AGFhHQAkB2hYBqQhXBoiiAeQigAeiLg/QiMg/glh3Qgkh1BYhqQBYhpChgeQCggeCMA/QCMA/AkB3g");
	this.shape_78.setTransform(468.9771,486.475);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#E4FFFF").s().p("AjTD+QiMg/glh3Qgkh1BYhqQBYhpChgeQCggeCMA/QCMA/AkB3QAkB2hYBqQhXBoiiAeQgzAKgxAAQhpAAhegrg");
	this.shape_79.setTransform(468.9771,486.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_79},{t:this.shape_78}]}).wait(360));

	// outer
	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f().s("#000000").ss(7,1,1).p("ANthwQBPD5i6DdQi4DdlSA/QlRA+kmiEQkkiEhOj6QgIgbiKoZIXYkfQEKH0AOAxg");
	this.shape_80.setTransform(459.9421,477.8657);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("Al/I8QkkiEhOj6QgIgbiKoZIXYkfQEKH0AOAxQBPD5i6DdQi4DdlSA/QhsAUhoAAQjbAAjIhag");
	this.shape_81.setTransform(459.9421,477.8657);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_81},{t:this.shape_80}]}).wait(360));

	// body
	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f().s("#000000").ss(9,1,1).p("AOnDFQgbBCgeA2QgdA2gSCrQAMArgHCAQgHCAgSApQiiBQhzAsQjPBTjFAMQnRAckoikIghmrQh4hrhyjpQgkkWgBjhQAAjpAlkMIW1kqIEoIfQAiBSARB9QAbDJgCFeg");
	this.shape_82.setTransform(460.6065,522.9292);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("Ap3PFIghmrQh4hrhyjpQgkkWgBjhQAAjpAlkMIW1kqIEoIfQAiBSARB9QAbDJgCFeQgbBCgeA2QgdA2gSCrQAMArgHCAQgHCAgSApQiiBQhzAsQjPBTjFAMQhEAEg/AAQl5AAj9iMg");
	this.shape_83.setTransform(460.6065,522.9292);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_83},{t:this.shape_82}]}).wait(360));

	// join
	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f().s("#000000").ss(7,1,1).p("AAtBoIhZjP");
	this.shape_84.setTransform(506.825,236.825);

	this.timeline.addTween(cjs.Tween.get(this.shape_84).wait(360));

	// front
	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f().s("#000000").ss(9,1,1).p("AnZuHIOeipQBmgTBIAxQBJAwABBYIARYRQABBXhIBMQhHBLhmATIueCqQhmAShJgwQhJgxgBhYIgQ4QQgBhYBHhLQBIhMBmgTg");
	this.shape_85.setTransform(441.55,344.9419);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("ApyQUQhKgxAAhYIgR4QQgBhYBIhLQBHhMBmgTIOeipQBmgTBIAxQBJAwACBYIAQYRQABBXhHBMQhIBLhmATIueCqQgcAFgaAAQhEAAg0gjg");
	this.shape_86.setTransform(441.55,344.9419);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_86},{t:this.shape_85}]}).wait(360));

	// back
	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f().s("#000000").ss(7,1,1).p("AnKuGIOAisQBigTBHAxQBGAwABBYIARYRQABBXhGBMQhEBLhjATIuACtQhjAThHgxQhGgxgBhXIgQ4RQgBhXBFhMQBFhMBjgTg");
	this.shape_87.setTransform(436.4245,325.2669);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("ApfQVQhGgxgBhXIgQ4RQgBhXBFhMQBFhMBjgTIOAisQBigTBHAxQBGAwABBYIARYRQABBXhGBMQhEBLhjATIuACtQgcAFgZAAQhCAAgzgjg");
	this.shape_88.setTransform(436.4245,325.2669);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_88},{t:this.shape_87}]}).wait(360));

	// lever
	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f().s("#000000").ss(5,1,1).p("AgygfIBqgnQAPgFALALQAKALAAAVQgBAVgMASQgMAUgPAFIhrAnQgPAGgLgMQgKgLABgVQABgVALgSQAMgTAQgGg");
	this.shape_89.setTransform(519.5966,254.8473);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AhRBBQgKgLABgVQABgVALgSQAMgTAQgGIBqgnQAPgFALALQAKALAAAVQgBAVgMASQgMAUgPAFIhrAnQgFACgEAAQgKAAgHgIg");
	this.shape_90.setTransform(519.5966,254.8473);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_90},{t:this.shape_89}]}).wait(360));

	// curtain
	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f().s("#000000").ss(6,1,1).p("ABEAAQAAAcgUAUQgVAUgbAAQgaAAgUgUQgVgUAAgcQAAgbAVgUQAJgKAOgEQAAAAAKgDQAKgDADAAQAbAAAVAUQAUAUAAAbg");
	this.shape_91.setTransform(134.825,226.05);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f().s("#000000").ss(5,1,1).p("AgXjoQAxFCgCCP");
	this.shape_92.setTransform(131.1272,194.575);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f().s("#000000").ss(10,1,1).p("AtcPpQAnATAmggQAXgUAshBQAuhEAbgaQAvgtA0ACQA8ADAwhdQAYg0ANgYQAWgqAVgRQANgKAigOQBBgaACgBQBZgoAeg5QAihYAYgnQArhEBOADQA/ACAngjQAkghAphYQA3h4AUgYQAvg8BRAHQBBAGAjg2QAUgfAchLQAdg/ASgPQAZgXBVgaQA3gRAcgVQAlgbgDgoQgCgkgDjdIgDjWI6oY8g");
	this.shape_93.setTransform(132.0079,144.0942);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#AFAFAF").s().p("AtcPpIAImcIao48IADDWQADDdACAkQADAoglAbQgcAVg3ARQhVAagZAXQgSAPgdA/QgcBLgUAfQgjA2hBgGQhRgHgvA8QgUAYg3B4QgpBYgkAhQgnAjg/gCQhOgDgrBEQgYAngiBYQgeA5hZAoIhDAbQgiAOgNAKQgVARgWAqIglBMQgwBdg8gDQg0gCgvAtQgbAaguBEQgsBBgXAUQgXAUgYAAQgPAAgPgHg");
	this.shape_94.setTransform(132.0079,144.0942);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91}]}).wait(360));

	// handle
	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f().s("#000000").ss(10,1,1).p("ADgi+IkcELAtjJ6IbH51IAAGCI7HZ1g");
	this.shape_95.setTransform(131.225,365.75);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#74746C").s().p("AtjJ6IbH51IAAGCI7HZ1gAg8BNIEckLg");
	this.shape_96.setTransform(131.225,365.75);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f().s("#000000").ss(10,1,1).p("Ag8BNIEckLAtjJ6IbH51IAAGCI7HZ1g");
	this.shape_97.setTransform(131.225,353.8);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f().s("#000000").ss(10,1,1).p("AtjJ6IbH51IAAGCI7HZ1gAg8BNIEckL");
	this.shape_98.setTransform(131.225,258.15);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f().s("#000000").ss(10,1,1).p("AtjJ6IbH51IAAGCI7HZ1gADgi+IkcEL");
	this.shape_99.setTransform(131.225,186.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_96,p:{y:365.75}},{t:this.shape_95}]}).to({state:[{t:this.shape_96,p:{y:365.75}},{t:this.shape_95}]},209).to({state:[{t:this.shape_96,p:{y:353.8}},{t:this.shape_97,p:{y:353.8}}]},1).to({state:[{t:this.shape_96,p:{y:341.85}},{t:this.shape_97,p:{y:341.85}}]},1).to({state:[{t:this.shape_96,p:{y:329.9}},{t:this.shape_97,p:{y:329.9}}]},1).to({state:[{t:this.shape_96,p:{y:317.95}},{t:this.shape_97,p:{y:317.95}}]},1).to({state:[{t:this.shape_96,p:{y:306}},{t:this.shape_97,p:{y:306}}]},1).to({state:[{t:this.shape_96,p:{y:294.05}},{t:this.shape_97,p:{y:294.05}}]},1).to({state:[{t:this.shape_96,p:{y:282.1}},{t:this.shape_97,p:{y:282.1}}]},1).to({state:[{t:this.shape_96,p:{y:270.1}},{t:this.shape_97,p:{y:270.1}}]},1).to({state:[{t:this.shape_96,p:{y:258.15}},{t:this.shape_98,p:{y:258.15}}]},1).to({state:[{t:this.shape_96,p:{y:246.2}},{t:this.shape_98,p:{y:246.2}}]},1).to({state:[{t:this.shape_96,p:{y:234.25}},{t:this.shape_98,p:{y:234.25}}]},1).to({state:[{t:this.shape_96,p:{y:222.3}},{t:this.shape_98,p:{y:222.3}}]},1).to({state:[{t:this.shape_96,p:{y:210.35}},{t:this.shape_98,p:{y:210.35}}]},1).to({state:[{t:this.shape_96,p:{y:198.4}},{t:this.shape_98,p:{y:198.4}}]},1).to({state:[{t:this.shape_96,p:{y:186.45}},{t:this.shape_99}]},1).wait(136));

	// glass
	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f().s("#000000").ss(10,1,1).p("AtjntIbH52MAAAApRI7HZ2g");
	this.shape_100.setTransform(131.225,252.95);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#E0EDF6").s().p("AtjntIbH52MAAAApRI7HZ2g");
	this.shape_101.setTransform(131.225,252.95);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f().s("#000000").ss(10,1,1).p("AtjmxIbH53MAAAAnaI7HZ3g");
	this.shape_102.setTransform(131.225,247);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#E0EDF6").s().p("AtjmxIbH52MAAAAnZI7HZ3g");
	this.shape_103.setTransform(131.225,247);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f().s("#000000").ss(10,1,1).p("Atjl2IbH52MAAAAljI7HZ2g");
	this.shape_104.setTransform(131.225,241.025);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#E0EDF6").s().p("Atjl2IbH52MAAAAljI7HZ2g");
	this.shape_105.setTransform(131.225,241.025);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f().s("#000000").ss(10,1,1).p("Atjk6IbH52MAAAAjrI7HZ2g");
	this.shape_106.setTransform(131.225,235.075);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#E0EDF6").s().p("Atjk6IbH52MAAAAjrI7HZ2g");
	this.shape_107.setTransform(131.225,235.075);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f().s("#000000").ss(10,1,1).p("Atjj+IbH53MAAAAh1I7HZ2g");
	this.shape_108.setTransform(131.225,229.1);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#E0EDF6").s().p("Atjj+IbH52MAAAAhzI7HZ2g");
	this.shape_109.setTransform(131.225,229.1);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f().s("#000000").ss(10,1,1).p("AtjjDIbH52IAAf9I7HZ2g");
	this.shape_110.setTransform(131.225,223.15);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#E0EDF6").s().p("AtjjDIbH52IAAf9I7HZ2g");
	this.shape_111.setTransform(131.225,223.15);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f().s("#000000").ss(10,1,1).p("AtjiHIbH52IAAeGI7HZ2g");
	this.shape_112.setTransform(131.225,217.2);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#E0EDF6").s().p("AtjiHIbH52IAAeFI7HZ3g");
	this.shape_113.setTransform(131.225,217.2);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f().s("#000000").ss(10,1,1).p("AtjhMIbH52IAAcPI7HZ2g");
	this.shape_114.setTransform(131.225,211.225);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#E0EDF6").s().p("AtjhMIbH52IAAcPI7HZ2g");
	this.shape_115.setTransform(131.225,211.225);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f().s("#000000").ss(10,1,1).p("AtjgQIbH52IAAaXI7HZ2g");
	this.shape_116.setTransform(131.225,205.275);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#E0EDF6").s().p("AtjgQIbH52IAAaXI7HZ2g");
	this.shape_117.setTransform(131.225,205.275);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f().s("#000000").ss(10,1,1).p("AtjArIbH51IAAYhI7HZ1g");
	this.shape_118.setTransform(131.225,199.3);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#E0EDF6").s().p("AtjArIbH51IAAYgI7HZ1g");
	this.shape_119.setTransform(131.225,199.3);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f().s("#000000").ss(10,1,1).p("AtjBmIbH51IAAWqI7HZ1g");
	this.shape_120.setTransform(131.225,193.35);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#E0EDF6").s().p("AtjBmIbH51IAAWqI7HZ1g");
	this.shape_121.setTransform(131.225,193.35);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f().s("#000000").ss(10,1,1).p("AtjCiIbH51IAAUzI7HZ1g");
	this.shape_122.setTransform(131.225,187.4);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#E0EDF6").s().p("AtjCiIbH51IAAUzI7HZ1g");
	this.shape_123.setTransform(131.225,187.4);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f().s("#000000").ss(10,1,1).p("AtjDdIbH51IAAS8I7HZ1g");
	this.shape_124.setTransform(131.225,181.425);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#E0EDF6").s().p("AtjDdIbH51IAAS8I7HZ1g");
	this.shape_125.setTransform(131.225,181.425);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f().s("#000000").ss(10,1,1).p("AtjEZIbH51IAAREI7HZ1g");
	this.shape_126.setTransform(131.225,175.475);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#E0EDF6").s().p("AtjEZIbH51IAAREI7HZ1g");
	this.shape_127.setTransform(131.225,175.475);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f().s("#000000").ss(10,1,1).p("AtjFVIbH52IAAPNI7HZ2g");
	this.shape_128.setTransform(131.225,169.5);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#E0EDF6").s().p("AtjFVIbH51IAAPMI7HZ2g");
	this.shape_129.setTransform(131.225,169.5);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f().s("#000000").ss(10,1,1).p("AtjGQIbH51IAANWI7HZ1g");
	this.shape_130.setTransform(131.225,163.55);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#E0EDF6").s().p("AtjGQIbH51IAANWI7HZ1g");
	this.shape_131.setTransform(131.225,163.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_101},{t:this.shape_100}]}).to({state:[{t:this.shape_101},{t:this.shape_100}]},209).to({state:[{t:this.shape_103},{t:this.shape_102}]},1).to({state:[{t:this.shape_105},{t:this.shape_104}]},1).to({state:[{t:this.shape_107},{t:this.shape_106}]},1).to({state:[{t:this.shape_109},{t:this.shape_108}]},1).to({state:[{t:this.shape_111},{t:this.shape_110}]},1).to({state:[{t:this.shape_113},{t:this.shape_112}]},1).to({state:[{t:this.shape_115},{t:this.shape_114}]},1).to({state:[{t:this.shape_117},{t:this.shape_116}]},1).to({state:[{t:this.shape_119},{t:this.shape_118}]},1).to({state:[{t:this.shape_121},{t:this.shape_120}]},1).to({state:[{t:this.shape_123},{t:this.shape_122}]},1).to({state:[{t:this.shape_125},{t:this.shape_124}]},1).to({state:[{t:this.shape_127},{t:this.shape_126}]},1).to({state:[{t:this.shape_129},{t:this.shape_128}]},1).to({state:[{t:this.shape_131},{t:this.shape_130}]},1).wait(136));

	// frame
	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f().s("#000000").ss(10,1,1).p("AtjntIbH52MAAAApRI7HZ2g");
	this.shape_132.setTransform(131.225,252.95);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#8C867E").s().p("AtjntIbH52MAAAApRI7HZ2g");
	this.shape_133.setTransform(131.225,252.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_133},{t:this.shape_132}]}).wait(360));

	// handle
	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f().s("#000000").ss(10,1,1).p("AAAlLIAAKW");
	this.shape_134.setTransform(1403.4,280.45);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f().s("#000000").ss(10,1,1).p("AAAFLIAAqW");
	this.shape_135.setTransform(1413.85,282.7);
	this.shape_135._off = true;

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f().s("#000000").ss(10,1,1).p("AAAFMIAAqW");
	this.shape_136.setTransform(1434.75,287.15);
	this.shape_136._off = true;

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f().s("#000000").ss(10,1,1).p("AAAlKIAAKW");
	this.shape_137.setTransform(1560.2,314.05);
	this.shape_137._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_134).wait(29).to({_off:true},1).wait(74).to({_off:false},0).to({_off:true},16).wait(44).to({_off:false},0).to({_off:true},16).wait(104).to({_off:false},0).to({_off:true},16).wait(44).to({_off:false},0).wait(16));
	this.timeline.addTween(cjs.Tween.get(this.shape_135).wait(30).to({_off:false},0).wait(1).to({x:1424.3,y:284.95},0).to({_off:true},1).wait(5).to({_off:false,x:1487.05,y:298.35},0).wait(1).to({x:1497.5,y:300.6},0).wait(1).to({x:1507.95,y:302.85},0).wait(1).to({x:1518.4,y:305.1},0).wait(1).to({x:1528.85,y:307.35},0).to({_off:true},1).wait(50).to({_off:false},0).wait(1).to({x:1518.4,y:305.1},0).wait(1).to({x:1507.95,y:302.85},0).wait(1).to({x:1497.5,y:300.6},0).wait(1).to({x:1487.05,y:298.35},0).to({_off:true},1).wait(5).to({_off:false,x:1424.3,y:284.95},0).wait(1).to({x:1413.85,y:282.7},0).to({_off:true},1).wait(48).to({_off:false,x:1528.85,y:307.35},0).wait(1).to({x:1518.4,y:305.1},0).wait(1).to({x:1507.95,y:302.85},0).wait(1).to({x:1497.5,y:300.6},0).wait(1).to({x:1487.05,y:298.35},0).to({_off:true},1).wait(5).to({_off:false,x:1424.3,y:284.95},0).wait(1).to({x:1413.85,y:282.7},0).to({_off:true},1).wait(108).to({_off:false,x:1528.85,y:307.35},0).wait(1).to({x:1518.4,y:305.1},0).wait(1).to({x:1507.95,y:302.85},0).wait(1).to({x:1497.5,y:300.6},0).wait(1).to({x:1487.05,y:298.35},0).to({_off:true},1).wait(5).to({_off:false,x:1424.3,y:284.95},0).wait(1).to({x:1413.85,y:282.7},0).to({_off:true},1).wait(48).to({_off:false,x:1528.85,y:307.35},0).wait(1).to({x:1518.4,y:305.1},0).wait(1).to({x:1507.95,y:302.85},0).wait(1).to({x:1497.5,y:300.6},0).wait(1).to({x:1487.05,y:298.35},0).to({_off:true},1).wait(5).to({_off:false,x:1424.3,y:284.95},0).wait(1).to({x:1413.85,y:282.7},0).to({_off:true},1).wait(16));
	this.timeline.addTween(cjs.Tween.get(this.shape_136).wait(32).to({_off:false},0).wait(1).to({x:1445.2,y:289.4},0).wait(1).to({x:1455.65,y:291.65},0).wait(1).to({x:1466.1,y:293.9},0).wait(1).to({x:1476.55,y:296.15},0).to({_off:true},1).wait(5).to({_off:false,x:1539.3,y:309.55},0).wait(1).to({x:1549.75,y:311.8},0).to({_off:true},1).wait(46).to({_off:false},0).wait(1).to({x:1539.3,y:309.55},0).to({_off:true},1).wait(5).to({_off:false,x:1476.55,y:296.15},0).wait(1).to({x:1466.1,y:293.9},0).wait(1).to({x:1455.65,y:291.65},0).wait(1).to({x:1445.2,y:289.4},0).wait(1).to({x:1434.75,y:287.15},0).to({_off:true},1).wait(48).to({_off:false,x:1549.75,y:311.8},0).wait(1).to({x:1539.3,y:309.55},0).to({_off:true},1).wait(5).to({_off:false,x:1476.55,y:296.15},0).wait(1).to({x:1466.1,y:293.9},0).wait(1).to({x:1455.65,y:291.65},0).wait(1).to({x:1445.2,y:289.4},0).wait(1).to({x:1434.75,y:287.15},0).to({_off:true},1).wait(108).to({_off:false,x:1549.75,y:311.8},0).wait(1).to({x:1539.3,y:309.55},0).to({_off:true},1).wait(5).to({_off:false,x:1476.55,y:296.15},0).wait(1).to({x:1466.1,y:293.9},0).wait(1).to({x:1455.65,y:291.65},0).wait(1).to({x:1445.2,y:289.4},0).wait(1).to({x:1434.75,y:287.15},0).to({_off:true},1).wait(48).to({_off:false,x:1549.75,y:311.8},0).wait(1).to({x:1539.3,y:309.55},0).to({_off:true},1).wait(5).to({_off:false,x:1476.55,y:296.15},0).wait(1).to({x:1466.1,y:293.9},0).wait(1).to({x:1455.65,y:291.65},0).wait(1).to({x:1445.2,y:289.4},0).wait(1).to({x:1434.75,y:287.15},0).to({_off:true},1).wait(18));
	this.timeline.addTween(cjs.Tween.get(this.shape_137).wait(44).to({_off:false},0).wait(45).to({_off:true},1).wait(30).to({_off:false},0).wait(29).to({_off:true},1).wait(30).to({_off:false},0).wait(89).to({_off:true},1).wait(30).to({_off:false},0).wait(29).to({_off:true},1).wait(30));

	// door
	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f().s("#000000").ss(10,1,1).p("EgDwgqrIHhCYMAAABS/InhiYg");
	this.shape_138.setTransform(1397.325,302.275);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#E5E3D1").s().p("EgDwAoUMAAAhS/IHhCYMAAABS/g");
	this.shape_139.setTransform(1397.325,302.275);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f().s("#000000").ss(10,1,1).p("EgEmgq4IJNCyMAAABS/IpNiyg");
	this.shape_140.setTransform(1402.7,303.625);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#E5E3D1").s().p("EgEmAoHMAAAhS/IJNCyMAAABS/g");
	this.shape_141.setTransform(1402.7,303.625);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f().s("#000000").ss(10,1,1).p("EgFcgrFIK5DMMAAABS/Iq5jNg");
	this.shape_142.setTransform(1408.075,304.95);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#E5E3D1").s().p("EgFcAn6MAAAhTAIK5DNMAAABS/g");
	this.shape_143.setTransform(1408.075,304.95);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f().s("#000000").ss(10,1,1).p("EgGSgrTIMlDoMAAABS/Isljog");
	this.shape_144.setTransform(1413.45,306.3);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#E5E3D1").s().p("EgGRAnsMAAAhS/IMjDoMAAABS/g");
	this.shape_145.setTransform(1413.45,306.3);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f().s("#000000").ss(10,1,1).p("EgHHgrhIOPEDMAAABTAIuPkEg");
	this.shape_146.setTransform(1418.825,307.65);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#E5E3D1").s().p("EgHHAnfMAAAhTAIOPEDMAAABS/g");
	this.shape_147.setTransform(1418.825,307.65);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f().s("#000000").ss(10,1,1).p("EgH9gruIP7EeMAAABS/Iv7keg");
	this.shape_148.setTransform(1424.2,309);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#E5E3D1").s().p("EgH9AnRMAAAhS/IP7EeMAAABS/g");
	this.shape_149.setTransform(1424.2,309);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f().s("#000000").ss(10,1,1).p("EgIzgr7IRnE4MAAABS/Ixnk4g");
	this.shape_150.setTransform(1429.575,310.325);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#E5E3D1").s().p("EgIzAnEMAAAhS/IRnE4MAAABS/g");
	this.shape_151.setTransform(1429.575,310.325);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f().s("#000000").ss(10,1,1).p("EgJpgsJITTFUMAAABS/IzTlUg");
	this.shape_152.setTransform(1434.95,311.675);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#E5E3D1").s().p("EgJoAm2MAAAhS/ITRFUMAAABS/g");
	this.shape_153.setTransform(1434.95,311.675);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f().s("#000000").ss(10,1,1).p("EgKegsWIU9FuMAAABS/I09lug");
	this.shape_154.setTransform(1440.3,313.025);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#E5E3D1").s().p("EgKeAmpMAAAhS/IU9FuMAAABS/g");
	this.shape_155.setTransform(1440.3,313.025);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f().s("#000000").ss(10,1,1).p("EgLUgskIWpGKMAAABS/I2pmKg");
	this.shape_156.setTransform(1445.675,314.375);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#E5E3D1").s().p("EgLUAmbMAAAhS/IWpGKMAAABS/g");
	this.shape_157.setTransform(1445.675,314.375);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f().s("#000000").ss(10,1,1).p("EgMKgsxIYUGkMAAABS/I4Umkg");
	this.shape_158.setTransform(1451.05,315.7);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#E5E3D1").s().p("EgMJAmOMAAAhS/IYUGkMAAABS/g");
	this.shape_159.setTransform(1451.05,315.7);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f().s("#000000").ss(10,1,1).p("EgM/gs/IZ/G/MAAABTAI5/nAg");
	this.shape_160.setTransform(1456.425,317.05);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#E5E3D1").s().p("EgM/AmBMAAAhTAIZ/G/MAAABS/g");
	this.shape_161.setTransform(1456.425,317.05);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f().s("#000000").ss(10,1,1).p("EgN1gtMIbrHaMAAABS/I7rnag");
	this.shape_162.setTransform(1461.8,318.4);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#E5E3D1").s().p("EgN1AlzMAAAhS/IbrHaMAAABS/g");
	this.shape_163.setTransform(1461.8,318.4);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f().s("#000000").ss(10,1,1).p("EgOrgtaIdXH1MAAABTAI9Xn2g");
	this.shape_164.setTransform(1467.175,319.75);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#E5E3D1").s().p("EgOrAlmMAAAhTAIdXH1MAAABS/g");
	this.shape_165.setTransform(1467.175,319.75);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f().s("#000000").ss(10,1,1).p("EgPhgtnIfCIQMAAABS/I/CoQg");
	this.shape_166.setTransform(1472.55,321.075);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#E5E3D1").s().p("EgPgAlYMAAAhS/IfCIQMAAABS/g");
	this.shape_167.setTransform(1472.55,321.075);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f().s("#000000").ss(10,1,1).p("EgQWgt0MAgtAIqMAAABS/MggtgIqg");
	this.shape_168.setTransform(1477.925,322.425);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#E5E3D1").s().p("EgQWAlLMAAAhS/MAgtAIqMAAABS/g");
	this.shape_169.setTransform(1477.925,322.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_139},{t:this.shape_138}]}).to({state:[{t:this.shape_139},{t:this.shape_138}]},29).to({state:[{t:this.shape_141},{t:this.shape_140}]},1).to({state:[{t:this.shape_143},{t:this.shape_142}]},1).to({state:[{t:this.shape_145},{t:this.shape_144}]},1).to({state:[{t:this.shape_147},{t:this.shape_146}]},1).to({state:[{t:this.shape_149},{t:this.shape_148}]},1).to({state:[{t:this.shape_151},{t:this.shape_150}]},1).to({state:[{t:this.shape_153},{t:this.shape_152}]},1).to({state:[{t:this.shape_155},{t:this.shape_154}]},1).to({state:[{t:this.shape_157},{t:this.shape_156}]},1).to({state:[{t:this.shape_159},{t:this.shape_158}]},1).to({state:[{t:this.shape_161},{t:this.shape_160}]},1).to({state:[{t:this.shape_163},{t:this.shape_162}]},1).to({state:[{t:this.shape_165},{t:this.shape_164}]},1).to({state:[{t:this.shape_167},{t:this.shape_166}]},1).to({state:[{t:this.shape_169},{t:this.shape_168}]},1).to({state:[{t:this.shape_169},{t:this.shape_168}]},45).to({state:[{t:this.shape_167},{t:this.shape_166}]},1).to({state:[{t:this.shape_165},{t:this.shape_164}]},1).to({state:[{t:this.shape_163},{t:this.shape_162}]},1).to({state:[{t:this.shape_161},{t:this.shape_160}]},1).to({state:[{t:this.shape_159},{t:this.shape_158}]},1).to({state:[{t:this.shape_157},{t:this.shape_156}]},1).to({state:[{t:this.shape_155},{t:this.shape_154}]},1).to({state:[{t:this.shape_153},{t:this.shape_152}]},1).to({state:[{t:this.shape_151},{t:this.shape_150}]},1).to({state:[{t:this.shape_149},{t:this.shape_148}]},1).to({state:[{t:this.shape_147},{t:this.shape_146}]},1).to({state:[{t:this.shape_145},{t:this.shape_144}]},1).to({state:[{t:this.shape_143},{t:this.shape_142}]},1).to({state:[{t:this.shape_141},{t:this.shape_140}]},1).to({state:[{t:this.shape_139},{t:this.shape_138}]},1).to({state:[{t:this.shape_169},{t:this.shape_168}]},16).to({state:[{t:this.shape_169},{t:this.shape_168}]},29).to({state:[{t:this.shape_167},{t:this.shape_166}]},1).to({state:[{t:this.shape_165},{t:this.shape_164}]},1).to({state:[{t:this.shape_163},{t:this.shape_162}]},1).to({state:[{t:this.shape_161},{t:this.shape_160}]},1).to({state:[{t:this.shape_159},{t:this.shape_158}]},1).to({state:[{t:this.shape_157},{t:this.shape_156}]},1).to({state:[{t:this.shape_155},{t:this.shape_154}]},1).to({state:[{t:this.shape_153},{t:this.shape_152}]},1).to({state:[{t:this.shape_151},{t:this.shape_150}]},1).to({state:[{t:this.shape_149},{t:this.shape_148}]},1).to({state:[{t:this.shape_147},{t:this.shape_146}]},1).to({state:[{t:this.shape_145},{t:this.shape_144}]},1).to({state:[{t:this.shape_143},{t:this.shape_142}]},1).to({state:[{t:this.shape_141},{t:this.shape_140}]},1).to({state:[{t:this.shape_139},{t:this.shape_138}]},1).to({state:[{t:this.shape_169},{t:this.shape_168}]},16).to({state:[{t:this.shape_169},{t:this.shape_168}]},89).to({state:[{t:this.shape_167},{t:this.shape_166}]},1).to({state:[{t:this.shape_165},{t:this.shape_164}]},1).to({state:[{t:this.shape_163},{t:this.shape_162}]},1).to({state:[{t:this.shape_161},{t:this.shape_160}]},1).to({state:[{t:this.shape_159},{t:this.shape_158}]},1).to({state:[{t:this.shape_157},{t:this.shape_156}]},1).to({state:[{t:this.shape_155},{t:this.shape_154}]},1).to({state:[{t:this.shape_153},{t:this.shape_152}]},1).to({state:[{t:this.shape_151},{t:this.shape_150}]},1).to({state:[{t:this.shape_149},{t:this.shape_148}]},1).to({state:[{t:this.shape_147},{t:this.shape_146}]},1).to({state:[{t:this.shape_145},{t:this.shape_144}]},1).to({state:[{t:this.shape_143},{t:this.shape_142}]},1).to({state:[{t:this.shape_141},{t:this.shape_140}]},1).to({state:[{t:this.shape_139},{t:this.shape_138}]},1).to({state:[{t:this.shape_169},{t:this.shape_168}]},16).to({state:[{t:this.shape_169},{t:this.shape_168}]},29).to({state:[{t:this.shape_167},{t:this.shape_166}]},1).to({state:[{t:this.shape_165},{t:this.shape_164}]},1).to({state:[{t:this.shape_163},{t:this.shape_162}]},1).to({state:[{t:this.shape_161},{t:this.shape_160}]},1).to({state:[{t:this.shape_159},{t:this.shape_158}]},1).to({state:[{t:this.shape_157},{t:this.shape_156}]},1).to({state:[{t:this.shape_155},{t:this.shape_154}]},1).to({state:[{t:this.shape_153},{t:this.shape_152}]},1).to({state:[{t:this.shape_151},{t:this.shape_150}]},1).to({state:[{t:this.shape_149},{t:this.shape_148}]},1).to({state:[{t:this.shape_147},{t:this.shape_146}]},1).to({state:[{t:this.shape_145},{t:this.shape_144}]},1).to({state:[{t:this.shape_143},{t:this.shape_142}]},1).to({state:[{t:this.shape_141},{t:this.shape_140}]},1).to({state:[{t:this.shape_139},{t:this.shape_138}]},1).wait(16));

	// enemy
	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#333333").s().p("ADvbcQgTgDgPgNQgMgLgJgTQgGgLgJgYQg8iugujnQgWhwgwkuQgei+gXh9IgMg9QgaCFgmCTQgpCkhJD4QgeBmgSA0QgdBVghBBQgaAzgggCQgQgBgMgQQgMgOgBgSQgBgZATgrQA0h6AwieQAfhiAyi+QA0jBAWhpQAlinAMiJQABgVAGgPQgEghAMgRIgDgMQgCgUAHgbIANguQAKglAFhLQARkEAYkBIgegCQifgGidgMQgdgCgOgFQgYgJgIgTQgIgSALgVQAKgTAUgJQAQgIAXgDIAqgDQAXgCAegEQADgIAHgHQAJgIANgEQAQgGAjACIAqAEQBkgZAxgIQAPiUARiTIgLgHQgIgEgSgEQgSgDgIgEIgPgJIgPgIIgOgGIgPgFQgXgKgRgTQgRgUgGgYQgEgRAAghIAAhfQAAgxAGgXQADgJAOgeIAJgSIghAAQgyAAgTgUQgMgNAAgSQAAgTAMgMQARgSAvAAIAJAAQADgNAIgTQALgaADgLQADgJAEgYQAEgVAEgMQAGgRAMgMQANgNAQgCQAOgCATAJIAgAPQAtAUBLgXQAkgMAQgCQAegDATAMQANAJANAWIAMAVQAFAbAMAZQAHAMADAGIAGAVQAGAPAPAKIADABIgCACIAGABQAMAGANgBIADgBQAPAEAIAFQAUAOACAYQABAYgTAPQgNAJgTADQgNABgWgBIglgCQAbBXAABaQgBA7gRAiQgGAMgLAQQgPAVgVAWQgbAbgYAKIgcANIgNALQgTCOgQCPIANADIFCBUQAkAJAOALQAVAPADAYQABAMgEALQgFALgJAHQgOALgiAAIibAAQgvAAgXgDQgUgCgegHIgNgDQgHANgNAGQgLAGgRAAIgdgCQgTDQgNDQQgHBugFApQgIBTgRBAQgGAXgJANQAGAMAFAPQAOAsAQBcQBAFfA1FEQAkDgAXBlQAnC0A4CHQAdBFgdAZQgLAKgRAAIgHAAg");
	this.shape_170.setTransform(1514.5038,402.0775);
	this.shape_170._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_170).wait(89).to({_off:false},0).to({_off:true},31).wait(29).to({_off:false},0).to({_off:true},31).wait(89).to({_off:false},0).to({_off:true},31).wait(29).to({_off:false},0).wait(31));

	// ominous
	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#FF6666").s().p("AFgENQgQgIgJgSQgJgSACgSQggAKgrgrQgggggVgXQgJAQgRAIQgSAIgSgDQgSgDgNgNQgPgNgDgSQguAEgsgPQgLAPgVAFQgUAFgRgJQgRgJgIgTQgIgTAFgTQhMAghSgKQgpgFgOgWIgFgLQgEgHgEgCQgFgDgJACIgOADQgLACgSgGIgcgKQgNgDgTACIggADQgqAEgRgWQgIgMACgRQABgQAKgNQAIgLAPgLIAagSQAZgQBTg5QBCguArgYQAggRAVgCQAPgCANAFIALAFQAHAEAFAGQAJAMAAAQQABAPgHAOQgMAYgeARQA7gQAqgGQAYgDATAAQAdAAAjAGQAVADAsAKQAVAFALAFQAQAHAJAMQAHAKAIAnQAGAfARAIQAEgPALgMQAMgMAPgEQAPgEAQAFQAQAFAKAMIALAOQAGAIAGAEQAFADALAEQALADAFADQAGADAKAKQALAKAGADQAMAGAYgDIAWgBQAKAAAFACIAOAFQAJADAGAAQAHAAAKgFIARgGQAOgEAOAIIAKAFQAGAGAFAIQALAUAAAmQAAA+gUA/QgOAugYARQgQALgUgBQgWgBgKgPQgNANgTADIgKABQgOAAgNgGg");
	this.shape_171.setTransform(1489.356,566.5454);
	this.shape_171._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_171).wait(89).to({_off:false},0).to({_off:true},31).wait(29).to({_off:false},0).to({_off:true},31).wait(89).to({_off:false},0).to({_off:true},31).wait(60));

	// frame
	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f().s("#000000").ss(10,1,1).p("EgQWgt0MAgtAIqMAAABS/MggtgIqg");
	this.shape_172.setTransform(1477.925,322.425);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#C6CFBD").s().p("EgQWAlLMAAAhS/MAgtAIqMAAABS/g");
	this.shape_173.setTransform(1477.925,322.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_173},{t:this.shape_172}]}).wait(360));

	// floor
	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f().s("#000000").ss(10,1,1).p("ECcGAUjIkSc+Mkr5AAAIjuAAIkS8+IH/oxMAtDgxbMAshgL3MB1EAAAMAsiAL3g");
	this.shape_174.setTransform(962.65,867.6);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#E5E5E5").s().p("EiUFAxgIjuAAIkS88IH/oyMAtDgxaMAshgL4MB1FAAAMAsgAL4MA1DA6MIkTc8g");
	this.shape_175.setTransform(962.65,867.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_175},{t:this.shape_174}]}).wait(360));

	// right_corner
	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f().s("#000000").ss(10,1,1).p("EAWIg0lMgsPAAAMAAABpKMAsPAAAg");
	this.shape_176.setTransform(1480.225,290.5);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#F3F0DE").s().p("EgWHA0lMAAAhpKMAsPAAAMAAABpKg");
	this.shape_177.setTransform(1480.225,290.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_177},{t:this.shape_176}]}).wait(360));

	// left_corner
	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f().s("#000000").ss(10,1,1).p("EgWHg0xMAsPAAAMAAABpjMgsPAAAg");
	this.shape_178.setTransform(445.425,288.525);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#F3F0DE").s().p("EgWHA0yMAAAhpjMAsPAAAMAAABpjg");
	this.shape_179.setTransform(445.425,288.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_179},{t:this.shape_178}]}).wait(360));

	// back_wall
	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f().s("#000000").ss(10,1,1).p("Eg/Yg1UMB+xAAAMAAABqpMh+xAAAg");
	this.shape_180.setTransform(971.075,308.775);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#EEEBD9").s().p("Eg/YA1VMAAAhqpMB+xAAAMAAABqpg");
	this.shape_181.setTransform(971.075,308.775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_181},{t:this.shape_180}]}).wait(360));

	// right_wall
	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f().s("#000000").ss(10,1,1).p("EgdhhSjMA7DAAAMAAAClGMg7DAAAg");
	this.shape_182.setTransform(1765.45,487.95);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#F8F5E2").s().p("EgdhBSjMAAAilGMA7EAAAMAAAClGg");
	this.shape_183.setTransform(1765.45,487.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_183},{t:this.shape_182}]}).wait(360));

	// left_wall
	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f().s("#000000").ss(10,1,1).p("EgfchR+IHGAAMA3zAAAMAAACj9Mg+5AAAg");
	this.shape_184.setTransform(170.725,487.05);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#F6F2E0").s().p("EgfcBR+MAAAij8IHGAAMA3zAAAMAAACj8g");
	this.shape_185.setTransform(170.725,487.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_185},{t:this.shape_184}]}).wait(360));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(700.9,485.8,1476.1,703.7);
// library properties:
lib.properties = {
	id: 'FBC06AECE9B93449BE94A68D02D26010',
	width: 1920,
	height: 1080,
	fps: 60,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"sounds/_339320__westshorebass__flashboom_starkformachines_editedwav.mp3", id:"_339320__westshorebass__flashboom_starkformachines_editedwav"},
		{src:"sounds/_552161__quantumriver__keysjinglinganddropping_editedwav.mp3", id:"_552161__quantumriver__keysjinglinganddropping_editedwav"},
		{src:"sounds/freesound_communityhungariantrainride59446wav.mp3", id:"freesound_communityhungariantrainride59446wav"},
		{src:"sounds/freesound_communitywoodenslidingdoor72283wav.mp3", id:"freesound_communitywoodenslidingdoor72283wav"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['FBC06AECE9B93449BE94A68D02D26010'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;