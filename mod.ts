// deno-lint-ignore-file
import {Image} from "https://deno.land/x/imagescript@1.2.15/mod.ts"
import { serve } from "https://deno.land/std@0.173.0/http/server.ts"

const SKIN_SERVER_BASE_URL = "http://textures.minecraft.net/texture/"

serve(async (req, inf) => {
    let path = req.url.substring(req.url.indexOf("/",8)+1);
    let res: Response = await fetch(SKIN_SERVER_BASE_URL+path)
    let image = await Image.decode(await (await res.blob()).arrayBuffer())
    let encoded = image.crop(0, 0, 64, 32).encode(0)
    return new Response(await encoded);
})