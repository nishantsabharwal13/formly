const input = (item, currentRecord) => (
  `<div style="font-size: 25px; padding: 10px"><b>${item.label}:&nbsp;</b> ${currentRecord.recordObject[item.id]}</div>`
);
const checkbox = (item, currentRecord) => (
  `<div style="display:flex;flex-direction:column">
    <div style="font-size: 25px; padding: 10px"><b> ${item.label}: </b></div>
    <div style="font-size: 25px;">
    ${item.options.map(option => 
      `<div style="display:flex;align-items:center;">
        <input style="padding-left:5px;padding-right:5px;border-radius:15px;border: solid 2px #333;color:#FFF;white-space: nowrap;overflow:hidden;width:45px;height:45px;"type="checkbox" ${currentRecord.recordObject[option.id] ? 'checked': ''} />
        <div style="font-size: 25px; padding: 10px"><b>${option.label} </b></div>
      </div>`
      )}
    </div>
  </div>`
);
const radiobuttons = (item, currentRecord) => (
  `<div style="display:flex;align-items:center;">
    <div style="font-size: 25px; padding: 10px"><b> ${item.label}: </b></div>
    <div style="border: 1px solid #0295FF;background: #0295FF; color: #fff; padding: 10px;font-size: 25px;border-radius:3px;">
      ${currentRecord.recordObject[item.id]}
    </div>
  </div>`
);
const datepicker = (item, currentRecord) => (
  `<div style="display: flex;align-items:center;">
    <div style="font-size: 25px; padding: 10px"><b>${item.label}:&nbsp;</b></div>
    <div style="border: 1px solid #333;font-size: 25px; padding: 10px; border-radius: 3px;">${currentRecord.recordObject[item.id]}</div>
  </div>`
);
const notes = (item, currentRecord) => (
  `<div style="display: flex;align-items:center;">
    <div style="font-size: 25px; padding: 10px"><b>${item.label}:&nbsp;</b></div>
    <img style="width:400px;border:2px solid #333;margin-left:auto;" src="${currentRecord.recordObject[item.id]}"/>
  </div>`
);
const title = (item, currentRecord) => (
  `<div style="display:flex; align-items:center;flex-direction:column; margin: 20px;">
    <h1 style="text-align;">${item.label}</h1>
    <h2 style="text-align;color: grey;">${item.description}</h2>
  </div>`
);
const imagepicker = (item, currentRecord) => {

  return `<div style="display: flex;align-items:center;">
      <div style="font-size: 25px; padding: 10px"><b>${item.label}:&nbsp;</b></div>
      <img style="width:400px;margin-left:auto;" src="${currentRecord.recordObject[item.id]}"/>
    </div>`
}

const dropdown = (item, currentRecord) => (
  `<div style="display:flex; flex-direction: column">
    <div style="font-size: 25px; padding: 10px;"><b> ${item.label}: </b></div>
    <div style="border-bottom: 1px solid #333;font-size: 25px;padding: 10px";">${item ? item.options[currentRecord.recordObject[item.id]].label : ''}</div>
  </div>`
);


const Template = (currentForm, currentRecord) => {
  return `
      <html>
        <body style="color: #333;font-family: sans-serif;">
          <h1 style="text-align:center;font-size: 40px;">Form Pro</h1>
          <div style="color: grey;font-size: 30px; padding: 10px;"><b style="color:#ccc">Form Name:&nbsp;</b> ${currentForm.formName ? currentForm.formName : ''}</div>
          <div style="color: grey;font-size: 30px; padding: 10px;margin-bottom:20px;border-bottom: 1px solid #333;"><b style="color:#ccc">Record Name:&nbsp;</b> ${currentRecord.recordName}</div>
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