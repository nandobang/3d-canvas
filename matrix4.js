function Matrix4(_a1, _a2, _a3, _a4, _b1, _b2, _b3, _b4, _c1, _c2, _c3, _c4, _d1, _d2, _d3, _d4) {
  this.values = [
    _a1 || 0, _a2 || 0, _a3 || 0, _a4 || 0,
    _b1 || 0, _b2 || 0, _b3 || 0, _b4 || 0,
    _c1 || 0, _c2 || 0, _c3 || 0, _c4 || 0,
    _d1 || 0, _d2 || 0, _d3 || 0, _d4 || 0
  ];

  this.row = function (_i) {
    var r = _i * 4;

    return [this.values[0 + r], this.values[1 + r], this.values[2 + r], this.values[3 + r]];
  };

  this.col = function (_i) {
    return [this.values[0 + _i], this.values[4 + _i], this.values[8 + _i], this.values[12 + _i]];
  };

  this.val = function (_r, _c, _v) {
    var r = _r * 4;

    if (_v) {
      this.values[r + _c] = _v;
    } else {
      return this.values[r + _c];
    }
  };

  this.toIdentity = function () {
    for (var n in this.values) {
      this.values[n] = 0;
    }

    this.val(0, 0, 1);
    this.val(1, 1, 1);
    this.val(2, 2, 1);
    this.val(3, 3, 1);

    return this;
  };

  this.add = function (_m) {
  };

  this.subtract = function (_m) {
  };

  this.scale = function (_s) {
  };

  this.transpose = function () {
    /*
    var buffer = createMatrix(m[0].length, m.length);

    for (var line = 0; line < buffer.length; line++) {
      for (var column = 0; column < buffer[0].length; column++) {
        buffer[line][column] = m[column][line];
      }
    }

    return buffer;
    */
  };

  this.multiply = function (_m) {
    var a1 = (this.val(0, 0) * _m.val(0, 0)) + (this.val(0, 1) * _m.val(1, 0)) + (this.val(0, 2) * _m.val(2, 0)) + (this.val(0, 3) * _m.val(3, 0));
    var a2 = (this.val(0, 0) * _m.val(0, 1)) + (this.val(0, 1) * _m.val(1, 1)) + (this.val(0, 2) * _m.val(2, 1)) + (this.val(0, 3) * _m.val(3, 1));
    var a3 = (this.val(0, 0) * _m.val(0, 2)) + (this.val(0, 1) * _m.val(1, 2)) + (this.val(0, 2) * _m.val(2, 2)) + (this.val(0, 3) * _m.val(3, 2));
    var a4 = (this.val(0, 0) * _m.val(0, 3)) + (this.val(0, 1) * _m.val(1, 3)) + (this.val(0, 2) * _m.val(2, 3)) + (this.val(0, 3) * _m.val(3, 3));
    var b1 = (this.val(1, 0) * _m.val(0, 0)) + (this.val(1, 1) * _m.val(1, 0)) + (this.val(1, 2) * _m.val(2, 0)) + (this.val(1, 3) * _m.val(3, 0));
    var b2 = (this.val(1, 0) * _m.val(0, 1)) + (this.val(1, 1) * _m.val(1, 1)) + (this.val(1, 2) * _m.val(2, 1)) + (this.val(1, 3) * _m.val(3, 1));
    var b3 = (this.val(1, 0) * _m.val(0, 2)) + (this.val(1, 1) * _m.val(1, 2)) + (this.val(1, 2) * _m.val(2, 2)) + (this.val(1, 3) * _m.val(3, 2));
    var b4 = (this.val(1, 0) * _m.val(0, 3)) + (this.val(1, 1) * _m.val(1, 3)) + (this.val(1, 2) * _m.val(2, 3)) + (this.val(1, 3) * _m.val(3, 3));
    var c1 = (this.val(2, 0) * _m.val(0, 0)) + (this.val(2, 1) * _m.val(1, 0)) + (this.val(2, 2) * _m.val(2, 0)) + (this.val(2, 3) * _m.val(3, 0));
    var c2 = (this.val(2, 0) * _m.val(0, 1)) + (this.val(2, 1) * _m.val(1, 1)) + (this.val(2, 2) * _m.val(2, 1)) + (this.val(2, 3) * _m.val(3, 1));
    var c3 = (this.val(2, 0) * _m.val(0, 2)) + (this.val(2, 1) * _m.val(1, 2)) + (this.val(2, 2) * _m.val(2, 2)) + (this.val(2, 3) * _m.val(3, 2));
    var c4 = (this.val(2, 0) * _m.val(0, 3)) + (this.val(2, 1) * _m.val(1, 3)) + (this.val(2, 2) * _m.val(2, 3)) + (this.val(2, 3) * _m.val(3, 3));
    var d1 = (this.val(3, 0) * _m.val(0, 0)) + (this.val(3, 1) * _m.val(1, 0)) + (this.val(3, 2) * _m.val(2, 0)) + (this.val(3, 3) * _m.val(3, 0));
    var d2 = (this.val(3, 0) * _m.val(0, 1)) + (this.val(3, 1) * _m.val(1, 1)) + (this.val(3, 2) * _m.val(2, 1)) + (this.val(3, 3) * _m.val(3, 1));
    var d3 = (this.val(3, 0) * _m.val(0, 2)) + (this.val(3, 1) * _m.val(1, 2)) + (this.val(3, 2) * _m.val(2, 2)) + (this.val(3, 3) * _m.val(3, 2));
    var d4 = (this.val(3, 0) * _m.val(0, 3)) + (this.val(3, 1) * _m.val(1, 3)) + (this.val(3, 2) * _m.val(2, 3)) + (this.val(3, 3) * _m.val(3, 3));

    var m = new Matrix4(
      a1, a2, a3, a4,
      b1, b2, b3, b4,
      c1, c2, c3, c4,
      d1, d2, d3, d4
    );

    return m;
  };

  this.toString = function () {
    return this.row(0).join(', ') + "\n" + this.row(1).join(', ') + "\n" + this.row(2).join(', ') + "\n" + this.row(3).join(', ');
  };
}