document.addEventListener("DOMContentLoaded", () => {
    const courseContainer = document.getElementById("courseContainer");
    const totalCreditsEl = document.getElementById("totalCredits");
  
    const courses = [
      { code: "WDD130", name: "Web Fundamentals", credits: 3, category: "WDD", completed: true },
      { code: "WDD131", name: "Dynamic Web Fundamentals", credits: 3, category: "WDD", completed: true },
      { code: "WDD231", name: "Web Frontend Development I", credits: 3, category: "WDD", completed: false },
      { code: "CSE110", name: "Introduction to Programming", credits: 2, category: "CSE", completed: true },
      { code: "CSE111", name: "Programming with Functions", credits: 3, category: "CSE", completed: false },
      { code: "CSE210", name: "Programming with Classes", credits: 3, category: "CSE", completed: false },
    ];
  
    function renderCourses(courseList) {
      courseContainer.innerHTML = "";
      let totalCredits = 0;
  
      courseList.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course-card");
        if (course.completed) card.classList.add("completed");
  
        card.innerHTML = `
          <h3>${course.code}</h3>
          <p>${course.name}</p>
          <p>${course.credits} Credits</p>
        `;
        courseContainer.appendChild(card);
  
        totalCredits += course.credits;
      });
  
      totalCreditsEl.textContent = totalCredits;
    }
  
    document.getElementById("allBtn").addEventListener("click", () => renderCourses(courses));
    document.getElementById("wddBtn").addEventListener("click", () => renderCourses(courses.filter(c => c.category === "WDD")));
    document.getElementById("cseBtn").addEventListener("click", () => renderCourses(courses.filter(c => c.category === "CSE")));
  
    renderCourses(courses);
  });
  