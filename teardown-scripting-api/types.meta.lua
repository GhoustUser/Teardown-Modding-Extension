--- @meta


--- Vector math is used in Teardown scripts to represent 3D positions, directions, rotations and transforms.
--- The base types are vectors, quaternions and transforms.
--- Vectors and quaternions are indexed tables with three and four components.
--- Transforms are tables consisting of one vector (pos) and one quaternion (rot)


---@class TVec
---@field [0] number -- x
---@field [1] number -- y
---@field [2] number -- z

---@class TQuat
---@field [0] number -- x
---@field [1] number -- y
---@field [2] number -- z
---@field [3] number -- w

---@class TTransform
---@field pos TVec -- Position
---@field rot TQuat -- Rotation

