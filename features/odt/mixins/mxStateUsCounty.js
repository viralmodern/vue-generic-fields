import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'

export const fieldsStateUsCounty = {
  county_name: {
    type: ATTRIBUTE_FIELDS.LINK_TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.COUNTY,
    name: 'county_name',
  },
  fips: { type: ATTRIBUTE_FIELDS.TEXT.TYPE, name: 'fips' },
  state: {
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
    name: 'state',
    sub_type: ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.STATE,
  },
  total_population: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'total_population',
  },
  median_earnings_2010: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'median_earnings_2010',
  },
  median_age: { type: ATTRIBUTE_FIELDS.HEATMAP.TYPE, name: 'median_age' },
  total_county_judges: {
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
    name: 'total_county_judges',
  },
  total_hospital: {
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
    name: 'total_hospital',
  },
  Total_Law_Enforcement: {
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
    name: 'Total_Law_Enforcement',
  },
  Total_Cities: { type: ATTRIBUTE_FIELDS.INTEGER.TYPE, name: 'Total_Cities' },
  Total_Prisons: { type: ATTRIBUTE_FIELDS.INTEGER.TYPE, name: 'Total_Prisons' },
  Total_Public_Schools: {
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
    name: 'Total_Public_Schools',
  },
  Total_Private_Schools: {
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
    name: 'Total_Private_Schools',
  },
  Total_Lawyers: { type: ATTRIBUTE_FIELDS.INTEGER.TYPE, name: 'Total_Lawyers' },
  Total_Collegesand_Universities: {
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
    name: 'Total_Collegesand_Universities',
  },
  Less_Than_High_School_Diploma: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'Less_Than_High_School_Diploma',
  },
  At_Least_High_School_Diploma: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'At_Least_High_School_Diploma',
  },
  At_Least_Bachelors_Degree: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'At_Least_Bachelors_Degree',
  },
  Graduate_Degree: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'Graduate_Degree',
  },
  School_Enrollment: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'School_Enrollment',
  },
  White_Not_Latino: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'White_Not_Latino',
  },
  African_American: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'African_American',
  },
  Native_American: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'Native_American',
  },
  Asian_American: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'Asian_American',
  },
  Latino_American: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'Latino_American',
  },
  Other_Race_Or_Races: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'Other_Race_Or_Races',
  },
  Children_Under_6_Living_In_Poverty: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'Children_Under_6_Living_In_Poverty',
  },
  Adults_65_And_Older_Living_In_Poverty: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'Adults_65_And_Older_Living_In_Poverty',
  },
  Preschool_Enrollment_Ratio_At_Age_3_And_4: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'Preschool_Enrollment_Ratio_At_Age_3_And_4',
  },
  Poverty_Rate: { type: ATTRIBUTE_FIELDS.HEATMAP.TYPE, name: 'Poverty_Rate' },
  Child_Poverty_Living_In_Families_Below_The_Poverty_Line: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'Child_Poverty_Living_In_Families_Below_The_Poverty_Line',
  },
  Management_Professional_AndRelated: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'Management_Professional_AndRelated',
  },
  Service: { type: ATTRIBUTE_FIELDS.HEATMAP.TYPE, name: 'Service' },
  Sales_And_Office: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'Sales_And_Office',
  },
  Farming_Fishing_And_Forest: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'Farming_Fishing_And_Forest',
  },
  Construction_Extraction_And_Maintenance: {
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
    name: 'Construction_Extraction_And_Maintenance',
  },
  Production_Transportation_And_Materials: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'Production_Transportation_And_Materials',
  },
  Poor_Physical_Health_Days: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'Poor_Physical_Health_Days',
  },
  Poor_Mental_Heath_Dats: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'Poor_Mental_Heath_Dats',
  },
  Low_Birthweight: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'Low_Birthweight',
  },
  Teen_Births: { type: ATTRIBUTE_FIELDS.HEATMAP.TYPE, name: 'Teen_Births' },
  Children_In_Single_Parent_Households: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'Children_In_Single_Parent_Households',
  },
  Adult_Smoking: { type: ATTRIBUTE_FIELDS.HEATMAP.TYPE, name: 'Adult_Smoking' },
  Adult_Obesity: { type: ATTRIBUTE_FIELDS.HEATMAP.TYPE, name: 'Adult_Obesity' },
  Diabetes: { type: ATTRIBUTE_FIELDS.HEATMAP.TYPE, name: 'Diabetes' },
  Sexually_Transmitted_Infections: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'Sexually_Transmitted_Infections',
  },
  HIV_Prevalence_Rate: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'HIV_Prevalence_Rate',
  },
  Uninsured: { type: ATTRIBUTE_FIELDS.HEATMAP.TYPE, name: 'Uninsured' },
  Unemployment: { type: ATTRIBUTE_FIELDS.HEATMAP.TYPE, name: 'Unemployment' },
  Violent_Crime: { type: ATTRIBUTE_FIELDS.HEATMAP.TYPE, name: 'Violent_Crime' },
  Homicide_Rate: { type: ATTRIBUTE_FIELDS.HEATMAP.TYPE, name: 'Homicide_Rate' },
  Injury_Deaths: { type: ATTRIBUTE_FIELDS.HEATMAP.TYPE, name: 'Injury_Deaths' },
  Infant_Mortality: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'Infant_Mortality',
  },
  Republicans_2016: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'Republicans_2016',
  },
  Democrats_2016: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'Democrats_2016',
  },
  Republicans_2012: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'Republicans_2012',
  },
  Democrats_2012: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'Democrats_2012',
  },
  Republicans_2008: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'Republicans_2008',
  },
  Democrats_2008: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'Democrats_2008',
  },
  Number_Of_Returns: {
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
    name: 'Number_Of_Returns',
  },
  Estimated_Exams: {
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
    name: 'Estimated_Exams',
  },
  Audit_Rate: { type: ATTRIBUTE_FIELDS.INTEGER.TYPE, name: 'Audit_Rate' },
  Cases: { type: ATTRIBUTE_FIELDS.HEATMAP.TYPE, name: 'Cases' },
  Deaths: { type: ATTRIBUTE_FIELDS.HEATMAP.TYPE, name: 'Deaths' },
  Fatality_Rate: { type: ATTRIBUTE_FIELDS.HEATMAP.TYPE, name: 'Fatality_Rate' },
  Confirmed_Cases: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'Confirmed_Cases',
  },
  Confirmed_Deaths: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'Confirmed_Deaths',
  },
  Probable_Cases: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'Probable_Cases',
  },
  Probable_Deaths: {
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    name: 'Probable_Deaths',
  },
  Event_Cancellations: {
    type: ATTRIBUTE_FIELDS.DATE_TIME.TYPE,
    name: 'Event_Cancellations',
  },
  School_Closures: {
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    name: 'School_Closures',
  },
  Shelter_In_Place: {
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    name: 'Shelter_In_Place',
  },
  Shelter_Enforcement: {
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    name: 'Shelter_Enforcement',
  },
  Testing_Facilities: {
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    name: 'Testing_Facilities',
  },
  Public_Transportation: {
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    name: 'Public_Transportation',
  },
  Workplace_Closures: {
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    name: 'Workplace_Closures',
  },
}
