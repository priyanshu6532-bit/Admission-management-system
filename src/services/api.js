// (NO BACKEND CONNECTED)

let visitors = [
  {
    id: 1,
    name: "Kunal",
    email: "kunal@test.com",
    status: "NEW"
  },
  {
    id: 2,
    name: "Student1",
    email: "student@test.com",
    status: "FOLLOW_UP"
  }
];

let studentApplications = [];

export const createVisitor = async (data) => {
  const newVisitor = {
    id: visitors.length + 1,
    ...data,
    status: "NEW"
  };
  visitors.push(newVisitor);
  return Promise.resolve({ data: newVisitor });
};

export const getVisitors = async () => {
  return Promise.resolve({ data: visitors });
};

export const updateVisitorStatus = async (id, status) => {
  visitors = visitors.map(v =>
    v.id === id ? { ...v, status } : v
  );
  return Promise.resolve({ data: "Updated" });
};

export const createStudentApplication = async (data) => {
  const newApplication = {
    id: studentApplications.length + 1,
    ...data,
    status: "PENDING",
    username: data.email,
    defaultPassword: "SSM@1234"
  };
  studentApplications.push(newApplication);
  return Promise.resolve({ data: newApplication });
};

export const loginUser = async (data) => {
  if (data.username === "admin" && data.password === "admin") {
    return Promise.resolve({ data: { token: "fake-jwt-token" } });
  }
  return Promise.reject("Invalid credentials");
};
