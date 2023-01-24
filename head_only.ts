import {Image} from "https://deno.land/x/imagescript@1.2.15/mod.ts"

export default function getHead(image: Image) {
    const out = new Image(8, 8)
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            const head = image.getPixelAt(x+9, y+9)
            const hat = image.getPixelAt(x+41, y+9)
            out.setPixelAt(x+1, y+1, hat == 0 ? head : hat)
        }
    }
    return out.resize(64,64)
}