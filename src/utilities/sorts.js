//Order an array object bases on another array order

export const mapOrder =(array, order, key) => {
    array.sort((a,b) => order.indexOf(a[key]) - order.indexOf(b[key]))
    return array
}