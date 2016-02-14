function LocalStore(){
    this.notes = JSON.parse(localStorage.getItem('notes'));
    //localStorage can have only strings so we have to parse objects before add them.
    //it's parsing from strings to array of objects.
    if(this.notes == null){
        this.notes = new Array();
        //creating new array if localStorage was empty.
    }
    this.updateStore = function () {
        localStorage.setItem('notes', JSON.stringify(this.notes));
        //updating localStorage using json
    };
    this.save = function(note){
        this.notes.push(note);
        this.updateStore();
        //adding to array new notes and updating list.
    };
    this.getNotes = function(){
        return this.notes;
    };
    this.delete = function(id) {
        this.notes.splice(id,1); // deleting one object frin an array
        this.updateStore();
    };
    this.get = function(id){
        return this.notes[id];
    };
    this.update = function(id, note){
        this.notes[id] = note;
        this.updateStore();
    }
}
// with this class we can manage others types of saving data like Rest API.
function NotesManager(store){
    this.store = store;
    this.addNote = function(note){
        this.store.save(note);
    };
    this.getNotes = function(){
        return this.store.getNotes()
    };
    this.delete = function(id){
        this.store.delete(id);
    };
    this.get = function(id){
        return this.store.get(id);
    };
    this.updateNote = function(id,note) {
        this.store.update(id,note);
    }
}

function Note() {
   this.link = '';
   this.description = '';
}
// creating list of notes
var showLocalStorage = function (notes) {
    if (notes[0] != null) {
        $('#notes').html('');
        for (var i = 0, length = notes.length; i < length; i++) {
            var $li = $('<li>');
            var $deleteLink = $('<a>').attr('data-id', i).html('Delete').attr('class', 'delete').attr('href','#');
            var $editLink =$('<a>').attr('data-id', i).html('Edit').attr('class', 'edit').attr('href','#');
            $li.attr('id', i).html("<p>" + notes[i].description + "</p>");
            if (notes[i].link != "") {
                $li.append($('<div>').append($('<img>').attr('src', notes[i].link).attr('alt', notes[i].link)));
            }
            else
                $li.append($('<div>'));
            $li.append($editLink);
            $li.append($deleteLink);
            $('#notes').append($li);
        }
    }
};


