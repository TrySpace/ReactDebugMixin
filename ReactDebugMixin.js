var ReactDebugMixin = {

  componentWillMount: function() {
  	this._consoleCheck();
	    this.debugUpdateCount = 0;
	    time("MountTime")
  },

  debug: function(name, extra, collapse){
  	// name must be string
  	if(typeof name === "undefined"){
  		err("ReactDebug: No name given: `this.debug(`componentName`, `stateKey`)`, defaulting to `componentName`")
  	}
  	this.componentName = name ? name : 'componentName';
  	this.stateKey = extra ? extra : "_x_EMPTY_x_";
  	this.collapsed = collapse ? true : false;
  	this.collapsed ? grpC(this.componentName+" Will Mount: ") : grp(this.componentName+" Will Mount: ")
  },

  extra: function(){
  	if (this.stateKey !== "_x_EMPTY_x_"){
  		if (this.stateKey in this.state){
  			nfo(this.stateKey+":", this.state[this.stateKey])
  		} else {
  			throw new Error("ReactDebug: `"+this.stateKey+"` does not exist on this component");
  		}
  	}
  },

  componentDidMount: function(){
  	this.collapsed ? grpC(this.componentName+" Did Mount: ") : grp(this.componentName+" Did Mount: ")
  		this.debugmounted = true;
  		timeE("MountTime")
  		this.extra();
  	grpE(this.componentName+" Did Mount: ")
  	grpE(this.componentName+" Will Mount: ")
  },

  componentWillReceiveProps: function(nextProps) {
  	this.collapsed ? grpC(this.componentName+" Will Receive Props: ") : grp(this.componentName+" Will Receive Props: ")
  		log("next Props: %O", nextProps)
  		this.extra();
  },

  componentWillUpdate: function(nextProps, nextState){
  	this.collapsed ? grpC(this.componentName+" Will Update: ") : grp(this.componentName+" Will Update: ")
  		log("next Props: %O", nextProps)
  		log("next State: %O", nextState)
  		this.extra();
	  	time("UpdateTime")
  },

  componentDidUpdate: function(prevProps, prevState){
  	grpE(this.componentName+" Will Receive Props: ")
  	grpE(this.componentName+" Will Update: ")

  	this.collapsed ? grpC(this.componentName+" Did Update: ") : grp(this.componentName+" Did Update: ")
  		timeE("UpdateTime")
	  	this.debugUpdateCount++;
	    log("UpdateCounter: "+this.debugUpdateCount)
	    log("previous Props: %O", prevProps)
	    log("previous State: %O", prevState)
	    this.extra();
	grpE(this.componentName+" Did Update: ")
  },

  componentWillUnmount: function() {
  	this.collapsed ? grpC(this.componentName+" Will Unmount: ") : grp(this.componentName+" Will Unmount: ")
    	log("Total UpdateCounter: "+this.debugUpdateCount)
    	this.extra();
    grpE(this.componentName+" Will Unmount: ")
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
