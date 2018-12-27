const input = (item, currentRecord) => (
  `<div>${item.label}: ${currentRecord.recordObject[item.id]}</div>`
);
const checkbox = (item, currentRecord) => (
  `<div>${item.label}: ${currentRecord.recordObject[item.id]}</div>`
);
const radiobuttons = (item, currentRecord) => (
  `<div>${item.label}: ${currentRecord.recordObject[item.id]}</div>`
);
const datepicker = (item, currentRecord) => (
  `<div>${item.label}: ${currentRecord.recordObject[item.id]}</div>`
);
const notes = (item, currentRecord) => (
  `<div>${item.label}: <img style="width:400px" src="${currentRecord.recordObject[item.id]}"/></div>`
);
const title = (item, currentRecord) => (
  `<div>${item.label} ${item.description]}</div>`
);
const imagepicker = (item, currentRecord) => (
  `<div>${item.label}: <img style="width:400px" src="${currentRecord.recordObject[item.id]}"/></div>`
);
const dropDown = (item, currentRecord) => (
  `<div>${item.label}: ${currentRecord.recordObject[item.id]}</div>`
);


const Template = (currentForm, currentRecord) => {
  return `
      <html>
        <body>
          <h1 style="text-align:center">Form Pro</h1>
          <div>Form Name: ${currentForm.formName}</div>
          <div>Record Name: ${currentRecord.recordName}</div>
          ${currentForm.formArray.map(item => {
            switch (item.field) {
              case 'input': return input(item, currentRecord)
              case 'checkbox': return checkbox(item, currentRecord)
              case 'dropdown': return dropdown(item, currentRecord)
              case 'radiobuttons': return radiobuttons(item, currentRecord)
              case 'datepicker': return datepicker(item, currentRecord)
              case 'notes': return notes(item, currentRecord)
              case 'title': return title(item, currentRecord)
              case 'imagepicker': return imagepicker(item,currentRecord)
            }
          })}
        </body>
      </html>
    `.replace(/(<(pre|script|style|textarea)[^]+?<\/\2)|(^|>)\s+|\s+(?=<|$)/g, "$1$3");
};




export default Template;