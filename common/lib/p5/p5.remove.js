p5.Graphics.prototype.remove = function () {
  if (this.elt.parentNode) {
    this.elt.parentNode.removeChild(this.elt);
  }
  var idx = this._pInst._elements.indexOf(this);
  if (idx !== -1) {
    this._pInst._elements.splice(idx, 1);
  }
  for (var elt_ev in this._events) {
    this.elt.removeEventListener(elt_ev, this._events[elt_ev]);
  }
};