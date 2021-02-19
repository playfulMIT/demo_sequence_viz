let xmlns = "http://www.w3.org/2000/svg"

let mountainSVG = document.createElementNS(xmlns, "svg")
let plainsSVG = document.createElementNS(xmlns, "svg")
let beachSVG = document.createElementNS(xmlns, "svg")
beachSVG.id = "beach"
mountainSVG.id = "mountain"
plainsSVG.id = "plains"

let browserWidth = window.innerWidth
let browserHeight = window.innerHeight
//beachSVG.setAttributeNS(null, "x", "100")
//plainsSVG.setAttributeNS(null, "x", "0")
//mountainSVG.setAttributeNS(null, "x", "50")

//beachSVG.setAttributeNS(null, "y", "0")
//plainsSVG.setAttributeNS(null, "y", "-30")
//mountainSVG.setAttributeNS(null, "y", "0")

let subSize = "100%"

beachSVG.setAttributeNS(null, "height", subSize)
plainsSVG.setAttributeNS(null, "height", subSize)
mountainSVG.setAttributeNS(null, "height", subSize)

beachSVG.setAttributeNS(null, "width", subSize)
plainsSVG.setAttributeNS(null, "width", subSize)
mountainSVG.setAttributeNS(null, "width", subSize)


//beachSVG.setAttributeNS(null, "viewBox", "200 0 " + 800 + " " + 800)
//plainsSVG.setAttributeNS(null, "viewBox", "200 0 " + 800 + " " + 800)
//mountainSVG.setAttributeNS(null, "viewBox", "200 0 " + 800 + " " + 800)


let mountain = document.createElementNS(xmlns, "polygon")
    mountain.setAttributeNS(null, "points", "1217 244.89 1187.23 173.07 1162.11 112.46 1138.14 " +
        "153.98 1084 60.21 1060.89 100.25 1008 0 919.71 123.49 860 207 1009.81 260.89 1076.41 260.89 1141 290.89 1217 244.89")
    mountain.setAttributeNS(null, "fill", "#c0beb6")
let beach = document.createElementNS(xmlns, "path")
    beach.setAttributeNS(null, "d", "M563,579.89c0,63.24-95.16,94-244,94-64.32,0-117.67-60-164-76C94.11,576.9,0," +
        "610.3,0,574.39c0-63.23,120.66-114.5,269.5-114.5,55.82,0,43.49,42.66,86.5,55C427.69,535.47,563,540.37,563,579.89Z")
let plains = document.createElementNS(xmlns, "path")
    plains.setAttributeNS(null, "d", "M976,445.89c56,87-136.82,40.67-285.54,46.75-64.26,2.62-147.33-62.07-194.27-76.14-61.7-18." +
        "49-154.36,18.73-155.83-17.16-2.58-63.18-156.25-178.27-7.53-184.34,31.69-1.3,150.4,23.54,260.17,22.89,83.43-.49,164.22-27.57,183-23,28.52,6.94,157.8," +
        "100.8,207,117C1068,359.89,963,425.74,976,445.89Z")




//let svgCont = document.createElementNS(xmlns, "svg")
let creature1 = "M79.2,123s-16.33,-29.37,-20.33,-42.37s-14.51,-43,-14.51,-43a6.2,6.2,0,0,0,-3.49,-2.73s-2,-7.35,0,-10.83s0,1.52,5,0.52s8.35,-16,8.35,-16a5.09,5.09,0,0,0,-4.43,-8.07l-9.92,7.11l-9.61,-5.63a5.09,5.09,0,0,0,-3.17,8.72l7.78,7.57v17.9a6.43,6.43,0,0,0,-1.4,1.72l-32.19,86.82a6.28,6.28,0,0,0,5.66,9.27l67,-1.53a6.28,6.28,0,0,0,5.26,-9.47z"
let creature2 = "M68.73,96.46c0,-9.67,-3.63,-14.37,-12.26,-16.62a30.19,30.19,0,0,0,-21.11,-51.23l5.9,-19.3c2.6,-1.69,4.22,-4.09,4.22,-6.75c0,-5.13,-5.57,0.93,-13,0.93s-13.95,-6.06,-13.95,-0.93c0,4.62,4.89,8.45,11.3,9.17l-5.76,18.83a30.2,30.2,0,0,0,-11.42,48.79c-7,1.79,-8.07,8.51,-8.07,17.11c0,6.75,-2.57,18,-2.79,25.45c-0.14,4.9,-3.35,8.49,0.91,12.27c2,1.74,6.53,-11.34,11.18,1.67c1,2.71,10.18,-6.3,13.94,-5.58c4.31,0.84,8.91,4.87,14.88,5.23c4.9,0.3,3.72,-3.95,7.43,-4.3c6.12,-0.57,9.19,10,12.63,8c5.34,-3.02,0.24,-13.2,1.32,-18.2c1.79,-8.19,4.65,-17.13,4.65,-24.54z"
let creature3 = "M49.06,26.19l-2.32,-13.19c9.08,-1.25,15.76,-5.5,15.76,-10.55c0,-6.08,-9.13,4,-21,4s-22,-10.08,-22,-4c0,5.31,7.35,9.73,17.12,10.77l2.38,13.68c-8.59,3.28,-20.37,12.1,-27.5,25.55c-9.43,17.8,-11,50.44,-11,65c0,16,8.67,10.27,19.13,8.27c3.7,-0.71,7,-2.25,10.87,-3.27c4.79,-1.28,8.06,8,12,8c5.22,0,10,-8.26,15,-8c5.49,0.28,13,5.92,16.34,2.36c2.9,-3.07,4.66,-8.39,4.66,-17.36c0,-26.6,-14.57,-75.25,-29.44,-81.26z"
let creature4 = "M69.05,91.51c-1.64,-0.43,-3.37,0,-5,0.12c0,-1,-2.79,-41.9,-2.79,-42.89c0,-13.46,-2,-20.85,-5.69,-24.93l9.22,-16a2.85,2.85,0,1,0,-4.96,-2.81l-9,15.58a24.42,24.42,0,0,0,-7,-1.49l2.34,-15.31a2.85,2.85,0,0,0,-5.63,-0.87l-2.45,16h-2.49a15.78,15.78,0,0,0,-7.35,1.72l-8.95,-13.99a2.85,2.85,0,0,0,-4.79,3.08l9.17,14.28c-7.86,8,-12.35,44.54,-19.39,64.67c-9,25.85,-0.94,41.59,14.23,44.12c10,4.58,35.3,0,49.82,0c31.05,0,50.32,2.82,50.32,-12.9s-11.89,-18.41,-49.61,-28.38z"
let creature5 = "M84.25,78.94A41.88,41.88,0,0,0,66.3,48l.46-24.65a1.09,1.09,0,0,0-2.07-.52L55,42,40.7,1.34a1.26,1.26,0,0,0-2.44.29l-3.5,33.09-8-13.43a1.26,1.26,0,0,0-2.33.76L26.33,43.8a42,42,0,0,0-4.83,75.07l-9.11,32a1.09,1.09,0,0,0,1.87,1L38.64,124.3l.78.08,6.83,24.43a1.09,1.09,0,0,0,2.13-.1l4.27-23.86,23.24,25a1.09,1.09,0,0,0,1.84-1.07L67.55,116.14A41.9,41.9,0,0,0,84.25,78.94Z"

let creatureRoulette = {
  1: creature1,
  2: creature2,
  3: creature3,
  4: creature4,
  5: creature5
}

function returnColor(key) {

  let colorMap = {
    "GMD.4": "#633f91",
    "CO.5": "#00ff00",
    "CO.6": "#81e5ff",
    "MG.1": "#ec3670"
  }

  return colorMap[key]
}

function totalCompFill(value) {
    if (value <= .4) {
        return "#ec3670"
    }
    else if (value > .4 && value < .7) {
        return "#633f91"
    }
    else if (value >= .7){
        return "#00ff00"
    }
}

function generateRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}


function competency(data) {

  let svg = d3.select("#competencyMap")
      .append("svg")
      .attr("width", browserWidth)
      .attr("height", browserHeight)
  let mountain = svg.append("g")
      .append("polygon")
      .attr("id", "mountain")
      .attr("points", "1217 244.89 1187.23 173.07 1162.11 112.46 1138.14 " +
        "153.98 1084 60.21 1060.89 100.25 1008 0 919.71 123.49 860 207 1009.81 260.89 1076.41 260.89 1141 290.89 1217 244.89")
      .attr("fill", "#c0beb6")


  let beach = svg.append("g")
      .attr("id", "beach")
      .append("path")
  .attr("d", "M563,579.89c0,63.24-95.16,94-244,94-64.32,0-117.67-60-164-76C94.11,576.9,0," +
    "610.3,0,574.39c0-63.23,120.66-114.5,269.5-114.5,55.82,0,43.49,42.66,86.5,55C427.69,535.47,563,540.37,563,579.89Z")
  .attr("fill", "#f6b635")


  let plains = svg.append("g")
      .attr("id", "plains")
      .append("path")
      .attr("d", "M976,445.89c56,87-136.82,40.67-285.54,46.75-64.26,2.62-147.33-62.07-194.27-76.14-61.7-18." +
      "49-154.36,18.73-155.83-17.16-2.58-63.18-156.25-178.27-7.53-184.34,31.69-1.3,150.4,23.54,260.17,22.89,83.43-.49,164.22-27.57,183-23,28.52,6.94,157.8," +
      "100.8,207,117C1068,359.89,963,425.74,976,445.89Z")
      .attr("fill", "#dbcd9c")
    plains.attr("transform", "translate(" + (browserWidth/browserWidth + 200) + "," + (browserHeight/browserHeight + 100) + ")")
    mountain.attr("transform", "translate(" + (browserWidth/browserWidth + 400) + "," + (browserHeight - browserHeight) + ")")
    beach.attr("transform", "translate(" + ((browserWidth - browserWidth)) + "," + -((browserHeight/browserHeight) - 100) + ")")

  let radius = 25
  for (const[key] of Object.entries(data)) {
    let confidence = 0
    let cI = 1
    for (const[k, v] of Object.entries(data[key]['confidence'])) {
      confidence += v
      cI++
    }

    function scaler(){
        let avg = confidence/cI
        if (avg < .25) {
            return .2
        }
        else if (avg >= .26 && avg < .5) {
            return .4
        }
        else if (avg >= .5 && avg < .75){
            return .6
        }
        else if (avg >= .75) {
            return .8
        }
    }

    let g = svg.append("g")
        .attr("id", key.toString())
        .attr("class", "creature")

        //.attr("mask", "url(#" + key.toString() + ")")
    let totScore = g.append("rect")
        .attr("width", radius * 4)
        .attr("height", radius * 4)
        .attr("fill", function (){
            return totalCompFill(data[key]['totalComp'])
        })
        .on("click", function() {
            bigCreature(data[key], key)
        })
        //.attr("fill-opacity", .5)
        .attr("id", key.toString())
        .attr("mask", "url(#mask" + key.toString() + ")")

        let rectY = 100


              rectY -= radius



    placeCreature(totScore, data[key], scaler())
    placeText(g, totScore, data[key]["totalComp"])

  }
}

function bigCreature(data, key) {


    let card = d3.select("svg")
        .append("g")
        .attr("id", key.toString())

    let bg = card
    .append("rect")
        .attr("width", 400)
        .attr("height", 600)
        .attr("x", 900)
        .attr("y", 200)
        .attr("fill", "#ebebeb")

    let y = 400
    let x = 950
    let width = 300
    let height = 60
    for (const[k ,v] of Object.entries(data['subScores'])) {
        let subG =  card.append("g")
            .append("rect")
              .attr("width", width)
              .attr("height", height)
             .attr("y", y)
             .attr("x", x)
              .attr("fill", returnColor(k))
              .attr("fill-opacity", v)
        let perc = (v * 100).toFixed()
        card.append("text")
            .text(k + ": " + perc.toString() + "%")
            .attr("fill", "black")
            .attr("font-size", "16pt")
            .attr("x", x + 50)
            .attr("y",  y + 40)

              //.attr("mask", "url(#mask" + key.toString() + ")")
        y += height
    }
    let clicked = true
    card.append("text")
        .text("Student " + key.toString().substring(0, 3))
        .attr("x", 950)
        .attr("y", 300)
        .attr("font-size", "24pt")
        .attr("fill", "gray")
    card.append("text")
            .text("Total Competency: " + (data['totalComp'] * 100).toFixed() + "%")
        .attr("fill", "black")
            .attr("font-size", "16pt")
            .attr("x", 950)
            .attr("y",  350)

    card.append("text")
            .text("Total Persistence: " + data['per'].toFixed())
        .attr("fill", "black")
            .attr("font-size", "16pt")
            .attr("x", 950)
            .attr("y",  370)
}

function placeText(g, rect, data) {
    let score = ((data * 100).toFixed())
    let text  = g.append("text")
        .attr("fill", "yellow")
        .attr("font-size", "8pt")
        .text("Con. " + score + "%")
            .attr("x", function () {
                return rect.node().getBBox().x + (rect.node().getBBox().width/4)
            })
            .attr("y", function () {
               return rect.node().getBBox().y + (rect.node().getBBox().height / 1.5)
            })
}

function placeCreature(totRect, data, scale) {
  let beachBox = d3.select("#beach").node().getBBox()
  let plainsBox = d3.select("#plains").node().getBBox()
  let mtnBox = d3.select("#mountain").node().getBBox()

    let perScore = data['per']
  if (perScore <= 47) {
    let x = getRandom(beachBox.x, beachBox.width) - getRandom(-1, 1) * perScore
    let y = getRandom(beachBox.y, beachBox.height) - getRandom(-1, 1) * perScore
    totRect.attr("x", x * (scale + 1))
    totRect.attr("y", y * (scale + 1))
    totRect.select(this.parentNode).attr("transform", "scale(" + scale + ")," + "translate(" + x + "," + y + ")")
  }
  else if (perScore > 47 && perScore < 68) {
    let x = getRandom(plainsBox.x, plainsBox.width) - getRandom(-1, 1) * perScore
    let y = getRandom(plainsBox.y, plainsBox.height) - getRandom(-1, 1) * perScore
    totRect.attr("x", x * (scale + 1))
    totRect.attr("y", y * (scale + 1))
    totRect.select(this.parentNode).attr("transform", "scale(" + scale + ")," + "translate(" + x + "," + y + ")")
  }
  else if (perScore >= 68) {
    let x = getRandom(mtnBox.x, mtnBox.width) - getRandom(-1, 1) * perScore
    let y = getRandom(mtnBox.y, mtnBox.height) - getRandom(-1, 1) * perScore
    totRect.attr("x", x * (scale + 1))
    totRect.attr("y", y * (scale + 1))
    totRect.select(this.parentNode).attr("transform", "scale(" + scale + ")," + "translate(" + x + "," + y + ")")
      totRect.select(this.parentNode).attr("transform", "scale(" + scale + ")")
  }
    placeText(totRect.select(this.parentNode), totRect, data["totalComp"])
    placeMask(totRect, scale)
}

function placeMask(rect, scale) {
    let x = rect.node().getBBox().x
    let y = rect.node().getBBox().y
    let mask = d3.select("svg").append("mask")
        .attr("id", "mask" + rect.attr("id"))
        .append("path")
        .attr("d", function (){
          return creatureRoulette[generateRandomInt(1, 5).toString()]
        })
        .attr("transform", "translate(" + x + "," + y + ")," + "scale(" + scale + ")")
    .attr("fill", "white")
}

function getRandom(min, max) {
    let newMin = Math.floor(min)
    let newMax = Math.ceil(max)
    let value = Math.random() * (newMax - newMin) + newMin
    //console.log(value)
    return value
}