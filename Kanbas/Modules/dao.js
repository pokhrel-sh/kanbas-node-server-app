import Database from "../Database/index.js";
export function createModule(module) {
  const newModule = { ...module, _id: Date.now().toString() };
  Database.modules = [...Database.modules, newModule];
  return newModule;
}
export function deleteModule(moduleId) {
    const { modules } = Database;
    Database.modules = modules.filter((module) => module._id !== moduleId);
}
   
export function findModulesForCourse(courseId) {

}