// usual
console.log("usual")
const anyProcessing = () => {
  const val = Math.random()
  window.setTimeout(() => { console.log("hoge") }, val * 10000)
  return val > 0.5
}

const promise = new Promise((res: () => void, rej: () => void) => {
  if (anyProcessing()) {
    res()
  } else {
    rej()
  }
})

promise.then(() => {
  console.log("resolve")
}).catch(() => {
  console.log("reject")
})


// 非同期を直列で行う
console.log("series")
const f1 = (num) => {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      console.log("f1")
      resolve(num)
    }, 3000)
  })
}

const f2 = (num) => {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(num * num)
    })
  })
}

f1(3)
  .then(f2)
  .then((result) => {
    console.log("f2: "+ result)
  })
  .catch((e) => {
    console.log(e)
  })


// promise all
console.log("promise all")
const paf1 = (num) => new Promise((resolve) => {
  window.setTimeout(() => {
    resolve(num)
  }, 10000)
})

const paf2 = (num) => new Promise((resolve) => {
  window.setTimeout(() => {
    resolve(num * num)
  }, 2000)
})

Promise.all([
  paf1(10),
  paf2(10)
])
  .then((result) => {
    console.log(result)
  })
  .catch((e) => {
    console.log(e)
  })


// どちらか一方が処理されたら次の処理へ行く次の処理へ行く
console.log("race")
const rf1 = (num) => new Promise((res) => {
  window.setTimeout(() => {
    console.log(num)
  }, 10000)
})

const rf2 = (num) => new Promise((res, rej) => {
  window.setTimeout(() => {
    rej(num * num)
  }, 2000)
})

Promise.race([
  rf1(10),
  rf2(10)
])
  .then((result) => {
    console.log(result)
  })
  .catch((e) => {
    console.log(e)
  })

