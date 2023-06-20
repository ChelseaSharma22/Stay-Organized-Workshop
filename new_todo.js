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



