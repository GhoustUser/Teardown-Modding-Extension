--- @meta


--- Vector math is used in Teardown scripts to represent 3D positions, directions, rotations and transforms. 
--- The base types are vectors, quaternions and transforms. 
--- Vectors and quaternions are indexed tables with three and four components. 
--- Transforms are tables consisting of one vector (pos) and one quaternion (rot) 


--- @class Vec3
--- @field x number X value
--- @field y number Y value 
--- @field z number Z value

--- @class Vec : Vec3
--- @class TVec : Vec3

--- @class Quat
--- @field x number X value
--- @field y number Y value 
--- @field z number Z value
--- @field w number W value

--- @class TQuat : Quat

--- @class TTransform
--- @field pos TVec Position
--- @field rot TQuat Rotation