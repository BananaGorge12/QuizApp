<template>
  <div class="loader">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.loader {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    width: 100px;
    height: 100px;
    margin: 3rem auto;

    div {
        width: 20px;
        height: 20px;
        background: #0077ff;
        border-radius: 50%;
        animation: loader 0.5s cubic-bezier(.19,.57,.3,.98) infinite alternate;
        
        &:nth-child(2) {
            animation-delay: 0.1s;
            opacity: 0.8;
        }
        &:nth-child(3) {
            animation-delay: 0.2s;
            opacity: 0.6;
        }
        &:nth-child(4) {
            animation-delay: 0.3s;
            opacity: 0.4;
        }
    }

    &__card{
        margin-top:4.5rem ;
    }
}
</style>