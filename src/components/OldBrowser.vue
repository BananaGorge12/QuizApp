<template>
  <div class="old-browser">
      <div class="old-browser__content">
        <h1 class="old-browser__title">Your Browser Is Not Supported</h1>
        <h2 class="old-browser__sub">Please Upgrade To A Newer Browser</h2>
      </div>
  </div>
</template>
<script>
export default { name:'oldBrowser' }
</script>
<style lang="scss">
.old-browser{
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(90deg, #0065FC 0%, #67B6FF 63.54%, #A9E5FF 100%);

    &__content{
        color: #fff;
        font-family: 'wendy one';
        letter-spacing: 1px;
        text-align: center;
        position: fixed;
        top: 50%;
        left: 50%;
        width: 100%;
        transform: translate(-50%,-50%);
        font-size: 2.3rem;
    }
}
</style>