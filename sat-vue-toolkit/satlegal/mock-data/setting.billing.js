export const currentPlan = {
  settingPlan: {
    id: 1,
    price: "$250 per year",
    purchased: 100,
    assigned: 100,
    date: "2019-02-17T17:10:10.000Z"
  },
  settingTotal: {
    id: 1,
    price: "$250/yearly",
    paymentMethod: "Card ending in 9050",
    renewOn: "2019-02-17T17:10:10.000Z"
  }
};
export const availablePlans = [
  {
    packageName: "Starter",
    price: 99.09,
    unit: "MON",
    features: [
      {
        value: "Community",
        text: "support"
      },
      {
        value: "400+",
        text: "pages"
      },
      {
        value: "100+",
        text: "header variations"
      },
      {
        value: "20+",
        text: "home page options"
      }
    ]
  },
  {
    packageName: "Profesional",
    price: 199.99,
    unit: "MON",
    features: [
      {
        value: "Company",
        text: "support"
      },
      {
        value: "600+",
        text: "pages"
      },
      {
        value: "200+",
        text: "header variations"
      },
      {
        value: "30+",
        text: "home page options"
      }
    ],
    active: true
  },
  {
    packageName: "Enterprise",
    price: 1299.99,
    unit: "MON",
    features: [
      {
        value: "Onsite technical",
        text: "support"
      },
      {
        value: "800+",
        text: "pages"
      },
      {
        value: "300+",
        text: "header variations"
      },
      {
        value: "100+",
        text: "home page options"
      },
      {
        value: "Commercial",
        text: "license"
      }
    ]
  },
  {
    packageName: "Starter",
    price: 999.09,
    unit: "YEAR",
    features: [
      {
        value: "Community",
        text: "support"
      },
      {
        value: "400+",
        text: "pages"
      },
      {
        value: "100+",
        text: "header variations"
      },
      {
        value: "20+",
        text: "home page options"
      }
    ]
  },
  {
    packageName: "Profesional",
    price: 1999.99,
    unit: "YEAR",
    features: [
      {
        value: "Company",
        text: "support"
      },
      {
        value: "600+",
        text: "pages"
      },
      {
        value: "200+",
        text: "header variations"
      },
      {
        value: "30+",
        text: "home page options"
      }
    ],
    active: true
  },
  {
    packageName: "Enterprise",
    price: 2899.99,
    unit: "YEAR",
    features: [
      {
        value: "Onsite technical",
        text: "support"
      },
      {
        value: "800+",
        text: "pages"
      },
      {
        value: "300+",
        text: "header variations"
      },
      {
        value: "100+",
        text: "home page options"
      },
      {
        value: "Commercial",
        text: "license"
      }
    ]
  }
];

export const dataBilling = {
  id: 18996,
  user: {
    name: "Heather Wright",
    imageUrl:
      "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
  },
  package: "Free",
  plan: "plan, unlimited public repositories",
  CreditOrDebitCards: [
    {
      id: 1,
      numberCard: "x-1023",
      type: "Visa",
      expires: "11/2018"
    },
    {
      id: 2,
      numberCard: "x-3165",
      type: "Skrill",
      expires: "09/2017"
    },
    {
      id: 3,
      numberCard: "x-8723",
      type: "Paypal",
      expires: "11/2018"
    },
    {
      id: 4,
      numberCard: "x-4265",
      type: "Master",
      expires: "09/2019"
    }
  ],
  OtherInformation: "27.00",
  yourBalance:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  paymentHistory: [
    {
      id: 1,
      duedate: "2019-03-12T02:53:08.438Z",
      tag: "10015",
      nameCard: "Visa ending in 2035",
      totalCurrency: "49.00",
      isActive: true
    },
    {
      id: 2,
      duedate: "2019-05-12T02:53:08.438Z",
      tag: "10015",
      nameCard: "Visa ending in 2035",
      totalCurrency: "36.00",
      isActive: false
    },
    {
      id: 3,
      duedate: "2019-01-12T02:53:08.438Z",
      tag: "10015",
      nameCard: "Visa ending in 2035",
      totalCurrency: "100.00",
      isActive: true
    },
    {
      id: 4,
      duedate: "2019-04-12T02:53:08.438Z",
      tag: "10015",
      nameCard: "Visa ending in 2035",
      totalCurrency: "99.00",
      isActive: true
    }
  ],
  dataCreditCard: [
    {
      id: 1,
      name: "Natalie Curtis",
      addressPayment: "Billing address Brian Robson",
      address:
        "77408 Satterfield Motorway Suite 469 New Antonetta, BC K3L6P6 New York, NY, 09122-9122 United States",
      bank: "Bank of America",
      imageUrl: "https://dacosofa.com/images/V-1.png",
      nameCard: "Visa card ending in 9909",
      type: true,
      expires: "11/2018",
      isExpires: true
    },
    {
      id: 2,
      name: "Natalie Curtis",
      addressPayment: "Billing address Brian Robson",
      address:
        "9455 NE ALDERWOOD RDC/O UZW-FH PORTLAND OREGON 97252 PORTLAND, OR, 97252-1777 United States",
      bank: "Payoneer",
      imageUrl:
        "https://content.heropay.com/wp-content/uploads/2016/11/MasterCard_Logo.png",
      nameCard: "Master card ending in 1421",
      type: false,
      expires: "11/2019",
      isExpires: true
    },
    {
      id: 3,
      name: "Natalie Curtis",
      addressPayment: "Billing address Brian Robson",
      address:
        "63703 Greenfelder Center Suite 767 South Jennings, QC Y4E-1K9 United States",
      bank: "Discover Network",
      imageUrl:
        "http://comhssl.net/casa/images/Discover-logo-e1416429693676.jpg",
      nameCard: "Disover card ending in 4283",
      type: false,
      expires: "05/2018",
      isExpires: false
    }
  ]
};

export const listCurrency = [
  { cc: "AED", symbol: "\u062f.\u0625;", name: "UAE - Dirham" },
  { cc: "AFN", symbol: "Afs", name: "Afghan - Afghani" },
  { cc: "ALL", symbol: "L", name: "Albanian - Lek" },
  { cc: "AMD", symbol: "AMD", name: "Armenian - Dram" },
  {
    cc: "ANG",
    symbol: "NA\u0192",
    name: "Netherlands Antillean - Gulden"
  },
  { cc: "AOA", symbol: "Kz", name: "Angolan - Kwanza" },
  { cc: "ARS", symbol: "$", name: "Argentine - Peso" },
  { cc: "AUD", symbol: "$", name: "Australian - Dollar" },
  { cc: "AWG", symbol: "\u0192", name: "Aruban - Florin" },
  { cc: "AZN", symbol: "AZN", name: "Azerbaijani - Manat" },
  {
    cc: "BAM",
    symbol: "KM",
    name: "Bosnia and Herzegovina konvertibilna - Marka"
  },
  { cc: "BBD", symbol: "Bds$", name: "Barbadian - Dollar" },
  { cc: "BDT", symbol: "\u09f3", name: "Bangladeshi - Taka" },
  { cc: "BGN", symbol: "BGN", name: "Bulgarian - Lev" },
  {
    cc: "BHD",
    symbol: ".\u062f.\u0628",
    name: "Bahraini - Dinar"
  },
  { cc: "BIF", symbol: "FBu", name: "Burundi - Franc" },
  { cc: "BMD", symbol: "BD$", name: "Bermudian - Dollar" },
  { cc: "BND", symbol: "B$", name: "Brunei - Dollar" },
  { cc: "BOB", symbol: "Bs.", name: "Bolivian - Boliviano" },
  { cc: "BRL", symbol: "R$", name: "Brazilian - Real" },
  { cc: "BSD", symbol: "B$", name: "Bahamian - Dollar" },
  { cc: "BTN", symbol: "Nu.", name: "Bhutanese - Ngultrum" },
  { cc: "BWP", symbol: "P", name: "Botswana - Pula" },
  { cc: "BYR", symbol: "Br", name: "Belarusian - Ruble" },
  { cc: "BZD", symbol: "BZ$", name: "Belize - Dollar" },
  { cc: "CAD", symbol: "$", name: "Canadian - Dollar" },
  { cc: "CDF", symbol: "F", name: "Congolese - Franc" },
  { cc: "CHF", symbol: "Fr.", name: "Swiss - Franc" },
  { cc: "CLP", symbol: "$", name: "Chilean - Peso" },
  {
    cc: "CNY",
    symbol: "\u00a5",
    name: "Chinese/Yuan - Renminbi"
  },
  { cc: "COP", symbol: "Col$", name: "Colombian - Peso" },
  { cc: "CRC", symbol: "\u20a1", name: "Costa Rican - Colon" },
  { cc: "CUC", symbol: "$", name: "Cuban - Peso" },
  { cc: "CVE", symbol: "Esc", name: "Cape Verdean - Escudo" },
  { cc: "CZK", symbol: "K\u010d", name: "Czech - Koruna" },
  { cc: "DJF", symbol: "Fdj", name: "Djiboutian - Franc" },
  { cc: "DKK", symbol: "Kr", name: "Danish - Krone" },
  { cc: "DOP", symbol: "RD$", name: "Dominican - Peso" },
  {
    cc: "DZD",
    symbol: "\u062f.\u062c",
    name: "Algerian - Dinar"
  },
  { cc: "EEK", symbol: "KR", name: "Estonian - Kroon" },
  { cc: "EGP", symbol: "\u00a3", name: "Egyptian - Pound" },
  { cc: "ERN", symbol: "Nfa", name: "Eritrean - Nakfa" },
  { cc: "ETB", symbol: "Br", name: "Ethiopian - Birr" },
  { cc: "EUR", symbol: "\u20ac", name: "European - Euro" },
  { cc: "FJD", symbol: "FJ$", name: "Fijian - Dollar" },
  {
    cc: "FKP",
    symbol: "\u00a3",
    name: "Falkland Islands - Kound"
  },
  { cc: "GBP", symbol: "\u00a3", name: "British - Pound" },
  { cc: "GEL", symbol: "GEL", name: "Georgian - Lari" },
  { cc: "GHS", symbol: "GH\u20b5", name: "Ghanaian - Cedi" },
  { cc: "GIP", symbol: "\u00a3", name: "Gibraltar - Pound" },
  { cc: "GMD", symbol: "D", name: "Gambian - Dalasi" },
  { cc: "GNF", symbol: "FG", name: "Guinean - Franc" },
  {
    cc: "GQE",
    symbol: "CFA",
    name: "Central African CFA - Franc"
  },
  { cc: "GTQ", symbol: "Q", name: "Guatemalan - Quetzal" },
  { cc: "GYD", symbol: "GY$", name: "Guyanese - Dollar" },
  { cc: "HKD", symbol: "HK$", name: "Hong Kong - Dollar" },
  { cc: "HNL", symbol: "L", name: "Honduran - Lempira" },
  { cc: "HRK", symbol: "kn", name: "Croatian - Kuna" },
  { cc: "HTG", symbol: "G", name: "Haitian - Gourde" },
  { cc: "HUF", symbol: "Ft", name: "Hungarian - Forint" },
  { cc: "IDR", symbol: "Rp", name: "Indonesian - Rupiah" },
  { cc: "ILS", symbol: "\u20aa", name: "Israeli - Sheqel" },
  { cc: "INR", symbol: "\u20B9", name: "Indian - Rupee" },
  { cc: "IQD", symbol: "\u062f.\u0639", name: "Iraqi- Dinar" },
  { cc: "IRR", symbol: "IRR", name: "Iranian - Rial" },
  { cc: "ISK", symbol: "kr", name: "Icelandic - Kr\u00f3na" },
  { cc: "JMD", symbol: "J$", name: "Jamaican - Dollar" },
  { cc: "JOD", symbol: "JOD", name: "Jordanian - Dinar" },
  { cc: "JPY", symbol: "\u00a5", name: "Japanese - Yen" },
  { cc: "KES", symbol: "KSh", name: "Kenyan - Shilling" },
  {
    cc: "KGS",
    symbol: "\u0441\u043e\u043c",
    name: "Kyrgyzstani - Som"
  },
  { cc: "KHR", symbol: "\u17db", name: "Cambodian - Riel" },
  { cc: "KMF", symbol: "KMF", name: "Comorian - Franc" },
  { cc: "KPW", symbol: "W", name: "North Korean - Won" },
  { cc: "KRW", symbol: "W", name: "South Korean wWonon" },
  { cc: "KWD", symbol: "KWD", name: "Kuwaiti - Dinar" },
  { cc: "KYD", symbol: "KY$", name: "Cayman Islands - Dollar" },
  { cc: "KZT", symbol: "T", name: "Kazakhstani - Tenge" },
  { cc: "LAK", symbol: "KN", name: "Lao - Kip" },
  { cc: "LBP", symbol: "\u00a3", name: "Lebanese - Lira" },
  { cc: "LKR", symbol: "Rs", name: "Sri Lankan - Rupee" },
  { cc: "LRD", symbol: "L$", name: "Liberian - Dollar" },
  { cc: "LSL", symbol: "M", name: "Lesotho - Loti" },
  { cc: "LTL", symbol: "Lt", name: "Lithuanian - Litas" },
  { cc: "LVL", symbol: "Ls", name: "Latvian - Lats" },
  { cc: "LYD", symbol: "LD", name: "Libyan - Dinar" },
  { cc: "MAD", symbol: "MAD", name: "Moroccan - Dirham" },
  { cc: "MDL", symbol: "MDL", name: "Moldovan - Leu" },
  { cc: "MGA", symbol: "FMG", name: "Malagasy - Ariary" },
  { cc: "MKD", symbol: "MKD", name: "Macedonian - Denar" },
  { cc: "MMK", symbol: "K", name: "Myanma - Kyat" },
  { cc: "MNT", symbol: "\u20ae", name: "Mongolian - Tugrik" },
  { cc: "MOP", symbol: "P", name: "Macanese - Pataca" },
  { cc: "MRO", symbol: "UM", name: "Mauritanian - Ouguiya" },
  { cc: "MUR", symbol: "Rs", name: "Mauritian - Rupee" },
  { cc: "MVR", symbol: "Rf", name: "Maldivian - Rufiyaa" },
  { cc: "MWK", symbol: "MK", name: "Malawian - Kwacha" },
  { cc: "MXN", symbol: "$", name: "Mexican - Peso" },
  { cc: "MYR", symbol: "RM", name: "Malaysian - Ringgit" },
  { cc: "MZM", symbol: "MTn", name: "Mozambican - Metical" },
  { cc: "NAD", symbol: "N$", name: "Namibian - Dollar" },
  { cc: "NGN", symbol: "\u20a6", name: "Nigerian - Naira" },
  { cc: "NIO", symbol: "C$", name: "Nicaraguan - c\u00f3rdoba" },
  { cc: "NOK", symbol: "kr", name: "Norwegian - Krone" },
  { cc: "NPR", symbol: "NRs", name: "Nepalese - Rupee" },
  { cc: "NZD", symbol: "NZ$", name: "New Zealand - Dollar" },
  { cc: "OMR", symbol: "OMR", name: "Omani - Rial" },
  { cc: "PAB", symbol: "B./", name: "Panamanian - Balboa" },
  { cc: "PEN", symbol: "S/.", name: "Peruvian nuevo - Sol" },
  { cc: "PGK", symbol: "K", name: "Papua New Guinean - Kina" },
  { cc: "PHP", symbol: "\u20b1", name: "Philippine - Peso" },
  { cc: "PKR", symbol: "Rs.", name: "Pakistani -Rupee" },
  { cc: "PLN", symbol: "z\u0142", name: "Polish - Zloty" },
  { cc: "PYG", symbol: "\u20b2", name: "Paraguayan - Guarani" },
  { cc: "QAR", symbol: "QR", name: "Qatari - Riyal" },
  { cc: "RON", symbol: "L", name: "Romanian - Leu" },
  { cc: "RSD", symbol: "din.", name: "Serbian - Dinar" },
  { cc: "RUB", symbol: "R", name: "Russian - Ruble" },
  { cc: "SAR", symbol: "SR", name: "Saudi - Riyal" },
  { cc: "SBD", symbol: "SI$", name: "Solomon Islands - Dollar" },
  { cc: "SCR", symbol: "SR", name: "Seychellois - Rupee" },
  { cc: "SDG", symbol: "SDG", name: "Sudanese - Pound" },
  { cc: "SEK", symbol: "kr", name: "Swedish - Krona" },
  { cc: "SGD", symbol: "S$", name: "Singapore - Dollar" },
  { cc: "SHP", symbol: "\u00a3", name: "Saint Helena - Pound" },
  { cc: "SLL", symbol: "Le", name: "Sierra Leonean - Leone" },
  { cc: "SOS", symbol: "Sh.", name: "Somali - Shilling" },
  { cc: "SRD", symbol: "$", name: "Surinamese - Dollar" },
  { cc: "SYP", symbol: "LS", name: "Syrian - Pound" },
  { cc: "SZL", symbol: "E", name: "Swazi - Lilangeni" },
  { cc: "THB", symbol: "\u0e3f", name: "Thai - Baht" },
  { cc: "TJS", symbol: "TJS", name: "Tajikistani - Somoni" },
  { cc: "TMT", symbol: "m", name: "Turkmen  - Manat" },
  { cc: "TND", symbol: "DT", name: "Tunisian - Dinar" },
  { cc: "TRY", symbol: "TRY", name: "Turkish new - Lira" },
  {
    cc: "TTD",
    symbol: "TT$",
    name: "Trinidad and Tobago - Dollar"
  },
  { cc: "TWD", symbol: "NT$", name: "New Taiwan - Dollar" },
  { cc: "TZS", symbol: "TZS", name: "Tanzanian - Shilling" },
  { cc: "UAH", symbol: "UAH", name: "Ukrainian - Hryvnia" },
  { cc: "UGX", symbol: "USh", name: "Ugandan - Shilling" },
  { cc: "USD", symbol: "US$", name: "United States  Dollar" },
  { cc: "UYU", symbol: "$U", name: "Uruguayan - Peso" },
  { cc: "UZS", symbol: "UZS", name: "Uzbekistani - Som" },
  { cc: "VEB", symbol: "Bs", name: "Venezuelan - Bolivar" },
  { cc: "VND", symbol: "\u20ab", name: "Vietnamese - Dong" },
  { cc: "VUV", symbol: "VT", name: "Vanuatu -atu" },
  { cc: "WST", symbol: "WS$", name: "Samoan - Rala" },
  {
    cc: "XAF",
    symbol: "CFA",
    name: "Central African CFA - Franc"
  },
  { cc: "XCD", symbol: "EC$", name: "East Caribbean - Dollar" },
  { cc: "XDR", symbol: "SDR", name: "Special Drawing - Rights" },
  { cc: "XOF", symbol: "CFA", name: "West African CFA - Franc" },
  { cc: "XPF", symbol: "F", name: "CFP - Franc" },
  { cc: "YER", symbol: "YER", name: "Yemeni - Rial" },
  { cc: "ZAR", symbol: "R", name: "South African - Rand" },
  { cc: "ZMK", symbol: "ZK", name: "Zambian - Kwacha" },
  { cc: "ZWR", symbol: "Z$", name: "Zimbabwean - Dollar" }
];
