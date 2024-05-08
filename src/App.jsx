import React, { useEffect, useState } from 'react';
import { SnackbarProvider } from 'notistack';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from 'pages/users/Users';
function App() {
  return (
    <SnackbarProvider
      maxSnack={4}
      transitionDuration={100}
      autoHideDuration={3000}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Users />} />
        </Routes>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
