const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
   host: 'localhost',
   dialect: 'mysql',
   pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
   },
});

//sync sequelize with database
let Student = sequelize.define('student', {
   id: {
      type: Sequelize.INTEGER,
      autoincrement: true,
      allowNull: false,
   },
   name: {
      type: Sequelize.STRING,
      allowNull: false,
      isString: true,
      validate: {
         notEmpty: true,
         maxlength: 20,
         minlength: 3,
      }
   },
   age: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 9,
      validate: {
         max: 100,
         min: 3,
         isInt: true,
         notEmpty: true,
      }
   },
   email: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
         max: 100,
         min: 3,
         isInt: true,
         notEmpty: true,
         isEmail: true,
         unique: true,
      }
   }
})

sequelize.sync({force: true}).then(() => {
   let student1 = await Student.create({
      name: 'John',
      age: 20,
      email: ''
   })
   let student2 = await Student.create({
      name: 'Jane',
      age: 21,
      email: ''
   })
   student1.save()
   student2.save()
   let foundedStudent = await Student.findOne({ where: { name: 'Tahmid' } });
   console.log(foundedStudent)
   //update foundedStudent using Student.update
   let updatedStudent = await Student.update({
      name: 'Ali',
      age: 10,
      email: ''
   }, {
      where: {
         name: 'Tahmid'
      }
   })
   updatedStudent.save()
   //delete updatedStudent using Student.destroy
   let deletedStudent = await Student.destroy({
      where: {
         name: 'Ali'
      }
   })
   console.log(deletedStudent)
   console.log(updatedStudent)
   console.log('Database synced');
}).catch(err => {
   console.log(err);
});