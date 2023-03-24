let BUBBLES_ARRAY = new Array();
let BUBBLES_CANVAS_CONTEXT = null;
let BUBBLES_X_START = 30;
let BUBBLES_X_END = 518;
let BUBBLES_GAP = ((BUBBLES_X_END - BUBBLES_X_START) / 25);
let BUBBLES_Y_START = 26;
let BUBBLES_Y_END = 522;
let BUBBLES_SIZE = 3;
let BUBBLES_COUNTER = 0;

let SUPER_BUBBLES = [];
let SUPER_BUBBLES_SIZE = 8;
let SUPER_BUBBLES_BLINK = false;
let SUPER_BUBBLES_BLINK_STATE = 0;
let SUPER_BUBBLES_BLINK_TIMER = -1;
let SUPER_BUBBLES_BLINK_SPEED = 525;

function initBubbles() { 
	BUBBLES_COUNTER = 0;
	BUBBLES_ARRAY.length = 0;

	let canvas = document.getElementById('canvas-bubbles');
	canvas.setAttribute('width', '550');
	canvas.setAttribute('height', '550');
	if (canvas.getContext) { 
		BUBBLES_CANVAS_CONTEXT = canvas.getContext('2d');
	}
}

function getBubblesCanevasContext() { 
	return BUBBLES_CANVAS_CONTEXT;
}

function drawBubbles() { 

	let ctx = getBubblesCanevasContext();
	ctx.fillStyle = "#dca5be";
	
	for (let line = 1, linemax = 29, i = 0, s = 0; line <= linemax; line ++) { 
		let y = getYFromLine(line);
		for (let x = BUBBLES_X_START, xmax = BUBBLES_X_END, bubble = 1 ; x < xmax; bubble ++, x += BUBBLES_GAP) { 
			if (canAddBubble(line, bubble)) { 
				let type = "";
				let size = "";
				if (isSuperBubble(line, bubble)) { 
					type = "s";
					size = SUPER_BUBBLES_SIZE;
					SUPER_BUBBLES[s] = line + ";" + bubble + ";" + parseInt(correctionX(x, bubble)) + "," + parseInt(y) + ";0";
					s ++;
				} else { 
					type = "b";
					size = BUBBLES_SIZE;
				}
				BUBBLES_COUNTER ++;
				ctx.beginPath();
				ctx.arc(correctionX(x, bubble), y, size, 0, 2 * Math.PI, false);
				ctx.fill();
				ctx.closePath();
				
				BUBBLES_ARRAY.push( parseInt(correctionX(x, bubble)) + "," + parseInt(y) + ";" + line + ";" + bubble + ";" + type + ";0" );
				i ++;
			}
		}
	}
}

function stopBlinkSuperBubbles() { 
	clearInterval(SUPER_BUBBLES_BLINK_TIMER);
	SUPER_BUBBLES_BLINK_TIMER = -1;
	SUPER_BUBBLES_BLINK = false;
}

function blinkSuperBubbles() { 

	if (SUPER_BUBBLES_BLINK === false) { 
		SUPER_BUBBLES_BLINK = true;
		SUPER_BUBBLES_BLINK_TIMER = setInterval('blinkSuperBubbles()', SUPER_BUBBLES_BLINK_SPEED);
	} else { 
		
		if (SUPER_BUBBLES_BLINK_STATE === 0) { 
			SUPER_BUBBLES_BLINK_STATE = 1;
		} else { 
			SUPER_BUBBLES_BLINK_STATE = 0;
		}
		
		let clone = SUPER_BUBBLES.slice(0);
		
		for (let i = 0, imax = clone.length; i < imax; i ++) { 
		
			let s = clone[i];
		
			if ( s.split(";")[3] === "0" ) { 
			
				let sx = parseInt(s.split(";")[2].split(",")[0]);
				let sy = parseInt(s.split(";")[2].split(",")[1]);
			
				if (SUPER_BUBBLES_BLINK_STATE === 1) { 
					eraseBubble("s", sx, sy);
				} else { 
					let ctx = getBubblesCanevasContext();
					ctx.fillStyle = "#dca5be";
					ctx.beginPath();
					ctx.arc(sx, sy, SUPER_BUBBLES_SIZE, 0, 2 * Math.PI, false);
					ctx.fill();
					ctx.closePath();
				}

			}
		}
	}
}

function setSuperBubbleOnXY( x, y, eat ) { 

	for (let i = 0, imax = SUPER_BUBBLES.length; i < imax; i ++) { 
		let bubbleParams = SUPER_BUBBLES[i].split( ";" );
		let testX = parseInt(bubbleParams[2].split( "," )[0]);
		let testY = parseInt(bubbleParams[2].split( "," )[1]);
		if ( testX === x && testY === y ) { 
			SUPER_BUBBLES[i] = SUPER_BUBBLES[i].substr( 0, SUPER_BUBBLES[i].length - 1 ) + "1";
			break;
		}
	}
}

function getBubbleOnXY( x, y ) { 

	let bubble = null;
	for (let i = 0, imax = BUBBLES_ARRAY.length; i < imax; i ++) { 
		let bubbleParams = BUBBLES_ARRAY[i].split( ";" );
		let testX = parseInt(bubbleParams[0].split( "," )[0]);
		let testY = parseInt(bubbleParams[0].split( "," )[1]);
		if ( testX === x && testY === y ) { 
			bubble = BUBBLES_ARRAY[i];
			break;
		}
	}
	return bubble;
}

function eraseBubble(t, x, y) { 

	let ctx = getBubblesCanevasContext();

	let size = "";
	if (t === "s") { 
		size = SUPER_BUBBLES_SIZE;
	} else { 
		size = BUBBLES_SIZE;
	}

	ctx.clearRect(x - size, y - size, (size + 1) * 2, (size + 1) * 2);
}

function isSuperBubble(line, bubble) { 
	if ( (line === 23 || line === 4) && (bubble === 1 || bubble === 26)) { 
		return true;
	}
	
	return false;
}

function canAddBubble(line, bubble) { 
	let canAdd = true;
	let bubbleCondition = ( ( line >= 1 && line <= 4) || (line >= 9 && line <= 10) || (line >= 20 && line <= 22) || (line >= 26 && line <= 28) ) && (bubble === 13 || bubble === 14)
	let bubbleCondition1 = ( (line >= 2 && line <= 4) || (line >= 21 && line <= 22) ) && ( (bubble >= 2 && bubble <= 5) || (bubble >= 7 && bubble <= 11) || (bubble >= 16 && bubble <= 20) || (bubble >= 22 && bubble <= 25) )
	let bubbleCondition2 = ( line >= 6 && line <= 7 ) && ( (bubble >= 2 && bubble <= 5) || (bubble >= 7 && bubble <= 8) || (bubble >= 10 && bubble <= 17) ||  (bubble >= 19 && bubble <= 20) || (bubble >= 22 && bubble <= 25) )
	let bubbleCondition3 = ( line === 8 ) && ( (bubble >= 7 && bubble <= 8) || (bubble >= 13 && bubble <= 14) || (bubble >= 19 && bubble <= 20) )
	let bubbleCondition4 = (( line >= 9 &&  line <= 19) ) && ( (bubble >= 1 && bubble <= 5) || (bubble >= 22 && bubble <= 26) )
	let bubbleCondition5 = ( line === 11 || line === 17 ) && ( (bubble >= 7 && bubble <= 20) )
	let bubbleCondition6 = ( line === 9 || line === 10 ) && ( (bubble === 12 || bubble === 15) )
	let bubbleCondition7 = ( (line >= 12 && line <= 13) || (line >= 15 && line <= 16) ) && ( (bubble === 9 || bubble === 18) )
	let bubbleCondition8 = line === 14 && ( (bubble >= 7 && bubble <= 9) || (bubble >= 18 && bubble <= 20) )
	let bubbleCondition9 = (line === 18 || line === 19) && ( bubble === 9 || bubble === 18)
	let bubbleCondition10 = ( line >= 9 && line <= 10 ) && ( (bubble >= 7 && bubble <= 11) || (bubble >= 16 && bubble <= 20) )
	let bubbleCondition11 = (( line >= 11 && line <= 13) || (line >= 15 && line <= 19) ) && ( (bubble >= 7 && bubble <= 8) || (bubble >= 19 && bubble <= 20) )
	let bubbleCondition12 = ( (line >= 12 && line <= 16) || (line >= 18 && line <= 19) ) && ( bubble >= 10 && bubble <= 17)
	let bubbleCondition13 = (line === 23) && ( (bubble >= 4 && bubble <= 5) || (bubble >= 22 && bubble <= 23) )
	let bubbleCondition14 = (line >= 24 && line <= 25) && ( (bubble >= 1 && bubble <= 2) || (bubble >= 4 && bubble <= 5) || (bubble >= 7 && bubble <= 8) || (bubble >= 10 && bubble <= 17) || (bubble >= 19 && bubble <= 20) || (bubble >= 22 && bubble <= 23) || (bubble >= 25 && bubble <= 26) )
	let bubbleCondition15 = (line === 26) && ( (bubble >= 7 && bubble <= 8) || (bubble >= 19 && bubble <= 20) ) 
	let bubbleCondition16 = (line >= 27 && line <= 28) && ( (bubble >= 2 && bubble <= 11) || (bubble >= 16 && bubble <= 25) )

	let condition = bubbleCondition || bubbleCondition1 || bubbleCondition2 || bubbleCondition3 || bubbleCondition4 || bubbleCondition5 || bubbleCondition6 || bubbleCondition7 || bubbleCondition8 || bubbleCondition9 || bubbleCondition10 || bubbleCondition11 || bubbleCondition12 || bubbleCondition13 || bubbleCondition14 || bubbleCondition15 || bubbleCondition16
	if (condition) {
		canAdd = false;
	} 
	return canAdd;
}

function correctionX(x, bubble) { 
	
	if (bubble === 3) { 
		return x + 1;
	} else if (bubble === 6) { 
		return x + 1;
	} else if (bubble === 15) { 
		return x + 1;
	} else if (bubble === 18) { 
		return x + 1;
	} else if (bubble === 21) { 
		return x + 2;
	} else if (bubble === 24) { 
		return x + 2;
	} else if (bubble === 26) { 
		return x + 1;
	}
	return x;
}

function getYFromLine(line) { 
	let y = BUBBLES_Y_START;
	if (line < 8) { 
		y = BUBBLES_Y_START + ( (line - 1) * 18 );
	} else if (line > 7 && line < 15) { 
		y = 150 + ( (line - 8) * 18 );
	} else if (line > 14 && line < 21) { 
		y = 256 + ( (line - 14) * 18 );
	} else if (line > 20 && line < 26) { 
		y = 362 + ( (line - 20) * 18 );
	} else if (line > 25 && line < 29) { 
		y = 452 + ( (line - 25) * 18 );
	} else if (line === 29) { 
		y = BUBBLES_Y_END;
	}

	return y;
}