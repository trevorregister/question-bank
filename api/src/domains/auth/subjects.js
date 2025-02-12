class Question {
    constructor({id, owner}) {
      this.id = id
      this.owner = owner.toHexString()
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
    User 
}