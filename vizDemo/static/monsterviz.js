let xmlns = "http://www.w3.org/2000/svg"
let svgCont = document.createElementNS(xmlns, "svg")
let mountainSVG = document.createElementNS(xmlns, "svg")
let plainsSVG = document.createElementNS(xmlns, "svg")
let beachSVG = document.createElementNS(xmlns, "svg")
beachSVG.id = "beach"
mountainSVG.id = "mountain"
plainsSVG.id = "plains"

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

    plains.setAttributeNS(null, "fill", "#f6b635")
    beach.setAttributeNS(null, "fill", "#dbcd9c")

function createMonsterMap(data) {

    let divContainer = document.getElementById("monsterMap")
    let size = "95%"
    svgCont.setAttributeNS(null, "width", size)
    svgCont.setAttributeNS(null, "height", "800")
    svgCont.setAttributeNS(null, "viewBox", "0 0 " + 1300 + " " + 650)




    divContainer.appendChild(svgCont)
    // cum_avg_perc_composite

    //shapes go into their respective SVG children
    mountainSVG.appendChild(mountain)
    plainsSVG.appendChild(plains)
    beachSVG.appendChild(beach)

    // SVG children go into the main SVG
    svgCont.appendChild(plainsSVG)
    svgCont.appendChild(mountainSVG)
    svgCont.appendChild(beachSVG)

    for (const[key ,value] of Object.entries(data)) {
        let cumPers = 0
        let i = 0
        for (const[k, v] of Object.entries(data[key])) {
            cumPers += v["cum_weighted_difficulty_perc_composite"]
            i++
        }
        cumPers = (cumPers/i)
        // console.log(key.toString() + " " + cumPers)
        placeMonsters(cumPers, key, Object.entries(data[key]))
    }

}

//I really abbreviated cumulative to cum and didn't realize it
// until I reviewed my own code 3 hours later

// Moving on, receive the average of the persistence score per player
// determine which quadrant this player goes in, and apply a CSS id
// based on the received data array key
function placeMonsters(cumPersistence, key, data) {

    let beachBox = beach.getBBox()
    let plainsBox = plains.getBBox()
    let mountainBox = mountain.getBBox()

    let monster = makeMonster(key, "pink")
    let x = 0
    let y = 0

    if (cumPersistence < 45) {
        x = getRandom(cumPersistence, beachBox.width) + beachBox.x - 150
        y = getRandom(cumPersistence, beachBox.height) + beachBox.y - 100
        monster.setAttributeNS(null, "x", x.toString())
        monster.setAttributeNS(null, "y", y.toString())
        beachSVG.appendChild(monster)
        console.log("beach " + "user " + key.toString())
    }
    else if(cumPersistence >= 45 && cumPersistence <= 70) {
        x = getRandom(cumPersistence, (plainsBox.width)) + plainsBox.x - 150
        y = getRandom(cumPersistence, (plainsBox.height)) + plainsBox.y - 100
        monster.setAttributeNS(null, "x", x.toString())
        monster.setAttributeNS(null, "y", y.toString())

        plainsSVG.appendChild(monster)
        console.log("plains " + "user " + key.toString())
    }
    else if (cumPersistence > 70) {
        x = getRandom(cumPersistence, mountainBox.width) + mountainBox.x - 150
        y = getRandom(cumPersistence, mountainBox.height) + mountainBox.y - 100
        monster.setAttributeNS(null, "x", x.toString())
        monster.setAttributeNS(null, "y", y.toString())

        mountainSVG.appendChild(monster)
        console.log("mountain " + "user " + key.toString())
    }
    monster.onclick = function () {
        getContextData(key, data, cumPersistence)
    }
}

function getBigMonster () {

}

function getRandom(min, max) {
    let newMin = Math.floor(min)
    let newMax = Math.ceil(max)
    let value = Math.random() * (newMax - newMin) + newMin
    console.log(value)
    return value
}

function makeMonster(key, fill) {

    let monster = document.createElementNS(xmlns, "image")
    let mSVG = document.createElementNS(xmlns, "svg")

    mSVG.setAttributeNS(null, "width", "100")
    mSVG.setAttributeNS(null, "height", "300")
    mSVG.setAttributeNS(null, "viewBox", "0 0 120 240")

    let imgLink = getRandom(1, 12).toFixed()
    monster.setAttributeNS(null, "href", monsterDict[imgLink])
    monster.setAttributeNS(null, "width", "25")
    monster.setAttributeNS(null, "height", "50")
    monster.id = "monster" + key.toString()
    let persLabel = document.createElementNS(xmlns, "text")
        persLabel.id = "compLabel" + key.toString()
        let text = document.createTextNode(key.toString())
        persLabel.appendChild(text)
        persLabel.setAttribute("class", "monsterLabel")
        // monster.appendChild(compGraphValues)
    mSVG.id = "g" + key.toString()
    persLabel.appendChild(text)

    mSVG.appendChild(monster)
    mSVG.appendChild(persLabel)
    return mSVG
}

let monsterDict2 = {
    1: "/static/monsters/asset 2.svg",
    2: "/static/monsters/asset 3.svg",
    3: "/static/monsters/asset 4.svg",
    4: "/static/monsters/asset 5.svg",
    5: "/static/monsters/asset 6.svg",
    6: "/static/monsters/asset 7.svg",
    7: "/static/monsters/asset 8.svg",
    8: "/static/monsters/asset 9.svg",
    9: "/static/monsters/asset 10.svg",
    10: "/static/monsters/asset 11.svg",
    11: "/static/monsters/asset 12.svg",
    12: "/static/monsters/asset 13.svg",
}

 let monsterDict = {
    1: "https://gbavizdemo.s3.amazonaws.com/SVG/asset 2.svg",
    2: "https://gbavizdemo.s3.amazonaws.com/SVG/asset 3.svg",
    3: "https://gbavizdemo.s3.amazonaws.com/SVG/asset 4.svg",
    4: "https://gbavizdemo.s3.amazonaws.com/SVG/asset 5.svg",
    5: "https://gbavizdemo.s3.amazonaws.com/SVG/asset 6.svg",
    6: "https://gbavizdemo.s3.amazonaws.com/SVG/asset 7.svg",
    7: "https://gbavizdemo.s3.amazonaws.com/SVG/asset 8.svg",
    8: "https://gbavizdemo.s3.amazonaws.com/SVG/asset 9.svg",
    9: "https://gbavizdemo.s3.amazonaws.com/SVG/asset 10.svg",
    10: "https://gbavizdemo.s3.amazonaws.com/SVG/asset 11.svg",
    11: "https://gbavizdemo.s3.amazonaws.com/SVG/asset 12.svg",
    12: "https://gbavizdemo.s3.amazonaws.com/SVG/asset 13.svg",
}

let monster7 = document.createElementNS(xmlns, "image")
monster7.setAttributeNS(null, "type", "image/svg+xml")
monster7.setAttributeNS(null, "width", "50")
monster7.setAttributeNS(null, "height", "50")
monster7.setAttributeNS("http://www.w3.org/1999/xlink","href", "/static/monsters/asset 2.svg")
//monster7.data = "/static/monsters/asset 2.svg"

function getContextData(key, data, cumPersistence) {
    let contextData = data.slice(-1)[0]
    let clicked = false

    let subArray = contextData[1]["cum_avg_persistence"]
    let activeTime = contextData[1]["active_time"]
    let totalTime = contextData[1]["percentileActiveTime"]

    let gParentSVG = document.getElementById("g" + key.toString())
    let monster = document.getElementById("monster" + key.toString())
    let x = ((gParentSVG.getBoundingClientRect().x) + (gParentSVG.getBoundingClientRect().width)/2)// - (monster.getBoundingClientRect().width * scale)
    let y = ((gParentSVG.getBoundingClientRect().x) + (gParentSVG.getBoundingClientRect().height)/2)// - (monster.getBoundingClientRect().height * scale)

    if (document.getElementById("bigM")) {
        clicked = true
    }

    if (clicked === false) {
        let bigM = document.createElementNS(xmlns, "image")
        let bigMContainer = document.createElementNS(xmlns, "svg")
        let bigMbg = document.createElementNS(xmlns, "rect")
        bigMContainer.id = "bigM"
        bigMbg.setAttributeNS(null, "width", "600")
        bigMbg.setAttributeNS(null, "height", "600")
        bigMbg.setAttributeNS(null, "class", "bigMbg")
        bigM.setAttributeNS(null, "href", monster.getAttributeNS(null, "href"))
        bigM.setAttributeNS(null, "width", "200")
        bigM.setAttributeNS(null, "height", "400")
        bigM.setAttributeNS(null, "x", "200")
        bigM.setAttributeNS(null, "y", "50")
        bigMContainer.setAttributeNS(null, "width", "600")
        bigMContainer.setAttributeNS(null, "height", "800")
        bigMContainer.setAttributeNS(null, "viewBox", "0 0 600 800")
        bigMContainer.setAttributeNS(null, "x", (svgCont.getBoundingClientRect().width/2 - (bigMContainer.getAttributeNS(null, "width")/2)).toString())
        bigMContainer.setAttributeNS(null, "y", (svgCont.getBoundingClientRect().height/2 - (bigMContainer.getAttributeNS(null, "height")/2)).toString())
        bigMContainer.appendChild(bigMbg)
        bigMContainer.appendChild(bigM)
        let monsterLabel = document.createElementNS(xmlns, "text")
        monsterLabel.setAttributeNS(null, "class", "monsterHeader")
        let monsterLabelText = document.createTextNode("Student " + key.toString())
        monsterLabel.appendChild(monsterLabelText)

        let cumPer = document.createElementNS(xmlns, "text")
        cumPer.setAttributeNS(null, "class", "cumPerTitle")
        let cumPerLabelText = document.createTextNode("Total Persistence " + (cumPersistence.toFixed()).toString())
        cumPer.appendChild(cumPerLabelText)
        cumPer.setAttributeNS(null, "x", "300")
        cumPer.setAttributeNS(null, "y", "450")
        cumPer.setAttributeNS(null, "height", "50")
        cumPer.setAttributeNS(null, "width", "300")

        monsterLabel.setAttributeNS(null, "x", "300")
        monsterLabel.setAttributeNS(null, "y", "50")
        monsterLabel.setAttributeNS(null, "height", "50")
        monsterLabel.setAttributeNS(null, "width", "300")
        bigMContainer.appendChild(monsterLabel)

        let activeTimeArc = document.createElementNS(xmlns, "circle")
        activeTimeArc.setAttributeNS(null, "r", "50")
        activeTimeArc.setAttributeNS(null, "cx", "500")
        activeTimeArc.setAttributeNS(null, "cy", "75")
        activeTimeArc.setAttributeNS(null, "class", "totalArc")

        let activeTimeArc2 = document.createElementNS(xmlns, "circle")
        activeTimeArc2.setAttributeNS(null, "r", "25")
        activeTimeArc2.setAttributeNS(null, "cx", "500")
        activeTimeArc2.setAttributeNS(null, "cy", "75")
        activeTimeArc2.setAttributeNS(null, "class", "activeArc")
        activeTimeArc2.setAttributeNS(null, "stroke-width", "50")
        let strokeWidth = 2 * (Math.PI * activeTimeArc2.getAttributeNS(null, "r"))
        console.log("StrokeWidth: " + strokeWidth.toString())
        console.log("totalTime: " + totalTime.toString())
        console.log("Calculated Stroke: " + (((totalTime * strokeWidth)/100)))
        activeTimeArc2.setAttributeNS(null, "stroke-dasharray", ((totalTime * strokeWidth)/100).toString() + " " + strokeWidth.toString())
        activeTimeArc2.setAttributeNS(null, "transform", "rotate(-90) translate(-575 425)")
        //activeTimeVal =


        let persBarCont = document.createElementNS(xmlns, "svg")
        persBarCont.setAttributeNS(null, "x", "0")
        persBarCont.setAttributeNS(null, "y", "450")
        persBarCont.setAttributeNS(null, "width", "80%")
        persBarCont.setAttributeNS(null, "height", "150")
        persBarCont.setAttributeNS(null, "fill", "white")
        bigMContainer.appendChild(persBarCont)
        bigMContainer.appendChild(cumPer)
        let i = 1
        for (const[k,v] of Object.entries(subArray)) {
            let persLabel = document.createElementNS(xmlns, "text")
                persLabel.setAttributeNS(null, "class", "persBarLabel")
                let persLabelText = document.createTextNode(k)
            let persNum = document.createElementNS(xmlns, "text")
                let persNumText = document.createTextNode(v.toString())
                persNum.setAttributeNS(null, "class", "persNum")
                persNum.appendChild(persNumText)
                persNum.setAttributeNS(null, "x", "256")
                persNum.setAttributeNS(null, "y", (i * 15).toString())
                persNum.setAttributeNS(null, "height", "15")
            persLabel.appendChild(persLabelText)
            persLabel.setAttributeNS(null, "x", "250")
            persLabel.setAttributeNS(null, "y", (i * 15).toString())
            persLabel.setAttributeNS(null, "height", "15")
            let persBar = document.createElementNS(xmlns, "rect")
            persBar.setAttributeNS(null, "height", "15")
            persBar.setAttributeNS(null, "fill", "white")
            persBar.setAttributeNS(null, "stroke", "black")
            persBar.setAttributeNS(null, "stroke-width", "1")
            persBar.setAttributeNS(null, "width", v.toString()+ "%")
            persBar.setAttributeNS(null, "y", ((i * 15)-7.5).toString())
            persBar.setAttributeNS(null, "x", "255")
            persBar.id = i.toString()
            persBarCont.appendChild(persBar)
            persBarCont.appendChild(persLabel)
            persBarCont.appendChild(persNum)
            i++
        }
        bigMContainer.appendChild(activeTimeArc)
        bigMContainer.appendChild(activeTimeArc2)
        svgCont.appendChild(bigMContainer)
        bigMContainer.onclick = function () {
            bigMContainer.remove()
        }

    }
    else {
        document.getElementById("bigM").remove()
        getContextData(key, data, cumPersistence)
    }

    return contextData

}