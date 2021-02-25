// Name generator for posse page
var adj = ["Bushwackin","Contemptable","Courageous","Lawless","Nefarious","Notorious",
            "Persistent","Prospecting","Quarrellsome","Rebellious","Reckless","Unscrupulous","Unorthodox",
            "Villainous","Weary","Zealous"]

var n = ["Buckaroos", "Cowpokes", "Cowboys", "Bandits", "Sheriffs", "Troublemakers", "Ne'er Do Wells",
            "Moonshiners", "Hunters", "Rogues", "Vagrants"]

function generateName() {
    var adjective = Math.floor(Math.random() * (adj.length - 1))
    var noun = Math.floor(Math.random() * (n.length - 1))
    var nameSpan = document.getElementById("posseName");
    nameSpan.innerHTML = `${adj[adjective]} ${n[noun]}`;
}
