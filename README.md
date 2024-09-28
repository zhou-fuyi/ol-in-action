# ol-in-action

- [Quick Start](https://openlayers.org/doc/quickstart.html)
- [Tutorials](https://openlayers.org/doc/tutorials/)
- [Workshop](https://openlayers.org/workshop/en/)
- [Vite](https://cn.vitejs.dev/)


## 关于ES Modules？

## Basic Concepts（基本概念）

https://openlayers.org/doc/tutorials/concepts.html

### Map

The core component of OpenLayers is the map (from the ol/Map module). It is rendered to a target container (e.g. a div element on the web page that contains the map). All map properties can either be configured at construction time, or by using setter methods, e.g. setTarget().

OpenLayers 的核心组件是 Map (来自 ol/Map 模块)。它被渲染到一个目标容器(例如，包含地图的 Web 页面上的 div 元素)。所有的 map 属性可以在构造时配置，也可以使用 setter 方法，例如 setTarget ()。

The markup below could be used to create a `<div>` that contains your map.

下面的标记可用于创建包含您地图的`<div>`。

```js
<div id="map" style="width: 100%; height: 400px"></div>
```

The script below constructs a map that is rendered in the `<div>` above, using the map id of the element as a selector.

下面的脚本构造了上面`<div>`中渲染的地图，使用元素的映射ID作为选择器。

```js
import Map from 'ol/Map.js';

const map = new Map({target: 'map'});
```

### View

The map is not responsible for things like center, zoom level and projection of the map. Instead, these are properties of a ol/View instance.

地图对象对地图上的中心，缩放级别和地图投影之类的东西不承担任何责任。相反，这些是OL/View实例的属性。

> 感觉像是将渲染和逻辑处理分离，Map处理地图的渲染，View则提供地图相关的逻辑操作能力，其中Layer则是数据的载体。

```js
import View from 'ol/View.js';

map.setView(new View({
  center: [0, 0],
  zoom: 2,
}));
```

A View also has a projection. The projection determines the coordinate system of the center and the units for map resolution calculations. If not specified (like in the above snippet), the default projection is Spherical Mercator (EPSG:3857), with meters as map units.

视图还具有投影。投影确定地图中心的坐标系和分辨率计算的单位。如果未指定（如上面的代码片段所示），则默认投影为球面墨卡托 (EPSG:3857)，以米为地图单位。

The zoom option is a convenient way to specify the map resolution. The available zoom levels are determined by maxZoom (default: 28), zoomFactor (default: 2) and maxResolution (default is calculated in such a way that the projection's validity extent fits in a 256x256 pixel tile). Starting at zoom level 0 with a resolution of maxResolution units per pixel, subsequent zoom levels are calculated by dividing the previous zoom level's resolution by zoomFactor, until zoom level maxZoom is reached.

zoom 选项是指定地图分辨率的便捷方式。可用的缩放级别由 maxZoom（默认值：28）、zoomFactor（默认值：2）和 maxResolution（默认值以投影的有效范围适合 256x256 像素图块的方式计算）决定。从缩放级别 0 开始，分辨率为每像素 maxResolution 单位，后续缩放级别通过将前一个缩放级别的分辨率除以 zoomFactor 来计算，直到达到缩放级别 maxZoom。

> Zoom即为地图的比例尺分级，0级表示最小比例尺等级（最大分辨率），假设瓦片的大小为256x256，那么该级的分辨率即为所选投影的有效范围（即Extent）与瓦片大小（256x256）的比例表示。通俗的说，就是用一张瓦片表示投影的有效范围的情况即为最小比例尺等级。

### Source

To get remote data for a layer, OpenLayers uses ol/source/Source subclasses. These are available for free and commercial map tile services like OpenStreetMap or Bing, for OGC sources like WMS or WMTS, and for vector data in formats like GeoJSON or KML.

OpenLayers 使用 ol/source/Source 子类来获取图层的远程数据。这些子类可用于免费和商业地图瓦片服务（如 OpenStreetMap 或 Bing）、OGC 源（如 WMS 或 WMTS）以及 GeoJSON 或 KML 等格式的矢量数据。

```js
import OSM from 'ol/source/OSM.js';

const source = new OSM();
```

### Layer

A layer is a visual representation of data from a source. OpenLayers has four basic types of layers:

- ol/layer/Tile - Renders sources that provide tiled images in grids that are organized by zoom levels for specific resolutions.
- ol/layer/Image - Renders sources that provide map images at arbitrary extents and resolutions.
- ol/layer/Vector - Renders vector data client-side.
- ol/layer/VectorTile - Renders data that is provided as vector tiles.

图层是来自源的数据的视觉表示。OpenLayers 有四种基本类型的图层：

- ol/layer/Tile - 在网格中提供按特定分辨率的缩放级别组织的平铺图像。
- ol/layer/Image - 提供任意范围和分辨率的地图图像。
- ol/layer/Vector - 在客户端渲染矢量数据。
- ol/layer/VectorTile - 提供矢量瓦片的支持。

```js
import TileLayer from 'ol/layer/Tile.js';

// ...
const layer = new TileLayer({source: source});
map.addLayer(layer);
```

### Putting it all together

The above snippets can be combined into a single script that renders a map with a single tile layer:

上述代码片段可以组合成一个脚本，用单个瓦片层（图层）来渲染地图：

```js
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';

new Map({
  layers: [
    new TileLayer({source: new OSM()}),
  ],
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
  target: 'map',
});
```

## FAQ

### 为什么示例给出的main.js中直接引入了style.css

```js
import './style.css';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});
```

The import './style.css'; line might be a bit unexpected. In this example, we're using Vite as a development server. Vite allows CSS to be imported from JavaScript modules. If you were using a different development server, you might include the style.css in a <link> tag in the index.html instead.

import './style.css'; 这行可能有点出乎意料。在此示例中，我们使用 Vite 作为开发服务器。**Vite 允许从 JavaScript 模块导入 CSS。**如果您使用的是其他开发服务器，则可以改为将 style.css 包含在 index.html 中的 <link> 标记中。