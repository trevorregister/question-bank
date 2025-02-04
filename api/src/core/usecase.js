module.exports = class UseCase {
    constructor(repository){
        this.repository = repository
        this.execute.bind(this)
    }

    async execute(data) {
        
    }
}