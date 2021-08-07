var c = document.getElementById("crossSection");
var ctx = c.getContext("2d");

/*function drawTrack(angle, length) {
    ctx.moveTo(250,250);
    ctx.lineTo(250+length*Math.cos(angle),250-length*Math.sin(angle));
    ctx.stroke();
}
drawDisplay();
drawTrack(-3.061, 150);*/

class CrossSection {
    constructor() {
        this.canvas = document.getElementById("crossSection"); // bind the HTML element to the object *FUTURE: pass as parameter
        this.context = this.canvas.getContext("2d"); // return a drawing frame object
        this._tracks = [];
        this.drawAll(); // initial redraw
    }
    get dimensions() { // simple getter to give the (current) canvas dimensions
        return [this.canvas.width,this.canvas.height]
    }
    get centre() { // simple getter to give the (current) geometric centre of the canvas
        return [this.canvas.width/2,this.canvas.height/2]
    }
    get tracks() {
        return this._tracks
    }
    bindTracks(endpointFunction) { // bind the tracks property to an external function
        Object.defineProperty(this, 'tracks', { get: endpointFunction })
    }
    drawAll() { // function to redraw all elements of the canvas
        this.context.clearRect(0, 0, ...this.dimensions) // clear the display before starting
        this.plotDisplay(); // redraw the display
        this.tracks.forEach(item => this.plotTrack(item.phi, item.length));
        this.context.stroke(); // actually draw on the canvas
    }
    plotDisplay() { // function to draw the display of the detector
        this.context.beginPath(); // place our circle in a path
        this.context.arc(
            ...this.centre, // the centre of the circle is the centre of the canvas; unpack to x and y coord.s
            Math.min(...this.dimensions)/2, // the diameter of the circle is half the shortest side length of the canvas
            0, 2*Math.PI // draw an arc through 360 deg.
            );
        this.context.closePath(); // finish the path
    }
    plotTrack(angle, length) { // funcrion to plot a simple track in the display
        this.context.moveTo(...this.centre); // move the cursor to the centre of the display
        this.context.lineTo(this.centre[0]+length*Math.cos(angle),this.centre[1]-length*Math.sin(angle)); // plot a line at the desired angle
    }
}