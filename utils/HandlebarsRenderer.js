const hbs = require('express-handlebars').create()

module.exports.render = async function (templateName, context) {
   const path = `templates/${templateName}.hbs`
   const html = await hbs.render(path, context)
   return html
}
