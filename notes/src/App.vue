<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <section>
        <div class="container">

        <!--Title-->
        <h1>{{ title }}</h1>

         <!--Message-->
        <message v-if="message" :message="message"/>

        <!--Newnote-->
        <NewNote :note="note" @addNote="addNote"/>

        <!--notes-->
         <notes :notes = "notes" @remove="removeNote" />
        </div>
      </section>

    </div>
  </div>
</template>

<script>
import message from '@/components/Message.vue'
import newNote from '@/components/NewNote.vue'
import notes from '@/components/Notes.vue'
  export default {
    components: {
      message: message,
      NewNote: newNote,
      Notes: notes
    },
     data() {
       return {
         title: 'Notes App',
                message: null,
                note:{
                    title: '',
                    descr:''
                },
                notes: [{
                        title: 'First note',
                        descrition: 'Description for first note',
                        date: new Date(Date.now()).toLocaleString()
                    },
                    {
                        title: 'Second note',
                        descrition: 'Description for Second note',
                        date: new Date(Date.now()).toLocaleString()
                    },
                    {
                        title: 'Third note',
                        descrition: 'Description for Third note',
                        date: new Date(Date.now()).toLocaleString()
                    }
                ]
       }
     },
     methods: {
                addNote(){
                    let { title , descr } = this.note
                    if(title === '') {
                        this.message = `title can't be empty`
                        return false
                    }
                    this.notes.push({
                        title: title,
                        descrition: descr,
                        date: new Date(Date.now()).toLocaleString()
                    })
                    this.message = null;
                    this.note.title = '';
                    this.note.descr = '';
                },
                removeNote(index){
                     this.notes.splice(index,1)
                }
            }, 
  }
</script>

<style>
</style>