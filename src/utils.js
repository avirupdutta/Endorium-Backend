const jwt = require("jsonwebtoken");

const fieldsToRemove = ["password", "__v"];
const getFilteredItem = item => {
	const itemKeys = Object.keys(item._doc);
	let newObj = {};
	itemKeys.forEach(key => {
		if (!fieldsToRemove.includes(key)) {
			newObj[key] = item[key];
		}
	});
	return newObj;
};

const generateToken = item => {
	const user = {
		id: item.id,
		name: item.name,
		email: item.email,
		is_admin: item.is_admin,
		current_room: item.current_room
	};
	return new Promise((resolve, reject) => {
		jwt.sign(
			user,
			process.env.SECRET_KEY,
			{ expiresIn: "30 days" },
			(err, newToken) => {
				if (newToken) {
					resolve(newToken);
				}
				if (err) {
					reject(err);
				}
			}
		);
	});
};

module.exports = {
	getFilteredItem,
	generateToken
};
