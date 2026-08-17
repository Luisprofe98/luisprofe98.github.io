import { seedData } from "./services/storageService.js";
import { initializeAuth } from "./auth.js";
import { initRouter } from "./router.js";

seedData();
initializeAuth();
initRouter();
