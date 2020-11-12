<template>
    <div class="wellcome">
        <header class="wellcome-header">
            <h1 class="wellcome-header__title">
                <span class="wellcome-header__title--main">Quizit</span>
                <span class="wellcome-header__title--sub">The Ultimate Quiz App</span>
            </h1>
        </header>
        <section class="wellcome-main">
            <div class="wellcome-row">
                <div tabindex=1 class="wellcome-card">Easy Quiz Making</div>
                <div tabindex=1 class="wellcome-card">Fun And Interactive Quizzes</div>
                <div tabindex=1 class="wellcome-card">Featurefull Free Tier</div>
            </div>
            <div class="wellcome-row">
                <div tabindex=1 class="wellcome-card">Fun Student Experience</div>
                <div tabindex=1 class="wellcome-card">Simple User Interface</div>
                <div tabindex=1 class="wellcome-card">Feature-Rich application</div>
            </div>
        </section>
        <section class="wellcome-plans">
            <header class="header">
                <h2 class="header__title">Our Plans</h2>
            </header>
            <div class="wellcome-plans__row">
                <div tabindex="1" class="wellcome-plans__card">
                    <h2 class="wellcome-plans__card-title">Free</h2>
                    <p class="wellcome-plans__card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae officia sapiente reiciendis.</p>
                    <h2 class="wellcome-plans__card-price">0/m</h2>
                </div>
                <div tabindex="1" class="wellcome-plans__card">
                    <h2 class="wellcome-plans__card-title">Pro</h2>
                    <p class="wellcome-plans__card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae officia sapiente reiciendis.</p>
                    <h2 class="wellcome-plans__card-price">7/m</h2>
                </div>
                <div tabindex="1" class="wellcome-plans__card">
                    <h2 class="wellcome-plans__card-title">Expert</h2>
                    <p class="wellcome-plans__card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae officia sapiente reiciendis.</p>
                    <h2 class="wellcome-plans__card-price">15/2m</h2>
                </div>
            </div>
        </section>
        <section class="wellcome-cla">
            <h2 class="wellcome-cla__title">What Are You Waiting For?</h2>
            <h3 class="wellcome-cla__sub">Click Here To Try For Free!</h3>
            <router-link to="/signup" tabindex="1" class="wellcome-cla__btn">Sign up</router-link>
        </section>
    </div>
</template>
<script>
export default {name:'wellcome'}
</script>
<style lang="scss">
.wellcome{
    font-family: 'wendy one';
    letter-spacing: .22rem;

    section:not(:last-child){
        margin-bottom: 15rem;
    }

    //main header
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
        user-select: none;

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
        animation: fade-in .7s .2s forwards;
    }

    //cards
    &-row{
        display: flex;
        justify-content: space-around;
        margin-bottom: 2rem;

        &:first-of-type .wellcome-card{
            &:nth-child(1){
                background-color: #8F00FF
            }
            &:nth-child(2){
                background-color: #16FF65
            }
            &:nth-child(3){
                background-color: #FF004D;
            }
        }

        &:last-of-type .wellcome-card{
            &:nth-child(1){
                background-color: #0066FF
            }
            &:nth-child(2){
                background-color: #FFB800
            }
            &:nth-child(3){
                background-color: #00FFD1;
            }
        }
    }

    &-card{
        padding: 0 5rem;
        box-shadow: 3px 4px 7px rgba(0, 0, 0, 0.4);
        transition: transform .2s;
        outline: none;
        color: #fff;
        display: flex;
        justify-self: center;
        align-items: center;
        font-size: 2rem;
        width: 25rem;
        height: 10rem;
        text-align: center;

        &:hover,&:focus{
            transform: translateY(-.3rem);
        }
    }
    
    //plans section
    &-plans{
        .header{
            padding: 10rem 0;
            width: 104%;
            transform: rotateZ(-4deg);
            position: relative;
            left: -1rem;
        }

        &__row{
            display: flex;
            justify-content: space-around;
        }

        &__card{
            background: #67B6FF;
            width: 20rem;
            height: 25rem;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 1rem 3rem;
            box-shadow: 3px 4px 7px rgba(0, 0, 0, 0.4);
            border-radius: .5rem;
            color: #fff;
            transition: all .3s;
            outline: none;

            &:hover{
                transform: translateY(-.5rem);
            }

            &-title{
                font-size: 2.2rem;
            }

            &-text{
                text-align: left;
                font-size: 1.4rem;
            }

            &-price{
                font-size: 2rem;
            }
        }

    }

    &-cla{
        width: 100%;
        text-align: center;
        background-image: linear-gradient(103.21deg, #0065FC 3.03%, #67B6FF 74.67%, #A9E5FF 94.13%);
        color: #fff;
        height: 50vh;
        padding-top: 3rem;

        &__title{
            font-size: 5rem;
            margin-bottom: 3rem;
        }

        &__sub{
            font-size: 3rem;
            margin-bottom: 5rem;
        }

        &__btn{
            font-size: 2.3rem;
            background-color: #fff;
            color: #4E4E4E;
            padding: 1rem 6rem;
            border-radius: 2rem;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            transition: all .2s;
            outline: none;
            user-select: none;
            transform: translateY(0);
            display: inline-block;
            cursor: pointer;

            &:hover,&:focus{
                transform: translateY(-.3rem);
                box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.25);
            }

            &:active{
               transform: translateY(.3rem);
               box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
            }
        }
    }

}
</style>