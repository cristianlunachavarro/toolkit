const chai = require('chai');
const chaiHttp = require('chai-http')
const app = require('../index.js')

chai.use(chaiHttp);
chai.should();

global.chai = chai;
global.expect = chai.expect;
global.app = app;
