let todos = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true },
    { id: 3, title: "Task 3", completed: false },
    { id: 4, title: "Task 4", completed: true },
  ];
  
  let assignments = [
    { id: 1, title: "NodeJS", description: "Build a NodeJS server", completed: false },
    { id: 2, title: "React", description: "Create React app", completed: true },
    { id: 3, title: "Database", description: "Design MongoDB schema", completed: false }
  ];
  
  export default function WorkingWithArrays(app) {
    // Existing todos routes
    app.get("/lab5/todos", (req, res) => {
      const { completed } = req.query;
      if (completed !== undefined) {
        const completedBool = completed === "true";
        const completedTodos = todos.filter((t) => t.completed === completedBool);
        res.json(completedTodos);
        return;
      }    
      res.json(todos);
    });
  
    app.get("/lab5/todos/create", (req, res) => {
      const newTodo = {
        id: new Date().getTime(),
        title: "New Task",
        completed: false,
      };
      todos.push(newTodo);
      res.json(todos);
    });

    app.post("/lab5/todos", (req, res) => {
        const newTodo = { ...req.body,  id: new Date().getTime() };
        todos.push(newTodo);
        res.json(newTodo);
    });
    
    app.put("/lab5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
        if (todoIndex === -1) {
          res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
          return;
        }    
        todos = todos.map((t) => {
          if (t.id === parseInt(id)) {
            return { ...t, ...req.body };
          }
          return t;
        });
        res.sendStatus(200);
    });
  
    app.get("/lab5/todos/:id", (req, res) => {
      const { id } = req.params;
      const todo = todos.find((t) => t.id === parseInt(id));
      res.json(todo);
    });
  
    app.get("/lab5/todos/:id/delete", (req, res) => {
      const { id } = req.params;
      const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
      todos.splice(todoIndex, 1);
      res.json(todos);
    });
  
    app.get("/lab5/todos/:id/title/:title", (req, res) => {
      const { id, title } = req.params;
      const todo = todos.find((t) => t.id === parseInt(id));
      todo.title = title;
      res.json(todos);
    });
  
    // New assignments routes
    app.get("/lab5/assignments", (req, res) => {
      const { completed } = req.query;
      if (completed !== undefined) {
        const completedBool = completed === "true";
        const filteredAssignments = assignments.filter(
          (a) => a.completed === completedBool
        );
        res.json(filteredAssignments);
        return;
      }
      res.json(assignments);
    });
  
    app.get("/lab5/assignments/create", (req, res) => {
      const newAssignment = {
        id: new Date().getTime(),
        title: "New Assignment",
        description: "New Description",
        completed: false
      };
      assignments.push(newAssignment);
      res.json(assignments);
    });
    

    
    app.get("/lab5/assignments/:id", (req, res) => {
      const { id } = req.params;
      const assignment = assignments.find((a) => a.id === parseInt(id));
      res.json(assignment);
    });
  
    app.get("/lab5/assignments/:id/delete", (req, res) => {
      const { id } = req.params;
      const index = assignments.findIndex((a) => a.id === parseInt(id));
      if (index !== -1) {
        assignments.splice(index, 1);
      }
      res.json(assignments);
    });

    app.delete("/lab5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
        if (todoIndex === -1) {
            res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
            return;
        }
        todos.splice(todoIndex, 1);
        res.sendStatus(200);
    });
    
  
    app.get("/lab5/assignments/:id/title/:title", (req, res) => {
      const { id, title } = req.params;
      const assignment = assignments.find((a) => a.id === parseInt(id));
      if (assignment) {
        assignment.title = title;
      }
      res.json(assignments);
    });
  
    app.get("/lab5/assignments/:id/description/:description", (req, res) => {
      const { id, description } = req.params;
      const assignment = assignments.find((a) => a.id === parseInt(id));
      if (assignment) {
        assignment.description = description;
      }
      res.json(assignments);
    });
  
    app.get("/lab5/assignments/:id/completed/:completed", (req, res) => {
      const { id, completed } = req.params;
      const assignment = assignments.find((a) => a.id === parseInt(id));
      if (assignment) {
        assignment.completed = completed === "true";
      }
      res.json(assignments);
    });
  }