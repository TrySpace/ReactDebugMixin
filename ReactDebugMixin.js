var ReactDebugMixin = {

  componentWillMount: function() {
  	this._consoleCheck();
	this.debugUpdateCount = 0;
	this._debugOn = false;

  },

  debug: function(name, extra, collapse){
  	// name must be string
  	this._debugOn = true;
  	if(typeof name === "undefined"){
  		err("ReactDebug: No name given: `this.debug(`componentName`, `stateKey`)`, defaulting to `componentName`")
  	}
  	this.componentName = name ? name : 'componentName';
  	this.stateKey = extra ? extra : "undefined";
  	this.collapsed = collapse ? true : false;
  	this.collapsed ? grpC(this.componentName+" Will Mount: ") : grp(this.componentName+" Will Mount: ")
  	time("MountTime: "+this.componentName);
  },

  extra: function(){
  	if (typeof this.stateKey !== "undefined"){
  		if (this.stateKey in this.state){
  			nfo("Extra: ", this.state[this.stateKey])
  		} else {
  			throw new Error("ReactDebug: `"+this.stateKey+"` does not exist on this component");
  		}
  	}
  },

  componentDidMount: function(){

  	if(this._debugOn){
	  	this.collapsed ? grpC(this.componentName+" Did Mount: ") : grp(this.componentName+" Did Mount: ")
	  		this.debugmounted = true;

	  		this.extra();
	  	grpE(this.componentName+" Did Mount: ")
	  	grpE(this.componentName+" Will Mount: ")
	  	timeE("MountTime: "+this.componentName);
	}
  },

  componentWillReceiveProps: function(nextProps) {
  	if(this._debugOn){
	  	this.collapsed ? grpC(this.componentName+" Will Receive Props: ") : grp(this.componentName+" Will Receive Props: ")
	  		log("next Props: %O", nextProps)
	  		this.extra();
	 }
  },

  componentWillUpdate: function(nextProps, nextState){
  	if(this._debugOn){
	  	this.collapsed ? grpC(this.componentName+" Will Update: ") : grp(this.componentName+" Will Update: ")
	  		log("next Props: %O", nextProps)
	  		log("next State: %O", nextState)
	  		this.extra();
		  	time("UpdateTime: "+this.componentName);
	}
  },

  componentDidUpdate: function(prevProps, prevState){
  	if(this._debugOn){
	  	grpE(this.componentName+" Will Receive Props: ")
	  	grpE(this.componentName+" Will Update: ")

	  	this.collapsed ? grpC(this.componentName+" Did Update: ") : grp(this.componentName+" Did Update: ")
	  		timeE("UpdateTime: "+this.componentName);
		  	this.debugUpdateCount++;
		    log("UpdateCounter: "+this.debugUpdateCount)
		    log("previous Props: %O", prevProps)
		    log("previous State: %O", prevState)
		    this.extra();
		grpE(this.componentName+" Did Update: ")
	}
  },

  componentWillUnmount: function() {
  	if(this._debugOn){
	  	this.collapsed ? grpC(this.componentName+" Will Unmount: ") : grp(this.componentName+" Will Unmount: ")
	    	log("Total UpdateCounter: "+this.debugUpdateCount)
	    	this.extra();
	    grpE(this.componentName+" Will Unmount: ")
	}
  },
  _consoleCheck: function(){
  	// Avoid `console` errors in browsers that lack a console.
	var fallback = function() {};
	var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'profile', 'profileEnd', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn', 'table'];

	if(typeof console === 'undefined') {
		var console = {};
	}

	for(var i in methods) {
		if(typeof console[methods[i]] === 'undefined') {
			console[methods[i]] = fallback;
		}
	}
	// Console Aliases
	var log =     console.log             .bind(console);
	var nfo =     console.info            .bind(console);
	var warn =    console.warn            .bind(console);
	var err =     console.error           .bind(console);
	var table =   console.table           .bind(console);
	var dir =     console.dir             .bind(console);
	var cnt =     console.count           .bind(console);
	var time =    console.time            .bind(console);
	var timeE =   console.timeEnd         .bind(console);
	var grp =     console.group           .bind(console);
	var grpE =    console.groupEnd        .bind(console);
	var grpC =    console.groupCollapsed  .bind(console);
  }

};
