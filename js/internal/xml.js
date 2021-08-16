async function xmlTracks(filePath) {
    tracksPromise = new Promise((resolve,reject) => {
        var xhr = new XMLHttpRequest;
        xhr.open('GET', filePath);
        xhr.send();
        xhr.onload = function() {
            if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                resolve(xmlParse(xhr.responseXML));
            }
        }
    });
    return await tracksPromise;
}
function xmlParse(xml) {
    trackCollections = xml.getElementsByTagName('Track');
    for(let i = 0; i < trackCollections.length; i++) {
        if(trackCollections[i].getAttribute('storeGateKey') == 'Tracks') {
            tracksDOM = trackCollections[i];
            break;
        }
    }
    nTracks = tracksDOM.getAttribute('count');
    trackObjs = new Array;
    for(let i = 0; i < nTracks; i++) {
        trackObjs[i] = new Object;
    }
    for(let i = 0; i < tracksDOM.children.length; i++) {
        itemsArray = tracksDOM.children[i].textContent.trim().replace('\n',' ').replace(/ +(?= )/g,'').split(' ');
        if (!(tracksDOM.children[i].getAttribute('multiple') > 1)) {
            for(let j = 0; j < nTracks; j++) {
                Object.defineProperty(trackObjs[j], tracksDOM.children[i].nodeName, {value: itemsArray[j]});
            }
        }
        else {
            step = (itemsArray.length/nTracks);
            for(let j = 0; j < nTracks; j++) {
                Object.defineProperty(trackObjs[j], tracksDOM.children[i].nodeName, {value: itemsArray.slice(j*step,(j+1)*step)});
            }
        }
    }
}