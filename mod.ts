// deno-lint-ignore-file
import {Image} from "https://deno.land/x/imagescript@1.2.15/mod.ts"
import { serve } from "https://deno.land/std@0.173.0/http/server.ts"
import processSkin from "./slim_processor.ts"
import getHead from "./head_only.ts"

const SKIN_SERVER_BASE_URL = "http://textures.minecraft.net/texture/"

serve(async (req, inf) => {
    let path = req.url.substring(req.url.indexOf("/",8)+1);
    let args = path.split("?");
    let res: Response = await fetch(SKIN_SERVER_BASE_URL+args[0])
    if (res.status != 200) return new Response(null, {status: res.status})
    let image = await Image.decode(await (await res.blob()).arrayBuffer())
    image = image.crop(0, 0, 64, 32);
    image = fixBottoms(image)
    if (args[1] == "slim") image = processSkin(image)
    else if (args[1] == "head") image = getHead(image)
    let encoded = image.encode(0)
    return new Response(await encoded, {
        headers: {
            "conent-type": "image/png"
        }
    });
})

function fixBottoms(image: Image): Image {
    let out = image.clone()
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            const dx = Math.abs(x - 8)
            const dy = Math.abs(y - 8)
            out.setPixelAt(dx+16, dy, image.getPixelAt(x+17, y+1))
            out.setPixelAt(dx+16, dy, image.getPixelAt(x+17, y+1))
            out.setPixelAt(dx+48, dy, image.getPixelAt(x+49, y+1))
            out.setPixelAt(dx+48, dy, image.getPixelAt(x+49, y+1))
        }
    }
    return out
}
