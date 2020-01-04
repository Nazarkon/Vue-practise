<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <section>
        <div class="container">


          <!--Message-->
          <message v-if="message" :message="message" />

          <!--Newnote-->
          <NewNote :note="note" @addNote="addNote" />

          
          <div class="note--header">
            <!--Title-->
            <h1>{{ title }}</h1>
             <p>{{search}}</p>
            <search :value="search" 
            placeholder="Find Your Node" 
            @search="search = $event" />


            <!-- icons controls -->

            <div class="icons"><svg @click="grid=true" :class="{ active: grid}" style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
               <svg @click="grid=false" :class="{ active: !grid}" style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3" y2="6"></line>
              <line x1="3" y1="12" x2="3" y2="12"></line>
              <line x1="3" y1="18" x2="3" y2="18"></line>
            </svg>
            </div>
          </div>

          <!--notes-->
          <notes :notes="notesFilter" :grid="grid" @remove="removeNote" />
        </div>
      </section>

    </div>
  </div>
</template>

<script>
  import message from '@/components/Message.vue'
  import newNote from '@/components/NewNote.vue'
  import notes from '@/components/Notes.vue'
  import search from '@/components/Search.vue'
  export default {
    components: {
      message: message,
      NewNote: newNote,
      Notes: notes,
      search: search
    },
    data() {
      return {
        title: 'Notes App',
        search: '',
        message: null,
        grid: true,
        note: {
          title: '',
          descr: ''
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
    computed:{
      notesFilter () {
        let array = this.notes,
         search = this.search
         if(!search){
           return array
         }
         search = search.trim().toLowerCase();

         array = array.filter(function (item) {
           if(item.title.toLowerCase().indexOf(search) !== -1){
             return item
           }
         })

         return array
      }
    },
    methods: {
      addNote() {
        let {
          title,
          descr
        } = this.note
        if (title === '') {
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
      removeNote(index) {
        this.notes.splice(index, 1)
      }
    },
  }
</script>

<style>
</style>