import Controller from "../../core/controller.js"

export default class UserController extends Controller {
    constructor(useCases){
        console.log('controller constructor', useCases)
        super(useCases)
    }
}