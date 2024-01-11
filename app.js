import express from "express";
import fs from "fs";
import path from "path";
import morgan from "morgan";

const readResource = (resourceName) => {
  const data = fs.readFileSync(
    path.resolve(`./databases/${resourceName}.json`)
  );
  const resource = JSON.parse(data);
  return resource;
};

const writeResource = (resourceName, resource) => {
  const data = JSON.stringify(resource);
  fs.writeFileSync(path.resolve(`./databases/${resourceName}.json`), authors);
};

const app = express();

app.listen(3000, () => {
  console.log("Il server è attivo sulla porta 3000");
});

app.use(morgan("dev"));
app.use(express.json());

app.get("/authors", (req, res) => {
  res.sendFile(path.resolve("./databases/authors.json"));
});

app.post("/authors", (req, res) => {
  const newAuthor = req.body;
  let isAuthorValid = true;

  ["name", "surname", "birthdate", "address"].forEach((key) => {
    isAuthorValid &= newAuthor[key] !== undefined;
  });

  if (!isAuthorValid) {
    res.status(400).send("Errore");
    return;
  }
  const authors = readResource("authors");
  authors.push(newAuthor);
  writeResource("authors", authors);
  res.send(newAuthor);
});
