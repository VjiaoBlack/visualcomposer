
var _running = true;
var intervalId = setInterval(game_loop, 1000/FPS);
var FPS = 50;

var ROWS = 8;
var COLS = 8;
var cur_col = 0;
var prev_col = 7;
var ms = 0;
var oldms = 0;


window.onload = function setup() {
    var row = document.createElement("tr");
    var cell = document.createElement("td");

    var rowid;
    var cellid;

    // full row id example: row|3
    // full cell id example: cell|3,3


    for (var r = 0; r < ROWS; r++) {
        rstring = r.toString();
        rowid = "row|".concat(r.toString());
        row.setAttribute("id",rowid);
        document.getElementById("matrix-holder").appendChild(row);
        for (var c = 0; c < COLS; c++) {
            cellid = "cell|".concat(r.toString()).concat(",").concat(c.toString());
            cell.setAttribute("id",cellid);
            document.getElementById(rowid).appendChild(cell);
            cell = document.createElement("td");
            cell.setAttribute("class","off tile");
        }
        row = document.createElement("tr");
    }

}

function game_loop() {
    var date = new Date();
    ms = date.getTime();
    console.log(ms);
    if (ms - oldms >= 250) {
        for (var r = 0; r < ROWS; r++) {
            document.getElementById("cell|".concat(r.toString()).concat(",").concat(cur_col.toString())).setAttribute("class","on tile");
            document.getElementById("cell|".concat(r.toString()).concat(",").concat(prev_col.toString())).setAttribute("class","off tile");
        }
        oldms = ms;
        prev_col = cur_col;
        cur_col = cur_col + 1;
        console.log(cur_col);
        if (cur_col > 7) {
            cur_col = 0;
            prev_col = 7;
        }
    }

}
