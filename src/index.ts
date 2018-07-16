// Imports
import app from './App'
import { Server } from './config/serverConfig';

// Configure server
const port = process.env.PORT || Server.port || 3000;

// Launch the server
app.listen(port, (err) => {
  // Handle any errors if the y appear
  if (err) {
    return new Error(err);
  }

  // Otherwise, just indicate that the server is listening.
  return console.log(`Server is online and listening on port ${port}`);
});
