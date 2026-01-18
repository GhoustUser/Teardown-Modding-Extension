--- @meta

--- @param tag? string -- Tag name
--- @param global? boolean -- Search in entire scene
--- @return number handle -- Handle to first vehicle with specified tag or zero if not found
--- @example
--- ```lua
--- function client.init()
--- 	local vehicle = FindVehicle("mycar")
--- end
--- ```
function FindVehicle(tag, global) end

--- @param tag? string -- Tag name
--- @param global? boolean -- Search in entire scene
--- @return table list -- Indexed table with handles to all vehicles with specified tag
--- @example
--- ```lua
--- function client.init()
--- 	--Find all vehicles in level tagged "boat"
--- 	local boats = FindVehicles("boat")
--- 	for i=1, #boats do
--- 		local boat = boats[i]
--- 		DebugPrint(boat)
--- 	end
--- end
--- ```
function FindVehicles(tag, global) end

--- @param vehicle number -- Vehicle handle
--- @return TTransform transform -- Transform of vehicle
--- @example
--- ```lua
--- function client.init()
--- 	local vehicle = FindVehicle("vehicle")
--- 	local t = GetVehicleTransform(vehicle)
--- end
--- ```
function GetVehicleTransform(vehicle) end

--- Returns the exhausts transforms in local space of the vehicle.
--- @param vehicle number -- Vehicle handle
--- @return table transforms -- Transforms of vehicle exhausts
--- @example
--- ```lua
--- function client.tick()
--- 	local vehicle = FindVehicle("car", true)
--- 	local t = GetVehicleExhaustTransforms(vehicle)
--- 	for i = 1, #t do
--- 		DebugWatch(tostring(i), t[i])
--- 	end
--- end
--- ```
function GetVehicleExhaustTransforms(vehicle) end

--- Returns the vitals transforms in local space of the vehicle.
--- @param vehicle number -- Vehicle handle
--- @return table transforms -- Transforms of vehicle vitals
--- @example
--- ```lua
--- function client.tick()
--- 	local vehicle = FindVehicle("car", true)
--- 	local t = GetVehicleVitalTransforms(vehicle)
--- 	for i = 1, #t do
--- 		DebugWatch(tostring(i), t[i])
--- 	end
--- end
--- ```
function GetVehicleVitalTransforms(vehicle) end

--- @param vehicle number -- Vehicle handle
--- @return table transforms -- Vehicle bodies handles
--- @example
--- ```lua
--- function client.tick()
--- 	local vehicle = FindVehicle("car", true)
--- 	local t = GetVehicleBodies(vehicle)
--- 	for i = 1, #t do
--- 		DebugWatch(tostring(i), t[i])
--- 	end
--- end
--- ```
function GetVehicleBodies(vehicle) end

--- @param vehicle number -- Vehicle handle
--- @return number body -- Main body of vehicle
--- @example
--- ```lua
--- function client.init()
--- 	local vehicle = FindVehicle("vehicle")
--- 	local body = GetVehicleBody(vehicle)
--- 	if IsBodyBroken(body) then
--- 		DebugPrint("Is broken")
--- 	end
--- end
--- ```
function GetVehicleBody(vehicle) end

--- @param vehicle number -- Vehicle handle
--- @return number health -- Vehicle health (zero to one)
--- @example
--- ```lua
--- function client.init()
--- 	local vehicle = FindVehicle("vehicle")
--- 	local health = GetVehicleHealth(vehicle)
--- 	DebugPrint(health)
--- end
--- ```
function GetVehicleHealth(vehicle) end

--- @param vehicle number -- Vehicle handle
--- @return table params -- Vehicle params
--- @example
--- ```lua
--- function client.tick()
--- 	local params = GetVehicleParams(FindVehicle("car", true))
--- 	for key, value in pairs(params) do
--- 		DebugWatch(key, value)
--- 	end
--- end
--- ```
function GetVehicleParams(vehicle) end

--- Available parameters: spring, damping, topspeed, acceleration, strength, antispin, antiroll, difflock, steerassist, friction
--- @param handle number -- Vehicle handler
--- @param param string -- Param name
--- @param value number -- Param value
--- @example
--- ```lua
--- function server.init()
--- 	SetVehicleParam(FindVehicle("car", true), "topspeed", 200)
--- end
--- ```
function SetVehicleParam(handle, param, value) end

--- @param vehicle number -- Vehicle handle
--- @return TVec pos -- Driver position as vector in vehicle space
--- @example
--- ```lua
--- function client.init()
--- 	local vehicle = FindVehicle("vehicle")
--- 	local driverPos = GetVehicleDriverPos(vehicle)
--- 	local t = GetVehicleTransform(vehicle)
--- 	local worldPos = TransformToParentPoint(t, driverPos)
--- 	DebugPrint(worldPos)
--- end
--- ```
function GetVehicleDriverPos(vehicle) end

--- @param vehicle number -- Vehicle handle
--- @return TVec pos -- World space position of the next available seat. {0, 0, 0} if none is available.
--- @example
--- ```lua
--- function client.tick()
--- 	local vehicle = FindVehicle("vehicle")
--- 	local pos = GetVehicleAvailableSeatPos(vehicle)
--- 	DebugPrint(pos)
--- end
--- ```
function GetVehicleAvailableSeatPos(vehicle) end

--- @param vehicle number -- Vehicle handle
--- @return number steering -- Driver steering value -1 to 1
--- @example
--- ```lua
--- local steering = GetVehicleSteering(vehicle)
--- ```
function GetVehicleSteering(vehicle) end

--- @param vehicle number -- Vehicle handle
--- @return number drive -- Driver drive value -1 to 1
--- @example
--- ```lua
--- local drive = GetVehicleDrive(vehicle)
--- ```
function GetVehicleDrive(vehicle) end

---### SERVER ONLY
--- This function applies input to vehicles, allowing for autonomous driving. The vehicle
--- will be turned on automatically and turned off when no longer called. Call this from
--- the tick function, not update.
--- @param vehicle number -- Vehicle handle
--- @param drive number -- Reverse/forward control -1 to 1
--- @param steering number -- Left/right control -1 to 1
--- @param handbrake boolean -- Handbrake control
--- @example
--- ```lua
--- function server.tick()
--- 	--Drive mycar forwards
--- 	local v = FindVehicle("mycar")
--- 	DriveVehicle(v, 1, 0, false)
--- end
--- ```
function DriveVehicle(vehicle, drive, steering, handbrake) end

--- @param vehicle number -- Vehicle handle
--- @param name string -- Name of location
--- @return TTransform transform -- World transform
--- @example
--- ```lua
--- local t = GetVehicleLocationWorldTransform(vehicle, "player_steeringwheel")
--- ```
function GetVehicleLocationWorldTransform(vehicle, name) end

--- @param vehicle number -- Vehicle handle
--- @return number count -- Number of passengers
--- @return number seats -- Number of seats
--- @return bool hasDriver -- If vehicle has a driver
--- @example
--- ```lua
--- local passengers, seats, hasDriver = GetVehiclePassengerCount(vehicle)
--- ```
function GetVehiclePassengerCount(vehicle) end

---### SERVER ONLY
--- Works only for vehicles with 'customhealth' tag. 'customhealth' disables the common vehicles damage system.
--- So this function needed for custom vehicle damage systems.
--- @param vehicle number -- Vehicle handle
--- @param health number -- Set vehicle health (between zero and one)
--- @example
--- ```lua
--- function server.tick()
--- 	if InputPressed("usetool", playerId) then
--- 		SetVehicleHealth(FindVehicle("car", true), 0.0)
--- 	end
--- end
--- ```
function SetVehicleHealth(vehicle, health) end

