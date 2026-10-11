
/* =========================================
   COURSE IMAGES
   ========================================= */

const courseImages = {
    "Java Programming": "/images/Java.jpg",
    "Full Stack Web Development": "/images/full-stack.jpg",
    "Python Developer": "/images/python.jpg",
    "DevOps Engineer": "/images/devops.jpg",
    "UI UX Designer": "/images/ui-ux.jpg",
    "Java Backend Development": "/images/java-backend.jpg",
    "Data Science": "/images/data-science.jpg",
    "Machine Learning": "/images/mechine-learning.jpg",
    "Cloud Computing": "/images/cloud-computing.jpg",
    "Cyber Security": "/images/cyber-security.jpg",
    "SQL and Database Management": "/images/SQL-DB.jpg"
};


function getCourseImage(courseTitle) {
    const title = (courseTitle || "").trim().toLowerCase();

    const imageMap = {
        "java programming": "/images/Java.jpg",
        "full stack web development": "/images/full-stack.jpg",
        "python developer": "/images/python.jpg",
        "devops engineer": "/images/devops.jpg",
        "ui ux designer": "/images/ui-ux.jpg",
        "java backend development": "/images/java-backend.jpg",
        "data science": "/images/data-science.jpg",
        "machine learning": "/images/mechine-learning.jpg",
        "cloud computing": "/images/cloud-computing.jpg",
        "cyber security": "/images/cyber-security.jpg",
        "sql and database management": "/images/SQL-DB.jpg"
    };

    return imageMap[title] || "/images/Java.jpg";
}


/* =========================================
   COMMON USER INFORMATION
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const userName = localStorage.getItem("userName") || "Student";

    /* Dashboard */
    const studentName = document.getElementById("studentName");

    if (studentName) {
        studentName.textContent = userName;
    }

    const topStudentName = document.getElementById("topStudentName");

    if (topStudentName) {
        topStudentName.textContent = userName;
    }

    const profileAvatar = document.getElementById("profileAvatar");

    if (profileAvatar) {
        profileAvatar.textContent = userName.charAt(0).toUpperCase();
    }


    /* Courses Page */
    const courseStudentName = document.getElementById("courseStudentName");

    if (courseStudentName) {
        courseStudentName.textContent = userName;
    }

    const courseProfileAvatar = document.getElementById("courseProfileAvatar");

    if (courseProfileAvatar) {
        courseProfileAvatar.textContent = userName.charAt(0).toUpperCase();
    }


    /* My Courses Page */
    const myCourseStudentName = document.getElementById("myCourseStudentName");

    if (myCourseStudentName) {
        myCourseStudentName.textContent = userName;
    }

    const myCourseProfileAvatar = document.getElementById("myCourseProfileAvatar");

    if (myCourseProfileAvatar) {
        myCourseProfileAvatar.textContent = userName.charAt(0).toUpperCase();
    }


    /* Enrollment Page */
    const enrollmentStudentName = document.getElementById("enrollmentStudentName");

    if (enrollmentStudentName) {
        enrollmentStudentName.textContent = userName;
    }

    const enrollmentProfileAvatar = document.getElementById("enrollmentProfileAvatar");

    if (enrollmentProfileAvatar) {
        enrollmentProfileAvatar.textContent = userName.charAt(0).toUpperCase();
    }


    /* Profile Page */
    if (document.getElementById("fullName")) {
        loadProfile();
    }


    /* Dashboard */
    if (document.getElementById("recommendedCourses")) {
        loadDashboard();
    }


    /* All Courses */
    if (document.getElementById("courseContainer")) {
        loadCourses();
    }


    /* My Courses */
    if (document.getElementById("myCourseContainer")) {
        loadMyCourses();
    }


    /* Enrollments */
    if (document.getElementById("enrollmentContainer")) {
        loadEnrollments();
    }


    /* Login */
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", loginUser);
    }


    /* Course Search */
    const courseSearch = document.getElementById("courseSearch");

    if (courseSearch) {
        courseSearch.addEventListener("input", searchCourses);
    }


    /* Settings */
    const settingsForm = document.getElementById("settingsForm");

    if (settingsForm) {
        settingsForm.addEventListener("submit", saveSettings);
    }

});


/* =========================================
   LOGIN
   ========================================= */

async function loginUser(event) {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("loginMessage");

    message.textContent = "Logging in...";
    message.style.color = "blue";

    try {

        const response = await fetch("http://localhost:8083/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        console.log("Login response:", data);

        if (data.message === "Login successful") {

            localStorage.setItem("userId", data.userId);
            localStorage.setItem("userName", data.name);
            localStorage.setItem("userEmail", data.email);
            localStorage.setItem("userRole", data.role);

            message.textContent = "Login successful!";
            message.style.color = "green";

            setTimeout(function () {
                window.location.href = "dashboard.html";
            }, 800);

        } else {

            message.textContent = data.message || "Invalid email or password";
            message.style.color = "red";
        }

    } catch (error) {

        console.error("Login error:", error);

        message.textContent = "Unable to connect to the server.";
        message.style.color = "red";
    }
}


/* =========================================
   LOAD DASHBOARD
   ========================================= */

async function loadDashboard() {

    try {

        const courseResponse = await fetch("http://localhost:8083/courses");

        if (!courseResponse.ok) {
            throw new Error("Course server error");
        }

        const courses = await courseResponse.json();

        const userId = Number(localStorage.getItem("userId"));

        const enrollmentResponse = await fetch("http://localhost:8083/enrollments");

        if (!enrollmentResponse.ok) {
            throw new Error("Enrollment server error");
        }

        const enrollments = await enrollmentResponse.json();

        const myEnrollments = enrollments.filter(function (enrollment) {
            return Number(enrollment.userId) === userId;
        });


        /* Total Courses */
        const totalCourses = document.getElementById("totalCourses");

        if (totalCourses) {
            totalCourses.textContent = courses.length;
        }


        /* Active Courses */
        const activeCourses = document.getElementById("activeCourses");

        if (activeCourses) {

            const active = myEnrollments.filter(function (enrollment) {
                return enrollment.status === "ACTIVE";
            });

            activeCourses.textContent = active.length;
        }


        /* Completed Courses */
        const completedCourses = document.getElementById("completedCourses");

        if (completedCourses) {

            const completed = myEnrollments.filter(function (enrollment) {
                return enrollment.status === "COMPLETED";
            });

            completedCourses.textContent = completed.length;
        }


        /* Progress */
        const overallProgress = document.getElementById("overallProgress");

        if (overallProgress) {
            overallProgress.textContent = "0%";
        }

	
		/* Continue Learning */

		if (myEnrollments.length > 0) {

		    const latest = myEnrollments[myEnrollments.length - 1];

		    const course = courses.find(function (course) {
		        return Number(course.id) === Number(latest.courseId);
		    });

		    if (course) {

		        const title = document.getElementById("continueCourseTitle");

		        if (title) {
		            title.textContent = course.title;
		        }

		        const instructor = document.getElementById("continueInstructor");

		        if (instructor) {
		            instructor.textContent =
		                "Instructor: " + course.instructor;
		        }

		        // Read the saved progress from the enrollment
		        const progress = Number(latest.progress || 0);

		        const progressBar =
		            document.getElementById("continueProgressBar");

		        const progressText =
		            document.getElementById("continueProgressText");

		        const progressStatus =
		            document.getElementById("continueProgressStatus");

		        if (progressBar) {
		            progressBar.style.width = progress + "%";
		            progressBar.setAttribute("aria-valuenow", progress);
		        }

		        if (progressText) {
		            progressText.textContent = progress + "%";
		        }

		        if (progressStatus) {
		            progressStatus.textContent =
		                progress === 0 ? "Not started yet" :
		                progress === 100 ? "Course completed" :
		                "In progress";
		        }
		    }
		}
	


        /* Recommended Courses */
        const container = document.getElementById("recommendedCourses");

        if (!container) {
            return;
        }

        container.innerHTML = "";

        if (courses.length === 0) {
            container.innerHTML = "<p>No courses available.</p>";
            return;
        }

        courses.slice(0, 3).forEach(function (course) {

            const card = document.createElement("div");

            card.className = "dashboard-course-card";

            card.innerHTML =
                "<div class='dashboard-course-image'>" +
                    "<img src='" + getCourseImage(course.title) +
                    "' alt='" + course.title +
                    "' loading='lazy' onerror=\"this.onerror=null;this.style.display='none';\">" +
                "</div>" +

                "<div class='dashboard-course-body'>" +

                    "<div class='course-category'>" +
                        "ONLINE COURSE" +
                    "</div>" +

                    "<h3>" +
                        course.title +
                    "</h3>" +

                    "<p>" +
                        course.description +
                    "</p>" +

                    "<div class='dashboard-course-footer'>" +

                        "<strong>₹" +
                            course.price +
                        "</strong>" +

                        "<a href='courses.html'>" +
                            "View Course →" +
                        "</a>" +

                    "</div>" +

                "</div>";

            container.appendChild(card);
        });

    } catch (error) {

        console.error("Dashboard error:", error);

        const container = document.getElementById("recommendedCourses");

        if (container) {
            container.innerHTML = "<p>Unable to load dashboard data.</p>";
        }
    }
}


/* =========================================
   LOAD ALL COURSES
   ========================================= */

let allCourses = [];

async function loadCourses() {

    const container = document.getElementById("courseContainer");

    if (!container) {
        return;
    }

    try {

        const response = await fetch("http://localhost:8083/courses");

        if (!response.ok) {
            throw new Error("Server error: " + response.status);
        }

        allCourses = await response.json();

        displayCourses(allCourses);

    } catch (error) {

        console.error("Course loading error:", error);

        container.innerHTML =
            "<div class='loading-course'>" +
                "Unable to load courses." +
                "<br><br>" +
                "Please make sure Spring Boot is running." +
            "</div>";
    }
}


/* =========================================
   DISPLAY ALL COURSES
   ========================================= */

function displayCourses(courses) {

    const container = document.getElementById("courseContainer");
    const count = document.getElementById("courseCount");

    if (!container) {
        return;
    }

    if (count) {
        count.textContent = courses.length + " course(s) available";
    }

    container.innerHTML = "";

    if (courses.length === 0) {
        container.innerHTML =
            "<div class='loading-course'>" +
                "No courses found." +
            "</div>";
        return;
    }

    courses.forEach(function (course) {

        const card = document.createElement("div");

        card.className = "lms-course-card";

        card.innerHTML =
            "<div class='lms-course-image'>" +
                "<img src='" + getCourseImage(course.title) +
                "' alt='" + course.title +
                "' loading='lazy' onerror=\"this.onerror=null;this.style.display='none';\">" +
            "</div>" +

            "<div class='lms-course-body'>" +

                "<div class='lms-course-category'>" +
                    "ONLINE COURSE" +
                "</div>" +

                "<h2 class='lms-course-title'>" +
                    course.title +
                "</h2>" +

                "<p class='lms-course-description'>" +
                    course.description +
                "</p>" +

                "<p class='lms-course-instructor'>" +
                    "Instructor: " +
                    "<strong>" +
                        course.instructor +
                    "</strong>" +
                "</p>" +

                "<div class='lms-course-bottom'>" +

                    "<span class='lms-course-price'>" +
                        "₹" + course.price +
                    "</span>" +

                    "<button class='lms-enroll-button' " +
                        "onclick='enrollCourse(" + course.id + ")'>" +
                        "Enroll Now" +
                    "</button>" +

                "</div>" +

            "</div>";

        container.appendChild(card);
    });
}


/* =========================================
   SEARCH COURSES
   ========================================= */

function searchCourses() {

    const searchInput = document.getElementById("courseSearch");

    if (!searchInput) {
        return;
    }

    const keyword = searchInput.value.toLowerCase().trim();

    const filteredCourses = allCourses.filter(function (course) {

        return (
            (course.title || "").toLowerCase().includes(keyword) ||
            (course.description || "").toLowerCase().includes(keyword) ||
            (course.instructor || "").toLowerCase().includes(keyword)
        );
    });

    displayCourses(filteredCourses);
}


/* =========================================
   ENROLL COURSE
   ========================================= */

async function enrollCourse(courseId) {

    const userId = localStorage.getItem("userId");

    if (!userId) {

        alert("Please login first.");

        window.location.href = "login.html";

        return;
    }

    try {

        const response = await fetch("http://localhost:8083/enrollments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: Number(userId),
                courseId: Number(courseId)
            })
        });

        if (!response.ok) {
            throw new Error("Enrollment failed");
        }

        await response.json();

        alert("Enrollment Successful!");

        window.location.href = "enrollments.html";

    } catch (error) {

        console.error("Enrollment error:", error);

        alert("Unable to enroll. Please check the server.");
    }
}


/* =========================================
   LOAD MY COURSES
   ========================================= */

async function loadMyCourses() {

    const container = document.getElementById("myCourseContainer");
    const count = document.getElementById("myCourseCount");

    if (!container) {
        return;
    }

    const userId = Number(localStorage.getItem("userId"));

    if (!userId) {

        container.innerHTML =
            "<div class='loading-course'>" +
                "Please login to view your courses." +
                "<br><br>" +
                "<a href='login.html'>Go to Login</a>" +
            "</div>";

        return;
    }

    try {

        /* Get this user's enrollments */
        const enrollmentResponse = await fetch(
            "http://localhost:8083/enrollments/user/" + userId
        );

        if (!enrollmentResponse.ok) {
            throw new Error("Unable to load enrollments");
        }

        const myEnrollments = await enrollmentResponse.json();


        /* Get all courses */
        const courseResponse = await fetch("http://localhost:8083/courses");

        if (!courseResponse.ok) {
            throw new Error("Unable to load courses");
        }

        const courses = await courseResponse.json();


        /* Update count */
        if (count) {
            count.textContent = myEnrollments.length + " course(s) enrolled";
        }

        container.innerHTML = "";


        /* No courses */
        if (myEnrollments.length === 0) {

            container.innerHTML =
                "<div class='loading-course'>" +
                    "<h3>No Courses Yet</h3>" +
                    "<p>You have not enrolled in any courses yet.</p>" +
                    "<br>" +
                    "<a href='courses.html'>Browse All Courses →</a>" +
                "</div>";

            return;
        }


        /* Display enrolled courses */
        myEnrollments.forEach(function (enrollment) {

            const course = courses.find(function (item) {
                return Number(item.id) === Number(enrollment.courseId);
            });

            if (!course) {
                return;
            }

            const card = document.createElement("div");

            card.className = "lms-course-card";

            const status = enrollment.status || "ACTIVE";

            const statusClass =
                status === "COMPLETED"
                    ? "status-completed"
                    : "status-active";

            card.innerHTML =
                "<div class='lms-course-image'>" +
                    "<img src='" + getCourseImage(course.title) +
                    "' alt='" + course.title +
                    "' loading='lazy' onerror=\"this.onerror=null;this.style.display='none';\">" +
                "</div>" +

                "<div class='lms-course-body'>" +

                    "<div class='lms-course-category'>" +
                        "MY COURSE" +
                    "</div>" +

                    "<h2 class='lms-course-title'>" +
                        course.title +
                    "</h2>" +

                    "<p class='lms-course-description'>" +
                        course.description +
                    "</p>" +

                    "<p class='lms-course-instructor'>" +
                        "Instructor: " +
                        "<strong>" +
                            course.instructor +
                        "</strong>" +
                    "</p>" +

                    "<p>" +
                        "Enrolled Date: " +
                        (enrollment.enrollmentDate || "Not available") +
                    "</p>" +

                    "<div class='lms-course-bottom'>" +

                        "<span class='enrollment-status " +
                            statusClass + "'>" +
                            status +
                        "</span>" +

                        "<button class='lms-enroll-button' " +
                            "onclick=\"window.location.href='courses.html'\">" +
                            "View Course" +
                        "</button>" +

                    "</div>" +

                "</div>";

            container.appendChild(card);
        });

    } catch (error) {

        console.error("My Courses loading error:", error);

        container.innerHTML =
            "<div class='loading-course'>" +
                "Unable to load your courses." +
                "<br><br>" +
                "Please make sure Spring Boot is running." +
            "</div>";
    }
}


/* =========================================
   LOAD ENROLLMENTS
   ========================================= */

async function loadEnrollments() {

    const container = document.getElementById("enrollmentContainer");

    if (!container) {
        return;
    }

    const userId = Number(localStorage.getItem("userId"));

    if (!userId) {

        container.innerHTML =
            "<div class='loading-course'>" +
                "Please login to view your enrollments." +
                "<br><br>" +
                "<a href='login.html'>Go to Login</a>" +
            "</div>";

        return;
    }

    try {

        const enrollmentResponse = await fetch("http://localhost:8083/enrollments");
        const courseResponse = await fetch("http://localhost:8083/courses");

        if (!enrollmentResponse.ok || !courseResponse.ok) {
            throw new Error("Server error");
        }

        const enrollments = await enrollmentResponse.json();
        const courses = await courseResponse.json();

        const myEnrollments = enrollments.filter(function (enrollment) {
            return Number(enrollment.userId) === userId;
        });


        /* Total */
        const total = document.getElementById("enrollmentTotal");

        if (total) {
            total.textContent = myEnrollments.length;
        }


        /* Active */
        const active = document.getElementById("enrollmentActive");

        if (active) {
            active.textContent = myEnrollments.filter(function (item) {
                return item.status === "ACTIVE";
            }).length;
        }


        /* Completed */
        const completed = document.getElementById("enrollmentCompleted");

        if (completed) {
            completed.textContent = myEnrollments.filter(function (item) {
                return item.status === "COMPLETED";
            }).length;
        }


        container.innerHTML = "";

        if (myEnrollments.length === 0) {

            container.innerHTML =
                "<div class='loading-course'>" +
                    "<h3>No Enrollments Yet</h3>" +
                    "<p>Start learning by enrolling in a course.</p>" +
                    "<br>" +
                    "<a href='courses.html'>Browse Courses →</a>" +
                "</div>";

            return;
        }


        myEnrollments.forEach(function (enrollment) {

            const course = courses.find(function (item) {
                return Number(item.id) === Number(enrollment.courseId);
            });

            const card = document.createElement("div");

            card.className = "lms-enrollment-card";

            const courseName = course ? course.title : "Unknown Course";
            const instructor = course ? course.instructor : "Unknown";

            const statusClass =
                enrollment.status === "COMPLETED"
                    ? "status-completed"
                    : "status-active";

            card.innerHTML =
                "<div class='enrollment-course-icon'>📚</div>" +

                "<div class='enrollment-details'>" +

                    "<h3>" +
                        courseName +
                    "</h3>" +

                    "<p>" +
                        "Instructor: " + instructor +
                    "</p>" +

                    "<p>" +
                        "Enrollment Date: " +
                        (enrollment.enrollmentDate || "Not available") +
                    "</p>" +

                "</div>" +

                "<span class='enrollment-status " +
                    statusClass + "'>" +
                    (enrollment.status || "ACTIVE") +
                "</span>";

            container.appendChild(card);
        });

    } catch (error) {

        console.error("Enrollment loading error:", error);

        container.innerHTML =
            "<div class='loading-course'>" +
                "Unable to load enrollments." +
                "<br><br>" +
                "Please make sure Spring Boot is running." +
            "</div>";
    }
}


/* =========================================
   LOAD PROFILE
   ========================================= */

async function loadProfile() {

    const userId = localStorage.getItem("userId");

    if (!userId) {
        window.location.href = "login.html";
        return;
    }

    try {

        const response = await fetch("http://localhost:8083/users/" + userId);

        if (!response.ok) {
            throw new Error("Unable to load profile");
        }

        const user = await response.json();

        const fullName = document.getElementById("fullName");

        if (fullName) {
            fullName.value = user.name || "";
        }

        const email = document.getElementById("email");

        if (email) {
            email.value = user.email || "";
        }

        const mobilePhone = document.getElementById("mobilePhone");

        if (mobilePhone) {
            mobilePhone.value = user.mobilePhone || "";
        }

        const address = document.getElementById("address");

        if (address) {
            address.value = user.address || "";
        }

        const idNumber = document.getElementById("idNumber");

        if (idNumber) {
            idNumber.value = user.idNumber || "";
        }

        const institution = document.getElementById("institution");

        if (institution) {
            institution.value = user.institution || "";
        }

        const department = document.getElementById("department");

        if (department) {
            department.value = user.department || "";
        }

        const role = document.getElementById("role");

        if (role) {
            role.value = user.role || "STUDENT";
        }

        const profileName = document.getElementById("profileName");

        if (profileName) {
            profileName.textContent = user.name || "Student";
        }

        const topName = document.getElementById("topName");

        if (topName) {
            topName.textContent = user.name || "Student";
        }

        const topAvatar = document.getElementById("topAvatar");

        if (topAvatar) {
            topAvatar.textContent = (user.name || "Student").charAt(0).toUpperCase();
        }

    } catch (error) {

        console.error("Profile loading error:", error);

        alert("Unable to load profile. Please check the server.");
    }
}


/* =========================================
   ENABLE PROFILE EDITING
   ========================================= */

function enableEditing() {

    const fields = document.querySelectorAll(".profile-field input");

    fields.forEach(function (field) {
        field.disabled = false;
    });

    const role = document.getElementById("role");

    if (role) {
        role.disabled = true;
    }

    const editButton = document.getElementById("editButton");

    if (editButton) {
        editButton.style.display = "none";
    }

    const saveSection = document.getElementById("saveSection");

    if (saveSection) {
        saveSection.style.display = "flex";
    }
}


/* =========================================
   SAVE PROFILE
   ========================================= */

async function saveProfile() {

    const userId = localStorage.getItem("userId");

    if (!userId) {

        alert("Please login first.");

        window.location.href = "login.html";

        return;
    }

    try {

        const currentResponse = await fetch("http://localhost:8083/users/" + userId);

        if (!currentResponse.ok) {
            throw new Error("Unable to get current user");
        }

        const currentUser = await currentResponse.json();

        const profileData = {

            name: document.getElementById("fullName").value,
            email: document.getElementById("email").value,
            password: currentUser.password,
            role: currentUser.role || "STUDENT",
            mobilePhone: document.getElementById("mobilePhone").value,
            address: document.getElementById("address").value,
            idNumber: document.getElementById("idNumber").value,
            institution: document.getElementById("institution").value,
            department: document.getElementById("department").value
        };

        const response = await fetch("http://localhost:8083/users/" + userId, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(profileData)
        });

        if (!response.ok) {
            throw new Error("Failed to update profile");
        }

        const updatedUser = await response.json();

        localStorage.setItem("userName", updatedUser.name);
        localStorage.setItem("userEmail", updatedUser.email);
        localStorage.setItem("userRole", updatedUser.role);

        alert("Profile updated successfully!");

        location.reload();

    } catch (error) {

        console.error("Profile update error:", error);

        alert("Unable to update profile. Please check the server.");
    }
}


/* =========================================
   CANCEL PROFILE EDITING
   ========================================= */

function cancelEditing() {
    location.reload();
}


/* =========================================
   SETTINGS
   ========================================= */

async function saveSettings(event) {

    event.preventDefault();

    const userId = localStorage.getItem("userId");
    const message = document.getElementById("message");

    if (!userId) {

        message.textContent = "Please login first.";
        message.style.color = "red";

        return;
    }

    try {

        const currentResponse = await fetch("http://localhost:8083/users/" + userId);

        if (!currentResponse.ok) {
            throw new Error("Unable to get current user");
        }

        const currentUser = await currentResponse.json();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const mobilePhone = document.getElementById("mobilePhone").value;
        const address = document.getElementById("address").value;
        const idNumber = document.getElementById("idNumber").value;
        const institution = document.getElementById("institution").value;
        const department = document.getElementById("department").value;

        const response = await fetch("http://localhost:8083/users/" + userId, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                name: name,
                email: email,
                password: password || currentUser.password,
                role: currentUser.role || "STUDENT",
                mobilePhone: mobilePhone,
                address: address,
                idNumber: idNumber,
                institution: institution,
                department: department
            })
        });

        if (response.ok) {

            const updatedUser = await response.json();

            localStorage.setItem("userName", updatedUser.name);
            localStorage.setItem("userEmail", updatedUser.email);
            localStorage.setItem("userRole", updatedUser.role);

            message.textContent = "All details updated successfully.";
            message.style.color = "green";

        } else {

            message.textContent = "Unable to update settings.";
            message.style.color = "red";
        }

    } catch (error) {

        console.error("Settings error:", error);

        message.textContent = "Server connection error.";
        message.style.color = "red";
    }
}


/* =========================================
   LOGOUT
   ========================================= */

function logout() {

    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");

    window.location.href = "index.html";
}
