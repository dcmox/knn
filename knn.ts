export const eucidianDistance = (a: any[], b: any[], dimensions: number) => {
    if (a.length !== b.length) { return null }
    let sum: number = 0
    for (let i = 0; i < dimensions; i++) {
        sum += Math.pow(a[i] - b[i], 2)
    }
    return Math.sqrt(sum)
}

export const hammingDistance = (a: any[], b: any[]) => {
    if (a.length !== b.length) { return null }
    let d: number = 0
    let i: number = a.length
    while (i--) {
        if (a[i] !== b[i]) { d++ }
    }
    return d
}

export class KNearestNeighbor {
    public k: number
    public pt: any[]
    public classifiers: number[]
    public data: any[][]
    private _results: any[] = []

    constructor(data: any[][], pt: any[], k: number = 3, classifiers: number[] = [2, 3]) {
        this.data = data
        this.pt = pt
        this.k = k
        this.classifiers = classifiers
    }

    public calculate(): any[] {
        this.data.forEach((point: any) => {
            this._results.push({distance: eucidianDistance(point, this.pt, 2), result: point})
        })
        this._results = this._results.sort((a: any, b: any) =>
            a.distance < b.distance ? -1 : 1).slice(0, this.k)
        return this._results
    }
    public classify(n: number): any {
        let tmp: any = []
        this._results.forEach((r: any) => {
            const match: any = tmp.find((res: any) => res.result === r.result[n])
            if (match) {
                match.frequency++
            } else {
                tmp.push({
                    frequency: 1,
                    result: r.result[n],
                })
            }
        })
        tmp = tmp.sort((a: any, b: any) => a.frequency < b.frequency ? 1 : -1)
        return tmp[0].result
    }
}
