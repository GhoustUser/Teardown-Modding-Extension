--- @meta

--- Reset to default particle state, which is a plain, white particle of radius 0.5.
--- Collision is enabled and it alpha animates from 1 to 0.
--- @example
--- ```lua
--- function client.init()
--- 	ParticleReset()
--- end
--- ```
function ParticleReset() end

--- Set type of particle
--- @param type string -- Type of particle. Can be "smoke" or "plain".
--- @example
--- ```lua
--- function client.init()
--- 	ParticleType("smoke")
--- end
--- ```
function ParticleType(type) end

--- @param type number -- Tile in the particle texture atlas (0-15)
--- @example
--- ```lua
--- function client.init()
--- 	--Smoke particle
--- 	ParticleTile(0)
--- 	--Fire particle
--- 	ParticleTile(5)
--- end
--- ```
function ParticleTile(type) end

--- Set particle color to either constant (three arguments) or linear interpolation (six arguments)
--- @example
--- ```lua
--- function client.init()
--- 	--Constant red
--- 	ParticleColor(1,0,0)
--- 	--Animating from yellow to red
--- 	ParticleColor(1,1,0, 1,0,0)
--- end
--- ```
function ParticleColor() end

--- Set the particle radius. Max radius for smoke particles is 1.0.
--- @param interpolation? string -- Interpolation method: linear, smooth, easein, easeout or constant. Default is linear.
--- @param fadein? number -- Fade in between t=0 and t=fadein. Default is zero.
--- @param fadeout? number -- Fade out between t=fadeout and t=1. Default is one.
--- @example
--- ```lua
--- function client.init()
--- 	--Constant radius 0.4 meters
--- 	ParticleRadius(0.4)
--- 	--Interpolate from small to large
--- 	ParticleRadius(0.1, 0.7)
--- end
--- ```
function ParticleRadius(interpolation, fadein, fadeout) end

--- Set the particle alpha (opacity).
--- @param interpolation? string -- Interpolation method: linear, smooth, easein, easeout or constant. Default is linear.
--- @param fadein? number -- Fade in between t=0 and t=fadein. Default is zero.
--- @param fadeout? number -- Fade out between t=fadeout and t=1. Default is one.
--- @example
--- ```lua
--- function client.init()
--- 	--Interpolate from opaque to transparent
--- 	ParticleAlpha(1.0, 0.0)
--- end
--- ```
function ParticleAlpha(interpolation, fadein, fadeout) end

--- Set particle gravity. It will be applied along the world Y axis. A negative value will move the particle downwards.
--- @param interpolation? string -- Interpolation method: linear, smooth, easein, easeout or constant. Default is linear.
--- @param fadein? number -- Fade in between t=0 and t=fadein. Default is zero.
--- @param fadeout? number -- Fade out between t=fadeout and t=1. Default is one.
--- @example
--- ```lua
--- function client.init()
--- 	--Move particles slowly upwards
--- 	ParticleGravity(2)
--- end
--- ```
function ParticleGravity(interpolation, fadein, fadeout) end

--- Particle drag will slow down fast moving particles. It's implemented slightly different for
--- smoke and plain particles. Drag must be positive, and usually look good between zero and one.
--- @param interpolation? string -- Interpolation method: linear, smooth, easein, easeout or constant. Default is linear.
--- @param fadein? number -- Fade in between t=0 and t=fadein. Default is zero.
--- @param fadeout? number -- Fade out between t=fadeout and t=1. Default is one.
--- @example
--- ```lua
--- function client.init()
--- 	--Slow down fast moving particles
--- 	ParticleDrag(0.5)
--- end
--- ```
function ParticleDrag(interpolation, fadein, fadeout) end

--- Draw particle as emissive (glow in the dark). This is useful for fire and embers.
--- @param interpolation? string -- Interpolation method: linear, smooth, easein, easeout or constant. Default is linear.
--- @param fadein? number -- Fade in between t=0 and t=fadein. Default is zero.
--- @param fadeout? number -- Fade out between t=fadeout and t=1. Default is one.
--- @example
--- ```lua
--- function client.init()
--- 	--Highly emissive at start, not emissive at end
--- 	ParticleEmissive(5, 0)
--- end
--- ```
function ParticleEmissive(interpolation, fadein, fadeout) end

--- Makes the particle rotate. Positive values is counter-clockwise rotation.
--- @param interpolation? string -- Interpolation method: linear, smooth, easein, easeout or constant. Default is linear.
--- @param fadein? number -- Fade in between t=0 and t=fadein. Default is zero.
--- @param fadeout? number -- Fade out between t=fadeout and t=1. Default is one.
--- @example
--- ```lua
--- function client.init()
--- 	--Rotate fast at start and slow at end
--- 	ParticleRotation(10, 1)
--- end
--- ```
function ParticleRotation(interpolation, fadein, fadeout) end

--- Stretch particle along with velocity. 0.0 means no stretching. 1.0 stretches with the particle motion over
--- one frame. Larger values stretches the particle even more.
--- @param interpolation? string -- Interpolation method: linear, smooth, easein, easeout or constant. Default is linear.
--- @param fadein? number -- Fade in between t=0 and t=fadein. Default is zero.
--- @param fadeout? number -- Fade out between t=fadeout and t=1. Default is one.
--- @example
--- ```lua
--- function client.init()
--- 	--Stretch particle along direction of motion
--- 	ParticleStretch(1.0)
--- end
--- ```
function ParticleStretch(interpolation, fadein, fadeout) end

--- Make particle stick when in contact with objects. This can be used for friction.
--- @param interpolation? string -- Interpolation method: linear, smooth, easein, easeout or constant. Default is linear.
--- @param fadein? number -- Fade in between t=0 and t=fadein. Default is zero.
--- @param fadeout? number -- Fade out between t=fadeout and t=1. Default is one.
--- @example
--- ```lua
--- function client.init()
--- 	--Make particles stick to objects
--- 	ParticleSticky(0.5)
--- end
--- ```
function ParticleSticky(interpolation, fadein, fadeout) end

--- Control particle collisions. A value of zero means that collisions are ignored. One means full collision.
--- It is sometimes useful to animate this value from zero to one in order to not collide with objects around
--- the emitter.
--- @param interpolation? string -- Interpolation method: linear, smooth, easein, easeout or constant. Default is linear.
--- @param fadein? number -- Fade in between t=0 and t=fadein. Default is zero.
--- @param fadeout? number -- Fade out between t=fadeout and t=1. Default is one.
--- @example
--- ```lua
--- function client.init()
--- 	--Disable collisions
--- 	ParticleCollide(0)
--- 	--Enable collisions over time
--- 	ParticleCollide(0, 1)
--- 	--Ramp up collisions very quickly, only skipping the first 5% of lifetime
--- 	ParticleCollide(1, 1, "constant", 0.05)
--- end
--- ```
function ParticleCollide(interpolation, fadein, fadeout) end

--- Set particle bitmask. The value 256 means fire extinguishing particles and is currently the only
--- flag in use. There might be support for custom flags and queries in the future.
--- @param bitmask number -- Particle flags (bitmask 0-65535)
--- @example
--- ```lua
--- function client.tick()
--- 	--Fire extinguishing particle
--- 	ParticleFlags(256)
--- 	SpawnParticle(Vec(0, 10, 0), -0.1, math.random() + 1)
--- end
--- ```
function ParticleFlags(bitmask) end

--- Spawn particle using the previously set up particle state. You can call this multiple times
--- using the same particle state, but with different position, velocity and lifetime. You can
--- also modify individual properties in the particle state in between calls to to this function.
--- @param pos TVec -- World space point as vector
--- @param velocity TVec -- World space velocity as vector
--- @param lifetime number -- Particle lifetime in seconds
--- @example
--- ```lua
--- function client.tick()
--- 	ParticleReset()
--- 	ParticleType("smoke")
--- 	ParticleColor(0.7, 0.6, 0.5)
--- 	--Spawn particle at world origo with upwards velocity and a lifetime of ten seconds
--- 	SpawnParticle(Vec(0, 5, 0), Vec(0, 1, 0), 10.0)
--- end
--- ```
function SpawnParticle(pos, velocity, lifetime) end

