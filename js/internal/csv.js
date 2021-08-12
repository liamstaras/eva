async function csvTracks(filePath) {
    tracksPromise = new Promise((resolve, reject) => {
        Papa.parse(
            filePath,
            {
                download: true,
                header: true,
                complete: function(results) {
                    resolve(jsonTracks(results.data));
                }
            }
        )
    });
    return await tracksPromise;
}
function jsonTracks(tracksArray) {
    return tracksArray.map(track => new Track(track, 100))
}