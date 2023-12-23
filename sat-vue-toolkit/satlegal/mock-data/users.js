const users = [
  {
    id: 1801,
    firstName: "John",
    lastName: "Doe"
  },
  {
    id: 1802,
    firstName: "Smith",
    lastName: "Land"
  },
  {
    id: 1803,
    firstName: "Jang",
    lastName: "Ho"
  },
  {
    id: 1804,
    firstName: "Tony",
    lastName: "Steve"
  }
];
const userPremissionAdmin = {
  id: 1,
  name: "Super Admin",
  companyName: "Teameyo",
  companyTitle: "Teameyo - Let's manage together",
  titleLogin: "Hello and welcome, <br/> Please login",
  copyrights: "Copyright © 2016 by HT Active. All Rights Reserved.",
  email: "no-reply@teameyo.com",
  currency: {
    id: 1,
    name: "USD($)"
  },
  timeZone: { id: 1, name: "GMT-12:00 Etc/GMT-12" },
  logoStandard: "http://319.com.vn/UserFiles/Image/new%20ta/5.jpg",
  logoFavicon: "http://winsoft.vn/favicon.ico",
  logoMobile: "http://319.com.vn/UserFiles/Image/new%20ta/5.jpg",
  logoLogin: "http://319.com.vn/UserFiles/Image/new%20ta/5.jpg"
};
const dataCurrency = [
  {
    id: 1,
    name: "VND"
  },
  {
    id: 2,
    name: "USD($)"
  }
];
const dataTimezone = [
  { id: 1, name: "GMT-12:00 Etc/GMT-12" },
  { id: 2, name: "GMT-11:00 Etc/GMT-11" },
  { id: 3, name: "GMT-11:00 Pacific/Midway" },
  { id: 4, name: "GMT-10:00 America/Adak" },
  { id: 5, name: "GMT-09:00 America/Anchorage" },
  { id: 6, name: "GMT-09:00 Pacific/Gambier" },
  { id: 7, name: "GMT-08:00 America/Dawson_Creek" },
  { id: 8, name: "GMT-08:00 America/Ensenada" },
  { id: 9, name: "GMT-08:00 America/Los_Angeles" },
  { id: 10, name: "GMT-07:00 America/Chihuahua" },
  { id: 11, name: "GMT-07:00 America/Denver" },
  { id: 12, name: "GMT-06:00 America/Belize" },
  { id: 13, name: "GMT-06:00 America/Cancun" },
  { id: 14, name: "GMT-06:00 America/Chicago" },
  { id: 15, name: "GMT-06:00 Chile/EasterIsland" },
  { id: 16, name: "GMT-05:00 America/Bogota" },
  { id: 17, name: "GMT-05:00 America/Havana" },
  { id: 18, name: "GMT-05:00 America/New_York" },
  { id: 19, name: "GMT-04:30 America/Caracas" },
  { id: 20, name: "GMT-04:00 America/Campo_Grande" },
  { id: 21, name: "GMT-04:00 America/Glace_Bay" },
  { id: 22, name: "GMT-04:00 America/Goose_Bay" },
  { id: 23, name: "GMT-04:00 America/Santiago" },
  { id: 24, name: "GMT-04:00 America/La_Paz" },
  { id: 25, name: "GMT-03:00 America/Argentina/Buenos_Aires" },
  { id: 26, name: "GMT-03:00 America/Montevideo" },
  { id: 27, name: "GMT-03:00 America/Araguaina" },
  { id: 28, name: "GMT-03:00 America/Godthab" },
  { id: 29, name: "GMT-03:00 America/Miquelon" },
  { id: 30, name: "GMT-03:00 America/Sao_Paulo" },
  { id: 31, name: "GMT-03:30 America/St_Johns" },
  { id: 32, name: "GMT-02:00 America/Noronha" },
  { id: 33, name: "GMT-01:00 Atlantic/Cape_Verde" },
  { id: 34, name: "GMT Europe/Belfast" },
  { id: 35, name: "GMT Africa/Abidjan" },
  { id: 36, name: "GMT Europe/Dublin" },
  { id: 37, name: "GMT Europe/Lisbon" },
  { id: 38, name: "GMT Europe/London" },
  { id: 39, name: "UTC UTC" },
  { id: 40, name: "GMT+01:00 Africa/Algiers" },
  { id: 41, name: "GMT+01:00 Africa/Windhoek" },
  { id: 42, name: "GMT+01:00 Atlantic/Azores" },
  { id: 43, name: "GMT+01:00 Atlantic/Stanley" },
  { id: 44, name: "GMT+01:00 Europe/Amsterdam" },
  { id: 45, name: "GMT+01:00 Europe/Belgrade" },
  { id: 46, name: "GMT+01:00 Europe/Brussels" },
  { id: 47, name: "GMT+02:00 Africa/Cairo" },
  { id: 48, name: "GMT+02:00 Africa/Blantyre" },
  { id: 49, name: "GMT+02:00 Asia/Beirut" },
  { id: 50, name: "GMT+02:00 Asia/Damascus" },
  { id: 51, name: "GMT+02:00 Asia/Gaza" },
  { id: 52, name: "GMT+02:00 Asia/Jerusalem" },
  { id: 53, name: "GMT+03:00 Africa/Addis_Ababa" },
  { id: 54, name: "GMT+03:00 Asia/Riyadh89" },
  { id: 55, name: "GMT+03:00 Europe/Minsk" },
  { id: 56, name: "GMT+03:30 Asia/Tehran" },
  { id: 57, name: "GMT+04:00 Asia/Dubai" },
  { id: 58, name: "GMT+04:00 Asia/Yerevan" },
  { id: 59, name: "GMT+04:00 Europe/Moscow" },
  { id: 60, name: "GMT+04:30 Asia/Kabul" },
  { id: 61, name: "GMT+05:00 Asia/Tashkent" },
  { id: 62, name: "GMT+05:30 Asia/Kolkata" },
  { id: 63, name: "GMT+05:45 Asia/Katmandu" },
  { id: 64, name: "GMT+06:00 Asia/Dhaka" },
  { id: 65, name: "GMT+06:00 Asia/Yekaterinburg" },
  { id: 66, name: "GMT+06:30 Asia/Rangoon" },
  { id: 67, name: "GMT+07:00 Asia/Bangkok" },
  { id: 68, name: "GMT+07:00 Asia/Novosibirsk" },
  { id: 69, name: "GMT+08:00 Etc/GMT+8" },
  { id: 70, name: "GMT+08:00 Asia/Hong_Kong" },
  { id: 71, name: "GMT+08:00 Asia/Krasnoyarsk" },
  { id: 72, name: "GMT+08:00 Australia/Perth" },
  { id: 73, name: "GMT+08:45 Australia/Eucla" },
  { id: 74, name: "GMT+09:00 Asia/Irkutsk" },
  { id: 75, name: "GMT+09:00 Asia/Seoul" },
  { id: 76, name: "GMT+09:00 Asia/Tokyo" },
  { id: 77, name: "GMT+09:30 Australia/Adelaide" },
  { id: 78, name: "GMT+09:30 Australia/Darwin" },
  { id: 79, name: "GMT+09:30 Pacific/Marquesas" },
  { id: 80, name: "GMT+10:00 Etc/GMT+10" },
  { id: 81, name: "GMT+10:00 Australia/Brisbane" },
  { id: 82, name: "GMT+10:00 Australia/Hobart" },
  { id: 83, name: "GMT+10:00 Asia/Yakutsk" },
  { id: 84, name: "GMT+10:30 Australia/Lord_Howe" },
  { id: 85, name: "GMT+11:00 Asia/Vladivostok" },
  { id: 86, name: "GMT+11:30 Pacific/Norfolk" },
  { id: 87, name: "GMT+12:00 Etc/GMT+12" },
  { id: 88, name: "GMT+12:00 Asia/Anadyr" },
  { id: 89, name: "GMT+12:00 Asia/Magadan" },
  { id: 90, name: "GMT+12:00 Pacific/Auckland" },
  { id: 91, name: "GMT+12:45 Pacific/Chatham" },
  { id: 92, name: "GMT+13:00 Pacific/Tongatapu" },
  { id: 93, name: "GMT+14:00 Pacific/Kiritimati" }
];
const userProject = [
  {
    id: 1801,
    fullName: " John Doe"
  },
  {
    id: 1802,
    fullName: " Smith Land"
  },
  {
    id: 1803,
    fullName: " Jang Ho"
  }
];
const avatars = [
  {
    id: 1,
    imageUrl:
      "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
  }
];
const jobs = [
  {
    id: 1,
    title: "Developer"
  },
  {
    id: 2,
    title: "Manager"
  },
  {
    id: 3,
    title: "Designer"
  },
  {
    id: 4,
    title: "Human Resource"
  }
];

const userList = [
  {
    id: 1,
    user: "Jim Irsay",
    avatar:
      "https://previews.123rf.com/images/yupiramos/yupiramos1609/yupiramos160912741/62358463-avatar-man-smiling-cartoon-with-beard-male-person-user-vector-illustration.jpg",
    role: "Seller"
  },
  {
    id: 2,
    user: "David Decker",
    role: "Buyer",
    avatar:
      "https://www.mobelti.com.tr/wp-content/uploads/2017/11/man-avatar.png"
  },
  {
    id: 3,
    user: "Billy Silo",
    role: "Investors",
    avatar:
      "https://www.shareicon.net/data/2016/06/25/786547_people_512x512.png"
  },
  {
    id: 4,
    user: "Jim Smith",
    role: "Investors",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3CgTTxDBkArxvYT_Bta7VsQNDWu2ZXtIQCqFWWJZrQsn05flF"
  },
  {
    id: 5,
    user: "Tess Tucker",
    role: "Board Member",
    avatar:
      "https://openclipart.org/image/2400px/svg_to_png/261881/Cartoon-Man-Avatar-2.png"
  },
  {
    id: 6,
    user: "Jeffrey Cantrell",
    role: "Buyer",
    avatar: "https://icons-for-free.com/free-icons/png/512/2694137.png"
  }
];
const userAdmin = {
  totals: 100,
  list: [
    {
      id: 1,
      fullName: "Jim Irsay",
      avatar:
        "https://previews.123rf.com/images/yupiramos/yupiramos1609/yupiramos160912741/62358463-avatar-man-smiling-cartoon-with-beard-male-person-user-vector-illustration.jpg",
      role: "Administrator",
      email: "admin@gmail.com",
      password: "Abc123456"
    },
    {
      id: 2,
      fullName: "Jim Irsay",
      avatar:
        "https://previews.123rf.com/images/yupiramos/yupiramos1609/yupiramos160912741/62358463-avatar-man-smiling-cartoon-with-beard-male-person-user-vector-illustration.jpg",
      role: "Administrator",
      email: "admin@gmail.com",
      password: "Abc123456"
    },
    {
      id: 3,
      fullName: "Jim Irsay",
      avatar:
        "https://previews.123rf.com/images/yupiramos/yupiramos1609/yupiramos160912741/62358463-avatar-man-smiling-cartoon-with-beard-male-person-user-vector-illustration.jpg",
      role: "Administrator",
      email: "admin@gmail.com",
      password: "Abc123456"
    },
    {
      id: 4,
      fullName: "Jim Irsay",
      avatar:
        "https://previews.123rf.com/images/yupiramos/yupiramos1609/yupiramos160912741/62358463-avatar-man-smiling-cartoon-with-beard-male-person-user-vector-illustration.jpg",
      role: "Administrator",
      email: "admin@gmail.com",
      password: "Abc123456"
    },
    {
      id: 5,
      fullName: "Jim Irsay",
      avatar:
        "https://previews.123rf.com/images/yupiramos/yupiramos1609/yupiramos160912741/62358463-avatar-man-smiling-cartoon-with-beard-male-person-user-vector-illustration.jpg",
      role: "Administrator",
      email: "admin@gmail.com",
      password: "Abc123456"
    },
    {
      id: 6,
      fullName: "Jim Irsay",
      avatar:
        "https://previews.123rf.com/images/yupiramos/yupiramos1609/yupiramos160912741/62358463-avatar-man-smiling-cartoon-with-beard-male-person-user-vector-illustration.jpg",
      role: "Administrator",
      email: "admin@gmail.com",
      password: "Abc123456"
    }
  ]
};
const roleUser = [
  {
    id: 1,
    text: "Administrator"
  },
  {
    id: 2,
    text: "Sale"
  },
  {
    id: 1,
    text: "Reception"
  }
];
users.forEach(x => {
  if (x.id % 2) {
    x.avatar = avatars[0];
  }
  x.job = jobs[x.id % jobs.length];
});

export default {
  users,
  userProject,
  userList,
  userAdmin,
  roleUser,
  userPremissionAdmin,
  dataCurrency,
  dataTimezone
};
