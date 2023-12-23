<template>
  <!--PRICE CONTENT START-->
  <div :class="`generic_content ${active?'active':''} clearfix`">
    <div class="generic_head_price clearfix">
      <div class="generic_head_content clearfix">
        <div class="head_bg"></div>
        <div class="head">
          <span>{{packageName}}</span>
        </div>
      </div>
      <div class="generic_price_tag clearfix">
        <span class="price">
          <span class="sign">$</span>
          <span class="currency">{{price | currency}}</span>
          <span class="cent">.{{price | cent}}</span>
          <span class="month">/{{unit}}</span>
        </span>
      </div>
    </div>
    <div class="generic_feature_list">
      <ul>
        <li v-for="(feature, index) in features" :key="index">
          <span>{{feature.value}}</span>
          {{feature.text}}
        </li>
      </ul>
    </div>
    <div class="generic_price_btn clearfix">
      <a class href>Get started</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    packageName: String,
    price: Number,
    unit: String,
    features: Array,
    active: Boolean
  },
  filters: {
    currency(price) {
      return Math.floor(price) + "";
    },
    cent(price) {
      return (Math.floor((price * 100) % 100) + "").padStart(2, "0");
    }
  }
};
</script>

<style scoped>
/*PRICE COLOR CODE START*/
.generic_content {
  background-color: #fff;
}

.generic_content .generic_head_price {
  background-color: #f6f6f6;
}

.generic_content .generic_head_price .generic_head_content .head_bg {
  border-color: #e4e4e4 rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #e4e4e4;
}

.generic_content .generic_head_price .generic_head_content .head span {
  color: #525252;
}

.generic_content .generic_head_price .generic_price_tag .price .sign {
  color: #414141;
}

.generic_content .generic_head_price .generic_price_tag .price .currency {
  color: #414141;
}

.generic_content .generic_head_price .generic_price_tag .price .cent {
  color: #414141;
}

.generic_content .generic_head_price .generic_price_tag .month {
  color: #414141;
}

.generic_content .generic_feature_list ul li {
  color: #a7a7a7;
}

.generic_content .generic_feature_list ul li span {
  color: #414141;
}
.generic_content .generic_feature_list ul li:hover {
  background-color: #e4e4e4;
  border-left: 5px solid #2ecc71;
}

.generic_content .generic_price_btn a {
  border: 1px solid #2ecc71;
  color: #2ecc71;
}

.generic_content.active .generic_head_price .generic_head_content .head_bg,
.generic_content:hover .generic_head_price .generic_head_content .head_bg {
  border-color: #2ecc71 rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #2ecc71;
  color: #fff;
}

.generic_content:hover .generic_head_price .generic_head_content .head span,
.generic_content.active .generic_head_price .generic_head_content .head span {
  color: #fff;
}

.generic_content:hover .generic_price_btn a,
.generic_content.active .generic_price_btn a {
  background-color: #2ecc71;
  color: #fff;
}
.row .table {
  padding: 22px 0;
}

/*PRICE BODY CODE START*/
.generic_content {
  overflow: hidden;
  position: relative;
  text-align: center;
  border: 1px solid silver;
}
.generic_content:hover,
.generic_content.active {
  border-color: #2ecc71;
}

.generic_content .generic_head_price {
  margin: 0 0 16px 0;
}

.generic_content .generic_head_price .generic_head_content {
  margin: 0 0 40px 0;
}

.generic_content .generic_head_price .generic_head_content .head_bg {
  border-style: solid;
  border-width: 72px 1128px 18px 320px;
  position: absolute;
}

.generic_content .generic_head_price .generic_head_content .head {
  padding-top: 32px;
  position: relative;
  z-index: 1;
}

.generic_content .generic_head_price .generic_head_content .head span {
  font-size: 22px;
  font-weight: 400;
  letter-spacing: 2px;
  margin: 0;
  padding: 0;
  text-transform: uppercase;
}

.generic_content .generic_head_price .generic_price_tag {
  padding: 0 0 16px;
}

.generic_content .generic_head_price .generic_price_tag .price {
  display: block;
}

.generic_content .generic_head_price .generic_price_tag .price .sign {
  display: inline-block;
  font-size: 22px;
  font-weight: 400;
  vertical-align: middle;
}

.generic_content .generic_head_price .generic_price_tag .price .currency {
  font-size: 48px;
  font-weight: 300;
  letter-spacing: -2px;
  line-height: 48px;
  padding: 0;
  vertical-align: middle;
}

.generic_content .generic_head_price .generic_price_tag .price .cent {
  display: inline-block;
  font-size: 19px;
  font-weight: 400;
  vertical-align: bottom;
}

.generic_content .generic_head_price .generic_price_tag .month {
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 3px;
  vertical-align: bottom;
}

.generic_content .generic_feature_list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.generic_content .generic_feature_list ul li {
  font-size: 14px;
  padding: 12px 0;
  transition: all 0.3s ease-in-out 0s;
}
.generic_content .generic_feature_list ul li:hover {
  transition: all 0.3s ease-in-out 0s;
  -moz-transition: all 0.3s ease-in-out 0s;
  -ms-transition: all 0.3s ease-in-out 0s;
  -o-transition: all 0.3s ease-in-out 0s;
  -webkit-transition: all 0.3s ease-in-out 0s;
}
.generic_content .generic_feature_list ul li .fa {
  padding: 0 8px;
}
.generic_content .generic_price_btn {
  margin: 16px 0 26px;
}

.generic_content .generic_price_btn a {
  border-radius: 40px;
  -moz-border-radius: 40px;
  -ms-border-radius: 40px;
  -o-border-radius: 40px;
  -webkit-border-radius: 40px;
  display: inline-block;
  font-size: 14px;
  outline: medium none;
  padding: 10px 24px;
  text-decoration: none;
  text-transform: uppercase;
}

.generic_content,
.generic_content:hover,
.generic_content .generic_head_price .generic_head_content .head_bg,
.generic_content:hover .generic_head_price .generic_head_content .head_bg,
.generic_content .generic_head_price .generic_head_content .head h2,
.generic_content:hover .generic_head_price .generic_head_content .head h2,
.generic_content .price,
.generic_content:hover .price,
.generic_content .generic_price_btn a,
.generic_content:hover .generic_price_btn a {
  transition: all 0.3s ease-in-out 0s;
  -moz-transition: all 0.3s ease-in-out 0s;
  -ms-transition: all 0.3s ease-in-out 0s;
  -o-transition: all 0.3s ease-in-out 0s;
  -webkit-transition: all 0.3s ease-in-out 0s;
}
@media (max-width: 320px) {
}

@media (max-width: 767px) {
  .generic_content {
    margin-bottom: 60px;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .col-md-3 {
    float: left;
    width: 50%;
  }

  .col-md-4 {
    float: left;
    width: 50%;
  }

  .generic_content {
    margin-bottom: 60px;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
}
@media (min-width: 1200px) {
}

.text-center h1,
.text-center h1 a {
  color: #7885cb;
  font-size: 24px;
  font-weight: 300;
  text-decoration: none;
}
.demo-pic {
  margin: 0 auto;
}
.demo-pic:hover {
  opacity: 0.7;
}

.price-heading {
  text-align: center;
}
.price-heading h1 {
  color: #666;
  margin: 0;
  padding: 0 0 40px 0;
}
.demo-button {
  background-color: #333333;
  color: #ffffff;
  display: table;
  font-size: 16px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 16px;
  margin-bottom: 40px;
  outline-color: -moz-use-text-color;
  outline-style: none;
  outline-width: medium;
  padding: 8px;
  text-align: center;
  text-transform: uppercase;
}
.bottom_btn {
  background-color: #333333;
  color: #ffffff;
  display: table;
  font-size: 22px;
  margin: 48px auto 16px;
  padding: 8px 20px;
  text-align: center;
  text-transform: uppercase;
}
.demo-button:hover {
  background-color: #666;
  color: #fff;
  text-decoration: none;
}
.bottom_btn:hover {
  background-color: #666;
  color: #fff;
  text-decoration: none;
}
</style>

