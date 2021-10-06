const input = document.querySelector("input");
const preview = document.querySelector(".preview");

/* input.style.opacity = 0; */

input.addEventListener("change", updateImageDisplay);

function updateImageDisplay() {
  while (preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }

  // If no file selected yet display message or if file selected then display file
  const curFiles = input.files;
  if (curFiles.length === 0) {
    const para = document.createElement("p");
    para.textContent = "No file currently selected";
    preview.appendChild(para);
  } else {
    const list = document.createElement("ol");
    preview.appendChild(list);

    // Create item for file selected and display to user
    for (const file of curFiles) {
      const listItem = document.createElement("li");
      const para = document.createElement("p");
      if (validFileType(file)) {
        para.textContent = `File name: ${file.name} selected.\r

              File size: ${returnFileSize(file.size)}`;
        const image = document.createElement("img");
        image.src = "images/gpx-thumbnail.png"; //* URL.createObjectURL(file) */;

        listItem.appendChild(image);
        listItem.appendChild(para);
      } else {
        para.textContent = `File name ${file.name}: Not a valid file type. Please upload a GPX file.`;
        listItem.appendChild(para);
      }
      list.appendChild(listItem);
    }
  }
}

const fileTypes = "application/gpx+xml";

function validFileType(file) {
  return fileTypes.includes(file.type);
}

function returnFileSize(number) {
  if (number < 1024) {
    return number + "bytes";
  } else if (number >= 1024 && number < 1048576) {
    return (number / 1024).toFixed(1) + "KB";
  } else if (number >= 1048576) {
    return (number / 1048576).toFixed(1) + "MB";
  }
}
