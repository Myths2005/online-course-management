# ☕ Online Course Management System

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=rect&color=49352B&height=180&section=header&text=Learn.%20Grow.%20Achieve.&fontSize=38&fontColor=FFF8ED&fontAlignY=42&desc=ONLINE%20COURSE%20MANAGEMENT%20SYSTEM&descSize=14&descColor=EAD7BC&descAlignY=68" width="100%" alt="Mocha and beige project banner"/>

<br/>

**A Full-Stack Web Application for Managing Online Learning**

Built with Java, Spring Boot, MySQL, HTML, CSS and JavaScript.

<br/>

[Repository](https://github.com/Myths2005/online-course-management) · [Developer Profile](https://github.com/Myths2005)

</div>

---

## 01 — About the Project

The **Online Course Management System** is a web application designed to make course browsing and enrollment management easier.

It combines a Java Spring Boot backend, a MySQL database, and a web-based frontend to provide pages for courses, learner accounts, and enrollment information.

## 02 — What You Can Explore

| FEATURE | DESCRIPTION |
|---|---|
| 📖 Course Catalog | Browse available courses and their descriptions |
| 🎓 My Courses | View courses associated with your account |
| 📝 Enrollments | View enrollment details and status |
| 👤 Profile | View and manage user profile information |
| ⚙️ Settings | Access account settings |
| 🏠 Dashboard | Navigate the main application pages |

## 03 — Technology Palette

<div align="center">

| TECHNOLOGY | ROLE |
|---|---|
| ☕ Java | Backend programming |
| 🍃 Spring Boot | Application framework and APIs |
| 🗄️ MySQL | Database management |
| 🧱 HTML5 | Web page structure |
| 🎨 CSS3 | Layout and styling |
| ⚡ JavaScript | Frontend interactions |
| 📦 Maven | Build and dependency management |
| 🐙 Git & GitHub | Source control |

</div>

## 04 — Project Architecture

```text
ONLINE-COURSE-MANAGEMENT
│
├── src/main/java/com/example/course/
│   ├── config/
│   ├── controller/
│   ├── entity/
│   ├── repository/
│   └── OnlineCourseManagementApplication.java
│
├── src/main/resources/static/
│   ├── Images/
│   └── frontend/
│       ├── index.html
│       ├── login.html
│       ├── dashboard.html
│       ├── courses.html
│       ├── My-courses.html
│       ├── enrollments.html
│       ├── profile.html
│       ├── settings.html
│       ├── script.js
│       └── style.css
│
├── src/test/
├── pom.xml
└── README.md
```

## 05 — Run Locally

### Requirements

- Java JDK
- MySQL Server
- Maven (or the included Maven Wrapper)
- Eclipse or another Java IDE

### Step 1: Clone the repository

```bash
git clone https://github.com/Myths2005/online-course-management.git
cd online-course-management
```

### Step 2: Create the database

```sql
CREATE DATABASE online_course_db;
```

### Step 3: Configure your local database

Create your local `src/main/resources/application.properties` file and enter your own database connection settings.

**Security note:** This configuration file is intentionally excluded from GitHub. Never publish database passwords, API keys, or other secrets.

### Step 4: Start the application

Run `OnlineCourseManagementApplication.java` from your IDE, or use Windows Command Prompt:

```cmd
mvnw.cmd spring-boot:run
```

If the application is configured for port `8083`, open:

`http://localhost:8083/`

## 06 — Future Possibilities

- AI-powered course recommendations
- Course progress tracking
- Email notifications
- Online payment integration
- Administrative reports
- Cloud deployment

*These are potential future enhancements, not claims that they are already implemented.*

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=rect&color=EAD7BC&height=2" width="100%" alt="Beige divider"/>

### Made with ☕ and code

**MYTHILI P**

[GitHub](https://github.com/Myths2005) · [LinkedIn](https://www.linkedin.com/in/mythili-p-developer/)

<sub>Online Course Management System · Java Full-Stack Project</sub>

</div>
