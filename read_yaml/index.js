const core = require('@actions/core');
const github = require('@actions/github');
const yaml = require('js-yaml');
const fs = require('fs');
try {  
    const configData = core.getInput('config');
    fs.readFile(configData, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
    const configYaml = yaml.load(data, 'utf8');
    const resource_group = "rg-"+configYaml["variables"]["namespace"]+"-"+configYaml["variables"]["postfix"]+configYaml["variables"]["environment"]
    const aml_workspace = "mlw-"+configYaml["variables"]["namespace"]+"-"+configYaml["variables"]["postfix"]+configYaml["variables"]["environment"]
    core.setOutput("resource_group",resource_group);
    core.setOutput("aml_workspace", aml_workspace);
  });
  
} catch (error) {
  core.setFailed(error.message);
}
