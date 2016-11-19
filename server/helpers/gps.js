var Gps = {
    /* Éhontément inspiré de cozy-photos */
    degreesToDecimal: function(position, direction) {
        var split = position.match(/(\d+)\/(\d+), (\d+)\/(\d+), (\d+)\/(\d+)/);
        var coord = null;
        var sign = direction == 'S' || direction == "W" ? -1 : 1;

        // latitude & longitude
        if(split[6]) {
            coord = split[1] / split[2];            // degree
            coord += (split[3] / split[4]) / 60;    // minutes
            coord += (split[5] / split[6]) / 3600;  // seconds
        } else {
        // alitude
            split = position.match(/(\d+)\/(\d+)/);
            if(split) coord = split[1] / split[2];
        }

        if(coord)
            return coord * sign;
        else
            return null;
    },
    fromExif: function(exif) {
        const alt = 'exif:GPSAltitude';
        const lat = 'exif:GPSLatitude';
        const lng = 'exif:GPSLongitude';
        const ref = 'Ref';

        var gps = {};

        if(exif[lat]) gps.lat = degreesToDecimal(exif[lat], exif[lat + ref]);
        if(exif[lng]) gps.long = degreesToDecimal(exif[lng], exif[lng + ref]);
        if(exif[alt]) gps.alt = degreesToDecimal(exif[alt], exif[alt + ref]);

        return gps;
    }
}

module.exports = Gps;
