---@meta

---@return string GetVersion -- Dot separated string of current version of the game
---### example:
---```lua
---function init()
---	local v = GetVersion()
---	--v is "0.5.0"
---	DebugPrint(v)
---end
---```
function GetVersion() end

---@param version string -- Reference version
---@return boolean match -- True if current version is at least provided one
---### example:
---```lua
---function init()
---	if HasVersion("1.5.0") then
---		--conditional code that only works on 0.6.0 or above
---		DebugPrint("New version")
---	else
---		--legacy code that works on earlier versions
---		DebugPrint("Earlier version")
---	end
---end
---```
function HasVersion(version) end

---Returns running time of this script. If called from update, this returns the simulated time, otherwise it returns wall time. 
---@return number time -- The time in seconds since level was started
---### example:
---```lua
---function client.update()
---	local t = GetTime()
---	DebugPrint(t)
---end
---```
function GetTime() end

---Returns timestep of the last frame. If called from update, this returns the simulation time step, which is always one 60th of a second (0.0166667). If called from tick or draw it returns the actual time since last frame. 
---@return number dt -- The timestep in seconds
---### example:
---```lua
---function client.tick()
---	local dt = GetTimeStep()
---	DebugPrint("tick dt: " .. dt)
---end
---
---function client.update()
---	local dt = GetTimeStep()
---	DebugPrint("update dt: " .. dt)
---end
---```
function GetTimeStep() end

---@param playerId number -- Player ID. On client, zero means client player. On server, zero means server (host) player.
---@return string name -- Name of last pressed key, empty if no key is pressed
---### example:
---```lua
---function client.tick()
---	local name = InputLastPressedKey()
---	if string.len(name) > 0 then
---		DebugPrint(name)
---	end
---end
---```
function InputLastPressedKey(playerId) end

---@param input string -- The input identifier
---@param playerId? number -- Player ID. On client, zero means client player. On server, zero means server (host) player.
---@return boolean pressed --  True if input was pressed during last frame
---### example:
---```lua
---function client.tick()
---	if InputPressed("interact") then
---		DebugPrint("interact")
---	end
---end
---```
function InputPressed(input, playerId) end

---@param input string -- The input identifier
---@param playerId? number -- Player ID. On client, zero means client player. On server, zero means server (host) player.
---@return boolean pressed -- True if input was released during last frame
---### example:
---```lua
---function client.tick()
---	if InputReleased("interact") then
---		DebugPrint("interact")
---	end
---end
---```
function InputReleased(input, playerId) end

---@param input string -- The input identifier
---@param playerId? number -- Player ID. On client, zero means client player. On server, zero means server (host) player.
---@return boolean pressed -- True if input is currently held down
---### example:
---```lua
---function client.tick()
---	if InputDown("interact") then
---		DebugPrint("interact")
---	end
---end
---```
function InputDown(input, playerId) end

---@param input string -- The input identifier
---@param playerId? number -- Player ID. On client, zero means client player. On server, zero means server (host) player.
---@return number pressed -- Depends on input type
---### example:
---```lua
---local scrollPos = 0
---function client.tick()
---	scrollPos = scrollPos + InputValue("mousewheel")
---	DebugPrint(scrollPos)
---end
---```
function InputValue(input, playerId) end

---### CLIENT ONLY
---All player input is "forgotten" by the game after calling this function
---### example:
---```lua
---function client.update()
---    -- Prints '2' because InputClear() allows the game to "forget" the player's input
---	if InputDown("interact") then
---        InputClear()
---		if InputDown("interact") then
---			DebugPrint(1)
---		else
---			DebugPrint(2)
---		end
---	end
---end
---```
function InputClear() end

---### CLIENT ONLY
---This function will reset everything we need to reset during state transition
---### example:
---```lua
---function update()
---	if InputDown("interact") then
---        -- In this form, you won't be able to notice the result of the function; you need a specific context
---		InputResetOnTransition()
---	end
---end
---```
function InputResetOnTransition() end

---Returns the last input device id. 0 - none, 1 - mouse, 2 - gamepad
---@return number value -- Last device id
---### example:
---```lua
---#include "ui/ui_helpers.lua"
---
---function client.update()
---	if LastInputDevice() == UI_DEVICE_GAMEPAD then
---		DebugPrint("Last input was from gamepad")
---	elseif LastInputDevice() == UI_DEVICE_MOUSE then
---		DebugPrint("Last input was mouse & keyboard")
---	elseif LastInputDevice() == UI_DEVICE_TOUCHSCREEN then
---		DebugPrint("Last input was touchscreen")
---	end
---end
---```
function LastInputDevice() end

---Set value of a number variable in the global context with an optional transition. If a transition is provided the value will animate from current value to the new value during the transition time.
---@param variable string -- Name of number variable in the global context
---@param value number -- The new value
---@param transition? string -- Transition type. See description.
---@param time? number -- Transition time (seconds)
---
---`Transition` can be one of the following: 
---```plain
---┌────────────┬────────────────────────────────┐
---│ Transition │ Description                    │
---├────────────┼────────────────────────────────┤
---│ linear     │ Linear transition              │
---│ cosine     │ Slow at beginning and end      │
---│ easein     │ Slow at beginning              │
---│ easeout    │ Slow at end                    │
---│ bounce     │ Bounce and overshoot new value │
---└────────────┴────────────────────────────────┘
---```
---### example:
---```lua
---myValue = 0
---function client.tick()
---	--This will change the value of myValue from 0 to 1 in a linear fasion over 0.5 seconds
---	SetValue("myValue", 1, "linear", 0.5)
---	DebugPrint(myValue)
---end
---```
function SetValue(variable, value, transition, time) end

---Chages the value of a table member in time according to specified args. Works similar to SetValue but for global variables of trivial types 
---@param tableId table -- Id of the table
---@param memberName string -- Name of the member
---@param newValue number -- New value
---@param type string -- Transition type
---@param length number -- Transition length
---### example:
---```lua
---local t = {}
---function init()
---	SetValueInTable(t, "score", 1, "number", 1)
---end
---function update()
---	if InputPressed("interact") then
---		SetValueInTable(t, "score", t.score + 1, "number", 1)
---        DebugPrint(t.score)
---	end
---end
---```
function SetValueInTable(tableId, memberName, newValue, type, length) end

--[[ TODO:
    PauseMenuButton
    HasFile
    StartLevel
    SetPaused
    Restart
    Menu
    ClientCall
    ServerCall
]]

--! PauseMenuButton
--! HasFile
--! StartLevel
--! SetPaused
--! Restart
--! Menu
--! ClientCall
--! ServerCall