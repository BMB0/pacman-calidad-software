let GHOST_BLINKY_CANVAS_CONTEXT = null;
let GHOST_BLINKY_POSITION_X = 276;
let GHOST_BLINKY_POSITION_Y = 204;
let GHOST_BLINKY_DIRECTION = 1;
let GHOST_BLINKY_COLOR = "#ed1b24";
let GHOST_BLINKY_MOVING_TIMER = -1;
let GHOST_BLINKY_MOVING = false;
let GHOST_BLINKY_BODY_STATE = 0;
let GHOST_BLINKY_STATE = 0;
let GHOST_BLINKY_EAT_TIMER = null;
let GHOST_BLINKY_AFFRAID_TIMER = null;
let GHOST_BLINKY_AFFRAID_STATE = 0;
let GHOST_BLINKY_TUNNEL = false;

let GHOST_PINKY_CANVAS_CONTEXT = null;
let GHOST_PINKY_POSITION_X = 276;
let GHOST_PINKY_POSITION_Y = 258;
let GHOST_PINKY_DIRECTION = 2;
let GHOST_PINKY_COLOR = "#feaec9";
let GHOST_PINKY_MOVING_TIMER = -1;
let GHOST_PINKY_MOVING = false;
let GHOST_PINKY_BODY_STATE = 1;
let GHOST_PINKY_STATE = 0;
let GHOST_PINKY_EAT_TIMER = null;
let GHOST_PINKY_AFFRAID_TIMER = null;
let GHOST_PINKY_AFFRAID_STATE = 0;
let GHOST_PINKY_TUNNEL = false;

let GHOST_INKY_CANVAS_CONTEXT = null;
let GHOST_INKY_POSITION_X = 238;
let GHOST_INKY_POSITION_Y = 258;
let GHOST_INKY_DIRECTION = 3;
let GHOST_INKY_COLOR = "#4adecb";
let GHOST_INKY_MOVING_TIMER = -1;
let GHOST_INKY_MOVING = false;
let GHOST_INKY_BODY_STATE = 2;
let GHOST_INKY_STATE = 0;
let GHOST_INKY_EAT_TIMER = null;
let GHOST_INKY_AFFRAID_TIMER = null;
let GHOST_INKY_AFFRAID_STATE = 0;
let GHOST_INKY_TUNNEL = false;

let GHOST_CLYDE_CANVAS_CONTEXT = null;
let GHOST_CLYDE_POSITION_X = 314;
let GHOST_CLYDE_POSITION_Y = 258;
let GHOST_CLYDE_DIRECTION = 4;
let GHOST_CLYDE_COLOR = "#f99c00";
let GHOST_CLYDE_MOVING_TIMER = -1;
let GHOST_CLYDE_MOVING = false;
let GHOST_CLYDE_BODY_STATE = 3;
let GHOST_CLYDE_STATE = 0;
let GHOST_CLYDE_EAT_TIMER = null;
let GHOST_CLYDE_AFFRAID_TIMER = null;
let GHOST_CLYDE_AFFRAID_STATE = 0;
let GHOST_CLYDE_TUNNEL = false;

let GHOST_AFFRAID_COLOR = "#2d3eff";
let GHOST_AFFRAID_FINISH_COLOR = "#fff";
let GHOST_POSITION_STEP = 2;
let GHOST_MOVING_SPEED = 15;
let GHOST_TUNNEL_MOVING_SPEED = 35;
let GHOST_AFFRAID_MOVING_SPEED = 40;
let GHOST_EAT_MOVING_SPEED = 6;
let GHOST_AFFRAID_TIME = 8500;
let GHOST_EAT_TIME = 5500;
let GHOST_BODY_STATE_MAX = 6;

function initGhosts() { 
	initGhost('blinky');
	initGhost('pinky');
	initGhost('inky');
	initGhost('clyde');
}
function initGhost(ghost) { 
	let canvas = document.getElementById('canvas-ghost-' + ghost);
	canvas.setAttribute('width', '550');
	canvas.setAttribute('height', '550');
	if (canvas.getContext) { 
		eval('GHOST_' + ghost.toUpperCase() + '_CANVAS_CONTEXT = canvas.getContext("2d")');
	}
}
function resetGhosts() { 
	stopGhosts();

	GHOST_BLINKY_POSITION_X = 276;
	GHOST_BLINKY_POSITION_Y = 204;
	GHOST_BLINKY_DIRECTION = 1;
	GHOST_BLINKY_MOVING_TIMER = -1;
	GHOST_BLINKY_MOVING = false;
	GHOST_BLINKY_BODY_STATE = 0;
	GHOST_BLINKY_STATE = 0;
	GHOST_BLINKY_EAT_TIMER = null;
	GHOST_BLINKY_AFFRAID_TIMER = null;
	GHOST_BLINKY_AFFRAID_STATE = 0;

	GHOST_PINKY_POSITION_X = 276;
	GHOST_PINKY_POSITION_Y = 258;
	GHOST_PINKY_DIRECTION = 2;
	GHOST_PINKY_MOVING_TIMER = -1;
	GHOST_PINKY_MOVING = false;
	GHOST_PINKY_BODY_STATE = 1;
	GHOST_PINKY_STATE = 0;
	GHOST_PINKY_EAT_TIMER = null;
	GHOST_PINKY_AFFRAID_TIMER = null;
	GHOST_PINKY_AFFRAID_STATE = 0;

	GHOST_INKY_POSITION_X = 238;
	GHOST_INKY_POSITION_Y = 258;
	GHOST_INKY_DIRECTION = 3;
	GHOST_INKY_MOVING_TIMER = -1;
	GHOST_INKY_MOVING = false;
	GHOST_INKY_BODY_STATE = 2;
	GHOST_INKY_STATE = 0;
	GHOST_INKY_EAT_TIMER = null;
	GHOST_INKY_AFFRAID_TIMER = null;
	GHOST_INKY_AFFRAID_STATE = 0;

	GHOST_CLYDE_POSITION_X = 314;
	GHOST_CLYDE_POSITION_Y = 258;
	GHOST_CLYDE_DIRECTION = 4;
	GHOST_CLYDE_MOVING_TIMER = -1;
	GHOST_CLYDE_MOVING = false;
	GHOST_CLYDE_BODY_STATE = 3;
	GHOST_CLYDE_STATE = 0;
	GHOST_CLYDE_EAT_TIMER = null;
	GHOST_CLYDE_AFFRAID_TIMER = null;
	GHOST_CLYDE_AFFRAID_STATE = 0;
}
function getGhostCanevasContext(ghost) { 
	return eval('GHOST_' + ghost.toUpperCase() + '_CANVAS_CONTEXT');
}

function drawGhosts() { 
	drawGhost("blinky");
	drawGhost('pinky');
	drawGhost('inky');
	drawGhost("clyde");
}
function drawGhost(ghost) { 

	let ctx = getGhostCanevasContext(ghost);
	
	if (eval('GHOST_' + ghost.toUpperCase() + '_STATE === 0')) { 
		eval('ctx.fillStyle = GHOST_' + ghost.toUpperCase() + '_COLOR');
	} else { 
		if (eval('GHOST_' + ghost.toUpperCase() + '_AFFRAID_STATE === 1')) { 
			eval('ctx.fillStyle = GHOST_AFFRAID_FINISH_COLOR');
		} else { 
			eval('ctx.fillStyle = GHOST_AFFRAID_COLOR');
		}
	}
	eval('drawHelperGhost(ctx, GHOST_' + ghost.toUpperCase() + '_POSITION_X, GHOST_' + ghost.toUpperCase() + '_POSITION_Y, GHOST_' + ghost.toUpperCase() + '_DIRECTION, GHOST_' + ghost.toUpperCase() + '_BODY_STATE, GHOST_' + ghost.toUpperCase() + '_STATE, GHOST_' + ghost.toUpperCase() + '_AFFRAID_STATE)');
	
	ctx.closePath();
	
	
}

function affraidGhosts() { 
	
	playWazaSound();
	
	SCORE_GHOST_COMBO = 200;

	affraidGhost("blinky");
	affraidGhost("pinky");
	affraidGhost("inky");
	affraidGhost("clyde");
}
function affraidGhost(ghost) { 
	if ( eval('GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER !== null') ) { 
		eval('GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER.cancel()');
		eval('GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER = null');
	}
	eval('GHOST_' + ghost.toUpperCase() + '_AFFRAID_STATE = 0');
	if (eval('GHOST_' + ghost.toUpperCase() + '_STATE === 0') || eval('GHOST_' + ghost.toUpperCase() + '_STATE === 1')) { 
		stopGhost(ghost);
		eval('GHOST_' + ghost.toUpperCase() + '_STATE = 1');
		moveGhost(ghost);
		eval('GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER = new Timer("cancelAffraidGhost(\'' + ghost + '\')", GHOST_AFFRAID_TIME)');
	}
}
function cancelAffraidGhost(ghost) { 
	if (eval('GHOST_' + ghost.toUpperCase() + '_STATE === 1')) { 
		eval('GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER.cancel()');
		eval('GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER = null');
		stopGhost(ghost);
		eval('GHOST_' + ghost.toUpperCase() + '_STATE = 0');
		moveGhost(ghost);
		testStateGhosts();
	}
}
function testStateGhosts() { 

	if ( GHOST_BLINKY_STATE === 1 ||  
		 GHOST_PINKY_STATE === 1 ||  
		 GHOST_INKY_STATE === 1 ||  
		 GHOST_CLYDE_STATE === 1 
	) { 
		playWazaSound();
	} else if ( GHOST_BLINKY_STATE === -1 ||  
		 GHOST_PINKY_STATE === -1 ||  
		 GHOST_INKY_STATE === -1 ||  
		 GHOST_CLYDE_STATE === -1 
	) { 
		playGhostEatenSound();		
	} else { 
		playSirenSound();
	}
}

function startEatGhost(ghost) { 
	
	if ( !LOCK ) { 
		playEatGhostSound();

		LOCK = true;
		
		if ( eval('GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER !== null') ) { 
			eval('GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER.cancel()');
			eval('GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER = null');
		}
		
		score(SCORE_GHOST_COMBO, ghost);
		
		pauseGhosts();
		pausePacman();
		
		setTimeout('eatGhost(\''+ ghost + '\')', 600);
	}
}

function eatGhost(ghost) { 

	playGhostEatenSound();
	
	if (eval('GHOST_' + ghost.toUpperCase() + '_STATE === 1')) { 
		$("#board span.combo").remove();
		eval('GHOST_' + ghost.toUpperCase() + '_STATE = -1');
		eval('GHOST_' + ghost.toUpperCase() + '_EAT_TIMER = new Timer("cancelEatGhost(\'' + ghost + '\')", GHOST_EAT_TIME)');
		eval('GHOST_' + ghost.toUpperCase() + '_EAT_TIMER.pause()');
	}
	resumeGhosts();
	resumePacman();
	LOCK = false;
}
function cancelEatGhost(ghost) { 
	if (eval('GHOST_' + ghost.toUpperCase() + '_STATE === -1')) { 
		eval('GHOST_' + ghost.toUpperCase() + '_EAT_TIMER = null');
		stopGhost(ghost);
		eval('GHOST_' + ghost.toUpperCase() + '_STATE = 0');
		moveGhost(ghost);
		testStateGhosts();
	}
}

function moveGhosts() { 
	moveGhost("blinky");
	moveGhost('pinky');
	moveGhost('inky');
	moveGhost("clyde");
}
function moveGhost(ghost) {

	if (eval('GHOST_' + ghost.toUpperCase() + '_MOVING === false')) { 
		eval('GHOST_' + ghost.toUpperCase() + '_MOVING = true;');

		let speed = -1;
		if (eval('GHOST_' + ghost.toUpperCase() + '_STATE === 1')) { 
			speed =  GHOST_AFFRAID_MOVING_SPEED;
		} else if (eval('GHOST_' + ghost.toUpperCase() + '_STATE === 0')) { 
			if (eval('GHOST_' + ghost.toUpperCase() + '_TUNNEL === false')) { 
				speed =  GHOST_MOVING_SPEED;
			} else { 
				speed =  GHOST_TUNNEL_MOVING_SPEED;
			}
		} else { 
			speed =  GHOST_EAT_MOVING_SPEED;
		}
		eval('GHOST_' + ghost.toUpperCase() + '_MOVING_TIMER = setInterval("moveGhost(\'' + ghost + '\')", ' + speed + ');');
	} else { 
	
		changeDirection(ghost);
		
		if ( eval('GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER !== null')) { 
			let remain = eval('GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER.remain();');
			if ((remain >= 2500 && remain < 3000) || (remain >= 1500 && remain <= 2000) || (remain >= 500 && remain <= 1000) || (remain < 0)) { 
				eval('GHOST_' + ghost.toUpperCase() + '_AFFRAID_STATE = 1;')
			} else if ((remain > 2000 && remain < 2500) || (remain > 1000 && remain < 1500) || (remain >= 0 && remain < 500)) { 
				eval('GHOST_' + ghost.toUpperCase() + '_AFFRAID_STATE = 0;')
			}
		}
		
		if (canMoveGhost(ghost)) { 
			eraseGhost(ghost);
						
			if (eval('GHOST_' + ghost.toUpperCase() + '_BODY_STATE < GHOST_BODY_STATE_MAX')) { 
				eval('GHOST_' + ghost.toUpperCase() + '_BODY_STATE ++;');
			} else { 
				eval('GHOST_' + ghost.toUpperCase() + '_BODY_STATE = 0;');
			}
						
			if ( eval('GHOST_' + ghost.toUpperCase() + '_DIRECTION === 1') ) { 
				eval('GHOST_' + ghost.toUpperCase() + '_POSITION_X += GHOST_POSITION_STEP;');
			} else if ( eval('GHOST_' + ghost.toUpperCase() + '_DIRECTION === 2') ) { 
				eval('GHOST_' + ghost.toUpperCase() + '_POSITION_Y += GHOST_POSITION_STEP;');
			} else if ( eval('GHOST_' + ghost.toUpperCase() + '_DIRECTION === 3') ) { 
				eval('GHOST_' + ghost.toUpperCase() + '_POSITION_X -= GHOST_POSITION_STEP;');
			} else if ( eval('GHOST_' + ghost.toUpperCase() + '_DIRECTION === 4') ) { 
				eval('GHOST_' + ghost.toUpperCase() + '_POSITION_Y -= GHOST_POSITION_STEP;');
			}
			
			if ( eval('GHOST_' + ghost.toUpperCase() + '_POSITION_X === 2') && eval('GHOST_' + ghost.toUpperCase() + '_POSITION_Y === 258') ) { 
				eval('GHOST_' + ghost.toUpperCase() + '_POSITION_X = 548;');
				eval('GHOST_' + ghost.toUpperCase() + '_POSITION_Y = 258;');
			} else if ( eval('GHOST_' + ghost.toUpperCase() + '_POSITION_X === 548') && eval('GHOST_' + ghost.toUpperCase() + '_POSITION_Y === 258') ) { 
				eval('GHOST_' + ghost.toUpperCase() + '_POSITION_X = 2;');
				eval('GHOST_' + ghost.toUpperCase() + '_POSITION_Y = 258;');
			}
			
			drawGhost(ghost);
			
			if (eval('GHOST_' + ghost.toUpperCase() + '_BODY_STATE === 3') && eval('GHOST_' + ghost.toUpperCase() + '_STATE != -1')) { 
				if ( !PACMAN_MOVING ) { 
					testGhostPacman(ghost);
				}
				testGhostTunnel(ghost);
			}
		} else { 
			eval('GHOST_' + ghost.toUpperCase() + '_DIRECTION = oneDirection();');
		}
	}
}

function testGhostTunnel(ghost) { 
	if ( eval('GHOST_' + ghost.toUpperCase() + '_STATE === 0') ) { 
		if (isInTunnel(ghost) && eval('GHOST_' + ghost.toUpperCase() + '_TUNNEL === false')) { 
			stopGhost(ghost);
			eval('GHOST_' + ghost.toUpperCase() + '_TUNNEL = true');
			moveGhost(ghost);
		} else if (!isInTunnel(ghost) && eval('GHOST_' + ghost.toUpperCase() + '_TUNNEL === true')) { 
			stopGhost(ghost);
			eval('GHOST_' + ghost.toUpperCase() + '_TUNNEL = false');
			moveGhost(ghost);
		}
	}
}
function isInTunnel(ghost) { 
	let canbool=false;
	let conditionboolean=( ( eval('GHOST_' + ghost.toUpperCase() + '_POSITION_X >= 2') && eval('GHOST_' + ghost.toUpperCase() + '_POSITION_X <= 106') ) && eval('GHOST_' + ghost.toUpperCase() + '_POSITION_Y === 258') );
	let conditionboolean1=( ( eval('GHOST_' + ghost.toUpperCase() + '_POSITION_X >= 462') && eval('GHOST_' + ghost.toUpperCase() + '_POSITION_X <= 548') ) && eval('GHOST_' + ghost.toUpperCase() + '_POSITION_Y === 258') );
	if (conditionboolean||conditionboolean1){
		canbool=true;
	}
	return canbool;
}


function changeDirection(ghost) { 
	eval('var direction = GHOST_' + ghost.toUpperCase() + '_DIRECTION');
	eval('var state = GHOST_' + ghost.toUpperCase() + '_STATE');
	eval('var ghostX = GHOST_' + ghost.toUpperCase() + '_POSITION_X');
	eval('var ghostY = GHOST_' + ghost.toUpperCase() + '_POSITION_Y');
	
	let tryDirection = oneDirection();
	
	if (state === 0 || state === 1) { 
		if (ghostX != 276 && ghostY != 258) { 
			let pacmanX = PACMAN_POSITION_X;
			let pacmanY = PACMAN_POSITION_Y;
			let axe = oneAxe();
			if (ghost === "blinky") { 
			
				let nothing = whatsYourProblem();
				if (nothing < 6) { 
					tryDirection = getRightDirection(axe, ghostX, ghostY, pacmanX, pacmanY);
					if ( !(canMoveGhost(ghost, tryDirection) && (direction != tryDirection -2 && direction != tryDirection + 2)) ) { 
						axe ++;
						if (axe > 2) axe = 1; 
						tryDirection = getRightDirection(axe, ghostX, ghostY, pacmanX, pacmanY);
					}
				}
				
			} else if (ghost === "pinky") { 
			
				let nothing = whatsYourProblem();
				if (nothing < 3) { 
				
					tryDirection = getRightDirection(axe, ghostX, ghostY, pacmanX, pacmanY);
					if ( !(canMoveGhost(ghost, tryDirection) && (direction != tryDirection -2 && direction != tryDirection + 2)) ) { 
						axe ++;
						if (axe > 2) axe = 1; 
						tryDirection = getRightDirection(axe, ghostX, ghostY, pacmanX, pacmanY);
					}
					tryDirection = reverseDirection(tryDirection);
				}
				
			} else if (ghost === "inky") { 
				let good = anyGoodIdea();
				if (good < 3) { 
					tryDirection = getRightDirection(axe, ghostX, ghostY, pacmanX, pacmanY);
					if ( !(canMoveGhost(ghost, tryDirection) && (direction != tryDirection -2 && direction != tryDirection + 2)) ) { 
						axe ++;
						if (axe > 2) axe = 1; 
						tryDirection = getRightDirection(axe, ghostX, ghostY, pacmanX, pacmanY);
					}
				}
			}
		}
		if (state === 1) { 
			tryDirection = reverseDirection(tryDirection);
		}
	} else { 
		let axe = oneAxe();
		tryDirection = getRightDirectionForHome(axe, ghostX, ghostY);
		if (!(canMoveGhost(ghost, tryDirection) && (direction != tryDirection -2 && direction != tryDirection + 2))) { 
		    axe ++;
			if (axe > 2) axe = 1; 
			tryDirection = getRightDirectionForHome(axe, ghostX, ghostY);
		} 
	}
	
	if (canMoveGhost(ghost, tryDirection) && (direction != tryDirection -2 && direction != tryDirection + 2)) { 
		eval('GHOST_' + ghost.toUpperCase() + '_DIRECTION = tryDirection');
	}
}


function oneDirectionComprobation(ghostX, ghostY){
	return (ghostX === 276 && ghostY === 258)
}

function getRightDirectionForHome(axe, ghostX, ghostY) { 
	let homeX = 276;
	let homeY = 204;
	
	if (ghostY === 204 && ghostX === 276) { 	
		return 2;
	} else if (oneDirectionComprobation(ghostX, ghostY)) { 
		return oneDirectionX();
	} else { 
		if (axe === 1) { 
			if (ghostX > homeX) { 
			 return 3;
			} else { 
				return 1;
			}
		} else { 
			if (ghostY > homeY) { 
			 return 4;
			} else { 
				return 2;
			}
		}
	}
}
function getRightDirection(axe, ghostX, ghostY, pacmanX, pacmanY) { 
	if (axe === 1) { 
		if (ghostX > pacmanX) { 
		 return 3;
		} else { 
			return 1;
		}
	} else { 
		if (ghostY > pacmanY) { 
		 return 4;
		} else { 
			return 2;
		}
	}
}
function reverseDirection(direction) { 
	if (direction > 2) return direction - 2;
	else return direction + 2;
}

function eraseGhost(ghost) { 

	let ctx = getGhostCanevasContext(ghost);
	
	eval('ctx.clearRect(GHOST_' + ghost.toUpperCase() + '_POSITION_X - 17, GHOST_' + ghost.toUpperCase() + '_POSITION_Y - 17, 34, 34)');
}
function eraseGhosts() { 

	eraseGhost('blinky');
	eraseGhost('pinky');
	eraseGhost('inky');
	eraseGhost('clyde');
}

function canMoveGhost(ghost, direction) { 
	if (!direction) { 
		eval('var direction = GHOST_' + ghost.toUpperCase() + '_DIRECTION');
	}
	eval('var positionX = GHOST_' + ghost.toUpperCase() + '_POSITION_X');
	eval('var positionY = GHOST_' + ghost.toUpperCase() + '_POSITION_Y');
	eval('var state = GHOST_' + ghost.toUpperCase() + '_STATE');
	
	if (positionX === 276 && positionY === 204 && direction === 2 && state === 0) return false;

	if ( direction === 1 ) { 
		positionX += GHOST_POSITION_STEP;
	} else if ( direction === 2 ) { 
		positionY += GHOST_POSITION_STEP;
	} else if ( direction === 3 ) { 
		positionX -= GHOST_POSITION_STEP;
	} else if ( direction === 4 ) { 
		positionY -= GHOST_POSITION_STEP;
	}
	
	for (let i = 0, imax = PATHS.length; i < imax; i ++) { 
	
		let p = PATHS[i];
	
		let startX = p.split("-")[0].split(",")[0];
		let startY = p.split("-")[0].split(",")[1];
		let endX = p.split("-")[1].split(",")[0];
		let endY = p.split("-")[1].split(",")[1];

		if (positionX >= startX && positionX <= endX && positionY >= startY && positionY <= endY) { 
			return true;
		}
	}
	
	return false;
}

function oneDirection() { 
	return Math.floor( Math.random() * ( 4 - 1 + 1 ) + 1 );
}
function oneDirectionX() { 
	let direction = oneDirection();
	if (direction === 4 || direction === 2) direction -= 1;
	return direction;
}
function oneDirectionY() { 
	let direction = oneDirection();
	if (direction === 3 || direction === 1) direction -= 1;
	return direction;
}

function stopGhost(ghost) { 

	if (eval('GHOST_' + ghost.toUpperCase() + '_STATE === 1')) { 
		eval('if(GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER !== null) GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER.cancel()');
		eval('GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER = null');
		eval('GHOST_' + ghost.toUpperCase() + '_STATE = 0');
	} else if (eval('GHOST_' + ghost.toUpperCase() + '_STATE === -1')) { 
		eval('if(GHOST_' + ghost.toUpperCase() + '_EAT_TIMER !== null) GHOST_' + ghost.toUpperCase() + '_EAT_TIMER.cancel()');
		eval('GHOST_' + ghost.toUpperCase() + '_EAT_TIMER = null');
		eval('GHOST_' + ghost.toUpperCase() + '_STATE = 0');
	}

	if ( eval('GHOST_' + ghost.toUpperCase() + '_MOVING_TIMER != -1') ) { 
		eval('clearInterval(GHOST_' + ghost.toUpperCase() + '_MOVING_TIMER)');
		eval('GHOST_' + ghost.toUpperCase() + '_MOVING_TIMER = -1');
		eval('GHOST_' + ghost.toUpperCase() + '_MOVING = false');
	}
}
function stopGhosts() { 
	stopGhost('blinky');
	stopGhost('pinky');
	stopGhost('inky');
	stopGhost('clyde');
}

function pauseGhost(ghost) { 
	if (eval('GHOST_' + ghost.toUpperCase() + '_STATE === 1')) { 
		eval('if(GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER !== null) GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER.pause()');
	} else if (eval('GHOST_' + ghost.toUpperCase() + '_STATE === -1')) { 
		eval('if(GHOST_' + ghost.toUpperCase() + '_EAT_TIMER !== null) GHOST_' + ghost.toUpperCase() + '_EAT_TIMER.pause()');
	}
	
	if ( eval('GHOST_' + ghost.toUpperCase() + '_MOVING_TIMER != -1') ) { 
		eval('clearInterval(GHOST_' + ghost.toUpperCase() + '_MOVING_TIMER)');
		eval('GHOST_' + ghost.toUpperCase() + '_MOVING_TIMER = -1');
		eval('GHOST_' + ghost.toUpperCase() + '_MOVING = false');
	}
}
function pauseGhosts() { 
	pauseGhost('blinky');
	pauseGhost('pinky');
	pauseGhost('inky');
	pauseGhost('clyde');
}

function resumeGhost(ghost) { 
	if (eval('GHOST_' + ghost.toUpperCase() + '_STATE === 1')) { 
		eval('if(GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER !== null) GHOST_' + ghost.toUpperCase() + '_AFFRAID_TIMER.resume()');
	} else if (eval('GHOST_' + ghost.toUpperCase() + '_STATE === -1')) { 
		eval('if(GHOST_' + ghost.toUpperCase() + '_EAT_TIMER !== null) GHOST_' + ghost.toUpperCase() + '_EAT_TIMER.resume()');
	}
	moveGhost(ghost);
}
function resumeGhosts() { 
	resumeGhost('blinky');
	resumeGhost('pinky');
	resumeGhost('inky');
	resumeGhost('clyde');
}

function drawHelperGhostComprobation(ctx, x, y, b, s){
	if (s != -1) { 
		ctx.beginPath();
		ctx.moveTo((x - 15), (y + 16));
		ctx.lineTo((x - 15), (y + 16) - 18);
		ctx.bezierCurveTo((x - 15), (y + 16) - 26, (x - 15) + 6, (y + 16) - 32, (x - 15) + 14, (y + 16) - 32);
		ctx.bezierCurveTo((x - 15) + 22, (y + 16) - 32, (x - 15) + 28, (y + 16) - 26, (x - 15) + 28, (y + 16) - 18);
		ctx.lineTo((x - 15) + 28, (y + 16));
		if (b < 4) { 
			ctx.lineTo((x - 15) + 23.333, (y + 16) - 5.333);
			ctx.lineTo((x - 15) + 18.666, (y + 16));
			ctx.lineTo((x - 15) + 14, (y + 16) - 5.333);
			ctx.lineTo((x - 15) + 9.333, (y + 16));
			ctx.lineTo((x - 15) + 4.666, (y + 16) - 5.333);
		} else { 
			ctx.lineTo((x - 15) + 24.333, (y + 16) - 5.333);
			ctx.lineTo((x - 15) + 20.666, (y + 16));
			ctx.lineTo((x - 15) + 17.333, (y + 16) - 5.333);
			ctx.lineTo((x - 15) + 12.666, (y + 16));
			ctx.lineTo((x - 15) + 9, (y + 16) - 5.333);
			ctx.lineTo((x - 15) + 5.333, (y + 16));
			ctx.lineTo((x - 15) + 2.666, (y + 16) - 5.333);
		}
		ctx.lineTo((x - 15), (y + 16) );
		ctx.fill();
	}
}

function drawHelperGhostPathComprobation(ctx, x, y, a){
	if (a === 1) { 
		ctx.fillStyle = "#ee2933";
	} else { 
		ctx.fillStyle = "#e5bed0";
	}
	ctx.beginPath();
	ctx.arc((x - 15) + 18, (y + 13) - 17, 2, 0, Math.PI * 2, true);
	ctx.fill();

	ctx.beginPath();
	ctx.arc((x - 15) + 10, (y + 13) - 17, 2, 0, Math.PI * 2, true);
	ctx.fill();
	
	if (a === 1) { 
		ctx.strokeStyle = "#ee2933";
	} else { 
		ctx.strokeStyle = "#e5bed0";
	}
	ctx.beginPath();
	ctx.lineTo((x - 14.333) + 24, (y + 6));
	
	ctx.lineTo((x - 14.333) + 21, (y + 6) - 3);		
	ctx.lineTo((x - 14.333) + 17, (y + 6));
	
	ctx.lineTo((x - 14.333) + 14, (y + 6) - 3);
	ctx.lineTo((x - 14.333) + 10, (y + 6));
	
	ctx.lineTo((x - 14.333) + 7, (y + 6) - 3);
	ctx.lineTo((x - 14.333) + 3, (y + 6));
	ctx.stroke();
}

function drawHelperGhost(ctx, x, y, d, b, s, a) { 

	drawHelperGhostComprobation(ctx, x, y, b, s);

	let eyesX = 0;
	let eyesY = 0;


	if (d === 4) { 
		eyesY = -5;
	} else if (d === 1) { 
		eyesX = +2;
	} else if (d === 2) { 
		eyesY = +5;
	} else if (d === 3) { 
		eyesX = -3;
	}

	if (s === 0 || s === -1) { 
		ctx.fillStyle = "white";
		ctx.beginPath();
		ctx.moveTo((x - 15) + 8 + eyesX, (y + 16) - 24 + eyesY);
		ctx.bezierCurveTo((x - 15) + 5 + eyesX, (y + 16) - 24 + eyesY, (x - 15) + 4 + eyesX, (y + 16) - 21 + eyesY, (x - 15) + 4 + eyesX, (y + 16) - 19 + eyesY);
		ctx.bezierCurveTo((x - 15) + 4 + eyesX, (y + 16) - 17 + eyesY, (x - 15) + 5 + eyesX, (y + 16) - 14 + eyesY, (x - 15) + 8 + eyesX, (y + 16) - 14 + eyesY);
		ctx.bezierCurveTo((x - 15) + 11 + eyesX, (y + 16) - 14 + eyesY, (x - 15) + 12 + eyesX, (y + 16) - 17 + eyesY, (x - 15) + 12 + eyesX, (y + 16) - 19 + eyesY);
		ctx.bezierCurveTo((x - 15) + 12 + eyesX, (y + 16) - 21 + eyesY, (x - 15) + 11 + eyesX, (y + 16) - 24 + eyesY, (x - 15) + 8 + eyesX, (y + 16) - 24 + eyesY);
		
		ctx.moveTo((x - 15) + 20 + eyesX, (y + 16) - 24 + eyesY);
		ctx.bezierCurveTo((x - 15) + 17 + eyesX, (y + 16) - 24 + eyesY, (x - 15) + 16 + eyesX, (y + 16) - 21 + eyesY, (x - 15) + 16 + eyesX, (y + 16) - 19 + eyesY);
		ctx.bezierCurveTo((x - 15) + 16 + eyesX, (y + 16) - 17 + eyesY, (x - 15) + 17 + eyesX, (y + 16) - 14 + eyesY, (x - 15) + 20 + eyesX, (y + 16) - 14 + eyesY);
		ctx.bezierCurveTo((x - 15) + 23 + eyesX, (y + 16) - 14 + eyesY, (x - 15) + 24 + eyesX, (y + 16) - 17 + eyesY, (x - 15) + 24 + eyesX, (y + 16) - 19 + eyesY);
		ctx.bezierCurveTo((x - 15) + 24 + eyesX, (y + 16) - 21 + eyesY, (x - 15) + 23 + eyesX, (y + 16) - 24 + eyesY, (x - 15) + 20 + eyesX, (y + 16) - 24 + eyesY);
		ctx.fill();
		
		if (d === 4) { 
			eyesY = -9;
			eyesX = 2;
		} else if (d === 1) { 
			eyesX = +6;
		} else if (d === 2) { 
			eyesY = +8;
			eyesX = 2;
		} 
		ctx.fillStyle = "#0000fa";
		ctx.beginPath();
		ctx.arc((x - 15) + 18 + eyesX, (y + 16) - 18 + eyesY, 2, 0, Math.PI * 2, true);
		ctx.fill();

		ctx.beginPath();
		ctx.arc((x - 15) + 6 + eyesX, (y + 16) - 18 + eyesY, 2, 0, Math.PI * 2, true);
		ctx.fill();
	} else { 
		drawHelperGhostPathComprobation(ctx, x, y, a)
	}
}