// deno-lint-ignore-file
import {Image} from "https://deno.land/x/imagescript@1.2.15/mod.ts"
import { serve } from "https://deno.land/std@0.173.0/http/server.ts"
import processSkin from "./slim_processor.ts"

const SKIN_SERVER_BASE_URL = "http://textures.minecraft.net/texture/"

serve(async (req, inf) => {
    let path = req.url.substring(req.url.indexOf("/",8)+1);
    let args = path.split("?");
    let res: Response = await fetch(SKIN_SERVER_BASE_URL+args[0])
    console.log(res)
    let image = await Image.decode(await (await res.blob()).arrayBuffer())
    image = image.crop(0, 0, 64, 32);
    if (args[1] == "slim") image = processSkin(image)
    let encoded = image.encode(0)
    return new Response(await encoded);
})