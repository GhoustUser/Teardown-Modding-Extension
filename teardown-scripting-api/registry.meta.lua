--- @meta

--- Remove registry node, including all child nodes.
--- @param key string -- Registry key to clear
--- @example
--- ```lua
--- function init()
--- 	--If the registry looks like this:
--- 	--	score
--- 	--		levels
--- 	--			level1 = 5
--- 	--			level2 = 4
--- 	ClearKey("score.levels")
--- 	--Afterwards, the registry will look like this:
--- 	--	score
--- end
--- ```
function ClearKey(key) end

--- List all child keys of a registry node.
--- @param parent string -- The parent registry key
--- @return table children -- Indexed table of strings with child keys
--- @example
--- ```lua
--- --If the registry looks like this:
--- --	game
--- --		tool
--- --			steroid
--- --			rifle
--- --			...
--- function init()
--- 	local list = ListKeys("game.tool")
--- 	for i=1, #list do
--- 		DebugPrint(list[i])
--- 	end
--- end
--- --This will output:
--- --steroid
--- --rifle
--- -- ...
--- ```
function ListKeys(parent) end

--- Returns true if the registry contains a certain key
--- @param key string -- Registry key
--- @return boolean exists -- True if key exists
--- @example
--- ```lua
--- function init()
--- 	DebugPrint(HasKey("score.levels"))
--- 	DebugPrint(HasKey("game.tool.rifle"))
--- end
--- ```
function HasKey(key) end

--- @param key string -- Registry key
--- @param value number -- Desired value
--- @param sync? boolean -- Synchronize to clients
--- @example
--- ```lua
--- function init()
--- 	SetInt("score.levels.level1", 4)
--- 	DebugPrint(GetInt("score.levels.level1"))
--- end
--- ```
function SetInt(key, value, sync) end

--- @param key string -- Registry key
--- @return number value -- Integer value of registry node or zero if not found
--- @example
--- ```lua
--- function init()
--- 	SetInt("score.levels.level1", 4)
--- 	DebugPrint(GetInt("score.levels.level1"))
--- end
--- ```
function GetInt(key) end

--- @param key string -- Registry key
--- @param value number -- Desired value
--- @param sync? boolean -- Synchronize to clients
--- @example
--- ```lua
--- function init()
--- 	SetFloat("level.time", 22.3)
--- 	DebugPrint(GetFloat("level.time"))
--- end
--- ```
function SetFloat(key, value, sync) end

--- @param key string -- Registry key
--- @return number value -- Float value of registry node or zero if not found
--- @example
--- ```lua
--- function init()
--- 	SetFloat("level.time", 22.3)
--- 	DebugPrint(GetFloat("level.time"))
--- end
--- ```
function GetFloat(key) end

--- @param key string -- Registry key
--- @param value boolean -- Desired value
--- @param sync? boolean -- Synchronize to clients
--- @example
--- ```lua
--- function init()
--- 	SetBool("level.robots.enabled", true)
--- 	DebugPrint(GetBool("level.robots.enabled"))
--- end
--- ```
function SetBool(key, value, sync) end

--- @param key string -- Registry key
--- @return boolean value -- Boolean value of registry node or false if not found
--- @example
--- ```lua
--- function init()
--- 	SetBool("level.robots.enabled", true)
--- 	DebugPrint(GetBool("level.robots.enabled"))
--- end
--- ```
function GetBool(key) end

--- @param key string -- Registry key
--- @param value string -- Desired value
--- @param sync? boolean -- Synchronize to clients
--- @example
--- ```lua
--- function init()
--- 	SetString("level.name", "foo")
--- 	DebugPrint(GetString("level.name"))
--- end
--- ```
function SetString(key, value, sync) end

--- @param key string -- Registry key
--- @return string value -- String value of registry node or "" if not found
--- @example
--- ```lua
--- function init()
--- 	SetString("level.name", "foo")
--- 	DebugPrint(GetString("level.name"))
--- end
--- ```
function GetString(key) end

--- Sets the color registry key value
--- @param key string -- Registry key
--- @param r number -- Desired red channel value
--- @param g number -- Desired green channel value
--- @param b number -- Desired blue channel value
--- @param a? number -- Desired alpha channel value
--- @example
--- ```lua
--- function init()
--- 	SetColor("game.tool.wire.color", 1.0, 0.5, 0.3)
--- end
--- ```
function SetColor(key, r, g, b, a) end

--- Returns the color registry key value
--- @param key string -- Registry key
--- @return number r -- Desired red channel value
--- @return number g -- Desired green channel value
--- @return number b -- Desired blue channel value
--- @return number a -- Desired alpha channel value
--- @example
--- ```lua
--- function init()
--- 	SetColor("red", 1.0, 0.1, 0.1)
--- 	color = GetColor("red")
--- 	DebugPrint("RGBA: " .. color[1] .. " " .. color[2] .. " " .. color[3] .. " " .. color[4])
--- end
--- ```
function GetColor(key) end

--- Returns the translation for the specified key from the translation table. If the key is not found returns the default value
--- @param key string -- Translation key
--- @param default? string -- Default value
--- @return string value -- Translation
--- @example
--- ```lua
--- function init()
--- 	DebugPrint(GetTranslatedStringByKey("TOOL_CAMERA"))
--- end
--- ```
function GetTranslatedStringByKey(key, default) end

--- Checks that translation for specified key exists
--- @param key string -- Translation key
--- @return boolean value -- True if translation exists
--- @example
--- ```lua
--- function init()
--- 	DebugPrint(HasTranslationByKey("TOOL_CAMERA"))
--- end
--- ```
function HasTranslationByKey(key) end

--- @param id number -- Language id (enum)
--- @example
--- ```lua
--- function init()
--- 	-- loads the english localization table
--- 	LoadLanguageTable(0)
--- end
--- ```
function LoadLanguageTable(id) end

--- Returns the user nickname with the specified id. If id is not specified, returns nickname for user with id '0'
--- @param id? number -- User id
--- @return string value -- User nickname
--- @example
--- ```lua
--- function init()
--- 	DebugPrint(GetUserNickname(0))
--- end
--- ```
function GetUserNickname(id) end

