# AWSM

> The minimum working prototype of AWSM doesn't exist yet. Feel free to PR ideas, and/or come back later!

A customizable WebAssembly retro virtual console for web and web-compatible platforms. Inspired by Wasm-4.

## What is AWSM?
- **Batteries-included game console:** As a pseudo-fork of [Wasm-4](https://github.com/aduros/wasm4),
  AWSM gives you built-in local and netplay multiplayer, controls, audio, & screen, all with near-0 code glue.
- **Customizable:** use code in your game cartridge to set screen width/height in pixels (and optionally expanding a dimension to cover the full screen), on-screen controls, color range, audio channels, and more.
  This is done by changing specific "settings" memory registers upon startup.
- **Zero-backend multiplayer:** netplay directly to peers by texting a link to your game that includes peer-to-peer connection details.
  No matchmaking / signaling server, just your frontend website texted via a link.
- **Minimal and portable:** AWSM is just a single `.html` file that is just missing your game `.wasm` encoded as a string. So, building your game involves compiling a `.wasm` game with your language of choice, base64-string-encoding that `.wasm`, then performing a string substitution to insert your cartridge-string into the `.html` file. See [Making a game](#create-and-run-an-awsm-game).

## Roadmap
- Complete the spec of the platform.
- Create an example of deployment using [this example](https://stackoverflow.com/a/52582865/10107580).
- Create a minimum working prototype.
    1. Demake Wasm-4 screen renderer, with needed licence attribution, and make renderer compatible with larger pixel dimensions (i.e. circumvent UInt32Array max lengths).
    2. Create serverless netplay via [this idea](https://stackoverflow.com/a/29056385/10107580)
    3. Demake Wasm-4 webassembly graphics FFI, start/update, etc...
    4. Demake Wasm-4 APU
- Create a Discord server.

## Create and run an AWSM game
1. Choose a programming language that compiles to `.wasm`, e.g. Rust with the `wasm32-unknown-unknown` target.
2. Create a `.wasm` binary that has the correct memory layout (???) and uses AWSM functions (???) to create your game.
3. Run the following commands to build the game into an html file
   ```bash
   wget https://canyonturtle.github.io/awsm \
       | sed game.html # (... substitute "WASM_CART_SNIP" with the output of base64 of the wasm file.) \
       > game.html
   ```
4. Open `game.html` and play your game!
