const dropFileZone = document.querySelector(".upload-zone_dragover")
const statusText = document.getElementById("uploadForm_Status")
const sizeText = document.getElementById("uploadForm_Size")
const uploadInput = document.querySelector(".form-upload__input")


let setStatus = (text) => {
  statusText.textContent = text
}

const uploadUrl = "/unicorns";

["dragover", "drop"].forEach(function(event) {
  document.addEventListener(event, function(evt) {
    evt.preventDefault()
    return false
  })
})

dropFileZone.addEventListener("dragenter", function() {
  dropFileZone.classList.add("_active")
})

dropFileZone.addEventListener("dragleave", function() {
  dropFileZone.classList.remove("_active")
})

dropFileZone.addEventListener("drop", function() {
  dropFileZone.classList.remove("_active")
  const file = event.dataTransfer?.files[0]
  if (!file) {
    return
  }

  if (file.type.startsWith("video/")) {
    uploadInput.files = event.dataTransfer.files
    processingUploadFile()
  } else {
    setStatus("Можно загружать только изображения")
    return false
  }
})

uploadInput.addEventListener("change", (event) => {
  const file = uploadInput.files?.[0]
  if (file && file.type.startsWith("video/")) {
    processingUploadFile()
  } else {
    setStatus("Можно загружать только изображения")
    return false
  }
})

function processingUploadFile(file) {
  if (file) {
    const dropZoneData = new FormData()
    const xhr = new XMLHttpRequest()

    dropZoneData.append("file", file)

    xhr.open("POST", uploadUrl, true)

    xhr.send(dropZoneData)

    xhr.onload = function () {
      if (xhr.status == 2000) {
        setStatus("Всё загружено")
      } else {
        setStatus("Oшибка загрузки")
      }
      HTMLElement.style.display = "none"
    }
  }
}

function processingDownloadFileWithFetch() {
  fetch(url, {
    method: "POST",
  }).then(async (res) => {
    const reader = res?.body?.getReader();
    while (true && reader) {
      const { value, done } = await reader?.read()
      console.log("value", value)
      if (done) break
      console.log("Received", value)
    }
  })
}
