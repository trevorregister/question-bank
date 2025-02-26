const {
  CreateClassUseCase,
  JoinClassUseCase,
  DropStudentUseCase,
  ArchiveClassUseCase,
  UnarchiveClassUseCase,
  GetClassUseCase,
  GetMyClassesUseCase,
} = require("./use-cases/index")

module.exports = class ClassController {
  constructor(repository) {
    this.repository = repository
    this.create = this.create.bind(this)
    this.joinClass = this.joinClass.bind(this)
    this.dropStudent = this.dropStudent.bind(this)
    this.archive = this.archive.bind(this)
    this.unarchive = this.unarchive.bind(this)
    this.getClass = this.getClass.bind(this)
    this.getMyClasses = this.getMyClasses.bind(this)
  }

  async create(req, res, next) {
    try {
      const createClassCase = new CreateClassUseCase(this.repository)
      const data = { owner: req.user.id, ...req.body }
      const result = await createClassCase.execute(data)
      res.status(201).send(result)
    } catch (err) {
      next(err)
    }
  }

  async getClass(req, res, next) {
    try {
      const getClassCase = new GetClassUseCase(this.repository)
      const data = req.params.classId
      const result = await getClassCase.execute(data)
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  async getMyClasses(req, res, next) {
    try {
      const getMyClassesCase = new GetMyClassesUseCase(this.repository)
      const { ownerId } = req.params
      const result = await getMyClassesCase.execute(ownerId)
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  async joinClass(req, res, next) {
    try {
      const joinClassCase = new JoinClassUseCase(this.repository)
      const data = { userId: req.user.id, ...req.body }
      const result = await joinClassCase.execute(data)
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  async dropStudent(req, res, next) {
    try {
      const dropStudentCase = new DropStudentUseCase(this.repository)
      const data = {
        classId: req.params.classId,
        studentId: req.body.studentId,
      }
      const result = await dropStudentCase.execute(data)
      res.status(204).send("success")
    } catch (err) {
      next(err)
    }
  }

  async archive(req, res, next) {
    try {
      const archiveClassCase = new ArchiveClassUseCase(this.repository)
      const data = req.params.classId
      const result = await archiveClassCase.execute(data)
      res.status(204).send("success")
    } catch (err) {
      next(err)
    }
  }

  async unarchive(req, res, next) {
    try {
      const archiveClassCase = new UnarchiveClassUseCase(this.repository)
      const data = req.params.classId
      const result = await archiveClassCase.execute(data)
      res.status(204).send("success")
    } catch (err) {
      next(err)
    }
  }
}
