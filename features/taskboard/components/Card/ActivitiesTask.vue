<template>
  <div class="ui small threaded feed">
    <!--    <h4 class="ui header">Activity</h4>-->
    <div class="event">
      <div class="label">
        <img :src="avt" />
      </div>
      <div class="content">
        You added Elliot Fu to the group <a>Coworkers</a>
      </div>
    </div>
    <div class="event">
      <div class="label">
        <img :src="avt" />
      </div>
      <div class="content">
        <div class="date">
          3 days ago
        </div>
        <div class="summary">
          You added <a>Jenny Hess</a> to your <a>coworker</a> group.
        </div>
      </div>
    </div>
    <div class="event">
      <div class="label d-flex align-center">
        <v-icon small>mdi-pencil</v-icon>
      </div>
      <div class="content">
        <div class="summary">
          You posted on your friend <a>Stevie Feliciano's</a> wall.
          <div class="date">Today</div>
        </div>
      </div>
    </div>
    <div class="event">
      <div class="label">
        <a><img :src="avt2"/></a>
      </div>
      <div class="content">
        <div class="summary">
          <a class="user">
            Elliot Fu
          </a>
          added you as a friend
          <div class="date">
            1 Hour Ago
          </div>
        </div>
        <div class="meta">
          <a class="like">
            <!--            <i class="like icon"></i>-->
            <v-icon small>mdi-heart</v-icon>
            4 Likes
          </a>
        </div>
      </div>
    </div>
    <div class="event">
      <div class="label">
        <a><img :src="avt3"/></a>
      </div>
      <div class="content">
        <div class="summary">
          <a>Helen Troy</a> added <a>2 new illustrations</a>
          <div class="date">
            4 days ago
          </div>
        </div>
        <div class="extra images">
          <a><img :src="avt1"/></a>
          <a><img :src="avt"/></a>
        </div>
        <div class="meta">
          <a class="like"> <i class="like icon"></i> 1 Like </a>
        </div>
      </div>
    </div>
    <div class="event">
      <div class="label">
        <a><img :src="avt2"/></a>
      </div>
      <div class="content">
        <div class="summary">
          <a class="user">
            Jenny Hess
          </a>
          added you as a friend
          <div class="date">
            2 Days Ago
          </div>
        </div>
        <div class="meta">
          <a class="like">
            <!--            <i class="like icon"></i>-->
            <v-icon small>mdi-heart</v-icon> 8 Likes
          </a>
        </div>
      </div>
    </div>
    <div class="event">
      <div class="label">
        <a><img :src="avt"/></a>
      </div>
      <div class="content">
        <div class="summary">
          <a>Joe Henderson</a> posted on this page
          <div class="date">
            3 days ago
          </div>
        </div>
        <div class="extra text">
          Ours is a life of constant reruns. We're always circling back to where
          we'd we started, then starting all over again. Even if we don't run
          extra laps that day, we surely will come back for more of the same
          another day soon.
        </div>
        <div class="meta">
          <a class="like"> <v-icon small>mdi-heart</v-icon> 5 Likes </a>
        </div>
      </div>
    </div>
    <div class="event">
      <div class="label">
        <a><img :src="avt3"/></a>
      </div>
      <div class="content">
        <div class="summary">
          <a>Justen Kitsune</a> added <a>2 new photos</a> of you
          <div class="date">
            4 days ago
          </div>
        </div>
        <div class="extra images">
          <a><img :src="avt1"/></a>
          <a><img :src="avt2"/></a>
        </div>
        <div class="meta">
          <a class="like"> <v-icon small>mdi-heart</v-icon> 41 Likes </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import 'semantic-ui-icon/icon.min.css'
import 'semantic-ui-feed/feed.min.css'
import faker from 'faker'
export default {
  name: 'ActivitiesTask',
  data: () => ({
    events: [],
    input: null,
    nonce: 0,
    avt: faker.internet.avatar(),
    avt1: faker.internet.avatar(),
    avt2: faker.internet.avatar(),
    avt3: faker.internet.avatar()
  })
}
</script>

<style scoped></style>
