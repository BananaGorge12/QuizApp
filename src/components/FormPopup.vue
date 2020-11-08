<template>
  <div class="form-popup">
      <div class="form-popup__overlay"></div>
      <div class="form-popup__content">
          <h3 class="form-popup__title">{{title}}</h3>
          <input v-model="userInput" class="form-popup__input" :placeholder="placeholder" type="text">
          <button @click="closePopup" class="form-popup__btn">{{btn}}</button>
      </div>
  </div>
</template>

<script>
export default {
    name:'form-popup',
    props:['title','placeholder','btn','func'],
    methods:{
        closePopup(){
            switch(this.func){
                case 'newStudent':
                    this.addNewStudent()
                    break;
            }

            // this.$emit('close')
        },
        addNewStudent(){
            
        }
    },
    data(){
        return{
            userInput:null
        }
    }
}
</script>

<style lang="scss">
</style>