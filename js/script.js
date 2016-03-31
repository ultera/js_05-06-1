
var btnStart = document.querySelector('.button-start');
var btnStop = document.querySelector('.button-stop');
var btnSplit = document.querySelector('.button-split');
var btnReset = document.querySelector('.button-reset');

var myMilliseconds = document.querySelector('.milliseconds');
var myTimer = document.querySelector('.timer');
var myTable = document.querySelector('table');

var idInterval;
var isRun = false;
var arrTimer = [0, 0, 0, 0];
var numRows = 0;


btnStart.addEventListener('click', start);
btnStop.addEventListener('click', stop);
btnSplit.addEventListener('click', split);
btnReset.addEventListener('click', reset);

function start() {
	var beginDate = new Date();

	if(!isRun) {
		btnStart.style.display = 'none';
		btnStop.style.display = 'inline-block';
	} else {
		btnStart.style.display = 'none';
		btnStop.style.display = 'inline-block';
		arrTimer = myTimer.innerHTML.split(':');
		arrTimer[3] = +myMilliseconds.innerHTML;
		for (var i = 0; i < 4; i++) {
			arrTimer[i] = parseInt(arrTimer[i]);
		}
	}
	
	isRun = true;

	idInterval = setInterval(function() {
		var delta,
			hours,
			minutes,
			seconds,
			milliseconds,
			time,
			timerValue;

		timerValue = arrTimer[0]*3600000 + arrTimer[1]*60000 + arrTimer[2]*1000 + arrTimer[3];
		delta = new Date() - beginDate + timerValue;
		hours = Math.floor(delta/3600000);

		delta = delta - hours*3600000;
		minutes = Math.floor(delta/60000);

		delta = delta - minutes*60000;
		seconds = Math.floor(delta/1000);

		delta = delta - seconds*1000;
		milliseconds = delta;

    	myMilliseconds.innerHTML = addZeros(milliseconds, 3);
    	time = addZeros(hours, 2) + ':' + addZeros(minutes, 2) + ':' + addZeros(seconds, 2);
    	myTimer.innerHTML = time;

	}, 1);
}

function stop() {
	var newRow;

	btnStart.style.display = 'inline-block';
	btnStop.style.display = 'none';

	newRow = myTable.insertRow(-1);
	numRows++;
	newRow.className = 'active';

	newCell = newRow.insertCell(0);
	newCell.className = 'text-center';
	newCell.width = 50;
	newCell.innerText = numRows;

	newCell = newRow.insertCell(1);
	newCell.className = 'text-center';
	newCell.width = 100;
	newCell.innerText = 'stop';

	newCell = newRow.insertCell(2);
	newCell.className = 'text-center';
	newCell.width = 200;
	newCell.innerText = myTimer.innerText + ' . ' + myMilliseconds.innerText;

	clearInterval(idInterval);
}

function split() {

	if(btnStart.style.display == 'inline-block'){return;}

	var newRow = myTable.insertRow(-1);
	var newCell;
	numRows++;

	newRow.className = 'info';
	
	newCell = newRow.insertCell(0);
	newCell.className = 'text-center';
	newCell.width = 50;
	newCell.innerText = numRows;
	
	newCell = newRow.insertCell(1);
	newCell.className = 'text-center';
	newCell.width = 100;
	newCell.innerText = 'split';
	
	newCell = newRow.insertCell(2);
	newCell.className = 'text-center';
	newCell.width = 200;
	newCell.innerText = myTimer.innerText + ' . ' + myMilliseconds.innerText;
}

function reset() {
	myMilliseconds.innerHTML = '000';
    myTimer.innerHTML = '00:00:00';
	btnStart.style.display = 'inline-block';
	btnStop.style.display = 'none';
	isRun = false;
	arrTimer = [0, 0, 0, 0];
	clearInterval(idInterval);
	deleteRows();
	numRows = 0;
}

function addZeros(str, n) {
	str = String(str);
	while(str.length < n) {
		str = '0' + str;
	}
	return str;
}

function deleteRows() {
	for(var i = 0; i < numRows; i++) {
		myTable.deleteRow(0);
	}
}



