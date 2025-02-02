import UseCase from "../../../core/usecase.js"

export default class GetUserByIdUseCase extends UseCase {
    constructor(repository){
        super(repository)
    }

    execute = async (id) =>{
        return await this.repository.findById(id)
    }
}