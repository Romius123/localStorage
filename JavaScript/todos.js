$(document).ready(function () {
    function validate() {
        //form validation
        var isValid = true;
        $('#information').html('');
        // if description is empty, note can't be added or edited.
        if (!$('#description').val()) {
            $('#information').append("<p class='alert'><strong>Warning!</strong> You left note empty</p>");
            isValid = false;
        }
        //if link is wrong, validation can't pass
        if ($('#link').val()) {
            if (!(new RegExp(/^[http?:\/\/]([a-z\-_0-9\/\:\.]+\.(jpg|jpeg|png|gif))/i).test($('#link').val()))) {
                $('#information').append("<p class='alert'>Wrong link to picture</p>");
                isValid = false;
            }
        }

        return isValid;
    }

    var manager = new NotesManager(new LocalStore());
    var notes = manager.getNotes();

    showLocalStorage(notes); // showing saved information in localStorage
    $('#form').hide();
    $('#add').click(function () {
        $('#add').hide();
        $('#form')[0].reset();
        $('#form').show();
        $('#note_id').val(null);
    });
    $('#save').click(function () {
        //checking validation while saving new note.
        if (!validate()) {
            return false;
        }


        if (!$('#note_id').val()) {
            //adding new note
            var note = new Note();
            note.description = $('#description').val();
            note.link = $('#link').val();
            console.log(note);
            manager.addNote(note);
            $('#form')[0].reset();
            $('#notes').html();
            $('#information').html("<p class='information'>New note has been added</p>");
        }
        else {
            // edit new note
            var note = manager.get($('#note_id').val());
            note.description = $('#description').val();
            note.link = $('#link').val();
            manager.updateNote($('#note_id').val(), note);

            $('#information').html("<p class='information'>Description has been edited</p>");
        }

        $('#form')[0].reset();
        $('#form').hide();
        showLocalStorage(manager.getNotes()); // showing information saved in localStorage.
        $('#add').show();
        return false;
    });
    //delete note
    $('#notes').on('click', '.delete', function () {
        manager.delete($(this).data('id'));
        $('#notes').html('');
        showLocalStorage(manager.getNotes());
    });

    //edit note
    $('#notes').on('click', '.edit', function () {
        $('#add').hide();
        var note = manager.get($(this).data('id'));
        $('#form').show();
        $('#description').val(note.description);
        $('#link').val(note.link);
        $('#note_id').val($(this).data('id'))
    })

    $('#clear').click(function () {
        window.localStorage.clear();
        location.reload();
        return false;
    });
});