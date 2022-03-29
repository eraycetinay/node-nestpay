const hbs = require('express-handlebars').create()
const path = require('path')

module.exports.render = async function (templateName, context) {
   const hbspath = path.join(__dirname,`../templates/${templateName}.hbs`)
   const html = await hbs.render(hbspath, context)
   return html
}