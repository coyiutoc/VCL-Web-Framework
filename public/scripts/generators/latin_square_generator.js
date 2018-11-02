(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = latinSquare

/**
 * Creates a random row generating function meeting the lating square restriction
 * usage:
 *		 sampler = latinCube(someRow)
 *		 newRow = sampler() | newRow = sampler(row)
 * @param	 {Array}		row samples to be randomized
 * @returns {Function} row generating function
 */
function latinSquare (row) {
	var sN = row.length,
			rowCount = 0

	// prepare array of row and col indices for pre-sorting
	var hSort = shuffle(sequence(sN)),
			vSort = shuffle(hSort.slice())

	return function nextRow (countORtarget) {
		if (rowCount === sN) return countORtarget = null
		var target = Array.isArray(countORtarget) ? countORtarget
			: (countORtarget >= 0) ? Array(countORtarget)
			: Array(sN)
		if (target.length > sN) target.length = sN

		for (var i = 0; i < target.length; ++i) {
			var idx = hSort[i] + vSort[rowCount]
			if (idx >= sN) idx -= sN
			target[i] = row[idx]
		}
		rowCount++

		return target
	}
}
function sequence(n) {
	for (var i = 0, a=Array(n); i < n; ++i) a[i] = i
	return a
}
// modified from https://github.com/sindresorhus/array-shuffle
function shuffle(arr) {
	var len = arr.length
	while (len) {
		var rnd = Math.floor(Math.random() * len--)
		var tmp = arr[len]
		arr[len] = arr[rnd]
		arr[rnd] = tmp
	}
	return arr
}

},{}],2:[function(require,module,exports){

var latin_square = require('latin-square');

window.initialize_latin_square=function(size){
    var array = Array.apply(null, {length: size}).map(Number.call, Number);
    var sampler = latin_square(array);
    var row = sampler();

   	console.log("Latin square: " + row);
    return row; 
}

},{"latin-square":1}]},{},[2]);
