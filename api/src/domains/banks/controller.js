const {
    CreateBankUseCase,
    GetMyBanksUseCase
} = require('./use-cases/index')

module.exports = class BankController {
    constructor(repository){
        this.repository = repository
        this.create = this.create.bind(this)
        this.getMyBanks = this.getMyBanks.bind(this)
    }

    async create(req, res, next){
        try {
            const createBankCase = new CreateBankUseCase(this.repository)
            const data = {...req.body, owner: req.user.id}
            const result = await createBankCase.execute(data)
            res.status(201).send(result)
        } catch(err){
            next(err)
        }
    }

    async getMyBanks(req, res, next){
        try {
            const getMyBanksCase = new GetMyBanksUseCase(this.repository)
            const { ownerId } = req.params
            const result = await getMyBanksCase.execute(ownerId)
            res.status(200).send(result)
        } catch(err){
            next(err)
        }
    }
}