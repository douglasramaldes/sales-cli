#!/usr/bin/env node
const program = require("commander");
const { prompt } = require("inquirer");
const {
  addSeller,
  addSale,
  findSale,
  updateSale,
  removeSale,
  listSales,
  listSellers,
} = require("./index");

// Sale Questions
listSellers().then((sellers) => {
  const questions = [
    {
      type: "list",
      name: "sellerName",
      message: "Seller name",
      choices: sellers,
    },
    {
      type: "input",
      name: "customerName",
      message: "Customer name",
    },
    {
      type: "input",
      name: "itemName",
      message: "Item name",
    },
    {
      type: "number",
      name: "saleValue",
      message: "Sale value",
      validate: function (value) {
        if (isNaN(value)) {
          return "Please enter a valid number";
        }
        return true;
      },
    },
  ];

  const seller = [
    {
      type: "input",
      name: "name",
      message: "Enter the name of the seller:",
    },
  ];

  program.version("1.0.0").description("Sale Management System");

  // Add Seller Command
  program
    .command("new")
    .alias("n")
    .description("Add a seller")
    .action(() => {
      prompt(seller).then((answers) => addSeller(answers));
    });

  // Add Sale Command
  program
    .command("add")
    .alias("a")
    .description("Add a sale")
    .action(() => {
      prompt(questions).then((answers) => addSale(answers));
    });

  // Find Command
  program
    .command("find <_id>")
    .alias("f")
    .description("Find a sale")
    .action((_id) => findSale(_id));

  // Update Command
  program
    .command("update <_id>")
    .alias("u")
    .description("Update a sale")
    .action((_id) => {
      prompt(questions).then((answers) => updateSale(_id, answers));
    });

  // Remove Command
  program
    .command("remove <_id>")
    .alias("r")
    .description("Remove a sale")
    .action((_id) => removeSale(_id));

  // List Command
  program
    .command("list")
    .alias("l")
    .description("List all sales")
    .action(() => listSales());

  program.parse(process.argv);
});
