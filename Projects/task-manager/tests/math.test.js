const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math')

// test('Should calculate total with tip', () => {
//     const total = calculateTip(10, .3)

//     // if(total != 13) {
//     //     throw new Error('Total tip should be 13. Got ' + total)
//     // }

//     expect(total).toBe(13)
// })

// test('Should calculate total with tip', () => {
//     const total = calculateTip(10)

//     // if(total != 13) {
//     //     throw new Error('Total tip should be 13. Got ' + total)
//     // }

//     expect(total).toBe(12.5)
// })

test('Should convert 32 F to 0 C', () => {
    const temp = fahrenheitToCelsius(32)

    // if(total != 13) {
    //     throw new Error('Total tip should be 13. Got ' + total)
    // }

    expect(temp).toBe(0)
})

test('Should convert 0 c to 32 F', () => {
    const temp = celsiusToFahrenheit(0)

    // if(total != 13) {
    //     throw new Error('Total tip should be 13. Got ' + total)
    // }

    expect(temp).toBe(32)
})

// test('Async test demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2)
//         done()
//     }, 2000)
// })

// test('Should add two numbers', (done) => {
//     add(2, 3).then((sum) => {
//         expect(sum).toBe(5)
//         done()
//     })
// })

// test('Should add two numbers async/await', async () => {
//     const sum = await add(2, 3)
//     expect(sum).toBe(5)
// })

// test('Hello World!', () => {

// })

// test('This should fail', () => {
//     throw new Error('failure!')
// })