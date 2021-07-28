countries = {bd: 'Bangladesh',be: 'Belgium',bf: 'Burkina Faso',bg: 'Bulgaria',ba: 'Bosnia and Herzegovina',bb: 'Barbados',wf: 'Wallis and Futuna',bl: 'Saint Barthelemy',bm: 'Bermuda',bn: 'Brunei',bo: 'Bolivia',bh: 'Bahrain',bi: 'Burundi',bj: 'Benin',bt: 'Bhutan',jm: 'Jamaica',bv: 'Bouvet Island',bw: 'Botswana',ws: 'Samoa',bq: 'Bonaire, Saint Eustatius and Saba ',br: 'Brazil',bs: 'Bahamas',je: 'Jersey',by: 'Belarus',bz: 'Belize',ru: 'Russia',rw: 'Rwanda',rs: 'Serbia',tl: 'East Timor',re: 'Reunion',tm: 'Turkmenistan',tj: 'Tajikistan',ro: 'Romania',tk: 'Tokelau',gw: 'Guinea-Bissau',gu: 'Guam',gt: 'Guatemala',gs: 'South Georgia and the South Sandwich Islands',gr: 'Greece',gq: 'Equatorial Guinea',gp: 'Guadeloupe',jp: 'Japan',gy: 'Guyana',gg: 'Guernsey',gf: 'French Guiana',ge: 'Georgia',gd: 'Grenada',gb: 'United Kingdom',ga: 'Gabon',sv: 'El Salvador',gn: 'Guinea',gm: 'Gambia',gl: 'Greenland',gi: 'Gibraltar',gh: 'Ghana',om: 'Oman',tn: 'Tunisia',jo: 'Jordan',hr: 'Croatia',ht: 'Haiti',hu: 'Hungary',hk: 'Hong Kong',hn: 'Honduras',hm: 'Heard Island and McDonald Islands',ve: 'Venezuela',pr: 'Puerto Rico',ps: 'Palestinian Territory',pw: 'Palau',pt: 'Portugal',sj: 'Svalbard and Jan Mayen',py: 'Paraguay',iq: 'Iraq',pa: 'Panama',pf: 'French Polynesia',pg: 'Papua New Guinea',pe: 'Peru',pk: 'Pakistan',ph: 'Philippines',pn: 'Pitcairn',pl: 'Poland',pm: 'Saint Pierre and Miquelon',zm: 'Zambia',eh: 'Western Sahara',ee: 'Estonia',eg: 'Egypt',za: 'South Africa',ec: 'Ecuador',it: 'Italy',vn: 'Vietnam',sb: 'Solomon Islands',et: 'Ethiopia',so: 'Somalia',zw: 'Zimbabwe',sa: 'Saudi Arabia',es: 'Spain',er: 'Eritrea',me: 'Montenegro',md: 'Moldova',mg: 'Madagascar',mf: 'Saint Martin',ma: 'Morocco',mc: 'Monaco',uz: 'Uzbekistan',mm: 'Myanmar',ml: 'Mali',mo: 'Macao',mn: 'Mongolia',mh: 'Marshall Islands',mk: 'Macedonia',mu: 'Mauritius',mt: 'Malta',mw: 'Malawi',mv: 'Maldives',mq: 'Martinique',mp: 'Northern Mariana Islands',ms: 'Montserrat',mr: 'Mauritania',im: 'Isle of Man',ug: 'Uganda',tz: 'Tanzania',my: 'Malaysia',mx: 'Mexico',il: 'Israel',fr: 'France',io: 'British Indian Ocean Territory',sh: 'Saint Helena',fi: 'Finland',fj: 'Fiji',fk: 'Falkland Islands',fm: 'Micronesia',fo: 'Faroe Islands',ni: 'Nicaragua',nl: 'Netherlands',no: 'Norway',na: 'Namibia',vu: 'Vanuatu',nc: 'New Caledonia',ne: 'Niger',nf: 'Norfolk Island',ng: 'Nigeria',nz: 'New Zealand',np: 'Nepal',nr: 'Nauru',nu: 'Niue',ck: 'Cook Islands',xk: 'Kosovo',ci: 'Ivory Coast',ch: 'Switzerland',co: 'Colombia',cn: 'China',cm: 'Cameroon',cl: 'Chile',cc: 'Cocos Islands',ca: 'Canada',cg: 'Republic of the Congo',cf: 'Central African Republic',cd: 'Democratic Republic of the Congo',cz: 'Czech Republic',cy: 'Cyprus',cx: 'Christmas Island',cr: 'Costa Rica',cw: 'Curacao',cv: 'Cape Verde',cu: 'Cuba',sz: 'Swaziland',sy: 'Syria',sx: 'Sint Maarten',kg: 'Kyrgyzstan',ke: 'Kenya',ss: 'South Sudan',sr: 'Suriname',ki: 'Kiribati',kh: 'Cambodia',kn: 'Saint Kitts and Nevis',km: 'Comoros',st: 'Sao Tome and Principe',sk: 'Slovakia',kr: 'South Korea',si: 'Slovenia',kp: 'North Korea',kw: 'Kuwait',sn: 'Senegal',sm: 'San Marino',sl: 'Sierra Leone',sc: 'Seychelles',kz: 'Kazakhstan',ky: 'Cayman Islands',sg: 'Singapore',se: 'Sweden',sd: 'Sudan',do: 'Dominican Republic',dm: 'Dominica',dj: 'Djibouti',dk: 'Denmark',vg: 'British Virgin Islands',de: 'Germany',ye: 'Yemen',dz: 'Algeria',us: 'United States',uy: 'Uruguay',yt: 'Mayotte',um: 'United States Minor Outlying Islands',lb: 'Lebanon',lc: 'Saint Lucia',la: 'Laos',tv: 'Tuvalu',tw: 'Taiwan',tt: 'Trinidad and Tobago',tr: 'Turkey',lk: 'Sri Lanka',li: 'Liechtenstein',lv: 'Latvia',to: 'Tonga',lt: 'Lithuania',lu: 'Luxembourg',lr: 'Liberia',ls: 'Lesotho',th: 'Thailand',tf: 'French Southern Territories',tg: 'Togo',td: 'Chad',tc: 'Turks and Caicos Islands',ly: 'Libya',va: 'Vatican',vc: 'Saint Vincent and the Grenadines',ae: 'United Arab Emirates',ad: 'Andorra',ag: 'Antigua and Barbuda',af: 'Afghanistan',ai: 'Anguilla',vi: 'U.S. Virgin Islands',is: 'Iceland',ir: 'Iran',am: 'Armenia',al: 'Albania',ao: 'Angola',aq: 'Antarctica',as: 'American Samoa',ar: 'Argentina',au: 'Australia',at: 'Austria',aw: 'Aruba',in: 'India',ax: 'Aland Islands',az: 'Azerbaijan',ie: 'Ireland',id: 'Indonesia',ua: 'Ukraine',qa: 'Qatar',mz: 'Mozambique'}

function setFavicons(favImg){
	let headTitle = document.querySelector('head');
	let setFavicon = document.createElement('link');
	setFavicon.setAttribute('rel','shortcut icon');
	setFavicon.setAttribute('href',favImg);
	headTitle.appendChild(setFavicon);
}

function generateData() {
	$.ajax({
		url: 'https://randomuser.me/api/',
		dataType: 'json',
		success: function(data) {
			data = data.results[0];
			document.getElementById("profile").src = data.picture.large;
			document.getElementById("name").innerText = data.name.title + " " + data.name.first + " " + data.name.last;
			document.getElementById("ageGender").innerText = "Age: " + data.dob.age + ", " + data.gender;
			document.getElementById("nation").innerText = "("+ data.nat +") " + countries[data.nat.toLowerCase()];
			document.getElementById("latLong").innerText = "Lat: " + data.location.coordinates.latitude + ", Long: " + data.location.coordinates.longitude;
			document.getElementById("email").innerText = data.email;
			document.getElementById("phone").innerText = data.phone;
			document.getElementById("cell").innerText = data.cell;
			document.getElementById("dob").innerText = data.dob.date;
			setFavicons(data.picture.large);
		}
	});
}

document.getElementById("genBtn").addEventListener("click", generateData)

generateData();