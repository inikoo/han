function sites() {
	if (__DEV__) {
		return {
			API: "http://wowsbar.test/"
		};
	} else {
		return {
            API: "http://wowsbar.test/"
		};
	}
}

export default {
	HAN: sites()
};