# AWSM

A customizable WebAssembly virtual console. This is an API-breaking fork of [Wasm-4](https://github.com/aduros/wasm4), although running existing Wasm-4 games is also a goal.

> The minimum working prototype of AWSM doesn't exist yet. Feel free to PR ideas, and/or come back later!

## What is AWSM?
- **Batteries-included game console:** As a fork of [Wasm-4](https://github.com/aduros/wasm4),
  AWSM gives you built-in local and netplay multiplayer, controls, audio, & screen, all with 0 code glue.
- **Customizable:** use code in your game cartridge to set screen width/height in pixels (and optionally expanding a dimension to cover the full screen), on-screen controls, color range, audio channels, and more. This is done by adding an additional core WASM function called `configure()` (alongside the `start()` and `update()` functions). In this function, memory registers can be set to configure the platform settings. If configure() is unused, the platform defaults to the exact same original specs as Wasm-4.
  This is done by changing specific "settings" memory registers upon startup.
- **Commercializable:** AWSM's [license](./LICENSE) is suitable for commercial games (as is Wasm-4's).
  
## Roadmap
- Complete the spec of the platform.
- Parameterize all code templates and the runtimes by the new settings.
