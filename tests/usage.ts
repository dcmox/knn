import { KNearestNeighbor } from '../knn'

const getMapPoints = (x: number, y: number): any => {
    const data = [
        [270, 10, 'School', 'Sober'],
        [100, 50, 'Restaurant', 'Sober'],
        [70, 170, 'Salon', 'Sober'],
        [250, 270, 'Bar', 'Drunk'],
        [50, 120, 'Club', 'Drunk'],
        [150, 230, 'School', 'Sober'],
        [150, 250, 'Park', 'Sober'],
        [200, 190, 'Club', 'Drunk'],
        [30, 50, 'Bar', 'Drunk'],
        [150, 110, 'Club', 'Drunk'],
        [70, 220, 'Laser Tag', 'Sober'],
        [200, 100, 'Restaurant', 'Sober'],
        [250, 150, 'Salon', 'Sober'],
    ]

    const testPoint = [x, y, '', '']

    const knn = new KNearestNeighbor(data, testPoint)
    const sim: any = knn.calculate().map((sim: any) => sim.result) // similar pts
    const type: any = knn.classify(3) // classification
    let html = ''
    html += `<span title="${testPoint[2]} c: ${testPoint[0]}, ${testPoint[1]}\"
        class="testPoint" style="left:${testPoint[0]}px;top:${testPoint[1]}px;"></span>`
    data.forEach((pt: any) => {
        let cls: string = 'point'
        if (sim.some((s: any) => s[0] === pt[0] && s[1] === pt[1])) {
            cls += ' nearest'
        }
        html += `<span title="${pt[2]} c: ${pt[0]}, ${pt[1]}\"
        class="${cls}" style="left:${pt[0]}px;top:${pt[1]}px;">${pt[2]}</span>`
    })
    return { html, type }
}

const mapElement: HTMLElement | null = document.getElementById('map')
const clsElement: HTMLElement | null = document.getElementById('classification')

const displayMap = (x: number, y: number) => {
    if (mapElement !== null && clsElement !== null) {
        const result: any = getMapPoints(x, y)
        mapElement.innerHTML = result.html
        clsElement.innerHTML = result.type
    }
}

if (mapElement && clsElement) {
    const animationTimer = setInterval(() => {
        const rngX: number = Math.round(Math.random() * mapElement.clientWidth)
        const rngY: number = Math.round(Math.random() * mapElement.clientHeight)
        displayMap(rngX, rngY)
    }, 800)

    mapElement.onclick = (e: any) => {
        clearInterval(animationTimer)
        const x: number = e.clientX - mapElement.offsetLeft
        const y: number = e.clientY - mapElement.offsetTop
        displayMap(x, y)
    }

    displayMap(150, 125)
}
