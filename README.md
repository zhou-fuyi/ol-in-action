# ol-in-action

Version: v10.2.1

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

## Background（背景资料）

### Overview

OpenLayers is a modular, high-performance, feature-packed library for displaying and interacting with maps and geospatial data.

OpenLayers 是一个模块化、高性能、功能丰富的库，用于显示和交互地图和地理空间数据。

The library comes with built-in support for a wide range of commercial and free image and vector tile sources, and the most popular open and proprietary vector data formats. With OpenLayers's map projection support, data can be in any projection.

该库内置了对各种商业和免费图像和矢量瓦片源以及最流行的开放和专有矢量数据格式的支持。借助 OpenLayers 的地图投影支持，数据可以采用任何投影。

> 总的来说，可见Openlayers对于地理空间数据的支持很好，且可以支持任何的投影。

### Public API

OpenLayers is available as [ol npm package](https://www.npmjs.com/package/ol), which provides all modules of the officially supported API.

OpenLayers 作为 npm 包提供，它提供了官方支持的 API 的所有模块。

### Browser Support

OpenLayers runs on all modern browsers (with greater than 1% global usage). This includes Chrome, Firefox, Safari and Edge. For older browsers, polyfills (Fastly or Cloudflare) will likely need to be added.

OpenLayers 可在所有现代浏览器上运行（全球使用率超过 1%）。其中包括 Chrome、Firefox、Safari 和 Edge。对于较旧的浏览器，可能需要添加 polyfill（Fastly 或 Cloudflare）。

The library is intended for use on both desktop/laptop and mobile devices, and supports pointer and touch interactions.

该库适用于台式机/笔记本电脑和移动设备，并支持指针和触摸交互。

### Module and Naming Conventions（模块与命名约定）

OpenLayers modules with CamelCase names provide classes as default exports, and may contain additional constants or functions as named exports:

具有 CamelCase 名称的 OpenLayers 模块提供类作为默认导出，并且可以包含其他常量或函数作为命名导出：

```js
import Map from 'ol/Map.js';
import View from 'ol/View.js';
```

Class hierarchies grouped by their parent are provided in a subfolder of the package, e.g. layer/.

按父级分组的类层次结构在包的子文件夹中提供，例如 layer/。

For convenience, these are also available as named exports, e.g.

为了方便起见，这些也可以作为命名导出使用，例如

```js
import {Map, View} from 'ol';
import {Tile, Vector} from 'ol/layer.js';
```

In addition to these re-exported classes, modules with lowercase names also provide constants or functions as named exports:

除了这些重新导出（re-exported）的类之外，具有小写名称的模块还提供常量或函数作为命名导出：

```js
import {getUid} from 'ol';
import {fromLonLat} from 'ol/proj.js';
```

## Raster Reprojection（栅格重投影）

OpenLayers has an ability to display raster data from WMS, WMTS, static images and many other sources in a different coordinate system than delivered from the server. Transformation of the map projections of the image happens directly in a web browser. The view in any Proj4js supported coordinate reference system is possible and previously incompatible layers can now be combined and overlaid.

OpenLayers 能够以不同于服务器提供的坐标系显示来自 WMS、WMTS、静态图像和许多其他来源的栅格数据。图像的地图投影转换直接在 Web 浏览器中进行。可以使用任何 Proj4js 支持的坐标参考系统进行查看，并且现在可以组合和叠加以前不兼容的图层。

> 听起来就感觉很厉害的样子啊，哈

### Usage

The API usage is very simple. Just specify proper projection (e.g. using EPSG code) on ol/View:

API 使用非常简单。只需在 ol/View 上指定适当的投影（例如使用 EPSG 代码）：

```js
import Map from 'ol/Map.js';
import TileLayer from 'ol/layer/Tile.js';
import TileWMS from 'ol/source/TileWMS.js';
import View from 'ol/View.js';

const map = new Map({
  target: 'map',
  view: new View({
    projection: 'EPSG:3857', // here is the view projection
    center: [0, 0],
    zoom: 2,
  }),
  layers: [
    new TileLayer({
      source: new TileWMS({
        projection: 'EPSG:4326', // here is the source projection
        url: 'https://ahocevar.com/geoserver/wms',
        params: {
          'LAYERS': 'ne:NE1_HR_LC_SR_W_DR',
        },
      }),
    }),
  ],
});
```

If a source (based on ol/source/TileImage or ol/source/Image) has a projection different from the current ol/View’s projection then the reprojection happens automatically under the hood.

如果源（基于 ol/source/TileImage 或 ol/source/Image）具有与当前 ol/View 投影不同的投影，则重新投影会在后台自动发生。

> 此处的后台应该是指ol的后台线程，并不是服务端

**性能和注意事项（From ChatGPT）**

性能开销：

栅格重投影是一个计算密集型的过程，尤其是在较大缩放级别或加载大量瓦片时，会消耗更多的 CPU 和内存资源。为了解决这个问题，OpenLayers 可以在后台线程中处理重投影任务，最大化性能。

重投影精度：

虽然 OpenLayers 提供了高效的重投影功能，但在重投影过程中可能会出现一些小的精度损失，尤其是在极地等高纬度区域。这是由于不同投影之间的几何变换不可避免地带来插值误差。

插值方法：

在重采样过程中，插值方法可以影响最终结果的图像质量。OpenLayers 默认使用最近邻插值方法，但可以通过调整设置来使用其他插值技术。

兼容性：

栅格重投影适用于大多数现代浏览器，但某些设备或浏览器可能因为硬件或性能限制而无法流畅运行。

### Examples

- [Raster reprojection demo](https://openlayers.org/en/latest/examples/reprojection.html)
- [OpenStreetMap to WGS84 reprojection](https://openlayers.org/en/latest/examples/reprojection-wgs84.html)
- [Reprojection with EPSG.io database search](https://openlayers.org/en/latest/examples/reprojection-by-code.html)
- [Image reprojection](https://openlayers.org/en/latest/examples/reprojection-image.html)

### Custom projection

The easiest way to use a custom projection is to add the [Proj4js](http://proj4js.org/) library to your project and then define the projection using a proj4 definition string. It can be installed with

使用自定义投影的最简单方法是将 Proj4js 库添加到您的项目中，然后使用 proj4 定义字符串定义投影。它可以通过以下方式安装：

```sh
npm install proj4
```

Following example shows definition of a British National Grid:

以下示例显示了英国国家电网（EPSG:27700）的定义：

```js
import proj4 from 'proj4';
import {get as getProjection} from 'ol/proj.js';
import {register} from 'ol/proj/proj4.js';

proj4.defs('EPSG:27700', '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 ' +
    '+x_0=400000 +y_0=-100000 +ellps=airy ' +
    '+towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 ' +
    '+units=m +no_defs');
register(proj4);
const proj27700 = getProjection('EPSG:27700');
proj27700.setExtent([0, 0, 700000, 1300000]);
```

### Change of the view projection

To switch the projection used to display the map you have to set a new ol/View with selected projection on the ol/Map:

要切换用于显示地图的投影，您必须在 ol/Map 上设置一个具有选定投影的新 ol/View：

```js
map.setView(new View({
  projection: 'EPSG:27700',
  center: [400000, 650000],
  zoom: 4,
}));
```

### TileGrid and Extents（瓦片格网和范围）

TileGrid：瓦片格网或者是瓦片矩阵，对应着TileMatrix。聚集而成的集合则是TileMatrixSet，即我们常说的切片方案

When reprojection is needed, new tiles (in the target projection) are under the hood created from the original source tiles. The TileGrid of the reprojected tiles is by default internally constructed using ol/tilegrid~getForProjection(projection). The projection should have extent defined (see above) for this to work properly.

当需要重新投影时，新的瓦片（在目标投影中）基于原始源瓦片在后台创建。重新投影的瓦片的 TileGrid 默认使用 ol/tilegrid~getForProjection(projection) 在内部构建。投影应该具有定义的范围（见上文）才能正常工作。

Alternatively, a custom target TileGrid can be constructed manually and set on the source instance using ol/source/TileImage~setTileGridForProjection(projection, tilegrid). This TileGrid will then be used when reprojecting to the specified projection instead of creating the default one. In certain cases, this can be used to optimize performance (by tweaking tile sizes) or visual quality (by specifying resolutions).

或者，可以手动构建自定义目标 TileGrid，并使用 ol/source/TileImage~setTileGridForProjection(projection, tilegrid) 在源实例上进行设置。然后，在重新投影到指定投影时将使用此 TileGrid，而不是创建默认投影。在某些情况下，这可用于优化性能（通过调整瓦片大小）或视觉质量（通过指定分辨率）。

### How it works

The reprojection process is based on triangles – the target raster is divided into a limited number of triangles with vertices transformed using ol/proj capabilities ([proj4js](http://proj4js.org/) is usually utilized to define custom transformations). The reprojection of pixels inside the triangle is approximated with an affine transformation (with rendering hardware-accelerated by the canvas 2d context):

重新投影过程基于三角形 - 将目标栅格划分为有限数量的三角形，并使用 ol/proj 功能对顶点进行转换（通常使用 proj4js 来定义自定义转换）。三角形内部像素的重新投影用仿射变换来近似（通过 canvas 2d 上下文进行硬件加速渲染）：

![how it work](/image/how-it-works.jpg)

This way we can support a wide range of projections from proj4js (or even custom transformation functions) on almost any hardware (with canvas 2d support) with a relatively small number of actual transformation calculations.

这样，我们就可以在几乎任何硬件（支持 Canvas 2d）上以相对较少的实际转换计算支持来自 proj4js 的广泛投影（甚至自定义转换函数）。

The precision of the reprojection is then limited by the number of triangles.

重新投影的精度受到三角形数量的限制。

The reprojection process preserves transparency on the raster data supplied from the source (png or gif) and the gaps and no-data pixels generated by reprojection are automatically transparent.

重新投影过程保留了从源（png 或 gif）提供的栅格数据的透明度，并且重新投影产生的间隙和无数据像素自动透明。

### Dynamic triangulation（动态三角剖分）

The above image above shows a noticeable error (especially on the edges) when the original image (left; EPSG:27700) is transformed with only a limited number of triangles (right; EPSG:3857). The error can be minimized by increasing the number of triangles used.

上图显示了当原始图像（左图；EPSG：27700）仅使用有限数量的三角形（右图；EPSG：3857）进行转换时出现的明显错误（尤其是在边缘处）。可以通过增加使用的三角形数量来最小化错误。

Since some transformations require a more detail triangulation network, the dynamic triangulation process automatically measures reprojection error and iteratively subdivides to meet a specific error threshold:

由于某些变换需要更详细的三角剖分网络，动态三角剖分过程会自动测量重投影误差，并迭代细分以满足特定的误差阈值：

![](/image/iterative-triangulation.png)

> proj4js transformed points proj4js 转换点
>
> caclculated error above threshold 计算误差高于阈值 
>
> caclculated error acceptable 计算误差可接受

For debugging, rendering of the reprojection edges can be enabled by ol.source.TileImage#setRenderReprojectionEdges(true).

为了调试，可以通过 ol.source.TileImage#setRenderReprojectionEdges(true) 启用重新投影边缘的渲染。

### Advanced

#### Triangulation precision threshold（三角剖分精度阈值）

The default triangulation error threshold in pixels is given by ERROR_THRESHOLD (0.5 pixel). In case a different threshold needs to be defined for different sources, the reprojectionErrorThreshold option can be passed when constructing the tile image source.

默认的三角剖分误差阈值（以像素为单位）由 ERROR_THRESHOLD（0.5 像素）给出。如果需要为不同的源（Source）定义不同的阈值，可以在构建瓦片图像源（the tile image source）时传递 reprojectionErrorThreshold 选项。

#### Limiting visibility of reprojected map by extent（按范围限制重新投影地图的可见性）

The reprojection algorithm uses inverse transformation (from view projection to data projection). For certain coordinate systems this can result in a "double occurrence" of the source data on a map. For example, when reprojecting a map of Switzerland from EPSG:21781 to EPSG:3857, it is displayed twice: once at the proper place in Europe, but also in the Pacific Ocean near New Zealand, on the opposite side of the globe.

重投影算法使用逆变换（从视图投影到数据投影）。对于某些坐标系，这可能会导致源数据在地图上“重复出现”。例如，当将瑞士地图从 EPSG:21781 重新投影到 EPSG:3857 时，它会显示两次：一次在欧洲的正确位置，另一次是在地球另一侧新西兰附近的太平洋。

![](/image/double-occurrence.jpg)

Although this is mathematically correct behavior of the inverse transformation, visibility of the layer on multiple places is not expected by users. A possible general solution would be to calculate the forward transformation for every vertex as well - but this would significantly decrease performance (especially for computationally expensive transformations).

虽然这在数学上是正确的逆变换行为，但用户并不期望该层在多个位置可见。一个可能的通用解决方案是也计算每个顶点的正向变换 - 但这会显著降低性能（尤其是对于计算成本高的变换）。

Therefore a recommended workaround is to define a proper visibility extent on the ol.layer.Tile in the view projection. Setting such a limit is demonstrated in the [reprojection demo example](https://openlayers.org/en/latest/examples/reprojection.html).

因此，建议的解决方法是在视图投影中为 ol.layer.Tile 定义适当的可见性范围。重投影演示示例中演示了如何设置此类限制。

### Resolution calculation

When determining source tiles to load, the ideal source resolution needs to be calculated. The ol/reproj~calculateSourceResolution(sourceProj, targetProj, targetCenter, targetResolution) function calculates the ideal value in order to achieve pixel mapping as close as possible to 1:1 during reprojection, which is then used to select proper zoom level from the source.

在确定要加载的源瓦片时，需要计算理想的源分辨率。ol/reproj~calculateSourceResolution(sourceProj, targetProj, targetCenter, targetResolution) 函数计算理想值，以便在重新投影期间实现尽可能接近 1:1 的像素映射，然后使用该理想值从源中选择适当的缩放级别。

It is, however, generally not practical to use the same source zoom level for the whole target zoom level -- different projections can have significantly different resolutions in different parts of the world (e.g. polar regions in EPSG:3857 vs EPSG:4326) and enforcing a single resolution for the whole zoom level would result in some tiles being scaled up/down, possibly requiring a huge number of source tiles to be loaded. Therefore, the resolution mapping is calculated separately for each reprojected tile (in the middle of the tile extent).

但是，通常不建议将相同的源缩放级别用于整个目标缩放级别——不同的投影在世界不同地区可能具有明显不同的分辨率（例如 EPSG：3857 与 EPSG：4326 中的极地地区），并且强制使用单一分辨率用于整个缩放级别会导致某些图块被放大/缩小，可能需要加载大量源瓦片。因此，分辨率映射是针对每个重新投影的瓦片（in the middle of the tile extent）单独计算的。

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

### 什么是 “re-exported”？

`Re-exported` 是一个编程术语，指的是**重新导出**从另一个模块或文件中导入的内容。简单来说，它是把从某个模块导入的内容再导出，以便其他模块可以从当前模块中访问这些导出的内容。

#### 例子解释

假设我们有多个模块，其中一个模块导入了另一个模块的内容，并把它再导出，这就是 `re-exported` 的过程。

##### 示例 1：基础的 `Re-export`
假设我们有以下文件结构：

1. **`module1.js`**：
   ```javascript
   export const foo = () => {
     console.log('Hello from foo');
   };
   ```

2. **`module2.js`**：
   在这个文件中，我们从 `module1.js` 导入 `foo` 并重新导出它：
   ```javascript
   export { foo } from './module1';
   ```

3. **`main.js`**：
   在 `main.js` 文件中，我们直接从 `module2.js` 导入 `foo`：
   ```javascript
   import { foo } from './module2';

   foo(); // 输出: Hello from foo
   ```

在这个例子中：
- `module2.js` 从 `module1.js` 中导入了 `foo`，并使用 `export { foo }` 将它重新导出（`re-export`）。
- `main.js` 可以直接从 `module2.js` 中导入 `foo`，而不需要知道 `foo` 实际上来自于 `module1.js`。

#### 何时使用 `Re-export`？
- **模块聚合**：当你有多个模块，需要为它们创建一个统一的接口时，可以使用 `re-export`。这可以简化代码，并让调用者只需要知道一个导出模块即可。
- **重构代码时**：如果你在不断重构模块结构，使用 `re-export` 能够让外部依赖你的模块的代码不受影响，只需要你在重新导出的模块上进行调整。
  
#### 进一步的例子

##### 示例 2：`Re-export` 多个模块

假设有以下结构：

1. **`math.js`**：
   ```javascript
   export const add = (a, b) => a + b;
   export const subtract = (a, b) => a - b;
   ```

2. **`string.js`**：
   ```javascript
   export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
   export const lowercase = str => str.toLowerCase();
   ```

3. **`index.js`**：
   在这里我们将 `math.js` 和 `string.js` 的内容重新导出：
   ```javascript
   export * from './math';
   export * from './string';
   ```

4. **`app.js`**：
   ```javascript
   import { add, capitalize } from './index';

   console.log(add(5, 3));  // 输出: 8
   console.log(capitalize('hello'));  // 输出: Hello
   ```

在这个例子中，`index.js` 重新导出了 `math.js` 和 `string.js` 中的所有导出内容（`export *`）。通过 `app.js` 可以直接从 `index.js` 中导入它们，达到模块聚合的目的。

#### 总结
- **Re-export** 是重新导出已经从其他模块导入的内容。
- 它允许模块为其他模块提供统一的接口，而无需暴露底层模块的复杂性。
- 典型用途包括模块聚合和简化模块结构。

### 为什么使用逆向投影而不是正向投影？

你提到的从 EPSG:3857 到 EPSG:21781 的“逆向投影”过程确实令人困惑，让我们来理清这一点。

在地图渲染过程中，尤其是在栅格图像或瓦片地图（如 OpenLayers 中的瓦片地图）中，有时会涉及到**逆向投影**。虽然从 EPSG:21781 到 EPSG:3857 的正向投影是大多数情况下使用的，但在实际渲染和数据访问过程中，逆向投影的确会出现。以下是为何这种逆向投影会在某些场景下被使用的原因。

#### 1. **图块渲染的过程**

当我们在 EPSG:3857 坐标系下显示世界地图时，地图通常是由许多瓦片（图块）组成的。这些瓦片对应的是地球表面的不同区域。每个瓦片有自己的边界和坐标。

##### 1.1 **正向投影：从 EPSG:21781 到 EPSG:3857**
在将原始数据（比如瑞士地区的数据，通常是 EPSG:21781 投影）加载到 EPSG:3857 的地图中时，通常进行正向投影，将瑞士的局部投影转换为全球 Web Mercator 投影。

- 对于矢量数据（如点、线、面），这是直接的，将 EPSG:21781 坐标转换为 EPSG:3857 的坐标即可。
  
- 对于栅格或瓦片数据（如卫星图像或地图图层），情况稍微复杂一些。如果要将原始瓦片数据从 EPSG:21781 投影转换为 EPSG:3857 投影，需要处理每个图块。

##### 1.2 **逆向投影的原因**
逆向投影的使用主要与栅格数据（如图像）重投影有关。在渲染瓦片图像时，通常不直接将源数据转换为目标投影坐标（正向投影），而是采用**逆向映射（inverse mapping）**的方式来决定每个目标图像像素在源数据中的位置。

举例来说，假设你正在渲染一个 EPSG:3857 投影的地图瓦片，这个瓦片覆盖某个区域。每一个瓦片的像素点在 EPSG:3857 坐标系下都有一个具体的坐标值。

1. **渲染引擎的操作**：对于每一个瓦片中的像素点，渲染引擎会尝试找到这个像素点在原始投影系统（比如 EPSG:21781）中的对应坐标。这是一个从目标投影（EPSG:3857）“逆向投影”到原始投影（EPSG:21781）的过程。

2. **获取数据**：找到 EPSG:21781 的对应坐标后，系统会去查找源数据在这个坐标上的值，可能是地理特征、栅格颜色等。

3. **绘制像素**：最终，渲染引擎使用这个源数据来绘制瓦片中的像素。这样就完成了栅格图像的重投影。

通过这种方式，渲染引擎避免了对整个源数据集进行一次性全局转换，而是只对每个需要显示的瓦片内的像素点进行计算。这种方法称为**逐像素逆向映射**，在重投影过程中非常常见，尤其是栅格图像数据的投影转换。

#### 2. **为什么不用直接正向投影？**

你可能会问，为什么不直接把 EPSG:21781 的数据转换为 EPSG:3857，然后显示在地图上？

以下是逆向投影被使用而不是直接正向投影的原因：

- **效率问题**：如果直接进行正向投影，将会涉及到对整个原始数据进行批量转换，这在处理大量栅格数据时计算成本很高。尤其是在处理全球数据时，如果直接正向投影所有数据，可能会有很多不必要的计算（因为你只需要显示一小部分数据）。

- **避免全局数据转换**：通过逆向投影，渲染引擎只需要对实际要显示的图块进行转换。这意味着只转换可视区域中的像素，而无需将整个数据集转换到新的坐标系。这对性能是一个很大的优化。

- **逐瓦片绘制**：逆向投影允许引擎仅根据显示的瓦片进行局部计算，并避免对源数据进行大规模的批量转换。这在栅格图像处理（如卫星图像）中非常重要，尤其当源数据可能来自多个投影系统时。

#### 3. **双重显示的原因**

在这种情况下，瑞士地图的双重显示可能是因为 Web Mercator 投影试图在多个全球坐标位置应用瑞士的局部投影系统。在逆向投影过程中，某些全球坐标（如在太平洋的新西兰附近）可能被错误地映射到瑞士的 EPSG:21781 坐标中，从而导致瑞士的数据被重复显示在这些位置上。

这可以通过以下方式总结：

- **逆向投影时的全局映射**：当 Web Mercator 投影覆盖全球时，它会试图为每个瓦片找到在源投影（EPSG:21781）中的对应位置。由于 EPSG:21781 是局部投影，它的坐标系在全球范围内没有明确的限制，因此可以在地球的不同位置重复映射。这就导致了瑞士的图块可能会在错误的地理位置（如新西兰附近）显示出来。

- **未设置地理边界**：如果没有为数据设置合适的地理边界，或者没有限制数据只在瑞士附近显示，那么瑞士的地图块可能会在全球多个位置通过逆向投影重复出现。

#### 4. **如何避免双重显示**

为了避免这种问题，通常采取以下几种方法：

1. **设置显示范围**：为数据设置合理的显示边界，限制其只在指定的地理区域（如瑞士附近）显示。这样可以避免在全球其他地方重复显示数据。

2. **裁剪数据**：通过裁剪或过滤，只渲染那些在可视区域范围内的图块，避免显示不在目标区域的图块。

3. **调整投影设置**：确保在重投影过程中，使用正确的投影转换方法，避免将局部投影系统的数据错误映射到全球其他区域。

#### 总结

逆向投影是地图渲染中的一种常用技术，尤其是当处理栅格图像数据时。它通过将目标投影系统中的每个像素点逆向映射回源投影系统来决定源数据的位置和内容。这种方法避免了大规模正向转换的计算开销，但也可能在处理全球投影（如 EPSG:3857）时，导致局部数据（如 EPSG:21781 的瑞士地图）在全球其他位置出现重复映射。
