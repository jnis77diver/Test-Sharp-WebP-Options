const Sharp = require("sharp");

/*
    Call from command like
    Ex. 1:  $  npm run compress fountain.jpg      //  Quality will default to 80
    Ex. 2:  $  npm run compress fountain.jpg 90   // set quality to 90
*/
const convertImgToWebPAndCompress = async () => {
  try {
    //console.log(JSON.stringify(process.argv));
    if (process.argv.length <= 1)
      throw new Error("Please include original filename in command, e.g. 'npm run compress fountain.jpg 90'");

    const filename = process.argv[1];

    const imageQuality = process.argv.length <= 2 ? 80 : process.argv[2];

    // https://sharp.pixelplumbing.com/api-output#webp
    const options = {
      quality: +imageQuality, // 1 - 100    (optional, default 80)
      // alphaQuality  // number: 0 -100  (optional, default 100)
      // lossless   // boolean      (optional, default false)
      // nearLossless   // boolean     (optional, default false)
      // smartSubsample    // boolean     (optional, default false)
      // reductionEffort     // number  0 - 6   integer 0-6 (optional, default 4)
      // pageHeight      // number ? page height for animated output
      // loop       number  number of animation iterations, use 0 for infinite animation (optional, default 0)
      // delay        Array <number >? list of delays between animation frames (in milliseconds)
      // force       boolean  force WebP output, otherwise attempt to use input format (optional, default true))
    };

    const fileExtRegex = /^([^\\]*)\.(\w+)$/;
    const webPfilename = filename.match(fileExtRegex)[1] + ".webp";

    const sharpImageBuffer = await Sharp(filename)
      .webp(options)
      .toFile(webPfilename)
      .then((info) => {
        console.log(`${webPfilename}: successfully created`);
      })
      .catch((err) => {
        console.log(`${webPfilename}: failed to create`);
      });
    // .toBuffer();
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createWebP: convertImgToWebPAndCompress,
};
