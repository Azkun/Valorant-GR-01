const log = console.log;
const sharp = require('sharp');
const Tesseract = require('tesseract.js');
const screenshot = require("screenshot-desktop");
const open = require('open');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function screenShot() {

    let filenb = (Math.random() + 1).toString(36).substring(7);

    await screenshot({
        filename: './assets/currents.png'
    })
    
    await sharp('./assets/currents.png')
    .extract({
            left: 1820,
            top: 1010,
            width: 100,
            height: 50
    })
    .toFormat('png')
    .grayscale(true)
    .toFile(`./assets/${filenb}.jpg`, function (err) {
        if (err) console.log(err);
    }),

    await Tesseract.recognize(
        (`./assets/${filenb}.jpg`),
        'eng', {
            logger: m => console.log(m)
        }
    ).then(({
        data: {
            text
        }
    }) => {
        log(text.replace(",", ""))
    })

    await log(filenb)
    await open(`C:/Users/Azkun/Desktop/GR-01/assets/${filenb}.jpg`)

}

screenShot()