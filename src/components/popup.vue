<template>
  <div class="popup">
      <div @click="disagreeFromOverlay" class="popup__overlay"></div>
      <div class="popup-content">
        <h3 class="popup-content__title">{{ data.title||'Are You Sure?' }}</h3>
        <p class="popup-content__text">{{ data.text || '' }}</p>
        <div class="popup-content__buttons">
          <button @click="disagree" class="popup-content__btn popup-content__btn--cancel">Cancel</button>
          <button @click="agree" class="popup-content__btn popup-content__btn--agree">{{ data.agreeText||'Agree' }}</button>
        </div>
      </div>
  </div>
</template>
<script>
export default {
    name:'Popup',
    props:['data','stop'],
    data(){
        return{

        }
    },
    methods:{
        agree(){
            this.$emit('popupAgree')
        },
        disagree(){
            this.$emit('popupDisagree')
        },
        disagreeFromOverlay(){
            if(!this.stop){
                this.$emit('popupDisagree')
            }
        }
    },
}
</script>
<style lang="scss">
.popup{
    
    &__overlay{
        background-color: #303030;
        height: 100vh;
        width: 100vw;
        position: fixed;
        opacity: .4;
        z-index: 10;
        animation: popup-fade-in 1s forwards;
    }

    &-content{
        z-index: 11;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        background: #f7f7f7;
        width: 25rem;
        padding: 1rem 2rem;
        font-family: roboto;
        border-radius: .3rem;
        transform-origin: 0% 0%;
        animation: scale-and-fade 1s forwards;
        
        &__title{
            text-align: center;
            margin-bottom:1rem;
        }

        &__text{
            margin-bottom: 2rem;
        }

        &__buttons{
            display: flex;
            justify-content: space-around;
        }

        &__btn{
            background-color: rgba(#e2e2e2,.7);
            padding: .4rem 1rem;
            transition: all .3s;
            outline: none;

            &:hover,&:focus {
                background-color: darken(#e2e2e2,4);
            }

            &:active{
                background-color: darken(#e2e2e2,7);
            }
        }
    }
}

@keyframes scale-and-fade{
    from{
        opacity: 0;
        transform: scale(0) translateX(-50%) translateY(-50%);
    }
    to{
        opacity: 1;
        transform: scale(1) translateX(-50%) translateY(-50%);
    }
}

@keyframes popup-fade-in{
    from{
        opacity: 0;
    }
    to{
        opacity: .4;
    }
}
</style>