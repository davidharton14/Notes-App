<template>
  <v-layout row wrap justify-center align-center id="main">
    <v-app-bar app color="error">
      <h1 class="white--text">Welcome {{user.name}}</h1>
    <v-layout row wrap justify-end>
      <v-btn color="error lighten-1" fab @click="newNote=true">
        <v-icon>mdi-plus-thick</v-icon>
      </v-btn>  
    
    </v-layout>
    </v-app-bar>
    <v-layout row wrap justify-center align-start>
      <v-card class="asd" v-drag width="300" v-for="(note, index) in notes" :key="index">
        
        <v-card-text outlined color="red">
          
          <h3>{{ note.title }}</h3>
          <p>{{ note.content }}</p>
          <v-btn :color="note.state ? 'success' : 'error'" fab small>
            <v-icon v-if="note.state">mdi-check</v-icon>
            <v-icon v-else>mdi-close</v-icon>
          </v-btn>
          <v-btn
            class="ml-2"
            color="primary"
            fab
            small
            @click="noteToEdit(index)"
          >
            <v-icon color="white">mdi-square-edit-outline</v-icon>
          </v-btn>
          <v-btn
            class="ml-2"
            color="primary"
            fab
            small
            @click="
              deleteNotToAsk = true;
              noteId = note._id;
            "
          >
            <v-icon color="white">mdi-delete</v-icon>
          </v-btn>
          <v-btn class="ml-2"
            color="primary"
            fab
            small
            @click="chooseColor=true">
            <v-icon color="white">mdi-palette</v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
      <v-dialog v-model="newNote" :overlay="false" max-width="500px" transition="scale-transition">
      <v-card>
        <v-card-text>
          <v-text-field label="Title" v-model="noteToCreate.title"></v-text-field>
          <v-textarea auto-grow label="Content" v-model="noteToCreate.content"></v-textarea>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" @click="createNote()">Create note</v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
      <template>
        <div class="text-center">
          <v-dialog v-model="deleteNotToAsk" width="500">
            <v-card class="pa-4">
              <v-card-text>
              <h3>Are you sure?</h3>
              </v-card-text>
              <v-card-actions>
              <v-btn color="success" @click="deleteNote(notes._id)">Yes</v-btn>
              <v-btn color="error" @click="deleteNotToAsk = false"
                >Cancel</v-btn
              >
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialog" width="500">
            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                <h3 align-center>Editeaza nota</h3>
                <v-btn color="primary" text @click="dialog = false"> </v-btn>
              </v-card-title>
              <v-card-text>
                <v-text-field
                  label="Title"
                  v-model="noteEdit.title"
                ></v-text-field>
                <v-text-field
                  label="Content"
                  v-model="noteEdit.content"
                ></v-text-field>
                <v-btn color="error" @click="noteEdit.state = true">DONE</v-btn>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="updateNote(noteEdit._id)"
                  >Update note</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="chooseColor" width="500">
            <v-card class="pa-4">
              <v-card-text>
              <h3>Choose your color card</h3>
              <div class="theme-option">
              <div id="theme-blue"></div>
              <div id="theme-red"></div>
              <div id="theme-yellow"></div>
              <div id="theme-grey"></div>
              </div>
              
              </v-card-text>
              <v-card-actions>
              <v-btn color="success" @click="deleteNote(notes._id)">Yes</v-btn>
              <v-btn color="error" @click="deleteNotToAsk = false"
                >Cancel</v-btn
              >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </template></v-layout
    ></v-layout
  >
  
</template>
    
    </v-layout>
  </v-layout>
</template>

<script>
import axios from "axios";
import draggable from 'vuedraggable'
export default {
  data() {
    return {
      user: new Object(),
      notes: [],
      deleteNotToAsk: false,
      noteEdit: new Object(),
      dialog: false,
      noteId: null,
      newNote: false,
      noteToCreate:new Object(),
      chooseColor:false
    };
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getNotes();
  },
  methods: {
    getNotes() {
      var id = this.user._id;
      axios.get(`http://localhost:8083/api/notes/${id}`).then((res) => {
        this.notes = res.data.notes;
      });
    },
    updateNote(id) {
      let data = {
        title: this.noteEdit.title,
        content: this.noteEdit.content,
        state: this.noteEdit.state,
      };
      axios.put(`http://localhost:8083/api/notes/${id}`, data).then((res) => {
        console.log(res.data.message);
        this.getNotes();
      });
      this.dialog = false;
    },
    noteToEdit(index) {
      this.dialog = true;
      this.noteEdit = this.notes[index];
    },
    deleteNote() {
      let id = this.noteId;
      axios.delete(`http://localhost:8083/api/notes/${id}`).then((res) => {
        console.log(res.data.message);
        this.getNotes();
        this.deleteNotToAsk = false;
      });
    },
    createNote(){
      let data={
        title:this.noteToCreate.title,
        content:this.noteToCreate.content
      }
      let userId=this.user._id
      axios.post(`http://localhost:8083/api/notes/${userId}`,data)
      .then((res)=>{
         console.log(res.data.message)
         this.newNote=false
         this.getNotes()
      })
  },
},
 components: {
    draggable,
}
}
</script>

<style scoped>
#main {
  min-height: 100vh;
}
.asd {
  border-left
  : 5px solid red !important;
}
.theme-blue{
  color:blue;
}
</style>