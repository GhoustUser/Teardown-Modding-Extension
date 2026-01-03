---@meta

---@class server
---@field init fun() -- Called once at load time
---@field tick fun(dt:number) -- Called exactly once per frame. The time step is variable but always between 0.0 and 0.0333333
---@field update fun(dt:number) -- Called at a fixed update rate, but at the most two times per frame. Time step is always 0.0166667 (60 updates per second). Depending on frame rate it might not be called at all for a particular frame.
---@field postUpdate fun() -- Called like update, but after physics. Because update can trigger physics updates, it can be necessary to do some additional calculations afterwards.
---@field destroy fun() -- For game mode scripts, this is called when the game mode is stopped

---@type server
server = server