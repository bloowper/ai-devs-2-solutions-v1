# Solutions to ai devs 2 tasks


## Setup

1. **Environment Configuration:**
   - Copy the `example.env` file and rename the copy to `.env`.
   - Open the `.env` file and replace the placeholder values with your actual tokens to ensure proper configuration.

2. **Running a Task:**
   - To execute a task, use the command below, replacing `"helloapi"` with the desired task name. This command should be run from the root directory of the project.
     ```bash
     node src/main.js --taskname="helloapi"
     ```

## Contributing a New Task

ollow these steps to add a new task to the project:

1. **Create a Task Directory:**
   - Create a new folder with the task's name. For example, to add a task named `helloapi`, run:
     ```bash
     mkdir src/tasks/helloapi
     ```

2. **Add Solution File:**
   - Inside the newly created task directory, create a file named `solution.js`. This file will contain the task's solution.
     ```bash
     touch src/tasks/helloapi/solution.js
     ```

3. **Implement the Solution:**
   - Open the `solution.js` file and implement your solution. A basic function template is provided below. Replace the content of the `resolve` function with your solution logic.
     ```javascript
     exports.resolve = function(taskContent) {
         // Your solution logic here
         return taskContent.cookie; // Example return
     };
     ```
