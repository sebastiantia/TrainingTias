import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App'; //This is where we are going to create our frontend react app

import { Box } from "@chakra-ui/react"

// verbose


// shorthand

ReactDOM.render( //this renders our app
  
   <BrowserRouter>
   <ChakraProvider>
   <Box
  bgImage="../public/david-watkis-ttMBIEnFeKA-unsplash.jpg"
  bgPosition="center"
  bgRepeat="no-repeat">
   <App/>
   </Box>
   </ChakraProvider>
   </BrowserRouter>,

 
  document.getElementById('root')  //puts it here... which is in the index.html file meaning we are basically loading App into id:root
);

