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
    //monster.id = key.toString()
    //monster.setAttributeNS(null, "r", "20")
    //monster.setAttributeNS(null, "fill", "pink")
    let scaleSetter = "scale(0.35 -0.35)"
    if (cumPersistence < 35) {
        // let bbox = beachSVG.getBBox()
        x = getRandom(cumPersistence, beachBox.width) + beachBox.x
        y = getRandom(cumPersistence, beachBox.height) + beachBox.y
        monster.setAttributeNS(null, "transform", "translate(" + x.toString() + "," + y.toString() + ") " + scaleSetter)
        //monster.setAttributeNS(null, "cy", y.toString())
        beachSVG.appendChild(monster)
        console.log("beach " + "user " + key.toString())
    }
    else if(cumPersistence >= 35 && cumPersistence <= 70) {
        x = getRandom(cumPersistence, plainsBox.width) + plainsBox.x
        y = getRandom(cumPersistence, plainsBox.height) + plainsBox.y
        // monster.setAttributeNS(null, "cx", x.toString())
        // monster.setAttributeNS(null, "cy", y.toString())
        monster.setAttributeNS(null, "transform", "translate(" + x.toString() + "," + y.toString() + ") " + scaleSetter)

        plainsSVG.appendChild(monster)
        console.log("plains " + "user " + key.toString())
    }
    else if (cumPersistence > 70) {
        // let mbbox = mountainSVG.getBBox()
        // console.log("mountain" + " " + mountain.getBBox().height.toString() + ", " + mountain.getBBox().width.toString())
        x = getRandom(cumPersistence, mountainBox.width) + mountainBox.x
        y = getRandom(cumPersistence, mountainBox.height) + mountainBox.y
        // monster.setAttributeNS(null, "cx", x.toString())
        // monster.setAttributeNS(null, "cy", y.toString())
        monster.setAttributeNS(null, "transform", "translate(" + x.toString() + "," + y.toString() + ") " + scaleSetter)

        mountainSVG.appendChild(monster)
        console.log("mountain " + "user " + key.toString())
    }
    monster.onclick = function () {
        getContextData(key, data)
    }
}

function getRandom(min, max) {
    let newMin = Math.floor(min)
    let newMax = Math.ceil(max)
    let value = Math.random() * (newMax - newMin) + newMin
    // console.log(value)
    return value
}

function makeMonster(key, fill) {
    let monster = document.createElementNS(xmlns, "path")
    let g = document.createElementNS(xmlns, "g")
    // g.setAttributeNS(null, "transform", "scale=(0.01, -0.01)")
    monster.setAttributeNS(null, "d", monster1)
    monster.setAttributeNS(null, "fill", fill)
    // monster.setAttributeNS(null, "scale", "0.2, 0.2")
    monster.id = "monster" + key.toString()
    g.appendChild(monster)
    return g
}

let monster1 = "M492.8,172.2c-11-8.1-15-10.4-11.8-6.9C477.8,161.8,481.7,164.1,492.8,172.2c-0.7-10.2-21.4-12.1-27.5-19.2  c-13.7-16,5.5-22.1,0.3-36.3c-3.5-9.5-27.6-18.5-32.4-7c-1.4-4.8-13.2-3.7-11.4,4.3c-1-4.6,3-5.5,6.7-7.7  c-16.8-16.2-12.6,30.2-13.7,39.7c-1.5,12.6-8.7,33.9,1.4,43.6C428.3,201.2,500,192.9,492.8,172.2z M482.8,167.2  c0.6,0.7,1.2,1.4,1.8,2.1C484,168.6,483.4,167.9,482.8,167.2z"
let monster2 = "M695.9,126.1c-4.9-4.7,3.3-40-13.7-24.7c-5.5-1.2,0.9-9.8-6.8-7.8c-3.6,0.9-7.5,9-8.9,11  c-2.6-4.9-2-4.7-7.4-8.7c-1.5,5,1.7,24.3,3.5,23.4c-8,20.4-33.3,21.8-26.3,51.2c1.3,5.5,6.1,9.8,6.9,15.6c0.7,5.6-4,12.6-2.8,16.9  c5.8,21,17.8-5,23.7,6c1.9-5.9,0.1-7.7-5.3-5.4c1.7-0.2,3.5-0.4,5.2-0.5c0.2,12.4,9.4,8.9,18.1,7c16.1-3.5,7.2-2.3,9-8.8  c1.9-6.7,4.1-14.7,7.7-23C705.8,161.8,718.6,139.6,695.9,126.1z"
let monster3 = "M953.4,201.8c-8.1-6.3-27.6,0.6-37.8-3.6c13-3.1,26.5-0.8,38.4-4.2c6.6-2.6,6.1,1.9,8.1-9  c0.2,3-0.5,5.5-2.2,7.8c25.3-6.9-18-19.6-19.2-25.7c0.2,2.4,1.2,4.4,3.1,6.2c4-3.8-9.3-35.5-18.7-35.2c0-0.1,1.7,14.4,3.7,18  c-2.1-3.9-3.3-16.7-3.7-18.2c0.5,2.2,2.6,2.2,6.3,0c-5.3-12.2-15.4-15.5-27.8-16.3c0.3-18.6,10.1-15.1,17.3-29.5  c-0.6,1.3-1.3,2.6-1.9,3.9c16-8.7-6.5-25.7-15.5-8.6c-17.8-2.7-22.5-8.5-17.4,14.7c2.6,12.2,20.5-4.5,10.7,19.8  c-1,2.4-12.5,9-14.5,10.3c1.7-0.6,3.3-1.3,5-1.9c-6.7,2.5-11.5,9.1-15.2,15.2c-5.9,9.9-5.8,40.8-7.9,20.5c-3.3,11.9-9.5,26,3.5,32.4  c5.4,2.6,24.8-1.3,31.5-3.3c-2,0.9-3,0.8-3-0.2c8.7,0.5,15.8,3.8,24,7.1"
let monster4 = "M1165,127c-1.4-4.7-4-9.6-5.9-14.1c1.5,9.4,4.1,8.1-2.1,14.2c-1.6-0.8-2.4-2.5-2.2-5.1c0.7,1.7,1.5,3.4,2.2,5.1  c12.4-12.1-10.3-26.6-11.6-39c-1.6-15.4,7.3-20.1,16.8-30.6c-13.7-4.2-2.2-7-6.8-11.7c-2.5,5.7-14.5,1.5-19.4,8.2  c-6.6,9-1.7,14.8,1.9,25c-1.5-4.1-3.9-18-9.2-17.8c11.8,26.5-3,35.4-14.2,60.4c-2.6,5.7-15.8,32.5-11.1,34.4  c-6.4-2.7-4.6,11.1-3.4,13.6c5.9,11.7,22.8,8.4,33.4,8.3c10.6-0.2,34.6,1.7,42-7.5C1185.9,157.3,1168.6,139,1165,127z M1128.4,102.3  c-0.8,1.3-1.6,2.6-2.4,3.9C1126.8,104.9,1127.6,103.6,1128.4,102.3z"
let monster5 = "M232.6,345.6l-0.2-0.2c0,0-0.2-0.3-0.2-0.3c-0.6-1.3-1.2-2.6-1.8-3.9c-2.2-13.1-34.4-17.8-10.8-38.2  c0.5-0.6,0.9-1.2,1.4-1.8c0.5-0.8,1-1.6,1.6-2.4c0.4-0.9,0.8-1.9,1.2-2.8c0.2-0.2,0.3-0.3,0.5-0.5c1.7-2.8,1.3-4.5-2.2-4.8  c-1,0-2,0.1-3,0.1c-1.4,0.7-2.8,1.4-4.2,2.1c-0.6,0.4-1.2,0.8-1.8,1.2c-4.3,2.1-4.3,11-12.1,7.7c-0.7-0.1-1.4-0.3-2-0.4  c-3.3,0-6.6-0.2-9.8,0.4c-0.3,0.1-0.3,2.1-0.2,4c-0.1,0.7-0.1,1.6,0,2.4c0,0-0.1,0-0.1,0c0.7,0.5,1.4,0.9,2.2,1.4  c0.5,0.5,1.1,1.1,1.6,1.6c3.4,1,6.9,2,10.3,3c-0.1,2.2-0.2,4.3-0.2,6.5c-0.4,0.8-0.7,1.7-1.1,2.5c-6.6,4.5-13.2,9-19.8,13.5  c0,0-0.1,0.1-0.1,0.1c-0.3,0.4-0.5,0.7-0.8,1.1c-1,1.7-2,3.3-3,5c-0.8,1.4-1.6,2.9-2.4,4.3c-0.5,0.6-1,1.2-1.5,1.8  c0,1.7,0.1,3.3,0.1,5c0.2,0.4,0.3,0.8,0.5,1.2c-0.2-0.4-0.3-0.8-0.5-1.2c0-1.7-0.1-3.3-0.1-5c-1.3,3.7-2.7,7.4-4,11  c0,0-0.2,0.1-0.2,0.1s0.1,0.3,0.1,0.3c-0.7,2.2-1.3,4.4-2,6.6c-0.2,1.4-0.4,2.7-0.5,4.1c-0.2,9.8-0.3,19.7-0.5,29.5  c0,0.6-0.1,1.1-0.1,1.7c0,0,0,0,0,0c-0.4,0.9-0.7,1.8-1.1,2.7c0.8,0,1.5-0.1,2.3-0.1c0.1-0.3,0-0.6,0-0.9c0,0,0,0,0,0  c1.7-9.4,3.5-18.8,5.2-28.2c-1.7,9.4-3.5,18.8-5.2,28.2c0.1,0.3,0.1,0.6,0,0.9c0,0.7,0,1.4,0,2.1c-0.3,1-0.6,2-0.9,3  c-0.7,0-1.5,0-2.2,0.1c-0.1,1.6-0.1,3.3-0.2,4.9c1,2.1,2.1,4.2,3.1,6.4c3.5,0.2,6.9,0.4,10.4,0.6c3.3,3.6,6.7,5,10.5,0.7  c-0.3-0.3-0.6-0.7-0.9-1h0c0.3,0.3,0.6,0.7,0.9,1c2.7-3.4,5.7-4.4,9.4-1.6c0.6,0,1.3,0,1.9,0.1c1.4,0,2.7-0.1,4.1-0.1  c0.7-0.3,1.4-0.7,2.1-1c0.6-0.2,1.2-0.4,1.8-0.7c0.6-0.5,1.2-1.1,1.8-1.6c1.4-0.9,2.8-1.8,4.3-2.8c-1.4,0.9-2.8,1.8-4.3,2.8  c-0.6,0.5-1.2,1.1-1.8,1.6c1.3,0.2,2.5,0.5,3.8,0.7c3.1,0.5,6.3,1,9.4,1.5c3-3.9,6-7.9,8.9-11.8c-3,3.9-6,7.9-8.9,11.8  c5.4-2.2,5.9-11.2,13.8-9.7c0.4-0.3,0.7-0.6,1.1-0.9c1.4-1.4,4-2.6,4.2-4.1C241.8,386,240.8,365.4,232.6,345.6z"
let monster6 = "M995 1856 c-33 -33 -39 -36 -53 -23 -10 8 -38 18 -63 21 -39 6 -49 3 -72 -18 -25 -23 -27 -31 -27 -102 0 -71 2 -78 30 -104 16 -15 41 -31 55 -34 19 -5 25 -13 25 -34 0 -57 -10 -69 -65 -87 -62 -19 -165 -109 -165 -144 0 -11 -4 -22 -9 -26 -6 -3 -13 -27 -17 -53 -3 -26 -10 -54 -14 -62 -11 -22 16 -139 43 -191 13 -24 33 -48 45 -54 29 -13 28 -22 -8 -40 -16 -8 -33 -27 -36 -40 -3 -14 -10 -25 -15 -25 -5 0 -9 -8 -9 -17 0 -10 -8 -31 -17 -48 -14 -26 -17 -63 -17 -252 -1 -213 0 -223 20 -243 30 -31 104 -32 136 -3 28 26 107 26 136 0 11 -10 35 -17 61 -17 34 0 44 4 48 20 6 21 28 27 38 10 4 -6 23 -7 46 -4 26 4 39 3 39 -5 0 -6 9 -11 19 -11 11 0 22 -4 26 -9 3 -5 24 -8 47 -7 45 4 72 29 83 78 4 15 15 45 26 67 10 22 19 56 19 76 0 19 4 43 9 53 10 20 31 148 31 194 0 33 -40 127 -71 167 -25 31 -24 58 3 101 17 29 21 51 21 120 0 56 -5 97 -15 120 -9 19 -19 48 -23 65 -4 16 -22 44 -42 61 -19 17 -40 41 -46 54 -16 31 -73 60 -119 60 -21 0 -53 8 -73 17 -35 17 -36 18 -29 63 5 29 14 50 28 60 41 29 116 103 116 116 0 7 5 14 11 16 15 5 16 115 1 130 -6 6 -36 13 -66 16 -52 4 -56 3 -91 -32z m107 -493 c43 -25 72 -69 97 -148 33 -101 24 -186 -24 -244 -14 -16 -25 -37 -25 -46 0 -14 47 -84 70 -105 3 -3 14 -25 25 -50 21 -46 23 -117 10 -259 -7 -71 -35 -163 -52 -168 -6 -2 -14 16 -17 42 -6 37 -12 46 -32 51 -29 8 -35 3 -49 -38 -13 -42 -32 -46 -46 -12 -20 54 -64 61 -81 12 -10 -29 -12 -30 -25 -13 -7 11 -13 29 -13 41 0 21 -17 34 -45 34 -7 0 -22 -16 -34 -35 -25 -43 -37 -44 -46 -5 -4 16 -18 39 -33 51 l-27 20 -17 -21 c-10 -12 -18 -30 -18 -41 0 -21 -19 -37 -21 -17 -1 7 -1 17 0 22 1 5 6 70 10 145 9 152 21 192 89 283 52 70 56 91 25 120 -69 64 -94 143 -74 240 14 65 55 118 116 148 52 27 186 23 237 -7z"

function getContextData(key, data) {
    let contextData = data.slice(-1)[0]
    // console.log(contextData[1]["cum_avg_persistence"]["UNPRODUCTIVE_PERSISTANCE"])
    let subArray = contextData[1]["cum_avg_persistence"]
    for (const[k,v] of Object.entries(subArray)) {
        console.log(k, v)
    }


    console.log(subArray["PRODUCTIVE_PERSISTANCE"])



    return contextData

}