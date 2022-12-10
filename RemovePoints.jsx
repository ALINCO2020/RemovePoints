#target photoshop

var doc = app.activeDocument
var pathItems = doc.pathItems
var pathItem = pathItems.getByName(pathItems[0].name)
var subPathItems = pathItem.subPathItems
var bounds = doc.selection.bounds

var points = []

for (var j = 0; j < subPathItems.length; j++) {
    var pathPoints = pathItem.subPathItems[j].pathPoints
    for (var i = 0; i < pathPoints.length; i++) {
        var pathPoint = pathPoints[i]
        var x = pathPoint.anchor[0]
        var y = pathPoint.anchor[1]
        if (parseFloat(bounds[0]) < x && x < parseFloat(bounds[2]) && parseFloat(bounds[1]) < y && y < parseFloat(bounds[3])) {
            // pass
        } else {
            var p = new PathPointInfo()
            p.kind = pathPoint.kind
            p.anchor = pathPoint.anchor
            p.leftDirection = pathPoint.leftDirection
            p.rightDirection = pathPoint.rightDirection
            points.push(p)
        }
    }
}

var subPath = []
subPath[0] = new SubPathInfo()
subPath[0].operation = pathItem.subPathItems[0].operation
subPath[0].closed = pathItem.subPathItems[0].closed
subPath[0].entireSubPath  = points

var date = new Date()
var now = date.getTime()

pathItems.removeAll()
pathItems.add("パス " + now, subPath)