// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
const express = require('express');

// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 3000;


