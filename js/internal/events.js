class Track {
    constructor({Sign, P, Pt, Phi, Theta}, length) {
        this.Sign = Sign;
        this.P = P;
        this.Pt = Pt;
        this.Phi = Phi;
        this.Theta = Theta;
        this.length = length;
    }
    get transverse() {
        return new polarVector2(this.Phi, this.length);
    }
}