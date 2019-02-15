Render = {
  ctx: null,
  width: 0,
  height: 0
};

Render.setup = function (_ctx, _w, _h) {
  this.ctx = _ctx;
  this.width = _w;
  this.height = _h;
};

Render.clear = function () {
  this.ctx.fillStyle = '#666666';
  this.ctx.fillRect(0, 0, this.width, this.height);
};

Render.text = function (_str, _x, _y, _c, _fs, _fn, _a) {
  _c = _c || '#000000';
  _fs = _fs || 10;
  _fn = _fn || 'Arial';
  _a = _a || 'left';

  this.ctx.fillStyle = _c;
  this.ctx.font = _fs + 'px ' + _fn;
  this.ctx.textAlign = _a;
  this.ctx.fillText(_str, _x, _y);
};

Render.rect = function (_x, _y, _w, _h, _c) {
  _c = _c || '#000000';

  this.ctx.fillStyle = _c;
  this.ctx.fillRect(_x, _y, _w, _h);
};

Render.line = function (_sx, _sy, _ex, _ey, _c, _lw) {
  _c = _c || '#000000';
  _lw = _lw || 1;

  this.ctx.strokeStyle = _c;
  this.ctx.lineWidth = _lw;
  this.ctx.beginPath();
  this.ctx.moveTo(_sx, _sy);
  this.ctx.lineTo(_ex, _ey);
  this.ctx.closePath();
  this.ctx.stroke();
};

Render.circle = function (_x, _y, _r, _c) {
  _c = _c || '#000000';

  this.ctx.fillStyle = _c;
  this.ctx.beginPath();
  this.ctx.arc(_x, _y, _r, 0, 360);
  this.ctx.closePath();
  this.ctx.fill();
};

Render.wireframePolygon = function (_p1, _p2, _p3, _p4, _c) {
  _c = _c || '#000000';

  this.ctx.strokeStyle = _c;
  this.ctx.lineWidth = 0.5;
  this.ctx.beginPath();
  this.ctx.moveTo(_p1.x, _p1.y);
  this.ctx.lineTo(_p2.x, _p2.y);
  this.ctx.lineTo(_p3.x, _p3.y);
  this.ctx.lineTo(_p4.x, _p4.y);
  this.ctx.closePath();
  this.ctx.stroke();
};

Render.solidTriangle = function (_p1, _p2, _p3, _c) {
  _c = _c || '#000000';

  this.ctx.fillStyle = _c;
  this.ctx.beginPath();
  this.ctx.moveTo(_p1.x, _p1.y);
  this.ctx.lineTo(_p2.x, _p2.y);
  this.ctx.lineTo(_p3.x, _p3.y);
  this.ctx.closePath();
  this.ctx.fill();
};
