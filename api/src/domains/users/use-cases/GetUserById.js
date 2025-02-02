import UseCase from "../../../core/usecase.js"

export class GetUserByIdUseCase extends UseCase {
    constructor(repository){
        super(repository)
    }

    async execute(id){
        return await this.repository.findById(id)
    }
}