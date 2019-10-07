"use strict";

var makerjs = require("makerjs");

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("canvas").addEventListener("click", function () {
    if (document.querySelector("#linkContainer")) {
      document.querySelector("#linkContainer").remove();
    }

	var pathData = coordinates
		.reverse()
		.map(convertToSVGPath)
		.filter(removeUndefined)
		.join("");
	console.log(pathData)

    if (coordinates.length > 1) {
      var svg = makerjs.exporter.toSVG(makerjs.importer.fromSVGPathData(pathData, {useSvgPathOnly: true}));
      var dxf = makerjs.exporter.toDXF(makerjs.importer.fromSVGPathData(pathData, {useSvgPathOnly: true}));
      var dxfLink = document.createElement('a');

      dxfLink.innerHTML = "Last ned .dxf (Silhouette Studio)";
      dxfLink.href = "data:application/octet-stream," + encodeURIComponent(dxf);
      dxfLink.download = 'Scratch-tegning.dxf';
      
	  var svgLink = document.createElement('a');
      svgLink.innerHTML = "Last ned .svg";
      svgLink.href = "data:application/octet-stream," + encodeURIComponent(svg);
      svgLink.download = 'Scratch-tegning.svg';
      
	  var closeButton = document.createElement("button");
	  closeButton.innerHTML = "[x]"
	  closeButton.style.position = "relative"
	  closeButton.style.float = "right"
	  closeButton.addEventListener("click", function() {
		  document.querySelector("#linkContainer").remove();
	  })
	  
	  var div = document.createElement("div");
      div.id = "linkContainer";
      div.innerHTML = "<p>Høyreklikk og lagre som:</p>";
	  div.appendChild(closeButton)
	  
      
	  var p1 = document.createElement("p");
      var p2 = document.createElement("p");
      
	  div.style.backgroundColor = "white";
      div.style.border = "1px solid black";
      div.style.padding = "10px";
      div.style.position = "absolute";
      div.style.left = "".concat(event.clientX, "px");
      div.style.top = "".concat(event.clientY, "px");
      
	  p1.appendChild(dxfLink);
      p2.appendChild(svgLink);
      
	  div.appendChild(p1);
      div.appendChild(p2);
      document.body.appendChild(div);
    }

    function convertToSVGPath(element, index) {
      if ("penDown" in element) {
        penDown = element.penDown;
      }
	  
	  if (index === 0) {
		  return "M".concat(element.x || coordinates[index + 1].x || 0, ", ").concat(element.y * -1 || coordinates[index + 1].y * -1 || 0);
	  }

      if ("x" in element) {
        if (!penDown && index > 0) {
          return "M".concat(element.x, ", ").concat(element.y * -1);
		}


        if (penDown && index < coordinates.length - 1) {
          return "L".concat(element.x, ", ").concat(element.y * -1, " ");
        } else if (index + 1 < coordinates.length - 1) {
          return "M".concat(coordinates[index + 1].x, ", ").concat(coordinates[index + 1].y * -1, " ");
        }
      }
    }

    function removeUndefined(e) {
      return e !== undefined;
    }
  });
});

/*
const makerjs = require("makerjs")

document.addEventListener("DOMContentLoaded", function() {
	document.querySelector("canvas").addEventListener("click", function() {
		if (document.querySelector("#linkContainer")) {
			document.querySelector("#linkContainer").remove()
		}
		const pathData = coordinates.map(convertToSVGPath).filter(removeUndefined).join("");

		if (coordinates.length > 1) {
			const svg = makerjs.exporter.toSVG(makerjs.importer.fromSVGPathData(pathData));
			const dxf = makerjs.exporter.toDXF(makerjs.importer.fromSVGPathData(pathData));

			const dxfLink = document.createElement('a');
			dxfLink.innerHTML = "Last ned .dxf (Silhouette Studio)"
			dxfLink.href = "data:application/octet-stream,"+encodeURIComponent(dxf);
			dxfLink.download = 'Scratch-tegning.dxf';

			const svgLink = document.createElement('a');
			svgLink.innerHTML = "Last ned .svg"
			svgLink.href = "data:application/octet-stream,"+encodeURIComponent(svg);
			svgLink.download = 'Scratch-tegning.svg';
			
			const div = document.createElement("div")
			div.id = "linkContainer"
			div.innerHTML = "<p>Høyreklikk og lagre som:</p>"
			const p1 = document.createElement("p")
			const p2 = document.createElement("p")

			div.style.backgroundColor = "white"
			div.style.border = "1px solid black"
			div.style.padding = "10px"
			div.style.position = "absolute"
			div.style.left = `${event.clientX}px`
			div.style.top = `${event.clientY}px`
			p1.appendChild(dxfLink)
			p2.appendChild(svgLink)
			div.appendChild(p1)
			div.appendChild(p2)
			document.body.appendChild(div)
		}

		function convertToSVGPath(element, index) {
			if ("penDown" in element) {
			penDown = element.penDown;
			}

			if ("x" in element) {
				if (!penDown) {
					return "M".concat(element.x, ", ").concat(element.y);
				}

				if (penDown && index > 0 && index < coordinates.length - 1) {
					return "L".concat(element.x, ", ").concat(element.y, " ");
				} else if (index + 1 < coordinates.length - 1) {
					return "M".concat(coordinates[index + 1].x, ", ").concat(coordinates[index + 1].y * -1, " ");
				}
			}
		}

		function removeUndefined(e) {
			return e !== undefined;
		}
	})
})
*/