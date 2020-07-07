const inquirer = require('inquirer');
const fs = require('fs');

const CHOICES = fs.readdirSync('./templates');

const QUESTIONS = [
  {
    name: 'template',
    type: 'list',
    message: 'What project template would you like to generate? (simple-node-webapp)',
    default: 'simple-node-webapp.json',
    choices: CHOICES
  },

  {
    name: 'name',
    type: 'input',
    message: 'Project name:'
  },

  {
    name: 'version',
    type: 'input',
    default: '1.0.0',
    message: 'Version (1.0.0):'
  },

  {
    name: 'description',
    type: 'input',
    message: 'Project description:'
  },

  {
    name: 'author',
    type: 'input',
    message: 'Author:'
  },

  {
    name: 'license',
    type: 'input',
    default: 'MIT',
    message: 'License (MIT):'
  }
];

function updateDefaultPackageJSON(packagejson, name, version, description, author, license) {
  packagejson['name'] = name;
  packagejson['version'] = version;
  packagejson['description'] = description;
  packagejson['author'] = author;
  packagejson['license'] = license;

  return packagejson;
}

inquirer.prompt(QUESTIONS)
  .then(answers => {
    const template = answers['template'];
    const name = answers['name'];
    const version = answers['version'];
    const description = answers['description'];
    const author = answers['author'];
    const license = answers['license'];

    const appDetails =  {
        name: name,
        version: "1.0.0",
        description: description,
        author: author,
        license: license
    }

    const details = JSON.stringify(appDetails);
    const data = JSON.parse(fs.readFileSync(`templates/${template}`));

    // creating project directory
    console.log("[CREATING] Project folder")
    fs.mkdirSync(name);
    console.log("[*] Done")

    // updating packagejson with app details
    const packagejson = JSON.stringify(updateDefaultPackageJSON(data.packagejson, name, version, description, author, license));

    // writing packagejson
    console.log("[WRITING] package.json")
    fs.writeFileSync(`${name}/package.json`, packagejson, 'utf-8');
    console.log("[*] Done")

});
