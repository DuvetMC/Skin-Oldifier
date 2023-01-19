import {Image} from "https://deno.land/x/imagescript@1.2.15/mod.ts"

export default function convertSlimSkin(image: Image) {
    image = copy(image, 48, 17, 7, 16, 1)
    image = copy(image, 47, 17, 1, 16, 1)
    image = copy(image, 51, 17, 1, 4, 1)
    image = copy(image, 55, 21, 1, 12, 1)
    return image
}

function copy(image: Image, x: number, y: number, w: number, h: number, d: number) {
    for (let px = w-1; px >= 0; px--) {
        for (let py = 0; py < h; py++) {
            image = image.setPixelAt(x+px+d, y+py, image.getPixelAt(x+px, y+py))
        }
    }
    return image
}
