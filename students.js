import { saveStudents } from './storage.js';

export function addStudent(students, name, roll, course) {
    if (!name || !roll || !course) {
        alert('Please fill all fields.');
        return students;
    }

    if (students.some(student => student.roll === roll)) {
        alert('A student with this roll number already exists.');
        return students;
    }

    const student = {
        id: Date.now().toString(36),
        name: name,
        roll: roll,
        course: course
    };

    students.push(student);
    saveStudents(students);

    return students;
}

export function deleteStudent(students, id) {
    students = students.filter(student => student.id !== id);
    saveStudents(students);

    return students;
}