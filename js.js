/** START */

var us = ["C", "D", "E", "F", "G", "A", "B"]
var fr = ["Do", "Ré", "Mi", "Fa", "Sol", "La", "Si"]

function lecture() {
    var max_accords = 0;
    var textArea = document.getElementById("tab");
    if (textArea.value != "") { // si le champs n'est pas 
        var tableauFinal = []; // array des lignes retenues
        var nblignes = 0; // pour compter les lignes non vides
        var tableauDeslignes = textArea.value.split("\n"); // on met lignes dans un array (tableauDeslignes)
        if (tableauDeslignes.length > 0) { // si le nombre de ligne est > 0
            for (i = 0; i < tableauDeslignes.length; i++) { // on boucle sur le nombre de lignes
                var accordsdelaligne = tableauDeslignes[i].split(' '); // on met les accords (groupes) dans un array ( accordsdelaligne )
                if (accordsdelaligne[0] != "") { // si le 1er des accords (groupes) de la ligne existe alors on compte la ligne et on fait un boucle
                    var accordFinal = []; // array des accords (groupes) retenues
                    for (j = 0; j < (accordsdelaligne.length); j++) { // on boucle sur le nombre d'accords (groupes)
                        accordsdelaligne[j] != "" ? accordFinal[j] = accordsdelaligne[j].charAt(0).toUpperCase() + accordsdelaligne[j].substring(1) : ""; // si le groupe traité n'est pas vide
                    }
                    tableauFinal[nblignes] = accordFinal; // on remplis la lignes avec les accords détéctés
                    nblignes++; //on compte la ligne
                }
                accordsdelaligne.length > max_accords ? max_accords = accordsdelaligne.length : "";
            }
        }
    }
    html_creator(tableauFinal, 'lesaccords', max_accords);
}

function html_creator(tableaudesAccords, tagId, maxcol) {
    //console.log(tableaudesAccords);
    let latotalhtml = "<table><tbody>";
    let note = "";
    let html_accords = ""; // pour stocker les images des accords en html
    let html_accordsA = ""; // pour stocker le nom des accords en html
    let typetab = 0;
    document.getElementById("fr2us").checked == true ? typetab = 1 : typetab = 2;
    for (let i = 0; i < tableaudesAccords.length; i++) {
        html_accordsA = "<tr>";
        html_accords = "<tr>";
        for (let j = 0; j < tableaudesAccords[i].length; j++) {
            note = transposition(tableaudesAccords[i][j], typetab);
            html_accordsA += "<td>" + tableaudesAccords[i][j] + "/" + note + "</td>";
            html_accords += "<td>" + html_img(transposition(tableaudesAccords[i][j], typetab + 2)) + "</td>";
        }
        for (let k = j; k <= maxcol; k++) {
            html_accordsA += "<td></td>";
            html_accords += "<td></td>";
        }
        if (i < (tableaudesAccords.length - 1)) {
            html_accords += "</tr>";
            html_accordsA += "</tr>";
        }
        latotalhtml += html_accordsA + html_accords
    }
    latotalhtml += "</tbody></table>";
    document.getElementById(tagId).innerHTML = latotalhtml;


}


function transposition(lanote, mode) {
    let lavrainote = 'absent';
    let toto = "";
    let bi = 0;
    for (bi = 0; bi < 7; bi++) {
        if (mode == 1) {
            if (lanote.search(fr[bi]) != -1) {
                toto = lanote.slice((fr[bi].length));
                lanote = us[bi] + toto;
                console.log(lanote + ' ' + mode);
                break;
            }
        } else if (mode == 2) {
            if (lanote.search(us[bi]) != -1) {
                toto = lanote.slice((us[bi].length));
                lanote = fr[bi] + toto;
                console.log(lanote + ' ' + mode);
                break;
            }

        } else if (mode == 3) {
            if (lanote.search(fr[bi]) != -1) {
                toto = lanote.slice((fr[bi].length));
                lanote = fr[bi] + toto;
                console.log(lanote + ' ' + mode);
                break;
            }

        } else if (mode == 4) {
            if (lanote.search(us[bi]) != -1) {
                toto = lanote.slice((us[bi].length));
                lanote = fr[bi] + toto;
                console.log(lanote + ' ' + mode);
                break;
            }

        }
    }
    return lanote;
}

function html_img(accord) {

    //document.getElementById("fr2us").checked == true ? accord = transposition(accord, 3) : accord = transposition(accord, 4);
    var temp_url = "accords/" + accord + ".jpg";
    var temp_var = '<img src="' + temp_url.replace("#", "%23") + '" title="' + accord + '.jpg" alt="' + accord + '.jpg" >'; //onerror="this.src=\'accords/vide.jpg\'"
    return temp_var;
}





window.onload = function() {
    localStorage.setItem("token", "650165168165216813514684843513843815132135181");
    localStorage.setItem("user", "Joker");
    //loadDoc()
    //var con_log = "";
    //var lasection = "AG1";
    //var nsection = 0;
    /*localStorage.getItem(user);*/
    refresh_affichage();
}

window.addEventListener('resize', function(event) {
    refresh_affichage();
});

function refresh_affichage() {
    var screen_H = window.innerHeight;
    var screen_W = window.innerWidth;
    document.getElementById("infossys").innerHTML = screen_W + "x" + screen_H;
    //document.getElementById("LESSECTIONS").style.width = "100%";
    //document.getElementById("navigation").style.width = "100%";
    //document.getElementById("LESSECTIONS").style.height = screen_H + "px";
    //document.getElementById("LESSECTIONS").style.width = ((j * 80) + (j * 10)) + "px";
    //document.getElementsByClassName()("SECTIONS").style.width = (screen_W / 187) + "px"; //187
}
/** --------------------------------------------------------------------------------------------------------------------- */