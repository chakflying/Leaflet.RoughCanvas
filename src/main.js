import rough from "../node_modules/roughjs/bin/rough";
import "../node_modules/canvas-5-polyfill/canvas";

var RoughCanvas = L.Canvas.extend({
  _initContainer: function () {
    L.Canvas.prototype._initContainer.call(this);
    this._rc = rough.canvas(this._container);
  },

  _updatePoly: function (layer, closed) {
    if (!this._drawing) {
      return;
    }

    var parts = layer._parts,
      len = parts.length,
      ctx = this._ctx;

    if (!len) {
      return;
    }

    var options = layer.options;
    var pathOption = {};

    pathOption.roughness = options.roughness || 1;
    pathOption.bowing = options.bowing || 1;
    pathOption.stroke = options.strokeColor || "#000000";
    pathOption.strokeWidth = options.strokeWidth || 1;
    if (closed) {
      pathOption.fill = options.fillColor || options.color;
      pathOption.fillStyle = options.fillStyle || "";
      pathOption.fillWeight = options.fillWeight || "";
      pathOption.hachureAngle = options.hachureAngle || -41;
      pathOption.hachureGap = options.hachureGap || 4;
      pathOption.simplification = options.simplification || 0.5;
    }
    pathOption.curveStepCount = options.curveStepCount || 9;

    var svgPathStr = L.SVG.pointsToPath(parts, closed);
    this._rc.path(svgPathStr, pathOption);

    layer.options.fillOpacity = 0;
    // layer.options.opacity = 0;
    L.Canvas.prototype._updatePoly.call(this, layer, closed);
  },

  _onClick: function (e) {
    var point = this._map.mouseEventToLayerPoint(e), layer, clickedLayer;
    console.log(point);

		for (var order = this._drawFirst; order; order = order.next) {
			layer = order.layer;
			if (layer.options.interactive && layer._containsPoint(point)) {
				if (!(e.type === 'click' || e.type !== 'preclick') || !this._map._draggableMoved(layer)) {
					clickedLayer = layer;
				}
			}
		}
		if (clickedLayer)  {
			DomEvent.fakeStop(e);
			this._fireEvent([clickedLayer], e);
		}
	},
});

L.Canvas.RoughCanvas = RoughCanvas;

L.Canvas.roughCanvas = () => {
  return new RoughCanvas();
};
