<template>
  <nav tabindex=0 class="navbar" :class="{ 'navbar--active':isNavOpen }">
    <svg class="navbar__icon">
      <symbol id="icon-menu" viewBox="0 0 32 32">
        <path d="M2 6h28v6h-28zM2 14h28v6h-28zM2 22h28v6h-28z"></path>
      </symbol>
      <use xlink:href="#icon-menu"></use>
    </svg>
    <ul class="navbar__list">
      <li v-if="!user"><router-link class="navbar__item" to="/login">Login</router-link></li>
      <li v-if="!user"><router-link class="navbar__item" to="/signup">Signup</router-link></li>
      <li v-if="!user"><router-link class="navbar__item" to="/">Home</router-link></li>
      <li v-if="user"><router-link class="navbar__item" to="/new-quiz">New Quiz</router-link></li>
      <li v-if="user"><router-link class="navbar__item" to="/profile">Profile</router-link></li>
      <li v-if="user"><router-link class="navbar__item" to="/">Quizzes</router-link></li>
      <li v-if="user"><button @click="logout" class="navbar__item">Logout</button></li>
    </ul>
  </nav>
</template>
<script>
import axios from 'axios'
export default {
  name: "Navigation",
  data() {
    return {
      isNavOpen:false,
    };
  },
  methods: {
    //loges user out
    logout() {
      axios.post('/api/users/logout',{},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,}
      }).then(() => {
        localStorage.removeItem("token");
        location.reload();
      }).catch(err => {
        console.log(err)
      })
    },
  },
  computed: {
    //gets user data
    user() {
      return this.$store.state.user;
    },
  },
};
</script>
<style lang="scss">
  .navbar{
    background-color: #5566FF;
    font-family: 'wendy one';
    position: absolute;
    z-index: 1;
    top: 2rem;
    right: 1.2rem;
    overflow: hidden;
    transition: all .5s cubic-bezier(.54,.01,.02,.98);
    border-radius: .7rem;
    white-space: nowrap;
    outline: none;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 0;
    width: 13rem;
    height: auto;
    max-height: 2rem;
    transform: scaleX(.4);

    &:focus,&:focus-within{
      max-height: 17.9rem;
      transform: scaleX(1);
      font-size: 1.4rem;
      width: 15rem;
      cursor: auto;
    }

    &__list{
      list-style: none;
      opacity: 0;
      visibility: hidden;
      width: 100%;
    }

    &:focus &__list, &:focus-within &__list{
        opacity: 1;
        visibility: visible;
    }

    &__icon{
      fill: #f7f7f7;
      width: 5rem;
      height: 100%;
      transition: all .5s;
      z-index: 20;
      outline: none;
      opacity: 1;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%) scaleX(2);

      &:hover &-icon,&:focus   &-icon{
        fill: darken(#f7f7f7,3);
      }

      &:active &-icon{
        fill: darken(#f7f7f7,5);
      }
    }

    &:focus &__icon,&:focus-within &__icon{
      opacity: 0;
      z-index: -1;
      transform: translateX(-50%) translateY(-50%) scaleX(1);
    }

    &__item{
      background-color: #6F7DFF;
      padding: .6rem;
      text-align: center;
      display: block;
      color: #000000;
      text-decoration: none;
      transition: all .1s;
      border-radius: .3rem;
      outline: none;

      &:first-child{
        margin-top: 1rem;
      }

      &:last-child{
        margin-bottom: 1rem;
        width: 100%;
      }

      &:hover,&:focus {
        background: darken(#6F7DFF,2);
      }

      &:active{
        background: darken(#6F7DFF,3);
      }
    }
  }
</style>