window.onload = function setup() {
    var row = document.createElement("tr");
    var cell = document.createElement("td");

    cell.setAttribute("class","tile");

    var rowid;
    var cellid;

    // full row id example: row|3
    // full cell id example: cell|3,3


    for (var r = 0; r < 10; r++) {
        rstring = r.toString();
        rowid = "row|".concat(r.toString());
        row.setAttribute("id",rowid);
        console.log("now doing: ".concat(rowid))
        document.getElementById("matrix-holder").appendChild(row);
        for (var c = 0; c < 10; c++) {
            cellid = "cell|".concat(r.toString()).concat(",").concat(c.toString());
            cell.setAttribute("id",cellid);
            console.log("now doing: ".concat(cellid));
            document.getElementById(rowid).appendChild(cell);
        }
    }
}
