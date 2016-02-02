'use strict';

module.exports = {
	bind : (obj, methods) => {
		methods.forEach( (method) => obj[method] = obj[method].bind(obj));
	}
};
