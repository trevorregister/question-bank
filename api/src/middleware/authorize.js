const { HttpError, NotFoundError } = require('../core/errors')
const AbilityFactory = require('../domains/auth/AbilityFactory')
const AuthRepo = require('../domains/auth/repository')
const { Question, User } = require('../domains/auth/subjects')

const authorize = (action, subjectClass) => {
    return async (req, res, next) => {
        try {
            if(!req.user){
                throw new HttpError(403, 'unauthorized')
            }

            const ability = AbilityFactory.defineAbilitiesFor(req.user)
            if(action === 'create'){
                if(ability.can(action, subjectClass)){
                   return next()
                } else {
                    throw new HttpError(403, 'forbidden')
                }
            }
    
            let resource
            let resourceId
            switch(subjectClass){
                case Question:
                    resourceId = req.params.questionId
                    break
                case User:
                    resourceId = req.params.userId
                    break
                default:
                    throw new TypeError(subjectClass.name)
            }

            resource = await AuthRepo.getResource({resourceId, subjectClass})
            if(!resource) {
                throw new NotFoundError(`resource ${subjectClass.name}`)
            }
    
            const subject = new subjectClass(resource)
    
            if(!ability.can(action, subject)){
                throw new HttpError(403, 'unauthorized')
            }
    
            next()
        } catch (err) {
            next(err)
        }
    }
}

module.exports = authorize

/* const authorize = (action, subjectGetter) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const ability = AbilityFactory.defineAbilitiesFor(req.user);
        
        // Determine the subject dynamically (optional)
        const subject = typeof subjectGetter === 'function' ? subjectGetter(req) : subjectGetter;

        if (!ability.can(action, subject)) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        next();
    };
}; */