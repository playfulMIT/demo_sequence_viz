let xmlns = "http://www.w3.org/2000/svg"
let svgCont = document.createElementNS(xmlns, "svg")
let mountainSVG = document.createElementNS(xmlns, "svg")
let plainsSVG = document.createElementNS(xmlns, "svg")
let beachSVG = document.createElementNS(xmlns, "svg")


beachSVG.setAttributeNS(null, "x", "100")
plainsSVG.setAttributeNS(null, "x", "0")
mountainSVG.setAttributeNS(null, "x", "50")

beachSVG.setAttributeNS(null, "y", "0")
plainsSVG.setAttributeNS(null, "y", "-30")
mountainSVG.setAttributeNS(null, "y", "0")



let mountain = document.createElementNS(xmlns, "polygon")
    mountain.setAttributeNS(null, "points", "1217 244.89 1187.23 173.07 1162.11 112.46 1138.14 " +
        "153.98 1084 60.21 1060.89 100.25 1008 0 919.71 123.49 860 207 1009.81 260.89 1076.41 260.89 1141 290.89 1217 244.89")
    mountain.setAttributeNS(null, "fill", "#c0beb6")
let plains = document.createElementNS(xmlns, "path")
    plains.setAttributeNS(null, "d", "M563,579.89c0,63.24-95.16,94-244,94-64.32,0-117.67-60-164-76C94.11,576.9,0," +
        "610.3,0,574.39c0-63.23,120.66-114.5,269.5-114.5,55.82,0,43.49,42.66,86.5,55C427.69,535.47,563,540.37,563,579.89Z")
let beach = document.createElementNS(xmlns, "path")
    beach.setAttributeNS(null, "d", "M976,445.89c56,87-136.82,40.67-285.54,46.75-64.26,2.62-147.33-62.07-194.27-76.14-61.7-18." +
        "49-154.36,18.73-155.83-17.16-2.58-63.18-156.25-178.27-7.53-184.34,31.69-1.3,150.4,23.54,260.17,22.89,83.43-.49,164.22-27.57,183-23,28.52,6.94,157.8," +
        "100.8,207,117C1068,359.89,963,425.74,976,445.89Z")

function createMonsterMap(data) {

    let divContainer = document.getElementById("monsterMap")
    let size = "95%"
    let viewport = 400
    svgCont.setAttributeNS(null, "width", size)
    svgCont.setAttributeNS(null, "height", "800")
    svgCont.setAttributeNS(null, "viewBox", "0 0 " + 1300 + " " + 650)


    plains.setAttributeNS(null, "fill", "#dbcd9c")
    beach.setAttributeNS(null, "fill", "#f6b635")

    divContainer.appendChild(svgCont)
    // cum_avg_perc_composite
    for (const[key ,value] of Object.entries(data)) {
        let cumPers = 0
        let i = 0
        for (const[k, v] of Object.entries(data[key])) {
            cumPers += v["cum_weighted_difficulty_perc_composite"]
            i++
        }
        cumPers = (cumPers/i)
        console.log(key.toString() + " " + cumPers)
        placeMonsters(cumPers, key)
    }
    mountainSVG.appendChild(mountain)
    plainsSVG.appendChild(plains)
    beachSVG.appendChild(beach)



    svgCont.appendChild(plainsSVG)
svgCont.appendChild(mountainSVG)
    svgCont.appendChild(beachSVG)


}

function placeMonsters(cumPersistence, key) {
    let monster = document.createElementNS(xmlns, "circle")
    let x = 0
    let y = 0
    monster.id = key.toString()
    monster.setAttributeNS(null, "r", "20")
    monster.setAttributeNS(null, "fill", "pink")

    if (cumPersistence < 35) {

        mountainSVG.appendChild(monster)
    }
    if(cumPersistence <= 35 >= 70) {
        plainsSVG.appendChild(monster)
    }
    if (cumPersistence > 70) {
        beachSVG.appendChild(monster)
    }
    monster.setAttributeNS(null, "cx", x.toString())
    monster.setAttributeNS(null, "cy", y.toString())
    mountainSVG.appendChild(monster)
}