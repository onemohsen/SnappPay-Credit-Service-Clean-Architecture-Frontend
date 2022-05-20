export default function useHelpers () {
	const convertErrorToString = (errors) => {
		if (!errors) return '';
		const err = Object.values(errors);
		let errResult = '';
		err.forEach((item, key) => {
			item.forEach((item2) => {
				if (key === err.length - 1) {
					errResult += item2;
				} else {
					errResult += item2 + ', ';
				}
			});
		});
		return errResult;
	};

	const getSubDaysDate = (subDay) => {
		const date = new Date();
		date.setDate(date.getDate() - subDay);
		return date.toISOString().slice(0, 10); // to format Y-m-d ex:2021-10-10
	};

	const convertNumber = (value, type = 'e2p') => {
		switch (type) {
		case 'e2p':
			return value.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
		case 'e2a':
			return value.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
		case 'p2e':
			return value.toString().replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
		case 'a2e':
			return value.toString().replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
		case 'p2a':
			return value.toString().replace(/[۰-۹]/g, d => '٠١٢٣٤٥٦٧٨٩'['۰۱۲۳۴۵۶۷۸۹'.indexOf(d)]);
		case 'a2p':
			return value.toString().replace(/[٠-٩]/g, d => '۰۱۲۳۴۵۶۷۸۹'['٠١٢٣٤٥٦٧٨٩'.indexOf(d)]);
		default:
			return value.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
		}
	};

	const getMinWidthStandardTailwind = (sizeClass) => {
		switch (sizeClass) {
		case 'sm':
			return 640;
		case 'md' :
			return 768;
		case 'lg' :
			return 1024;
		case 'xl' :
			return 1280;
		case '2xl' :
			return 1536;
		default:
			return undefined;
		}
	};

	const convertToEnglishDigits = (str) => {
		str = str.toString();

		// str = str.replace(/\D/ | /[۰-۹]/ | /[٠-٩]/, '');
		let e = '۰'.charCodeAt(0);
		str = str.replace(/[۰-۹]/g, function (t) {
			return t.charCodeAt(0) - e;
		});

		// convert arabic indic digits [٠١٢٣٤٥٦٧٨٩]
		e = '٠'.charCodeAt(0);
		str = str.replace(/[٠-٩]/g, function (t) {
			return t.charCodeAt(0) - e;
		});

		const convertNumber = str.replace(/\D/g, ''); // Remove Char - Keep only number

		return convertNumber;
	};

	return {
		convertErrorToString,
		getSubDaysDate,
		getMinWidthStandardTailwind,
		convertNumber,
		convertToEnglishDigits,
	};
}
