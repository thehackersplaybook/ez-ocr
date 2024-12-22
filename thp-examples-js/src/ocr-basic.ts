import { ThpOcr } from "thp-ocr";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const images = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEn4BsqOK3uI8zFlqQ616FvpMz5HtQ3XBo5Q&s",
  "https://www.editpad.org/images/blog/2022/04/1649416387note-(1).png",
  "test_data/test_2.png",
  "test_data/test_3.png",
];

const run = async () => {
  let totalOutput = "";
  for (const imageSource of images) {
    console.log(`\nProcessing ${imageSource}.`);
    const ocr = new ThpOcr(imageSource);
    const result = await ocr.extract({ format: "markdown" });
    totalOutput += `Source: ${imageSource}\n\n${result}\n\n`;
    console.log(`Processed ${imageSource}.\n`);
  }

  fs.writeFileSync("output/ocr-basic-output.md", totalOutput);
};

run();
