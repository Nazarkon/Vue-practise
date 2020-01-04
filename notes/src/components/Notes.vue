<template>
    <div class="notes">
            <div class="note" :class="{full:!grid}" v-for="(note, index) in notes" :key="index">
              <div class="note--header">
                  <p>{{note.title}}</p>
                  <p style="cursor: pointer;" @click="removeNote(index)">x</p>
              </div>
              <div class="note--body">
                  <p>{{ note.descrition }}</p>
                  <span>{{ note.date }}</span>
              </div>
            </div>
        </div>
</template>

<script>
export default {
    props:{
        notes:{
            type:Array,
            required:true
        },
        grid:{
            type:Boolean,
            required:true
        }
    },
    methods: {
        removeNote(index){
            console.log(`Removed index is ${index}`)
            this.$emit('remove' , index)
        }
    },
}
</script>

<style lang="scss">
.notes{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 40px 0px
}
.note{
    width: 48%;
    padding: 18px 20px;
    margin-bottom: 20px;
    background-color: #ffffff;

    &.full{
        width: 100%;
    }
}
.note--header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1{
        font-size: 32px;
    }
    p{
        color:#402caf;
        font-size: 20px;
    }
    svg{
        margin-right: 12px;
        color:#999999;
        &.active{
          color:#402caf
        }
        &:last-child {
            margin-right: 0px;
        }
    }
}
.note--body{
    p{
        margin:20px 0;
    }
    span{
        font-size: 14px;
        color: #999999;
    }
}
    
</style>