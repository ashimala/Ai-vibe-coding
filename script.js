// Sample course data
const courses = [
    {
        id: 1,
        title: "Web Development Fundamentals",
        description: "Learn the basics of HTML, CSS, and JavaScript to build modern, responsive websites.",
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        duration: "6 weeks",
        level: "Beginner",
        modules: [
            "Introduction to Web Development",
            "HTML5 and Semantic Markup",
            "CSS3 and Responsive Design",
            "JavaScript Basics",
            "DOM Manipulation",
            "Final Project"
        ],
        completed: false
    },
    {
        id: 2,
        title: "Data Science with Python",
        description: "Master data analysis, visualization, and machine learning using Python and popular libraries.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        duration: "8 weeks",
        level: "Intermediate",
        modules: [
            "Python for Data Science",
            "Data Manipulation with Pandas",
            "Data Visualization with Matplotlib and Seaborn",
            "Statistical Analysis",
            "Introduction to Machine Learning",
            "Capstone Project"
        ],
        completed: false
    },
    {
        id: 3,
        title: "UX/UI Design Principles",
        description: "Learn user-centered design methodologies to create intuitive and engaging digital experiences.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        duration: "5 weeks",
        level: "Beginner",
        modules: [
            "Introduction to UX/UI Design",
            "User Research Methods",
            "Information Architecture",
            "Wireframing and Prototyping",
            "Visual Design Principles",
            "Usability Testing"
        ],
        completed: false
    }
];

// DOM Elements
const coursesGrid = document.getElementById('courses-grid');
const courseDetailsSection = document.getElementById('course-details-section');
const coursesSection = document.getElementById('courses-section');
const userDashboardSection = document.getElementById('user-dashboard-section');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const showLogin = document.getElementById('show-login');
const showSignup = document.getElementById('show-signup');
const navCourses = document.getElementById('nav-courses');
const navDashboard = document.getElementById('nav-dashboard');
const exploreCourses = document.getElementById('explore-courses');
const loginFormElement = document.getElementById('login-form-element');
const signupFormElement = document.getElementById('signup-form-element');

// Current user state
let currentUser = null;
let completedCourses = JSON.parse(localStorage.getItem('completedCourses')) || [];

// Initialize the app
function init() {
    renderCourses();
    updateCompletedCourses();
    setupEventListeners();
}

// Render courses to the grid
function renderCourses() {
    coursesGrid.innerHTML = '';
    
    courses.forEach(course => {
        const isCompleted = completedCourses.includes(course.id);
        
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <div class="course-image" style="background-image: url('${course.image}')"></div>
            <div class="course-content">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-meta">
                    <span><i class="far fa-clock"></i> ${course.duration}</span>
                    <span><i class="fas fa-signal"></i> ${course.level}</span>
                </div>
                <div class="course-actions">
                    <a href="#" class="btn-course view-course" data-id="${course.id}">View Details</a>
                    <span class="completed-badge ${isCompleted ? 'show' : ''}">Completed</span>
                </div>
            </div>
        `;
        
        coursesGrid.appendChild(courseCard);
    });
    
    // Add event listeners to view course buttons
    document.querySelectorAll('.view-course').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const courseId = parseInt(this.getAttribute('data-id'));
            showCourseDetails(courseId);
        });
    });
}

// Show course details
function showCourseDetails(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    
    const isCompleted = completedCourses.includes(courseId);
    
    courseDetailsSection.innerHTML = `
        <a href="#" class="back-to-courses" id="back-to-courses"><i class="fas fa-arrow-left"></i> Back to Courses</a>
        <div class="course-details">
            <div class="course-header">
                <div class="course-detail-image" style="background-image: url('${course.image}')"></div>
                <div class="course-info">
                    <h2>${course.title}</h2>
                    <p>${course.description}</p>
                    <div class="course-meta">
                        <span><i class="far fa-clock"></i> ${course.duration}</span>
                        <span><i class="fas fa-signal"></i> ${course.level}</span>
                    </div>
                    <button class="btn btn-primary" id="mark-complete" data-id="${courseId}">
                        ${isCompleted ? 'Course Completed' : 'Mark as Completed'}
                    </button>
                    ${isCompleted ? '<span class="completed-badge show" style="margin-left: 10px;">Completed</span>' : ''}
                </div>
            </div>
            <div class="modules-list">
                <h3>Course Modules</h3>
                ${course.modules.map((module, index) => `
                    <div class="module-item">
                        <span>${index + 1}. ${module}</span>
                        <i class="fas fa-check-circle ${isCompleted ? 'completed' : ''}" style="color: ${isCompleted ? 'var(--success)' : '#ddd'}"></i>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    coursesSection.style.display = 'none';
    courseDetailsSection.style.display = 'block';
    userDashboardSection.style.display = 'none';
    
    // Add event listeners
    document.getElementById('back-to-courses').addEventListener('click', function(e) {
        e.preventDefault();
        showCourses();
    });
    
    if (!isCompleted) {
        document.getElementById('mark-complete').addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            markCourseAsCompleted(id);
        });
    }
}

// Mark course as completed
function markCourseAsCompleted(courseId) {
    if (!completedCourses.includes(courseId)) {
        completedCourses.push(courseId);
        localStorage.setItem('completedCourses', JSON.stringify(completedCourses));
        updateCompletedCourses();
        showCourseDetails(courseId);
        
        // Show success message
        alert('Course marked as completed!');
    }
}

// Update completed courses in the UI
function updateCompletedCourses() {
    document.querySelectorAll('.course-card').forEach(card => {
        const courseId = parseInt(card.querySelector('.view-course').getAttribute('data-id'));
        const badge = card.querySelector('.completed-badge');
        
        if (completedCourses.includes(courseId)) {
            badge.style.display = 'inline-block';
        } else {
            badge.style.display = 'none';
        }
    });
}

// Show courses section
function showCourses() {
    coursesSection.style.display = 'block';
    courseDetailsSection.style.display = 'none';
    userDashboardSection.style.display = 'none';
    loginForm.style.display = 'none';
    signupForm.style.display = 'none';
}

// Show user dashboard
function showDashboard() {
    if (!currentUser) {
        showLoginForm();
        return;
    }
    
    const completedCount = completedCourses.length;
    const progressPercentage = Math.round((completedCount / courses.length) * 100);
    
    userDashboardSection.innerHTML = `
        <div class="user-dashboard">
            <div class="user-info">
                <div class="user-avatar">
                    ${currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h2>Welcome, ${currentUser.name}!</h2>
                    <p>${currentUser.email}</p>
                </div>
            </div>
            
            <div class="progress-section">
                <h3>Your Learning Progress</h3>
                <div class="progress-item">
                    <span>Courses Completed</span>
                    <span>${completedCount} of ${courses.length}</span>
                </div>
                <div class="progress-item">
                    <span>Overall Progress</span>
                    <span>${progressPercentage}%</span>
                </div>
            </div>
            
            <div class="progress-section">
                <h3>Completed Courses</h3>
                ${completedCount > 0 ? 
                    completedCourses.map(id => {
                        const course = courses.find(c => c.id === id);
                        return `<div class="progress-item">
                            <span>${course.title}</span>
                            <span class="completed-badge show">Completed</span>
                        </div>`;
                    }).join('') : 
                    '<p>You haven\'t completed any courses yet.</p>'
                }
            </div>
        </div>
    `;
    
    coursesSection.style.display = 'none';
    courseDetailsSection.style.display = 'none';
    userDashboardSection.style.display = 'block';
    loginForm.style.display = 'none';
    signupForm.style.display = 'none';
}

// Show login form
function showLoginForm() {
    coursesSection.style.display = 'none';
    courseDetailsSection.style.display = 'none';
    userDashboardSection.style.display = 'none';
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
}

// Show signup form
function showSignupForm() {
    coursesSection.style.display = 'none';
    courseDetailsSection.style.display = 'none';
    userDashboardSection.style.display = 'none';
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
}

// Setup event listeners
function setupEventListeners() {
    // Navigation
    navCourses.addEventListener('click', function(e) {
        e.preventDefault();
        showCourses();
    });
    
    navDashboard.addEventListener('click', function(e) {
        e.preventDefault();
        showDashboard();
    });
    
    exploreCourses.addEventListener('click', function(e) {
        e.preventDefault();
        showCourses();
    });
    
    // Auth buttons
    loginBtn.addEventListener('click', showLoginForm);
    signupBtn.addEventListener('click', showSignupForm);
    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        showLoginForm();
    });
    showSignup.addEventListener('click', function(e) {
        e.preventDefault();
        showSignupForm();
    });
    
    // Form submissions
    loginFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Simple validation
        if (email && password) {
            currentUser = {
                name: email.split('@')[0],
                email: email
            };
            
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            showDashboard();
        } else {
            alert('Please fill in all fields');
        }
    });
    
    signupFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        
        // Simple validation
        if (name && email && password) {
            currentUser = {
                name: name,
                email: email
            };
            
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            showDashboard();
        } else {
            alert('Please fill in all fields');
        }
    });
    
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);