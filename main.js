import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';
import MVT from 'ol/format/MVT.js';
import Graticule from 'ol/layer/Graticule.js';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import Stroke from 'ol/style/Stroke.js';
import TileDebug from 'ol/source/TileDebug.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import proj4 from 'proj4';
import { applyBackground, applyStyle } from 'ol-mapbox-style';
import { createXYZ } from 'ol/tilegrid.js';
import { applyTransform } from 'ol/extent.js';
import { get as getProjection, getTransform } from 'ol/proj.js';
import { register } from 'ol/proj/proj4.js';

const code = 'EPSG:4550';
const name = 'CGCS2000 / 3-degree Gauss-Kruger CM 123E';
const proj4def = 'PROJCS[\"CGCS2000 / 3-degree Gauss-Kruger CM 123E\",GEOGCS[\"China Geodetic Coordinate System 2000\",DATUM[\"China_2000\",SPHEROID[\"CGCS2000\",6378137,298.257222101,AUTHORITY[\"EPSG\",\"1024\"]],AUTHORITY[\"EPSG\",\"1043\"]],PRIMEM[\"Greenwich\",0,AUTHORITY[\"EPSG\",\"8901\"]],UNIT[\"degree\",0.0174532925199433,AUTHORITY[\"EPSG\",\"9122\"]],AUTHORITY[\"EPSG\",\"4490\"]],PROJECTION[\"Transverse_Mercator\"],PARAMETER[\"latitude_of_origin\",0],PARAMETER[\"central_meridian\",123],PARAMETER[\"scale_factor\",1],PARAMETER[\"false_easting\",500000],PARAMETER[\"false_northing\",0],UNIT[\"metre\",1,AUTHORITY[\"EPSG\",\"9001\"]],AUTHORITY[\"EPSG\",\"4550\"]]';
const bbox = [
    121.5,
    28.22,
    124.5,
    53.56
];

proj4.defs(code, proj4def);
register(proj4);
const china_4550 = getProjection(code);
const fromLonLat = getTransform('EPSG:4326', china_4550);

china_4550.setWorldExtent(bbox);

// approximate calculation of projection extent,
// checking if the world extent crosses the dateline
if (bbox[0] > bbox[2]) {
    bbox[2] += 360;
}
const extent = applyTransform(bbox, fromLonLat, undefined, 8);
china_4550.setExtent(extent);

const osmSource = new OSM();
const debugLayer = new TileLayer({
    source: new TileDebug({
        tileGrid: osmSource.getTileGrid(),
        projection: osmSource.getProjection(),
    }),
    visible: false,
});

// Match the server resolutions
const tileGrid = createXYZ({
    extent: [352748.56930578063, 3122822.417358633, 647251.4306942169, 5937990.422299586],
    tileSize: 256,
    maxResolution: 1150.401802298579,
    maxZoom: 24,
});

const point_layer = new VectorTileLayer({
    declutter: true,
    source: new VectorTileSource({
        projection: china_4550,
        tileGrid: tileGrid,
        format: new MVT(),
        url: 'http://192.168.1.4:11002/v1/tiles/china-bounds/bound_center_point/EPSG:4550/{z}/{y}/{x}.pbf'
    }),
    style: {
        'circle-radius': 5,
        'circle-fill-color': 'red'
    }
});

const roads_layer = new VectorTileLayer({
    declutter: true,
    source: new VectorTileSource({
        projection: china_4550,
        tileGrid: tileGrid,
        format: new MVT({
            layerName: 'roads'
        }),
        url: 'http://192.168.1.4:11002/v1/tiles/osm-china/roads/EPSG:4550/{z}/{y}/{x}.pbf',
    }),
    style: {
        'circle-radius': 5,
        'circle-fill-color': 'red',
        'stroke-color': 'green',
        'stroke-width': 3,
    }
});

const graticule = new Graticule({
    // the style to use for the lines, optional.
    strokeStyle: new Stroke({
        color: 'rgba(255,120,0,0.9)',
        width: 2,
        lineDash: [0.5, 4],
    }),
    showLabels: true,
    visible: false,
    wrapX: false,
});

const view = new View({
    projection: china_4550,
    center: [0, 0],
    zoom: 6,
})

const map = new Map({
    layers: [
        new TileLayer({
            source: osmSource,
        }),
        debugLayer,
        graticule,
        point_layer,
        roads_layer
    ],
    target: 'map',
    view
});

view.fit(extent);

function setProjection(code, name, proj4def, bbox) {
    if (code === null || name === null || proj4def === null || bbox === null) {
        map.setView(
            new View({
                projection: 'EPSG:3857',
                center: [0, 0],
                zoom: 1,
            }),
        );
        return;
    }

    proj4.defs(code, proj4def);
    register(proj4);
    const newProj = getProjection(code);
    const fromLonLat = getTransform('EPSG:4326', newProj);

    newProj.setWorldExtent(bbox);

    // approximate calculation of projection extent,
    // checking if the world extent crosses the dateline
    if (bbox[0] > bbox[2]) {
        bbox[2] += 360;
    }
    const extent = applyTransform(bbox, fromLonLat, undefined, 8);
    newProj.setExtent(extent);
    const newView = new View({
        projection: newProj,
    });
    map.setView(newView);
    newView.fit(extent);
}


// setProjection(code, name, proj4def, bbox);
