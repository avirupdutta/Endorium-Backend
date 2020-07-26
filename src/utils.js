const fieldsToRemove = ["password", "__v"];

const getFilteredItem = item => {
	const itemKeys = Object.keys(item._doc);
	let newObj = {};
	itemKeys.forEach(key => {
		if (!fieldsToRemove.includes(key)) {
			newObj[key] = item[key];
		}
	});
	console.log(newObj);
	return newObj;
};

module.exports = {
	getFilteredItem
};
