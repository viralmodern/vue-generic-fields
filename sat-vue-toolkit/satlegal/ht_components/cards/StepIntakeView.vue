<template>
  <div id="crumbs">
    <ul>
      <li v-for="item in items" :key="item.id">
        <a :style="{backgroundColor: item.color}" href>
          <span class="before"></span>
          {{ item.name }}
          <span class="after" :style="{borderLeftColor: item.color}"></span>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          id: 1,
          name: "New",
          color: "#8E24AA"
        },
        {
          id: 2,
          name: "Reviewing",
          color: "#F44336"
        },
        {
          id: 3,
          name: "Accepting",
          color: "#004D40"
        },
        {
          id: 4,
          name: "Rejecting",
          color: "#CDDC39"
        },
        {
          id: 5,
          name: "Done",
          color: "#607D8B"
        }
      ]
    };
  }
};
</script>
<style scoped>
#crumbs {
  text-align: center;
}
#crumbs ul {
  list-style: none;
  display: inline-table;
}
#crumbs ul li:first-child a {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
#crumbs ul li:first-child a .before {
  display: none;
}
#crumbs ul li a {
  display: block;
  float: left;
  height: 60px;
  text-align: center;
  padding: 15px 25px 0 60px;
  position: relative;
  margin: 0 10px 0 0;
  font-size: 20px;
  text-decoration: none;
  color: #fff;
}
#crumbs ul li {
  display: inline;
}
#crumbs ul li a .after {
  content: "";
  border-top: 34px solid transparent;
  border-bottom: 26px solid transparent;
  border-left: 40px solid #3498db;
  position: absolute;
  right: -40px;
  top: 0;
  z-index: 1;
}
#crumbs ul li a .before {
  content: "";
  border-top: 34px solid transparent;
  border-bottom: 26px solid transparent;
  border-left: 40px solid #fff;
  position: absolute;
  left: 0;
  top: 0;
}
#crumbs ul li a:hover {
  background-color: #fa5ba5 !important;
}
#crumbs ul li a:hover .after {
  border-left-color: #fa5ba5 !important;
}
#crumbs ul li:last-child a .after {
  display: none;
}
#crumbs ul li:last-child a {
  padding-right: 80px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>
