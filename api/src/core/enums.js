/* const USER_ROLES = ['student', 'teacher', 'admin']
const QUESTION_TYPES = ['numerical', 'multiple-choice', 'matrix'] */

const USER_ROLES = {
    Student: 'student',
    Teacher: 'teacher',
    Admin: 'admin'
}

const QUESTION_TYPES = {
    Numerical: 'numerical', 
    MultipleChoice: 'multiple-choice',
    Matrix: 'matrix'
}

module.exports = {
    USER_ROLES,
    QUESTION_TYPES
}