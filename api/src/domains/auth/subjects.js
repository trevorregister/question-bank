class QuestionSub {
    constructor(ownerId) {
      this.ownerId = ownerId
    }
  }
  
  class ActivitySub {
    constructor(ownerId) {
      this.ownerId = ownerId
    }
  }

  class UserSub {
    constructor(id) {
        this.id = id
    }
  }
  
  module.exports = { 
    QuestionSub, 
    ActivitySub,
    UserSub 
}