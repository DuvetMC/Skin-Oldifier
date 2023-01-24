# Skin Oldifier
A REST API for converting Minecraft skins from the new (>=1.8) to the old (<1.8)

## API
- Get the skin link as you'd normally do through Mojang's API
  - https://wiki.vg/Mojang_API#UUID_to_Profile_and_Skin.2FCape
- Once you have the link, replace the `http://textures.minecraft.net/texture/` part of the link with `https://skin-oldifier.deno.dev/`
  - If you have a slim skin, append `?slim` to the end of the URL, it will automatically convert the skin to fit in the old model
