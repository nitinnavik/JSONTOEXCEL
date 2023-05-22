import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { utils as XLSXUtils, writeFile as XLSXWriteFile } from "xlsx";
function App() {
  const jsonData = {
    id: 1,
    name: "John Doe",
    details: {
      age: 25,
      email: "johndoe@example.com",
      address: {
        street: "123 Main St",
        city: "New York",
        country: "USA",
      },
    },
  };

  // Function to convert JSON data to Excel
  function convertToExcel(data) {
    const flattenObject = (obj, prefix = "") => {
      const flattened = {};

      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === "object" && obj[key] !== null) {
            Object.assign(
              flattened,
              flattenObject(obj[key], prefix + key + ".")
            );
          } else {
            flattened[prefix + key] = obj[key];
          }
        }
      }

      return flattened;
    };

    // Flatten the nested JSON data
    const flattenedData = flattenObject(data);

    // Create a new workbook
    const workbook = XLSXUtils.book_new();

    // Convert the flattened data to an array of arrays
    const dataArray = Object.entries(flattenedData);

    // Create a worksheet
    const worksheet = XLSXUtils.aoa_to_sheet(dataArray, +1);

    // Add the worksheet to the workbook
    XLSXUtils.book_append_sheet(workbook, worksheet, "Sheet 1");

    // Save the workbook as an Excel file
    XLSXWriteFile(workbook, "output.xlsx");
  }

  convertToExcel(jsonData);
  console.log(jsonData);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
