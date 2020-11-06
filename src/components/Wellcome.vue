<template>
    <div class="wellcome">
        <header class="wellcome-header">
            <h1 class="wellcome-header__title">
                <span class="wellcome-header__title--main">Quizit</span>
                <span class="wellcome-header__title--sub">The Ultimate Quiz App</span>
            </h1>
        </header>
        <main class="wellcome-main">
            <div tabindex=1 class="wellcome-card wellcome-card--blue">card1</div>
            <div tabindex=1 class="wellcome-card wellcome-card--green">card2</div>
            <div tabindex=1 class="wellcome-card wellcome-card--pink">card3</div>
        </main>
    </div>
</template>
<script>
export default {
    name:'wellcome',
    data(){
        
    }
}
</script>
<style lang="scss">
@import url('../animations/slide-from-top.scss');
@import url('../animations/fade-in.scss');
.wellcome{
    font-family: 'wendy one';
    letter-spacing: .22rem;

    &-header{
        width: 100%;
        height: 40vh;
        background-image: linear-gradient(90deg, #0065FC 0%, #67B6FF 64.47%, #A9E5FF 99.02%);;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
        clip-path: polygon(0 0, 100% 0, 100% 77%, 0 100%);
        margin-bottom: 2rem;

        &__title{
            text-align: center;
            margin-bottom: 5rem;
        
            &--main,&--sub{
                display: block;
            }

            &--main{
                opacity: 0;
                font-size: 10rem;
                margin-bottom: .7rem;
                animation: slide-from-top 1s forwards;
            }

            &--sub{
                font-size: 2rem;
                animation: slide-from-top .7s .2s forwards;
                opacity: 0;
            }
        }
    }

    &-main{
        display: flex;
        justify-content: space-around;
        opacity: 0;
        animation: fade-in .7s .2s forwards;
    }

    &-card{
        height: 20rem;
        padding: 0 7rem;
        box-shadow: 3px 4px 7px rgba(0, 0, 0, 0.4);
        transition: transform .2s;
        outline: none;

        &:hover,&:focus{
            transform: translateY(-.3rem);
        }

        &--blue{
            background-color: #FF9FBC;
        }

        &--green{
            background-color: #16FF65;
        }

        &--pink{
            background-color: #14C7FF;
        }
    }
    
}
</style>