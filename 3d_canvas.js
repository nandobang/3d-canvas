(function () {
  var c = document.getElementById('main');
  var ctx = c.getContext('2d');
  var keysPressed = [];
  var polyBuffer = [];
  var fpsPrev = 0;
  var fps = 0;
  var perspTrans;

  var camPos = {x: 0, y: 30, z: -200};
  var camRot = {x: 0, y: 0, z: 0};
  var rot = {x: 0, y: 0, z: 0};

  var axis = [
    {x: 10, y: 0, z: 0},
    {x: 0, y: 10, z: 0},
    {x: 0, y: 0, z: 10}
  ];

  var squares = [];

  for (var x = -20; x < 20; x += 1) {
    for (var z = -20; z < 20; z += 1) {
      squares.push([
        {x: -10 + (20 * x), y: 0, z: -10 + (20 * z)},
        {x: 10 + (20 * x), y: 0, z: -10 + (20 * z)},
        {x: 10 + (20 * x), y: 0, z: 10 + (20 * z)},
        {x: -10 + (20 * x), y: 0, z: 10 + (20 * z)}
      ]);
    }
  }

  var cube = [
    {points: [{x: -5, y:  0, z:  5}, {x:  5, y:  0, z:  5}, {x:  5, y: 10, z:  5}], color: '#990000'}, // Front A
    {points: [{x: -5, y:  0, z:  5}, {x: -5, y: 10, z:  5}, {x:  5, y: 10, z:  5}], color: '#990000'}, // Front B
    {points: [{x: -5, y:  0, z: -5}, {x:  5, y:  0, z: -5}, {x:  5, y: 10, z: -5}], color: '#009900'}, // Back A
    {points: [{x: -5, y:  0, z: -5}, {x: -5, y: 10, z: -5}, {x:  5, y: 10, z: -5}], color: '#009900'}, // Back B
    {points: [{x: -5, y: 10, z: -5}, {x:  5, y: 10, z: -5}, {x:  5, y: 10, z:  5}], color: '#000099'}, // Top A
    {points: [{x: -5, y: 10, z: -5}, {x: -5, y: 10, z:  5}, {x:  5, y: 10, z:  5}], color: '#000099'}, // Top B
    {points: [{x: -5, y:  0, z: -5}, {x:  5, y:  0, z: -5}, {x:  5, y:  0, z:  5}], color: '#999900'}, // Bottom A
    {points: [{x: -5, y:  0, z: -5}, {x: -5, y:  0, z:  5}, {x:  5, y:  0, z:  5}], color: '#999900'}, // Bottom B
    {points: [{x: -5, y:  0, z: -5}, {x: -5, y: 10, z: -5}, {x: -5, y: 10, z:  5}], color: '#009999'}, // Left A
    {points: [{x: -5, y:  0, z: -5}, {x: -5, y:  0, z:  5}, {x: -5, y: 10, z:  5}], color: '#009999'}, // Left B
    {points: [{x:  5, y:  0, z: -5}, {x:  5, y: 10, z: -5}, {x:  5, y: 10, z:  5}], color: '#990099'}, // Right A
    {points: [{x:  5, y:  0, z: -5}, {x:  5, y:  0, z:  5}, {x:  5, y: 10, z:  5}], color: '#990099'} // Right B
  ];

  var triangle = [
    {points: [{x: -5, y: 0, z: -5}, {x: 5, y: 0, z: -5}, {x: 0, y: 10, z: 0}], color: '#990000'}, // Back
    {points: [{x: -5, y: 0, z: -5}, {x: 0, y: 0, z:  5}, {x: 0, y: 10, z: 0}], color: '#009900'}, // Left
    {points: [{x:  5, y: 0, z: -5}, {x: 0, y: 0, z:  5}, {x: 0, y: 10, z: 0}], color: '#000099'}, // Right
    {points: [{x: -5, y: 0, z: -5}, {x: 5, y: 0, z: -5}, {x: 0, y: 0, z: 5}], color: '#999900'} // Base
  ];

  function render() {
    Time.refresh();

    requestAnimationFrame(render);

    doLogic();

    // ---
    Render.clear();

    /*
    for (var i = 0; i < squares.length; i++) {
      var p1 = squares[i][0];
      var p2 = squares[i][1];
      var p3 = squares[i][2];
      var p4 = squares[i][3];

      p1 = applyScalingTransform(p1, {x: 1, y: 1, z: 1});
      p1 = applyRotationTransform(p1, {x: 0, y: 0, z: 0});
      p1 = applyTranslationTransform(p1, {x: 0, y: 0, z: 0});
      p1 = worldToCameraPoint(p1);

      p2 = applyScalingTransform(p2, {x: 1, y: 1, z: 1});
      p2 = applyRotationTransform(p2, {x: 0, y: 0, z: 0});
      p2 = applyTranslationTransform(p2, {x: 0, y: 0, z: 0});
      p2 = worldToCameraPoint(p2);

      p3 = applyScalingTransform(p3, {x: 1, y: 1, z: 1});
      p3 = applyRotationTransform(p3, {x: 0, y: 0, z: 0});
      p3 = applyTranslationTransform(p3, {x: 0, y: 0, z: 0});
      p3 = worldToCameraPoint(p3);

      p4 = applyScalingTransform(p4, {x: 1, y: 1, z: 1});
      p4 = applyRotationTransform(p4, {x: 0, y: 0, z: 0});
      p4 = applyTranslationTransform(p4, {x: 0, y: 0, z: 0});
      p4 = worldToCameraPoint(p4);

      var pp1 = worldPointToScreenPoint(p1);
      var pp2 = worldPointToScreenPoint(p2);
      var pp3 = worldPointToScreenPoint(p3);
      var pp4 = worldPointToScreenPoint(p4);

      if (pp1 && pp2 && pp3 && pp4) {
        Render.wireframePolygon(pp1, pp2, pp3, pp4, '#dddddd');
      }
    }
    */

    for (var i = 0; i < squares.length; i++) {
      var p1 = worldPointToScreenPoint((worldToCameraPoint(squares[i][0])));
      var p2 = worldPointToScreenPoint((worldToCameraPoint(squares[i][1])));
      var p3 = worldPointToScreenPoint((worldToCameraPoint(squares[i][2])));
      var p4 = worldPointToScreenPoint((worldToCameraPoint(squares[i][3])));

      if (p1 && p2 && p3 && p4) {
        Render.wireframePolygon(p1, p2, p3, p4, '#dddddd');
      }
    }

    // Creates a buffer for all polygons to be rendered.
    var polyBufferBuffer = [];

    // Converts all polygons to the camera's space and store them into the buffer.
    for (var i = 0; i < polyBuffer.length; i++) {
      var p = {points: [], color: ''};

      p.points[0] = worldToCameraPoint(polyBuffer[i].points[0]);
      p.points[1] = worldToCameraPoint(polyBuffer[i].points[1]);
      p.points[2] = worldToCameraPoint(polyBuffer[i].points[2]);
      p.color = polyBuffer[i].color;

      polyBufferBuffer.push(p);
    }

    // Sorts the polys by z-index so that far polygons get rendered first.
    ///*
    polyBufferBuffer.sort(function (a, b) {
      var aAverageZ = (a.points[0].z + a.points[1].z + a.points[2].z) / 3;
      var bAverageZ = (b.points[0].z + b.points[1].z + b.points[2].z) / 3;

      return bAverageZ - aAverageZ;
    });
    //*/

    // Fix polys with equal z-order, sorting them by their distance from the camera.
    ///*
    polyBufferBuffer.sort(function (a, b) {
      var cp = worldToCameraPoint(camPos);
      var aDistance = (Vector3.distanceBetween(cp, a.points[0]) + Vector3.distanceBetween(cp, a.points[1]) + Vector3.distanceBetween(cp, a.points[2])) / 3;
      var bDistance = (Vector3.distanceBetween(cp, b.points[0]) + Vector3.distanceBetween(cp, b.points[1]) + Vector3.distanceBetween(cp, b.points[2])) / 3;

      return bDistance - aDistance;
    });
    //*/

    // Render all the polys.
    for (var i = 0; i < polyBufferBuffer.length; i++) {
      var p1 = worldPointToScreenPoint((polyBufferBuffer[i].points[0]));
      var p2 = worldPointToScreenPoint((polyBufferBuffer[i].points[1]));
      var p3 = worldPointToScreenPoint((polyBufferBuffer[i].points[2]));
      var c = polyBufferBuffer[i].color;

      if (p1 && p2 && p3) {
        Render.solidTriangle(p1, p2, p3, c);
      }
    }

    // Render origin axis.
    var origin = worldPointToScreenPoint(worldToCameraPoint({x: 0, y: 0, z: 0}));
    var axisX = worldPointToScreenPoint(worldToCameraPoint(axis[0]));
    var axisY = worldPointToScreenPoint(worldToCameraPoint(axis[1]));
    var axisZ = worldPointToScreenPoint(worldToCameraPoint(axis[2]));

    if (origin) {
      if (axisX) Render.line(origin.x, origin.y, axisX.x, axisX.y, '#cc0000');
      if (axisY) Render.line(origin.x, origin.y, axisY.x, axisY.y, '#00cc00');
      if (axisZ) Render.line(origin.x, origin.y, axisZ.x, axisZ.y, '#0000cc');
    }

    var _keys = [];

    for (var i in keysPressed) {
      if (keysPressed[i]) {
        _keys.push(i);
      }
    }

    Render.text('Rotation X: ' + rot.x, 20, 20, '#333333');
    Render.text('Rotation Y: ' + rot.y, 20, 30, '#333333');
    Render.text('Rotation Z: ' + rot.z, 20, 40, '#333333');
    Render.text('Current keys: ' + _keys, 20, 460, '#333333');
    Render.text('FPS: ' + fpsPrev, 780, 20, '#333333', null, null, 'right');

    // ---
    fps++;
  }

  function deg2Rad(d) {
    return d * (Math.PI / 180);
  }

  function rad2Deg(r) {
    return r * (180 / Math.PI);
  }

  function applyRotationTransform(_p, _r) {
    var r = _r;

    if (r.x < 0) { r.x = 360 - Math.abs(r.x); }
    if (r.x > 360) { r.x = r.x - 360; }
    if (r.y < 0) { r.y = 360 - Math.abs(r.y); }
    if (r.y > 360) { r.y = r.y - 360; }
    if (r.z < 0) { r.z = 360 - Math.abs(r.z); }
    if (r.z > 360) { r.z = r.z - 360; }

    var pp = _p;
    var cx = Math.cos(deg2Rad(r.x));
    var sx = Math.sin(deg2Rad(r.x));
    var cy = Math.cos(deg2Rad(r.y));
    var sy = Math.sin(deg2Rad(r.y));
    var cz = Math.cos(deg2Rad(r.z));
    var sz = Math.sin(deg2Rad(r.z));

    var xRot = [
      [1, 0, 0],
      [0, cx, -sx],
      [0, sx, cx]
    ];

    var yRot = [
      [cy, 0, sy],
      [0, 1, 0],
      [-sy, 0, cy]
    ];

    var zRot = [
      [cz, -sz, 0],
      [sz, cz, 0],
      [0, 0, 1]
    ];

    var rm = Matrix3.multiply(Matrix3.multiply(zRot, xRot), yRot);

    return Vector3.multiplyByMatrix3(pp, rm);
  }

  function applyTranslationTransform(_p, _o) {
    // TODO: use a matrix4 here.

    return {x: _p.x + _o.x, y: _p.y + _o.y, z: _p.z + _o.z};
  }

  function applyScalingTransform(_p, _s) {
    var pp = _p;
    var sx = _s.x;
    var sy = _s.y;
    var sz = _s.z;

    var scaleMat = [
      [sx, 0, 0],
      [0, sy, 0],
      [0, 0, sz]
    ];

    return Vector3.multiplyByMatrix3(pp, scaleMat);
  }

  function worldToCameraPoint(p) {
    var pos = {x: p.x, y: p.y, z: p.z};

    pos = applyTranslationTransform(pos, Vector3.inverse(camPos));
    pos = applyRotationTransform(pos, Vector3.inverse(camRot));

    return pos;
  }

  function createPerspectiveProjection(_fov, _w, _h, _near, _far) {
    var ar = _w / _h;
    var range = _near - _far;
    var tanHalfFov = Math.tan(deg2Rad(_fov / 2));
    var a = 1 / (tanHalfFov * ar);
    var b = 1 / tanHalfFov;
    var c = (-_near - _far) / range;
    var d = 2 * _far * _near / range;

    perspTrans = [
      [a, 0, 0, 0],
      [0, b, 0, 0],
      [0, 0, c, d],
      [0, 0, 1, 0]
    ];
  }

  function worldPointToScreenPoint(p) {
    var m = perspTrans;
    var pp = {};

    pp.x = p.x * m[0][0] + p.y * m[0][1] + p.z * m[0][2] + m[0][3];
    pp.y = p.x * m[1][0] + p.y * m[1][1] + p.z * m[1][2] + m[1][3];
    pp.z = p.x * m[2][0] + p.y * m[2][1] + p.z * m[2][2] + m[2][3];
    pp.w = p.x * m[3][0] + p.y * m[3][1] + p.z * m[3][2] + m[3][3];

    if (pp.w != 1) {
      pp.x = pp.x / pp.w;
      pp.y = pp.y / pp.w;
      pp.z = pp.z / pp.w;
      pp.w = pp.w / pp.w;
    }

    // var px = (0.5 + ((pp.x + 1) * 0.5 * 800)) | 0;
    var px = (0.5 + ((pp.x + 1) * 0.5 * 800));
    // var py = (0.5 + ((1 - pp.y) * 0.5 * 480)) | 0;
    var py = (0.5 + ((1 - pp.y) * 0.5 * 480));

    if (p.z < 0) {
      return null;
    } else {
      return {x: px, y: py};
    }
  }

  function rotatePointAroundPoint(px, py, ox, oy, a) {
    a = deg2Rad(a);
    var c = Math.cos(a);
    var s = Math.sin(a);

    return {
      x: px * c + py * s + ox,
      y: -px * s + py * c + oy
    };
  }

  function doLogic() {
    if (keysPressed[87]) { // W
      camPos.x += 4 * Math.sin(deg2Rad(camRot.y));
      camPos.z += 4 * Math.cos(deg2Rad(camRot.y));
    }

    if (keysPressed[65]) { // A
      camPos.x -= 2 * Math.cos(deg2Rad(-camRot.y));
      camPos.z -= 2 * Math.sin(deg2Rad(-camRot.y));
    }

    if (keysPressed[83]) { // S
      camPos.x -= 4 * Math.sin(deg2Rad(camRot.y));
      camPos.z -= 4 * Math.cos(deg2Rad(camRot.y));
    }

    if (keysPressed[68]) { // D
      camPos.x += 2 * Math.cos(deg2Rad(-camRot.y));
      camPos.z += 2 * Math.sin(deg2Rad(-camRot.y));
    }

    if (keysPressed[37]) { // <
      camRot.y -= 2;
    }

    if (keysPressed[38]) { // ^
      // rot.x -= 1;
    }

    if (keysPressed[39]) { // >
      camRot.y += 2;
    }

    if (keysPressed[40]) { // v
      // rot.x += 1;
    }
  }

  c.addEventListener('keydown', function (e) { keysPressed[e.keyCode] = true; }, true);
  c.addEventListener('keyup', function (e) { keysPressed[e.keyCode] = false; }, true);

  Render.setup(ctx, 800, 480);

  for (var i = 0; i < cube.length; i++) {
    polyBuffer.push(cube[i]);
  }

  for (var i = 0; i < triangle.length; i++) {
    var p = triangle[i];

    p.points[0].x += 15;
    p.points[0].z += 15;
    p.points[1].x += 15;
    p.points[1].z += 15;
    p.points[2].x += 15;
    p.points[2].z += 15;

    polyBuffer.push(p);
  }

  for (var i = 0; i < squares.length; i++) {
    var p1 = squares[i][0];
    var p2 = squares[i][1];
    var p3 = squares[i][2];
    var p4 = squares[i][3];

    p1 = applyScalingTransform(p1, {x: 1, y: 1, z: 1});
    p1 = applyRotationTransform(p1, {x: 0, y: 0, z: 0});
    p1 = applyTranslationTransform(p1, {x: 0, y: 0, z: 0});

    p2 = applyScalingTransform(p2, {x: 1, y: 1, z: 1});
    p2 = applyRotationTransform(p2, {x: 0, y: 0, z: 0});
    p2 = applyTranslationTransform(p2, {x: 0, y: 0, z: 0});

    p3 = applyScalingTransform(p3, {x: 1, y: 1, z: 1});
    p3 = applyRotationTransform(p3, {x: 0, y: 0, z: 0});
    p3 = applyTranslationTransform(p3, {x: 0, y: 0, z: 0});

    p4 = applyScalingTransform(p4, {x: 1, y: 1, z: 1});
    p4 = applyRotationTransform(p4, {x: 0, y: 0, z: 0});
    p4 = applyTranslationTransform(p4, {x: 0, y: 0, z: 0});

    squares[i][0] = p1;
    squares[i][1] = p2;
    squares[i][2] = p3;
    squares[i][3] = p4;
  }

  createPerspectiveProjection(45, 800, 480, 1, 100);

  render();

  setInterval(function () { fpsPrev = fps; fps = 0; }, 1000);
})();