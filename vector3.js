Vector3 = {};

Vector3.magnitude = function (_v) {
  return Math.sqrt(_v.x * _v.x + _v.y * _v.y + _v.z * _v.z);
};

// Normalizes the vector so its magnitude equals 1.
Vector3.normalize = function (_v) {
  var x = _v.x / Vector3.magnitude(_v);
  var y = _v.y / Vector3.magnitude(_v);
  var z = _v.z / Vector3.magnitude(_v);

  return {x: x, y: y, z: z}; 
};

Vector3.inverse = function (_v) {
  return Vector3.scale(_v, -1);
};

Vector3.add = function (_v1, _v2) {
  var x = _v1.x + _v2.x;
  var y = _v1.y + _v2.y;
  var z = _v1.z + _v2.z;

  return {x: x, y: y, z: z};
};

Vector3.subtract = function (_v1, _v2) {
  var x = _v1.x - _v2.x;
  var y = _v1.y - _v2.y;
  var z = _v1.z - _v2.z;
  
  return {x: x, y: y, z: z};
};

Vector3.scale = function(_v, _s) {
  var x = _v.x * _s;
  var y = _v.y * _s;
  var z = _v.z * _s;
  
  return {x: x, y: y, z: z};
};

// How much another vector points in the same/opposite direction.
Vector3.dot = function (_v1, _v2) {
  return _v1.x * _v2.x + _v1.y * _v2.y + _v1.z * _v2.z;
};

// Find the third, perpendicular vector from other two vectors.
Vector3.cross = function (_v1, _v2) {
  var x = _v1.y * _v2.z - _v1.z * _v2.y;
  var y = _v1.z * _v2.x - _v1.x * _v2.z;
  var z = _v1.x * _v2.y - _v1.y * _v2.x;
  
  return {x: x, y: y, z: z};
};

// The volume of the parallelepiped spanned by _v1, _v2 and _v3
Vector3.scalarTriple = function (_v1, _v2, _v3) {
  var cross = Vector3.cross(_v1, _v2);
  var result = Vector3.dot(cross, _v3);

  return Math.abs(result);
};

Vector3.multiplyByMatrix3 = function (_v, _m) {
  var x = _v.x * _m[0][0] + _v.y * _m[0][1] + _v.z * _m[0][2];
  var y = _v.x * _m[1][0] + _v.y * _m[1][1] + _v.z * _m[1][2];
  var z = _v.x * _m[2][0] + _v.y * _m[2][1] + _v.z * _m[2][2];

  return {x: x, y: y, z: z};
};

Vector3.distanceBetween = function (_v1, _v2) {
  return Math.abs(Math.sqrt(Math.pow(_v2.x - _v1.x, 2) + Math.pow(_v2.y - _v1.y, 2) + Math.pow(_v2.z - _v1.z, 2)));
};
