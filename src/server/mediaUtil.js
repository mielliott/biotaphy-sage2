
function getMediaPath(...entries) {
    let mediaPath = "";
    entries.forEach((entry) => {
        mediaPath += (mediaPath == "") ? entry : "_" + entry
    })
    return mediaPath;
}

module.exports = {
    getMediaPath: getMediaPath
}