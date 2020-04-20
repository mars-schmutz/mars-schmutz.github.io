var editID = null;
var officers = null;

// views
var userView = document.querySelector('#userView');
var dash = document.querySelector('#dash');
var whoami = document.querySelector("#whoami");

// add officer fields
var officerNameInput = document.querySelector('#officerName');
var officerRankInput = document.querySelector('#officerRank');
var officerStationInput = document.querySelector('#officerStation');
var officerShipInput = document.querySelector('#officerShip');
var officerSpeciesInput = document.querySelector('#officerSpecies');
var addBtn = document.querySelector('#addBtn');
var updateMember = document.querySelector('#updateMember');

// register user fields
var userFName = document.querySelector("#fName");
var userLName = document.querySelector('#lName');
var userEmail = document.querySelector('#email');
var userPass = document.querySelector("#pass");
var registerBtn = document.querySelector("#registerBtn");

// login user fields
var username = document.querySelector("#username");
var password = document.querySelector("#password");
var loginBtn = document.querySelector('#loginBtn');

// Auth
registerBtn.onclick = function() {
    var fName = userFName.value;
    var lName = userLName.value;
    var email = userEmail.value;
    var pass = userPass.value;

    var data = 'fName=' + encodeURIComponent(fName);
    data += '&lName=' + encodeURIComponent(lName);
    data += '&email=' + encodeURIComponent(email);
    data += '&pass=' + encodeURIComponent(pass);

    fetch("http://localhost:8080/users", {
        method: 'POST',
        credentials: "include",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response) {
        if (response.status == 201) {
            var success = document.createElement('p');
            success.innerHTML = 'Your registration was successful! you can now log in';
            document.querySelector("#register").appendChild(success);
        } else {
            alert("Your username already exists");
        }
    })

    resetForm([userFName, userLName, userEmail, userPass]);
}

loginBtn.onclick = function() {
    var uName = username.value;
    var pass = password.value;

    var data = 'email=' + encodeURIComponent(uName);
    data += '&password=' + encodeURIComponent(pass);

    fetch("http://localhost:8080/sessions", {
        method: "POST",
        credentials: "include",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response) {
        console.log('login response here:');
        console.log(response);
        if (response.status == 201) {
            userView.classList.add("hidden")
            dash.classList.remove('hidden');
            console.log(response);
            handleLogInSwitch();
        } else {
            alert("Your username or password is incorrect! Try again");
            clearInputs([username, password]);
        }
    })
}

function deleteOfficerOnServer(oID) {
    fetch('http://localhost:8080/officers/' + oID, {
        method: "DELETE",
        credentials: 'include'
    }).then(function(response) {
        loadOfficers();
    });
}

updateMember.onclick = function() {
    var officerName = officerNameInput.value;
    var officerRank = officerRankInput.value;
    var officerStation = officerStationInput.value;
    var officerShip = officerShipInput.value;
    var officerSpecies = officerSpeciesInput.value;

    var data = 'name=' + encodeURIComponent(officerName);
    data += '&rank=' + encodeURIComponent(officerRank);
    data += '&station=' + encodeURIComponent(officerStation);
    data += '&ship=' + encodeURIComponent(officerShip);
    data += '&species=' + encodeURIComponent(officerSpecies);

    fetch('http://localhost:8080/officers/' + editID, {
        method: "PUT",
        credentials: "include",
        body: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(response) {
        loadOfficers();
    });

    resetForm([officerNameInput, officerRankInput, officerStationInput, officerShipInput, officerSpeciesInput]);
}

function resetForm(inputs) {
    // officerNameInput.value = '';
    // officerRankInput.value = '';
    // officerStationInput.value = '';
    // officerShipInput.value = '';
    // officerSpeciesInput.value = '';

    for (i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }

    addBtn.classList.remove('hidden');
    updateMember.classList.add('hidden');
}

function populateUpdate(name, rank, station, ship, species) {
    officerNameInput.value = name;
    officerRankInput.value = rank;
    officerStationInput.value = station;
    officerShipInput.value = ship;
    officerSpeciesInput.value = species;

    addBtn.classList.add('hidden');
    updateMember.classList.remove('hidden');
}

addBtn.onclick = function() {
    var officerName = officerNameInput.value;
    var officerRank = officerRankInput.value;
    var officerStation = officerStationInput.value;
    var officerShip = officerShipInput.value;
    var officerSpecies = officerSpeciesInput.value;

    var data = 'name=' + encodeURIComponent(officerName);
    data += '&rank=' + encodeURIComponent(officerRank);
    data += '&station=' + encodeURIComponent(officerStation);
    data += '&ship=' + encodeURIComponent(officerShip);
    data += '&species=' + encodeURIComponent(officerSpecies);

    fetch('http://localhost:8080/officers', {
        method: "POST",
        credentials: "include",
        body: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(response) {
        loadOfficers();
    });

    resetForm([officerNameInput, officerRankInput, officerStationInput, officerShipInput, officerSpeciesInput]);
}

function loadOfficers() {
    fetch('http://localhost:8080/officers', {
        credentials: "include"
    }).then(function(response) {
        response.json().then(function(officersFromServer) {
            officers = officersFromServer;

            var officersList = document.querySelector('#officers-list');
            officersList.innerHTML = '';
            officers.forEach(function(officer) {
                var listItem = document.createElement('li');
        
                var nameEl = document.createElement('div');
                nameEl.innerHTML = officer.name;
                nameEl.classList.add('name');
                listItem.appendChild(nameEl);

                var rankEl = document.createElement('div');
                rankEl.innerHTML = officer.rank;
                rankEl.classList.add('rank');
                listItem.appendChild(rankEl);

                var stationEl = document.createElement('div');
                stationEl.innerHTML = officer.station;
                stationEl.classList.add('station');
                listItem.appendChild(stationEl);

                var shipEl = document.createElement('div');
                shipEl.innerHTML = officer.ship;
                shipEl.classList.add('ship');
                listItem.appendChild(shipEl);

                var speciesEl = document.createElement('div');
                speciesEl.innerHTML = officer.species;
                speciesEl.classList.add('species');
                listItem.appendChild(speciesEl);
                
                var updateBtn = document.createElement('button');
                updateBtn.innerHTML = 'Update';
                updateBtn.classList.add('updateBtn');
                updateBtn.onclick = function() {
                    editID = officer.id;
                    populateUpdate(officer.name, officer.rank, officer.station, officer.ship, officer.species);
                };
                listItem.appendChild(updateBtn);

                var deleteBtn = document.createElement('button');
                deleteBtn.innerHTML = 'Delete';
                deleteBtn.classList.add('deleteBtn');
                deleteBtn.onclick = function() {
                    if (confirm(`Are you sure you want to delete ${officer.name}?`)) {
                        deleteOfficerOnServer(officer.id);
                    }
                };
                listItem.appendChild(deleteBtn);
                
                officersList.appendChild(listItem);
            });
        });
    })
}

// loadOfficers();

function displayDash() {
    userView.classList.add("hidden");
    dash.classList.remove("hidden");

    var name = document.querySelector("#user");
    fetch("http://localhost:8080/sessions", {
        credentials: 'include',
    }).then(function(response) {
        console.log("The response to get user name", response);
    })
}

function handleLogInSwitch() {
    console.log('called');
    fetch("http://localhost:8080/officers", {
        credentials: "include"
    }).then(function(response) {
        console.log(response);
        if (response.status == 200) {
            // show dash view
            displayDash();
            loadOfficers();
        } else if (response.status == 401) {
            console.log("you don't have access to this");
        }
    })
}

handleLogInSwitch();