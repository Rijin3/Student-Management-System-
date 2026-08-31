const STORAGE_KEY = 'sms_students_v1';

export function loadStudents() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (error) {
        return [];
    }
}

export function saveStudents(students) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}