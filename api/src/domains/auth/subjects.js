const isTypeOid = require('../utils/isTypeOid')
class Question {
    constructor({id, owner}) {
      this.id = id
      this.owner = isTypeOid(owner) ? owner.toHexString() : owner
    }
  }

class Bank {
  constructor({id, owner}){
    this.id = id
    this.owner = owner
  }
}
  
class Activity {
  constructor({id, owner}) {
    this.id = id 
    this.owner = owner
  }
}

class User {
  constructor({id}) {
      this.id = id
  }
}
  
  module.exports = { 
    Question, 
    Activity,
    User,
    Bank 
}