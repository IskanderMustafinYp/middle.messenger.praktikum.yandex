// [1, 2, 3, 4] => 4
function last(list) {
    if (!Array.isArray(list) || !list.length) {
        return undefined;
    }
    return list[list.length - 1];
}

export function rangeRight(start, end, step) {
    return range(start, end, step, true);
}

export function range(...args) {
    let [start, end, step, isRight = false] = args;
    if (args[1] == null) {
        end = start;
        start = 0;
    }


    if (step == null) {
        step = end < 0 ? -1 : 1;
        
    }

    const elemsCount = Math.floor(Math.abs((end - start) / (step || 1)));

    const mapper = !isRight
        ? (index) => start + step * index
        : (index) => {
              return end - step * (index + 1);
          };
    return Array(elemsCount)
        .fill(1)
        .map((_, index) => mapper(index));
}

export function isEmpty(val) {
    if (Array.isArray(val)) {
        return !val.length;
    } else if (val instanceof Map || val instanceof Set) {
        return !val.size;
    } else if (typeof val === 'object' && val !== null) {
        return !Object.keys(val).length;
    } else if (typeof val === 'string') {
        return !val.length;
    }

    return true;
}
