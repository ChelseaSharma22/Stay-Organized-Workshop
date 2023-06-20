"use strict";

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

// Function to fetch user details based on the selected user ID
function fetchUserDetails(userId) {
    const userDetailsUrl = `http://localhost:8083/api/todos/byuser/${userId}`;

    fetch(userDetailsUrl)
        .then(response => response.json())
        .then(data => {
            // Display the user details in a table
            const tableBody = document.getElementById('userDetailsTableBody');
            tableBody.innerHTML = ''; // Clear previous data

            // Loop through the user details and create table rows
            data.forEach(detail => {
                const row = document.createElement('tr');

                // Create table cells for each detail property
                const idCell = document.createElement('td');
                idCell.textContent = detail.userid; // Modified line to use 'userId' property
                row.appendChild(idCell);

                const titleCell = document.createElement('td');
                titleCell.textContent = detail.category;
                row.appendChild(titleCell);

                const descriptionCell = document.createElement('td');
                descriptionCell.textContent = detail.description;
                row.appendChild(descriptionCell);

                const deadlineCell = document.createElement('td');
                deadlineCell.textContent = detail.deadline;
                row.appendChild(deadlineCell);

                const priorityCell = document.createElement('td');
                priorityCell.textContent = detail.priority;
                row.appendChild(priorityCell);

                const completedCell = document.createElement('td');
                const statusIcon = document.createElement('span');

                if (detail.completed) {
                    statusIcon.innerHTML = '&#x2713;'; // Checkmark symbol
                    statusIcon.style.color = 'green'; // Set color to green
                } else {
                    statusIcon.innerHTML = '&#x2717;'; // Cross mark symbol
                    statusIcon.style.color = 'red'; // Set color to red
                }

                completedCell.appendChild(statusIcon);
                row.appendChild(completedCell);

                const deleteCell = document.createElement('td');
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', handleDelete);
                deleteCell.appendChild(deleteButton);
                row.appendChild(deleteCell);

                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Event listener for the dropdown change event
document.getElementById('nameDropdown').addEventListener('change', function () {
    const selectedUserName = this.value; // Get the selected user name
    const usersDataUrl = 'http://localhost:8083/api/users';

    fetch(usersDataUrl)
        .then(response => response.json())
        .then(data => {
            // Find the selected user ID based on the user name
            const selectedUser = data.find(user => user.name === selectedUserName);
            if (selectedUser) {
                const selectedUserId = selectedUser.id;
                fetchUserDetails(selectedUserId);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

function handleDelete(event) {
    // Remove the corresponding table row
    const row = event.target.closest('tr');
    row.remove();

    // Get the user ID associated with the deleted row
    const userId = row.querySelector('td:first-child').textContent;

    // Send a DELETE request to the API server to delete the user
    const deleteUserUrl = `http://localhost:8083/api/todos/byuser/${userId}`;
    fetch(deleteUserUrl, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            console.log('User deleted successfully.');
        } else {
            console.error('Error deleting user:', response.status);
        }
    })
    .catch(error => {
        console.error('Error deleting user:', error);
    });
}