<template>
  <div class="classes">
      <header class="header">
          <h1 class="header__title">Classes</h1>
      </header>
      <main class="classes-main">
          <details v-for="userClass in classes" :key="userClass._id" class="class">
              <summary class="class__name">{{ userClass.name }}</summary>
                <table class="class-table">
                    <thead>
                        <tr class="class-table__head">
                            <th>Name</th>
                            <th>Email</th><th/>
                        </tr>
                    </thead>
                    <tbody class="class-table__body">
                        <tr v-for="(student,index) in userClass.students" :key="index" class="class-table__item">
                            <td>{{ student.name }}</td>
                            <td>{{ student.email }}</td>
                            <td><button class="class-table__btn">Remove</button></td>
                        </tr>
                    </tbody>
                </table>
          </details>
      </main>
      <button class="classes__new-btn" @click="newClassPopup = true">+</button>
      <!-- new class popup -->
      <div v-if="newClassPopup" class="classes-popup">
        <form @submit.prevent="createNewQuiz" class="classes-popup__content">
            <svg @click="newClassPopup = false" class="icon-cross">
              <symbol id="icon-cross" viewBox="0 0 32 32">
                <path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>
              </symbol>
              <use xlink:href="#icon-cross"></use>
            </svg>
            <input v-model="newClassName" class="classes-popup__class-name" type="text" placeholder="Quiz Name" required>
            <input @keydown="popupFeedback = null" v-model="newEmail" class="classes-popup__class-email" type="email" placeholder="Student Email">
            <button class="classes-popup__class-new-email-btn" @click.prevent="addNewEmail">+</button>
            <ul class="classes-popup__list">
                <li v-if="newClassStudents.length" class="classes-popup__list__item">Emails:</li>
                <li v-for="(email,index) in newClassStudents" :key="index" class="classes-popup__list__item">{{ email }}</li>
            </ul>
            <button class="classes-popup__submit" v-if="newClassStudents.length > 2">Create!</button>
            <span class="classes-popup__warring" v-if="newClassStudents.length <= 2">A Class Must Have At Lest 3 Students</span>
            <p v-if="popupFeedback" class="classes-popup__feedback">{{ popupFeedback }}</p>
        </form>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'classes',
    data(){
        return{
            newClassStudents:[],
            newEmail:null,
            newClassName:null,
            popupFeedback:null,
            newClassPopup:false,
        }
    },
    created(){
        if(!this.user){
            return this.$router.push({ name:'Home' })
        }
    },
    methods:{
        createNewQuiz(){
            const classConstructor  = {
                name:this.newClassName,
                students:this.newClassStudents,
            }

            axios.post('/api/classes',classConstructor,{
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
                let newClassArray = this.classes
                newClassArray.push(res.data)
                this.$store.commit('loadClasses',newClassArray)
                this.newClassPopup = false
            }).catch(err => {
                this.popupFeedback = err.response.data.error
            })
        },
        addNewEmail(){
            if(!this.newEmail){
                return this.popupFeedback = 'Please Provide An Email.'
            }

            const emailRegEx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

            if(emailRegEx.test(this.newEmail)){
                if(this.newClassStudents.filter(email => email === this.newEmail).length > 0){
                    this.popupFeedback = 'You Cannot Add The Same Student Twice'
                }
                else{
                    axios.get(`/api/users/validate?email=${this.newEmail}`,{
                        headers:{
                            'Authorization':`Bearer ${localStorage.getItem('token')}`
                        }
                    }).then(() => {
                        this.newClassStudents.push(this.newEmail)
                        this.newEmail = null
                        this.popupFeedback = null
                    }).catch(err => {
                        this.newEmail = null
                        this.popupFeedback = err.response.data.error
                    })
                }

            }else this.popupFeedback = 'Email Is Not Valid';
        }
    },
    computed:{
        classes(){
            return this.$store.state.classes
        },
        user(){
            return this.$store.state.user
        }
    },
}
</script>

<style lang="scss">
.classes{
    &-main{
        font-family: 'wendy one';
        width: 50%;
        margin: 0 auto;

        .class{
            border: .1rem solid #727272;
            padding: 1rem;
            box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);

            &__name{
                font-size: 1.5rem;
                outline: none;
                cursor: pointer;
            }

            &:last-of-type{
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            }

            &:not(:last-of-type){
                border-bottom: 0;
            }
        }

        .class[open] .class__name ~ *{
            animation: sweep .4s ease-in-out forwards;
        }


        .class-table{
            border-collapse: collapse;
            font-size: 1.2rem;
            width: 100%;
            text-align: center;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            margin-bottom: 2rem;

            &__head{
                font-size: 2rem;
                background-color: #348EF9;
                color: #ffffff;
                user-select: none;

                th{
                    padding: .5rem;
                }
            }

            &__body{
                font-size: 1.6rem;
            }

            &__item td{
                padding: 1rem;
            }

            &__item:nth-child(even){
                background: #f5f5f5;
            }

            &__btn{
                background-color: #ff0000;
                color: #ffffff;
                padding: .4rem .7rem;
                border-radius:.3rem ;
                outline: none;
                transition: all .2s;

                &:hover,&:focus{
                    background-color: darken(#ff0000,6);
                }

                &:active{
                    background-color: darken(#ff0000,10);
                }
            }
        }
    }

    &__new-btn{
        font-size: 5rem;
        background-color: #238CEC;
        color: #ffffff;
        position: fixed;
        right: 3rem;
        bottom: 3rem;
        text-align: center;
        padding: 0 1.3rem;
        border-radius: 50%;
        outline: none;
        transition: all .25s;
        box-shadow: 3px 5px 4px rgba(0, 0, 0, 0.25);

        &:hover,&:focus{
            transform: translateY(-.3rem);
            background-color: darken(#238CEC,5);
            box-shadow: 3px 7px 4px rgba(0, 0, 0, 0.25);
        }

        &:active{
            transform: translateY(.1rem);
            background-color: darken(#238CEC,10);
            box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.25);
        }
    }
}
</style>