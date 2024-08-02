$(document).ready(function() {
    // Add task to the list
    $('#addTaskBtn').on('click', function() {
        const taskInput = $('#taskInput');
        const taskText = taskInput.val().trim();

        if (taskText !== '') {
            const newTask = $('<li>').append($('<span>').text(taskText));
            newTask.append('<button class="editBtn">Edit</button>');
            newTask.append('<button class="deleteBtn">Delete</button>');
            $('#taskList').append(newTask);
            taskInput.val('');
        }
    });

    // Edit task in the list
    $(document).on('click', '.editBtn', function() {
        const listItem = $(this).parent();
        const taskTextElement = listItem.find('span');
        const taskText = taskTextElement.text().trim();
        const newText = prompt('Edit the task:', taskText);

        if (newText !== null && newText.trim() !== '') {
            taskTextElement.text(newText);
        }
    });

    // Delete task from the list
    $(document).on('click', '.deleteBtn', function() {
        $(this).parent().remove();
    });
});
