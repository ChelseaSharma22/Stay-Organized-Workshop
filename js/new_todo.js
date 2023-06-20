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
        return namedata = data
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
// Function to send a POST request
async function sendPostRequest(url, data) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const responseData = await response.json();
      console.log('Success:', responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  const todoform = document.getElementById("newtodo");
  todoform.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
  
    // Get the selected user name from the dropdown
    const selectedUserName = document.getElementById('nameDropdown').value;
  
    // Find the user ID based on the selected user name
    const selectedUser = namedata.find(user => user.name === selectedUserName);
    if (!selectedUser) {
      console.error('User not found!');
      return;
    }
  
    // Get the user ID from the selected user
    const selectedUserId = selectedUser.id;
  
    // Get the other form input values
    const category = document.getElementById('categoryDropdown').value;
    const priority = document.getElementById('priorityDropdown').value;
    const description = document.getElementById('descriptionInput').value;
    const deadline = document.getElementById('deadlineInput').value;
  
    // Construct the data object for the POST request
    const data = {
      userid: selectedUserId,
      category: category,
      priority: priority,
      description: description,
      deadline: deadline,
    };
  
    // Send the POST request
    sendPostRequest('http://localhost:8083/api/todos', data);
  });
 
 


