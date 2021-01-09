# Tao project
npm init
# Cai express framework
npm  install express
# Add --inspect to package.json ("start":"nodemon --inspect index.js") --> Debugger on chrome
# cai nodemon (Tu dong reload khi code thay doi)
npm i nodemon --save-dev
#start project
npm start
# cai morgan --> show log
npm i morgan --save-dev
# handle bar https://www.npmjs.com/package/express-handlebars
npm i express-handlebars
# install sass https://www.npmjs.com/package/node-sass
npm install node-sass --save-dev
# Modify package.json script --> "watch": "node-sass -w src/resources/scss/app.scss src/public/css/app.css"
# format code
#prettier https://prettier.io/docs/en/cli.html
# lint-staged: https://www.npmjs.com/package/lint-staged
# husky https://www.npmjs.com/package/husky
npm i prettier lint-staged husky --save-dev
# mongoose https://www.npmjs.com/package/mongoose
# Handle bar https://handlebarsjs.com/


##############################################################################
#git
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/dinhhanh263/nodejs_blog.git
git push -u origin main
##############################################################################
git status
git add .
git commit -m "update readme.txt"
git push origin main
##############################################################################
git checkout -b dvhanh
git pull origin main