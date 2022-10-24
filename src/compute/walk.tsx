class ObjectSet extends Set {
    add(elem: any) {
        return super.add(typeof elem === 'object' ? JSON.stringify(elem) : elem);
    }
    
    has(elem: [number, number]) {
        return super.has(typeof elem === 'object' ? JSON.stringify(elem) : elem);
    }
}


export default class Walker {
    size: number
    start: [number, number]
    end: [number, number]
    seen: ObjectSet

    constructor(size: number, start: [number, number], end: [number, number]) {
        this.size = size
        this.start = start
        this.end = end
        this.seen = new ObjectSet()
    }

    validSquare(square: [number, number]): boolean {
        return square[0] >= 0 && square[1] >= 0 && square[0] < this.size && square[1] < this.size
    }
    
    findNextMoves(square: [number, number]) {
        const actions = [[2,1], [2,-1], [-2,1], [-2,-1],[1,2], [1,-2], [-1,2], [-1,-2]]
        const nextSquares: Array<[number, number]> = actions.map(([a,b]) => [square[0] + a, square[1] + b])
        return nextSquares.filter(s => this.validSquare(s) && !this.seen.has(s))
    }

    buildPath(dp: Array<Array<[number, number] | null>>) {
        const res: string[] = []
        let curr = dp[this.end[0]][this.end[1]]
        if (curr === null) { return [`${this.end[0]}${this.end[1]}`] }
        //@ts-ignore 
        while (curr[0] !== this.start[0] || curr[1] !== this.start[1]) {
            if (curr === null) { break }
            res.push(`${curr[0]}${curr[1]}`)
            curr = dp[curr[0]][curr[1]]
        }
        return ([...res.reverse(), `${this.end[0]}${this.end[1]}`])
    }

    findShortestPath() {
        // curr[0] = current coordinate, curr[1] = previous coordinate
        let dp = Array<[number, number]>(this.size).fill([0,0]).map(x => Array<[number, number] | null>(this.size).fill(null))
        let queue: Array<[[number, number], [number, number] | null]> = []
        queue.push([this.start, null])
        while (queue.length > 0) {
            let curr = queue.shift()
            if (curr === undefined) { break }
            curr[1] === null ? dp[curr[0][0]][curr[0][1]] = null : dp[curr[0][0]][curr[0][1]] = [curr[1][0],curr[1][1]]
            // if (curr[1] !== null) {
            //     dp[curr[0][0]][curr[0][1]] = [curr[1][0],curr[1][1]]
            // } else {
            //     dp[curr[0][0]][curr[0][1]] = null
            // }
            if (curr[0][0] === this.end[0] && curr[0][1] === this.end[1]) {
                return this.buildPath(dp)
            }
            for (var square of this.findNextMoves(curr[0])) {
                if (this.seen.has(square)) { continue }
                this.seen.add(square)
                queue.push([square, curr[0]])
            }
        }
        return []
    }
}

