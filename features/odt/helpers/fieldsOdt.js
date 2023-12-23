import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'

export const fieldsOdt = {
  city: {
    name: 'city',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
    sub_type: ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.CITY,
  },
  state: {
    name: 'state',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
    sub_type: ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.STATE,
  },
  district: {
    name: 'district',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
    sub_type: ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.CITY,
  },

  county: {
    name: 'county',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
    sub_type: ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.COUNTY,
  },
  population: {
    name: 'population',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  density_source: {
    name: 'density_source',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  military_incorporated: {
    name: 'military_incorporated',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  township: {
    name: 'township',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  timezone: {
    name: 'timezone',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  ranking_zips: {
    name: 'ranking_zips',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  age_median: {
    name: 'age_median',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
  },
  age_under_10: {
    name: 'age_under_10',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  age_10_to_19: {
    name: 'age_10_to_19',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  age_20s: {
    name: 'age_20s',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  age_30s: {
    name: 'age_30s',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  age_40s: {
    name: 'age_40s',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  age_50s: {
    name: 'age_50s',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  age_60s: {
    name: 'age_60s',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  age_70s: {
    name: 'age_70s',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  age_80s: {
    name: 'age_80s',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  male: {
    name: 'male',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  female: {
    name: 'female',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  married: {
    name: 'married',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  divorced: {
    name: 'divorced',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  never_married: {
    name: 'never_married',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  widowed: {
    name: 'widowed',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  family_size: {
    name: 'family_size',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  family_dual_income: {
    name: 'family_dual_income',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  income_household_median: {
    name: 'income_household_median',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  under_5: {
    name: 'under_5',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  from_5_to_10: {
    name: 'from_5_to_10',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  from_10_to_15: {
    name: 'from_10_to_15',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  from_15_to_20: {
    name: 'from_15_to_20',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  from_20_to_25: {
    name: 'from_20_to_25',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  from_25_to_35: {
    name: 'from_20_to_25',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  from_35_to_50: {
    name: 'from_35_to_50',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  from_50_to_75: {
    name: 'from_50_to_75',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  from_75_to_100: {
    name: 'from_75_to_100',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  from_100_to_150: {
    name: 'from_100_to_150',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  from_150_over: {
    name: 'from_150_over',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  six_figure: {
    name: 'six_figure',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  individual_median: {
    name: 'individual_median',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  home_ownership: {
    name: 'home_ownership',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  home_value: {
    name: 'home_value',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  rent_median: {
    name: 'rent_median',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  rent_burden: {
    name: 'rent_burden',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  less_high_school: {
    name: 'less_high_school',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  high_school: {
    name: 'high_school',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  some_college: {
    name: 'some_college',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  bachelors: {
    name: 'bachelors',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  graduate: {
    name: 'graduate',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  college_or_above: {
    name: 'college_or_above',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  stem_degree: {
    name: 'stem_degree',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  labor_force_participation: {
    name: 'labor_force_participation ',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  unemployment_rate: {
    name: 'unemployment_rate',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  white: {
    name: 'c_white',
    label: 'white',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  black: {
    name: 'c_black',
    label: 'black',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  asian: {
    name: 'asian',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  native: {
    name: 'native',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  pacific: {
    name: 'pacific',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  hispanic: {
    name: 'hispanic',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  multiple: {
    name: 'multiple',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  other: {
    name: 'other',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  disabled: {
    name: 'disabled',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  poverty: {
    name: 'poverty',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  limited_english: {
    name: 'limited_english',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  commute_time: {
    name: 'commute_time',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  health_uninsured: {
    name: 'health_uninsured',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  veteran: {
    name: 'veteran',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  company_name: {
    name: 'company_name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.COMPANY_NAME,
  },
  sic_code: {
    name: 'sic_code',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  sic_description: {
    name: 'sic_description',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  address: {
    name: 'address',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
  },
  zip: {
    name: 'zip',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
    sub_type: ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.ZIP_CODE,
  },
  phone: {
    name: 'phone',
    type: ATTRIBUTE_FIELDS.PHONE_NUMBER.TYPE,
  },
  fax: {
    name: 'fax',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  website: {
    name: 'website',
    type: ATTRIBUTE_FIELDS.WEBSITE.TYPE,
  },
  contact: {
    name: 'contact',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
  },
  contact_title: {
    name: 'contact_title',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
  },
  total_employees: {
    name: 'total_employees',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  employee_range: {
    name: 'employee_range',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  sale_volume: {
    name: 'sale_volume',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  sale_volume_range: {
    name: 'sale_volume_range',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  naics_number: {
    name: 'naics_number',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  industry: {
    name: 'industry',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  employer_name: {
    name: 'employer_name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  id: {
    name: 'id',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  upa: {
    name: 'upa',
    label: 'UPA',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  event_date: {
    name: 'event_date',
    type: ATTRIBUTE_FIELDS.DATE_TIME.TYPE,
  },
  address_1: {
    name: 'address_1',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
  },
  address_2: {
    name: 'address_2',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
  },
  primary_naics: {
    name: 'primary_naics',
    label: 'Primary NAICS',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  geopoint: {
    name: 'geopoint',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  hospitalized: {
    name: 'hospitalized',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  amputation: {
    name: 'amputation',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  inspection: {
    name: 'inspection',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  final_narrative: {
    name: 'final_narrative ',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  nature_title: {
    name: 'nature_title',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  part_of_body_title: {
    name: 'part_of_body_title',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
    chips: true,
  },
  event_title: {
    name: 'event_title',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  source_title: {
    name: 'source_title',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  secondary_source_title: {
    name: 'secondary_source_title',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  alias: {
    name: 'alias',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  cofips: {
    name: 'cofips',
    label: 'COFIPS',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  country: {
    name: 'country',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
    sub_type: ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.COUNTRY,
  },
  county_fips: {
    name: 'county_fips',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  degree_grant: {
    name: 'degree_grant',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  dorm_cap: {
    name: 'dorm_cap',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
  },
  ft_enroll: {
    name: 'ft_enroll',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  total_entroll: {
    name: 'total_entroll',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  type: {
    name: 'type',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
  },
  hi_offer: {
    name: 'hi_offer',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  housing: {
    name: 'housing',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  inst_size: {
    name: 'inst_size',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  ipedsid: {
    name: 'ipedsid',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
  },
  naics_code: {
    name: 'naics_code',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
  },
  naics_desc: {
    name: 'naics_desc',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
  },
  sector: {
    name: 'sector',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
  },
  size_set: {
    name: 'size_set',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
  },
  source: {
    name: 'source',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
  },
  total_emp: {
    name: 'total_emp',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
  },
  end_grade: {
    name: 'end_grade',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  enrollment: {
    name: 'enrollment',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
  },
  ft_teacher: {
    name: 'ft_teacher',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
  },
  level: {
    name: 'level',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  start_grad: {
    name: 'start_grad',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
  },
  status: {
    name: 'status',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
  },
  valuation_date: {
    name: 'valuation_date',
    type: ATTRIBUTE_FIELDS.DATE_TIME.TYPE,
  },
  valuation_method: {
    name: 'valuation_method',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  st_grade: {
    name: 'st_grade',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  pt_enroll: {
    name: 'pt_enroll',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },

  university_name: {
    name: 'university_name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  supplemental_college_name: {
    name: 'supplemental_college_name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  name: {
    name: 'name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },

  bill_number: {
    name: 'bill_number',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.IBAN,
  },
  congress: {
    name: 'congress',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
    chips: true,
    groupBy: true,
  },
  bill_title: {
    name: 'bill_title',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  sponsor: {
    name: 'sponsor',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
  },
  introduced_date: {
    name: 'introduced_date',
    type: ATTRIBUTE_FIELDS.DATE.TYPE,
  },
  bill_source: {
    name: 'bill_source',
    type: ATTRIBUTE_FIELDS.WEBSITE.TYPE,
  },
  last_action_date: {
    name: 'last_action_date',
    type: ATTRIBUTE_FIELDS.DATE.TYPE,
  },
  last_action_description: {
    name: 'last_action_description',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  tracker_type: {
    name: 'tracker_type',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
    chips: true,
    groupBy: true,
  },
  total_cosponsors: {
    name: 'total_cosponsors',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  committees: {
    name: 'committees',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
    chips: true,
    groupBy: true,
  },
  constitutional_authority_statement: {
    name: 'constitutional_authority_statement',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  congressional_budget_office: {
    name: 'congressional_budget_office',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  bill_type: {
    name: 'bill_type',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
    groupBy: true,
  },
  status_of_legislation: {
    name: 'status_of_legislation',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
    chips: true,
    groupBy: true,
  },
  status_of_amendment: {
    name: 'status_of_amendment',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
    chips: true,
    groupBy: true,
  },
  subject_policy_area: {
    name: 'subject_policy_area',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
    chips: true,
    groupBy: true,
  },
  chamber_of_origin: {
    name: 'chamber_of_origin',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
    chips: true,
    groupBy: true,
  },
  committee: {
    name: 'committee',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
    chips: true,
    groupBy: true,
  },
  member_name: {
    name: 'member_name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.NAME,
  },
  home_town: {
    name: 'home_town',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
    sub_type: ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.STATE,
  },
  party: {
    name: 'party',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
  },
  total_votes: {
    name: 'total_votes',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  committee_and_subcommittee_assignments: {
    name: 'committee_and_subcommittee_assignments',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.NAME,
  },

  time: {
    name: 'time',
    type: ATTRIBUTE_FIELDS.DATE_TIME.TYPE,
  },
  date: {
    name: 'date',
    type: ATTRIBUTE_FIELDS.DATE.TYPE,
  },
  activity: {
    name: 'activity',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  session: {
    name: 'session',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  roll_call_number: {
    name: 'roll_call_number',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.IBAN,
  },
  vote_question: {
    name: 'vote_question',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
  },
  vote_type: {
    name: 'vote_type',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
  },
  yea: {
    name: 'yea',
    label: 'YEA',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  nay: {
    name: 'nay',
    label: 'NAY',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  present: {
    name: 'present',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  note_voting: {
    name: 'note_voting',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  representative: {
    name: 'representative',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  vote: {
    name: 'vote',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  served: {
    name: 'served',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  picture: {
    name: 'picture',
    type: ATTRIBUTE_FIELDS.PICTURE.TYPE,
  },
  total_serving_year: {
    name: 'total_serving_year',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  committee_name: {
    name: 'committee_name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  total_subcommittees: {
    name: 'total_subcommittees',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
  },
  total_democrats: {
    name: 'total_democrats',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  total_democrats_pr: {
    name: 'total_democrats_pr',
    label: 'Total Democrats%',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  total_republicans: {
    name: 'total_republicans',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  total_republicans_pr: {
    name: 'total_republicans_pr',
    label: 'Total Republicans%',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  subcommittee_name: {
    name: 'subcommittee_name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.TITLE,
  },
  full_name: {
    name: 'full_name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.NAME,
  },
  first_name: {
    name: 'first_name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.NAME,
  },
  last_name: {
    name: 'last_name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.NAME,
  },
  middle_name: {
    name: 'middle_name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.NAME,
  },
  suffix: {
    name: 'suffix',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.NAME,
  },
  nickname: {
    name: 'nickname',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.NAME,
  },
  birthday: {
    name: 'birthday',
    type: ATTRIBUTE_FIELDS.DATE.TYPE,
  },
  gender: {
    name: 'gender',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
  },
  senate_class: {
    name: 'senate_class',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  url: {
    name: 'url',
    type: ATTRIBUTE_FIELDS.WEBSITE.TYPE,
  },
  contact_form: {
    name: 'contact_form',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  rss_url: {
    name: 'rss_url',
    type: ATTRIBUTE_FIELDS.WEBSITE.TYPE,
  },
  twitter: {
    name: 'twitter',
    type: ATTRIBUTE_FIELDS.WEBSITE.TYPE,
  },
  facebook: {
    name: 'facebook',
    type: ATTRIBUTE_FIELDS.WEBSITE.TYPE,
  },
  youtube: {
    name: 'youtube',
    type: ATTRIBUTE_FIELDS.WEBSITE.TYPE,
  },
  youtube_id: {
    name: 'youtube_id',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.IBAN,
  },
  bioguide_id: {
    name: 'bioguide_id',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.IBAN,
  },
  thomas_id: {
    name: 'thomas_id',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.IBAN,
  },
  opensecrets_id: {
    name: 'opensecrets_id',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.IBAN,
  },
  lis_id: {
    name: 'lis_id',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.IBAN,
  },
  fec_ids: {
    name: 'fec_ids',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.IBAN,
  },
  cspan_id: {
    name: 'cspan_id',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.IBAN,
  },
  govtrack_id: {
    name: 'govtrack_id',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.IBAN,
  },
  votesmart_id: {
    name: 'votesmart_id',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.IBAN,
  },
  ballotpedia_id: {
    name: 'ballotpedia_id',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.IBAN,
  },
  washington_post_id: {
    name: 'washington_post_id',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.IBAN,
  },
  icpsr_id: {
    name: 'icpsr_id',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.IBAN,
  },
  wikipedia_id: {
    name: 'wikipedia_id',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.IBAN,
  },
}
