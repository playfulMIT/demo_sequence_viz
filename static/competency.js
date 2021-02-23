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


let mountain = document.createElementNS(xmlns, "path")
    mountain.setAttributeNS(null, "d", "M1217 244.89 1187.23 173.07 1162.11 112.46 1138.14 " +
        "153.98 1084 60.21 1060.89 100.25 1008 0 919.71 123.49 860 207 1009.81 260.89 1076.41 260.89 1141 290.89 1217 244.89z")
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
  0: creature1,
  1: creature2,
  2: creature3,
  3: creature4,
  4: creature5
}
let widthIncrementor
function returnColor(key) {

  let colorMap = {
    "GMD.4": "#FFBE0B",
    "CO.5": "#FB5607",
    "CO.6": "#463730",
    "MG.1": "#7ADFBB"
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
      .append("path")
      .attr("id", "mountain")
      .attr("d", "M382,226.09c-56.55,-30.45,-81.31,-185,-86.79,-224.7a1.61,1.61,0,0,0,-3.21,-0.11l-22.87,107.35l-29.46,-43.24a4.35,4.35,0,0,0,-7.21,0l-33.61,49.35l-15.93,-27.59a3.37,3.37,0,0,0,-5.84,0l-33.39,57.85l-29.55,-51.21a3.57,3.57,0,0,0,-6,-0.35l-108.14,144.65l94,32s96,46,144,30s209,-39,144,-74z")
      .attr("fill", "#c0beb6")



  let beach = svg.append("g")
      .attr("id", "beach")
      .append("path")
  .attr("d", "M1.39,99.32c2,-2,52.11,-57.87,89.18,-71.51c58.92,-21.69,120.24,-29.44,182.85,-27.53c13.33,0.4,26.72,4.56,33.18,15.72c19.25,33.4,51.19,41.22,85.23,47c35.2,5.93,70.34,12.39,105.24,19.82a162.87,162.87,0,0,1,39.16,14.06c15.5,7.86,18.3,17.2,13.55,34.23c-5.74,20.6,-20.44,33.38,-38.24,43.35c-28,15.66,-58.59,23.22,-90,26.81c-31.91,3.64,-64.05,5.63,-96.14,7.37c-26.9,1.47,-52.41,-5.12,-75.66,-18.57c-23.61,-13.65,-46.64,-28.33,-69.77,-42.82c-21.57,-13.51,-45.19,-19.68,-70.38,-19.69c-24.06,0,-48.12,1.12,-72.17,1.06c-12.54,0,-31.93,-6.32,-35,-10.81s-3.03,-16.49,-1.03,-18.49z")
  .attr("fill", "#f6b635")


  let plains = svg.append("g")
      .attr("id", "plains")
      .append("path")
      .attr("d", "M325.26,291.1c-15.56,-1.54,-31.41,-0.84,-46.6,-5.14c-22.18,-6.28,-42,-22.69,-61.93,-37.86c-19,-14.48,-37,-33.47,-58.55,-38.81c-14.71,-3.65,-30,-3.35,-45,-3.36c-16.39,0,-32.82,3,-49.17,2.1c-9.43,-0.5,-11.68,-7.17,-13.08,-21.35c-2.51,-25.28,-13,-45,-21.95,-65.77c-10.51,-24.56,-23.21,-47.41,-28.25,-76.34c-2.32,-13.35,0.94,-26.15,9.32,-32.46c5.62,-4.23,11.76,-9,17.82,-9.52a217.31,217.31,0,0,1,42.13,0.77c16.62,1.88,33.13,5.81,49.7,8.7c15.88,2.77,31.77,5.39,47.66,8c5.62,0.93,11.24,2,16.87,2.45c13,0.93,26,2,39,2.08c31.25,0.11,62,-6.41,92.59,-15.37c12.7,-3.71,25.48,-7.44,38.35,-9.11c5.66,-0.73,12.38,1.83,17.36,6.07c29.47,25.13,58.25,51.82,87.82,76.66a598.63,598.63,0,0,0,56.8,42.16c15.74,10.3,21.81,28.58,13.24,50.92c-6,15.65,-13.67,30,-20.84,44.61c-4.4,9,-5.13,16.67,-1.21,27.47c8.49,23.36,4.69,39.39,-14.55,43.91c-13,3.06,-26.21,6.26,-39.29,5.95c-23.57,-0.56,-47.1,-4.34,-70.67,-5.56c-19.15,-1,-38.34,-0.2,-57.52,-0.2z")
      .attr("fill", "#dbcd9c")
    plains.attr("transform", "translate(" + ((browserWidth/2) - 200) + "," + ((browserHeight/2) - 300) + ")")
    mountain.attr("transform", "translate(" + (browserWidth - 500) + "," + (browserHeight - browserHeight) + ")")
    beach.attr("transform", "translate(" + ((browserWidth - browserWidth) + 50) + "," + ((browserHeight/2) - 100) + ")")
    widthIncrementor = browserWidth/Object.keys(data).length
    console.log(widthIncrementor)
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
            return .1
        }
        else if (avg >= .26 && avg < .5) {
            return .2
        }
        else if (avg >= .5 && avg < .75){
            return .5
        }
        else if (avg >= .75) {
            return .75
        }
    }

    let g = svg.append("g")
        .attr("id", key.toString())
        .attr("class", "creature")

        //.attr("mask", "url(#" + key.toString() + ")")
    let totScore = g.append("rect")
        .attr("width", (radius * 4) * scaler())
        .attr("height", (radius * 4) )
        .attr("fill", function (){
            return totalCompFill(data[key]['totalComp'])
        })
        .on("click", function() {
            bigCreature(data[key], key, this)
        })
        .on("mouseover", function() {
            onHover(data[key], this)
        })
        .on("mouseout", function() {
            $('.hoverBbl').remove()
        })
        .attr("id", key.toString())
        .attr("mask", "url(#mask" + key.toString() + ")")

        let rectY = 100


              rectY -= radius



    placeCreature(totScore, data[key], scaler(), g)
    //placeText(g, totScore, data[key]["totalComp"])

  }
}

function onHover(data, object) {
    let x = object.getBBox().x
    let y = object.getBBox().y

    let hoverBubble = d3.select("svg")
        .append("g")
        .attr("class", "hoverBbl")

    hoverBubble.append("circle")
        .attr("r", 20)
        .attr("cx", x)
        .attr("cy", y)
        .attr("fill", "pink")
        .attr("pointer-events", "none")
    hoverBubble.append("text")
        .text((data['totalComp'] * 100).toFixed())
        .attr("x", x)
        .attr("y", y)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .attr("fill", "#ec3670")
        .attr("font-size", "16pt")

}

function removeCards() {
    //let cards = document.getElementsByClassName("card")
    $('.card').remove()
}

function bigCreature(data, key, object) {
    removeCards()
    let y = object.getBBox().y
    if (y < (browserHeight * .2)) {
        y = 300
    }


    let x = object.getBBox().x
    let card = d3.select("svg")
        .append("g")
        .attr("class", "card")
        .attr("id", key.toString())
        .on("click", function () {
            removeCards()
        })

    let bg = card
    .append("rect")
        .attr("width", 400)
        .attr("height", 600)
        .attr("x", x)
        .attr("y", y - 200)
        .attr("fill", "#ebebeb")


    let width = 300
    let height = 60

    card.append("text")
        .text("Student " + key.toString().substring(0, 3))
        .attr("x", x + 30)
        .attr("y", y - 100)
        .attr("font-size", "24pt")
        .attr("fill", "gray")
    card.append("text")
            .text("Total Competency: " + (data['totalComp'] * 100).toFixed() + "%")
        .attr("fill", "black")
            .attr("font-size", "16pt")
            .attr("x", x + 30)
            .attr("y",  y - 40)

    card.append("text")
            .text("Total Persistence: " + data['per'].toFixed())
        .attr("fill", "black")
            .attr("font-size", "16pt")
            .attr("x", x + 30)
            .attr("y",  y - 20)

    for (const[k ,v] of Object.entries(data['subScores'])) {
        let subG =  card.append("g")
            .append("rect")
              .attr("width", width)
              .attr("height", height - 4)
             .attr("y", y)
             .attr("x", x + 50)
              .attr("fill", returnColor(k))
              .attr("fill-opacity", v)
            .attr("stroke-width", 4)
            .attr("stroke", returnColor(k))
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
    placeMask()

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

let shit = 1

function placeCreature(totRect, data, scale, g) {
  let beachBox = d3.select("#beach").node().getBoundingClientRect()
  let plainsBox = d3.select("#plains").node().getBoundingClientRect()
  let mtnBox = d3.select("#mountain").node().getBoundingClientRect()
    let x = 0
    let y = 0
    // modify this so that the placement is more like a linear formula
    // place the monsters with an awareness of those around them, array
    // of placements sort of like a bullet tracker in unity?
    // sort them prior to placement as well so that it's more predictable
    // where they end up
        let perScore = data['per']
        let outlier = null
        let tempInt = 0
    // could be a switch statement
      if (perScore <= 47) {

            x = getRandom(beachBox.x, (beachBox.x + beachBox.width))
            y = getRandom(beachBox.y, (beachBox.y - beachBox.height)) - beachBox.height/2
          //let x = beachBox.x + perScore
          //let y = (beachBox.height * data['compTotal']) + beachBox.x
        totRect.attr("x", x)
        totRect.attr("y", y)
        totRect.select(this.parentNode).attr("transform", "scale(" + scale + ")," + "translate(" + x + "," + y + ")")
      }
      else if (perScore > 47 && perScore < 68) {

        //let x = plainsBox.x + perScore
          //let y = (plainsBox.height * data['totalComp']) + plainsBox.y
        x = getRandom(plainsBox.x, (plainsBox.x + plainsBox.width))
        y = getRandom(plainsBox.y, (plainsBox.y + plainsBox.height)) - plainsBox.height

        totRect.attr("x", x )
        totRect.attr("y", y)
        totRect.select(this.parentNode).attr("transform", "scale(" + scale + ")," + "translate(" + x + "," + y + ")")
          shit = shit + 10
      }
      else if (perScore >= 68) {
        x = getRandom(mtnBox.x, (mtnBox.x + mtnBox.width))
        y = getRandom(mtnBox.y, (mtnBox.y - mtnBox.height)) + mtnBox.height/3
        totRect.attr("x", x)
        totRect.attr("y", y)
        totRect.select(this.parentNode).attr("transform", "scale(" + scale + ")," + "translate(" + x + "," + y + ")")

      }
        let totRectBBC = totRect.node().getBoundingClientRect()

      for (const[k, v] of Object.entries(data['subScores'])) {

          if (Math.abs(data['totalComp'] - v)/v > .25) {
              if (v > tempInt) {
                  tempInt = v
                  console.log(k + " subScore " + v.toString() + " totalComp " + data['totalComp'])
                    outlier = k
              }

          }
      }


    //console.log(widthIncrementor)
    placeText(totRect.select(this.parentNode), totRect, data["totalComp"])
    placeMask(totRect, scale, data['creature'], outlier)
}

// extend this so I can use it to call for a mask on the large creature cards
//
function placeMask(rect, scale, maskIndex, outlier) {
    let x = rect.node().getBBox().x
    let y = rect.node().getBBox().y
    let strokeColor = "gray"
    if (outlier) {
       strokeColor = returnColor(outlier)
    }
    let mask = d3.select("svg").append("mask")
        .attr("id", "mask" + rect.attr("id"))
        .append("path")
        .attr("d", function (){
          return creatureRoulette[maskIndex]
        })
        .attr("stroke", "black")
        .attr("transform", "translate(" + x + "," + y + ")," + "scale(" + scale + ")")
    .attr("fill", "white")
    let stroke = d3.select("svg").append("path")
        .attr("id", "outline" + rect.attr("id"))
        .attr("d", function (){
          return creatureRoulette[maskIndex]
        })
        .attr("stroke", strokeColor)
        .attr("stroke-width", function () {
            if (outlier) {
                return 10
            }
            return 2
        })
        .attr("fill", "none")
        .attr("transform", "translate(" + x + "," + y + ")," + "scale(" + scale + ")")

}

function getRandom(min, max) {
    //let newMin = Math.floor(min)
    //let newMax = Math.ceil(max)
    //let value = Math.random() * (newMax - newMin) + newMin
    //console.log(value)
    return Math.random() * (max - min) + min
}

function filterUsers() {

}