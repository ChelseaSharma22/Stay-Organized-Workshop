" use strict "

// Fetch data from the API endpoint
fetch('http://localhost:8083/api/users')
    .then(response => response.json())
    .then(data => {
        const dropdown = document.getElementById('nameDropdown');

        // Clear the initial "Loading names..." option
        dropdown.innerHTML = '';

        // Populate the dropdown options with user names
        data.forEach(user => {
            const option = document.createElement('option');
            option.text = user.name;
            dropdown.add(option);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });

    fetch('http://localhost:8083/api/categories')
    
    .then(response => response.json())
    .then(data => {
        const dropdown = document.getElementById('categoryDropdown');

        // Clear the initial "Loading names..." option
        dropdown.innerHTML = '';

        // Populate the dropdown options with user names
        data.forEach(category => {
            const option = document.createElement('option');
            option.text = category.name;
            dropdown.add(option);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });



// Function to fetch user names from the API
function fetchUserNames() {
    fetch('http://localhost:8083/api/users')
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to fetch user names');
        }
      })
      .then(function (data) {
        const nameDropdown = document.getElementById('nameDropdown');
        nameDropdown.innerHTML = '';
  
        data.forEach(function (user) {
          const option = document.createElement('option');
          option.value = user.id;
          option.textContent = user.name;
          nameDropdown.appendChild(option);
        });
      })
      .catch(function (error) {
        console.error('Failed to fetch user names:', error);
      });
  }
  
  // Function to fetch category names from the API
  function fetchCategoryNames() {
    fetch('http://localhost:8083/api/categories')
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to fetch category names');
        }
      })
      .then(function (data) {
        const categoryDropdown = document.getElementById('categoryDropdown');
        categoryDropdown.innerHTML = '';
  
        data.forEach(function (category) {
          const option = document.createElement('option');
          option.value = category.name;
          option.textContent = category.name;
          categoryDropdown.appendChild(option);
        });
      })
      .catch(function (error) {
        console.error('Failed to fetch category names:', error);
      });
  }
  
  // Function to handle the "Add ToDo" button click event
  function handleAddTodo() {
    const userId = document.getElementById('nameDropdown').value;
    const category = document.getElementById('categoryDropdown').value;
    const description = document.getElementById('descriptionInput').value;
    const deadline = document.getElementById('deadlineInput').value;
    const priority = document.getElementById('priorityDropdown').value;
  
    const formData = new URLSearchParams();
    formData.append('userid', userId);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('deadline', deadline);
    formData.append('priority', priority);
  
    fetch('http://localhost:8083/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to add ToDo');
        }
      })
      .then(function (data) {
        console.log('ToDo added successfully:', data);
        // Reset the form fields
        document.getElementById('descriptionInput').value = '';
        document.getElementById('deadlineInput').value = '';
        
      })
      .catch(function (error) {
        console.error('Failed to add ToDo:', error);
        
      });
  }
  
  // Event listener for the button 
  const addTodoButton = document.getElementById('addTodoButton');
  addTodoButton.addEventListener('click', handleAddTodo);
  
  
  fetchUserNames();
  fetchCategoryNames();
  