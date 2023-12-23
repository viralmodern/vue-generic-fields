self.addEventListener("message", async ({ data = {} }) => {
  // console.log('MESSAGE',data)
  let {url, type, headerJson} = data
  // let url = 'https://www.federalregister.gov/api/v1/agencies'
  try {
    self.postMessage({type: 'fetching'})
    let a = await fetch(url, {mode: "cors", ...headerJson})
    console.log('JSON')
    let contentType = a.headers.get('content-type')
    // console.log('CONTENT_TYPE', contentType)
    // text/plain; charset=UTF-8
    let b
    if(contentType.includes('text/plain')) {
      b = await a.text()
    }else {
      b = await a.json()
    }
    let stringData
    if(typeof b === "string") {
      // stringData = JSON.stringify(b)
      stringData = JSON.stringify("fds")
      // stringData = JSON.stringify(splitString(b))
    }else if(!Array.isArray(b)) {
      if(typeof b === "object") {
        let temp = Object.values(b)
        stringData = JSON.stringify(temp)
      }
    }else {
      console.log('ELSE')
      stringData = JSON.stringify(b)
    }
    // console.error('SEND', stringData)
    self.postMessage({ stringData, type})
  }catch (e) {

  }finally {
    self.postMessage({type: 200})
  }
})
