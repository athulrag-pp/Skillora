// Utility functions for sorting and filtering students in SKILLORA Student Intelligence System

export const sortStudents = (students, sortBy, sortOrder = 'desc') => {
  const isAsc = sortOrder === 'asc';

  return [...students].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return isAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      
      case 'academic':
        return isAsc ? a.academic - b.academic : b.academic - a.academic;
      
      case 'grade': {
        const order = { 'A': 4, 'B': 3, 'C': 2, 'D/F': 1 };
        return isAsc ? order[a.grade] - order[b.grade] : order[b.grade] - order[a.grade];
      }

      case 'attendance':
        return isAsc ? a.attendance - b.attendance : b.attendance - a.attendance;

      case 'attendanceStatus': {
        const attOrder = { 'Excellent': 4, 'Good': 3, 'Average': 2, 'Attendance Risk': 1 };
        return isAsc ? attOrder[a.attendanceStatus] - attOrder[b.attendanceStatus] : attOrder[b.attendanceStatus] - attOrder[a.attendanceStatus];
      }

      case 'assignment':
        return isAsc ? a.assignment - b.assignment : b.assignment - a.assignment;

      case 'progress':
        return isAsc ? a.progress - b.progress : b.progress - a.progress;

      case 'overallScore':
        return isAsc ? a.overallScore - b.overallScore : b.overallScore - a.overallScore;

      case 'riskLevel': {
        const riskOrder = { 'CRITICAL': 4, 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
        return isAsc ? riskOrder[a.riskLevel] - riskOrder[b.riskLevel] : riskOrder[b.riskLevel] - riskOrder[a.riskLevel];
      }

      default:
        return b.overallScore - a.overallScore;
    }
  });
};

export const filterStudents = (students, filters) => {
  const { grade, attendanceStatus, riskLevel, courseId, batchId, searchQuery, quickFilter } = filters;

  return students.filter(student => {
    // Quick filter shortcuts
    if (quickFilter === 'excellent' && student.grade !== 'A') return false;
    if (quickFilter === 'good' && student.grade !== 'B') return false;
    if (quickFilter === 'average' && student.grade !== 'C') return false;
    if (quickFilter === 'belowAverage' && student.grade !== 'D/F') return false;
    if (quickFilter === 'attendanceRisk' && student.attendanceStatus !== 'Attendance Risk') return false;
    if (quickFilter === 'atRisk' && (student.riskLevel !== 'HIGH' && student.riskLevel !== 'CRITICAL')) return false;
    if (quickFilter === 'topPerformers' && student.overallScore < 85) return false;

    // Specific filters
    if (grade && grade !== 'ALL' && student.grade !== grade) return false;
    if (attendanceStatus && attendanceStatus !== 'ALL' && student.attendanceStatus !== attendanceStatus) return false;
    if (riskLevel && riskLevel !== 'ALL' && student.riskLevel !== riskLevel) return false;
    if (courseId && courseId !== 'ALL' && student.courseId !== courseId) return false;
    if (batchId && batchId !== 'ALL' && student.batchId !== batchId) return false;

    // Search query
    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = student.name.toLowerCase().includes(q);
      const matchId = student.id.toLowerCase().includes(q);
      const matchCourse = student.courseName.toLowerCase().includes(q);
      const matchBatch = student.batchName.toLowerCase().includes(q);
      if (!matchName && !matchId && !matchCourse && !matchBatch) return false;
    }

    return true;
  });
};
