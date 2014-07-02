
var _running = true;
var intervalId; // the variable that holds the game loop mechanism ?
var FPS = 50;

var ROWS = 8;
var COLS = 8;
var cur_col = 0;
var prev_col = 7;
var ms = 0;
var oldms = 0;

var tiles = new Array();
var tone = new Array();

window.onload = function setup() {
    tone[0] = T("sin", {freq: 523.25, mul:0.06});
    tone[1] = T("sin", {freq: 587.33, mul:0.06});
    tone[2] = T("sin", {freq: 659.25, mul:0.06});
    tone[3] = T("sin", {freq: 698.46, mul:0.06});
    tone[4] = T("sin", {freq: 783.99, mul:0.06});
    tone[5] = T("sin", {freq: 880.00, mul:0.06});
    tone[6] = T("sin", {freq: 987.77, mul:0.06});
    tone[7] = T("sin", {freq:1046.50, mul:0.06});

    var row = document.createElement("tr");
    var cell = document.createElement("td");

    var rowid;
    var cellid;


    // full row id example: row|3
    // full cell id example: cell|3,3

    for (var r = 0; r < ROWS; r++) {
        tiles[r] = new Array();
        for (var c = 0; c < COLS; c++) {
            tiles[r][c] = false;
        }
    }


    for (var r = 0; r < ROWS; r++) {
        rstring = r.toString();
        rowid = "row|".concat(r.toString());
        row.setAttribute("id",rowid);
        document.getElementById("matrix-holder").appendChild(row);
        // tiles[r] = new Array();
        for (var c = 0; c < COLS; c++) {
            // tiles[r][c] = false; // initializes tile to not pressed
            cellid = "cell|".concat(r.toString()).concat(",").concat(c.toString());
            cell = document.createElement("td");

            cell.setAttribute("id",cellid);
            cell.setAttribute("class","tile off");
            cell.onclick = function() {
                alert(r.toString().concat(c.toString()));
                var row = r;
                var col = c;
                alert(tiles[row][col]);
                // if (tiles[r][c]) {
                //     tiles[r][c] = false;
                // } else {
                //     tiles[r][c] = true;
                // }
            }

            document.getElementById(rowid).appendChild(cell);

        }
        row = document.createElement("tr");
    }

    // starts game loop after everything is initialized.
    intervalId = setInterval(game_loop, 1000/FPS);
}

function game_loop() { // loops through each row (tile) in cur_col
    var date = new Date();
    ms = date.getTime();

    if (ms - oldms >= 250) {
        for (var r = 0; r < ROWS; r++) {
            var cur_tile = document.getElementById("cell|".concat(r.toString()).concat(",").concat(cur_col.toString()));
            if (tiles[r][cur_col]) {
                cur_tile.setAttribute("class","on tile");
                T("perc", {r:500}, tone[r]).on("ended", function() {
                    this.pause();
                }).bang().play();

            }
            // document.getElementById("cell|".concat(r.toString()).concat(",").concat(cur_col.toString())).setAttribute("class","tile on");
            document.getElementById("cell|".concat(r.toString()).concat(",").concat(prev_col.toString())).setAttribute("class","tile off");
        }
        oldms = ms;
        prev_col = cur_col;
        cur_col = cur_col + 1;
        if (cur_col > 7) {
            cur_col = 0;
            prev_col = 7;
        }
    }

}
